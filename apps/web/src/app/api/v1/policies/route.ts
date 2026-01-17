import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { policies, organizations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { validateApiKey, extractApiKey } from '@/lib/auth/validateApiKey';
import { cache, CACHE_KEYS, CACHE_TTL } from '@/lib/cache';

/**
 * GET /api/v1/policies
 * Fetch policies for organization (with Redis caching)
 * Can be called by extension (with API key) or dashboard (with Clerk auth)
 */
export async function GET(request: Request) {
    try {
        let organizationId: string | undefined;

        // Try API key authentication first (for extension)
        const apiKey = extractApiKey(request);
        if (apiKey) {
            const validation = await validateApiKey(apiKey);
            if (validation.valid) {
                organizationId = validation.organizationId;
            } else {
                return NextResponse.json(
                    { error: validation.error },
                    { status: 401 }
                );
            }
        } else {
            // Fall back to Clerk authentication (for dashboard)
            const { orgId } = await auth();
            if (!orgId) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }

            // Find organization by Clerk org ID
            const [org] = await db
                .select()
                .from(organizations)
                .where(eq(organizations.clerkOrgId, orgId))
                .limit(1);

            if (!org) {
                return NextResponse.json(
                    { error: 'Organization not found' },
                    { status: 404 }
                );
            }

            organizationId = org.id;
        }

        // Type guard - should never happen due to logic above
        if (!organizationId) {
            return NextResponse.json(
                { error: 'Organization ID not found' },
                { status: 500 }
            );
        }

        // Try to get from cache first
        const cacheKey = CACHE_KEYS.policies(organizationId);
        const allPolicies = await cache.getOrSet(
            cacheKey,
            CACHE_TTL.policies,
            async () => {
                console.log('[Cache MISS] Policies for org:', organizationId);
                return await db
                    .select()
                    .from(policies)
                    .where(eq(policies.organizationId, organizationId!))
                    .orderBy(policies.createdAt);
            }
        );

        console.log('[Cache] Policies returned:', allPolicies.length);
        return NextResponse.json({ policies: allPolicies });
    } catch (error) {
        console.error('GET /api/v1/policies error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/v1/policies
 * Create a new policy (dashboard only)
 */
export async function POST(request: Request) {
    try {
        const { orgId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { toolName, action, rulesJson, reason, enabled } = body;

        // Validate required fields
        if (!toolName || !action) {
            return NextResponse.json(
                { error: 'Missing required fields: toolName, action' },
                { status: 400 }
            );
        }

        // Validate action
        if (!['allow', 'block', 'review'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be: allow, block, or review' },
                { status: 400 }
            );
        }

        // Find organization
        const [org] = await db
            .select()
            .from(organizations)
            .where(eq(organizations.clerkOrgId, orgId))
            .limit(1);

        if (!org) {
            return NextResponse.json(
                { error: 'Organization not found' },
                { status: 404 }
            );
        }

        // Create policy
        const [newPolicy] = await db
            .insert(policies)
            .values({
                organizationId: org.id,
                toolName,
                action,
                rulesJson: rulesJson || null,
                reason: reason || null,
                enabled: enabled !== undefined ? String(enabled) : 'true',
            })
            .returning();

        // Invalidate cache
        await cache.del(CACHE_KEYS.policies(org.id));

        return NextResponse.json({ policy: newPolicy });
    } catch (error) {
        console.error('POST /api/v1/policies error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/v1/policies
 * Update an existing policy
 */
export async function PUT(request: Request) {
    try {
        const { orgId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, toolName, action, rulesJson, reason, enabled } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Missing policy ID' },
                { status: 400 }
            );
        }

        // Find organization
        const [org] = await db
            .select()
            .from(organizations)
            .where(eq(organizations.clerkOrgId, orgId))
            .limit(1);

        if (!org) {
            return NextResponse.json(
                { error: 'Organization not found' },
                { status: 404 }
            );
        }

        // Update policy
        const [updatedPolicy] = await db
            .update(policies)
            .set({
                toolName,
                action,
                rulesJson,
                reason,
                enabled: enabled !== undefined ? String(enabled) : undefined,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(policies.id, id),
                    eq(policies.organizationId, org.id)
                )
            )
            .returning();

        if (!updatedPolicy) {
            return NextResponse.json(
                { error: 'Policy not found' },
                { status: 404 }
            );
        }

        // Invalidate cache
        await cache.del(CACHE_KEYS.policies(org.id));

        return NextResponse.json({ policy: updatedPolicy });
    } catch (error) {
        console.error('PUT /api/v1/policies error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/v1/policies
 * Delete a policy
 */
export async function DELETE(request: Request) {
    try {
        const { orgId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const url = new URL(request.url);
        const policyId = url.searchParams.get('id');

        if (!policyId) {
            return NextResponse.json(
                { error: 'Missing policy ID' },
                { status: 400 }
            );
        }

        // Find organization
        const [org] = await db
            .select()
            .from(organizations)
            .where(eq(organizations.clerkOrgId, orgId))
            .limit(1);

        if (!org) {
            return NextResponse.json(
                { error: 'Organization not found' },
                { status: 404 }
            );
        }

        // Delete policy
        await db
            .delete(policies)
            .where(
                and(
                    eq(policies.id, policyId),
                    eq(policies.organizationId, org.id)
                )
            );

        // Invalidate cache
        await cache.del(CACHE_KEYS.policies(org.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE /api/v1/policies error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

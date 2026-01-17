import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { organizationApiKeys, organizations } from '@/db/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { generateApiKey, generateHash, getKeyPrefix } from '@/lib/utils/hashUtils';

/**
 * GET /api/v1/api-keys
 * List all API keys for the current organization
 */
export async function GET() {
    try {
        const { orgId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized. Must be part of an organization.' },
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

        // Get all non-revoked API keys
        const keys = await db
            .select({
                id: organizationApiKeys.id,
                name: organizationApiKeys.name,
                keyPrefix: organizationApiKeys.keyPrefix,
                createdAt: organizationApiKeys.createdAt,
                lastUsedAt: organizationApiKeys.lastUsedAt,
                revokedAt: organizationApiKeys.revokedAt,
            })
            .from(organizationApiKeys)
            .where(eq(organizationApiKeys.organizationId, org.id))
            .orderBy(organizationApiKeys.createdAt);

        return NextResponse.json({ keys });
    } catch (error) {
        console.error('GET /api/v1/api-keys error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/v1/api-keys
 * Generate a new API key for the current organization
 */
export async function POST(request: Request) {
    try {
        const { orgId, userId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized. Must be part of an organization.' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name } = body;

        // Find or create organization
        let [org] = await db
            .select()
            .from(organizations)
            .where(eq(organizations.clerkOrgId, orgId))
            .limit(1);

        if (!org) {
            // Auto-create organization on first API key generation
            [org] = await db
                .insert(organizations)
                .values({
                    clerkOrgId: orgId,
                    name: name || 'My Organization',
                    slug: orgId.toLowerCase(),
                    plan: 'active'
                })
                .returning();
        }

        // Generate new API key
        const apiKey = generateApiKey();
        const keyHash = generateHash(apiKey);
        const keyPrefix = getKeyPrefix(apiKey);

        // Store in database
        const [newKey] = await db
            .insert(organizationApiKeys)
            .values({
                organizationId: org.id,
                keyHash,
                keyPrefix,
                name: name || 'Default Key',
            })
            .returning({
                id: organizationApiKeys.id,
                name: organizationApiKeys.name,
                keyPrefix: organizationApiKeys.keyPrefix,
                createdAt: organizationApiKeys.createdAt,
            });

        // Return the full API key ONLY ONCE
        return NextResponse.json({
            apiKey, // Full key - show only once!
            key: newKey,
            warning: 'Save this API key now. You will not be able to see it again.'
        });
    } catch (error) {
        console.error('POST /api/v1/api-keys error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/v1/api-keys/:id
 * Revoke an API key
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
        const keyId = url.searchParams.get('id');

        if (!keyId) {
            return NextResponse.json(
                { error: 'Missing key ID' },
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

        // Revoke the key (soft delete)
        await db
            .update(organizationApiKeys)
            .set({ revokedAt: new Date() })
            .where(
                and(
                    eq(organizationApiKeys.id, keyId),
                    eq(organizationApiKeys.organizationId, org.id)
                )
            );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE /api/v1/api-keys error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

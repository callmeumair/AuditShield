import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { policyVersions, policies } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, eq, desc } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: { policyId: string } }
) {
    try {
        const context = await requireResourceAccess('policies', 'read');
        const { policyId } = params;

        // Verify policy belongs to organization
        const [policy] = await db
            .select()
            .from(policies)
            .where(and(
                eq(policies.id, policyId),
                sql`${policies.organizationId} = ${context.orgId}`
            ))
            .limit(1);

        if (!policy) {
            return NextResponse.json(
                { error: 'Policy not found' },
                { status: 404 }
            );
        }

        // Fetch all versions
        const versions = await db
            .select()
            .from(policyVersions)
            .where(eq(policyVersions.policyId, policyId))
            .orderBy(desc(policyVersions.version));

        return NextResponse.json({
            policy,
            versions,
        });
    } catch (error: any) {
        console.error('Error fetching policy versions:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch policy versions' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

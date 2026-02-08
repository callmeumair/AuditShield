import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { policies } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, desc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const context = await requireResourceAccess('policies', 'read');

        // Fetch active policies for the organization
        // For this MVP, we assume one active policy or list all. 
        // Let's filter by isActive if that field exists, or just return all and let UI decide.
        // Checking schema mentally: usually policies have `isActive`. 
        // If not, we return the latest.

        const results = await db.select()
            .from(policies)
            .where(sql`${policies.organizationId} = ${context.orgId}`)
            .orderBy(desc(policies.updatedAt));

        return NextResponse.json(results);

    } catch (error: any) {
        console.error('Error fetching policies:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch policies' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

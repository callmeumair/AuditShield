import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reports } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, desc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const context = await requireResourceAccess('reports', 'read');

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        const [results, countResult] = await Promise.all([
            db.select()
                .from(reports)
                .where(sql`${reports.organizationId} = ${context.orgId}`)
                .orderBy(desc(reports.createdAt))
                .limit(limit)
                .offset(offset),
            db.select({ count: sql<number>`count(*)` })
                .from(reports)
                .where(sql`${reports.organizationId} = ${context.orgId}`)
        ]);

        const total = Number(countResult[0]?.count || 0);

        return NextResponse.json({
            data: results,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error: any) {
        console.error('Error fetching reports:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch reports' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

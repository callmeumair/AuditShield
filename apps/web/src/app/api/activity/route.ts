import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditLogs } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, gte, lte, desc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const context = await requireResourceAccess('activity', 'read');

        const searchParams = request.nextUrl.searchParams;
        const tool = searchParams.get('tool'); // Filter by AI tool
        const action = searchParams.get('action'); // 'allowed', 'blocked', 'flagged'
        const minRisk = searchParams.get('minRisk'); // Min risk score
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 50; // Events per page

        // Build where conditions
        const conditions = [sql`${auditLogs.organizationId} = ${context.orgId}`];

        if (tool) {
            conditions.push(sql`${auditLogs.tool} = ${tool}`);
        }

        if (action) {
            conditions.push(sql`${auditLogs.actionTaken} = ${action}`);
        }

        if (minRisk) {
            conditions.push(sql`${auditLogs.riskScore} >= ${parseInt(minRisk)}`);
        }

        if (startDate) {
            conditions.push(gte(auditLogs.createdAt, new Date(startDate)));
        }

        if (endDate) {
            conditions.push(lte(auditLogs.createdAt, new Date(endDate)));
        }

        // Fetch activity logs with pagination
        const [activityLogs, totalCountResult] = await Promise.all([
            db
                .select({
                    id: auditLogs.id,
                    tool: auditLogs.tool,
                    domain: auditLogs.domain,
                    url: auditLogs.url,
                    userEmail: auditLogs.userEmail,
                    actionTaken: auditLogs.actionTaken,
                    riskScore: auditLogs.riskScore,
                    violationReasons: auditLogs.violationReasons,
                    createdAt: auditLogs.createdAt,
                })
                .from(auditLogs)
                .where(and(...conditions))
                .orderBy(desc(auditLogs.createdAt))
                .limit(limit)
                .offset((page - 1) * limit),

            db
                .select({ count: sql<number>`count(*)` })
                .from(auditLogs)
                .where(and(...conditions)),
        ]);

        const totalCount = Number(totalCountResult[0]?.count || 0);
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            events: activityLogs,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
            },
        });
    } catch (error: any) {
        console.error('Error fetching activity:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch activity' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

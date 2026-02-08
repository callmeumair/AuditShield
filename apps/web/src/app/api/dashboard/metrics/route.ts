import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditLogs, incidents, reports } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, gte, lte, desc } from 'drizzle-orm';
import { cache, CACHE_KEYS, CACHE_TTL } from '@/lib/cache';

export async function GET() {
    try {
        const context = await requireResourceAccess('dashboard', 'read');

        // Try to get cached data first
        const cacheKey = CACHE_KEYS.liveStats(context.orgId);
        const cached = await cache.get<any>(cacheKey);

        if (cached) {
            return NextResponse.json(cached);
        }

        // Calculate date ranges
        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Query metrics in parallel
        const [
            totalEventsResult,
            violationsResult,
            compliantSessionsResult,
            lastReportResult,
        ] = await Promise.all([
            // Total AI events (last 24 hours)
            db.select({ count: sql<number>`count(*)` })
                .from(auditLogs)
                .where(and(
                    sql`${auditLogs.organizationId} = ${context.orgId}`,
                    gte(auditLogs.createdAt, last24Hours)
                )),

            // Policy violations (last 24 hours)
            db.select({ count: sql<number>`count(*)` })
                .from(auditLogs)
                .where(and(
                    sql`${auditLogs.organizationId} = ${context.orgId}`,
                    gte(auditLogs.createdAt, last24Hours),
                    sql`${auditLogs.actionTaken} IN ('blocked', 'flagged')`
                )),

            // Compliant sessions (last 24 hours)
            db.select({ count: sql<number>`count(*)` })
                .from(auditLogs)
                .where(and(
                    sql`${auditLogs.organizationId} = ${context.orgId}`,
                    gte(auditLogs.createdAt, last24Hours),
                    sql`${auditLogs.actionTaken} = 'allowed'`
                )),

            // Last report generated
            db.select()
                .from(reports)
                .where(sql`${reports.organizationId} = ${context.orgId}`)
                .orderBy(desc(reports.createdAt))
                .limit(1),
        ]);

        const metrics = {
            totalEvents: Number(totalEventsResult[0]?.count || 0),
            violations: Number(violationsResult[0]?.count || 0),
            compliantSessions: Number(compliantSessionsResult[0]?.count || 0),
            lastReportGenerated: lastReportResult[0]?.createdAt || null,
        };

        // Cache for 5 minutes
        await cache.set(cacheKey, metrics, CACHE_TTL.liveStats);

        return NextResponse.json(metrics);
    } catch (error: any) {
        console.error('Error fetching dashboard metrics:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch metrics' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

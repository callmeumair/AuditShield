import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { auditLogs, organizations } from '@/db/schema';
import { eq, desc, sql, or } from 'drizzle-orm';
import { cache, CACHE_KEYS, CACHE_TTL } from '@/lib/cache';

/**
 * GET /api/stats/live
 * Real-time stats for dashboard live feed (with Redis caching)
 * Cache TTL: 2 seconds (matches SWR polling interval)
 */
export async function GET() {
    try {
        const { orgId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
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

        const organizationId = org.id;
        const cacheKey = CACHE_KEYS.liveStats(organizationId);

        // Use cache-aside pattern with 2-second TTL
        const data = await cache.getOrSet(
            cacheKey,
            CACHE_TTL.liveStats,
            async () => {
                console.log('[Cache MISS] Live stats for org:', organizationId);

                // Fetch recent logs (last 50)
                const recentLogs = await db
                    .select()
                    .from(auditLogs)
                    .where(eq(auditLogs.organizationId, organizationId))
                    .orderBy(desc(auditLogs.createdAt))
                    .limit(50);

                // Fetch stats
                const [statsResult] = await db
                    .select({
                        totalEvents: sql<number>`count(*):: int`,
                        violations: sql<number>`count(case when ${auditLogs.actionTaken} in ('flagged', 'blocked') then 1 end):: int`,
                        blocked: sql<number>`count(case when ${auditLogs.actionTaken} = 'blocked' then 1 end):: int`,
                        avgRiskScore: sql<number>`coalesce(avg(${auditLogs.riskScore}):: int, 0)`,
                    })
                    .from(auditLogs)
                    .where(eq(auditLogs.organizationId, organizationId));

                return {
                    recentLogs,
                    stats: {
                        totalEvents: statsResult?.totalEvents || 0,
                        violations: statsResult?.violations || 0,
                        blocked: statsResult?.blocked || 0,
                        avgRiskScore: statsResult?.avgRiskScore || 0,
                    }
                };
            }
        );

        console.log('[Cache] Live stats - Events:', data.stats.totalEvents);
        return NextResponse.json(data);
    } catch (error) {
        console.error('GET /api/stats/live error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

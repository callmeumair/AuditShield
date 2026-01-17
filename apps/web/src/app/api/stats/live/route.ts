import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { auditLogs, organizations } from '@/db/schema';
import { eq, desc, gte, sql } from 'drizzle-orm';

/**
 * GET /api/stats/live
 * Real-time statistics and recent audit logs for live feed
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
            // Return empty data if organization doesn't exist yet
            return NextResponse.json({
                recentLogs: [],
                stats: {
                    totalEvents: 0,
                    violations: 0,
                    blocked: 0,
                    avgRiskScore: 0
                }
            });
        }

        // Get recent audit logs (last 50)
        const recentLogs = await db
            .select({
                id: auditLogs.id,
                userEmail: auditLogs.userEmail,
                tool: auditLogs.tool,
                domain: auditLogs.domain,
                actionTaken: auditLogs.actionTaken,
                riskScore: auditLogs.riskScore,
                violationReasons: auditLogs.violationReasons,
                createdAt: auditLogs.createdAt,
            })
            .from(auditLogs)
            .where(eq(auditLogs.organizationId, org.id))
            .orderBy(desc(auditLogs.createdAt))
            .limit(50);

        // Calculate statistics
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const [stats] = await db
            .select({
                totalEvents: sql<number>`count(*)::int`,
                violations: sql<number>`count(case when ${auditLogs.actionTaken} in ('flagged', 'blocked') then 1 end)::int`,
                blocked: sql<number>`count(case when ${auditLogs.actionTaken} = 'blocked' then 1 end)::int`,
                avgRiskScore: sql<number>`coalesce(avg(${auditLogs.riskScore})::int, 0)`,
            })
            .from(auditLogs)
            .where(
                eq(auditLogs.organizationId, org.id)
            );

        return NextResponse.json({
            recentLogs,
            stats: {
                totalEvents: stats?.totalEvents || 0,
                violations: stats?.violations || 0,
                blocked: stats?.blocked || 0,
                avgRiskScore: stats?.avgRiskScore || 0
            }
        });
    } catch (error) {
        console.error('GET /api/stats/live error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

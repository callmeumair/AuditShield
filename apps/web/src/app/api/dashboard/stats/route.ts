import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditLogs, policies } from '@/db/schema';
import { count, eq, sql, or } from 'drizzle-orm';

export async function GET() {
    try {
        // Fetch total interactions from audit_logs
        const [interactions] = await db.select({ value: count() }).from(auditLogs);

        // Fetch active policies (enabled = 'true')
        const [activePolicies] = await db.select({ value: count() }).from(policies).where(eq(policies.enabled, 'true'));

        // Fetch violations (flagged or blocked events)
        const [violationsCount] = await db
            .select({ value: count() })
            .from(auditLogs)
            .where(or(eq(auditLogs.actionTaken, 'flagged'), eq(auditLogs.actionTaken, 'blocked')));

        // Mocking "Data Egress" for now (would need actual data capture)
        const egress = "1.2GB";

        return NextResponse.json({
            interactions: interactions.value,
            policies: activePolicies.value,
            violations: violationsCount.value,
            egress: egress
        });
    } catch (error) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

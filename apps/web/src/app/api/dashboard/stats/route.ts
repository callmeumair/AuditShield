import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditEvents, policies } from '@/db/schema';
import { count, eq, sql } from 'drizzle-orm';

export async function GET() {
    try {
        // Fetch total interactions (audit events)
        const [interactions] = await db.select({ value: count() }).from(auditEvents);

        // Fetch active policies (enabled = 'true')
        const [activePolicies] = await db.select({ value: count() }).from(policies).where(eq(policies.enabled, 'true'));

        // Mocking "Risk Violations" for now as we don't have a direct "violation" flag in events yet
        // In a real app, this would be a join between events and denied policies
        const violations = 0;

        // Mocking "Data Egress" (randomized for demo/MVP as we don't capture packet size yet)
        const egress = "1.2GB";

        return NextResponse.json({
            interactions: interactions.value,
            policies: activePolicies.value,
            violations: violations,
            egress: egress
        });
    } catch (error) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

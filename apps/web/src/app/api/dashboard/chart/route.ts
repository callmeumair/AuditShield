import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditEvents } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        // Aggregate events by hour for the chart
        // Note: 'date_trunc' is Postgres specific
        const chartData = await db.execute(sql`
            SELECT 
                to_char(created_at, 'HH24:00') as time,
                COUNT(*) as requests
            FROM ${auditEvents}
            WHERE created_at > NOW() - INTERVAL '24 hours'
            GROUP BY 1
            ORDER BY 1 ASC
        `) as unknown as any[];

        // If no data, return empty array mock structure or the empty result
        // We'll map it to the format Recharts expects
        const formattedData = chartData.map(row => ({
            time: row.time,
            requests: Number(row.requests),
            violations: 0 // Mocking violations for chart
        }));

        // If completely empty (fresh DB), provide some logical empty set or let frontend handle it
        if (formattedData.length === 0) {
            return NextResponse.json([
                { time: '09:00', requests: 0, violations: 0 },
                { time: '12:00', requests: 0, violations: 0 },
                { time: '15:00', requests: 0, violations: 0 },
            ]);
        }

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Chart API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditEvents } from '@/db/schema';
import { sql, gte } from 'drizzle-orm';

export async function GET() {
    try {
        // Get events from last 24 hours
        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);

        const events = await db
            .select({
                createdAt: auditEvents.createdAt,
            })
            .from(auditEvents)
            .where(gte(auditEvents.createdAt, oneDayAgo));

        // If no data, return mock structure for empty state
        if (events.length === 0) {
            const now = new Date();
            const mockData = [];
            for (let i = 23; i >= 0; i--) {
                const hour = new Date(now);
                hour.setHours(now.getHours() - i);
                mockData.push({
                    time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                    requests: 0,
                });
            }
            return NextResponse.json(mockData);
        }

        // Group by hour
        const hourlyData = new Map<string, number>();

        events.forEach(event => {
            if (event.createdAt) {
                const hour = new Date(event.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                hourlyData.set(hour, (hourlyData.get(hour) || 0) + 1);
            }
        });

        // Convert to array format for Recharts
        const formattedData = Array.from(hourlyData.entries())
            .map(([time, requests]) => ({
                time,
                requests,
            }))
            .sort((a, b) => a.time.localeCompare(b.time));

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Chart API Error:', error);
        // Return empty data instead of error to prevent UI breaking
        return NextResponse.json([
            { time: '00:00', requests: 0 },
            { time: '06:00', requests: 0 },
            { time: '12:00', requests: 0 },
            { time: '18:00', requests: 0 },
        ]);
    }
}

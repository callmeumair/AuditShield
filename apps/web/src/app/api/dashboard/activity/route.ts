import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditEvents } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
    try {
        // Fetch recent 5 events
        const events = await db.select()
            .from(auditEvents)
            .orderBy(desc(auditEvents.createdAt))
            .limit(5);

        // Format for frontend
        const formattedEvents = events.map(evt => ({
            id: evt.id,
            time: evt.createdAt ? new Date(evt.createdAt).toLocaleTimeString() : 'Just now',
            domain: evt.domain,
            user: evt.userId || 'Start auditing now', // Fallback
            status: 'allowed', // Defaulting to allowed for MVP
            hash: evt.hash?.substring(0, 12) + '...'
        }));

        return NextResponse.json(formattedEvents);
    } catch (error) {
        console.error('Activity API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 });
    }
}

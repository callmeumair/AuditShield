import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditEvents, organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';

// For MVP, we're skipping complex auth validation in the extension
// In production, you would validate a Bearer token here
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { domain, url, timestamp } = body;

        // Validate inputs
        if (!domain) {
            return NextResponse.json({ error: 'Missing domain' }, { status: 400 });
        }

        // For MVP Demo: associating with the first organization found or a "default" one
        // In real app: req.headers.get("Authorization") -> validate -> get orgId
        const firstOrg = await db.select().from(organizations).limit(1);

        if (firstOrg.length === 0) {
            // Auto-create default organization for smooth onboarding
            const [newOrg] = await db.insert(organizations).values({
                name: 'My Organization',
                slug: 'my-org',
                plan: 'active',
                clerkOrgId: 'default-org' // Temporary default for legacy extension calls
            }).returning();

            firstOrg.push(newOrg);
        }

        const organizationId = firstOrg[0].id;

        await db.insert(auditEvents).values({
            organizationId,
            domain,
            url,
            // userId: '...', // optionally from auth token
            eventType: 'access',
            metadata: { source: 'extension', timestamp },
            hash: 'pending_hash_calculation'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Ingest Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

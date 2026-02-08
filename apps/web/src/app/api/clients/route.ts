import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clients } from '@/db/schema';
import { requireRole } from '@/lib/auth/rbac';
import { sql, and, eq, desc } from 'drizzle-orm';
import crypto from 'crypto';

export async function GET() {
    try {
        const context = await requireRole('admin');

        const clientsList = await db
            .select({
                id: clients.id,
                email: clients.email,
                name: clients.name,
                lastAccessAt: clients.lastAccessAt,
                expiresAt: clients.expiresAt,
                createdAt: clients.createdAt,
                revokedAt: clients.revokedAt,
            })
            .from(clients)
            .where(sql`${clients.organizationId} = ${context.orgId}`)
            .orderBy(desc(clients.createdAt));

        return NextResponse.json(clientsList);
    } catch (error: any) {
        console.error('Error fetching clients:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch clients' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const context = await requireRole('admin');

        const body = await request.json();
        const { email, name, expiresInDays = 30 } = body;

        if (!email || !name) {
            return NextResponse.json(
                { error: 'Missing required fields: email, name' },
                { status: 400 }
            );
        }

        // Generate unique access token
        const accessToken = `client_${crypto.randomBytes(32).toString('hex')}`;

        // Calculate expiration date
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);

        // Create client
        const [client] = await db
            .insert(clients)
            .values({
                organizationId: context.orgId,
                email,
                name,
                accessToken,
                expiresAt,
                createdBy: context.userId,
                createdAt: new Date(),
            })
            .returning();

        // Return client with access token (only shown once)
        return NextResponse.json({
            ...client,
            accessUrl: `${process.env.NEXT_PUBLIC_APP_URL}/client/${accessToken}`,
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating client:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create client' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const context = await requireRole('admin');

        const searchParams = request.nextUrl.searchParams;
        const clientId = searchParams.get('id');

        if (!clientId) {
            return NextResponse.json(
                { error: 'Missing client ID' },
                { status: 400 }
            );
        }

        // Soft delete by setting revokedAt
        const [updated] = await db
            .update(clients)
            .set({ revokedAt: new Date() })
            .where(and(
                eq(clients.id, clientId),
                sql`${clients.organizationId} = ${context.orgId}`
            ))
            .returning();

        if (!updated) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error revoking client:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to revoke client' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

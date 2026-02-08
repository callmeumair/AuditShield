import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { incidents, auditLogs } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, desc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const context = await requireResourceAccess('incidents', 'read');

        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status'); // 'open', 'investigating', 'resolved', 'dismissed'
        const severity = searchParams.get('severity'); // 'low', 'medium', 'high', 'critical'

        // Build where conditions
        const conditions = [sql`${incidents.organizationId} = ${context.orgId}`];

        if (status) {
            conditions.push(sql`${incidents.status} = ${status}`);
        }

        if (severity) {
            conditions.push(sql`${incidents.severity} = ${severity}`);
        }

        // Fetch incidents with related audit logs
        const incidentsList = await db
            .select({
                id: incidents.id,
                title: incidents.title,
                severity: incidents.severity,
                status: incidents.status,
                assignedTo: incidents.assignedTo,
                resolvedAt: incidents.resolvedAt,
                createdAt: incidents.createdAt,
                updatedAt: incidents.updatedAt,
                auditLog: {
                    id: auditLogs.id,
                    tool: auditLogs.tool,
                    domain: auditLogs.domain,
                    userEmail: auditLogs.userEmail,
                    actionTaken: auditLogs.actionTaken,
                    riskScore: auditLogs.riskScore,
                },
            })
            .from(incidents)
            .leftJoin(auditLogs, eq(incidents.auditLogId, auditLogs.id))
            .where(and(...conditions))
            .orderBy(desc(incidents.createdAt))
            .limit(100);

        return NextResponse.json(incidentsList);
    } catch (error: any) {
        console.error('Error fetching incidents:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch incidents' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const context = await requireResourceAccess('incidents', 'write');

        const body = await request.json();
        const { auditLogId, title, severity, notes } = body;

        if (!auditLogId || !title || !severity) {
            return NextResponse.json(
                { error: 'Missing required fields: auditLogId, title, severity' },
                { status: 400 }
            );
        }

        // Verify audit log exists and belongs to organization
        const [auditLog] = await db
            .select()
            .from(auditLogs)
            .where(and(
                eq(auditLogs.id, auditLogId),
                sql`${auditLogs.organizationId} = ${context.orgId}`
            ))
            .limit(1);

        if (!auditLog) {
            return NextResponse.json(
                { error: 'Audit log not found' },
                { status: 404 }
            );
        }

        // Create incident
        const [incident] = await db
            .insert(incidents)
            .values({
                organizationId: context.orgId,
                auditLogId,
                title,
                severity,
                status: 'open',
                notes,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return NextResponse.json(incident, { status: 201 });
    } catch (error: any) {
        console.error('Error creating incident:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create incident' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

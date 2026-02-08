import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { incidents, auditLogs } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, and, eq } from 'drizzle-orm';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const context = await requireResourceAccess('incidents', 'read');
        const { id } = params;

        // Fetch incident with related audit log
        const [incident] = await db
            .select({
                id: incidents.id,
                title: incidents.title,
                severity: incidents.severity,
                status: incidents.status,
                assignedTo: incidents.assignedTo,
                notes: incidents.notes,
                resolvedAt: incidents.resolvedAt,
                resolvedBy: incidents.resolvedBy,
                createdAt: incidents.createdAt,
                updatedAt: incidents.updatedAt,
                auditLog: {
                    id: auditLogs.id,
                    tool: auditLogs.tool,
                    domain: auditLogs.domain,
                    url: auditLogs.url,
                    userEmail: auditLogs.userEmail,
                    userId: auditLogs.userId,
                    promptText: auditLogs.promptText,
                    actionTaken: auditLogs.actionTaken,
                    riskScore: auditLogs.riskScore,
                    violationReasons: auditLogs.violationReasons,
                    createdAt: auditLogs.createdAt,
                },
            })
            .from(incidents)
            .leftJoin(auditLogs, eq(incidents.auditLogId, auditLogs.id))
            .where(and(
                eq(incidents.id, id),
                sql`${incidents.organizationId} = ${context.orgId}`
            ))
            .limit(1);

        if (!incident) {
            return NextResponse.json(
                { error: 'Incident not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(incident);
    } catch (error: any) {
        console.error('Error fetching incident:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch incident' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const context = await requireResourceAccess('incidents', 'write');
        const { id } = params;

        const body = await request.json();
        const { status, assignedTo, notes, resolvedBy } = body;

        // Build update object
        const updateData: any = {
            updatedAt: new Date(),
        };

        if (status) updateData.status = status;
        if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
        if (notes !== undefined) updateData.notes = notes;

        // If marking as resolved
        if (status === 'resolved') {
            updateData.resolvedAt = new Date();
            updateData.resolvedBy = resolvedBy || context.userId;
        }

        // Update incident
        const [updated] = await db
            .update(incidents)
            .set(updateData)
            .where(and(
                eq(incidents.id, id),
                sql`${incidents.organizationId} = ${context.orgId}`
            ))
            .returning();

        if (!updated) {
            return NextResponse.json(
                { error: 'Incident not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error('Error updating incident:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update incident' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

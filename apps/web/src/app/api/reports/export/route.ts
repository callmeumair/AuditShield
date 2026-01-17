import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { auditLogs, organizations } from '@/db/schema';
import { eq, and, gte, lte, sql } from 'drizzle-orm';
import { generatePdfReport } from '@/lib/reports/generatePdf';

/**
 * GET /api/reports/export
 * Generate and download a PDF compliance report
 */
export async function GET(request: Request) {
    try {
        const { orgId } = await auth();

        if (!orgId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const url = new URL(request.url);
        const startDateParam = url.searchParams.get('startDate');
        const endDateParam = url.searchParams.get('endDate');

        if (!startDateParam || !endDateParam) {
            return NextResponse.json(
                { error: 'Missing required parameters: startDate, endDate' },
                { status: 400 }
            );
        }

        const startDate = new Date(startDateParam);
        const endDate = new Date(endDateParam);

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid date format' },
                { status: 400 }
            );
        }

        // Find organization
        const [org] = await db
            .select()
            .from(organizations)
            .where(eq(organizations.clerkOrgId, orgId))
            .limit(1);

        if (!org) {
            return NextResponse.json(
                { error: 'Organization not found' },
                { status: 404 }
            );
        }

        // Fetch audit logs for the date range
        const logs = await db
            .select()
            .from(auditLogs)
            .where(
                and(
                    eq(auditLogs.organizationId, org.id),
                    gte(auditLogs.createdAt, startDate),
                    lte(auditLogs.createdAt, endDate)
                )
            )
            .orderBy(auditLogs.createdAt);

        // Calculate statistics
        const [stats] = await db
            .select({
                totalEvents: sql<number>`count(*)::int`,
                totalViolations: sql<number>`count(case when ${auditLogs.actionTaken} in ('flagged', 'blocked') then 1 end)::int`,
                totalBlocked: sql<number>`count(case when ${auditLogs.actionTaken} = 'blocked' then 1 end)::int`,
            })
            .from(auditLogs)
            .where(
                and(
                    eq(auditLogs.organizationId, org.id),
                    gte(auditLogs.createdAt, startDate),
                    lte(auditLogs.createdAt, endDate)
                )
            );

        // Generate PDF
        const pdf = generatePdfReport({
            organizationName: org.name,
            periodStart: startDate,
            periodEnd: endDate,
            logs: logs as any,
            totalEvents: stats?.totalEvents || 0,
            totalViolations: stats?.totalViolations || 0,
            totalBlocked: stats?.totalBlocked || 0,
        });

        // Convert PDF to buffer
        const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

        // Return PDF as download
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="auditshield-report-${startDateParam}-to-${endDateParam}.pdf"`,
                'Content-Length': pdfBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('GET /api/reports/export error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

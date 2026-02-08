import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditLogs, reports, organizations } from '@/db/schema';
import { requireRole } from '@/lib/auth/rbac';
import { sql, and, gte, lte } from 'drizzle-orm';
import { generatePDFReport } from '@/lib/utils/pdfGenerator';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const context = await requireRole('admin');

    const body = await request.json();
    const { periodStart, periodEnd } = body;

    if (!periodStart || !periodEnd) {
      return NextResponse.json(
        { error: 'Missing required fields: periodStart, periodEnd' },
        { status: 400 }
      );
    }

    const startDate = new Date(periodStart);
    const endDate = new Date(periodEnd);

    // Fetch organization details
    const [org] = await db
      .select()
      .from(organizations)
      .where(sql`${organizations.clerkOrgId} = ${context.orgId}`)
      .limit(1);

    if (!org) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Fetch audit events for the period
    const events = await db
      .select({
        id: auditLogs.id,
        tool: auditLogs.tool,
        domain: auditLogs.domain,
        userEmail: auditLogs.userEmail,
        actionTaken: auditLogs.actionTaken,
        riskScore: auditLogs.riskScore,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .where(and(
        sql`${auditLogs.organizationId} = ${org.id}`,
        gte(auditLogs.createdAt, startDate),
        lte(auditLogs.createdAt, endDate)
      ))
      .orderBy(auditLogs.createdAt);

    // Calculate stats
    const totalEvents = events.length;
    const totalViolations = events.filter(e => e.actionTaken === 'blocked' || e.actionTaken === 'flagged').length;
    const compliantSessions = events.filter(e => e.actionTaken === 'allowed').length;

    // Generate PDF
    const { pdfBuffer, hash } = await generatePDFReport({
      organizationName: org.name,
      periodStart: startDate,
      periodEnd: endDate,
      totalEvents,
      totalViolations,
      compliantSessions,
      events: events.map(e => ({
        timestamp: e.createdAt!,
        tool: e.tool,
        user: e.userEmail || 'Unknown',
        action: e.actionTaken,
        riskScore: e.riskScore || 0,
      })),
      generatedBy: context.userId,
      generatedAt: new Date(),
    });

    // Save PDF to public directory (in production, use S3/R2)
    const filename = `report_${Date.now()}_${hash.substring(0, 8)}.pdf`;
    const publicPath = path.join(process.cwd(), 'public', 'reports', filename);

    try {
      await writeFile(publicPath, pdfBuffer);
    } catch (e) {
      // If directory doesn't exist, create it
      const { mkdir } = await import('fs/promises');
      await mkdir(path.join(process.cwd(), 'public', 'reports'), { recursive: true });
      await writeFile(publicPath, pdfBuffer);
    }

    // Save report metadata to database
    const [report] = await db
      .insert(reports)
      .values({
        organizationId: org.id,
        generatedBy: context.userId,
        periodStart: startDate,
        periodEnd: endDate,
        pdfUrl: `/reports/${filename}`,
        reportHash: hash,
        totalEvents,
        totalViolations,
        status: 'generated',
        createdAt: new Date(),
      })
      .returning();

    // Return both the report metadata and PDF
    return NextResponse.json({
      report,
      downloadUrl: `/reports/${filename}`,
    }, { status: 201 });

  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: error.message?.includes('Unauthorized') ? 403 : 500 }
    );
  }
}

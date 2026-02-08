import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reports } from '@/db/schema';
import { requireResourceAccess } from '@/lib/auth/rbac';
import { sql, eq, and } from 'drizzle-orm';
import { readFile } from 'fs/promises';
import path from 'path';
import { generateReportHash } from '@/lib/utils/hashUtils';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const context = await requireResourceAccess('reports', 'read');
        const { id } = params;

        // Fetch report
        const [report] = await db
            .select()
            .from(reports)
            .where(and(
                eq(reports.id, id),
                sql`${reports.organizationId} = ${context.orgId}`
            ))
            .limit(1);

        if (!report) {
            return NextResponse.json(
                { error: 'Report not found' },
                { status: 404 }
            );
        }

        // Read PDF file
        const pdfPath = path.join(process.cwd(), 'public', report.pdfUrl!);
        const pdfBuffer = await readFile(pdfPath);

        // Recalculate hash
        const currentHash = generateReportHash(pdfBuffer);

        // Compare hashes
        const verified = currentHash === report.reportHash;

        return NextResponse.json({
            verified,
            originalHash: report.reportHash,
            currentHash,
            timestamp: report.createdAt,
            message: verified
                ? 'Report integrity verified - content has not been tampered with'
                : 'WARNING: Report has been modified since generation',
        });

    } catch (error: any) {
        console.error('Error verifying report:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to verify report' },
            { status: error.message?.includes('Unauthorized') ? 403 : 500 }
        );
    }
}

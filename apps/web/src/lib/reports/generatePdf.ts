import jsPDF from 'jspdf';
import { format } from 'date-fns';

interface AuditLog {
    id: string;
    userEmail: string | null;
    tool: string;
    domain: string;
    actionTaken: string;
    riskScore: number | null;
    violationReasons: any;
    hashSignature: string;
    createdAt: Date | null;
}

interface ReportData {
    organizationName: string;
    periodStart: Date;
    periodEnd: Date;
    logs: AuditLog[];
    totalEvents: number;
    totalViolations: number;
    totalBlocked: number;
}

/**
 * Generate a compliance PDF report
 */
export function generatePdfReport(data: ReportData): jsPDF {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AuditShield Compliance Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Organization and period
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Organization: ${data.organizationName}`, 20, yPosition);
    yPosition += 7;
    doc.text(
        `Report Period: ${format(data.periodStart, 'MMM dd, yyyy')} - ${format(data.periodEnd, 'MMM dd, yyyy')}`,
        20,
        yPosition
    );
    yPosition += 7;
    doc.text(`Generated: ${format(new Date(), 'MMM dd, yyyy HH:mm:ss')}`, 20, yPosition);
    yPosition += 15;

    // Summary Statistics
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary Statistics', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const stats = [
        `Total Events: ${data.totalEvents}`,
        `Violations Flagged: ${data.totalViolations}`,
        `Events Blocked: ${data.totalBlocked}`,
        `Compliance Rate: ${data.totalEvents > 0 ? ((1 - data.totalViolations / data.totalEvents) * 100).toFixed(1) : 100}%`
    ];

    stats.forEach(stat => {
        doc.text(stat, 25, yPosition);
        yPosition += 7;
    });

    yPosition += 10;

    // Audit Log Table
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Audit Log Details', 20, yPosition);
    yPosition += 10;

    // Table headers
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Date/Time', 20, yPosition);
    doc.text('User', 55, yPosition);
    doc.text('Tool', 95, yPosition);
    doc.text('Action', 125, yPosition);
    doc.text('Risk', 155, yPosition);
    doc.text('Hash (First 16)', 175, yPosition);
    yPosition += 5;

    // Draw line
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 5;

    // Table rows
    doc.setFont('helvetica', 'normal');
    const maxLogsPerPage = 25;
    let logCount = 0;

    for (const log of data.logs.slice(0, 100)) { // Limit to 100 logs
        if (logCount > 0 && logCount % maxLogsPerPage === 0) {
            // New page
            doc.addPage();
            yPosition = 20;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.text('Date/Time', 20, yPosition);
            doc.text('User', 55, yPosition);
            doc.text('Tool', 95, yPosition);
            doc.text('Action', 125, yPosition);
            doc.text('Risk', 155, yPosition);
            doc.text('Hash (First 16)', 175, yPosition);
            yPosition += 5;
            doc.line(20, yPosition, pageWidth - 20, yPosition);
            yPosition += 5;
            doc.setFont('helvetica', 'normal');
        }

        const dateStr = log.createdAt ? format(new Date(log.createdAt), 'MM/dd HH:mm') : 'N/A';
        const userStr = log.userEmail ? log.userEmail.substring(0, 18) : 'Anonymous';
        const toolStr = log.tool.substring(0, 12);
        const actionStr = log.actionTaken;
        const riskStr = log.riskScore !== null ? String(log.riskScore) : '0';
        const hashStr = log.hashSignature.substring(0, 16);

        doc.text(dateStr, 20, yPosition);
        doc.text(userStr, 55, yPosition);
        doc.text(toolStr, 95, yPosition);

        // Color code action
        if (actionStr === 'blocked') {
            doc.setTextColor(220, 38, 38); // Red
        } else if (actionStr === 'flagged') {
            doc.setTextColor(245, 158, 11); // Amber
        } else {
            doc.setTextColor(34, 197, 94); // Green
        }
        doc.text(actionStr, 125, yPosition);
        doc.setTextColor(0, 0, 0); // Reset to black

        doc.text(riskStr, 155, yPosition);
        doc.setFontSize(7);
        doc.text(hashStr, 175, yPosition);
        doc.setFontSize(9);

        yPosition += 6;
        logCount++;
    }

    // Footer with hash verification note
    yPosition = pageHeight - 20;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(
        'Hash signatures ensure data immutability and can be verified against the database.',
        pageWidth / 2,
        yPosition,
        { align: 'center' }
    );

    return doc;
}

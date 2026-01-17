"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileText, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function ReportsPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [generating, setGenerating] = useState(false);

    const generateReport = async () => {
        if (!startDate || !endDate) {
            toast.error('Please select both start and end dates');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            toast.error('Start date must be before end date');
            return;
        }

        setGenerating(true);
        try {
            const response = await fetch(
                `/api/reports/export?startDate=${startDate}&endDate=${endDate}`
            );

            if (response.ok) {
                // Download the PDF
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `auditshield-report-${startDate}-to-${endDate}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                toast.success('Report generated successfully!');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to generate report');
            }
        } catch (error) {
            console.error('Failed to generate report:', error);
            toast.error('Failed to generate report');
        } finally {
            setGenerating(false);
        }
    };

    // Quick date range helpers
    const setQuickRange = (days: number) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        setStartDate(format(start, 'yyyy-MM-dd'));
        setEndDate(format(end, 'yyyy-MM-dd'));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
                <p className="text-slate-500 mt-2">Generate compliance reports with tamper-proof hash verification</p>
            </div>

            {/* Report Generator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Generate Compliance Report
                        </CardTitle>
                        <CardDescription>
                            Export audit logs as a PDF report with hash signatures for verification
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Quick Date Ranges */}
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Quick Ranges</Label>
                            <div className="flex gap-2 mt-2">
                                {[
                                    { label: 'Last 7 Days', days: 7 },
                                    { label: 'Last 30 Days', days: 30 },
                                    { label: 'Last 90 Days', days: 90 },
                                ].map(range => (
                                    <Button
                                        key={range.days}
                                        onClick={() => setQuickRange(range.days)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        {range.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Date Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="startDate" className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Start Date
                                </Label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <Label htmlFor="endDate" className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    End Date
                                </Label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={generateReport}
                            disabled={generating || !startDate || !endDate}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            {generating ? (
                                <>Generating Report...</>
                            ) : (
                                <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate & Download PDF
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Report Features */}
            <Card className="border-emerald-200 bg-emerald-50">
                <CardHeader>
                    <CardTitle className="text-emerald-900">Report Features</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-emerald-900 space-y-2">
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">✓</div>
                        <div><strong>Tamper-Proof:</strong> Each audit log includes a SHA-256 hash signature for immutability verification</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">✓</div>
                        <div><strong>Comprehensive:</strong> Includes summary statistics, detailed audit logs, and compliance metrics</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">✓</div>
                        <div><strong>Audit-Ready:</strong> Professional PDF format suitable for compliance audits and regulatory requirements</div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">✓</div>
                        <div><strong>Customizable:</strong> Select any date range to generate reports for specific periods</div>
                    </div>
                </CardContent>
            </Card>

            {/* Hash Verification Info */}
            <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                    <CardTitle className="text-blue-900">Hash Verification</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-900">
                    <p className="mb-3">
                        Each audit log entry includes a SHA-256 hash signature that proves the data hasn't been tampered with.
                    </p>
                    <p className="font-mono text-xs bg-blue-100 p-3 rounded">
                        Hash = SHA256(prompt_text + timestamp + user_email)
                    </p>
                    <p className="mt-3">
                        You can verify any log entry by recomputing its hash and comparing it to the stored signature in the database.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

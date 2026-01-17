'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        toast.loading("Generating PDF report...", { id: "pdf-download" });

        try {
            const response = await fetch('/api/reports/generate', { method: 'POST' });

            if (!response.ok) throw new Error('Generation failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `auditshield-report-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success("Report downloaded successfully", { id: "pdf-download" });
        } catch (error) {
            toast.error("Failed to generate report", { id: "pdf-download" });
            console.error(error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Compliance Reports</h1>
                    <p className="text-muted-foreground/90 mt-2">
                        Generate and export tamper-evident audit logs for your organization.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* PDF Report Card */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <FileDown className="h-6 w-6" />
                        </div>
                        <CardTitle>Full Audit Trail</CardTitle>
                        <CardDescription>
                            Complete list of all detected AI events, timestamped and SHA-256 hashed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={handleDownload}
                            className="w-full"
                            disabled={downloading}
                        >
                            {downloading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Download PDF
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Future: CSV Export */}
                <Card className="opacity-60">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground mb-4">
                            <FileText className="h-6 w-6" />
                        </div>
                        <CardTitle>CSV Export</CardTitle>
                        <CardDescription>
                            Export raw data for custom analysis and reporting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" variant="outline" disabled>
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>

                {/* Future: Scheduled Reports */}
                <Card className="opacity-60">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground mb-4">
                            <FileDown className="h-6 w-6" />
                        </div>
                        <CardTitle>Scheduled Reports</CardTitle>
                        <CardDescription>
                            Automatically generate and email reports weekly or monthly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" variant="outline" disabled>
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

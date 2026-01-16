'use client';

import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {

    const handleDownload = async () => {
        toast.info("Generating PDF report...");

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

            toast.success("Report downloaded successfully");
        } catch (error) {
            toast.error("Failed to generate report");
            console.error(error);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Compliance Reports</h1>
                    <p className="text-muted-foreground mt-2">
                        Generate and export tamper-evident audit logs for your organization.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* PDF Report Card */}
                <div className="p-6 rounded-lg border bg-card shadow-sm space-y-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <FileDown className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Full Audit Trail</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Complete list of all detected AI events, timestamped and hashed.
                        </p>
                    </div>
                    <Button onClick={handleDownload} className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </div>
            </div>
        </div>
    );
}

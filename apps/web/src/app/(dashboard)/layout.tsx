import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Sidebar />

            <main className="flex-1 ml-64 min-h-screen flex flex-col">
                <header className="h-16 flex items-center justify-between px-8 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        {/* Breadcrumbs could go here */}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="sm" variant="outline" className="h-8 gap-2 border-border/60 hover:bg-secondary">
                            <Download className="h-3.5 w-3.5" />
                            Extension
                        </Button>
                        <Button size="sm" className="h-8 shadow-md shadow-primary/20">Documentation</Button>
                    </div>
                </header>
                <div className="flex-1 p-8 max-w-[1600px] w-full mx-auto space-y-8 animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}

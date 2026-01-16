import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import Link from "next/link";
import { ShieldCheck, LayoutDashboard, FileText, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col fixed inset-y-0 z-30">
                <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg text-sidebar-primary">
                        <ShieldCheck className="h-6 w-6" />
                        <span>AuditShield</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="h-4 w-4" />
                            Overview
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                        <Link href="/dashboard/reports">
                            <FileText className="h-4 w-4" />
                            Reports
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                        <Link href="/dashboard/policies">
                            <Shield className="h-4 w-4" />
                            Policies
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                        <Link href="/dashboard/settings">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </Button>
                </nav>

                <div className="p-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider mb-1">Organization</span>
                            <OrganizationSwitcher
                                hidePersonal={true}
                                appearance={{
                                    elements: {
                                        rootBox: "flex items-center w-full",
                                        organizationPreviewMainIdentifier: "text-foreground font-medium text-xs truncate max-w-[120px]",
                                        organizationPreviewSecondaryIdentifier: "hidden"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 bg-background">
                <header className="h-16 flex items-center justify-between px-8 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-20">
                    <h1 className="font-semibold text-lg">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        {/* Header Actions */}
                        <Button size="sm" variant="outline">Docs</Button>
                        <Button size="sm">Download Extension</Button>
                    </div>
                </header>
                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

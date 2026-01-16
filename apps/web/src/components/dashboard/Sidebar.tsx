"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { ShieldCheck, LayoutDashboard, FileText, Settings, Shield, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Feed', href: '/dashboard/feed', icon: Activity },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Policies', href: '/dashboard/policies', icon: Shield },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-border/40 bg-sidebar/95 backdrop-blur-xl flex flex-col fixed inset-y-0 z-30 shadow-2xl transition-all duration-300">
            <div className="h-16 flex items-center px-6 border-b border-border/40 bg-sidebar/50">
                <Link href="/dashboard" className="flex items-center gap-3 font-bold text-lg text-foreground tracking-tight">
                    <div className="p-1 bg-primary/10 rounded-lg">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <span>AuditShield</span>
                </Link>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-4 w-4 transition-colors",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-border/40 bg-muted/20">
                <OrganizationSwitcher
                    hidePersonal={true}
                    appearance={{
                        elements: {
                            rootBox: "flex items-center w-full mb-4 px-2",
                            organizationPreviewMainIdentifier: "text-foreground font-medium text-xs",
                        }
                    }}
                />
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <UserButton afterSignOutUrl="/" showName={true} appearance={{
                        elements: {
                            userButtonBox: "flex-row-reverse gap-3",
                            userButtonOuterIdentifier: "text-sm font-medium text-foreground",
                        }
                    }} />
                </div>
            </div>
        </aside>
    );
}

"use client";

import { Shield, Lock, FileCheck, Award } from "lucide-react";

const badges = [
    {
        icon: Shield,
        title: "SOC 2 Type II",
        subtitle: "Ready",
    },
    {
        icon: Lock,
        title: "AES-256",
        subtitle: "Encryption",
    },
    {
        icon: FileCheck,
        title: "GDPR",
        subtitle: "Compliant",
    },
    {
        icon: Award,
        title: "ISO 27001",
        subtitle: "Certified",
    },
];

export function TrustBadges() {
    return (
        <div className="py-12 border-y border-border/40 bg-secondary/5">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-xs font-medium text-muted-foreground/70 uppercase tracking-widest mb-8">
                    Enterprise-Grade Security & Compliance
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all group"
                        >
                            <badge.icon className="h-8 w-8 text-muted-foreground/80 mb-3 group-hover:text-primary transition-colors" />
                            <div className="text-center">
                                <p className="text-sm font-semibold text-foreground">
                                    {badge.title}
                                </p>
                                <p className="text-xs text-muted-foreground/70 mt-1">
                                    {badge.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

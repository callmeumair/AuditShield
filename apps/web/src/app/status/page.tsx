"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { CheckCircle2, Activity } from "lucide-react";

export default function StatusPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            System Status
                        </span>
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-green-500 font-medium">All Systems Operational</span>
                    </div>
                </AnimatedSection>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <div className="space-y-4">
                            {[
                                { service: "API", status: "Operational", uptime: "99.99%" },
                                { service: "Dashboard", status: "Operational", uptime: "99.98%" },
                                { service: "Browser Extension", status: "Operational", uptime: "100%" },
                                { service: "Report Generation", status: "Operational", uptime: "99.97%" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Activity className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="font-semibold">{item.service}</h3>
                                            <p className="text-sm text-muted-foreground">Uptime: {item.uptime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span className="text-green-500 font-medium">{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
}

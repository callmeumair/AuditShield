"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Code, Terminal, Zap } from "lucide-react";

export default function APIReferencePage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            API Reference
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        RESTful API for custom integrations and automation
                    </p>
                </AnimatedSection>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection className="mb-16">
                        <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-4">Authentication</h2>
                            <p className="text-muted-foreground mb-6">
                                All API requests require authentication using an API key
                            </p>
                            <div className="bg-secondary/50 p-6 rounded-lg font-mono text-sm">
                                <div className="text-muted-foreground mb-2"># Example Request</div>
                                <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                                <div className="ml-4">https://api.auditshield.ai/v1/events</div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="space-y-8">
                            {[
                                {
                                    endpoint: "GET /v1/events",
                                    desc: "Retrieve audit events",
                                    icon: Terminal
                                },
                                {
                                    endpoint: "POST /v1/policies",
                                    desc: "Create or update policies",
                                    icon: Code
                                },
                                {
                                    endpoint: "GET /v1/reports",
                                    desc: "Generate compliance reports",
                                    icon: Zap
                                }
                            ].map((api, i) => (
                                <div key={i} className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-4 mb-3">
                                        <api.icon className="h-6 w-6 text-primary" />
                                        <code className="text-lg font-semibold">{api.endpoint}</code>
                                    </div>
                                    <p className="text-muted-foreground">{api.desc}</p>
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

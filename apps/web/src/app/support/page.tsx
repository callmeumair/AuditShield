"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { MessageSquare, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Support Center
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        We're here to help you succeed with AuditShield
                    </p>
                </AnimatedSection>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {[
                            {
                                icon: MessageSquare,
                                title: "Live Chat",
                                desc: "Chat with our support team",
                                detail: "Mon-Fri, 9am-5pm PT"
                            },
                            {
                                icon: Mail,
                                title: "Email Support",
                                desc: "support@auditshield.ai",
                                detail: "24-hour response time"
                            },
                            {
                                icon: Phone,
                                title: "Phone Support",
                                desc: "+1 (555) 123-4567",
                                detail: "Enterprise customers only"
                            },
                            {
                                icon: Clock,
                                title: "Status Page",
                                desc: "Check system status",
                                detail: "Real-time updates"
                            }
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all">
                                    <item.icon className="h-10 w-10 text-primary mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground mb-1">{item.desc}</p>
                                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="text-center">
                        <div className="p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-indigo-500/10 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
                            <p className="text-muted-foreground mb-6">
                                Contact our support team directly
                            </p>
                            <Button size="lg" className="rounded-full" asChild>
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
}

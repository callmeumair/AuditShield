"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import {
    Download, Settings, FileCheck, Zap, Shield,
    CheckCircle2, ArrowRight, Chrome, Users,
    BarChart3, Bell, Code, Lock
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function HowItWorksPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="xl" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        From Setup to
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Compliance in Minutes
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Get your entire organization protected and compliant faster than you can schedule a meeting about it.
                    </p>
                </AnimatedSection>
            </section>

            {/* Main Steps */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-32">
                        {/* Step 1 */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <AnimatedSection>
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                                    <span className="flex h-8 w-8 rounded-full bg-primary text-primary-foreground items-center justify-center mr-3 font-bold">1</span>
                                    Installation
                                </div>
                                <h2 className="text-4xl font-bold mb-6">
                                    Deploy the Browser Extension
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Install AuditShield's lightweight browser extension across your organization.
                                    Works with Chrome, Edge, and Firefox. Deploy via MDM, group policy, or manual installation.
                                </p>
                                <div className="space-y-4 mb-8">
                                    {[
                                        "Download from Chrome Web Store or deploy via MDM",
                                        "Zero configuration required - works immediately",
                                        "Less than 1MB download, minimal performance impact",
                                        "Automatic updates keep you protected"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                            <p className="text-muted-foreground">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" className="rounded-full" asChild>
                                    <Link href="/contact">
                                        Get Installation Guide <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Chrome className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">AuditShield Extension</h3>
                                            <p className="text-sm text-muted-foreground">v2.1.0 • 892KB</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
                                            <span className="text-sm">Chrome Web Store</span>
                                            <Download className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
                                            <span className="text-sm">Edge Add-ons</span>
                                            <Download className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
                                            <span className="text-sm">Firefox Add-ons</span>
                                            <Download className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between">
                                            <span className="text-sm">Enterprise MSI Package</span>
                                            <Download className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Step 2 */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <AnimatedSection delay={0.2} className="order-2 lg:order-1">
                                <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-xl">
                                    <div className="space-y-6">
                                        <div className="p-4 rounded-lg bg-secondary/50">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold">Allowed AI Tools</h4>
                                                <span className="text-xs text-muted-foreground">3 tools</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>chat.openai.com</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>claude.ai</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>gemini.google.com</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-secondary/50">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold">Data Protection Rules</h4>
                                                <span className="text-xs text-muted-foreground">Enabled</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Lock className="h-4 w-4 text-primary" />
                                                    <span>Block PII (emails, SSN, credit cards)</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Lock className="h-4 w-4 text-primary" />
                                                    <span>Block API keys and credentials</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection className="order-1 lg:order-2">
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                                    <span className="flex h-8 w-8 rounded-full bg-primary text-primary-foreground items-center justify-center mr-3 font-bold">2</span>
                                    Configuration
                                </div>
                                <h2 className="text-4xl font-bold mb-6">
                                    Configure Your Policies
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Set up your organization's AI governance policies through our intuitive dashboard.
                                    Define what's allowed, what's blocked, and what requires approval.
                                </p>
                                <div className="space-y-4 mb-8">
                                    {[
                                        "Create allowlists for approved AI tools",
                                        "Set up data protection rules to prevent leaks",
                                        "Configure role-based access controls",
                                        "Customize alerts and notifications"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                            <p className="text-muted-foreground">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" variant="outline" className="rounded-full" asChild>
                                    <Link href="/features">
                                        Explore Policy Options <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </AnimatedSection>
                        </div>

                        {/* Step 3 */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <AnimatedSection>
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                                    <span className="flex h-8 w-8 rounded-full bg-primary text-primary-foreground items-center justify-center mr-3 font-bold">3</span>
                                    Monitoring
                                </div>
                                <h2 className="text-4xl font-bold mb-6">
                                    Monitor & Generate Reports
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Watch AI usage in real-time and generate audit-ready reports whenever you need them.
                                    Everything is logged, encrypted, and ready for compliance reviews.
                                </p>
                                <div className="space-y-4 mb-8">
                                    {[
                                        "Real-time dashboard shows all AI activity",
                                        "Instant alerts for policy violations",
                                        "One-click PDF report generation",
                                        "SHA-256 signed reports for legal defense"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                            <p className="text-muted-foreground">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" className="rounded-full" asChild>
                                    <Link href="/dashboard">
                                        View Live Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-xl">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                                            <div>
                                                <p className="font-semibold">Total AI Requests</p>
                                                <p className="text-3xl font-bold text-primary">2,543</p>
                                            </div>
                                            <BarChart3 className="h-10 w-10 text-primary/40" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <div>
                                                <p className="font-semibold text-green-500">Compliant</p>
                                                <p className="text-2xl font-bold">2,520</p>
                                            </div>
                                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                            <div>
                                                <p className="font-semibold text-amber-500">Flagged</p>
                                                <p className="text-2xl font-bold">23</p>
                                            </div>
                                            <Bell className="h-8 w-8 text-amber-500" />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Architecture */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">How It Works Under the Hood</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Enterprise-grade security and privacy built into every layer
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Chrome,
                                title: "Browser Extension",
                                desc: "Lightweight extension monitors web traffic for AI patterns. Only domains are logged - content stays private."
                            },
                            {
                                icon: Shield,
                                title: "Secure API",
                                desc: "All data transmitted via encrypted HTTPS. SHA-256 hashing ensures tamper-proof audit trails."
                            },
                            {
                                icon: Code,
                                title: "Cloud Dashboard",
                                desc: "Centralized dashboard for policy management, monitoring, and reporting. SOC 2 Type II certified."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm text-center"
                            >
                                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <AnimatedSection className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Join hundreds of organizations using AuditShield to secure their AI usage
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20" asChild>
                            <Link href="/sign-up">
                                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full" asChild>
                            <Link href="/contact">Schedule Demo</Link>
                        </Button>
                    </div>
                </AnimatedSection>
            </section>

            <Footer />
        </div>
    );
}

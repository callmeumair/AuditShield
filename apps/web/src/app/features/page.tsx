"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import {
    Search, Lock, FileText, Eye, Shield, Zap,
    Globe, Terminal, Database, AlertTriangle,
    CheckCircle2, ArrowRight, Code, Users, BarChart3
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function FeaturesPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />
                <GradientBlob className="bottom-0 left-0" color="secondary" size="md" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        Enterprise-Grade
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            AI Compliance
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Every feature designed to give you complete control, visibility, and defensible proof of AI governance.
                    </p>
                </AnimatedSection>
            </section>

            {/* Core Features Grid */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Core Capabilities</h2>
                        <p className="text-xl text-muted-foreground">
                            Everything you need to manage AI usage across your organization
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Search,
                                title: "Shadow AI Detection",
                                desc: "Automatically discover all AI tools being used across your organization, including ChatGPT, Claude, Gemini, and hundreds more.",
                                features: ["Real-time detection", "Domain fingerprinting", "Usage analytics", "Team insights"]
                            },
                            {
                                icon: Lock,
                                title: "Data Leak Prevention",
                                desc: "Prevent sensitive information from leaving your organization through AI prompts with intelligent pattern detection.",
                                features: ["PII detection", "API key scanning", "Custom patterns", "Instant blocking"]
                            },
                            {
                                icon: FileText,
                                title: "Audit-Ready Reports",
                                desc: "Generate tamper-evident, cryptographically signed reports that satisfy auditors, legal teams, and regulators.",
                                features: ["SHA-256 hashing", "PDF export", "Custom branding", "Compliance templates"]
                            },
                            {
                                icon: Shield,
                                title: "Policy Enforcement",
                                desc: "Define and enforce granular policies for AI usage based on teams, roles, data sensitivity, and business context.",
                                features: ["Role-based rules", "Allowlists/blocklists", "Conditional logic", "Override controls"]
                            },
                            {
                                icon: Eye,
                                title: "Real-Time Monitoring",
                                desc: "Live dashboard showing all AI interactions as they happen with instant alerts for policy violations.",
                                features: ["Live feed", "Custom alerts", "Slack/Teams integration", "Anomaly detection"]
                            },
                            {
                                icon: Database,
                                title: "Centralized Logging",
                                desc: "All AI interactions logged to a secure, encrypted database with configurable retention periods.",
                                features: ["Encrypted storage", "Long-term retention", "Search & filter", "Export capabilities"]
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                whileHover={{ y: -8 }}
                                className="group p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl transition-all"
                            >
                                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground mb-6">{feature.desc}</p>
                                <ul className="space-y-2">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                            <CheckCircle2 className="h-4 w-4 text-primary mr-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Detailed Feature: Shadow AI Detection */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                                <Search className="h-4 w-4 mr-2" />
                                Detection Engine
                            </div>
                            <h2 className="text-4xl font-bold mb-6">
                                Discover Every AI Tool in Your Stack
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                AuditShield's detection engine identifies AI usage across your entire organization,
                                giving you complete visibility into which tools are being used, by whom, and how often.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Detects 500+ AI tools including ChatGPT, Claude, Gemini, Midjourney, and more",
                                    "Browser extension monitors all web traffic for AI patterns",
                                    "Zero configuration required - works out of the box",
                                    "Privacy-first: only domains are logged, not content"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-xl">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-primary" />
                                            <span className="font-medium">chat.openai.com</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">142 requests</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-primary" />
                                            <span className="font-medium">claude.ai</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">89 requests</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                                            <span className="font-medium">unknown-ai.com</span>
                                        </div>
                                        <span className="text-sm text-amber-500">Flagged</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-primary" />
                                            <span className="font-medium">gemini.google.com</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">67 requests</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Detailed Feature: Data Leak Prevention */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection delay={0.2} className="order-2 lg:order-1">
                            <div className="rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-8 shadow-xl">
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <div className="flex items-start gap-3 mb-2">
                                            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-medium text-red-500 mb-1">Blocked: PII Detected</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Prompt contained email address and credit card number
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <div className="flex items-start gap-3 mb-2">
                                            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-medium text-red-500 mb-1">Blocked: API Key</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Detected AWS access key pattern in prompt
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <div className="flex items-start gap-3 mb-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-medium text-green-500 mb-1">Allowed</p>
                                                <p className="text-sm text-muted-foreground">
                                                    No sensitive data detected
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection className="order-1 lg:order-2">
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                                <Lock className="h-4 w-4 mr-2" />
                                DLP Engine
                            </div>
                            <h2 className="text-4xl font-bold mb-6">
                                Stop Data Leaks Before They Happen
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Our intelligent DLP engine scans every AI prompt in real-time, blocking requests
                                that contain sensitive information before they leave your network.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Detects PII, credit cards, SSNs, and other sensitive data patterns",
                                    "Custom regex patterns for your specific data types",
                                    "Instant blocking with user-friendly error messages",
                                    "Detailed logs of all blocked requests for compliance"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Integration & Deployment */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Seamless Integration</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Deploy across your organization in minutes with zero disruption
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { icon: Zap, title: "Browser Extension", desc: "Chrome, Edge, Firefox support" },
                            { icon: Code, title: "API Access", desc: "RESTful API for custom integrations" },
                            { icon: Users, title: "SSO Support", desc: "SAML, OAuth, Active Directory" },
                            { icon: BarChart3, title: "Analytics Export", desc: "CSV, JSON, webhook endpoints" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center hover:border-primary/30 transition-all"
                            >
                                <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
                <AnimatedSection className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        See AuditShield in Action
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Schedule a personalized demo to see how AuditShield can transform your AI governance
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20" asChild>
                            <Link href="/contact">
                                Request Demo <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full" asChild>
                            <Link href="/pricing">View Pricing</Link>
                        </Button>
                    </div>
                </AnimatedSection>
            </section>

            <Footer />
        </div>
    );
}

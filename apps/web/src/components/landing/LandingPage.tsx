"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Activity, Search, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden selection:bg-primary/20">
            {/* Navigation */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="px-6 h-20 flex items-center border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-50"
            >
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary blur-lg opacity-40 rounded-full"></div>
                        <ShieldCheck className="h-7 w-7 text-primary relative z-10" />
                    </div>
                    <span>AuditShield</span>
                </div>
                <nav className="ml-auto flex items-center gap-8 text-sm font-medium text-muted-foreground hidden md:flex">
                    <Link href="#features" className="hover:text-foreground hover:scale-105 transition-all">Features</Link>
                    <Link href="#how-it-works" className="hover:text-foreground hover:scale-105 transition-all">How it Works</Link>
                    <Link href="#pricing" className="hover:text-foreground hover:scale-105 transition-all">Pricing</Link>
                </nav>
                <div className="ml-8 flex items-center gap-4">
                    <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">Log in</Link>
                    <Button asChild size="default" className="rounded-full px-6 shadow-primary/25 shadow-lg hover:shadow-primary/40 transition-all">
                        <Link href="/sign-up">Get Started</Link>
                    </Button>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -z-10 opacity-20 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    The Standard for AI Compliance
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                >
                    Policies are not proof.<br />
                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">AuditShield is.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-8 text-xl text-muted-foreground/80 max-w-2xl leading-relaxed"
                >
                    Automatically detect, log, and audit every AI interaction in your organization.
                    Turn "Shadow AI" into a secure, managed asset.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
                        <Link href="/dashboard">
                            Start Auditing Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border/60 hover:bg-secondary/50 backdrop-blur-sm transition-all" asChild>
                        <Link href="#features">View Live Demo</Link>
                    </Button>
                </motion.div>

                {/* Hero Visual/Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-20 w-full max-w-5xl rounded-xl border border-border/50 bg-background/50 backdrop-blur-md shadow-2xl overflow-hidden aspect-[16/9] relative group"
                >
                    {/* Mock Dashboard UI for visual interest */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-background via-secondary/10 to-primary/5"></div>
                    <div className="absolute inset-x-0 top-0 h-10 border-b border-border/40 bg-secondary/20 flex items-center px-4 space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>
                    {/* Abstract grid lines */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm font-mono tracking-wider">
                        [ Interactive Audit Dashboard Preview ]
                    </div>
                </motion.div>
            </section>

            {/* Stats / Trust */}
            <section className="py-12 border-y border-border/40 bg-secondary/20">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "AI Events Logged", value: "1.2M+" },
                        { label: "Compliance Rate", value: "99.9%" },
                        { label: "Audits Passed", value: "500+" },
                        { label: "Enterprise Teams", value: "50+" },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                            <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 md:px-12 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight">Complete Visibility. Zero Friction.</h2>
                        <p className="text-xl text-muted-foreground">
                            AuditShield sits quietly in the background, monitoring AI usage without interrupting your team's workflow.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Search,
                                title: "Shadow AI Detection",
                                desc: "Instantly identify unauthorized LLM usage across your network. Know exactly which tools are being used."
                            },
                            {
                                icon: Lock,
                                title: "Data Leak Prevention",
                                desc: "Block or flag capabilities when sensitive data patterns (PII, API Keys) are detected in prompts."
                            },
                            {
                                icon: FileText,
                                title: "Audit-Ready Logs",
                                desc: "Generate SHA-256 hashed, tamper-evident PDF reports for implementation in your compliance framework."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                            >
                                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="py-24 bg-gradient-to-b from-secondary/30 to-background border-y border-border/50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 space-y-8">
                            <h2 className="text-4xl font-bold">From Chaos to Compliance in <span className="text-primary">3 Steps</span></h2>

                            <div className="space-y-8">
                                {[
                                    { title: "Install Extension", desc: "Deploy our lightweight browser extension via MDM or group policy." },
                                    { title: "Configure Policy", desc: "Set allowlists, blocklists, and data handling rules in the dashboard." },
                                    { title: "Generate Proof", desc: "Export signed audit logs to prove compliance to stakeholders." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold">{step.title}</h4>
                                            <p className="text-muted-foreground">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            {/* Abstract illustration of connection/flow */}
                            <div className="aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-indigo-500/5 blur-3xl absolute inset-0"></div>
                            <Activity className="w-full h-auto text-primary/10 animate-pulse relative z-10" strokeWidth={0.5} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 flex justify-center">
                <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 max-w-5xl w-full text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to secure your AI usage?</h2>
                    <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                        Join forward-thinking companies who use AuditShield to innovate safely.
                    </p>
                    <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-lg relative z-10 hover:scale-105 transition-transform" asChild>
                        <Link href="/sign-up">Start Free Trial</Link>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border bg-background/50">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        AuditShield
                    </div>
                    <div className="text-sm text-muted-foreground flex gap-8">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground">Security</Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} AuditShield Inc.
                    </p>
                </div>
            </footer>
        </div>
    );
}

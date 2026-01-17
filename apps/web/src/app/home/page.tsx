"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import {
    ShieldCheck, Lock, Activity, Search, FileText,
    ArrowRight, CheckCircle2, Zap, Users, TrendingUp,
    Globe, Terminal, Eye, Shield, Play
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden selection:bg-primary/20">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="xl" />
                <GradientBlob className="bottom-0 left-0" color="secondary" size="lg" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    The Standard for AI Compliance
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground max-w-5xl mb-8"
                >
                    Policies are not proof.
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-primary">
                        AuditShield is.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl leading-relaxed mb-10"
                >
                    Automatically detect, log, and audit every AI interaction in your organization.
                    Turn "Shadow AI" into a secure, managed asset with defensible proof.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-20"
                >
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
                        <Link href="/dashboard">
                            Start Auditing Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border/60 hover:bg-secondary/50 backdrop-blur-sm transition-all" asChild>
                        <Link href="/contact">Request Demo</Link>
                    </Button>
                </motion.div>

                {/* Hero Visual - Enhanced with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-full max-w-6xl rounded-2xl border border-border/50 bg-background/50 backdrop-blur-md shadow-2xl overflow-hidden aspect-[16/9] relative group hover:border-primary/30 transition-all"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-background via-secondary/10 to-primary/5"></div>
                    <div className="absolute inset-x-0 top-0 h-12 border-b border-border/40 bg-secondary/20 flex items-center px-4 space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                        <div className="flex-1 text-center text-xs text-muted-foreground/60 font-mono">AuditShield Dashboard</div>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="flex items-center justify-center h-full pt-12">
                        <div className="text-center space-y-6 relative">
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.4, 0.6, 0.4]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative"
                            >
                                <Terminal className="h-20 w-20 text-primary/40 mx-auto" />
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                            </motion.div>
                            <div className="space-y-2">
                                <p className="text-muted-foreground/90 text-sm font-mono tracking-wider">
                                    [ Live Dashboard Preview ]
                                </p>
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
                                    <Play className="h-3 w-3" />
                                    <span>Click "Start Auditing Now" to explore</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section - Enhanced with Count-Up Animation */}
            <section className="py-16 border-y border-border/40 bg-secondary/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        {[
                            { label: "AI Events Logged", value: 1200000, suffix: "+", decimals: 0, icon: Activity },
                            { label: "Compliance Rate", value: 99.9, suffix: "%", decimals: 1, icon: ShieldCheck },
                            { label: "Audits Passed", value: 500, suffix: "+", decimals: 0, icon: CheckCircle2 },
                            { label: "Enterprise Teams", value: 50, suffix: "+", decimals: 0, icon: Users },
                        ].map((stat, i) => {
                            const ref = useRef(null);
                            const isInView = useInView(ref, { once: true });

                            return (
                                <motion.div key={i} ref={ref} variants={staggerItem} className="space-y-2">
                                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                                        {isInView ? (
                                            <CountUp
                                                end={stat.value}
                                                duration={2.5}
                                                decimals={stat.decimals}
                                                suffix={stat.suffix}
                                                separator=","
                                            />
                                        ) : (
                                            "0" + stat.suffix
                                        )}
                                    </h3>
                                    <p className="text-sm font-medium text-muted-foreground/90 uppercase tracking-widest">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Key Features Overview */}
            <section className="py-24 px-6 md:px-12 relative">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Complete Visibility. Zero Friction.
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            AuditShield sits quietly in the background, monitoring AI usage without interrupting your team's workflow.
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
                                icon: Search,
                                title: "Shadow AI Detection",
                                desc: "Instantly identify unauthorized LLM usage across your network. Know exactly which tools are being used, when, and by whom.",
                                gradient: "from-blue-500/10 to-cyan-500/10",
                                image: "/brain/0b9f334d-7a2f-475d-b9a8-30ce49e785a5/shadow_ai_detection_1768657281690.png"
                            },
                            {
                                icon: Lock,
                                title: "Data Leak Prevention",
                                desc: "Block or flag requests when sensitive data patterns (PII, API Keys, credentials) are detected in prompts before they leave.",
                                gradient: "from-purple-500/10 to-pink-500/10",
                                image: null
                            },
                            {
                                icon: FileText,
                                title: "Audit-Ready Logs",
                                desc: "Generate SHA-256 hashed, tamper-evident PDF reports that stand up to scrutiny from auditors and legal teams.",
                                gradient: "from-amber-500/10 to-orange-500/10",
                                image: null
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 transition-all relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                        <p className="text-muted-foreground/90 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                    {feature.image && (
                                        <div className="mt-6 rounded-lg overflow-hidden border border-border/50 bg-background/30">
                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                width={400}
                                                height={250}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <AnimatedSection className="text-center mt-12">
                        <Button variant="outline" size="lg" className="rounded-full" asChild>
                            <Link href="/features">
                                View All Features <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </section>

            {/* How It Works Preview */}
            <section className="py-24 bg-gradient-to-b from-secondary/30 to-background border-y border-border/50">
                <div className="max-w-6xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            From Chaos to Compliance in <span className="text-primary">3 Steps</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Get started in minutes, not months. No complex integrations required.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                num: "01",
                                title: "Install Extension",
                                desc: "Deploy our lightweight browser extension via MDM or group policy. Works silently in the background.",
                                icon: Zap
                            },
                            {
                                num: "02",
                                title: "Configure Policy",
                                desc: "Set allowlists, blocklists, and data handling rules in the intuitive dashboard. Customize to your needs.",
                                icon: Shield
                            },
                            {
                                num: "03",
                                title: "Generate Proof",
                                desc: "Export signed audit logs to prove compliance to stakeholders. Ready for any audit or legal review.",
                                icon: FileText
                            }
                        ].map((step, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="relative p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all group">
                                    <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-2xl text-primary border-4 border-background">
                                        {step.num}
                                    </div>
                                    <step.icon className="h-10 w-10 text-primary mb-4 mt-4 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                                    <p className="text-muted-foreground">{step.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="text-center mt-12">
                        <Button variant="outline" size="lg" className="rounded-full" asChild>
                            <Link href="/how-it-works">
                                See Detailed Guide <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Trusted by Security Leaders
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            See what compliance teams are saying about AuditShield
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
                                quote: "AuditShield gave us the visibility we desperately needed. We went from zero AI governance to full compliance in weeks.",
                                author: "Sarah Chen",
                                role: "CISO, TechCorp",
                                rating: 5,
                                avatar: "/brain/0b9f334d-7a2f-475d-b9a8-30ce49e785a5/testimonial_avatar_sarah_1768657308339.png"
                            },
                            {
                                quote: "The audit reports are exactly what our legal team needed. SHA-256 hashing gives us the proof we can defend in court.",
                                author: "Michael Rodriguez",
                                role: "General Counsel, FinanceHub",
                                rating: 5,
                                avatar: null
                            },
                            {
                                quote: "Finally, a solution that doesn't slow down our developers while keeping us compliant. It's invisible until you need it.",
                                author: "Emily Watson",
                                role: "VP Engineering, DataFlow",
                                rating: 5,
                                avatar: null
                            }
                        ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-muted-foreground/90 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    {testimonial.avatar ? (
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground/90">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Integration Logos - Trust Bar */}
                <AnimatedSection className="mt-20">
                    <div className="text-center mb-8">
                        <p className="text-sm font-medium text-muted-foreground/90 uppercase tracking-widest mb-6">
                            Integrates Seamlessly With
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-2xl">
                            <Image
                                src="/brain/0b9f334d-7a2f-475d-b9a8-30ce49e785a5/integration_logos_1768657324232.png"
                                alt="AI Tool Integrations: ChatGPT, Claude, Gemini, Copilot"
                                width={600}
                                height={150}
                                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6 flex justify-center">
                <AnimatedSection className="w-full max-w-5xl">
                    <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                            Ready to secure your AI usage?
                        </h2>
                        <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                            Join forward-thinking companies who use AuditShield to innovate safely and prove compliance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-lg hover:scale-105 transition-transform" asChild>
                                <Link href="/sign-up">Start Free Trial</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                                <Link href="/pricing">View Pricing</Link>
                            </Button>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            <Footer />
        </div>
    );
}

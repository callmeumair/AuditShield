"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Shield, Target, Users, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="xl" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        Building the Future of
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            AI Governance
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        We're on a mission to help organizations innovate safely with AI while maintaining complete compliance and control.
                    </p>
                </AnimatedSection>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <AnimatedSection>
                            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Target className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                To empower organizations to embrace AI innovation without fear. We believe that compliance
                                shouldn't slow down progress—it should enable it. AuditShield makes AI governance automatic,
                                invisible, and defensible.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                A world where every organization can confidently use AI tools, knowing they have complete
                                visibility, control, and proof of compliance. We're building the infrastructure that makes
                                AI governance as simple as antivirus software.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-xl text-muted-foreground">
                            The principles that guide everything we do
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
                                title: "Privacy First",
                                desc: "We never log prompt content—only domains. Your data stays yours, always.",
                                icon: Shield
                            },
                            {
                                title: "Transparency",
                                desc: "No hidden fees, no dark patterns. What you see is what you get.",
                                icon: CheckCircle2
                            },
                            {
                                title: "Customer Success",
                                desc: "Your compliance is our success. We're here to help you win.",
                                icon: Users
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm text-center"
                            >
                                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                    <value.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                            <p>
                                AuditShield was born from a simple observation: every company we talked to was using AI tools,
                                but almost none of them knew <em>which</em> tools, <em>how much</em>, or <em>by whom</em>.
                                Legal and security teams were terrified. Developers were frustrated. Compliance was impossible.
                            </p>
                            <p>
                                We knew there had to be a better way. Not a policy document that nobody reads. Not a training
                                session that everyone forgets. But actual, automated, defensible proof of AI governance.
                            </p>
                            <p>
                                So we built AuditShield—a lightweight browser extension that sits quietly in the background,
                                logging every AI interaction without slowing anyone down. No complex integrations. No workflow
                                changes. Just complete visibility and control.
                            </p>
                            <p>
                                Today, hundreds of organizations use AuditShield to innovate safely with AI. From startups to
                                Fortune 500 companies, they trust us to help them move fast without breaking compliance.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
                        <p className="text-xl text-muted-foreground">
                            Built by security experts, for security teams
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
                            { name: "Sarah Chen", role: "CEO & Co-Founder", bio: "Former CISO at TechCorp. 15 years in cybersecurity." },
                            { name: "Michael Rodriguez", role: "CTO & Co-Founder", bio: "Ex-Google engineer. Built security tools at scale." },
                            { name: "Emily Watson", role: "VP Engineering", bio: "Led compliance teams at Fortune 500 companies." }
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-8 rounded-2xl border border-border bg-background/50 backdrop-blur-sm text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-indigo-500/20 mx-auto mb-6"></div>
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-sm text-primary mb-3">{member.role}</p>
                                <p className="text-sm text-muted-foreground">{member.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Security & Compliance</h2>
                        <p className="text-xl text-muted-foreground">
                            We practice what we preach
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-8"
                    >
                        {[
                            { title: "SOC 2 Type II", desc: "Certified" },
                            { title: "GDPR", desc: "Compliant" },
                            { title: "ISO 27001", desc: "Certified" },
                            { title: "HIPAA", desc: "Ready" }
                        ].map((cert, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
                            >
                                <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                                <h3 className="font-semibold mb-1">{cert.title}</h3>
                                <p className="text-sm text-muted-foreground">{cert.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
                <AnimatedSection className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Join Us in Building the Future
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Whether you're looking to secure your organization or join our team, we'd love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20" asChild>
                            <Link href="/contact">
                                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
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

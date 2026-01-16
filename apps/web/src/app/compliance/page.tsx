"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Award, Shield, CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { motion } from "framer-motion";

export default function CompliancePage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Compliance & Certifications
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        We maintain the highest standards of security and compliance
                    </p>
                </AnimatedSection>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Certifications</h2>
                        <p className="text-xl text-muted-foreground">
                            Independently verified security and compliance standards
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-8 mb-16"
                    >
                        {[
                            { title: "SOC 2 Type II", desc: "Security & availability controls", icon: Shield },
                            { title: "GDPR", desc: "EU data protection compliance", icon: CheckCircle2 },
                            { title: "ISO 27001", desc: "Information security management", icon: Award },
                            { title: "HIPAA Ready", desc: "Healthcare data protection", icon: Shield }
                        ].map((cert, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center hover:border-primary/30 transition-all"
                            >
                                <cert.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                                <p className="text-sm text-muted-foreground">{cert.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <AnimatedSection>
                        <div className="space-y-8">
                            <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-4">Data Protection</h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>End-to-end encryption for all data in transit and at rest</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Regular third-party security audits and penetration testing</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Data residency options for regulatory compliance</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Automated backup and disaster recovery procedures</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-4">Compliance Support</h3>
                                <p className="text-muted-foreground mb-4">
                                    We provide comprehensive documentation and support to help you meet your compliance requirements:
                                </p>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Audit-ready reports with cryptographic signatures</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Data processing agreements (DPA) available</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Dedicated compliance team for enterprise customers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
}

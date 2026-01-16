"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Book, Code, Zap, Shield, CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocumentationPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Documentation
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Everything you need to get started with AuditShield
                    </p>
                </AnimatedSection>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Book,
                                title: "Getting Started",
                                desc: "Quick start guide to deploy AuditShield in your organization",
                                items: ["Installation", "Configuration", "First Steps"]
                            },
                            {
                                icon: Code,
                                title: "Developer Guides",
                                desc: "Technical documentation for developers and IT teams",
                                items: ["API Integration", "Webhooks", "Custom Policies"]
                            },
                            {
                                icon: Shield,
                                title: "Security & Compliance",
                                desc: "Best practices for security and regulatory compliance",
                                items: ["Data Protection", "Audit Logs", "Certifications"]
                            }
                        ].map((section, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
                            >
                                <section.icon className="h-12 w-12 text-primary mb-6" />
                                <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                                <p className="text-muted-foreground mb-6">{section.desc}</p>
                                <ul className="space-y-2">
                                    {section.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>

                    <AnimatedSection className="mt-16 text-center">
                        <div className="p-12 rounded-2xl border border-border bg-secondary/20 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
                            <p className="text-muted-foreground mb-6">
                                Our support team is here to assist you with any questions
                            </p>
                            <Button size="lg" className="rounded-full" asChild>
                                <Link href="/contact">Contact Support</Link>
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
}

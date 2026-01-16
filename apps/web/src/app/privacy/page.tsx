"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Privacy Policy
                        </span>
                    </h1>
                    <p className="text-muted-foreground">Last updated: January 16, 2026</p>
                </AnimatedSection>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <AnimatedSection>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Introduction</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    At AuditShield, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Account information (name, email, company)</li>
                                    <li>AI tool usage metadata (domains visited, timestamps)</li>
                                    <li>Billing and payment information</li>
                                    <li>Communications with our support team</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                                <div className="flex items-start gap-4">
                                    <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-2">Privacy-First Design</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We NEVER log the content of your AI prompts or responses. We only track domains and metadata necessary for compliance reporting.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Provide and maintain our service</li>
                                    <li>Generate compliance reports</li>
                                    <li>Improve and optimize our service</li>
                                    <li>Communicate with you about updates and support</li>
                                    <li>Detect and prevent fraud or security issues</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Data Security</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement industry-standard security measures including encryption at rest and in transit, regular security audits, and SOC 2 Type II compliance.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Your Rights</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    You have the right to access, update, or delete your personal information. Contact us at privacy@auditshield.ai to exercise these rights.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have questions about this Privacy Policy, please contact us at privacy@auditshield.ai
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
}

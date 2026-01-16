"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Terms of Service
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
                                <h2 className="text-3xl font-bold mb-4">Agreement to Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    By accessing or using AuditShield, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Use License</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Install and use the AuditShield browser extension</li>
                                    <li>Access and use the AuditShield dashboard</li>
                                    <li>Generate compliance reports for your organization</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">User Responsibilities</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    You agree to:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Provide accurate account information</li>
                                    <li>Maintain the security of your account credentials</li>
                                    <li>Use the service in compliance with all applicable laws</li>
                                    <li>Not attempt to reverse engineer or compromise the service</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Payment Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Subscription fees are billed in advance on a monthly or annual basis. You may cancel your subscription at any time, with cancellation taking effect at the end of the current billing period.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    AuditShield shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Contact</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Questions about these Terms? Contact us at legal@auditshield.ai
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

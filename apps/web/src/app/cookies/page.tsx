"use client";

import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Cookie Policy
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
                                <h2 className="text-3xl font-bold mb-4">What Are Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how you use our service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">How We Use Cookies</h2>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg border border-border bg-card/50">
                                        <h3 className="font-bold mb-2">Essential Cookies</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Required for the website to function properly. These include authentication and security cookies.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border border-border bg-card/50">
                                        <h3 className="font-bold mb-2">Analytics Cookies</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Help us understand how visitors interact with our website by collecting anonymous information.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border border-border bg-card/50">
                                        <h3 className="font-bold mb-2">Preference Cookies</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Remember your preferences and settings to provide a personalized experience.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Managing Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    You can control and manage cookies through your browser settings. Note that disabling certain cookies may impact the functionality of our service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Questions about our use of cookies? Contact us at privacy@auditshield.ai
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

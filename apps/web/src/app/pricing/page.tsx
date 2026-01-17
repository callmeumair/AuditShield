"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { CheckCircle2, ArrowRight, Zap, Building2, Shield } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 left-1/2 -translate-x-1/2" color="primary" size="lg" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        Simple, Transparent
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Pricing
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Choose the plan that fits your organization. No hidden fees. Cancel anytime.
                    </p>
                </AnimatedSection>
            </section>

            {/* Pricing Cards */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {/* Starter */}
                        <motion.div
                            variants={staggerItem}
                            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all flex flex-col"
                        >
                            <div className="mb-6">
                                <Zap className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                                <p className="text-muted-foreground">Perfect for individuals and small teams</p>
                            </div>
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">$0</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "1 User Seat",
                                    "30 Days Log Retention",
                                    "Basic PDF Reports",
                                    "Email Support",
                                    "Core Features"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" variant="outline" className="w-full rounded-full" asChild>
                                <Link href="/sign-up">Get Started Free</Link>
                            </Button>
                        </motion.div>

                        {/* Professional - Highlighted with Psychology */}
                        <motion.div
                            variants={staggerItem}
                            className="p-8 rounded-2xl border-2 border-blue-500 bg-card/50 backdrop-blur-sm shadow-2xl shadow-blue-500/20 flex flex-col relative transform scale-105 md:scale-110"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-full shadow-lg">
                                ⭐ MOST POPULAR
                            </div>
                            <div className="mb-6">
                                <Building2 className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                                <p className="text-muted-foreground">For growing teams and agencies</p>
                            </div>
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">$49</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Up to 10 User Seats",
                                    "1 Year Log Retention",
                                    "SHA-256 Signed Reports",
                                    "Priority Support",
                                    "Advanced Analytics",
                                    "Custom Policies",
                                    "API Access"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-foreground font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" className="w-full rounded-full shadow-lg" asChild>
                                <Link href="/sign-up?plan=pro">Start Free Trial</Link>
                            </Button>
                        </motion.div>

                        {/* Enterprise */}
                        <motion.div
                            variants={staggerItem}
                            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all flex flex-col"
                        >
                            <div className="mb-6">
                                <Shield className="h-10 w-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                                <p className="text-muted-foreground">For large organizations</p>
                            </div>
                            <div className="mb-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-bold text-muted-foreground/90">Let's Talk</span>
                                    <span className="text-sm text-muted-foreground/70">Custom pricing for your needs</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "Unlimited User Seats",
                                    "7 Year Log Retention",
                                    "Custom SLA & MSA",
                                    "Dedicated Support",
                                    "SSO / SAML",
                                    "On-Premise Option",
                                    "Custom Integrations",
                                    "Training & Onboarding"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" variant="outline" className="w-full rounded-full" asChild>
                                <Link href="/contact">Contact Sales</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Compare Plans</h2>
                        <p className="text-xl text-muted-foreground">
                            See what's included in each plan
                        </p>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left p-4 font-semibold">Feature</th>
                                        <th className="text-center p-4 font-semibold">Starter</th>
                                        <th className="text-center p-4 font-semibold">Professional</th>
                                        <th className="text-center p-4 font-semibold">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: "User Seats", starter: "1", pro: "10", enterprise: "Unlimited" },
                                        { feature: "Log Retention", starter: "30 days", pro: "1 year", enterprise: "7 years" },
                                        { feature: "PDF Reports", starter: "✓", pro: "✓", enterprise: "✓" },
                                        { feature: "SHA-256 Signing", starter: "—", pro: "✓", enterprise: "✓" },
                                        { feature: "API Access", starter: "—", pro: "✓", enterprise: "✓" },
                                        { feature: "SSO / SAML", starter: "—", pro: "—", enterprise: "✓" },
                                        { feature: "Custom SLA", starter: "—", pro: "—", enterprise: "✓" },
                                        { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" }
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-border/40">
                                            <td className="p-4 text-muted-foreground">{row.feature}</td>
                                            <td className="p-4 text-center">{row.starter}</td>
                                            <td className="p-4 text-center font-medium">{row.pro}</td>
                                            <td className="p-4 text-center">{row.enterprise}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {[
                            {
                                q: "Can I switch plans later?",
                                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                            },
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major credit cards, ACH transfers, and can invoice for annual contracts."
                            },
                            {
                                q: "Is there a free trial?",
                                a: "Yes! Professional and Enterprise plans come with a 14-day free trial. No credit card required."
                            },
                            {
                                q: "What happens to my data if I cancel?",
                                a: "You can export all your data before canceling. We retain data for 30 days after cancellation for recovery."
                            },
                            {
                                q: "Do you offer discounts for nonprofits?",
                                a: "Yes! We offer 50% discounts for qualified nonprofit organizations. Contact sales for details."
                            }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
                            >
                                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
                <AnimatedSection className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Start your free trial today. No credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20" asChild>
                            <Link href="/sign-up">
                                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full" asChild>
                            <Link href="/contact">Talk to Sales</Link>
                        </Button>
                    </div>
                </AnimatedSection>
            </section>

            <Footer />
        </div>
    );
}

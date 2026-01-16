"use client";

import { useState } from "react";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { ContactForm } from "@/components/contact/ContactForm";
import { SuccessModal } from "@/components/contact/SuccessModal";
import { Mail, Phone, MapPin, MessageSquare, Clock, Headphones } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />
                <GradientBlob className="bottom-0 left-0" color="secondary" size="md" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6 backdrop-blur-sm"
                    >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        We're here to help
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        Let's Talk About
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Your AI Governance
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Get in touch with our team to learn how AuditShield can secure your organization's AI usage
                    </p>
                </AnimatedSection>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Form - Takes 2 columns */}
                        <div className="lg:col-span-2">
                            <AnimatedSection>
                                <div className="relative">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/10 blur-3xl rounded-3xl -z-10"></div>

                                    <div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl p-8 md:p-12">
                                        <ContactForm onSuccess={() => setShowSuccess(true)} />
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="space-y-8">
                            <AnimatedSection delay={0.2}>
                                <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>

                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    {[
                                        {
                                            icon: Mail,
                                            title: "Email",
                                            content: "hello@auditshield.ai",
                                            link: "mailto:hello@auditshield.ai",
                                            description: "For general inquiries"
                                        },
                                        {
                                            icon: Phone,
                                            title: "Phone",
                                            content: "+1 (555) 123-4567",
                                            link: "tel:+15551234567",
                                            description: "Mon-Fri, 9am-5pm PT"
                                        },
                                        {
                                            icon: MapPin,
                                            title: "Office",
                                            content: "San Francisco, CA",
                                            link: null,
                                            description: "United States"
                                        },
                                        {
                                            icon: MessageSquare,
                                            title: "Live Chat",
                                            content: "Available Now",
                                            link: null,
                                            description: "Average response: 2 min"
                                        }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            variants={staggerItem}
                                            className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                    <item.icon className="h-6 w-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                                    {item.link ? (
                                                        <a
                                                            href={item.link}
                                                            className="text-primary hover:underline font-medium"
                                                        >
                                                            {item.content}
                                                        </a>
                                                    ) : (
                                                        <p className="font-medium">{item.content}</p>
                                                    )}
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatedSection>

                            {/* Enterprise Support CTA */}
                            <AnimatedSection delay={0.4}>
                                <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-indigo-500/10 backdrop-blur-sm">
                                    <Headphones className="h-10 w-10 text-primary mb-4" />
                                    <h3 className="text-xl font-bold mb-3">Enterprise Support</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Need dedicated support for your organization? Our enterprise team is ready to help.
                                    </p>
                                    <a
                                        href="mailto:enterprise@auditshield.ai"
                                        className="text-primary hover:underline font-medium inline-flex items-center gap-2"
                                    >
                                        Contact Enterprise Sales
                                        <Mail className="h-4 w-4" />
                                    </a>
                                </div>
                            </AnimatedSection>

                            {/* Business Hours */}
                            <AnimatedSection delay={0.5}>
                                <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold">Business Hours</h3>
                                    </div>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex justify-between">
                                            <span>Monday - Friday</span>
                                            <span className="font-medium">9:00 AM - 6:00 PM PT</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Saturday - Sunday</span>
                                            <span className="font-medium">Closed</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
                        <p className="text-xl text-muted-foreground">
                            Quick answers to help you get started
                        </p>
                    </AnimatedSection>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {[
                            {
                                q: "How long does setup take?",
                                a: "Most organizations are up and running in under 30 minutes."
                            },
                            {
                                q: "Do you offer a free trial?",
                                a: "Yes! Professional and Enterprise plans include a 14-day free trial."
                            },
                            {
                                q: "What browsers do you support?",
                                a: "Chrome, Edge, and Firefox on Windows, Mac, and Linux."
                            },
                            {
                                q: "Is my data secure?",
                                a: "Yes. We're SOC 2 Type II certified and never log prompt content."
                            }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                variants={staggerItem}
                                className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all"
                            >
                                <h3 className="font-semibold mb-2">{faq.q}</h3>
                                <p className="text-sm text-muted-foreground">{faq.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />

            {/* Success Modal */}
            <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
        </div>
    );
}

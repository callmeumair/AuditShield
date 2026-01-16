"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center overflow-hidden">
                <GradientBlob className="top-0 right-0" color="primary" size="lg" />
                <GradientBlob className="bottom-0 left-0" color="secondary" size="md" />

                <AnimatedSection className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        Let's Talk About
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Your AI Governance
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Schedule a demo, ask questions, or just say hello. We're here to help.
                    </p>
                </AnimatedSection>
            </section>

            {/* Contact Form & Info */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <AnimatedSection>
                            <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-xl">
                                <h2 className="text-3xl font-bold mb-6">Request a Demo</h2>
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">First Name</label>
                                            <Input placeholder="John" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Last Name</label>
                                            <Input placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Work Email</label>
                                        <Input type="email" placeholder="john@company.com" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Company</label>
                                        <Input placeholder="Acme Inc." />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Company Size</label>
                                        <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                            <option>1-10 employees</option>
                                            <option>11-50 employees</option>
                                            <option>51-200 employees</option>
                                            <option>201-1000 employees</option>
                                            <option>1000+ employees</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Message</label>
                                        <Textarea
                                            placeholder="Tell us about your AI governance needs..."
                                            rows={4}
                                        />
                                    </div>
                                    <Button size="lg" className="w-full rounded-full" type="submit">
                                        <Send className="mr-2 h-4 w-4" />
                                        Request Demo
                                    </Button>
                                </form>
                            </div>
                        </AnimatedSection>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <AnimatedSection delay={0.2}>
                                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Have questions? We're here to help. Reach out through any of these channels.
                                </p>

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
                                            link: "mailto:hello@auditshield.ai"
                                        },
                                        {
                                            icon: Phone,
                                            title: "Phone",
                                            content: "+1 (555) 123-4567",
                                            link: "tel:+15551234567"
                                        },
                                        {
                                            icon: MapPin,
                                            title: "Office",
                                            content: "San Francisco, CA",
                                            link: null
                                        },
                                        {
                                            icon: MessageSquare,
                                            title: "Live Chat",
                                            content: "Available Mon-Fri, 9am-5pm PT",
                                            link: null
                                        }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            variants={staggerItem}
                                            className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
                                        >
                                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                                {item.link ? (
                                                    <a href={item.link} className="text-muted-foreground hover:text-primary transition-colors">
                                                        {item.content}
                                                    </a>
                                                ) : (
                                                    <p className="text-muted-foreground">{item.content}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.4}>
                                <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-indigo-500/10 backdrop-blur-sm">
                                    <h3 className="text-xl font-bold mb-3">Enterprise Support</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Need dedicated support for your organization? Our enterprise team is ready to help.
                                    </p>
                                    <Button variant="outline" className="rounded-full">
                                        Contact Sales
                                    </Button>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="py-24 px-6 bg-secondary/20">
                <div className="max-w-7xl mx-auto">
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
                                className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm"
                            >
                                <h3 className="font-semibold mb-2">{faq.q}</h3>
                                <p className="text-sm text-muted-foreground">{faq.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

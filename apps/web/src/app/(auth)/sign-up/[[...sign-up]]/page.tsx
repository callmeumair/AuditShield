"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { ShieldCheck, CheckCircle2, Users, BarChart3, Globe } from "lucide-react";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background */}
            <GradientBlob className="top-0 left-0" color="primary" size="xl" />
            <GradientBlob className="bottom-0 right-0" color="secondary" size="lg" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        }}
                        animate={{
                            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Branding & Benefits */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:block space-y-8"
                >
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-70 transition-opacity rounded-full"></div>
                            <ShieldCheck className="h-12 w-12 text-primary relative z-10" />
                        </div>
                        <span className="text-3xl font-bold">AuditShield</span>
                    </Link>

                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                        >
                            Start Your Journey
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl text-muted-foreground"
                        >
                            Join thousands of organizations securing their AI usage
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-4"
                    >
                        {[
                            "Complete visibility into AI tool usage",
                            "Automated compliance reporting",
                            "Enterprise-grade security",
                            "14-day free trial, no credit card required"
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-muted-foreground">{benefit}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40"
                    >
                        {[
                            { icon: Users, value: "50+", label: "Enterprise Teams" },
                            { icon: BarChart3, value: "1.2M+", label: "Events Logged" },
                            { icon: Globe, value: "99.9%", label: "Uptime" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side - Sign Up Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    {/* Glow effect behind form */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-500/20 blur-3xl rounded-3xl"></div>

                    {/* Form container */}
                    <div className="relative bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl p-8">
                        <SignUp
                            appearance={{
                                elements: {
                                    rootBox: "w-full",
                                    card: "bg-transparent shadow-none",
                                    headerTitle: "text-2xl font-bold",
                                    headerSubtitle: "text-muted-foreground",
                                    socialButtonsBlockButton: "bg-secondary hover:bg-secondary/80 border border-border",
                                    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                                    formFieldInput: "bg-secondary/50 border-border",
                                    footerActionLink: "text-primary hover:text-primary/80",
                                }
                            }}
                        />
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary/20 rounded-full"
                    />
                    <motion.div
                        animate={{
                            rotate: -360,
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-indigo-500/20 rounded-full"
                    />
                </motion.div>
            </div>

            {/* Mobile branding */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden absolute top-8 left-8"
            >
                <Link href="/" className="flex items-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">AuditShield</span>
                </Link>
            </motion.div>
        </div>
    );
}

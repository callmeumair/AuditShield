"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { ShieldCheck, CheckCircle2, Users, BarChart3, Globe } from "lucide-react";

export default function SignUpPage() {
    return (
        <div className="min-h-[100dvh] w-full flex flex-col lg:grid lg:grid-cols-2 relative overflow-x-hidden bg-background/50 selection:bg-primary/20">
            {/* Background Effects (Unified) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <GradientBlob className="top-[-10%] left-[-10%] opacity-40" color="primary" size="xl" />
                <GradientBlob className="bottom-[-10%] right-[-10%] opacity-40" color="secondary" size="lg" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* Floating particles effect (Global) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        }}
                        animate={{
                            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: Math.random() * 20 + 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Left Column - Branding & Benefits (Hidden on Mobile, Visible on Large Screens) */}
            <div className="hidden lg:flex flex-col justify-between p-12 xl:p-24 relative z-10 h-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/" className="flex items-center gap-3 w-fit group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full duration-500"></div>
                            <ShieldCheck className="h-10 w-10 text-primary relative z-10" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">AuditShield</span>
                    </Link>
                </motion.div>

                <div className="space-y-12">
                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight"
                        >
                            Start Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
                                Global Journey
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl text-muted-foreground/80 max-w-md"
                        >
                            Join thousands of forward-thinking organizations securing their AI borders today.
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
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-muted-foreground">{benefit}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex gap-8 pt-8 border-t border-border/20"
                >
                    {[
                        { icon: Users, value: "50+", label: "Enterprise Teams" },
                        { icon: Globe, value: "99.9%", label: "Uptime" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="flex items-center gap-2 mb-1">
                                <stat.icon className="h-4 w-4 text-primary/70" />
                                <span className="text-xl font-bold">{stat.value}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Right Column - Form Container (Full Width on Mobile) */}
            <div className="w-full min-h-[100dvh] flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 relative z-10 lg:bg-background/30 lg:backdrop-blur-sm">

                {/* Mobile Branding */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden mb-8 flex flex-col items-center gap-3"
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">AuditShield</span>
                    </div>
                    <p className="text-muted-foreground text-sm text-center max-w-[250px]">
                        Secure your AI usage in minutes
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[440px] relative"
                >
                    {/* Glow effect behind form */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-indigo-600/30 blur-3xl rounded-3xl opacity-50"></div>

                    {/* Form Card */}
                    <div className="relative bg-card/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 ring-1 ring-white/5">
                        <SignUp
                            appearance={{
                                elements: {
                                    rootBox: "w-full",
                                    card: "bg-transparent shadow-none p-0 w-full",
                                    headerTitle: "text-2xl font-bold text-foreground",
                                    headerSubtitle: "text-muted-foreground",
                                    socialButtonsBlockButton: "bg-secondary/50 hover:bg-secondary border border-border/50 text-foreground transition-all duration-200",
                                    formButtonPrimary: "bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 transition-opacity",
                                    formFieldInput: "bg-background/50 border-input focus:ring-2 focus:ring-primary/20 transition-all",
                                    footerActionLink: "text-primary hover:text-primary/80 font-medium",
                                    dividerLine: "bg-border/50",
                                    dividerText: "text-muted-foreground",
                                    formFieldLabel: "text-foreground/80",
                                }
                            }}
                            fallbackRedirectUrl="/dashboard"
                        />
                    </div>
                </motion.div>

                {/* Footer Links (Mobile) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:hidden mt-8 text-center text-xs text-muted-foreground"
                >
                    <p>© 2024 AuditShield. All rights reserved.</p>
                </motion.div>
            </div>
        </div>
    );
}

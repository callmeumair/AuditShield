"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { GradientBlob } from "@/components/shared/GradientBlob";
import { ShieldCheck, Sparkles, Lock, Zap } from "lucide-react";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background */}
            <GradientBlob className="top-0 right-0" color="primary" size="xl" />
            <GradientBlob className="bottom-0 left-0" color="secondary" size="lg" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/30 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            x: [null, Math.random() * window.innerWidth],
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
                {/* Left Side - Branding & Features */}
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
                            Welcome Back
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl text-muted-foreground"
                        >
                            Sign in to continue managing your AI compliance
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: Sparkles,
                                title: "Real-time Monitoring",
                                desc: "Track AI usage across your organization instantly"
                            },
                            {
                                icon: Lock,
                                title: "Enterprise Security",
                                desc: "SOC 2 Type II certified data protection"
                            },
                            {
                                icon: Zap,
                                title: "Instant Reports",
                                desc: "Generate compliance reports in seconds"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all group"
                            >
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side - Sign In Form */}
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
                        <SignIn
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

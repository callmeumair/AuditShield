"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"></div>
                            <div className="relative bg-background border-2 border-red-500/50 rounded-2xl p-6">
                                <ShieldAlert className="h-20 w-20 text-red-500" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <h1 className="text-8xl md:text-9xl font-bold text-foreground/10 mb-2">
                            404
                        </h1>
                        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Access Denied
                        </h2>
                        <p className="text-xl text-muted-foreground/90 max-w-md mx-auto">
                            This page has been <span className="font-mono text-red-500">[REDACTED]</span> or does not exist in our secure database.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button size="lg" className="rounded-full" asChild>
                            <Link href="/">
                                <Home className="mr-2 h-5 w-5" />
                                Return to Safety
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Security Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 text-xs text-muted-foreground/60 font-mono"
                    >
                        Error Code: AS-404 | Security Level: REDACTED
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

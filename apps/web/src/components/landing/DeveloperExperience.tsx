"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

export function DeveloperExperience() {
    const [copied, setCopied] = useState(false);

    const codeSnippet = `npm install @audit-shield/sdk
# Initializing protection...
# Shield Active: Monitor Mode`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                            <Terminal className="h-4 w-4 mr-2" />
                            Developer Friendly
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Integrates in Minutes
                        </h2>

                        <p className="text-xl text-muted-foreground/90 mb-8 leading-relaxed">
                            Drop-in SDK with zero configuration. Start monitoring AI usage across your organization with a single command.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Zero-config installation",
                                "Works with any JavaScript framework",
                                "Automatic policy enforcement",
                                "Real-time dashboard updates"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-muted-foreground/90">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right: Terminal Window */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-secondary/20 border-b border-border/40">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                </div>
                                <div className="text-xs text-muted-foreground/60 font-mono">
                                    terminal
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded hover:bg-secondary/50 transition-colors"
                                    aria-label="Copy code"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4 text-muted-foreground/60" />
                                    )}
                                </button>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">$</span>
                                        <span className="text-foreground">npm install @audit-shield/sdk</span>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                        className="text-muted-foreground/70"
                                    >
                                        # Initializing protection...
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-green-500">✓</span>
                                        <span className="text-green-500">Shield Active: Monitor Mode</span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1.1 }}
                                        className="pt-2"
                                    >
                                        <span className="text-green-500">$</span>
                                        <span className="animate-pulse ml-1">_</span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

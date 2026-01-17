"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const integrations = [
    { name: "OpenAI", logo: "ChatGPT" },
    { name: "Anthropic", logo: "Claude" },
    { name: "GitHub Copilot", logo: "Copilot" },
    { name: "Jasper", logo: "Jasper" },
    { name: "Midjourney", logo: "Midjourney" },
    { name: "Perplexity", logo: "Perplexity" },
];

export function LogoMarquee() {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate the array for seamless infinite scroll
    const duplicatedIntegrations = [...integrations, ...integrations];

    return (
        <div className="relative w-full overflow-hidden bg-secondary/10 py-12 border-y border-border/40">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-medium text-muted-foreground/90 uppercase tracking-widest mb-8">
                    Trusted Integration Partners
                </p>
            </div>

            <div
                className="relative flex overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="flex gap-16 pr-16"
                    animate={{
                        x: isPaused ? 0 : [0, -50 * integrations.length + "%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedIntegrations.map((integration, index) => (
                        <div
                            key={`${integration.name}-${index}`}
                            className="flex items-center justify-center min-w-[200px] h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-foreground/80 font-mono">
                                    {integration.logo}
                                </div>
                                <div className="text-xs text-muted-foreground/60 mt-1">
                                    {integration.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
    );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, CheckCircle, XCircle } from "lucide-react";

export function DataFlowAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to packet position (0 to 100%)
    const packetProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

    // Determine packet state based on position
    const packetState = useTransform(packetProgress, (value) => {
        if (value < 45) return "pending"; // Grey
        if (value >= 45 && value < 55) return "processing"; // At shield
        return "verified"; // Green
    });

    return (
        <div ref={containerRef} className="relative py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        How AuditShield Works
                    </h2>
                    <p className="text-xl text-muted-foreground/90">
                        Real-time AI request validation and compliance logging
                    </p>
                </div>

                {/* SVG Path Animation */}
                <div className="relative h-64 flex items-center">
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1000 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* The path line */}
                        <motion.path
                            d="M 50 100 L 450 100 L 500 100 L 550 100 L 950 100"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-border"
                            strokeDasharray="5,5"
                        />

                        {/* Animated data packet */}
                        <motion.circle
                            cx={useTransform(packetProgress, (v) => 50 + (v / 100) * 900)}
                            cy="100"
                            r="12"
                            className="drop-shadow-lg"
                            fill={useTransform(packetState, (state) => {
                                if (state === "pending") return "#6b7280"; // Grey
                                if (state === "processing") return "#3b82f6"; // Blue
                                return "#10b981"; // Green
                            })}
                        />

                        {/* Glow effect on packet */}
                        <motion.circle
                            cx={useTransform(packetProgress, (v) => 50 + (v / 100) * 900)}
                            cy="100"
                            r="20"
                            className="opacity-30"
                            fill={useTransform(packetState, (state) => {
                                if (state === "pending") return "#6b7280";
                                if (state === "processing") return "#3b82f6";
                                return "#10b981";
                            })}
                        />
                    </svg>

                    {/* Shield Icon in Center */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <motion.div
                            animate={{
                                scale: useTransform(packetProgress, (v) =>
                                    v >= 45 && v <= 55 ? 1.2 : 1
                                ),
                            }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                            <div className="relative bg-background border-2 border-primary rounded-2xl p-6">
                                <Shield className="h-16 w-16 text-primary" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Start Label */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
                        <div className="text-center">
                            <div className="w-3 h-3 rounded-full bg-muted-foreground/40 mx-auto mb-2"></div>
                            <p className="text-xs text-muted-foreground/70 font-medium whitespace-nowrap">
                                AI Request
                            </p>
                        </div>
                    </div>

                    {/* End Label */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                        <motion.div
                            className="text-center"
                            animate={{
                                opacity: useTransform(packetProgress, (v) => v > 80 ? 1 : 0.3),
                            }}
                        >
                            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground/90 font-medium whitespace-nowrap">
                                Logged & Verified
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Status Indicator */}
                <motion.div
                    className="text-center mt-12"
                    animate={{
                        opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]),
                    }}
                >
                    <motion.p
                        className="text-sm font-mono text-muted-foreground/90"
                        animate={{
                            color: useTransform(packetState, (state) => {
                                if (state === "pending") return "#6b7280";
                                if (state === "processing") return "#3b82f6";
                                return "#10b981";
                            }),
                        }}
                    >
                        {useTransform(packetState, (state) => {
                            if (state === "pending") return "→ Request Detected";
                            if (state === "processing") return "⚡ Analyzing & Validating";
                            return "✓ Compliance Verified";
                        })}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

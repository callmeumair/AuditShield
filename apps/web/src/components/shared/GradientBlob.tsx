"use client";

import { motion } from "framer-motion";

interface GradientBlobProps {
    className?: string;
    color?: "primary" | "secondary" | "accent";
    size?: "sm" | "md" | "lg" | "xl";
    animate?: boolean;
}

const sizeMap = {
    sm: "w-64 h-64",
    md: "w-96 h-96",
    lg: "w-[600px] h-[600px]",
    xl: "w-[800px] h-[800px]"
};

const colorMap = {
    primary: "bg-primary/20",
    secondary: "bg-indigo-500/15",
    accent: "bg-purple-500/15"
};

export function GradientBlob({
    className = "",
    color = "primary",
    size = "lg",
    animate = true
}: GradientBlobProps) {
    const baseClasses = `absolute rounded-full blur-[120px] pointer-events-none ${sizeMap[size]} ${colorMap[color]}`;

    if (animate) {
        return (
            <motion.div
                className={`${baseClasses} ${className}`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        );
    }

    return <div className={`${baseClasses} ${className} opacity-30`} />;
}

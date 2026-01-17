"use client";

import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useState } from "react";

export function MacOSControls() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="fixed top-6 left-6 z-50 flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Close Button */}
            <motion.button
                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/90 flex items-center justify-center group transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <X className="w-2 h-2 text-[#4D0000] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </motion.div>
            </motion.button>

            {/* Minimize Button */}
            <motion.button
                className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/90 flex items-center justify-center group transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Minus className="w-2 h-2 text-[#995700] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </motion.div>
            </motion.button>

            {/* Maximize Button */}
            <motion.button
                className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/90 flex items-center justify-center group transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Maximize2 className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </motion.div>
            </motion.button>
        </div>
    );
}

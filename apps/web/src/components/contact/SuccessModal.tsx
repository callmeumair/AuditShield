"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Mail, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    useEffect(() => {
        if (isOpen) {
            // Trigger confetti animation
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Success icon with animation */}
                <div className="p-12 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6"
                    >
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold mb-4"
                    >
                        Thank You for Reaching Out!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-muted-foreground mb-8"
                    >
                        We've received your inquiry and our team will get back to you within 24 hours.
                    </motion.p>

                    {/* Next Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-secondary/50 rounded-xl p-8 mb-8 text-left"
                    >
                        <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Check your email</h4>
                                    <p className="text-sm text-muted-foreground">
                                        You'll receive a confirmation email with your inquiry details
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">We'll reach out</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Our team will contact you within 24 hours to discuss your needs
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1">Schedule a demo</h4>
                                    <p className="text-sm text-muted-foreground">
                                        We'll set up a personalized demo to show you AuditShield in action
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            onClick={onClose}
                            className="rounded-full"
                        >
                            Close
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full"
                            asChild
                        >
                            <a href="/documentation">Explore Documentation</a>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

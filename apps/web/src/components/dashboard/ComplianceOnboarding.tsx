"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ComplianceOnboarding() {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true); // Default to true to prevent flash

    useEffect(() => {
        // Check local storage for onboarding status
        const seen = localStorage.getItem("auditshield_ftue_seen");
        if (!seen) {
            setHasSeenOnboarding(false);
            setIsOpen(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem("auditshield_ftue_seen", "true");
        setIsOpen(false);
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else handleDismiss();
    };

    if (hasSeenOnboarding && !isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed bottom-6 right-6 z-50 w-full max-w-md shadow-2xl"
                >
                    <Card className="border-emerald-200 bg-emerald-50/90 backdrop-blur-md">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-emerald-700 hover:text-emerald-900"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <CardHeader>
                            <div className="flex items-center gap-2 text-emerald-800">
                                <ShieldCheck className="h-6 w-6" />
                                <CardTitle className="text-lg">Welcome to Auditor-Grade Compliance</CardTitle>
                            </div>
                            <CardDescription className="text-emerald-700">
                                AuditShield provides tamper-evident proof of your AI governance.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {step === 1 && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-right-4">
                                    <h4 className="font-semibold text-emerald-900">1. Tamper-Evident Hashing</h4>
                                    <p className="text-sm text-emerald-800 leading-relaxed">
                                        Every audit log and report generated is cryptographically signed using SHA-256.
                                        This creates an immutable ledger that auditors can mathematically verify.
                                    </p>
                                    <div className="bg-white/50 p-3 rounded text-xs font-mono text-emerald-900 break-all border border-emerald-100">
                                        hash = SHA256(data + timestamp + org_id)
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-right-4">
                                    <h4 className="font-semibold text-emerald-900">2. Immutable Policy Ledger</h4>
                                    <p className="text-sm text-emerald-800 leading-relaxed">
                                        You cannot delete past policies. Changes create new versions in a permanent timeline,
                                        providing a complete history of your governance evolution for compliance reviews.
                                    </p>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-right-4">
                                    <h4 className="font-semibold text-emerald-900">3. Setup Checklist</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            <span className="text-sm text-emerald-900 line-through opacity-70">
                                                Create Organization
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-emerald-600 rounded-full" />
                                            <span className="text-sm text-emerald-900">
                                                Set Initial Policy
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-emerald-600 rounded-full" />
                                            <span className="text-sm text-emerald-900">
                                                Generate First Report
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <Progress value={(step / 3) * 100} className="h-1 bg-emerald-200" />
                            </div>
                        </CardContent>

                        <CardFooter className="justify-between">
                            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50">
                                Dismiss
                            </Button>
                            <Button size="sm" onClick={nextStep} className="bg-emerald-700 hover:bg-emerald-800 text-white">
                                {step === 3 ? "Get Started" : "Next"}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    CheckCircle2, ArrowRight, ArrowLeft, Loader2,
    User, Building2, MessageSquare, Calendar, Sparkles
} from "lucide-react";

const steps = [
    { id: 1, name: "Personal Info", icon: User },
    { id: 2, name: "Company Details", icon: Building2 },
    { id: 3, name: "Your Inquiry", icon: MessageSquare },
];

interface ContactFormProps {
    onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
    } = useForm({
        resolver: zodResolver(contactFormSchema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            companySize: "" as any,
            industry: "",
            website: "",
            jobTitle: "",
            inquiryType: "demo",
            subject: "",
            message: "",
            preferredContactMethod: "email",
            preferredTime: "",
            utmSource: "",
            utmMedium: "",
            utmCampaign: "",
        },
    });

    const validateStep = async (step: number) => {
        const fieldsToValidate: (keyof ContactFormData)[][] = [
            ["firstName", "lastName", "email", "phone"],
            ["companyName", "companySize", "industry", "jobTitle"],
            ["message", "preferredContactMethod"],
        ];

        const isValid = await trigger(fieldsToValidate[step - 1]);
        return isValid;
    };

    const nextStep = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to submit form");
            }

            onSuccess?.();
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between mb-4">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`flex items-center gap-2 ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${currentStep >= step.id
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background"
                                    }`}
                            >
                                {currentStep > step.id ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    <step.icon className="h-5 w-5" />
                                )}
                            </div>
                            <span className="hidden md:block text-sm font-medium">{step.name}</span>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
                <AnimatePresence mode="wait">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Let's start with you</h2>
                                <p className="text-muted-foreground">Tell us a bit about yourself</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name *</label>
                                    <Input
                                        {...register("firstName")}
                                        placeholder="John"
                                        className={errors.firstName ? "border-red-500" : ""}
                                    />
                                    {errors.firstName && (
                                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name *</label>
                                    <Input
                                        {...register("lastName")}
                                        placeholder="Doe"
                                        className={errors.lastName ? "border-red-500" : ""}
                                    />
                                    {errors.lastName && (
                                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Work Email *</label>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="john@company.com"
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    className={errors.phone ? "border-red-500" : ""}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Company Information */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl font-bold mb-2">About your company</h2>
                                <p className="text-muted-foreground">Help us understand your organization</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Company Name *</label>
                                <Input
                                    {...register("companyName")}
                                    placeholder="Acme Inc."
                                    className={errors.companyName ? "border-red-500" : ""}
                                />
                                {errors.companyName && (
                                    <p className="text-sm text-red-500">{errors.companyName.message}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Company Size *</label>
                                    <select
                                        {...register("companySize")}
                                        className={`w-full h-10 px-3 rounded-md border ${errors.companySize ? "border-red-500" : "border-input"
                                            } bg-background`}
                                    >
                                        <option value="">Select size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-1000">201-1000 employees</option>
                                        <option value="1000+">1000+ employees</option>
                                    </select>
                                    {errors.companySize && (
                                        <p className="text-sm text-red-500">{errors.companySize.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Industry</label>
                                    <Input
                                        {...register("industry")}
                                        placeholder="Technology"
                                        className={errors.industry ? "border-red-500" : ""}
                                    />
                                    {errors.industry && (
                                        <p className="text-sm text-red-500">{errors.industry.message as string}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <Input
                                        {...register("jobTitle")}
                                        placeholder="Chief Security Officer"
                                        className={errors.jobTitle ? "border-red-500" : ""}
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website</label>
                                    <Input
                                        {...register("website")}
                                        type="url"
                                        placeholder="https://company.com"
                                        className={errors.website ? "border-red-500" : ""}
                                    />
                                    {errors.website && (
                                        <p className="text-sm text-red-500">{errors.website.message}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Inquiry Details */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl font-bold mb-2">How can we help?</h2>
                                <p className="text-muted-foreground">Tell us about your needs</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">I'm interested in *</label>
                                <select
                                    {...register("inquiryType")}
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                >
                                    <option value="demo">Requesting a Demo</option>
                                    <option value="sales">Speaking with Sales</option>
                                    <option value="support">Getting Support</option>
                                    <option value="partnership">Partnership Opportunities</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message *</label>
                                <Textarea
                                    {...register("message")}
                                    placeholder="Tell us about your AI governance needs..."
                                    rows={6}
                                    className={errors.message ? "border-red-500" : ""}
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-500">{errors.message.message}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Preferred Contact Method</label>
                                    <select
                                        {...register("preferredContactMethod")}
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    >
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                        <option value="either">Either</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Best Time to Reach You</label>
                                    <Input
                                        {...register("preferredTime")}
                                        placeholder="e.g., Weekdays 9am-5pm PT"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                {submitError && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                        {submitError}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isSubmitting}
                        className="rounded-full"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    {currentStep < steps.length ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="rounded-full"
                        >
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full min-w-[140px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Submit
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}

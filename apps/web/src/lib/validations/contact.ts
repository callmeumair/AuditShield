import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
    // Personal Information
    firstName: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(100, "First name is too long")
        .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),

    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .max(100, "Last name is too long")
        .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),

    email: z.string()
        .email("Please enter a valid email address")
        .max(255, "Email is too long")
        .toLowerCase(),

    phone: z.string()
        .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
        .min(10, "Phone number is too short")
        .max(50, "Phone number is too long")
        .optional()
        .or(z.literal("")),

    // Company Information
    companyName: z.string()
        .min(2, "Company name must be at least 2 characters")
        .max(255, "Company name is too long"),

    companySize: z.enum([
        "1-10",
        "11-50",
        "51-200",
        "201-1000",
        "1000+"
    ], {
        errorMap: () => ({ message: "Please select a company size" })
    }),

    industry: z.string()
        .min(2, "Please specify your industry")
        .max(100, "Industry name is too long")
        .optional()
        .or(z.literal("")),

    website: z.string()
        .url("Please enter a valid website URL")
        .max(255, "Website URL is too long")
        .optional()
        .or(z.literal("")),

    jobTitle: z.string()
        .min(2, "Job title must be at least 2 characters")
        .max(100, "Job title is too long")
        .optional()
        .or(z.literal("")),

    // Inquiry Details
    inquiryType: z.enum([
        "demo",
        "sales",
        "support",
        "partnership",
        "other"
    ]).default("demo"),

    subject: z.string()
        .min(5, "Subject must be at least 5 characters")
        .max(255, "Subject is too long")
        .optional()
        .or(z.literal("")),

    message: z.string()
        .min(10, "Message must be at least 10 characters")
        .max(5000, "Message is too long"),

    preferredContactMethod: z.enum([
        "email",
        "phone",
        "either"
    ]).default("email"),

    preferredTime: z.string()
        .max(100)
        .optional()
        .or(z.literal("")),

    // Tracking (optional, populated server-side)
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Server-side extended schema with metadata
export const contactInquirySchema = contactFormSchema.extend({
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    referrer: z.string().optional(),
    source: z.string().default("website"),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

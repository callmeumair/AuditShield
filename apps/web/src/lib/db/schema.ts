import { pgTable, uuid, varchar, text, timestamp, inet, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const contactInquiries = pgTable('contact_inquiries', {
    id: uuid('id').primaryKey().defaultRandom(),

    // Contact Information
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }),

    // Company Information
    companyName: varchar('company_name', { length: 255 }).notNull(),
    companySize: varchar('company_size', { length: 50 }),
    industry: varchar('industry', { length: 100 }),
    website: varchar('website', { length: 255 }),
    jobTitle: varchar('job_title', { length: 100 }),

    // Inquiry Details
    inquiryType: varchar('inquiry_type', { length: 50 }).notNull().default('demo'),
    subject: varchar('subject', { length: 255 }),
    message: text('message').notNull(),
    preferredContactMethod: varchar('preferred_contact_method', { length: 50 }),
    preferredTime: varchar('preferred_time', { length: 100 }),

    // Metadata
    status: varchar('status', { length: 50 }).default('new'),
    priority: varchar('priority', { length: 20 }).default('medium'),
    assignedTo: varchar('assigned_to', { length: 255 }),

    // Tracking
    source: varchar('source', { length: 100 }).default('website'),
    utmSource: varchar('utm_source', { length: 100 }),
    utmMedium: varchar('utm_medium', { length: 100 }),
    utmCampaign: varchar('utm_campaign', { length: 100 }),
    ipAddress: inet('ip_address'),
    userAgent: text('user_agent'),
    referrer: text('referrer'),

    // Timestamps
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    contactedAt: timestamp('contacted_at', { withTimezone: true }),
}, (table) => ({
    emailIdx: index('idx_inquiries_email').on(table.email),
    statusIdx: index('idx_inquiries_status').on(table.status),
    createdAtIdx: index('idx_inquiries_created_at').on(table.createdAt),
    companyIdx: index('idx_inquiries_company').on(table.companyName),
    typeIdx: index('idx_inquiries_type').on(table.inquiryType),
}));

export const inquiryActivities = pgTable('inquiry_activities', {
    id: uuid('id').primaryKey().defaultRandom(),
    inquiryId: uuid('inquiry_id').notNull().references(() => contactInquiries.id, { onDelete: 'cascade' }),

    activityType: varchar('activity_type', { length: 50 }).notNull(),
    description: text('description'),
    performedBy: varchar('performed_by', { length: 255 }),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
    inquiryIdx: index('idx_activities_inquiry').on(table.inquiryId),
    createdAtIdx: index('idx_activities_created_at').on(table.createdAt),
}));

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;
export type InquiryActivity = typeof inquiryActivities.$inferSelect;
export type NewInquiryActivity = typeof inquiryActivities.$inferInsert;

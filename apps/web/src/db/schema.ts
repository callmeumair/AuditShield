import { pgTable, uuid, text, timestamp, jsonb, index } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    plan: text('plan').default('active'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const auditEvents = pgTable('audit_events', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
    userId: text('user_id'), // External Clerk ID
    domain: text('domain').notNull(),
    url: text('url'),
    eventType: text('event_type').default('access'),
    metadata: jsonb('metadata'),
    hash: text('hash'),
    createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
    return {
        orgIdx: index('idx_audit_org_time').on(table.organizationId, table.createdAt),
        domainIdx: index('idx_audit_domain').on(table.domain),
    }
});

export const reports = pgTable('reports', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
    generatedBy: text('generated_by'),
    periodStart: timestamp('period_start').notNull(),
    periodEnd: timestamp('period_end').notNull(),
    pdfUrl: text('pdf_url'),
    reportHash: text('report_hash').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const policies = pgTable('policies', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
    domain: text('domain').notNull(), // e.g., 'openai.com'
    status: text('status').default('allowed'), // 'allowed', 'banned', 'review'
    reason: text('reason'),
    createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
    return {
        policyOrgIdx: index('idx_policy_org').on(table.organizationId),
    }
});

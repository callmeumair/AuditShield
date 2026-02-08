import { pgTable, uuid, text, timestamp, jsonb, index, integer } from 'drizzle-orm/pg-core';

// Organizations table - links to Clerk organization IDs
export const organizations = pgTable('organizations', {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkOrgId: text('clerk_org_id').unique().notNull(), // Clerk organization ID
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    plan: text('plan').default('active'),
    createdAt: timestamp('created_at').defaultNow(),
});

// Organization API Keys - for extension authentication
export const organizationApiKeys = pgTable('organization_api_keys', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
    keyHash: text('key_hash').notNull().unique(), // SHA-256 hash of the API key
    keyPrefix: text('key_prefix').notNull(), // First 8 chars for display (e.g., "as_live_")
    name: text('name'), // Optional name for the key
    lastUsedAt: timestamp('last_used_at'),
    createdAt: timestamp('created_at').defaultNow(),
    revokedAt: timestamp('revoked_at'),
}, (table) => {
    return {
        orgIdx: index('idx_api_keys_org').on(table.organizationId),
        hashIdx: index('idx_api_keys_hash').on(table.keyHash),
    }
});

// Policies - tool-specific rules and actions
export const policies = pgTable('policies', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
    toolName: text('tool_name').notNull(), // 'ChatGPT', 'Claude', 'Gemini', 'Copilot', etc.
    action: text('action').notNull().default('allow'), // 'allow', 'block', 'review'
    rulesJson: jsonb('rules_json'), // Custom regex patterns and keywords
    reason: text('reason'), // Why this policy exists
    enabled: text('enabled').default('true'), // 'true' or 'false'
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => {
    return {
        orgIdx: index('idx_policy_org').on(table.organizationId),
        toolIdx: index('idx_policy_tool').on(table.toolName),
    }
});

// Policy Versions - immutable version history
export const policyVersions = pgTable('policy_versions', {
    id: uuid('id').defaultRandom().primaryKey(),
    policyId: uuid('policy_id').references(() => policies.id, { onDelete: 'cascade' }).notNull(),
    version: integer('version').notNull(), // Incrementing version number
    toolName: text('tool_name').notNull(),
    action: text('action').notNull(),
    rulesJson: jsonb('rules_json'),
    reason: text('reason'),
    effectiveFrom: timestamp('effective_from').notNull(),
    createdBy: text('created_by').notNull(), // Clerk user ID
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        policyIdx: index('idx_policy_versions_policy').on(table.policyId),
        effectiveIdx: index('idx_policy_versions_effective').on(table.effectiveFrom),
    }
});

// Audit Logs - comprehensive event logging with immutability proof
export const auditLogs = pgTable('audit_logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
    userEmail: text('user_email'), // Email of the user who triggered the event
    userId: text('user_id'), // External Clerk user ID (if available)
    tool: text('tool').notNull(), // 'ChatGPT', 'Claude', etc.
    domain: text('domain').notNull(), // Full domain (e.g., 'chat.openai.com')
    url: text('url'), // Full URL if available
    promptText: text('prompt_text'), // The actual prompt/message (for DLP analysis)
    actionTaken: text('action_taken').notNull(), // 'allowed', 'blocked', 'flagged'
    riskScore: integer('risk_score').default(0), // 0-100 risk score
    violationReasons: jsonb('violation_reasons'), // Array of matched patterns/rules
    metadata: jsonb('metadata'), // Additional context
    hashSignature: text('hash_signature').notNull(), // SHA-256 hash for immutability
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        orgTimeIdx: index('idx_audit_org_time').on(table.organizationId, table.createdAt),
        toolIdx: index('idx_audit_tool').on(table.tool),
        actionIdx: index('idx_audit_action').on(table.actionTaken),
        riskIdx: index('idx_audit_risk').on(table.riskScore),
        emailIdx: index('idx_audit_email').on(table.userEmail),
    }
});

// Incidents - flagged violations requiring attention
export const incidents = pgTable('incidents', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
    auditLogId: uuid('audit_log_id').references(() => auditLogs.id, { onDelete: 'cascade' }).notNull(),
    title: text('title').notNull(),
    severity: text('severity').notNull().default('medium'), // 'low', 'medium', 'high', 'critical'
    status: text('status').notNull().default('open'), // 'open', 'investigating', 'resolved', 'dismissed'
    assignedTo: text('assigned_to'), // Clerk user ID
    notes: text('notes'),
    resolvedAt: timestamp('resolved_at'),
    resolvedBy: text('resolved_by'), // Clerk user ID
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
    return {
        orgIdx: index('idx_incidents_org').on(table.organizationId),
        statusIdx: index('idx_incidents_status').on(table.status),
        severityIdx: index('idx_incidents_severity').on(table.severity),
        assignedIdx: index('idx_incidents_assigned').on(table.assignedTo),
    }
});

// Clients - external users with read-only report access
export const clients = pgTable('clients', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    accessToken: text('access_token').unique().notNull(), // Unique token for authentication
    lastAccessAt: timestamp('last_access_at'),
    expiresAt: timestamp('expires_at').notNull(), // Time-limited access
    createdBy: text('created_by').notNull(), // Clerk user ID who invited
    createdAt: timestamp('created_at').defaultNow().notNull(),
    revokedAt: timestamp('revoked_at'),
}, (table) => {
    return {
        orgIdx: index('idx_clients_org').on(table.organizationId),
        emailIdx: index('idx_clients_email').on(table.email),
        tokenIdx: index('idx_clients_token').on(table.accessToken),
    }
});

// Reports - generated compliance reports
export const reports = pgTable('reports', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
    generatedBy: text('generated_by').notNull(), // User who generated the report
    periodStart: timestamp('period_start').notNull(),
    periodEnd: timestamp('period_end').notNull(),
    pdfUrl: text('pdf_url'), // S3 URL or local path
    reportHash: text('report_hash').notNull(), // SHA-256 hash of PDF for verification
    totalEvents: integer('total_events').default(0),
    totalViolations: integer('total_violations').default(0),
    status: text('status').default('generated'), // 'generating', 'generated', 'failed'
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        orgIdx: index('idx_reports_org').on(table.organizationId),
        periodIdx: index('idx_reports_period').on(table.periodStart, table.periodEnd),
    }
});

// Keep legacy audit_events table for backward compatibility (can be removed later)
export const auditEvents = pgTable('audit_events', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
    userId: text('user_id'),
    domain: text('domain').notNull(),
    url: text('url'),
    eventType: text('event_type').default('access'),
    metadata: jsonb('metadata'),
    hash: text('hash'),
    createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
    return {
        orgIdx: index('idx_audit_org_time_legacy').on(table.organizationId, table.createdAt),
        domainIdx: index('idx_audit_domain_legacy').on(table.domain),
    }
});

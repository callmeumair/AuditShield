-- AuditShield Database Schema (Neon/Postgres)

-- Organizations (SaaS tenants)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  plan TEXT DEFAULT 'active' -- 'trial', 'enterprise'
);

-- Users (often handled by Clerk, but good to have a local reference for relations)
CREATE TABLE users (
  id TEXT PRIMARY KEY, -- Clerk ID (user_...)
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member', -- 'admin', 'auditor', 'member'
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Events (The core value prop)
-- Immutable append-only log of AI tool usage
CREATE TABLE audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  user_id TEXT REFERENCES users(id), -- Nullable if script-based
  domain TEXT NOT NULL, -- e.g. 'chat.openai.com'
  url TEXT, -- Full URL accessed
  event_type TEXT DEFAULT 'access', -- 'access', 'paste', 'download'
  metadata JSONB DEFAULT '{}', -- Browser details, etc.
  hash TEXT, -- SHA-256 of the event content for tamper-evidence
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  generated_by TEXT REFERENCES users(id),
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  pdf_url TEXT, -- Storage URL
  report_hash TEXT NOT NULL, -- The "Seal" of the report
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_audit_org_time ON audit_events(organization_id, created_at DESC);
CREATE INDEX idx_audit_domain ON audit_events(domain);

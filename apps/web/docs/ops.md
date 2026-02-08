# Operational Readiness Guide

## 🚀 Deployment Checklist

### Environment Variables
Ensure the following variables are set in production (Vercel/Railway):

```bash
# Database (Neon)
DATABASE_URL="postgres://..."

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Caching (Upstash)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### Database Migration
Run migrations during the build step or immediately after deployment:

```bash
npm run db:migrate
```

## 🔐 Secrets Management

### API Key Rotation
AuditShield uses long-lived secret keys (`as_live_...`). 
To rotate a compromised key:
1. Generate new key via `Settings > API Keys`.
2. Update consumer applications (e.g. extension) with new key.
3. Old key is immediately invalidated (if database backed) or requires re-deploy (if env var backed).

### Database Credentials
Neon database credentials should be rotated every 90 days.
Update `DATABASE_URL` in Vercel project settings afterwards.

## 🛡️ Rate Limiting & Security

### Rate Limits (Upstash)
- **Public API**: 100 requests / 10 sec per IP
- **Report Generation**: 5 requests / hour per Organization
- **Verification**: 100 requests / hour per IP

### Idempotency
Report generation uses date-range-based locks. Generating a report for the same period twice within 5 minutes will return the cached result / existing job status.

## 💾 Backup & Retention

- **Database**: Point-in-time recovery enabled (7 day retention).
- **Audit Logs**: Soft-deletion only. Hard deletion requires manual SQL intervention by CTO.
- **Reports**: Stored as binary blobs (if configured) or references. Immutable hashes stored in `reports` table.

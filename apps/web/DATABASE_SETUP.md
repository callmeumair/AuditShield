# Enterprise Contact System - Database Setup

## Prerequisites

- PostgreSQL database (local or hosted)
- Database connection URL

## Environment Variables

Add the following to your `.env.local` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/auditshield"
```

## Running the Migration

1. **Connect to your PostgreSQL database:**

```bash
psql -U your_username -d auditshield
```

2. **Run the migration SQL:**

```bash
psql -U your_username -d auditshield < src/db/migrations/001_contact_inquiries.sql
```

Or execute the SQL file directly in your database client.

## Installing Dependencies

```bash
npm install drizzle-orm postgres zod react-hook-form @hookform/resolvers canvas-confetti
npm install -D drizzle-kit @types/canvas-confetti
```

## Drizzle Configuration

Create `drizzle.config.ts` in the root of `apps/web`:

```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema.ts',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

## Generating Migrations

To generate new migrations after schema changes:

```bash
npx drizzle-kit generate:pg
```

## Pushing Schema to Database

To push schema changes directly:

```bash
npx drizzle-kit push:pg
```

## Viewing Database

To open Drizzle Studio (database GUI):

```bash
npx drizzle-kit studio
```

## Email Integration (Optional)

To enable email notifications, integrate with an email service:

### Using Resend (Recommended)

1. Install Resend:
```bash
npm install resend
```

2. Add to `.env.local`:
```env
RESEND_API_KEY="re_your_api_key"
```

3. Update `src/lib/email/notifications.ts` with Resend integration

### Alternative Services

- **SendGrid**: `npm install @sendgrid/mail`
- **AWS SES**: `npm install @aws-sdk/client-ses`
- **Postmark**: `npm install postmark`

## Database Schema Overview

### Tables

1. **contact_inquiries** - Stores all contact form submissions
   - Personal information (name, email, phone)
   - Company details (name, size, industry)
   - Inquiry details (type, message, preferences)
   - Tracking metadata (IP, user agent, UTM parameters)
   - Status management (new, contacted, qualified, closed)

2. **inquiry_activities** - Activity log for CRM functionality
   - Tracks all interactions with inquiries
   - Email sent, calls made, notes added, etc.

### Indexes

- Email lookup
- Status filtering
- Date range queries
- Company search
- Inquiry type filtering

## Testing the API

Test the contact endpoint:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "companyName": "Acme Inc",
    "companySize": "51-200",
    "message": "I would like to schedule a demo",
    "inquiryType": "demo",
    "preferredContactMethod": "email"
  }'
```

## Querying Data

Example queries to view submissions:

```sql
-- View all inquiries
SELECT * FROM contact_inquiries ORDER BY created_at DESC;

-- View high priority inquiries
SELECT * FROM contact_inquiries WHERE priority = 'high' AND status = 'new';

-- View inquiries by company size
SELECT company_size, COUNT(*) as count 
FROM contact_inquiries 
GROUP BY company_size;

-- View activity log for an inquiry
SELECT * FROM inquiry_activities 
WHERE inquiry_id = 'your-inquiry-id' 
ORDER BY created_at DESC;
```

## Production Considerations

1. **Rate Limiting**: The current implementation uses in-memory storage. For production, use Redis:
   ```bash
   npm install @upstash/redis
   ```

2. **Database Connection Pooling**: Configure connection pool limits in production

3. **Email Queue**: Use a queue system (Bull, BullMQ) for reliable email delivery

4. **Monitoring**: Set up alerts for failed submissions and email delivery issues

5. **Backup**: Configure automated database backups

6. **GDPR Compliance**: Implement data retention policies and deletion workflows

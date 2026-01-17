# Extension-Dashboard Sync Testing Guide

## Quick Setup

### 1. Configure Extension
1. Open the AuditShield extension popup
2. Go to **Settings** tab
3. Fill in:
   - **API Key**: Generate from Dashboard → Settings → API Keys
   - **API URL**: `https://audit-shield-web.vercel.app` (or your deployed URL)
   - **Your Email**: your.email@company.com (optional)
4. Click **Save Settings**

### 2. Test Real-Time Sync

#### Test 1: Visit AI Tools
1. Visit https://claude.ai
2. Visit https://gemini.google.com  
3. Visit https://chat.openai.com

#### Test 2: Check Dashboard
1. Go to Dashboard → Overview
2. **Total AI Interactions** should show 3 (or more)
3. Go to Dashboard → Live Feed
4. You should see your visits in real-time (updates every 2 seconds)

#### Test 3: Create a Policy
1. Go to Dashboard → Policies
2. Create a BLOCK policy for ChatGPT
3. Visit https://chat.openai.com
4. You should see a browser notification: "Access Blocked"
5. Check Live Feed - the event should show `actionTaken: blocked`

## How It Works

### Extension → API Flow
```
Browser Extension (background.ts)
  ↓ Detects AI tool visit
  ↓ Sends POST to /api/v1/log-event
  ↓ Includes: tool, domain, userEmail, timestamp
API validates API key
  ↓ Checks policies for this tool
  ↓ Calculates risk score
  ↓ Inserts into audit_logs table
  ↓ Returns { allowed: true/false, reason }
Extension shows notification if blocked
```

### Dashboard → API Flow
```
Dashboard (LiveFeedClient.tsx)
  ↓ SWR polling every 2 seconds
  ↓ Calls GET /api/stats/live
API queries audit_logs table
  ↓ Returns last 50 events + stats
Dashboard updates UI
  ↓ Flash animation for new violations
```

## Troubleshooting

### Dashboard shows 0 interactions
**Cause**: Extension not configured or using wrong API endpoint

**Fix**:
1. Check extension settings - API key must be valid
2. Check API URL matches your deployment
3. Open browser console (F12) → Check for errors
4. Look for `[AuditShield]` logs in console

### Extension shows "Invalid API key"
**Cause**: API key not found or revoked

**Fix**:
1. Go to Dashboard → Settings
2. Generate a new API key
3. Copy and paste into extension
4. Click Save Settings

### Live Feed not updating
**Cause**: SWR polling issue or database connection

**Fix**:
1. Refresh the dashboard page
2. Check browser console for errors
3. Verify database connection in deployment logs

### Events logged but not showing in dashboard
**Cause**: Using old `auditEvents` table instead of `audit_logs`

**Fix**: Already fixed in latest code - dashboard now queries `audit_logs` table

## Verification Checklist

- [ ] Extension popup shows "✓ Connected" status
- [ ] Visiting AI tools creates entries in extension Activity tab
- [ ] Dashboard Overview shows correct interaction count
- [ ] Live Feed updates within 2 seconds of visiting AI tool
- [ ] Creating a BLOCK policy triggers browser notification
- [ ] Blocked events show in Live Feed with red indicator
- [ ] Settings page can generate and revoke API keys
- [ ] Reports page can export PDF with audit logs

## Database Tables

### audit_logs (NEW - Primary)
- Stores all events from extension
- Includes: userEmail, tool, domain, actionTaken, riskScore, hashSignature
- Used by: Live Feed, Reports, Dashboard stats

### auditEvents (LEGACY - Deprecated)
- Old table from initial implementation
- Still exists for backward compatibility
- Will be removed in future version

## API Endpoints

### Extension Uses:
- `POST /api/v1/log-event` - Log AI tool usage
- `GET /api/v1/policies` - Fetch policies (for content script)

### Dashboard Uses:
- `GET /api/dashboard/stats` - Overview statistics
- `GET /api/stats/live` - Live feed data
- `GET /api/v1/api-keys` - Manage API keys
- `GET /api/v1/policies` - Manage policies
- `GET /api/reports/export` - Generate PDF reports

## Next Steps for Production

1. **Replace SWR polling with WebSockets** for true real-time updates
2. **Add retry logic** in extension for failed API calls
3. **Implement offline queue** in extension to buffer events
4. **Add rate limiting** to prevent API abuse
5. **Monitor API latency** and optimize slow queries

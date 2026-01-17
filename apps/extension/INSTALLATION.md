# AuditShield Browser Extension

## Installation Guide

### Step 1: Download the Extension
1. Click the **"Extension"** button in the dashboard header
2. Save `auditshield-extension.zip` to your computer
3. Extract the ZIP file to a folder

### Step 2: Install in Chrome/Edge
1. Open Chrome/Edge and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right)
3. Click **"Load unpacked"**
4. Select the extracted extension folder
5. The AuditShield icon should appear in your toolbar

### Step 3: Configure API Connection
1. Click the AuditShield extension icon
2. Go to **Settings** tab
3. Enter your **API Key** from the dashboard:
   - Navigate to Dashboard → Settings → API Keys
   - Copy your API key
   - Paste it in the extension settings
4. Click **Save**

### Step 4: Verify Connection
1. Visit any AI tool (ChatGPT, Claude, Gemini)
2. Check the extension popup - it should show "Connected"
3. Go to Dashboard → Live Feed to see real-time events

---

## Monitored AI Tools

The extension automatically detects and logs visits to:
- ✅ **ChatGPT** (chat.openai.com, chatgpt.com)
- ✅ **Claude** (claude.ai)
- ✅ **Google Gemini** (gemini.google.com)
- ✅ **Microsoft Copilot** (copilot.microsoft.com)

---

## How It Works

### Passive Monitoring
- The extension runs in the background
- No data is collected from conversations
- Only logs: domain, timestamp, and user ID
- All data is SHA-256 hashed for tamper-evidence

### Real-Time Sync
- Events are sent to your dashboard instantly
- View live activity in Dashboard → Live Feed
- Generate compliance reports anytime

### Privacy First
- **No conversation content** is ever captured
- Only metadata (domain, time) is logged
- All data stays in your organization
- GDPR & SOC 2 compliant

---

## Troubleshooting

### Extension Not Logging Events
1. Check if the extension is enabled in `chrome://extensions/`
2. Verify API key is configured correctly
3. Check browser console for errors (F12 → Console)
4. Ensure you're visiting a monitored AI tool

### "Failed to sync event" Error
1. Verify your dashboard is running
2. Check API key is valid (Settings → API Keys)
3. Ensure network connection is stable
4. Check firewall/proxy settings

### Events Not Appearing in Dashboard
1. Refresh the Live Feed page
2. Check filters (Severity, Tool, Search)
3. Verify organization ID matches
4. Check database connection

---

## Development Mode

For local development:
1. Extension sends events to `http://localhost:3000/api/ingest`
2. Update `background.ts` for production URL
3. Rebuild extension: `npm run build`
4. Reload extension in `chrome://extensions/`

---

## Security

- **API Key**: Stored securely in Chrome's encrypted storage
- **HTTPS Only**: Production uses HTTPS for all API calls
- **No Tracking**: Extension doesn't track browsing outside AI tools
- **Open Source**: Code is auditable and transparent

---

## Support

Need help? Contact support:
- Email: support@auditshield.com
- Documentation: [Dashboard → Documentation]
- GitHub Issues: [Report a bug]

---

## Version

**Current Version**: 1.0.0  
**Last Updated**: January 2026  
**Compatibility**: Chrome 88+, Edge 88+

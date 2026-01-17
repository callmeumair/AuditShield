export { };

// Background Service Worker with API Key Support

// Comprehensive AI domains to monitor
const AI_DOMAINS = [
    { domain: 'chat.openai.com', tool: 'ChatGPT' },
    { domain: 'chatgpt.com', tool: 'ChatGPT' },
    { domain: 'claude.ai', tool: 'Claude' },
    { domain: 'gemini.google.com', tool: 'Gemini' },
    { domain: 'copilot.microsoft.com', tool: 'Copilot' },
    { domain: 'perplexity.ai', tool: 'Perplexity' },
    { domain: 'poe.com', tool: 'Poe' },
];

// Get API configuration from storage
async function getApiConfig(): Promise<{ apiKey: string; apiUrl: string; userEmail: string }> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['apiKey', 'apiUrl', 'userEmail'], (result) => {
            resolve({
                apiKey: result.apiKey || '',
                apiUrl: result.apiUrl || 'http://localhost:3000',
                userEmail: result.userEmail || ''
            });
        });
    });
}

async function sendEventToAPI(event: any) {
    const config = await getApiConfig();

    if (!config.apiKey) {
        console.warn('[AuditShield] No API key configured. Please set up in extension settings.');
        return;
    }

    try {
        const response = await fetch(`${config.apiUrl}/api/v1/log-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-audit-key': config.apiKey
            },
            body: JSON.stringify({
                ...event,
                userEmail: (config as any).userEmail || null
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('[AuditShield] Event synced successfully:', data);

            // If blocked, show notification
            if (!data.allowed) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icon48.png',
                    title: 'AuditShield - Access Blocked',
                    message: data.reason || 'This tool is blocked by your organization policy'
                });
            }
        } else if (response.status === 401) {
            console.error('[AuditShield] Invalid API key. Please check your settings.');
        } else if (response.status === 403) {
            const data = await response.json();
            console.warn('[AuditShield] Access blocked by policy:', data.reason);
        } else {
            console.warn('[AuditShield] Failed to sync event:', response.status);
        }
    } catch (error) {
        console.error('[AuditShield] Failed to sync log:', error);
    }
}

function handleNavigation(details: chrome.webNavigation.WebNavigationFramedCallbackDetails) {
    // Check if main frame
    if (details.frameId !== 0) return;

    const url = new URL(details.url);
    const hostname = url.hostname;

    // Find matching AI domain
    const aiTool = AI_DOMAINS.find(d => hostname.includes(d.domain));

    if (aiTool) {
        console.log(`[AuditShield] AI Tool Usage Detected: ${aiTool.tool} (${hostname})`);

        // Log event to storage (local buffer)
        chrome.storage.local.get(['audit_log'], (result) => {
            const log = result.audit_log || [];

            // Avoid duplicate log entries if timestamp is very close (debounce)
            const lastEntry = log[log.length - 1];
            const now = new Date().getTime();
            if (lastEntry && (now - new Date(lastEntry.timestamp).getTime() < 5000) && lastEntry.domain === hostname) {
                return; // Skip duplicate detection within 5 seconds for same domain
            }

            const newEvent = {
                timestamp: new Date().toISOString(),
                domain: hostname,
                url: details.url,
                tool: aiTool.tool,
                eventType: 'access'
            };

            const newLog = [...log, newEvent];
            chrome.storage.local.set({ audit_log: newLog });

            // Send to API
            sendEventToAPI(newEvent);
        });
    }
}

// Listen for initial page load
chrome.webNavigation.onCompleted.addListener(handleNavigation, { url: [{ schemes: ['http', 'https'] }] });

// Listen for history updates (SPA navigation)
chrome.webNavigation.onHistoryStateUpdated.addListener(handleNavigation, { url: [{ schemes: ['http', 'https'] }] });

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('[AuditShield] Extension installed successfully');
});

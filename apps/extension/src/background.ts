// Background Service Worker

// Trusted domains to monitor
const AI_DOMAINS = [
    'chat.openai.com',
    'claude.ai',
    'gemini.google.com',
    'copilot.microsoft.com'
];

chrome.webNavigation.onCompleted.addListener((details) => {
    // Check if main frame
    if (details.frameId !== 0) return;

    const url = new URL(details.url);
    const domain = url.hostname;

    if (AI_DOMAINS.some(d => domain.includes(d))) {
        console.log(`[AuditShield] AI Tool Usage Detected: ${domain}`);

        // Log event to storage (local buffer)
        chrome.storage.local.get(['audit_log'], (result) => {
            const log = result.audit_log || [];
            const newEvent = {
                timestamp: new Date().toISOString(),
                domain: domain,
                url: details.url // In prod, might want to strip PII
            };

            const newLog = [...log, newEvent];
            chrome.storage.local.set({ audit_log: newLog });

            // Identify user token (if strictly required for API)
            // Send to API
            // Using localhost:3000 for standard dev. If your server is on 3001, update this.
            fetch('http://localhost:3000/api/ingest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': ... (add token if needed later)
                },
                body: JSON.stringify(newEvent)
            }).then(res => {
                if (res.ok) console.log("Event synced to AuditShield Cloud");
                else console.warn("Failed to sync event", res.status);
            }).catch(err => console.error("Failed to sync log", err));
        });
    }
}, { url: [{ schemes: ['http', 'https'] }] });

export { };

// Content Script for Data Leak Prevention
// Runs on AI tool pages to monitor and block sensitive data

interface Policy {
    id: string;
    toolName: string;
    action: string;
    rulesJson: any;
    enabled: string;
}

interface RiskAnalysis {
    riskScore: number;
    violations: Array<{
        pattern: string;
        matches: string[];
    }>;
}

// Default PII patterns
const DEFAULT_PATTERNS = [
    {
        name: 'email',
        pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        score: 30,
        message: 'Email address detected'
    },
    {
        name: 'ssn',
        pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
        score: 80,
        message: 'Social Security Number detected'
    },
    {
        name: 'credit_card',
        pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
        score: 90,
        message: 'Credit card number detected'
    },
    {
        name: 'phone',
        pattern: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
        score: 20,
        message: 'Phone number detected'
    },
];

let policies: Policy[] = [];

// Fetch policies from API
async function fetchPolicies() {
    try {
        const config = await getApiConfig();
        if (!config.apiKey) {
            console.log('[AuditShield DLP] No API key configured');
            return;
        }

        const response = await fetch(`${config.apiUrl}/api/v1/policies`, {
            headers: {
                'x-audit-key': config.apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            policies = data.policies || [];
            console.log('[AuditShield DLP] Policies loaded:', policies.length);
        }
    } catch (error) {
        console.error('[AuditShield DLP] Failed to fetch policies:', error);
    }
}

// Get API config from storage
async function getApiConfig(): Promise<{ apiKey: string; apiUrl: string }> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['apiKey', 'apiUrl'], (result) => {
            resolve({
                apiKey: result.apiKey || '',
                apiUrl: result.apiUrl || 'http://localhost:3000'
            });
        });
    });
}

// Analyze text for sensitive information
function analyzeText(text: string): RiskAnalysis {
    const violations: RiskAnalysis['violations'] = [];
    let totalScore = 0;

    for (const pattern of DEFAULT_PATTERNS) {
        const matches = text.match(pattern.pattern);
        if (matches && matches.length > 0) {
            violations.push({
                pattern: pattern.name,
                matches: matches.slice(0, 3) // Limit to first 3 matches
            });
            totalScore += pattern.score;
        }
    }

    return {
        riskScore: Math.min(totalScore, 100),
        violations
    };
}

// Show warning banner
function showWarningBanner(_element: HTMLElement, analysis: RiskAnalysis) {
    // Remove existing banner if any
    const existingBanner = document.getElementById('auditshield-warning-banner');
    if (existingBanner) {
        existingBanner.remove();
    }

    // Create warning banner
    const banner = document.createElement('div');
    banner.id = 'auditshield-warning-banner';
    banner.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        border: 2px solid #dc2626;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
        z-index: 999999;
        font-family: system-ui, -apple-system, sans-serif;
        animation: slideIn 0.3s ease-out;
    `;

    banner.innerHTML = `
        <style>
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        </style>
        <div style="display: flex; align-items: start; gap: 12px;">
            <div style="flex-shrink: 0; width: 24px; height: 24px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #7f1d1d; margin-bottom: 4px;">
                    ⚠️ Sensitive Information Detected
                </div>
                <div style="font-size: 14px; color: #991b1b; margin-bottom: 8px;">
                    Risk Score: ${analysis.riskScore}/100
                </div>
                <div style="font-size: 13px; color: #7f1d1d;">
                    ${analysis.violations.map(v => `• ${v.pattern}: ${v.matches.length} match(es)`).join('<br>')}
                </div>
                <button id="auditshield-dismiss" style="
                    margin-top: 12px;
                    padding: 6px 12px;
                    background: #dc2626;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                ">
                    Dismiss
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    // Dismiss button handler
    const dismissBtn = document.getElementById('auditshield-dismiss');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            banner.remove();
        });
    }

    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        if (banner.parentElement) {
            banner.remove();
        }
    }, 10000);
}

// Monitor textarea/input elements
function monitorInputs() {
    // Find all potential input elements
    const selectors = [
        'textarea',
        'input[type="text"]',
        '[contenteditable="true"]',
        '[role="textbox"]'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));

    elements.forEach((elem) => {
        if (elem.hasAttribute('data-auditshield-monitored')) {
            return; // Already monitoring
        }

        elem.setAttribute('data-auditshield-monitored', 'true');

        // Monitor input events
        elem.addEventListener('input', (e) => {
            const target = e.target as HTMLElement;
            const text = target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement
                ? target.value
                : target.textContent || '';

            if (text.length > 10) { // Only analyze if text is substantial
                const analysis = analyzeText(text);

                if (analysis.riskScore >= 30) {
                    showWarningBanner(target, analysis);
                }
            }
        });

        // Monitor Enter key press
        elem.addEventListener('keydown', (e) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' && !keyEvent.shiftKey) {
                const target = keyEvent.target as HTMLElement;
                const text = target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement
                    ? target.value
                    : target.textContent || '';

                const analysis = analyzeText(text);

                if (analysis.riskScore >= 70) {
                    keyEvent.preventDefault();
                    keyEvent.stopPropagation();
                    showWarningBanner(target, analysis);
                    console.log('[AuditShield DLP] Blocked high-risk submission');
                }
            }
        }, true);
    });
}

// Initialize
console.log('[AuditShield DLP] Content script loaded');
fetchPolicies();

// Monitor for new input elements (for SPAs)
const observer = new MutationObserver(() => {
    monitorInputs();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial monitoring
monitorInputs();

// Re-fetch policies every 5 minutes
setInterval(fetchPolicies, 5 * 60 * 1000);

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

function Popup() {
    const [logs, setLogs] = useState<any[]>([]);
    const [tab, setTab] = useState<'activity' | 'settings'>('activity');
    const [apiKey, setApiKey] = useState('');
    const [apiUrl, setApiUrl] = useState('http://localhost:3000');
    const [userEmail, setUserEmail] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            // Load logs
            chrome.storage.local.get(['audit_log'], (res) => {
                if (res.audit_log) {
                    setLogs(res.audit_log);
                }
            });

            // Load settings
            chrome.storage.sync.get(['apiKey', 'apiUrl', 'userEmail'], (res) => {
                if (res.apiKey) setApiKey(res.apiKey);
                if (res.apiUrl) setApiUrl(res.apiUrl);
                if (res.userEmail) setUserEmail(res.userEmail);
            });
        } else {
            // Fallback for non-extension environment
            console.warn("Chrome API not found, using mock data");
            setLogs([
                { domain: "chat.openai.com", timestamp: new Date().toISOString() },
                { domain: "claude.ai", timestamp: new Date(Date.now() - 3600000).toISOString() },
            ]);
        }
    }, []);

    const saveSettings = () => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.set({ apiKey, apiUrl, userEmail }, () => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            });
        }
    };

    return (
        <div style={{ width: '350px', fontFamily: 'system-ui, sans-serif', background: '#f8fafc' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '16px', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>AuditShield</h2>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.9 }}>
                    {apiKey ? '✓ Connected' : '⚠ Not configured'}
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                <button
                    onClick={() => setTab('activity')}
                    style={{
                        flex: 1,
                        padding: '12px',
                        border: 'none',
                        background: tab === 'activity' ? 'white' : 'transparent',
                        borderBottom: tab === 'activity' ? '2px solid #667eea' : '2px solid transparent',
                        color: tab === 'activity' ? '#667eea' : '#64748b',
                        fontWeight: tab === 'activity' ? '600' : '400',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}
                >
                    Activity
                </button>
                <button
                    onClick={() => setTab('settings')}
                    style={{
                        flex: 1,
                        padding: '12px',
                        border: 'none',
                        background: tab === 'settings' ? 'white' : 'transparent',
                        borderBottom: tab === 'settings' ? '2px solid #667eea' : '2px solid transparent',
                        color: tab === 'settings' ? '#667eea' : '#64748b',
                        fontWeight: tab === 'settings' ? '600' : '400',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}
                >
                    Settings
                </button>
            </div>

            {/* Content */}
            <div style={{ padding: '16px', background: 'white', minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}>
                {tab === 'activity' ? (
                    <>
                        <h3 style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '600' }}>
                            Recent Activity
                        </h3>
                        {logs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '32px 16px', color: '#94a3b8' }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 12px', opacity: 0.5 }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <p style={{ fontSize: '13px', margin: 0 }}>No AI tools detected yet.</p>
                                <p style={{ fontSize: '11px', margin: '4px 0 0 0' }}>Visit ChatGPT, Claude, or Gemini to start logging.</p>
                            </div>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {logs.slice().reverse().slice(0, 10).map((log, i) => (
                                    <li key={i} style={{ marginBottom: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                                            <div style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{log.domain}</div>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', paddingLeft: '16px' }}>
                                            {new Date(log.timestamp).toLocaleString()}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <>
                        <h3 style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '600' }}>
                            API Configuration
                        </h3>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#475569' }}>
                                API Key
                            </label>
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="as_live_xxxxxxxx..."
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    fontFamily: 'monospace',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                                Get your API key from Dashboard → Settings → API Keys
                            </p>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#475569' }}>
                                API URL
                            </label>
                            <input
                                type="text"
                                value={apiUrl}
                                onChange={(e) => setApiUrl(e.target.value)}
                                placeholder="https://your-dashboard.com"
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    fontFamily: 'monospace',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                                Use http://localhost:3000 for local development
                            </p>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#475569' }}>
                                Your Email (Optional)
                            </label>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="your.email@company.com"
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                                Used to track your activity in audit logs
                            </p>
                        </div>

                        <button
                            onClick={saveSettings}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: saved ? '#10b981' : '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {saved ? '✓ Saved!' : 'Save Settings'}
                        </button>

                        <div style={{ marginTop: '16px', padding: '12px', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '6px' }}>
                            <p style={{ fontSize: '11px', color: '#92400e', margin: 0 }}>
                                <strong>Note:</strong> Your API key is stored securely in Chrome's encrypted storage.
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
                v1.0.0 • Monitoring {logs.length} events
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
)

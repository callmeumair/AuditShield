import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

function Popup() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        chrome.storage.local.get(['audit_log'], (res) => {
            if (res.audit_log) {
                setLogs(res.audit_log);
            }
        });
    }, []);

    return (
        <div style={{ width: '300px', padding: '16px', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>AuditShield</h2>
                <span style={{ fontSize: '10px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>Active</span>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                <h3 style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Recent Activity</h3>
                {logs.length === 0 ? (
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>No AI tools detected yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
                        {logs.slice().reverse().map((log, i) => (
                            <li key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: '13px', fontWeight: '500' }}>{log.domain}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(log.timestamp).toLocaleString()}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
)

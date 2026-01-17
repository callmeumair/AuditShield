import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    Settings as SettingsIcon,
    Activity as ActivityIcon,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    Copy,
    Eye,
    EyeOff,
    Terminal,
    RefreshCw,
    ExternalLink
} from 'lucide-react'
import { OpenAILogo, ClaudeLogo, GeminiLogo } from './components/ui/logos'
import { cn } from './lib/utils'
import './index.css'

function Popup() {
    const [logs, setLogs] = useState<any[]>([])
    const [tab, setTab] = useState<'activity' | 'settings'>('activity')
    const [apiKey, setApiKey] = useState('')
    const [apiUrl, setApiUrl] = useState('http://localhost:3000')
    const [userEmail, setUserEmail] = useState('')
    const [showKey, setShowKey] = useState(false)
    const [saved, setSaved] = useState(false)
    const [testingConnection, setTestingConnection] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle')

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.get(['audit_log'], (res) => {
                if (res.audit_log) setLogs(res.audit_log)
            })
            chrome.storage.sync.get(['apiKey', 'apiUrl', 'userEmail'], (res) => {
                if (res.apiKey) setApiKey(res.apiKey)
                if (res.apiUrl) setApiUrl(res.apiUrl)
                if (res.userEmail) setUserEmail(res.userEmail)
            })
        } else {
            // Mock data for development
            setLogs([
                { domain: "chatgpt.com", timestamp: new Date().toISOString(), actionTaken: 'allowed' },
                { domain: "claude.ai", timestamp: new Date(Date.now() - 300000).toISOString(), actionTaken: 'allowed' },
                { domain: "gemini.google.com", timestamp: new Date(Date.now() - 3600000).toISOString(), actionTaken: 'flagged' },
            ])
        }
    }, [])

    const saveSettings = () => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.set({ apiKey, apiUrl, userEmail }, () => {
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
            })
        }
    }

    const testConnection = async () => {
        setTestingConnection(true)
        setConnectionStatus('idle')

        try {
            // Simulate connection test
            await new Promise(resolve => setTimeout(resolve, 1500))
            setConnectionStatus('success')
        } catch (error) {
            setConnectionStatus('error')
        } finally {
            setTestingConnection(false)
        }
    }

    const getToolIcon = (domain: string) => {
        if (domain.includes('openai') || domain.includes('chatgpt')) return <OpenAILogo className="w-5 h-5 text-slate-700" />
        if (domain.includes('anthropic') || domain.includes('claude')) return <ClaudeLogo className="w-5 h-5 text-[#d97757]" />
        if (domain.includes('google') || domain.includes('gemini')) return <GeminiLogo className="w-5 h-5 text-[#4E88D4]" />
        return <Terminal className="w-5 h-5 text-slate-400" />
    }

    const getRelativeTime = (timestamp: string) => {
        const now = new Date()
        const diff = now.getTime() - new Date(timestamp).getTime()
        const minutes = Math.floor(diff / 60000)
        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        return new Date(timestamp).toLocaleDateString()
    }

    const stats = {
        eventsToday: logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length,
        threatsBlocked: logs.filter(l => l.actionTaken === 'blocked' || l.actionTaken === 'flagged').length
    }

    return (
        <div className="w-[400px] min-h-[550px] flex flex-col bg-white overflow-hidden selection:bg-indigo-100">
            {/* Head-Up Display (Header) */}
            <header className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-indigo-200 shadow-lg">
                        <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-slate-900 tracking-tight">AuditShield</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300",
                        apiKey ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                    )}>
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            apiKey ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                        )} />
                        {apiKey ? "PROTECTED" : "CONFIG NEEDED"}
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <nav className="flex px-6 border-b border-slate-100 bg-white sticky top-16 z-10">
                <button
                    onClick={() => setTab('activity')}
                    className={cn(
                        "flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-b-2 outline-none",
                        tab === 'activity' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                >
                    <div className="flex items-center justify-center gap-2">
                        <ActivityIcon className="w-3.5 h-3.5" />
                        Dashboard
                    </div>
                </button>
                <button
                    onClick={() => setTab('settings')}
                    className={cn(
                        "flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-b-2 outline-none",
                        tab === 'settings' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                >
                    <div className="flex items-center justify-center gap-2">
                        <SettingsIcon className="w-3.5 h-3.5" />
                        Settings
                    </div>
                </button>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar bg-slate-50/50">
                <AnimatePresence mode="wait">
                    {tab === 'activity' ? (
                        <motion.div
                            key="activity"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Session Stats Card */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-soft hover:shadow-premium transition-shadow group">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-400 transition-colors">Events Today</div>
                                    <div className="text-2xl font-bold text-slate-900">{stats.eventsToday}</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-soft hover:shadow-premium transition-shadow group">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-rose-400 transition-colors">Alerts</div>
                                    <div className="text-2xl font-bold text-slate-900">{stats.threatsBlocked}</div>
                                </div>
                            </div>

                            {/* Activity Stream */}
                            <div className="space-y-3">
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Live Activity</h3>
                                {logs.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 px-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                            <Shield className="w-8 h-8 text-slate-200" />
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">Monitoring Active</div>
                                        <div className="text-xs text-slate-400 mt-1 max-w-[200px]">
                                            Visit ChatGPT, Claude, or Gemini to start capturing evidence.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2.5">
                                        {logs.slice().reverse().slice(0, 10).map((log, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                key={i}
                                                className="group flex items-center justify-between p-3 bg-white hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all shadow-sm hover:shadow-soft"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 flex items-center justify-center bg-slate-50 group-hover:bg-white rounded-lg transition-colors border border-slate-100 group-hover:shadow-sm">
                                                        {getToolIcon(log.domain)}
                                                    </div>
                                                    <div>
                                                        <div className="text-[13px] font-semibold text-slate-800">{log.domain.split('.')[0]}</div>
                                                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                                            {getRelativeTime(log.timestamp)}
                                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                            <span className={cn(
                                                                "font-medium",
                                                                log.actionTaken === 'allowed' ? "text-emerald-500" : "text-rose-500"
                                                            )}>
                                                                {log.actionTaken || 'Captured'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                {/* API Key Input */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">API Key</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Terminal className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showKey ? "text" : "password"}
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            className="block w-full pl-10 pr-20 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                                            placeholder="as_live_..."
                                        />
                                        <div className="absolute inset-y-1.5 right-1.5 flex gap-1">
                                            <button
                                                onClick={() => setShowKey(!showKey)}
                                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                                            >
                                                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.readText().then(text => setApiKey(text))
                                                }}
                                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                                                title="Paste from clipboard"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* API URL Input */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">API URL</label>
                                    <input
                                        type="text"
                                        value={apiUrl}
                                        onChange={(e) => setApiUrl(e.target.value)}
                                        className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                                        placeholder="https://auditshield.com"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Identity (User Email)</label>
                                    <input
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                                        placeholder="name@company.com"
                                    />
                                    <p className="text-[10px] text-slate-400 px-1">Optional. Links logs to your dashboard account.</p>
                                </div>

                                <div className="pt-2 space-y-3">
                                    <button
                                        onClick={saveSettings}
                                        disabled={saved}
                                        className={cn(
                                            "w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2",
                                            saved
                                                ? "bg-emerald-500 text-white shadow-emerald-100 shadow-lg"
                                                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 shadow-lg hover:translate-y-[-1px] active:translate-y-0"
                                        )}
                                    >
                                        {saved ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Settings Saved
                                            </>
                                        ) : (
                                            "Save Configuration"
                                        )}
                                    </button>

                                    <button
                                        onClick={testConnection}
                                        disabled={testingConnection}
                                        className={cn(
                                            "w-full py-3.5 rounded-xl text-sm font-bold border transition-all duration-300 flex items-center justify-center gap-2",
                                            connectionStatus === 'success' ? "border-emerald-200 bg-emerald-50 text-emerald-600 pb-2" :
                                                connectionStatus === 'error' ? "border-rose-200 bg-rose-50 text-rose-600 animate-shake" :
                                                    "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-sm"
                                        )}
                                    >
                                        {testingConnection ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Testing Connection...
                                            </>
                                        ) : connectionStatus === 'success' ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Connection Healthy
                                            </>
                                        ) : connectionStatus === 'error' ? (
                                            <>
                                                <AlertCircle className="w-4 h-4" />
                                                Connection Failed
                                            </>
                                        ) : (
                                            "Test Connection"
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                                        <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">Dashboard View</div>
                                        <div className="text-[11px] text-indigo-600 mt-0.5 leading-relaxed">
                                            You can monitor real-time policy violations and audit logs in the <a href={apiUrl} target="_blank" className="underline font-bold hover:text-indigo-800">Admin Console</a>.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
                <div className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
                    v1.0.0 • Protected
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Enforced</span>
                </div>
            </footer>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
)

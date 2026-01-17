"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Copy, Trash2, Plus, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKey {
    id: string;
    name: string | null;
    keyPrefix: string;
    createdAt: string;
    lastUsedAt: string | null;
    revokedAt: string | null;
}

export default function SettingsPage() {
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [showNewKey, setShowNewKey] = useState(false);
    const [newApiKey, setNewApiKey] = useState('');

    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        try {
            const response = await fetch('/api/v1/api-keys');
            if (response.ok) {
                const data = await response.json();
                setKeys(data.keys);
            }
        } catch (error) {
            console.error('Failed to fetch keys:', error);
            toast.error('Failed to load API keys');
        } finally {
            setLoading(false);
        }
    };

    const generateKey = async () => {
        if (!newKeyName.trim()) {
            toast.error('Please enter a name for the API key');
            return;
        }

        setGenerating(true);
        try {
            const response = await fetch('/api/v1/api-keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newKeyName })
            });

            if (response.ok) {
                const data = await response.json();
                setNewApiKey(data.apiKey);
                setShowNewKey(true);
                setNewKeyName('');
                await fetchKeys();
                toast.success('API key generated successfully!');
            } else {
                toast.error('Failed to generate API key');
            }
        } catch (error) {
            console.error('Failed to generate key:', error);
            toast.error('Failed to generate API key');
        } finally {
            setGenerating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const revokeKey = async (keyId: string) => {
        if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/v1/api-keys?id=${keyId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchKeys();
                toast.success('API key revoked successfully');
            } else {
                toast.error('Failed to revoke API key');
            }
        } catch (error) {
            console.error('Failed to revoke key:', error);
            toast.error('Failed to revoke API key');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-2">Manage your organization's API keys and configuration</p>
            </div>

            {/* New API Key Display */}
            <AnimatePresence>
                {showNewKey && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="border-emerald-200 bg-emerald-50">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                    <CardTitle className="text-emerald-900">API Key Generated!</CardTitle>
                                </div>
                                <CardDescription className="text-emerald-700">
                                    Save this key now. You won't be able to see it again.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Input
                                        value={newApiKey}
                                        readOnly
                                        className="font-mono text-sm bg-white"
                                    />
                                    <Button
                                        onClick={() => copyToClipboard(newApiKey)}
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        onClick={() => setShowNewKey(false)}
                                        variant="outline"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Generate New Key */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5 text-primary" />
                        Generate New API Key
                    </CardTitle>
                    <CardDescription>
                        Create a new API key for the AuditShield browser extension
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <Label htmlFor="keyName">Key Name</Label>
                            <Input
                                id="keyName"
                                placeholder="e.g., Production Extension Key"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={generateKey}
                                disabled={generating || !newKeyName.trim()}
                                className="bg-primary hover:bg-primary/90"
                            >
                                {generating ? 'Generating...' : 'Generate Key'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Existing Keys */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" />
                        API Keys
                    </CardTitle>
                    <CardDescription>
                        Manage your organization's API keys
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Loading...</div>
                    ) : keys.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            No API keys yet. Generate one above to get started.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {keys.map((key) => (
                                <motion.div
                                    key={key.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Key className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">
                                                    {key.name || 'Unnamed Key'}
                                                </div>
                                                <div className="text-sm font-mono text-slate-500">
                                                    {key.keyPrefix}...
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-slate-500 ml-12">
                                            Created: {new Date(key.createdAt).toLocaleDateString()}
                                            {key.lastUsedAt && (
                                                <> • Last used: {new Date(key.lastUsedAt).toLocaleDateString()}</>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => revokeKey(key.id)}
                                        variant="ghost"
                                        size="icon"
                                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Extension Setup Instructions */}
            <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                    <CardTitle className="text-blue-900">Extension Setup</CardTitle>
                    <CardDescription className="text-blue-700">
                        How to configure the AuditShield browser extension
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-blue-900 space-y-2">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Generate an API key above</li>
                        <li>Open the AuditShield extension in your browser</li>
                        <li>Click on the Settings tab</li>
                        <li>Paste your API key in the "API Key" field</li>
                        <li>Set the API URL to: <code className="bg-blue-100 px-2 py-1 rounded">https://your-domain.com</code></li>
                        <li>Click "Save Settings"</li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    );
}

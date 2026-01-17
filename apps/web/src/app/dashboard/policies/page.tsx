"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Policy {
    id: string;
    toolName: string;
    action: string;
    rulesJson: any;
    reason: string | null;
    enabled: string;
    createdAt: string;
}

const AI_TOOLS = ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity', 'Other'];
const ACTIONS = [
    { value: 'allow', label: 'Allow', color: 'text-emerald-600' },
    { value: 'block', label: 'Block', color: 'text-rose-600' },
    { value: 'review', label: 'Review', color: 'text-amber-600' },
];

export default function PoliciesPage() {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showNewForm, setShowNewForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        toolName: '',
        action: 'allow',
        reason: '',
        enabled: 'true'
    });

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const response = await fetch('/api/v1/policies');
            if (response.ok) {
                const data = await response.json();
                setPolicies(data.policies);
            }
        } catch (error) {
            console.error('Failed to fetch policies:', error);
            toast.error('Failed to load policies');
        } finally {
            setLoading(false);
        }
    };

    const createPolicy = async () => {
        if (!formData.toolName || !formData.action) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            const response = await fetch('/api/v1/policies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                await fetchPolicies();
                setShowNewForm(false);
                setFormData({ toolName: '', action: 'allow', reason: '', enabled: 'true' });
                toast.success('Policy created successfully!');
            } else {
                toast.error('Failed to create policy');
            }
        } catch (error) {
            console.error('Failed to create policy:', error);
            toast.error('Failed to create policy');
        }
    };

    const updatePolicy = async (id: string, updates: Partial<Policy>) => {
        try {
            const response = await fetch('/api/v1/policies', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updates })
            });

            if (response.ok) {
                await fetchPolicies();
                setEditingId(null);
                toast.success('Policy updated successfully!');
            } else {
                toast.error('Failed to update policy');
            }
        } catch (error) {
            console.error('Failed to update policy:', error);
            toast.error('Failed to update policy');
        }
    };

    const deletePolicy = async (id: string) => {
        if (!confirm('Are you sure you want to delete this policy?')) {
            return;
        }

        try {
            const response = await fetch(`/api/v1/policies?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchPolicies();
                toast.success('Policy deleted successfully');
            } else {
                toast.error('Failed to delete policy');
            }
        } catch (error) {
            console.error('Failed to delete policy:', error);
            toast.error('Failed to delete policy');
        }
    };

    const getActionColor = (action: string) => {
        const actionObj = ACTIONS.find(a => a.value === action);
        return actionObj?.color || 'text-slate-600';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Policies</h1>
                    <p className="text-slate-500 mt-2">Manage AI tool access and data leak prevention rules</p>
                </div>
                <Button
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Policy
                </Button>
            </div>

            {/* New Policy Form */}
            <AnimatePresence>
                {showNewForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="border-primary/30">
                            <CardHeader>
                                <CardTitle>Create New Policy</CardTitle>
                                <CardDescription>
                                    Define rules for AI tool usage and data protection
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="toolName">AI Tool</Label>
                                        <Select
                                            value={formData.toolName}
                                            onValueChange={(value) => setFormData({ ...formData, toolName: value })}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select tool" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AI_TOOLS.map(tool => (
                                                    <SelectItem key={tool} value={tool}>{tool}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="action">Action</Label>
                                        <Select
                                            value={formData.action}
                                            onValueChange={(value) => setFormData({ ...formData, action: value })}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ACTIONS.map(action => (
                                                    <SelectItem key={action.value} value={action.value}>
                                                        <span className={action.color}>{action.label}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="reason">Reason (Optional)</Label>
                                    <Textarea
                                        id="reason"
                                        placeholder="Why is this policy needed?"
                                        value={formData.reason}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                        className="mt-1"
                                        rows={2}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={createPolicy} className="bg-primary hover:bg-primary/90">
                                        <Save className="h-4 w-4 mr-2" />
                                        Create Policy
                                    </Button>
                                    <Button onClick={() => setShowNewForm(false)} variant="outline">
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Existing Policies */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Active Policies
                    </CardTitle>
                    <CardDescription>
                        {policies.length} {policies.length === 1 ? 'policy' : 'policies'} configured
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Loading...</div>
                    ) : policies.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            No policies configured yet. Create one to get started.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {policies.map((policy) => (
                                <motion.div
                                    key={policy.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Shield className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">
                                                    {policy.toolName}
                                                </div>
                                                <div className="text-sm text-slate-500 mt-1">
                                                    Action: <span className={`font-medium ${getActionColor(policy.action)}`}>
                                                        {policy.action.toUpperCase()}
                                                    </span>
                                                    {policy.reason && (
                                                        <> • {policy.reason}</>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400 ml-12 mt-1">
                                            Created: {new Date(policy.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${policy.enabled === 'true' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {policy.enabled === 'true' ? 'Enabled' : 'Disabled'}
                                        </div>
                                        <Button
                                            onClick={() => deletePolicy(policy.id)}
                                            variant="ghost"
                                            size="icon"
                                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                    <CardTitle className="text-blue-900">Policy Actions Explained</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-900 space-y-2">
                    <div><strong className="text-emerald-600">Allow:</strong> Tool usage is permitted and logged for audit purposes</div>
                    <div><strong className="text-rose-600">Block:</strong> Tool access is completely blocked and attempts are logged</div>
                    <div><strong className="text-amber-600">Review:</strong> Usage is allowed but flagged for manual review</div>
                </CardContent>
            </Card>
        </div>
    );
}

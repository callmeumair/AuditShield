"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShieldAlert, Eye, Search, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

interface AuditLog {
    id: string;
    userEmail: string | null;
    tool: string;
    domain: string;
    actionTaken: string;
    riskScore: number | null;
    violationReasons: any;
    createdAt: string;
}

interface LiveStats {
    totalEvents: number;
    violations: number;
    blocked: number;
    avgRiskScore: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function LiveFeedClient() {
    const { data, error } = useSWR('/api/stats/live', fetcher, {
        refreshInterval: 2000, // Poll every 2 seconds
        revalidateOnFocus: true,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [previousLogIds, setPreviousLogIds] = useState<Set<string>>(new Set());
    const [flashingIds, setFlashingIds] = useState<Set<string>>(new Set());

    const logs: AuditLog[] = data?.recentLogs || [];
    const stats: LiveStats = data?.stats || {
        totalEvents: 0,
        violations: 0,
        blocked: 0,
        avgRiskScore: 0
    };

    // Detect new logs and trigger flash animation
    useEffect(() => {
        if (logs.length > 0) {
            const currentLogIds = new Set(logs.map(log => log.id));
            const newLogIds = new Set<string>();

            currentLogIds.forEach(id => {
                if (!previousLogIds.has(id)) {
                    newLogIds.add(id);
                }
            });

            if (newLogIds.size > 0) {
                setFlashingIds(newLogIds);
                setTimeout(() => setFlashingIds(new Set()), 2000);
            }

            setPreviousLogIds(currentLogIds);
        }
    }, [logs]);

    // Filter logs based on search
    const filteredLogs = logs.filter(log =>
        log.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRiskBadge = (score: number | null) => {
        if (score === null || score === 0) return { color: 'bg-slate-100 text-slate-700', label: 'Low' };
        if (score < 30) return { color: 'bg-emerald-100 text-emerald-700', label: 'Low' };
        if (score < 70) return { color: 'bg-amber-100 text-amber-700', label: 'Medium' };
        return { color: 'bg-rose-100 text-rose-700', label: 'High' };
    };

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'blocked':
                return <XCircle className="h-4 w-4 text-rose-500" />;
            case 'flagged':
                return <AlertTriangle className="h-4 w-4 text-amber-500" />;
            default:
                return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
        }
    };

    if (error) {
        return (
            <div className="text-center py-8 text-rose-500">
                Failed to load live feed. Please refresh the page.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Live Feed</h1>
                <p className="text-slate-500 mt-2">Real-time monitoring of AI tool usage and policy violations</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    {
                        title: 'Total Events',
                        value: stats.totalEvents,
                        icon: Eye,
                        color: 'text-blue-500'
                    },
                    {
                        title: 'Violations',
                        value: stats.violations,
                        icon: AlertTriangle,
                        color: 'text-amber-500'
                    },
                    {
                        title: 'Blocked',
                        value: stats.blocked,
                        icon: ShieldAlert,
                        color: 'text-rose-500'
                    },
                    {
                        title: 'Avg Risk Score',
                        value: stats.avgRiskScore,
                        icon: ShieldAlert,
                        color: 'text-purple-500'
                    },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Search and Filter */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-primary" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription>
                                Live updates every 2 seconds • Showing last 50 events
                            </CardDescription>
                        </div>
                        <div className="w-64">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredLogs.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            {searchTerm ? 'No matching logs found' : 'No activity recorded yet'}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <AnimatePresence>
                                {filteredLogs.map((log) => {
                                    const isFlashing = flashingIds.has(log.id);
                                    const isViolation = log.actionTaken === 'blocked' || log.actionTaken === 'flagged';
                                    const riskBadge = getRiskBadge(log.riskScore);

                                    return (
                                        <motion.div
                                            key={log.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                backgroundColor: isFlashing && isViolation
                                                    ? 'rgb(254 242 242)' // bg-red-50
                                                    : 'rgb(255 255 255)'
                                            }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-all"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className={`p-2 rounded-full ${log.actionTaken === 'blocked' ? 'bg-rose-100' :
                                                        log.actionTaken === 'flagged' ? 'bg-amber-100' :
                                                            'bg-emerald-100'
                                                    }`}>
                                                    {getActionIcon(log.actionTaken)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-slate-900">{log.tool}</span>
                                                        <span className="text-slate-400">•</span>
                                                        <span className="text-sm text-slate-600 truncate">{log.domain}</span>
                                                    </div>
                                                    <div className="text-sm text-slate-500 mt-1">
                                                        {log.userEmail || 'Anonymous'} • {format(new Date(log.createdAt), 'MMM dd, HH:mm:ss')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${riskBadge.color}`}>
                                                    Risk: {log.riskScore || 0}
                                                </div>
                                                <Badge
                                                    variant={log.actionTaken === 'blocked' ? 'destructive' : 'outline'}
                                                    className={
                                                        log.actionTaken === 'flagged' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                                                            log.actionTaken === 'allowed' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                                                                ''
                                                    }
                                                >
                                                    {log.actionTaken}
                                                </Badge>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

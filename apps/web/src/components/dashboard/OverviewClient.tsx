"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, AlertTriangle, Activity, ArrowUpRight, Lock, Globe, Terminal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

// Mock Data for Chart
// const data = [ ... ]; // Logic replaced by fetch

interface DashboardStats {
    interactions: number;
    policies: number;
    violations: number;
    egress: string;
}

interface ChartPoint {
    time: string;
    requests: number;
}

interface ActivityEvent {
    id: string;
    domain: string;
    user: string;
    time: string;
    status: 'allowed' | 'flagged';
    hash: string;
}

export function OverviewClient() {
    const [stats, setStats] = useState<DashboardStats>({
        interactions: 0,
        policies: 0,
        violations: 0,
        egress: "0GB"
    });
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [activity, setActivity] = useState<ActivityEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, chartRes, activityRes] = await Promise.all([
                    fetch('/api/dashboard/stats'),
                    fetch('/api/dashboard/chart'),
                    fetch('/api/dashboard/activity')
                ]);

                if (statsRes.ok) setStats(await statsRes.json());
                if (chartRes.ok) setChartData(await chartRes.json());
                if (activityRes.ok) setActivity(await activityRes.json());
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total AI Interactions", value: stats.interactions, change: "Live", icon: Activity, color: "text-primary" },
                    { title: "Active Policies", value: stats.policies, change: "Enforcing", icon: ShieldCheck, color: "text-emerald-500" },
                    { title: "Risk Violations", value: stats.violations, change: "Requires Attention", icon: AlertTriangle, color: "text-amber-500" },
                    { title: "Data Egress Blocked", value: stats.egress, change: "Protected", icon: Lock, color: "text-rose-500" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow border-border/60">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                                    <span className="text-muted-foreground mr-1">{stat.change}</span>
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                {/* Chart Area */}
                <motion.div
                    className="md:col-span-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="h-full border-border/60">
                        <CardHeader>
                            <CardTitle>AI Request Volume</CardTitle>
                            <CardDescription>Real-time traffic analysis (Last 24 Hours).</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number | string) => `${value}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                        <Area type="monotone" dataKey="requests" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Recent Activity / Terminal View */}
                <motion.div
                    className="md:col-span-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="h-full flex flex-col border-border/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-primary" />
                                Live Audit Log
                            </CardTitle>
                            <CardDescription>Most recent authorized and flagged events.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                            <div className="space-y-4">
                                {activity.length === 0 ? (
                                    <div className="text-center text-sm text-muted-foreground py-8">No activity recorded yet.</div>
                                ) : (
                                    activity.map((event, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm p-3 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${event.status === 'allowed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                    <Globe className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{event.domain}</div>
                                                    <div className="text-xs text-muted-foreground">{event.user}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono text-xs text-muted-foreground mb-1">{event.time}</div>
                                                <Badge variant={event.status === 'allowed' ? 'outline' : 'destructive'} className="text-[10px] h-5">
                                                    {event.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

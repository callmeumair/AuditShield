"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, AlertTriangle, Activity, ArrowUpRight, Lock, Globe, Terminal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

// Mock Data for Chart
const data = [
    { time: '09:00', requests: 45, violations: 2 },
    { time: '10:00', requests: 120, violations: 5 },
    { time: '11:00', requests: 340, violations: 12 },
    { time: '12:00', requests: 280, violations: 4 },
    { time: '13:00', requests: 590, violations: 8 },
    { time: '14:00', requests: 450, violations: 6 },
    { time: '15:00', requests: 380, violations: 3 },
];

const recentEvents = [
    { id: "evt_1", time: "14:32:01", domain: "chat.openai.com", user: "alice@auditshield.ai", status: "allowed", hash: "e3b0c442...855" },
    { id: "evt_2", time: "14:31:55", domain: "claude.ai", user: "bob@auditshield.ai", status: "allowed", hash: "8d969eef...b21" },
    { id: "evt_3", time: "14:30:12", domain: "unknown-ai.com", user: "dave@auditshield.ai", status: "flagged", hash: "1253e93a...c99" },
    { id: "evt_4", time: "14:28:44", domain: "gemini.google.com", user: "eve@auditshield.ai", status: "allowed", hash: "a8f5f167...901" },
    { id: "evt_5", time: "14:25:30", domain: "midjourney.com", user: "frank@auditshield.ai", status: "flagged", hash: "c4ca4238...a21" },
];

export function OverviewClient() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total AI Interactions", value: "2,543", change: "+12.5%", icon: Activity, color: "text-primary" },
                    { title: "Active Policies", value: "14", change: "Enforcing", icon: ShieldCheck, color: "text-emerald-500" },
                    { title: "Risk Violations", value: "23", change: "-2.4%", icon: AlertTriangle, color: "text-amber-500" },
                    { title: "Data Egress Blocked", value: "1.2GB", change: "+4%", icon: Lock, color: "text-rose-500" },
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
                                    {stat.change.includes('+') || stat.change.includes('Enforcing') ?
                                        <span className="text-emerald-500 flex items-center mr-1"><ArrowUpRight className="h-3 w-3 mr-0.5" /> {stat.change}</span>
                                        : <span className="text-muted-foreground mr-1">{stat.change}</span>}
                                    {stat.change.includes('%') && "from last week"}
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
                            <CardDescription>Real-time traffic analysis across all endpoints.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                {recentEvents.map((event, i) => (
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
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

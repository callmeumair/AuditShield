"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Globe, Search, RefreshCw, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuditEvent {
    id: string;
    domain: string;
    user: string;
    time: string;
    status: "allowed" | "flagged";
    hash: string;
    tool?: string;
}

export default function LiveFeedPage() {
    const [events, setEvents] = useState<AuditEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<AuditEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Filters
    const [severityFilter, setSeverityFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [toolFilter, setToolFilter] = useState("all");

    const fetchEvents = async (showRefreshing = false) => {
        if (showRefreshing) setRefreshing(true);
        try {
            const res = await fetch("/api/dashboard/activity");
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
                setFilteredEvents(data);
            }
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchEvents();
        // Auto-refresh every 10 seconds
        const interval = setInterval(() => fetchEvents(false), 10000);
        return () => clearInterval(interval);
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = [...events];

        // Severity filter
        if (severityFilter !== "all") {
            filtered = filtered.filter(e => e.status === severityFilter);
        }

        // Tool filter (extract from domain)
        if (toolFilter !== "all") {
            filtered = filtered.filter(e => e.domain.toLowerCase().includes(toolFilter.toLowerCase()));
        }

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(e =>
                e.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.user.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredEvents(filtered);
    }, [severityFilter, toolFilter, searchQuery, events]);

    if (loading) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Loading live feed...
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Live Audit Feed</h1>
                    <p className="text-muted-foreground/90 mt-2">
                        Real-time monitoring of all AI interactions
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => fetchEvents(true)}
                    disabled={refreshing}
                    className="gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? "Refreshing..." : "Refresh"}
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Filter className="h-5 w-5" />
                        Filters
                    </CardTitle>
                    <CardDescription>
                        Filter events by severity, tool, or search
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Domain or user..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {/* Severity Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Severity</label>
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Events</SelectItem>
                                    <SelectItem value="allowed">Allowed Only</SelectItem>
                                    <SelectItem value="flagged">Flagged Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tool Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tool</label>
                            <Select value={toolFilter} onValueChange={setToolFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Tools" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Tools</SelectItem>
                                    <SelectItem value="openai">ChatGPT</SelectItem>
                                    <SelectItem value="claude">Claude</SelectItem>
                                    <SelectItem value="gemini">Gemini</SelectItem>
                                    <SelectItem value="copilot">Copilot</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Events List */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Events ({filteredEvents.length})
                        </CardTitle>
                        <Badge variant="outline" className="font-mono text-xs">
                            Auto-refresh: 10s
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No events match your filters
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {filteredEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`p-2 rounded-full ${event.status === 'allowed'
                                                    ? 'bg-emerald-500/10 text-emerald-500'
                                                    : 'bg-rose-500/10 text-rose-500'
                                                }`}>
                                                <Globe className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-medium truncate">{event.domain}</p>
                                                    <Badge
                                                        variant={event.status === 'allowed' ? 'outline' : 'destructive'}
                                                        className="text-[10px] h-5"
                                                    >
                                                        {event.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <span>{event.user}</span>
                                                    <span>•</span>
                                                    <span className="font-mono text-xs">{event.hash}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground font-mono">
                                                {event.time}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DateRangePicker } from "@/components/shared/DateRangePicker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import useSWR from "swr";
import { addDays } from "date-fns";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ActivityPage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    });

    const params = new URLSearchParams();
    if (dateRange?.from) params.append('startDate', dateRange.from.toISOString());
    if (dateRange?.to) params.append('endDate', dateRange.to.toISOString());

    const { data, error, isLoading } = useSWR(
        `/api/activity?${params.toString()}`,
        fetcher,
        { refreshInterval: 30000 } // Refresh every 30 seconds
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Activity</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor AI tool usage across your organization
                    </p>
                </div>
                <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            {/* Stats Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border/60">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Events
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoading ? "..." : data?.pagination?.totalCount?.toLocaleString() || "0"}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/60">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Allowed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {isLoading ? "..." : data?.events?.filter((e: any) => e.actionTaken === 'allowed').length || "0"}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/60">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Flagged/Blocked
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                            {isLoading ? "..." : data?.events?.filter((e: any) => e.actionTaken === 'blocked' || e.actionTaken === 'flagged').length || "0"}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Timeline */}
            <Card className="border-border/60">
                <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>
                        Chronological view of AI tool interactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">
                            Loading activity...
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-destructive">
                            Failed to load activity
                        </div>
                    ) : !data?.events || data.events.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No activity found for the selected period
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {data.events.map((event: any) => (
                                <div
                                    key={event.id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors"
                                >
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-sm">{event.tool}</span>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-sm text-muted-foreground">{event.domain}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {event.userEmail || "Unknown user"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {event.riskScore !== undefined && event.riskScore > 0 && (
                                            <div className="text-xs">
                                                <span className="text-muted-foreground">Risk: </span>
                                                <span className={`font-semibold ${event.riskScore >= 70 ? 'text-rose-600' :
                                                        event.riskScore >= 40 ? 'text-amber-600' :
                                                            'text-emerald-600'
                                                    }`}>
                                                    {event.riskScore}
                                                </span>
                                            </div>
                                        )}
                                        <StatusBadge status={event.actionTaken} />
                                        <time className="text-xs text-muted-foreground font-mono">
                                            {new Date(event.createdAt).toLocaleString()}
                                        </time>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

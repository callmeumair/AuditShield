"use client";

import { useState, useEffect } from "react";

interface DashboardStats {
    interactions: number;
    policies: number;
    violations: number;
    egress: string;
    trends?: {
        interactions: number;
        policies: number;
        violations: number;
    };
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
    status: "allowed" | "flagged";
    hash: string;
}

interface DashboardData {
    stats: DashboardStats;
    chartData: ChartPoint[];
    activity: ActivityEvent[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useDashboardData(): DashboardData {
    const [stats, setStats] = useState<DashboardStats>({
        interactions: 0,
        policies: 0,
        violations: 0,
        egress: "0GB",
        trends: {
            interactions: 0,
            policies: 0,
            violations: 0,
        },
    });
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [activity, setActivity] = useState<ActivityEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [statsRes, chartRes, activityRes] = await Promise.all([
                fetch("/api/dashboard/stats"),
                fetch("/api/dashboard/chart"),
                fetch("/api/dashboard/activity"),
            ]);

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                // Calculate mock trends (in real app, this would come from API)
                setStats({
                    ...statsData,
                    trends: {
                        interactions: Math.floor(Math.random() * 20) - 5, // -5 to +15%
                        policies: Math.floor(Math.random() * 10), // 0 to +10%
                        violations: Math.floor(Math.random() * 30) - 15, // -15 to +15%
                    },
                });
            }

            if (chartRes.ok) {
                setChartData(await chartRes.json());
            }

            if (activityRes.ok) {
                setActivity(await activityRes.json());
            }
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return {
        stats,
        chartData,
        activity,
        loading,
        error,
        refetch: fetchData,
    };
}

"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "allowed" | "blocked" | "flagged" | "open" | "investigating" | "resolved" | "dismissed" | "generated" | "failed";

interface StatusBadgeProps {
    status: Status;
    className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
    allowed: {
        label: "Allowed",
        className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    },
    blocked: {
        label: "Blocked",
        className: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    },
    flagged: {
        label: "Flagged",
        className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    },
    open: {
        label: "Open",
        className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    },
    investigating: {
        label: "Investigating",
        className: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    },
    resolved: {
        label: "Resolved",
        className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    },
    dismissed: {
        label: "Dismissed",
        className: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 border-zinc-500/20",
    },
    generated: {
        label: "Generated",
        className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    },
    failed: {
        label: "Failed",
        className: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Badge
            variant="outline"
            className={cn(
                "text-xs font-medium",
                config.className,
                className
            )}
        >
            {config.label}
        </Badge>
    );
}

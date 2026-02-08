"use client";

import { useState } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import { History, FileText, Lock } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PoliciesPage() {
    const { data: policies } = useSWR('/api/policies', fetcher);
    const activePolicy = policies?.[0]; // Assuming first is active for MVP

    const { data: versions } = useSWR(
        activePolicy ? `/api/policies/versions/${activePolicy.id}` : null,
        fetcher
    );

    const [selectedVersion, setSelectedVersion] = useState<any>(null);

    // If no selected version, show the latest/active one from versions list
    const displayVersion = selectedVersion || versions?.versions?.[0];

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex flex-col gap-2 shrink-0">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Governance Policies
                </h1>
                <p className="text-muted-foreground">
                    Manage and track the evolution of your AI usage policies.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* History List */}
                <Card className="col-span-1 border-border/60 flex flex-col h-full bg-slate-50/50">
                    <CardHeader className="pb-3 shrink-0">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <History className="h-4 w-4" />
                            Version History
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative">
                        <div className="absolute inset-0 overflow-y-auto">
                            <div className="flex flex-col divide-y divide-border/40">
                                {versions?.versions?.map((version: any) => {
                                    const isActive = version.version === versions.versions[0].version;
                                    const isSelected = displayVersion?.id === version.id;

                                    return (
                                        <button
                                            key={version.id}
                                            onClick={() => setSelectedVersion(version)}
                                            className={`flex flex-col items-start p-4 hover:bg-white transition-all text-left border-l-4 ${isSelected
                                                    ? "bg-white border-l-primary shadow-sm"
                                                    : "border-l-transparent"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between w-full mb-1">
                                                <span className={`font-semibold text-sm ${isSelected ? "text-primary" : ""}`}>
                                                    Version {version.version}
                                                </span>
                                                {isActive ? (
                                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                                        Archived
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground mb-2 font-mono">
                                                {format(new Date(version.createdAt), "MMM d, yyyy • HH:mm")}
                                            </div>
                                            <div className="text-xs text-slate-600 line-clamp-2 italic">
                                                "{version.changeNotes || "Update"}"
                                            </div>
                                        </button>
                                    );
                                })}
                                {!versions && (
                                    <div className="p-8 text-center text-sm text-muted-foreground">Loading history...</div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Document Viewer */}
                <Card className="col-span-1 md:col-span-2 border-border/60 flex flex-col h-full shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-100 bg-white pb-4 shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2 font-serif text-xl tracking-tight">
                                    <FileText className="h-5 w-5 text-slate-400" />
                                    Policy Document {displayVersion ? `v${displayVersion.version}.0` : ''}
                                </CardTitle>
                                <CardDescription>
                                    {displayVersion
                                        ? `Effective from ${format(new Date(displayVersion.createdAt), "PPP")}`
                                        : "Select a version to view"}
                                </CardDescription>
                            </div>
                            {displayVersion && (
                                <Badge variant="secondary" className="font-mono text-xs text-muted-foreground bg-slate-50">
                                    ID: {displayVersion.id.slice(0, 8)}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-8 font-serif leading-relaxed text-slate-800">
                        {displayVersion ? (
                            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
                                <div className="text-center pb-8 border-b-2 border-slate-100 mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest mb-2">
                                        {displayVersion.name || "AI Usage Policy"}
                                    </h2>
                                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                                        Organization Directive #{displayVersion.id.slice(0, 6).toUpperCase()}
                                    </p>
                                </div>

                                <div className="prose prose-slate max-w-none">
                                    <section>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 text-sm border-b border-slate-200 pb-2">
                                            1. Configuration Rules
                                        </h3>
                                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 font-mono text-sm text-slate-600">
                                            <pre className="whitespace-pre-wrap">
                                                {JSON.stringify(displayVersion.ruleSet, null, 2)}
                                            </pre>
                                        </div>
                                    </section>

                                    <section className="mt-8">
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 text-sm border-b border-slate-200 pb-2">
                                            2. Change Attribution
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            This version was authorized by <span className="font-semibold text-slate-900">{displayVersion.changedBy || "System Admin"}</span> on {format(new Date(displayVersion.createdAt), "PPP")} at {format(new Date(displayVersion.createdAt), "p")}.
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            <strong>Notes:</strong> {displayVersion.changeNotes || "Routine update."}
                                        </p>
                                    </section>
                                </div>

                                <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-mono">
                                    <div>
                                        SECURE TIMESTAMP: {new Date(displayVersion.createdAt).toISOString()}
                                    </div>
                                    <div>
                                        PAGE 1 OF 1
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
                                <Lock className="h-12 w-12 mb-4 text-slate-200" />
                                <h3 className="text-lg font-medium text-slate-900">Select a Version</h3>
                                <p className="text-sm max-w-sm mt-1">
                                    Select a policy version from the history sidebar to view its immutable record and configuration snapshot.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

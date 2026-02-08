"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSWR from "swr";
import Link from "next/link";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function IncidentsPage() {
    const { data: allIncidents, error, isLoading } = useSWR('/api/incidents', fetcher);
    const { data: openIncidents } = useSWR('/api/incidents?status=open', fetcher);
    const { data: investigatingIncidents } = useSWR('/api/incidents?status=investigating', fetcher);

    const renderIncidentsList = (incidents: any[]) => {
        if (!incidents || incidents.length === 0) {
            return (
                <div className="text-center py-12 text-muted-foreground">
                    No incidents found
                </div>
            );
        }

        return (
            <div className="space-y-3">
                {incidents.map((incident: any) => (
                    <Link
                        key={incident.id}
                        href={`/dashboard/incidents/${incident.id}`}
                        className="block"
                    >
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className={`h-4 w-4 ${incident.severity === 'critical' ? 'text-rose-600' :
                                            incident.severity === 'high' ? 'text-orange-600' :
                                                incident.severity === 'medium' ? 'text-amber-600' :
                                                    'text-blue-600'
                                        }`} />
                                    <h3 className="font-semibold">{incident.title}</h3>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{incident.auditLog?.tool || "Unknown tool"}</span>
                                    <span>•</span>
                                    <span>{incident.auditLog?.domain || "Unknown domain"}</span>
                                    <span>•</span>
                                    <span className="font-mono text-xs">
                                        {new Date(incident.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <StatusBadge status={incident.status} />
                                <Button variant="outline" size="sm">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
                <p className="text-muted-foreground mt-1">
                    Track and manage policy violations requiring attention
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openIncidents?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Investigating</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{investigatingIncidents?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{allIncidents?.length || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Incidents</CardTitle>
                    <CardDescription>
                        Filter by status to view specific incident types
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="open">Open</TabsTrigger>
                            <TabsTrigger value="investigating">Investigating</TabsTrigger>
                            <TabsTrigger value="resolved">Resolved</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="mt-4">
                            {isLoading ? (
                                <div className="text-center py-12 text-muted-foreground">Loading...</div>
                            ) : error ? (
                                <div className="text-center py-12 text-destructive">Failed to load incidents</div>
                            ) : (
                                renderIncidentsList(allIncidents)
                            )}
                        </TabsContent>
                        <TabsContent value="open" className="mt-4">
                            {renderIncidentsList(openIncidents)}
                        </TabsContent>
                        <TabsContent value="investigating" className="mt-4">
                            {renderIncidentsList(investigatingIncidents)}
                        </TabsContent>
                        <TabsContent value="resolved" className="mt-4">
                            {renderIncidentsList(allIncidents?.filter((i: any) => i.status === 'resolved'))}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

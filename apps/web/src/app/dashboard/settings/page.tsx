"use client";

import { useUser, useOrganization } from "@clerk/nextjs";
import {
    Building2,
    Key,
    Trash2,
    AlertOctagon,
    RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { TrustCenter } from "@/components/settings/TrustCenter";

export default function SettingsPage() {
    const { user } = useUser();
    const { organization } = useOrganization();
    const [apiKey, setApiKey] = useState("ask_live_****************************");

    const regenerateKey = () => {
        // Mock regeneration for UI demo (In real app, call API)
        const newKey = `ask_live_${Math.random().toString(36).substring(2, 15)}`;
        setApiKey(newKey);
        toast.success("API Key Regenerated");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your organization configuration and security credentials.
                </p>
            </div>

            <Tabs defaultValue="organization" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="organization">Organization</TabsTrigger>
                    <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                    <TabsTrigger value="retention">Data Retention</TabsTrigger>
                    <TabsTrigger value="trust">Trust & Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="organization" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Details</CardTitle>
                            <CardDescription>
                                Managed via your identity provider (Clerk).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Organization Name</Label>
                                <Input value={organization?.name || "Loading..."} disabled />
                            </div>
                            <div className="grid gap-2">
                                <Label>Organization ID</Label>
                                <div className="font-mono text-xs bg-muted p-2 rounded border">
                                    {organization?.id || "..."}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Your Role</Label>
                                <div className="flex">
                                    <Badge variant="secondary">
                                        {user?.organizationMemberships?.[0]?.role || "Member"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-rose-100 bg-rose-50/10">
                        <CardHeader>
                            <CardTitle className="text-rose-600 flex items-center gap-2">
                                <AlertOctagon className="h-5 w-5" />
                                Danger Zone
                            </CardTitle>
                            <CardDescription>
                                Irreversible actions for your organization.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" disabled>
                                Delete Organization
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">
                                Please contact support to delete your organization.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="api-keys" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>
                                Manage keys for accessing the AuditShield API programmatically.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg bg-slate-50 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="font-medium text-sm flex items-center gap-2">
                                        <Key className="h-4 w-4 text-muted-foreground" />
                                        Default Secret Key
                                    </div>
                                    <div className="font-mono text-xs text-slate-500">
                                        Created on {format(new Date(), "MMM d, yyyy")}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={apiKey}
                                        readOnly
                                        className="w-[280px] font-mono text-xs bg-white"
                                    />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <RefreshCw className="h-4 w-4 mr-2" />
                                                Regenerate
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Regenerate API Key?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will invalidate the current key immediately. Any running services using this key will fail.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={regenerateKey}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="retention" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Retention Policy</CardTitle>
                            <CardDescription>
                                Configure how long audit logs and reports are retained.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg bg-slate-50">
                                    <h4 className="font-semibold text-sm mb-2">Audit Logs</h4>
                                    <p className="text-2xl font-bold text-slate-900">7 Years</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Forced compliance standard (SOC2)
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg bg-slate-50">
                                    <h4 className="font-semibold text-sm mb-2">Generated Reports</h4>
                                    <p className="text-2xl font-bold text-slate-900">Indefinite</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Immutable storage
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                * Retention policies are currently enforcing strict compliance defaults and cannot be lowered.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="trust" className="space-y-4">
                    <TrustCenter />
                </TabsContent>
            </Tabs>
        </div>
    );
}

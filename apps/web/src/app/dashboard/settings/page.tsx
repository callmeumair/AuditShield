"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Settings, Key, Bell, Copy, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [apiKey] = useState("as_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    const handleSave = async (section: string) => {
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(`${section} settings saved successfully`);
        setSaving(false);
    };

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        toast.success("API key copied to clipboard");
    };

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground/90 mt-2">
                    Manage your organization preferences and integrations.
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="general" className="gap-2">
                        <Settings className="h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="api-keys" className="gap-2">
                        <Key className="h-4 w-4" />
                        API Keys
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Settings</CardTitle>
                            <CardDescription>
                                Update your organization's basic information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="org-name">Organization Name</Label>
                                <Input
                                    id="org-name"
                                    placeholder="Acme Corporation"
                                    defaultValue="Acme Corporation"
                                    className="max-w-md focus-visible:ring-2 focus-visible:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <select
                                    id="timezone"
                                    className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    defaultValue="UTC"
                                >
                                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                                    <option value="America/New_York">Eastern Time (ET)</option>
                                    <option value="America/Chicago">Central Time (CT)</option>
                                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                    <option value="Europe/London">London (GMT)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <select
                                    id="language"
                                    className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    defaultValue="en"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                </select>
                            </div>

                            <Separator />

                            <Button onClick={() => handleSave("General")} disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* API Keys */}
                <TabsContent value="api-keys" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>
                                Manage API keys for browser extension and integrations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-base">Extension API Key</Label>
                                    <p className="text-sm text-muted-foreground/90 mt-1">
                                        Use this key to configure the AuditShield browser extension
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 max-w-2xl">
                                    <div className="relative flex-1">
                                        <Input
                                            value={showApiKey ? apiKey : "••••••••••••••••••••••••••••••••"}
                                            readOnly
                                            className="font-mono text-sm pr-10"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={() => setShowApiKey(!showApiKey)}
                                        >
                                            {showApiKey ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <Button variant="outline" onClick={copyApiKey}>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy
                                    </Button>
                                </div>

                                <div className="rounded-lg bg-muted/50 p-4 border border-border/40">
                                    <p className="text-sm text-muted-foreground/90">
                                        <strong className="text-foreground">Note:</strong> Keep your API key secure.
                                        Anyone with this key can send audit events to your organization.
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <Button variant="destructive" disabled>
                                    Regenerate API Key
                                </Button>
                                <p className="text-xs text-muted-foreground/70 mt-2">
                                    This will invalidate the current key and require reconfiguration
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Configure how you receive alerts and updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground/90">
                                            Receive email alerts for policy violations
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Weekly Reports</Label>
                                        <p className="text-sm text-muted-foreground/90">
                                            Get a weekly summary of AI usage
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Critical Alerts</Label>
                                        <p className="text-sm text-muted-foreground/90">
                                            Immediate notifications for high-risk events
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
                                <Input
                                    id="webhook-url"
                                    type="url"
                                    placeholder="https://your-app.com/webhooks/auditshield"
                                    className="max-w-lg focus-visible:ring-2 focus-visible:ring-primary"
                                />
                                <p className="text-xs text-muted-foreground/70">
                                    Receive real-time events via webhook
                                </p>
                            </div>

                            <Separator />

                            <Button onClick={() => handleSave("Notification")} disabled={saving}>
                                {saving ? "Saving..." : "Save Preferences"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

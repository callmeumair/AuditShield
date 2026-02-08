"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSWR from "swr";
import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ClientsPage() {
    const { data: clients, error, isLoading, mutate } = useSWR('/api/clients', fetcher);
    const [isInviting, setIsInviting] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleInvite = async () => {
        if (!email || !name) return;

        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Client invited! Access URL:\n${data.accessUrl}\n\nShare this URL with the client for read-only report access.`);
                setEmail('');
                setName('');
                setIsInviting(false);
                mutate();
            }
        } catch (err) {
            alert('Failed to invite client');
        }
    };

    const handleRevoke = async (id: string) => {
        if (!confirm('Are you sure you want to revoke this client\'s access?')) return;

        try {
            const response = await fetch(`/api/clients?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                mutate();
            }
        } catch (err) {
            alert('Failed to revoke access');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage read-only access for external clients and auditors
                    </p>
                </div>
                <Button onClick={() => setIsInviting(!isInviting)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Client
                </Button>
            </div>

            {isInviting && (
                <Card>
                    <CardHeader>
                        <CardTitle>Invite New Client</CardTitle>
                        <CardDescription>
                            Provide read-only report access to external clients
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="john@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleInvite}>Send Invitation</Button>
                            <Button variant="outline" onClick={() => setIsInviting(false)}>Cancel</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Active Clients</CardTitle>
                    <CardDescription>
                        Clients with current access to your compliance reports
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">Loading...</div>
                    ) : error ? (
                        <div className="text-center py-12 text-destructive">Failed to load clients</div>
                    ) : !clients || clients.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            No clients invited yet
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Last Access</TableHead>
                                    <TableHead>Expires</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map((client: any) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {client.lastAccessAt
                                                ? new Date(client.lastAccessAt).toLocaleString()
                                                : 'Never'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(client.expiresAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRevoke(client.id)}
                                            >
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

import { db } from '@/lib/db';
import { policies } from '@/db/schema';
import { AddPolicyDialog } from '@/components/policies/add-policy-dialog';
import { PolicyActions } from '@/components/policies/policy-actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { desc } from 'drizzle-orm';
import { ShieldAlert, FileText } from 'lucide-react';

export default async function PoliciesPage() {
    // Fetch policies (for MVP showing all, in real app filter by Org)
    const policyList = await db.select().from(policies).orderBy(desc(policies.createdAt));

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Policy Configuration</h1>
                    <p className="text-muted-foreground/90 mt-2">
                        Manage whitelisted and banned AI tools for your organization.
                    </p>
                </div>
                <AddPolicyDialog />
            </div>

            {policyList.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="rounded-full bg-primary/10 p-6 mb-6">
                            <ShieldAlert className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No policies defined yet</h3>
                        <p className="text-muted-foreground/90 max-w-md mb-6">
                            Get started by creating your first policy to control which AI tools your team can access.
                        </p>
                        <AddPolicyDialog />
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Domain</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead className="text-right">Created</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {policyList.map((policy) => (
                                <TableRow key={policy.id} className="hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-medium">{policy.domain}</TableCell>
                                    <TableCell>
                                        <Badge variant={policy.status === 'banned' ? 'destructive' : policy.status === 'review' ? 'secondary' : 'outline'}>
                                            {policy.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground/90 max-w-md truncate">
                                        {policy.reason || '—'}
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground/90 text-sm">
                                        {new Date(policy.createdAt!).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <PolicyActions policyId={policy.id} policyDomain={policy.domain} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
}

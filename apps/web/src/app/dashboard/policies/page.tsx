import { db } from '@/lib/db';
import { policies, organizations } from '@/db/schema';
import { AddPolicyDialog } from '@/components/policies/add-policy-dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { desc } from 'drizzle-orm';

export default async function PoliciesPage() {
    // Fetch policies (for MVP showing all, in real app filter by Org)
    const policyList = await db.select().from(policies).orderBy(desc(policies.createdAt));

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Policy Configuration</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage whitelisted and banned AI tools for your organization.
                    </p>
                </div>
                <AddPolicyDialog />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Domain</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead className="text-right">Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {policyList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No policies defined. Add one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            policyList.map((policy) => (
                                <TableRow key={policy.id}>
                                    <TableCell className="font-medium">{policy.domain}</TableCell>
                                    <TableCell>
                                        <Badge variant={policy.status === 'banned' ? 'destructive' : 'secondary'}>
                                            {policy.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{policy.reason || '-'}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">
                                        {new Date(policy.createdAt!).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

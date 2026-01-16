import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
    // Mock Data
    const recentEvents = [
        {
            id: "evt_1",
            timestamp: "2024-05-15 14:32:01",
            domain: "chat.openai.com",
            user: "alice@company.com",
            status: "allowed",
            hash: "e3b0c442...855"
        },
        {
            id: "evt_2",
            timestamp: "2024-05-15 14:10:44",
            domain: "claude.ai",
            user: "bob@company.com",
            status: "allowed",
            hash: "8d969eef...b21"
        },
        {
            id: "evt_3",
            timestamp: "2024-05-15 13:45:12",
            domain: "unknown-ai-tool.com",
            user: "dave@company.com",
            status: "flagged",
            hash: "1253e93a...c99"
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="text-xs text-muted-foreground">+12% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Policy Violations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">3</div>
                        <p className="text-xs text-muted-foreground">Action required</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">98%</div>
                        <p className="text-xs text-muted-foreground">Audit Ready</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle>Audit Log</CardTitle>
                    <CardDescription>Real-time stream of detected AI interactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Domain</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Hash</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-mono text-xs">{event.timestamp}</TableCell>
                                    <TableCell className="font-medium">{event.domain}</TableCell>
                                    <TableCell>{event.user}</TableCell>
                                    <TableCell>
                                        {event.status === 'allowed' ? (
                                            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200 gap-1">
                                                <CheckCircle2 className="h-3 w-3" /> Allowed
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive" className="gap-1">
                                                <AlertCircle className="h-3 w-3" /> Flagged
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground" title={event.hash}>
                                        {event.hash.substring(0, 12)}...
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

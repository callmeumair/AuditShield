import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lock, Shield, Database, Server } from "lucide-react";

export function TrustCenter() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid gap-6 md:grid-cols-2">

                {/* Security Architecture */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-emerald-600" />
                            Security Architecture
                        </CardTitle>
                        <CardDescription>
                            How AuditShield protects your data and ensures integrity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-lg border">
                                <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                                    <Lock className="h-4 w-4" /> Transit & Storage
                                </h4>
                                <p className="text-sm text-slate-600">
                                    All data is encrypted in transit via TLS 1.3 and at rest using AES-256.
                                    Database connections are secured with strict SSL enforcement.
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border">
                                <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                                    <Database className="h-4 w-4" /> Immutable Ledger
                                </h4>
                                <p className="text-sm text-slate-600">
                                    Audit logs and policies are stored in an append-only ledger structure.
                                    Updates are strictly versioned; deletions are soft-deletes (archival) only.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Collections */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Collection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex gap-2">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span><strong>Collected:</strong> User email, AI tool domain, prompt metadata (length, tool used), timestamp.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-rose-600 font-bold">✕</span>
                                <span><strong>Not Collected:</strong> Actual prompt content (PII safety), browser history outside AI tools, passwords.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Subprocessors */}
                <Card>
                    <CardHeader>
                        <CardTitle>Subprocessors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b pb-2">
                                <span>Neon (AWS)</span>
                                <span className="text-muted-foreground">Database Hosting</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span>Clerk</span>
                                <span className="text-muted-foreground">Identity & Auth</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span>Upstash</span>
                                <span className="text-muted-foreground">Redis Cache</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Vercel</span>
                                <span className="text-muted-foreground">Application Hosting</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Flow Diagram (Textual) */}
                <Card className="md:col-span-2 bg-slate-900 text-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Server className="h-5 w-5" />
                            Data Flow Model
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="font-mono text-xs md:text-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="border border-slate-700 p-2 rounded">Browser Extension</div>
                                <div className="flex-1 h-px bg-slate-700 relative">
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">HTTPS (TLS 1.3)</span>
                                </div>
                                <div className="border border-slate-700 p-2 rounded">AuditShield API</div>
                            </div>
                            <div className="flex items-center gap-4 pl-[calc(50%+2px)]">
                                <div className="w-px h-8 bg-slate-700"></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-1/2 text-right text-[10px] text-slate-500 pr-4">
                                    Async Queue
                                </div>
                                <div className="border border-slate-700 p-2 rounded bg-slate-800">
                                    Ingestion Worker
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pl-[calc(50%+2px)]">
                                <div className="w-px h-8 bg-slate-700"></div>
                            </div>
                            <div className="flex items-center gap-4 justify-center">
                                <div className="border border-emerald-900/50 bg-emerald-900/20 text-emerald-400 p-3 rounded w-full text-center">
                                    Neon Postgres (Immutable Ledger)
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

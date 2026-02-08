"use client";

import { Shield, Check, Copy } from "lucide-react";
import { formatHashForDisplay } from "@/lib/utils/hashUtils";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface TamperProofBadgeProps {
    hash: string;
    verified?: boolean;
}

export function TamperProofBadge({ hash, verified = true }: TamperProofBadgeProps) {
    const [copied, setCopied] = useState(false);
    const { short, full } = formatHashForDisplay(hash);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(full);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/50 transition-colors">
                        <Shield className={`h-3.5 w-3.5 ${verified ? 'text-emerald-500' : 'text-amber-500'}`} />
                        <span className="font-mono text-xs text-muted-foreground">{short}</span>
                        {verified && <Check className="h-3 w-3 text-emerald-500" />}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 hover:bg-muted"
                            onClick={copyToClipboard}
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm">
                    <div className="space-y-2">
                        <p className="font-semibold text-xs">
                            {verified ? "✓ Tamper-Evident Signature" : "⚠ Verification Failed"}
                        </p>
                        <p className="font-mono text-[10px] break-all">{full}</p>
                        <p className="text-[10px] text-muted-foreground">
                            {verified
                                ? "This SHA-256 hash proves the document has not been modified."
                                : "The hash does not match. Content may have been tampered with."}
                        </p>
                        {copied && (
                            <p className="text-[10px] text-emerald-500">Copied to clipboard!</p>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

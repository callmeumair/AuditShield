import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditLogs, policies } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { validateApiKey, extractApiKey } from '@/lib/auth/validateApiKey';
import { analyzeRisk, createCustomPattern, RiskPattern } from '@/lib/utils/riskScoring';
import { generateHash } from '@/lib/utils/hashUtils';

/**
 * POST /api/v1/log-event
 * Central endpoint for logging events and enforcing policies
 * Called by the browser extension
 */
export async function POST(request: Request) {
    try {
        // Validate API key
        const apiKey = extractApiKey(request);
        const validation = await validateApiKey(apiKey);

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 401 }
            );
        }

        const organizationId = validation.organizationId!;
        const body = await request.json();
        const {
            domain,
            url,
            tool,
            userEmail,
            userId,
            promptText,
            metadata
        } = body;

        // Validate required fields
        if (!domain || !tool) {
            return NextResponse.json(
                { error: 'Missing required fields: domain, tool' },
                { status: 400 }
            );
        }

        // Fetch policies for this tool
        const toolPolicies = await db
            .select()
            .from(policies)
            .where(
                and(
                    eq(policies.organizationId, organizationId),
                    eq(policies.toolName, tool),
                    eq(policies.enabled, 'true')
                )
            );

        // Check if tool is blocked
        const blockPolicy = toolPolicies.find(p => p.action === 'block');
        if (blockPolicy) {
            // Log the blocked attempt
            const timestamp = new Date().toISOString();
            const hashData = `${promptText || domain}:${timestamp}`;
            const hashSignature = generateHash(hashData);

            await db.insert(auditLogs).values({
                organizationId,
                userEmail: userEmail || null,
                userId: userId || null,
                tool,
                domain,
                url: url || null,
                promptText: promptText || null,
                actionTaken: 'blocked',
                riskScore: 100,
                violationReasons: [{ reason: blockPolicy.reason || 'Tool blocked by policy' }],
                metadata: metadata || null,
                hashSignature,
            });

            return NextResponse.json(
                {
                    allowed: false,
                    action: 'blocked',
                    reason: blockPolicy.reason || 'This tool is blocked by your organization policy'
                },
                { status: 403 }
            );
        }

        // Analyze risk if prompt text is provided
        let riskScore = 0;
        let violations: any[] = [];
        let actionTaken = 'allowed';

        if (promptText) {
            // Build custom patterns from policy rules
            const customPatterns: RiskPattern[] = [];
            for (const policy of toolPolicies) {
                if (policy.rulesJson && typeof policy.rulesJson === 'object') {
                    const rules = policy.rulesJson as any;
                    if (rules.patterns && Array.isArray(rules.patterns)) {
                        for (const patternDef of rules.patterns) {
                            const pattern = createCustomPattern(
                                patternDef.name,
                                patternDef.regex,
                                patternDef.score || 50,
                                patternDef.description || 'Custom pattern'
                            );
                            if (pattern) {
                                customPatterns.push(pattern);
                            }
                        }
                    }
                }
            }

            // Analyze risk
            const analysis = analyzeRisk(promptText, customPatterns);
            riskScore = analysis.riskScore;
            violations = analysis.violations;

            // Determine action based on risk score
            if (riskScore >= 70) {
                actionTaken = 'flagged';
            } else if (riskScore >= 30) {
                actionTaken = 'review';
            }
        }

        // Generate hash for immutability
        const timestamp = new Date().toISOString();
        const hashData = `${promptText || domain}:${timestamp}:${userEmail || 'anonymous'}`;
        const hashSignature = generateHash(hashData);

        // Log the event
        await db.insert(auditLogs).values({
            organizationId,
            userEmail: userEmail || null,
            userId: userId || null,
            tool,
            domain,
            url: url || null,
            promptText: promptText || null,
            actionTaken,
            riskScore,
            violationReasons: violations.length > 0 ? violations : null,
            metadata: metadata || null,
            hashSignature,
        });

        return NextResponse.json({
            allowed: true,
            action: actionTaken,
            riskScore,
            violations,
            message: riskScore >= 30
                ? 'Warning: Potential sensitive information detected'
                : 'Event logged successfully'
        });
    } catch (error) {
        console.error('POST /api/v1/log-event error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

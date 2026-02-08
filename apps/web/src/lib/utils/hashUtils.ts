import crypto from 'crypto';

/**
 * Generate SHA-256 hash of the input data
 * Used for API key hashing and audit log immutability
 */
export function generateHash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Verify that data matches the provided hash
 */
export function verifyHash(data: string, hash: string): boolean {
    const computedHash = generateHash(data);
    return computedHash === hash;
}

/**
 * Generate a cryptographically secure random API key
 * Format: as_live_<32 random hex characters>
 */
export function generateApiKey(): string {
    const randomBytes = crypto.randomBytes(32);
    const randomHex = randomBytes.toString('hex');
    return `as_live_${randomHex}`;
}

/**
 * Extract the prefix from an API key for display purposes
 * Example: "as_live_abc123..." -> "as_live_abc123"
 */
export function getKeyPrefix(apiKey: string): string {
    return apiKey.substring(0, 16);
}

/**
 * Mask an API key for display
 * Example: "as_live_abc123def456..." -> "as_live_abc123...def456"
 */
export function maskApiKey(apiKey: string): string {
    if (apiKey.length <= 20) return apiKey;
    const prefix = apiKey.substring(0, 14);
    const suffix = apiKey.substring(apiKey.length - 6);
    return `${prefix}...${suffix}`;
}

/**
 * Generate hash for audit log entry
 * Combines critical fields to create tamper-evident signature
 */
export function generateAuditLogHash(data: {
    organizationId: string;
    userId?: string | null;
    tool: string;
    domain: string;
    actionTaken: string;
    timestamp: Date;
}): string {
    const content = JSON.stringify({
        organizationId: data.organizationId,
        userId: data.userId || '',
        tool: data.tool,
        domain: data.domain,
        actionTaken: data.actionTaken,
        timestamp: data.timestamp.toISOString(),
    });
    return generateHash(content);
}

/**
 * Generate hash for report PDF
 * Creates tamper-evident signature for compliance reports
 */
export function generateReportHash(pdfBuffer: Buffer): string {
    return crypto.createHash('sha256').update(pdfBuffer).digest('hex');
}

/**
 * Format hash for display (shortened with full hash in tooltip)
 */
export function formatHashForDisplay(hash: string): {
    short: string;
    full: string;
} {
    return {
        short: `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`,
        full: hash,
    };
}


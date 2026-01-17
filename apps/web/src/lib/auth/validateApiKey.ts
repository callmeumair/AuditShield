import { db } from '@/lib/db';
import { organizationApiKeys } from '@/db/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { generateHash } from '@/lib/utils/hashUtils';

export interface ApiKeyValidationResult {
    valid: boolean;
    organizationId?: string;
    error?: string;
}

/**
 * Validate API key from request headers
 * Returns organization ID if valid, or error message if invalid
 */
export async function validateApiKey(
    apiKey: string | null
): Promise<ApiKeyValidationResult> {
    if (!apiKey) {
        return {
            valid: false,
            error: 'Missing API key. Include x-audit-key header.'
        };
    }

    // Hash the provided key
    const keyHash = generateHash(apiKey);

    try {
        // Look up the key in the database
        const [keyRecord] = await db
            .select()
            .from(organizationApiKeys)
            .where(
                and(
                    eq(organizationApiKeys.keyHash, keyHash),
                    isNull(organizationApiKeys.revokedAt)
                )
            )
            .limit(1);

        if (!keyRecord) {
            return {
                valid: false,
                error: 'Invalid or revoked API key'
            };
        }

        // Update last used timestamp (fire and forget)
        db.update(organizationApiKeys)
            .set({ lastUsedAt: new Date() })
            .where(eq(organizationApiKeys.id, keyRecord.id))
            .execute()
            .catch(err => console.error('Failed to update lastUsedAt:', err));

        return {
            valid: true,
            organizationId: keyRecord.organizationId
        };
    } catch (error) {
        console.error('API key validation error:', error);
        return {
            valid: false,
            error: 'Internal server error during validation'
        };
    }
}

/**
 * Extract API key from request headers
 */
export function extractApiKey(request: Request): string | null {
    return request.headers.get('x-audit-key') || request.headers.get('X-Audit-Key');
}

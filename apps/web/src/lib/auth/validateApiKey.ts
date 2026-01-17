import { db } from '@/lib/db';
import { organizationApiKeys } from '@/db/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { generateHash } from '@/lib/utils/hashUtils';
import { cache, CACHE_KEYS, CACHE_TTL } from '@/lib/cache';

export interface ApiKeyValidationResult {
    valid: boolean;
    organizationId?: string;
    error?: string;
}

/**
 * Extract API key from request headers
 */
export function extractApiKey(request: Request): string | null {
    return request.headers.get('x-audit-key');
}

/**
 * Validate API key with Redis caching
 * Cache hit: Returns immediately from Redis (1 hour TTL)
 * Cache miss: Queries database and caches result
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
    const cacheKey = CACHE_KEYS.apiKey(keyHash);

    try {
        // Try to get from cache first
        const cached = await cache.get<ApiKeyValidationResult>(cacheKey);
        if (cached) {
            console.log('[Cache HIT] API key validation:', keyHash.substring(0, 8));
            return cached;
        }

        console.log('[Cache MISS] API key validation:', keyHash.substring(0, 8));

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
            const result: ApiKeyValidationResult = {
                valid: false,
                error: 'Invalid or revoked API key'
            };
            // Cache negative result for shorter time (5 minutes)
            await cache.set(cacheKey, result, 300);
            return result;
        }

        // Update last used timestamp (fire and forget)
        db.update(organizationApiKeys)
            .set({ lastUsedAt: new Date() })
            .where(eq(organizationApiKeys.id, keyRecord.id))
            .execute()
            .catch(err => console.error('Failed to update lastUsedAt:', err));

        const result: ApiKeyValidationResult = {
            valid: true,
            organizationId: keyRecord.organizationId
        };

        // Cache valid result for 1 hour
        await cache.set(cacheKey, result, CACHE_TTL.apiKey);

        return result;
    } catch (error) {
        console.error('API key validation error:', error);
        return {
            valid: false,
            error: 'Internal server error during validation'
        };
    }
}

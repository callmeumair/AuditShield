import { redis } from './redis';

/**
 * Redis Cache Keys
 */
export const CACHE_KEYS = {
    // Policies cache - per organization
    policies: (orgId: string) => `policies:${orgId}`,

    // API key validation cache - per key hash
    apiKey: (keyHash: string) => `apikey:${keyHash}`,

    // Live stats cache - per organization
    liveStats: (orgId: string) => `stats:live:${orgId}`,

    // Organization cache - per clerk org ID
    organization: (clerkOrgId: string) => `org:${clerkOrgId}`,
};

/**
 * Cache TTLs (in seconds)
 */
export const CACHE_TTL = {
    policies: 300, // 5 minutes
    apiKey: 3600, // 1 hour
    liveStats: 2, // 2 seconds (matches SWR polling)
    organization: 1800, // 30 minutes
};

/**
 * Cache helper functions
 */
export const cache = {
    /**
     * Get cached value
     */
    async get<T>(key: string): Promise<T | null> {
        if (!redis) return null; // No cache available

        try {
            const value = await redis.get(key);
            return value as T | null;
        } catch (error) {
            console.error(`Redis GET error for key ${key}:`, error);
            return null;
        }
    },

    /**
     * Set cached value with TTL
     */
    async set(key: string, value: any, ttl: number): Promise<void> {
        if (!redis) return; // No cache available

        try {
            await redis.setex(key, ttl, JSON.stringify(value));
        } catch (error) {
            console.error(`Redis SET error for key ${key}:`, error);
        }
    },

    /**
     * Delete cached value
     */
    async del(key: string): Promise<void> {
        if (!redis) return; // No cache available

        try {
            await redis.del(key);
        } catch (error) {
            console.error(`Redis DEL error for key ${key}:`, error);
        }
    },

    /**
     * Delete multiple cached values by pattern
     */
    async delPattern(pattern: string): Promise<void> {
        if (!redis) return; // No cache available

        try {
            // Upstash Redis doesn't support SCAN, so we'll use a simple delete
            // For production, consider maintaining a set of keys to delete
            await redis.del(pattern);
        } catch (error) {
            console.error(`Redis DEL pattern error for ${pattern}:`, error);
        }
    },

    /**
     * Get or set cached value (cache-aside pattern)
     * Falls back to direct fetch when Redis is unavailable
     */
    async getOrSet<T>(
        key: string,
        ttl: number,
        fetchFn: () => Promise<T>
    ): Promise<T> {
        // If Redis is unavailable, just fetch directly
        if (!redis) {
            return await fetchFn();
        }

        // Try to get from cache
        const cached = await this.get<T>(key);
        if (cached !== null) {
            return cached;
        }

        // Fetch from source
        const value = await fetchFn();

        // Store in cache
        await this.set(key, value, ttl);

        return value;
    },
};

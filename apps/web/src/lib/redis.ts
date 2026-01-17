import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('⚠️  Redis credentials not found. Caching will be disabled. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable caching.');
} else {
    redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
}

export { redis };

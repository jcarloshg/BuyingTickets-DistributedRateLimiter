import { LoginRateLimiterValues } from "./rate-limiter-values";
import RedisSingleton from "./RedisClient";

export class LoginRateLimiter {
    public static async checkRateLimitKey(
        ip: string
    ): Promise<LoginRateLimiterResponse> {
        try {
            const redis = RedisSingleton.getInstance();

            // key for login by IP
            const key = `login::ratelimit::${ip}`;

            // Atomically increment user's counter
            const reqs = await redis.incr(key);
            if (reqs === 1) {
                await redis.expire(key, LoginRateLimiterValues.WINDOW_SECONDS);
            }

            if (reqs > LoginRateLimiterValues.MAX_REQUESTS) {
                const ttl = await redis.ttl(key);
                return {
                    success: false,
                    allowed: false,
                    retryAfter: ttl,
                    message: `Rate limit exceeded. Try again in ${ttl} seconds.`,
                };
            }

            return {
                success: true,
                allowed: true,
            };
        } catch (error) {
            return {
                success: false,
                allowed: false,
                message: "Internal Server Error",
            };
        }
    }
}

export interface LoginRateLimiterResponse {
    success: boolean;
    allowed: boolean;
    retryAfter?: number;
    message?: string;
}

import { BuyTickerRateLimiterValues } from "./rate-limiter-values";
import RedisSingleton from "./RedisClient";

export class BuyTicketRateLimiter {
    static async checkRateLimitKey(
        token: string
    ): Promise<BuyTicketRateLimiterResponse> {
        try {
            const redis = RedisSingleton.getInstance();

            // key for buy-ticket by token
            const key = `buy-ticket::ratelimit::${token}`;

            // Atomically increment user's counter
            const reqs = await redis.incr(key);
            if (reqs === 1) {
                await redis.expire(key, BuyTickerRateLimiterValues.WINDOW_SECONDS);
            }


            if (reqs > BuyTickerRateLimiterValues.MAX_REQUESTS) {
                const ttl = await redis.ttl(key);
                return {
                    success: true,
                    allowed: false,
                    retryAfter: ttl,
                    message: `Rate limit exceeded. Try again in ${ttl} seconds.`,
                };
            }

            return {
                success: true,
                allowed: true,
                message: `Request allowed.`,
            };
        } catch (error) {
            return {
                success: false,
                allowed: false,
                message: "Internal Server Error",
            };
        }
    }

    public static windowSliding(
        keys: string[],
        key: string,
        counter: number
    ): boolean {
        console.log(`keys: `, keys.length);

        let left = 0;
        let max_requests = 0;

        for (let right = 0; right < keys.length; right++) {
            const valueRight = keys[right];

            if (valueRight == key) {
                max_requests = Math.max(max_requests, right - left + 1);
            } else {
                left == right;
            }

            if (max_requests >= counter) {
                return false;
            }
        }

        return true;
    }
}

export interface BuyTicketRateLimiterResponse {
    success: boolean;
    allowed: boolean;
    retryAfter?: number;
    message: string;
}

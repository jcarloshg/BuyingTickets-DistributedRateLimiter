import { createClient, RedisClientType } from "redis";

class RedisSingleton {
  private static instance: RedisClientType | null = null;

  private constructor() { }
  public static getInstance(): RedisClientType {
    if (!RedisSingleton.instance) {
      const url =
        process.env.REDIS_URL ||
        `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || "6379"
        }`;
      RedisSingleton.instance = createClient({ url });
      RedisSingleton.instance.on("error", (err) =>
        console.error("Redis Client Error:", err)
      );
      // Connect automatically once on first access
      void RedisSingleton.instance.connect();
    }
    return RedisSingleton.instance;
  }
}

export default RedisSingleton;

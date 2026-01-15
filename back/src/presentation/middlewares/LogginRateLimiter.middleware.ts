import { Request, Response, NextFunction } from "express";
import { LoginRateLimiter } from "../../application/shared/infrastructure/rate-limiter/Login.rate-limiter";
import { LoginRateLimiterValues } from "../../application/shared/infrastructure/rate-limiter/rate-limiter-values";

// ---------------------------------------------------------------
// RateLimiter Middleware: Uses Redis to rate-limit API requests
// ---------------------------------------------------------------
// Each client's IP is limited to X requests per WINDOW_SECONDS using a Redis COUNTER.
// If the limit is exceeded, return HTTP 429 (Too Many Requests)

export async function LogInRateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.ip || "some-ip";
  const loginRateLimiter = await LoginRateLimiter.checkRateLimitKey(ip);

  // error for handling
  if (loginRateLimiter.success == false) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  // rate limit exceeded
  if (loginRateLimiter.success == true && loginRateLimiter.allowed == false) {
    res.setHeader(
      "Retry-After",
      loginRateLimiter.retryAfter || LoginRateLimiterValues.WINDOW_SECONDS
    );
    const message = loginRateLimiter.message || "Rate limit exceeded";
    return res.status(429).json({
      message: message,
    });
  }

  next();
}

import { Request, Response, NextFunction } from "express";
import { BuyTicketRateLimiter } from "../../application/shared/infrastructure/rate-limiter/buy-ticket.rate-limiter";

export async function BuyTicketRateLimiterMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    const buyTicketRateLimiter = await BuyTicketRateLimiter.checkRateLimitKey(token);

    // error for handling
    if (buyTicketRateLimiter.success == false) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }

    // rate limit exceeded
    if (buyTicketRateLimiter.success == true && buyTicketRateLimiter.allowed == false) {
        res.setHeader(
            "Retry-After",
            buyTicketRateLimiter.retryAfter || 60
        );
        const message = buyTicketRateLimiter.message || "Rate limit exceeded";
        return res.status(429).json({
            message: message,
        });
    }

    next();
}
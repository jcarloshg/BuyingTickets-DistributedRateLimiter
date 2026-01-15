// ─────────────────────────────────────
// Login Rate Limiter
// ─────────────────────────────────────

const LOGIN_RATE_LIMIT_WINDOW_SECONDS = parseInt(process.env.LOGIN_RATE_LIMIT_WINDOW_SECONDS || "10", 10); // Time window in seconds
const LOGIN_RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.LOGIN_RATE_LIMIT_MAX_REQUESTS || "10", 10); // Max requests allowed per window

console.log(`LOGIN_RATE_LIMIT_WINDOW_SECONDS: `, LOGIN_RATE_LIMIT_WINDOW_SECONDS);
console.log(`LOGIN_RATE_LIMIT_MAX_REQUESTS: `, LOGIN_RATE_LIMIT_MAX_REQUESTS);

export const LoginRateLimiterValues = {
    WINDOW_SECONDS: LOGIN_RATE_LIMIT_WINDOW_SECONDS,
    MAX_REQUESTS: LOGIN_RATE_LIMIT_MAX_REQUESTS
};

// ─────────────────────────────────────
//  Buy ticket Rate Limiter
// ─────────────────────────────────────

const BUY_TICKER_RATE_LIMIT_WINDOW_SECONDS = parseInt(process.env.BUY_TICKER_RATE_LIMIT_WINDOW_SECONDS || "10", 10); // Time window in seconds
const BUY_TICKER_RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.BUY_TICKER_RATE_LIMIT_MAX_REQUESTS || "10", 10); // Max requests allowed per window

console.log(`BUY_TICKER_RATE_LIMIT_WINDOW_SECONDS: `, BUY_TICKER_RATE_LIMIT_WINDOW_SECONDS);
console.log(`BUY_TICKER_RATE_LIMIT_MAX_REQUESTS: `, BUY_TICKER_RATE_LIMIT_MAX_REQUESTS);

export const BuyTickerRateLimiterValues = {
    WINDOW_SECONDS: BUY_TICKER_RATE_LIMIT_WINDOW_SECONDS,
    MAX_REQUESTS: BUY_TICKER_RATE_LIMIT_MAX_REQUESTS
};
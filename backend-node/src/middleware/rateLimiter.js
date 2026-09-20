/**
 * In-memory sliding window rate limiter middleware
 */
const requestsMap = new Map();

const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || (15 * 60 * 1000); // 15 minutes default
  const max = options.max || 100; // max 100 requests per window

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    if (!requestsMap.has(ip)) {
      requestsMap.set(ip, []);
    }

    const timestamps = requestsMap.get(ip);
    
    // Filter out timestamps outside the current window
    const validTimestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
    validTimestamps.push(now);
    requestsMap.set(ip, validTimestamps);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - validTimestamps.length));

    if (validTimestamps.length > max) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfterMs: windowMs - (now - validTimestamps[0]),
      });
    }

    next();
  };
};

module.exports = rateLimiter;

/**
 * Simple in-process rate limiter for API routes.
 * Keyed by IP. Resets on a rolling window.
 * For production, replace with Redis-backed solution.
 */

const hits = new Map()

export function rateLimit(req, res, { max = 60, windowMs = 60_000 } = {}) {
  const ip  = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const key = ip

  const entry = hits.get(key) || { count: 0, reset: now + windowMs }

  if (now > entry.reset) {
    entry.count = 0
    entry.reset = now + windowMs
  }

  entry.count++
  hits.set(key, entry)

  res.setHeader('X-RateLimit-Limit', max)
  res.setHeader('X-RateLimit-Remaining', Math.max(0, max - entry.count))
  res.setHeader('X-RateLimit-Reset', entry.reset)

  if (entry.count > max) {
    res.status(429).json({ error: 'Too many requests' })
    return false
  }

  return true
}

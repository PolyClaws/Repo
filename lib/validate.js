/**
 * Request validation helpers for API routes.
 */

export function requireSecret(req, res) {
  const secret = process.env.INGEST_SECRET
  if (!secret) return true // not configured — open in dev
  const provided = req.headers['x-ingest-secret'] || req.headers['authorization']?.replace('Bearer ', '')
  if (provided !== secret) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}

export function requireMethod(req, res, method) {
  if (req.method !== method) {
    res.status(405).json({ error: `Method not allowed` })
    return false
  }
  return true
}

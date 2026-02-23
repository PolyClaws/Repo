import { addActivity, setStats } from '../../lib/store'

const SECRET = process.env.INGEST_SECRET ?? ''

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  if (SECRET && req.headers['x-ingest-secret'] !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { type, payload } = req.body ?? {}

  if (!type || !payload) {
    return res.status(400).json({ error: 'Missing type or payload' })
  }

  if (type === 'activity') {
    addActivity(payload)
    return res.status(200).json({ ok: true })
  }

  if (type === 'stats') {
    setStats(payload)
    return res.status(200).json({ ok: true })
  }

  return res.status(400).json({ error: `Unknown type: ${type}` })
}

import { getPositions } from '../../lib/store'

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const positions = getPositions()
  const open      = positions.filter(p => !p.resolved)
  const resolved  = positions.filter(p => p.resolved)

  res.status(200).json({ open, resolved, total: positions.length })
}

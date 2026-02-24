import { getBurns } from '../../lib/store'

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const limit  = parseInt(req.query.limit) || 20
  const burns  = getBurns().slice(0, limit)

  res.status(200).json({ burns, count: burns.length })
}

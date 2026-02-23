/**
 * In-memory store — shared across API route invocations in a long-running
 * Next.js server process (next start / next dev).
 * Swap this module for a Supabase client when ready for multi-instance prod.
 */

const MAX_ACTIVITY  = 100
const MAX_BURNS     = 200
const MAX_POSITIONS = 500

const store = {
  activity: [],
  burns: [],
  positions: [],
  stats: {
    treasurySOL:      0,
    totalBurned:      0,
    totalBoughtBack:  0,
    totalFeesClaimed: 0,
    lastUpdated:      null,
  },
}

export function addActivity(entry) {
  store.activity.unshift(entry)
  if (store.activity.length > MAX_ACTIVITY) {
    store.activity = store.activity.slice(0, MAX_ACTIVITY)
  }
}

export function setStats(stats) {
  store.stats = { ...store.stats, ...stats }
}

export function getActivity(limit = 30) {
  return store.activity.slice(0, limit)
}

export function getStats() {
  return store.stats
}

export function addBurn(entry) {
  store.burns.unshift(entry)
  if (store.burns.length > MAX_BURNS) store.burns = store.burns.slice(0, MAX_BURNS)
}

export function getBurns() {
  return store.burns
}

export function upsertPosition(position) {
  const idx = store.positions.findIndex(p => p.id === position.id)
  if (idx >= 0) {
    store.positions[idx] = { ...store.positions[idx], ...position }
  } else {
    store.positions.unshift(position)
    if (store.positions.length > MAX_POSITIONS) {
      store.positions = store.positions.slice(0, MAX_POSITIONS)
    }
  }
}

export function getPositions() {
  return store.positions
}

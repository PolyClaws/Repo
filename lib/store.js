/**
 * In-memory store — shared across API route invocations in a long-running
 * Next.js server process (next start / next dev).
 * Swap this module for a Supabase client when ready for multi-instance prod.
 */

const MAX_ACTIVITY = 100

const store = {
  activity: [],
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

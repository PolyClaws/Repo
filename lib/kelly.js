/**
 * Kelly Criterion bet sizing utilities
 * https://en.wikipedia.org/wiki/Kelly_criterion
 */

/**
 * Full Kelly fraction
 * @param {number} prob   - estimated win probability (0–1)
 * @param {number} odds   - decimal odds (e.g. 2.0 = evens)
 * @returns {number} fraction of bankroll to wager (0–1), or 0 if no edge
 */
export function kelly(prob, odds) {
  if (prob <= 0 || prob >= 1 || odds <= 1) return 0;
  const b = odds - 1; // net odds
  const q = 1 - prob;
  const f = (b * prob - q) / b;
  return Math.max(0, f);
}

/**
 * Fractional Kelly — reduces variance by scaling the full Kelly fraction
 * @param {number} prob
 * @param {number} odds
 * @param {number} fraction  - e.g. 0.25 for quarter-Kelly (default)
 * @returns {number}
 */
export function fractionalKelly(prob, odds, fraction = 0.25) {
  return kelly(prob, odds) * fraction;
}

/**
 * Expected value of a bet
 * @param {number} prob   - estimated win probability
 * @param {number} odds   - decimal odds
 * @returns {number} EV per unit staked (positive = edge)
 */
export function expectedValue(prob, odds) {
  if (prob <= 0 || prob >= 1 || odds <= 0) return 0;
  return prob * odds - 1;
}

/**
 * Convert American odds to decimal
 * @param {number} american  e.g. +150 or -200
 * @returns {number} decimal odds
 */
export function americanToDecimal(american) {
  if (american > 0) return american / 100 + 1;
  return 100 / Math.abs(american) + 1;
}

/**
 * Convert implied probability from decimal odds (market price)
 * @param {number} odds
 * @returns {number} implied probability
 */
export function impliedProbability(odds) {
  if (odds <= 0) return 0;
  return 1 / odds;
}

/**
 * Edge = estimated probability minus market implied probability
 * @param {number} estimatedProb
 * @param {number} marketOdds
 * @returns {number} edge (positive = value bet)
 */
export function edge(estimatedProb, marketOdds) {
  return estimatedProb - impliedProbability(marketOdds);
}

/**
 * Recommended position size in USD given bankroll and Kelly fraction
 * @param {number} bankroll  - total available capital in USD
 * @param {number} prob
 * @param {number} odds
 * @param {number} fraction  - Kelly fraction (default 0.25)
 * @param {number} maxPct    - hard cap as % of bankroll (default 5%)
 * @returns {number} USD amount to wager
 */
export function positionSize(bankroll, prob, odds, fraction = 0.25, maxPct = 0.05) {
  const f = fractionalKelly(prob, odds, fraction);
  const raw = bankroll * f;
  const cap = bankroll * maxPct;
  return Math.min(raw, cap);
}

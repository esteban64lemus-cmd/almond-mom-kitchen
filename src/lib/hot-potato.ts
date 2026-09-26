// Pure game logic for Hot Potato, the pass-the-phone party game. Kept free of
// React/DOM so it can be unit tested and the timing tuned in one place.

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 10;

/** Fuse range: long enough to pass around a circle, short enough to stay tense. */
export const FUSE_MIN_MS = 10_000;
export const FUSE_MAX_MS = 30_000;

/** Beep interval at the start and at the very end of the fuse. */
const TICK_SLOW_MS = 650;
const TICK_FAST_MS = 110;

export type Rng = () => number;

/** Hidden fuse length for one round. Nobody — not even the grown-up — knows it. */
export function randomFuseMs(rng: Rng = Math.random): number {
  return Math.round(FUSE_MIN_MS + rng() * (FUSE_MAX_MS - FUSE_MIN_MS));
}

/** 0 → just lit, 1 → about to burn. */
export function fuseProgress(elapsedMs: number, fuseMs: number): number {
  if (fuseMs <= 0) return 1;
  return Math.min(1, Math.max(0, elapsedMs / fuseMs));
}

/**
 * Beeps speed up as the fuse burns. Eased so the first half feels calm and
 * the last few seconds get frantic — that's where the screaming happens.
 */
export function tickIntervalMs(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  const eased = p * p;
  return Math.round(TICK_SLOW_MS - (TICK_SLOW_MS - TICK_FAST_MS) * eased);
}

export type Heat = "warm" | "hot" | "sizzling";

export function heatLevel(progress: number): Heat {
  if (progress < 0.45) return "warm";
  if (progress < 0.8) return "hot";
  return "sizzling";
}

/** Trims, drops blanks and case-insensitive duplicates, and caps the roster. */
export function normalizePlayers(names: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of names) {
    const name = raw.trim().slice(0, 20);
    const key = name.toLowerCase();
    if (!name || seen.has(key)) continue;
    seen.add(key);
    out.push(name);
    if (out.length === MAX_PLAYERS) break;
  }
  return out;
}

/** Removes the burned player. Returns the winner once one player is left. */
export function eliminate(
  players: string[],
  burned: string,
): { remaining: string[]; winner: string | null } {
  const remaining = players.filter((p) => p !== burned);
  return { remaining, winner: remaining.length === 1 ? remaining[0] : null };
}

export const BURN_LINES = [
  "Ouch! Too hot to handle!",
  "Sizzle! That potato is baked!",
  "Hot hot HOT!",
  "Mashed it!",
  "Oops — you got french-fried!",
  "Spud-denly… it popped!",
];

export function pickBurnLine(rng: Rng = Math.random): string {
  return BURN_LINES[Math.floor(rng() * BURN_LINES.length) % BURN_LINES.length];
}

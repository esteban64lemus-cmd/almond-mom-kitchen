/**
 * ADHD gamification engine: sleep-based stamina + daily micro-quests.
 *
 * Pure functions only (no browser APIs) so it can run on server or client
 * and stay easy to test. Copy follows the AI safety rails: no restriction,
 * calorie, or shame language — quests are invitations, never obligations.
 */

export type QuestCategory = "focus" | "body" | "home" | "connect";
export type StaminaTier = "gentle" | "steady" | "bright";

export interface Quest {
  id: string;
  title: string;
  hint: string;
  category: QuestCategory;
  /** 1 = two-minute task, 3 = needs real focus. */
  effort: 1 | 2 | 3;
}

export interface Stamina {
  score: number; // 0–100
  tier: StaminaTier;
  label: string;
  message: string;
}

export const QUEST_POOL: Quest[] = [
  // focus
  { id: "focus-one-tab", title: "Close every tab but one", hint: "Bookmark the rest. Future you can find them.", category: "focus", effort: 1 },
  { id: "focus-brain-dump", title: "Two-minute brain dump", hint: "Write down everything buzzing in your head. No sorting.", category: "focus", effort: 1 },
  { id: "focus-pick-three", title: "Pick today's three", hint: "Choose three things that would make today feel good.", category: "focus", effort: 2 },
  { id: "focus-timer", title: "One 15-minute focus sprint", hint: "Set a timer, start the smallest piece, stop when it rings.", category: "focus", effort: 3 },
  { id: "focus-inbox", title: "Answer one message you've been avoiding", hint: "A short reply counts. \"Got it, thank you!\" is a full sentence.", category: "focus", effort: 3 },
  // body
  { id: "body-water", title: "Fill your water bottle", hint: "Put it somewhere you'll see it.", category: "body", effort: 1 },
  { id: "body-stretch", title: "Stretch for one song", hint: "Any song, any stretch. Your body will thank you.", category: "body", effort: 1 },
  { id: "body-sunlight", title: "Step outside for five minutes", hint: "Daylight helps your body clock find its rhythm.", category: "body", effort: 2 },
  { id: "body-colorful-plate", title: "Add something colorful to a meal", hint: "Berries, greens, peppers — whatever sounds good.", category: "body", effort: 2 },
  { id: "body-walk", title: "Take a 15-minute walk", hint: "Podcast optional. Wandering encouraged.", category: "body", effort: 3 },
  // home
  { id: "home-one-surface", title: "Clear one surface", hint: "Just one. The nightstand counts.", category: "home", effort: 1 },
  { id: "home-dishes", title: "Wash five dishes", hint: "Five, then you're free to stop.", category: "home", effort: 1 },
  { id: "home-laundry", title: "Start a load of laundry", hint: "Starting is the whole quest. Folding is a bonus.", category: "home", effort: 2 },
  { id: "home-pantry", title: "Check what's in your pantry", hint: "Note one ingredient to use up this week.", category: "home", effort: 2 },
  { id: "home-reset", title: "10-minute room reset", hint: "Put things back where they live. Music helps.", category: "home", effort: 3 },
  // connect
  { id: "connect-emoji", title: "Send someone a heart emoji", hint: "No message needed. It still lands.", category: "connect", effort: 1 },
  { id: "connect-thanks", title: "Thank someone specifically", hint: "Name the exact thing they did.", category: "connect", effort: 2 },
  { id: "connect-voice-note", title: "Send a voice note to a friend", hint: "Thirty seconds of \"thinking of you\" is plenty.", category: "connect", effort: 2 },
  { id: "connect-plan", title: "Put a plan with a friend on the calendar", hint: "Coffee, a walk, a call — pick a real date.", category: "connect", effort: 3 },
];

export const SCRAP_NOTES: string[] = [
  "Rest is part of the recipe, sweetheart.",
  "You don't have to finish everything. Just begin one thing.",
  "A glass of water and a deep breath fix more than you'd think.",
  "Done is lovelier than perfect.",
  "Be as gentle with yourself as you are with the people you love.",
  "Small steps still get you across the kitchen.",
  "If it takes two minutes, do it now. If not, write it down and let it go.",
  "Eat something warm today. You deserve to be looked after.",
];

const TIER_QUEST_COUNT: Record<StaminaTier, number> = {
  gentle: 2,
  steady: 3,
  bright: 4,
};

const TIER_MAX_EFFORT: Record<StaminaTier, Quest["effort"]> = {
  gentle: 1,
  steady: 2,
  bright: 3,
};

/**
 * Estimate today's stamina from last night's sleep.
 * @param sleepHours hours slept (clamped to 0–14)
 * @param quality optional 1–5 self-rating; defaults to 3
 */
export function calculateStamina(sleepHours: number, quality = 3): Stamina {
  const hours = clamp(Number.isFinite(sleepHours) ? sleepHours : 0, 0, 14);
  const q = clamp(Math.round(quality), 1, 5);

  // Ramp up to a full score at 7.5h; ease off slightly past 9.5h since
  // oversleeping often comes with grogginess.
  let hoursScore = Math.min(1, hours / 7.5);
  if (hours > 9.5) hoursScore = Math.max(0.75, 1 - (hours - 9.5) * 0.05);

  const qualityMultiplier = 0.7 + (q - 1) * 0.075; // 0.7 → 1.0
  const score = Math.round(hoursScore * qualityMultiplier * 100);

  if (score < 40) {
    return {
      score,
      tier: "gentle",
      label: "Gentle day",
      message: "Low battery today — that's okay. Two tiny quests, then rest counts as a win.",
    };
  }
  if (score < 70) {
    return {
      score,
      tier: "steady",
      label: "Steady day",
      message: "You've got a solid middle gear. Pick what feels doable and skip the rest.",
    };
  }
  return {
    score,
    tier: "bright",
    label: "Bright day",
    message: "Your tank is full. Spend it on what matters to you — and save a little for tomorrow.",
  };
}

/**
 * Deterministic quest list for a given date + tier: the same day always
 * yields the same quests, so a refresh never reshuffles someone's plan.
 * Tries to cover distinct categories before repeating one.
 */
export function getDailyQuests(dateKey: string, tier: StaminaTier): Quest[] {
  const rand = mulberry32(hashString(`${dateKey}:${tier}`));
  const eligible = QUEST_POOL.filter((q) => q.effort <= TIER_MAX_EFFORT[tier]);
  const shuffled = shuffle(eligible, rand);
  const count = TIER_QUEST_COUNT[tier];

  const picked: Quest[] = [];
  const usedCategories = new Set<QuestCategory>();
  for (const quest of shuffled) {
    if (picked.length === count) break;
    if (!usedCategories.has(quest.category)) {
      picked.push(quest);
      usedCategories.add(quest.category);
    }
  }
  for (const quest of shuffled) {
    if (picked.length === count) break;
    if (!picked.includes(quest)) picked.push(quest);
  }
  return picked;
}

export function getDailyNote(dateKey: string): string {
  const rand = mulberry32(hashString(`note:${dateKey}`));
  return SCRAP_NOTES[Math.floor(rand() * SCRAP_NOTES.length)];
}

export function questXp(quest: Quest): number {
  return quest.effort * 10;
}

/** Local-time YYYY-MM-DD, so "today" matches the user's wall clock. */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Consecutive days (ending today, or yesterday if today has no completions
 * yet) with at least one quest done. Not breaking the streak today keeps
 * the morning from opening with a zero.
 */
export function calculateStreak(completedDates: Iterable<string>, today: Date): number {
  const done = new Set(completedDates);
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!done.has(toDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (done.has(toDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

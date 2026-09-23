import {
  QUEST_POOL,
  SCRAP_NOTES,
  calculateStamina,
  calculateStreak,
  getDailyNote,
  getDailyQuests,
  toDateKey,
} from "./quests";

describe("calculateStamina", () => {
  it("maps short sleep to a gentle day", () => {
    expect(calculateStamina(3).tier).toBe("gentle");
  });

  it("maps average sleep to a steady day", () => {
    expect(calculateStamina(6, 3).tier).toBe("steady");
  });

  it("maps full, good sleep to a bright day", () => {
    const s = calculateStamina(8, 5);
    expect(s.tier).toBe("bright");
    expect(s.score).toBe(100);
  });

  it("clamps out-of-range and invalid input", () => {
    expect(calculateStamina(-4).score).toBe(0);
    expect(calculateStamina(Number.NaN).score).toBe(0);
    expect(calculateStamina(40, 9).score).toBeGreaterThan(0);
  });

  it("eases off slightly for oversleeping", () => {
    expect(calculateStamina(12, 5).score).toBeLessThan(calculateStamina(8, 5).score);
  });
});

describe("getDailyQuests", () => {
  it("is deterministic for the same day and tier", () => {
    expect(getDailyQuests("2026-09-22", "steady")).toEqual(
      getDailyQuests("2026-09-22", "steady"),
    );
  });

  it("returns more quests on higher-stamina days", () => {
    expect(getDailyQuests("2026-09-22", "gentle")).toHaveLength(2);
    expect(getDailyQuests("2026-09-22", "steady")).toHaveLength(3);
    expect(getDailyQuests("2026-09-22", "bright")).toHaveLength(4);
  });

  it("only offers two-minute quests on gentle days", () => {
    for (const q of getDailyQuests("2026-09-22", "gentle")) {
      expect(q.effort).toBe(1);
    }
  });

  it("covers distinct categories", () => {
    const quests = getDailyQuests("2026-09-22", "bright");
    expect(new Set(quests.map((q) => q.category)).size).toBe(4);
  });
});

describe("copy safety rails", () => {
  const banned = /calorie|diet|skinny|cheat|guilt|lazy|fail|should have|restrict/i;

  it("keeps quests and notes free of restriction or shame language", () => {
    for (const q of QUEST_POOL) {
      expect(`${q.title} ${q.hint}`).not.toMatch(banned);
    }
    for (const note of SCRAP_NOTES) {
      expect(note).not.toMatch(banned);
    }
  });

  it("picks a note from the pool", () => {
    expect(SCRAP_NOTES).toContain(getDailyNote("2026-09-22"));
  });
});

describe("calculateStreak", () => {
  const today = new Date(2026, 8, 22);

  it("counts consecutive days ending today", () => {
    expect(calculateStreak(["2026-09-22", "2026-09-21", "2026-09-20"], today)).toBe(3);
  });

  it("does not break the streak before today's first quest", () => {
    expect(calculateStreak(["2026-09-21", "2026-09-20"], today)).toBe(2);
  });

  it("stops at a gap", () => {
    expect(calculateStreak(["2026-09-22", "2026-09-20"], today)).toBe(1);
  });

  it("uses local dates", () => {
    expect(toDateKey(today)).toBe("2026-09-22");
  });
});

import {
  BURN_LINES,
  FUSE_MAX_MS,
  FUSE_MIN_MS,
  MAX_PLAYERS,
  eliminate,
  fuseProgress,
  heatLevel,
  normalizePlayers,
  pickBurnLine,
  randomFuseMs,
  tickIntervalMs,
} from "./hot-potato";

describe("randomFuseMs", () => {
  it("stays within the fuse range", () => {
    expect(randomFuseMs(() => 0)).toBe(FUSE_MIN_MS);
    expect(randomFuseMs(() => 0.999999)).toBeLessThanOrEqual(FUSE_MAX_MS);
    expect(randomFuseMs(() => 0.5)).toBe((FUSE_MIN_MS + FUSE_MAX_MS) / 2);
  });
});

describe("fuseProgress", () => {
  it("clamps to 0..1", () => {
    expect(fuseProgress(-5, 1000)).toBe(0);
    expect(fuseProgress(500, 1000)).toBe(0.5);
    expect(fuseProgress(5000, 1000)).toBe(1);
    expect(fuseProgress(10, 0)).toBe(1);
  });
});

describe("tickIntervalMs", () => {
  it("speeds up as the fuse burns", () => {
    const start = tickIntervalMs(0);
    const mid = tickIntervalMs(0.5);
    const end = tickIntervalMs(1);
    expect(start).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(end);
    expect(end).toBe(110);
  });
});

describe("heatLevel", () => {
  it("escalates from warm to sizzling", () => {
    expect(heatLevel(0.1)).toBe("warm");
    expect(heatLevel(0.6)).toBe("hot");
    expect(heatLevel(0.95)).toBe("sizzling");
  });
});

describe("normalizePlayers", () => {
  it("trims, drops blanks and duplicates", () => {
    expect(normalizePlayers([" Mia ", "", "mia", "Leo"])).toEqual(["Mia", "Leo"]);
  });

  it("caps the roster size", () => {
    const many = Array.from({ length: 20 }, (_, i) => `Kid ${i}`);
    expect(normalizePlayers(many)).toHaveLength(MAX_PLAYERS);
  });
});

describe("eliminate", () => {
  it("removes the burned player and names a winner at one left", () => {
    expect(eliminate(["A", "B", "C"], "B")).toEqual({ remaining: ["A", "C"], winner: null });
    expect(eliminate(["A", "C"], "A")).toEqual({ remaining: ["C"], winner: "C" });
  });
});

describe("pickBurnLine", () => {
  it("always returns a line", () => {
    expect(BURN_LINES).toContain(pickBurnLine(() => 0));
    expect(BURN_LINES).toContain(pickBurnLine(() => 0.9999));
  });
});

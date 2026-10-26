import { parseIngredientLine } from "@/lib/shoppable";
import type { Recipe } from "@/data/recipes";

export type Macros = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const EMPTY_MACROS: Macros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

/**
 * Display-only day budget. Recipes do not store a personal target yet
 * (health sync is out of scope), so Remaining is budget minus the plate.
 */
export const DAY_BUDGET: Macros = {
  kcal: 2000,
  protein: 120,
  carbs: 220,
  fat: 65,
};

export type Aisle = "Produce" | "Meat" | "Pantry" | "Dairy";

export const AISLES: Aisle[] = ["Produce", "Meat", "Pantry", "Dairy"];

export type StoreId = "target" | "walmart" | "instacart";

export type StoreOption = {
  id: StoreId;
  name: string;
  aisleOrder: Aisle[];
  searchUrl: (query: string) => string;
};

export const STORES: StoreOption[] = [
  {
    id: "target",
    name: "Target",
    aisleOrder: ["Produce", "Meat", "Dairy", "Pantry"],
    searchUrl: (query) =>
      `https://www.target.com/s?searchTerm=${encodeURIComponent(query)}`,
  },
  {
    id: "walmart",
    name: "Walmart",
    aisleOrder: ["Pantry", "Dairy", "Produce", "Meat"],
    searchUrl: (query) =>
      `https://www.walmart.com/search?q=${encodeURIComponent(query)}`,
  },
  {
    id: "instacart",
    name: "Instacart",
    aisleOrder: ["Produce", "Dairy", "Meat", "Pantry"],
    searchUrl: (query) =>
      `https://www.instacart.com/store/s?k=${encodeURIComponent(query)}`,
  },
];

export type MealFilter = "Breakfast" | "Bowls" | "Quick 15" | "High Protein";

export const MEAL_FILTERS: MealFilter[] = [
  "Breakfast",
  "Bowls",
  "Quick 15",
  "High Protein",
];

/**
 * Ingredient photos are not stored on recipes.
 * A keyword in the ingredient name maps to a stable Unsplash food photo.
 * Unknown foods use FALLBACK_INGREDIENT_PHOTO (a generic plated still life).
 */
export const FALLBACK_INGREDIENT_PHOTO =
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=240&q=80";

const INGREDIENT_PHOTOS: { keyword: string; src: string }[] = [
  { keyword: "avocado oil", src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=240&q=80" },
  { keyword: "olive oil", src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=240&q=80" },
  { keyword: "coconut oil", src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=240&q=80" },
  { keyword: "sesame oil", src: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=240&q=80" },
  { keyword: "almond milk", src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=240&q=80" },
  { keyword: "oat milk", src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=240&q=80" },
  { keyword: "coconut milk", src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=240&q=80" },
  { keyword: "hemp milk", src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=240&q=80" },
  { keyword: "almond flour", src: "https://images.unsplash.com/photo-1621188988909-fbef0a2a1010?auto=format&fit=crop&w=240&q=80" },
  { keyword: "almond butter", src: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=240&q=80" },
  { keyword: "chicken", src: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=240&q=80" },
  { keyword: "turkey", src: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=240&q=80" },
  { keyword: "salmon", src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=240&q=80" },
  { keyword: "beef", src: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=240&q=80" },
  { keyword: "broth", src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=240&q=80" },
  { keyword: "spinach", src: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=240&q=80" },
  { keyword: "kale", src: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=240&q=80" },
  { keyword: "lettuce", src: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=240&q=80" },
  { keyword: "arugula", src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=80" },
  { keyword: "lemon", src: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=240&q=80" },
  { keyword: "avocado", src: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=240&q=80" },
  { keyword: "quinoa", src: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=240&q=80" },
  { keyword: "yogurt", src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=240&q=80" },
  { keyword: "berry", src: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=240&q=80" },
  { keyword: "berr", src: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=240&q=80" },
  { keyword: "raspberry", src: "https://images.unsplash.com/photo-1577069866923-ac8da1a156f0?auto=format&fit=crop&w=240&q=80" },
  { keyword: "strawberry", src: "https://images.unsplash.com/photo-1550258114-b8a27a03f198?auto=format&fit=crop&w=240&q=80" },
  { keyword: "banana", src: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=240&q=80" },
  { keyword: "mango", src: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=240&q=80" },
  { keyword: "cauliflower", src: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=240&q=80" },
  { keyword: "cucumber", src: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=240&q=80" },
  { keyword: "zucchini", src: "https://images.unsplash.com/photo-1596181525841-8e8ba4a4e6c4?auto=format&fit=crop&w=240&q=80" },
  { keyword: "celery", src: "https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?auto=format&fit=crop&w=240&q=80" },
  { keyword: "beet", src: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=240&q=80" },
  { keyword: "ginger", src: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=240&q=80" },
  { keyword: "garlic", src: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=240&q=80" },
  { keyword: "basil", src: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=240&q=80" },
  { keyword: "dill", src: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=240&q=80" },
  { keyword: "onion", src: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=240&q=80" },
  { keyword: "egg", src: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=240&q=80" },
  { keyword: "oat", src: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=240&q=80" },
  { keyword: "chia", src: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=240&q=80" },
  { keyword: "flax", src: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=240&q=80" },
  { keyword: "walnut", src: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=240&q=80" },
  { keyword: "pecan", src: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=240&q=80" },
  { keyword: "date", src: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=240&q=80" },
  { keyword: "honey", src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=240&q=80" },
  { keyword: "maple", src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=240&q=80" },
  { keyword: "cacao", src: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=240&q=80" },
  { keyword: "chocolate", src: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=240&q=80" },
  { keyword: "matcha", src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=240&q=80" },
  { keyword: "coconut", src: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=240&q=80" },
  { keyword: "nori", src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=240&q=80" },
  { keyword: "chestnut", src: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=240&q=80" },
  { keyword: "vinegar", src: "https://images.unsplash.com/photo-1606851094655-b7b4e0b91c18?auto=format&fit=crop&w=240&q=80" },
  { keyword: "apple cider", src: "https://images.unsplash.com/photo-1606851094655-b7b4e0b91c18?auto=format&fit=crop&w=240&q=80" },
  { keyword: "salt", src: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=240&q=80" },
  { keyword: "pepper", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=240&q=80" },
  { keyword: "cinnamon", src: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?auto=format&fit=crop&w=240&q=80" },
  { keyword: "turmeric", src: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=240&q=80" },
  { keyword: "vanilla", src: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?auto=format&fit=crop&w=240&q=80" },
  { keyword: "water", src: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=240&q=80" },
  { keyword: "ice", src: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=240&q=80" },
].sort((a, b) => b.keyword.length - a.keyword.length);

const MACRO_TABLE: { keyword: string; macros: Macros }[] = [
  { keyword: "chicken", macros: { kcal: 180, protein: 31, carbs: 0, fat: 4 } },
  { keyword: "turkey", macros: { kcal: 170, protein: 28, carbs: 0, fat: 6 } },
  { keyword: "salmon", macros: { kcal: 220, protein: 24, carbs: 0, fat: 14 } },
  { keyword: "beef", macros: { kcal: 80, protein: 8, carbs: 0, fat: 4 } },
  { keyword: "broth", macros: { kcal: 40, protein: 6, carbs: 2, fat: 1 } },
  { keyword: "egg", macros: { kcal: 140, protein: 12, carbs: 1, fat: 10 } },
  { keyword: "collagen", macros: { kcal: 70, protein: 18, carbs: 0, fat: 0 } },
  { keyword: "olive oil", macros: { kcal: 120, protein: 0, carbs: 0, fat: 14 } },
  { keyword: "avocado oil", macros: { kcal: 120, protein: 0, carbs: 0, fat: 14 } },
  { keyword: "coconut oil", macros: { kcal: 120, protein: 0, carbs: 0, fat: 14 } },
  { keyword: "sesame oil", macros: { kcal: 120, protein: 0, carbs: 0, fat: 14 } },
  { keyword: "mayo", macros: { kcal: 90, protein: 0, carbs: 0, fat: 10 } },
  { keyword: "avocado", macros: { kcal: 160, protein: 2, carbs: 9, fat: 15 } },
  { keyword: "almond butter", macros: { kcal: 190, protein: 7, carbs: 6, fat: 17 } },
  { keyword: "walnut", macros: { kcal: 180, protein: 4, carbs: 4, fat: 18 } },
  { keyword: "pecan", macros: { kcal: 180, protein: 3, carbs: 4, fat: 18 } },
  { keyword: "chia", macros: { kcal: 120, protein: 4, carbs: 10, fat: 8 } },
  { keyword: "flax", macros: { kcal: 110, protein: 4, carbs: 6, fat: 8 } },
  { keyword: "almond flour", macros: { kcal: 160, protein: 6, carbs: 6, fat: 14 } },
  { keyword: "almond milk", macros: { kcal: 30, protein: 1, carbs: 1, fat: 2 } },
  { keyword: "oat milk", macros: { kcal: 40, protein: 1, carbs: 6, fat: 1 } },
  { keyword: "coconut milk", macros: { kcal: 80, protein: 1, carbs: 2, fat: 8 } },
  { keyword: "hemp milk", macros: { kcal: 60, protein: 2, carbs: 1, fat: 5 } },
  { keyword: "quinoa", macros: { kcal: 170, protein: 6, carbs: 30, fat: 3 } },
  { keyword: "oat", macros: { kcal: 150, protein: 5, carbs: 27, fat: 3 } },
  { keyword: "banana", macros: { kcal: 90, protein: 1, carbs: 23, fat: 0 } },
  { keyword: "date", macros: { kcal: 130, protein: 1, carbs: 32, fat: 0 } },
  { keyword: "honey", macros: { kcal: 60, protein: 0, carbs: 17, fat: 0 } },
  { keyword: "maple", macros: { kcal: 50, protein: 0, carbs: 13, fat: 0 } },
  { keyword: "berry", macros: { kcal: 40, protein: 1, carbs: 9, fat: 0 } },
  { keyword: "berr", macros: { kcal: 40, protein: 1, carbs: 9, fat: 0 } },
  { keyword: "raspberry", macros: { kcal: 30, protein: 1, carbs: 7, fat: 0 } },
  { keyword: "mango", macros: { kcal: 50, protein: 1, carbs: 12, fat: 0 } },
  { keyword: "cauliflower", macros: { kcal: 30, protein: 2, carbs: 5, fat: 0 } },
  { keyword: "zucchini", macros: { kcal: 20, protein: 1, carbs: 4, fat: 0 } },
  { keyword: "kale", macros: { kcal: 30, protein: 2, carbs: 4, fat: 0 } },
  { keyword: "spinach", macros: { kcal: 15, protein: 2, carbs: 2, fat: 0 } },
  { keyword: "lettuce", macros: { kcal: 10, protein: 1, carbs: 2, fat: 0 } },
  { keyword: "arugula", macros: { kcal: 10, protein: 1, carbs: 2, fat: 0 } },
  { keyword: "cucumber", macros: { kcal: 15, protein: 1, carbs: 3, fat: 0 } },
  { keyword: "celery", macros: { kcal: 15, protein: 1, carbs: 3, fat: 0 } },
  { keyword: "beet", macros: { kcal: 50, protein: 2, carbs: 11, fat: 0 } },
  { keyword: "lemon", macros: { kcal: 10, protein: 0, carbs: 3, fat: 0 } },
  { keyword: "ginger", macros: { kcal: 5, protein: 0, carbs: 1, fat: 0 } },
  { keyword: "garlic", macros: { kcal: 5, protein: 0, carbs: 1, fat: 0 } },
  { keyword: "onion", macros: { kcal: 10, protein: 0, carbs: 2, fat: 0 } },
  { keyword: "cacao", macros: { kcal: 40, protein: 2, carbs: 6, fat: 2 } },
  { keyword: "chocolate", macros: { kcal: 70, protein: 1, carbs: 8, fat: 4 } },
  { keyword: "matcha", macros: { kcal: 5, protein: 1, carbs: 1, fat: 0 } },
  { keyword: "coconut", macros: { kcal: 70, protein: 1, carbs: 3, fat: 7 } },
  { keyword: "nori", macros: { kcal: 10, protein: 1, carbs: 1, fat: 0 } },
  { keyword: "chestnut", macros: { kcal: 40, protein: 1, carbs: 9, fat: 0 } },
].sort((a, b) => b.keyword.length - a.keyword.length);

const FALLBACK_MACROS: Macros = { kcal: 25, protein: 1, carbs: 3, fat: 1 };

const PANTRY_PATTERN =
  /oil|flour|oat|quinoa|chia|flax|honey|maple|vinegar|cacao|cocoa|chocolate|nori|sesame|amino|yeast|matcha|maca|spirulina|stevia|date|walnut|pecan|salt|pepper|cinnamon|turmeric|vanilla|baking|water|ice|honey|syrup|powder|seed|collagen|mayo|mustard/;

const MEAT_PATTERN = /chicken|turkey|salmon|beef|fish|tuna|shrimp|pork/;

const PRODUCE_PATTERN =
  /kale|spinach|lemon|avocado|berry|raspberry|banana|zucchini|cucumber|cauliflower|celery|beet|arugula|lettuce|mango|ginger|garlic|onion|basil|dill|apple|herb|greens/;

export function addMacros(a: Macros, b: Macros): Macros {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

export function scaleMacros(macros: Macros, factor: number): Macros {
  const round = (value: number) => Math.max(0, Math.round(value * factor));
  return {
    kcal: round(macros.kcal),
    protein: round(macros.protein),
    carbs: round(macros.carbs),
    fat: round(macros.fat),
  };
}

export function remainingMacros(today: Macros, budget: Macros = DAY_BUDGET): Macros {
  return {
    kcal: Math.max(0, budget.kcal - today.kcal),
    protein: Math.max(0, budget.protein - today.protein),
    carbs: Math.max(0, budget.carbs - today.carbs),
    fat: Math.max(0, budget.fat - today.fat),
  };
}

export function ingredientPhoto(name: string): string {
  const haystack = name.toLowerCase();
  const match = INGREDIENT_PHOTOS.find((entry) => haystack.includes(entry.keyword));
  return match?.src ?? FALLBACK_INGREDIENT_PHOTO;
}

export function macrosForIngredient(name: string): Macros {
  const haystack = name.toLowerCase();
  const match = MACRO_TABLE.find((entry) => haystack.includes(entry.keyword));
  return match?.macros ?? FALLBACK_MACROS;
}

export function aisleFor(name: string): Aisle {
  const haystack = name.toLowerCase();
  if (/avocado oil|olive oil|coconut oil|sesame oil|almond flour|almond butter/.test(haystack)) {
    return "Pantry";
  }
  if (/\bmilk\b|yogurt|cheese|feta|\begg/.test(haystack)) return "Dairy";
  if (MEAT_PATTERN.test(haystack)) return "Meat";
  if (PRODUCE_PATTERN.test(haystack)) return "Produce";
  if (PANTRY_PATTERN.test(haystack)) return "Pantry";
  return "Pantry";
}

export function storeById(id: StoreId): StoreOption {
  const store = STORES.find((entry) => entry.id === id);
  return store ?? STORES[0];
}

export function minutesFrom(prep: string, cook: string): number {
  const read = (value: string) => {
    const match = value.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  };
  return read(prep) + read(cook);
}

export function totalTimeLabel(prep: string, cook: string): string {
  const total = minutesFrom(prep, cook);
  return total > 0 ? `${total} min` : prep;
}

export function macrosForRecipe(recipe: Pick<Recipe, "ingredients">): Macros {
  return recipe.ingredients.reduce((sum, line) => {
    const items = parseIngredientLine(line);
    if (items.length === 0) return addMacros(sum, macrosForIngredient(line));
    return items.reduce((next, item) => addMacros(next, macrosForIngredient(item.productName)), sum);
  }, EMPTY_MACROS);
}

export function matchesFilter(recipe: Recipe, filter: MealFilter | null): boolean {
  if (!filter) return true;
  const title = recipe.title.toLowerCase();
  const tags = recipe.dietaryTags.join(" ").toLowerCase();
  if (filter === "Breakfast") {
    return /pudding|pancake|oat|smoothie|latte|elixir|bread|juice|matcha|chia|maca|golden/.test(title);
  }
  if (filter === "Bowls") return /bowl|salad|sushi|wrap|boat/.test(title);
  if (filter === "Quick 15") return minutesFrom(recipe.prepTime, recipe.cookTime) <= 15;
  return macrosForRecipe(recipe).protein >= 25 || tags.includes("protein");
}

export function seasonIngredients(list: Recipe[], limit = 8): { name: string }[] {
  const seen = new Set<string>();
  const picks: { name: string }[] = [];
  for (const recipe of list) {
    for (const line of recipe.ingredients) {
      for (const item of parseIngredientLine(line)) {
        if (aisleFor(item.productName) !== "Produce") continue;
        const key = item.productName.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        picks.push({ name: item.productName });
        if (picks.length >= limit) return picks;
      }
    }
  }
  return picks;
}

export function shopItemsForRecipe(recipe: Pick<Recipe, "title" | "ingredients">) {
  return recipe.ingredients.flatMap((line) =>
    parseIngredientLine(line).map((item) => ({
      id: item.id,
      name: item.productName,
      amount: item.amount,
      priceCents: item.priceCents,
      recipeTitle: recipe.title,
    })),
  );
}

export function plateMacros(list: Recipe[], count = 3): Macros {
  return list.slice(0, count).reduce((sum, recipe) => addMacros(sum, macrosForRecipe(recipe)), EMPTY_MACROS);
}

const LABEL_LEAD =
  /^(organic|fresh|freshly|ripe|raw|riced|ground|unsweetened|blanched|wild-caught|wild|frozen|filtered|extra|virgin|high-quality|grass-fed|pasture-raised|ceremonial|grade|room|temperature)\s+/i;

export function shortIngredientLabel(name: string): string {
  let rest = name.trim();
  let previous = "";
  while (rest && rest !== previous) {
    previous = rest;
    rest = rest.replace(LABEL_LEAD, "");
  }
  const word = rest.split(/[\s,]+/).find(Boolean) ?? name;
  const clean = word.replace(/[^A-Za-z-]/g, "");
  return (clean || name).slice(0, 12);
}

export function formatMacro(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

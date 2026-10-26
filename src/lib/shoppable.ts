export type ShoppableItem = {
  id: string;
  productName: string;
  amount: string;
  recipeLine: string;
  optional: boolean;
  priceCents: number;
};

const UNITS = new Set([
  "tablespoon",
  "tablespoons",
  "tbsp",
  "teaspoon",
  "teaspoons",
  "tsp",
  "cup",
  "cups",
  "ounce",
  "ounces",
  "oz",
  "pound",
  "pounds",
  "lb",
  "lbs",
  "clove",
  "cloves",
  "scoop",
  "scoops",
  "can",
  "cans",
  "bunch",
  "bunches",
  "head",
  "heads",
  "slice",
  "slices",
  "handful",
  "handfuls",
]);

const SIZES = new Set(["large", "medium", "small"]);

const PLURALS: Record<string, string> = {
  avocados: "avocado",
  bananas: "banana",
  beets: "beet",
  berries: "berry",
  chestnuts: "chestnut",
  chips: "chip",
  cubes: "cube",
  dates: "date",
  eggs: "egg",
  flakes: "flake",
  oats: "oat",
  onions: "onion",
  pecans: "pecan",
  seeds: "seed",
  sheets: "sheet",
  walnuts: "walnut",
  zucchinis: "zucchini",
};

const PREP_TAIL =
  /,\s*(?:halved and pitted|de-stemmed and chopped|leaves separated|cut into florets|washed thoroughly|chopped|julienned|sliced|minced|spiralized|grated|drained|mashed|pitted|diced|halved|scrubbed|washed)\s*$/i;

const LEADING_PREP =
  /^(?:freshly grated|freshly minced|room temperature|melted|frothed|sliced|minced|diced)\s+/i;

const PRICE_TABLE: { keyword: string; cents: number }[] = [
  { keyword: "avocado oil mayo", cents: 799 },
  { keyword: "nutritional yeast", cents: 899 },
  { keyword: "water chestnut", cents: 349 },
  { keyword: "coconut aminos", cents: 799 },
  { keyword: "apple cider", cents: 799 },
  { keyword: "almond butter", cents: 1099 },
  { keyword: "almond flour", cents: 1199 },
  { keyword: "almond milk", cents: 429 },
  { keyword: "avocado oil", cents: 999 },
  { keyword: "baking powder", cents: 349 },
  { keyword: "black pepper", cents: 449 },
  { keyword: "butter lettuce", cents: 349 },
  { keyword: "coconut milk", cents: 349 },
  { keyword: "coconut oil", cents: 999 },
  { keyword: "hemp milk", cents: 599 },
  { keyword: "olive oil", cents: 1299 },
  { keyword: "rolled oat", cents: 499 },
  { keyword: "sesame oil", cents: 799 },
  { keyword: "sesame seed", cents: 499 },
  { keyword: "baking soda", cents: 199 },
  { keyword: "bone broth", cents: 1099 },
  { keyword: "cauliflower", cents: 399 },
  { keyword: "green onion", cents: 149 },
  { keyword: "himalayan", cents: 499 },
  { keyword: "oat milk", cents: 449 },
  { keyword: "sea salt", cents: 499 },
  { keyword: "spirulina", cents: 1899 },
  { keyword: "balsamic", cents: 799 },
  { keyword: "chocolate", cents: 599 },
  { keyword: "cinnamon", cents: 599 },
  { keyword: "coconut", cents: 499 },
  { keyword: "collagen", cents: 3299 },
  { keyword: "cucumber", cents: 179 },
  { keyword: "raspberry", cents: 549 },
  { keyword: "raspberr", cents: 549 },
  { keyword: "turmeric", cents: 649 },
  { keyword: "vanilla", cents: 1199 },
  { keyword: "arugula", cents: 349 },
  { keyword: "avocado", cents: 199 },
  { keyword: "banana", cents: 69 },
  { keyword: "basil", cents: 299 },
  { keyword: "celery", cents: 299 },
  { keyword: "flax", cents: 799 },
  { keyword: "garlic", cents: 199 },
  { keyword: "ginger", cents: 299 },
  { keyword: "honey", cents: 899 },
  { keyword: "lemon", cents: 99 },
  { keyword: "lettuce", cents: 299 },
  { keyword: "maca", cents: 1499 },
  { keyword: "mango", cents: 249 },
  { keyword: "maple", cents: 999 },
  { keyword: "matcha", cents: 2499 },
  { keyword: "mustard", cents: 399 },
  { keyword: "salmon", cents: 1899 },
  { keyword: "stevia", cents: 699 },
  { keyword: "turkey", cents: 899 },
  { keyword: "walnut", cents: 899 },
  { keyword: "beet", cents: 299 },
  { keyword: "cacao", cents: 1299 },
  { keyword: "cayenne", cents: 499 },
  { keyword: "chia", cents: 749 },
  { keyword: "date", cents: 799 },
  { keyword: "dill", cents: 249 },
  { keyword: "kale", cents: 349 },
  { keyword: "nori", cents: 649 },
  { keyword: "salt", cents: 399 },
  { keyword: "berry", cents: 549 },
  { keyword: "berr", cents: 549 },
  { keyword: "egg", cents: 649 },
  { keyword: "ice", cents: 299 },
  { keyword: "oat", cents: 499 },
  { keyword: "water", cents: 199 },
].sort((a, b) => b.keyword.length - a.keyword.length);

const QUANTITY =
  /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(?:\s+([a-zA-Z][a-zA-Z-]*))?(?:\s+(.*))?$/;

function titleCase(value: string): string {
  const small = new Set(["of", "and", "or", "with", "the", "a"]);
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const cased = word
        .split("-")
        .map((part) =>
          part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part,
        )
        .join("-");
      if (index > 0 && small.has(cased.toLowerCase())) return cased.toLowerCase();
      return cased;
    })
    .join(" ");
}

function productId(name: string): string {
  const parts = name.split(" ");
  const last = parts[parts.length - 1]?.toLowerCase();
  if (last && PLURALS[last]) {
    parts[parts.length - 1] = PLURALS[last];
  }
  return parts
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function priceFor(name: string): number {
  const haystack = name.toLowerCase();
  const match = PRICE_TABLE.find((entry) => haystack.includes(entry.keyword));
  if (match) return match.cents;
  let hash = 0;
  for (const char of productId(name)) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const raw = 499 + (hash % 800);
  return Math.max(499, Math.round(raw / 100) * 100 - 1);
}

function cleanProduct(value: string): string {
  return value.replace(LEADING_PREP, "").replace(/[.,]+$/g, "").trim();
}

function takeQuantity(text: string): { amount: string; rest: string } {
  const match = text.match(QUANTITY);
  if (!match) return { amount: "", rest: text };
  const qty = match[1];
  const word = match[2];
  const rest = (match[3] ?? "").trim();
  if (!word) return { amount: qty, rest };
  const lower = word.toLowerCase();
  if (SIZES.has(lower)) {
    const nested = rest.match(
      /^(bunches|bunch|heads|head|cans|can|cloves|clove)\s+(?:of\s+)?(.*)$/i,
    );
    if (nested) {
      return {
        amount: `${qty} ${lower} ${nested[1].toLowerCase()}`,
        rest: nested[2],
      };
    }
    return { amount: `${qty} ${lower}`, rest };
  }
  if (UNITS.has(lower)) {
    return { amount: `${qty} ${lower}`, rest: rest.replace(/^of\s+/i, "") };
  }
  return { amount: qty, rest: `${word} ${rest}`.trim() };
}

function splitAnd(text: string): string[] {
  if (!/\s+and\s+/i.test(text)) return [text];
  const parts = text
    .split(/\s+and\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);
  const allPlain = parts.every((part) => !/^\d/.test(part));
  const allMeasured = parts.every((part) => /^\d/.test(part));
  if (parts.length > 1 && (allPlain || allMeasured)) return parts;
  return [text];
}

function toItem(
  part: string,
  recipeLine: string,
  optional: boolean,
  toTaste: boolean,
  sizeNotes: string[],
): ShoppableItem | null {
  const prefix = part.match(/^(juice of|pinch of|handful of)\s+(.*)$/i);
  const lead = prefix?.[1].toLowerCase() ?? "";
  const body = cleanProduct(prefix?.[2] ?? part);
  const measured = takeQuantity(body);
  const nameSource = cleanProduct(measured.rest);
  if (!nameSource) return null;

  const productName = titleCase(nameSource);
  let amount = measured.amount;
  if (lead === "juice of") amount = measured.amount ? `juice of ${measured.amount}` : "juice of 1";
  else if (lead === "pinch of") amount = measured.amount ? `${measured.amount} pinch` : "1 pinch";
  else if (lead === "handful of")
    amount = measured.amount ? `${measured.amount} handful` : "1 handful";
  else if (!amount && toTaste) amount = "to taste";
  else if (!amount) amount = "1";

  if (sizeNotes.length > 0 && !lead) {
    amount = `${amount} (${sizeNotes.join(", ")})`;
  }

  return {
    id: productId(productName),
    productName,
    amount,
    recipeLine,
    optional,
    priceCents: priceFor(productName),
  };
}

function parseParts(
  piece: string,
  recipeLine: string,
  inheritedOptional: boolean,
): ShoppableItem[] {
  let working = piece.trim().replace(/\s+/g, " ");
  if (!working) return [];

  let optional =
    inheritedOptional || /^optional\b/i.test(working) || /\(\s*optional\b/i.test(working);
  working = working.replace(/^optional:\s*/i, "");

  const sizeNotes: string[] = [];
  working = working
    .replace(/\(([^)]*)\)/g, (_match, inner: string) => {
      const text = inner.trim();
      if (/^optional\b/i.test(text)) optional = true;
      else if (/\d/.test(text) && /\b(oz|lb|lbs|g|ml|fl oz)\b/i.test(text)) sizeNotes.push(text);
      return " ";
    })
    .replace(/\s+/g, " ")
    .trim();

  if (/^toppings:\s*/i.test(working)) {
    return working
      .replace(/^toppings:\s*/i, "")
      .split(",")
      .flatMap((part) => parseParts(part, recipeLine, optional));
  }

  let toTaste = false;
  if (/\bto taste$/i.test(working)) {
    toTaste = true;
    working = working.replace(/\s*to taste$/i, "").replace(/,\s*$/, "").trim();
  }

  working = working
    .replace(PREP_TAIL, "")
    .replace(/\s+for (?:garnish|the pan)$/i, "")
    .replace(/\s+or\s+.+$/i, "")
    .trim();

  const parts = splitAnd(working);
  return parts.flatMap((part) => {
    const item = toItem(
      part,
      recipeLine,
      optional,
      toTaste,
      parts.length === 1 ? sizeNotes : [],
    );
    return item ? [item] : [];
  });
}

export function parseIngredientLine(line: string): ShoppableItem[] {
  return parseParts(line, line.trim(), false);
}

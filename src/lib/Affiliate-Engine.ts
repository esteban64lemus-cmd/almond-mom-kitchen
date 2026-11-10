export const AMAZON_ASSOCIATES_TAG = "almondmomkitchen-20";

function slugifyIngredient(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Single-ingredient Amazon search with the Almond Mom Associates tag. */
export const getAffiliateLink = (ingredientName: string) => {
  const formattedName = slugifyIngredient(ingredientName) || "organic-groceries";
  return `https://www.amazon.com/s?k=${encodeURIComponent(formattedName.replace(/-/g, " "))}&tag=${AMAZON_ASSOCIATES_TAG}`;
};

/** Multi-ingredient Amazon search for “shop what’s missing” CTAs. */
export function getAffiliateSearchLink(ingredientNames: string[]) {
  const query = ingredientNames
    .map((name) => name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 8)
    .join(" ");
  const k = query || "organic groceries";
  return `https://www.amazon.com/s?k=${encodeURIComponent(k)}&tag=${AMAZON_ASSOCIATES_TAG}`;
}

export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate, Almond Mom may earn from qualifying purchases. Shop links may be affiliate links at no extra cost to you.";


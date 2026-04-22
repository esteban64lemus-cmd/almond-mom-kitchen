// AI-Converter.ts
// Core utility: unit conversion + clean-swap logic

/**
 * Converts grams to ounces
 */
export function gramsToOunces(grams: number): number {
  return parseFloat((grams * 0.035274).toFixed(2));
}

/**
 * Converts ounces to grams
 */
export function ouncesToGrams(ounces: number): number {
  return parseFloat((ounces * 28.3495).toFixed(2));
}

/**
 * Returns true if the recipe qualifies as a clean swap
 * based on the isCleanSwap flag and optionally ingredient list
 */
export function isVerifiedClean(isCleanSwap: boolean): boolean {
  return isCleanSwap === true;
}

/**
 * Returns a badge label for display on recipe cards
 */
export function getCleanBadgeLabel(isCleanSwap: boolean): string | null {
  return isCleanSwap ? "✅ Verified Clean" : null;
}

/**
 * Suggests a clean swap ingredient if one exists
 */
export function suggestCleanSwap(
  ingredientName: string,
  swapMap: Record<string, string>
): string | null {
  return swapMap[ingredientName.toLowerCase()] ?? null;
}

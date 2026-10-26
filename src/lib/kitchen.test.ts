import { recipes } from "@/data/recipes";
import {
  aisleFor,
  FALLBACK_INGREDIENT_PHOTO,
  ingredientPhoto,
  macrosForIngredient,
  macrosForRecipe,
  matchesFilter,
  remainingMacros,
  storeById,
} from "@/lib/kitchen";
import { addCollection, moveToCollection, toggleSaved, EMPTY_SAVED } from "@/lib/saved-state";

describe("kitchen display helpers", () => {
  it("uses a food photo for known ingredients and a plated fallback otherwise", () => {
    expect(ingredientPhoto("organic baby spinach")).toContain("images.unsplash.com");
    expect(ingredientPhoto("baby spinach")).not.toBe(FALLBACK_INGREDIENT_PHOTO);
    expect(ingredientPhoto("mystery moon dust")).toBe(FALLBACK_INGREDIENT_PHOTO);
  });

  it("groups groceries into the four shop aisles", () => {
    expect(aisleFor("Baby Spinach")).toBe("Produce");
    expect(aisleFor("Chicken Breast")).toBe("Meat");
    expect(aisleFor("Extra Virgin Olive Oil")).toBe("Pantry");
    expect(aisleFor("Greek Yogurt")).toBe("Dairy");
  });

  it("lets each store reorder aisles", () => {
    expect(storeById("target").aisleOrder[0]).toBe("Produce");
    expect(storeById("walmart").aisleOrder[0]).toBe("Pantry");
    expect(storeById("instacart").searchUrl("lemon")).toContain("lemon");
  });

  it("estimates macros from ingredient names and clamps remaining at zero", () => {
    const chicken = macrosForIngredient("chicken breast");
    expect(chicken.protein).toBeGreaterThan(chicken.carbs);
    const recipe = recipes.find((entry) => entry.slug === "golden-milk-overnight-oats");
    expect(recipe).toBeDefined();
    expect(macrosForRecipe(recipe!).kcal).toBeGreaterThan(0);
    expect(remainingMacros({ kcal: 2400, protein: 10, carbs: 10, fat: 10 }).kcal).toBe(0);
  });

  it("filters the real catalog without inventing meals", () => {
    const quick = recipes.filter((recipe) => matchesFilter(recipe, "Quick 15"));
    expect(quick.length).toBeGreaterThan(0);
    expect(quick.every((recipe) => matchesFilter(recipe, "Quick 15"))).toBe(true);
    expect(matchesFilter(recipes[0], null)).toBe(true);
  });
});

describe("saved meals", () => {
  it("toggles a recipe and moves it into a named collection", () => {
    const saved = toggleSaved(EMPTY_SAVED, "chia-seed-pudding-jar");
    const withCollection = addCollection(saved, "Breakfast Joy");
    const moved = moveToCollection(withCollection, "chia-seed-pudding-jar", "breakfast-joy");
    expect(moved.ids).toEqual(["chia-seed-pudding-jar"]);
    expect(moved.collections[0]?.recipeIds).toEqual(["chia-seed-pudding-jar"]);
    expect(toggleSaved(moved, "chia-seed-pudding-jar").ids).toEqual([]);
  });
});

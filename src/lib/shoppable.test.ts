import { recipes } from "../data/recipes";
import { parseIngredientLine } from "./shoppable";

function names(line: string) {
  return parseIngredientLine(line).map((item) => ({
    id: item.id,
    productName: item.productName,
    amount: item.amount,
    priceCents: item.priceCents,
    optional: item.optional,
  }));
}

describe("parseIngredientLine", () => {
  it("turns the chia pudding into buyable packages", () => {
    const chia = recipes.find((recipe) => recipe.slug === "chia-seed-pudding-jar");
    expect(chia).toBeTruthy();
    expect(chia!.ingredients.flatMap((line) => names(line))).toEqual([
      {
        id: "organic-chia-seed",
        productName: "Organic Chia Seeds",
        amount: "2 tbsp",
        priceCents: 749,
        optional: false,
      },
      {
        id: "unsweetened-almond-milk",
        productName: "Unsweetened Almond Milk",
        amount: "1/2 cup",
        priceCents: 429,
        optional: false,
      },
      {
        id: "vanilla-bean-powder",
        productName: "Vanilla Bean Powder",
        amount: "1/4 tsp",
        priceCents: 1199,
        optional: false,
      },
      {
        id: "stevia-drops",
        productName: "Stevia Drops",
        amount: "to taste",
        priceCents: 699,
        optional: false,
      },
      {
        id: "fresh-organic-raspberries",
        productName: "Fresh Organic Raspberries",
        amount: "1 handful",
        priceCents: 549,
        optional: false,
      },
    ]);
  });

  it("turns the bone broth and sushi meals into their real ingredients", () => {
    const broth = recipes.find((recipe) => recipe.slug === "bone-broth-detox-soup")!;
    expect(broth.ingredients.map((line) => names(line)[0].productName)).toEqual([
      "High-Quality Grass-Fed Beef Bone Broth",
      "Organic Kale",
      "Ginger",
      "Ground Turmeric",
      "Pink Himalayan Salt",
    ]);
    expect(names(broth.ingredients[0])[0]).toMatchObject({
      amount: "4 cups",
      priceCents: 1099,
    });
    expect(names(broth.ingredients[4])[0].amount).toBe("to taste");

    const sushi = recipes.find((recipe) => recipe.slug === "cauliflower-rice-sushi")!;
    expect(sushi.ingredients.map((line) => names(line)[0].productName)).toEqual([
      "Riced Cauliflower",
      "Coconut Aminos",
      "Nori Seaweed Sheets",
      "Cucumber",
      "Sashimi-Grade Wild-Caught Salmon",
    ]);
    expect(names(sushi.ingredients[4])[0]).toMatchObject({
      amount: "4 oz",
      priceCents: 1899,
    });
  });

  it("shares one product id when two recipes use the same ingredient", () => {
    const chiaMilk = names("1/2 cup unsweetened almond milk (carrageenan-free)")[0];
    const pancakeMilk = names("1/4 cup unsweetened almond milk")[0];
    expect(chiaMilk.id).toBe(pancakeMilk.id);
    expect(chiaMilk.priceCents).toBe(429);
  });

  it("splits grocery pairs and keeps prep notes out of the product name", () => {
    expect(names("Sea salt and black pepper").map((item) => item.productName)).toEqual([
      "Sea Salt",
      "Black Pepper",
    ]);
    expect(names("1 can (5 oz) wild-caught salmon, drained")[0]).toMatchObject({
      productName: "Wild-Caught Salmon",
      amount: "1 can (5 oz)",
      priceCents: 1899,
    });
    expect(names("Juice of 1/2 organic lemon")[0]).toMatchObject({
      productName: "Organic Lemon",
      amount: "juice of 1/2",
    });
    expect(names("Optional: 1/3 cup dark chocolate chips (85%+ cacao)")[0].optional).toBe(
      true,
    );
    expect(
      names("Toppings: sliced mango, toasted coconut").map((item) => item.productName),
    ).toEqual(["Mango", "Toasted Coconut"]);
    expect(names("2 ripe avocados, halved and pitted")[0].id).toBe(
      names("1/2 ripe avocado")[0].id,
    );
  });

  it("gives every recipe line at least one priced product", () => {
    for (const recipe of recipes) {
      for (const line of recipe.ingredients) {
        const items = parseIngredientLine(line);
        expect(items.length).toBeGreaterThan(0);
        for (const item of items) {
          expect(item.productName.length).toBeGreaterThan(1);
          expect(item.priceCents).toBeGreaterThan(0);
          expect(item.recipeLine).toBe(line);
        }
      }
    }
  });
});

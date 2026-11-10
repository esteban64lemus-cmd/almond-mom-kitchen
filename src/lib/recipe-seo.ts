import type { Recipe } from "@/data/recipes";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

function parseMinutes(label: string) {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : undefined;
}

export function recipeJsonLd(recipe: Recipe) {
  const prep = parseMinutes(recipe.prepTime);
  const cook = parseMinutes(recipe.cookTime);
  const total =
    prep !== undefined || cook !== undefined
      ? (prep ?? 0) + (cook ?? 0)
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: [recipe.image],
    url: absoluteUrl(`/blog/${recipe.slug}`),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    recipeCategory: "Clean eating",
    keywords: ["almond mom recipes", "seed oil free", ...recipe.dietaryTags].join(
      ", ",
    ),
    recipeYield: `${recipe.servings} serving${recipe.servings === 1 ? "" : "s"}`,
    prepTime: prep !== undefined ? `PT${prep}M` : undefined,
    cookTime: cook !== undefined ? `PT${cook}M` : undefined,
    totalTime: total !== undefined ? `PT${total}M` : undefined,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text,
    })),
  };
}

// Individual recipe page — /blog/[slug]
import Link from "next/link";
import type { Metadata } from "next";
import { generateRecipeMetadata } from "@/components/seo-handler";

// Static recipe data (replace with Sanity fetch when CMS is configured)
const recipes: Record<string, {
  title: string;
  description: string;
  category: string;
  affiliateUrl: string;
  affiliateLabel: string;
  isCleanSwap: boolean;
  ingredients: string[];
  instructions: string[];
  nutrition: { label: string; value: string }[];
}> = {
  "almond-flour-pancakes": {
    title: "Almond Flour Pancakes",
    description: "Fluffy, gluten-free pancakes made with clean ingredients. High protein, zero guilt.",
    category: "Breakfast",
    affiliateUrl: "https://amzn.to/almond-flour",
    affiliateLabel: "Shop Almond Flour",
    isCleanSwap: true,
    ingredients: [
      "1 cup almond flour",
      "2 large eggs",
      "¼ cup unsweetened almond milk",
      "1 tsp vanilla extract",
      "½ tsp baking powder",
      "Pinch of sea salt",
      "Coconut oil for cooking",
    ],
    instructions: [
      "Whisk together almond flour, baking powder, and salt in a bowl.",
      "In a separate bowl, beat eggs, almond milk, and vanilla extract.",
      "Combine wet and dry ingredients. Stir until smooth.",
      "Heat a skillet over medium heat and lightly coat with coconut oil.",
      "Pour ¼ cup batter per pancake. Cook 2-3 min per side until golden.",
      "Serve with fresh berries and a drizzle of raw honey.",
    ],
    nutrition: [
      { label: "Calories", value: "280" },
      { label: "Protein", value: "12g" },
      { label: "Fat", value: "22g" },
      { label: "Carbs", value: "8g" },
      { label: "Fiber", value: "3g" },
    ],
  },
  "keto-avocado-bowl": {
    title: "Keto Avocado Power Bowl",
    description: "Packed with healthy fats and fiber. The perfect clean energy lunch.",
    category: "Keto",
    affiliateUrl: "https://amzn.to/avocado-oil",
    affiliateLabel: "Shop Avocado Oil",
    isCleanSwap: true,
    ingredients: [
      "1 large ripe avocado",
      "½ cup cooked quinoa",
      "¼ cup cherry tomatoes, halved",
      "2 tbsp pumpkin seeds",
      "1 tbsp avocado oil",
      "Juice of ½ lemon",
      "Sea salt and black pepper to taste",
    ],
    instructions: [
      "Halve the avocado and remove the pit.",
      "Scoop avocado into a bowl and mash lightly.",
      "Add cooked quinoa, cherry tomatoes, and pumpkin seeds.",
      "Drizzle with avocado oil and lemon juice.",
      "Season with sea salt and black pepper.",
      "Toss gently and serve immediately.",
    ],
    nutrition: [
      { label: "Calories", value: "420" },
      { label: "Protein", value: "9g" },
      { label: "Fat", value: "34g" },
      { label: "Carbs", value: "18g" },
      { label: "Fiber", value: "10g" },
    ],
  },
  "vegan-chia-pudding": {
    title: "Overnight Chia Pudding",
    description: "Prep the night before. Wake up to a creamy, omega-3 rich breakfast.",
    category: "Vegan",
    affiliateUrl: "https://amzn.to/chia-seeds",
    affiliateLabel: "Shop Chia Seeds",
    isCleanSwap: false,
    ingredients: [
      "3 tbsp chia seeds",
      "1 cup oat milk",
      "1 tsp maple syrup",
      "½ tsp vanilla extract",
      "Fresh fruit for topping",
    ],
    instructions: [
      "Combine chia seeds, oat milk, maple syrup, and vanilla in a jar.",
      "Stir well to prevent clumping.",
      "Cover and refrigerate overnight (minimum 4 hours).",
      "In the morning, stir again and add fresh fruit on top.",
      "Enjoy cold straight from the jar.",
    ],
    nutrition: [
      { label: "Calories", value: "210" },
      { label: "Protein", value: "7g" },
      { label: "Fat", value: "10g" },
      { label: "Carbs", value: "24g" },
      { label: "Fiber", value: "12g" },
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const recipe = recipes[params.slug];
  if (!recipe) return { title: "Recipe Not Found | Almond Mom Kitchen" };

  return generateRecipeMetadata({
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    slug: params.slug,
  });
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = recipes[params.slug];

  if (!recipe) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Recipe not found</h1>
          <Link href="/blog" className="text-amber-600 hover:underline">← Back to recipes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Nav */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-stone-800 tracking-tight">
            🌿 Almond Mom Kitchen
          </Link>
          <div className="flex gap-6 text-sm font-medium text-stone-600">
            <Link href="/blog" className="hover:text-amber-600 transition-colors">Recipes</Link>
            <Link href="/#goals" className="hover:text-amber-600 transition-colors">Goals</Link>
            <Link href="/#tools" className="hover:text-amber-600 transition-colors">Tools</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-stone-400 mb-8">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-amber-600">Recipes</Link>
          <span>/</span>
          <span className="text-stone-600">{recipe.title}</span>
        </div>

        {/* Hero image placeholder */}
        <div className="w-full h-64 bg-stone-200 rounded-2xl flex items-center justify-center text-6xl mb-8">
          🥗
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            {recipe.category}
          </span>
          <h1 className="text-4xl font-bold text-stone-900 mt-1 mb-3">{recipe.title}</h1>
          {recipe.isCleanSwap && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              ✅ Verified Clean
            </span>
          )}
          <p className="text-stone-500 mt-4 text-lg leading-relaxed">{recipe.description}</p>
        </div>

        {/* Affiliate CTA */}
        <a
          href={recipe.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-2xl transition-colors mb-10 text-lg"
        >
          🛒 {recipe.affiliateLabel} →
        </a>

        {/* Nutrition */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Nutrition (per serving)</h2>
          <div className="grid grid-cols-5 gap-4">
            {recipe.nutrition.map((n) => (
              <div key={n.label} className="text-center">
                <div className="text-xl font-bold text-amber-600">{n.value}</div>
                <div className="text-xs text-stone-400 mt-1">{n.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-3 text-stone-600">
                <span className="mt-1 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-stone-600 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Back link */}
        <Link href="/blog" className="text-amber-600 font-semibold hover:underline">
          ← Back to all recipes
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400 mt-10">
        <p>© {new Date().getFullYear()} Almond Mom Kitchen. All rights reserved.</p>
      </footer>
    </div>
  );
}

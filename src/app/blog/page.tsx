// Blog listing page — /blog
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes | Almond Mom Kitchen",
  description: "Browse clean, wellness-forward recipes for energy, digestion, cravings, sleep, and more.",
};

const recipes = [
  {
    slug: "almond-flour-pancakes",
    title: "Almond Flour Pancakes",
    description: "Fluffy, gluten-free pancakes made with clean ingredients. High protein, zero guilt.",
    category: "Breakfast",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/almond-flour",
  },
  {
    slug: "keto-avocado-bowl",
    title: "Keto Avocado Power Bowl",
    description: "Packed with healthy fats and fiber. The perfect clean energy lunch.",
    category: "Keto",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/avocado-oil",
  },
  {
    slug: "vegan-chia-pudding",
    title: "Overnight Chia Pudding",
    description: "Prep the night before. Wake up to a creamy, omega-3 rich breakfast.",
    category: "Vegan",
    isCleanSwap: false,
    affiliateUrl: "https://amzn.to/chia-seeds",
  },
  {
    slug: "golden-milk-latte",
    title: "Golden Milk Latte",
    description: "Anti-inflammatory turmeric latte. Cozy, clean, and caffeine-free.",
    category: "Drinks",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/turmeric",
  },
  {
    slug: "protein-energy-balls",
    title: "No-Bake Protein Energy Balls",
    description: "5 clean ingredients. 10 minutes. Snacks that actually keep you full.",
    category: "Snacks",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/protein-powder",
  },
  {
    slug: "sleep-smoothie",
    title: "Sleep Support Smoothie",
    description: "Magnesium-rich blend with banana, almond butter, and chamomile. Drift off naturally.",
    category: "Sleep",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/almond-butter",
  },
];

const categories = ["All", "Breakfast", "Keto", "Vegan", "Drinks", "Snacks", "Sleep"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Nav */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-stone-800 tracking-tight">
            🌿 Almond Mom Kitchen
          </Link>
          <div className="flex gap-6 text-sm font-medium text-stone-600">
            <Link href="/blog" className="text-amber-600 font-semibold">Recipes</Link>
            <Link href="/#goals" className="hover:text-amber-600 transition-colors">Goals</Link>
            <Link href="/#tools" className="hover:text-amber-600 transition-colors">Tools</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">All Recipes</h1>
          <p className="text-stone-500">Clean, intentional, and built for real wellness goals.</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                cat === "All"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "border-stone-300 text-stone-600 hover:border-amber-400 hover:text-amber-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.slug} className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-stone-100 flex items-center justify-center text-4xl">🥗</div>
              <div className="p-5 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                  {recipe.category}
                </span>
                <h2 className="text-base font-bold text-stone-800">{recipe.title}</h2>
                {recipe.isCleanSwap && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium w-fit">
                    ✅ Verified Clean
                  </span>
                )}
                <p className="text-sm text-stone-500 line-clamp-2">{recipe.description}</p>
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/blog/${recipe.slug}`}
                    className="flex-1 text-center border border-stone-300 text-stone-700 hover:bg-stone-50 text-sm font-medium py-2 rounded-xl transition-colors"
                  >
                    Read More
                  </Link>
                  <a
                    href={recipe.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
                  >
                    Shop →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400">
        <p>© {new Date().getFullYear()} Almond Mom Kitchen. All rights reserved.</p>
      </footer>
    </div>
  );
}

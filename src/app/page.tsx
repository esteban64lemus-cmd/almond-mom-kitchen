// Homepage — Almond Mom Kitchen
import Link from "next/link";

const categories = ["Energy", "Digestion", "Cravings", "Sleep", "Confidence", "Consistency"];

const featuredRecipes = [
  {
    slug: "almond-flour-pancakes",
    title: "Almond Flour Pancakes",
    description: "Fluffy, gluten-free pancakes made with clean ingredients. High protein, zero guilt.",
    category: "Breakfast",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/almond-flour",
    imageUrl: "/images/pancakes.jpg",
  },
  {
    slug: "keto-avocado-bowl",
    title: "Keto Avocado Power Bowl",
    description: "Packed with healthy fats and fiber. The perfect clean energy lunch.",
    category: "Keto",
    isCleanSwap: true,
    affiliateUrl: "https://amzn.to/avocado-oil",
    imageUrl: "/images/avocado-bowl.jpg",
  },
  {
    slug: "vegan-chia-pudding",
    title: "Overnight Chia Pudding",
    description: "Prep the night before. Wake up to a creamy, omega-3 rich breakfast.",
    category: "Vegan",
    isCleanSwap: false,
    affiliateUrl: "https://amzn.to/chia-seeds",
    imageUrl: "/images/chia-pudding.jpg",
  },
];

export default function HomePage() {
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
            <Link href="#goals" className="hover:text-amber-600 transition-colors">Goals</Link>
            <Link href="#tools" className="hover:text-amber-600 transition-colors">Tools</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Clean Eating. Real Results.
        </span>
        <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-6">
          Eat Clean.<br />Feel Everything.
        </h1>
        <p className="text-lg text-stone-500 max-w-xl mx-auto mb-10">
          Recipes built around energy, digestion, and real wellness — not diet culture. 
          Every ingredient is intentional. Every swap is verified clean.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-stone-200"
          >
            Browse Recipes
          </Link>
          <Link
            href="/fridge-rescue"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-amber-100"
          >
            Fridge Rescue →
          </Link>
        </div>
      </section>

      {/* Wellness Goal Tracks */}
      <section id="goals" className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">Your Wellness Goal</h2>
          <p className="text-stone-500 text-center mb-10">Pick a track. We'll show you the recipes that actually move the needle.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat.toLowerCase()}`}
                className="flex items-center justify-center bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-2xl py-6 text-stone-700 font-semibold transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Featured Recipes</h2>
        <p className="text-stone-500 mb-10">Hand-picked clean swaps for your daily routine.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.slug} className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
              <div className="h-40 bg-stone-100 flex items-center justify-center text-4xl">🥗</div>
              <div className="p-5 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">{recipe.category}</span>
                <h3 className="text-base font-bold text-stone-800">{recipe.title}</h3>
                {recipe.isCleanSwap && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium w-fit">
                    ✅ Verified Clean
                  </span>
                )}
                <p className="text-sm text-stone-500 line-clamp-2">{recipe.description}</p>
                <div className="flex gap-2 mt-2">
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
        <div className="text-center mt-10">
          <Link href="/blog" className="text-amber-600 font-semibold hover:underline">
            View all recipes →
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="bg-amber-50 border-y border-amber-100 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">AI Tools</h2>
          <p className="text-stone-500 mb-8">Built-in utilities to make clean eating easier.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 text-left">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-bold text-stone-800 mb-1">Unit Converter</h3>
              <p className="text-sm text-stone-500">Convert grams to ounces and back — instantly for any recipe.</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 text-left">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-bold text-stone-800 mb-1">Clean Swap Engine</h3>
              <p className="text-sm text-stone-500">Swap any ingredient for a verified clean alternative automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400">
        <p>© {new Date().getFullYear()} Almond Mom Kitchen. All rights reserved.</p>
        <p className="mt-1">Clean eating for real people. Built with intention.</p>
      </footer>
    </div>
  );
}

"use client";
// Individual recipe page — /blog/[slug] (Premium Rebirth)
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingCart, CheckCircle2, Clock, Flame, Utensils } from "lucide-react";

// Static recipe data
const recipes: Record<string, {
  title: string;
  description: string;
  category: string;
  affiliateUrl: string;
  affiliateLabel: string;
  isCleanSwap: boolean;
  imageUrl?: string;
  ingredients: string[];
  instructions: string[];
  nutrition: { label: string; value: string }[];
}> = {
  "almond-flour-pancakes": {
    title: "Almond Flour Pancakes",
    description: "Fluffy, high-protein pancakes that redefine breakfast. Clean, simple, and satisfying.",
    category: "Breakfast",
    imageUrl: "/images/pancakes.png",
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
    description: "A nutrient-dense bowl designed for sustained energy without the crash.",
    category: "Lunch",
    imageUrl: "/images/avocado-bowl.png",
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
    title: "Gourmet Chia Pudding",
    description: "A decadent, omega-3 rich breakfast that feels like a luxury dessert.",
    category: "Dessert",
    imageUrl: "/images/chia-pudding.png",
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

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = recipes[params.slug];

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-obsidian tracking-tighter mb-4">Recipe not found</h1>
          <Link href="/blog" className="text-sage font-black uppercase tracking-widest text-xs border-b-2 border-sage/20 hover:border-sage transition-all">
            ← Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-copper/20 pb-32">
      {/* Nav */}
      <nav className="glass sticky top-0 z-50 py-4 px-6 border-b border-black/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-obsidian tracking-tighter flex items-center gap-2">
            <span className="text-sage">🌿</span> ALMOND MOM
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-obsidian/60">
            <Link href="/blog" className="hover:text-copper transition-colors">Recipes</Link>
            <Link href="/#goals" className="hover:text-copper transition-colors">Goals</Link>
            <Link href="/#tools" className="hover:text-copper transition-colors">AI Tools</Link>
          </div>
          <Link 
            href="/fridge-rescue" 
            className="bg-obsidian text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sage transition-all"
          >
            Rescue
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-obsidian/30 hover:text-sage transition-colors font-black uppercase tracking-widest text-[10px] mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Collection
        </Link>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[450px] md:h-[600px] w-full rounded-[48px] overflow-hidden shadow-3xl shadow-black/10"
          >
            {recipe.imageUrl ? (
              <Image 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                fill 
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-stone-100 flex items-center justify-center text-6xl">🥗</div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sage font-black text-[10px] uppercase tracking-[0.3em]">{recipe.category}</span>
              {recipe.isCleanSwap && (
                <span className="glass px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-sage flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified Clean
                </span>
              )}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-obsidian tracking-tighter leading-none italic uppercase">
              {recipe.title}
            </h1>
            
            <p className="text-obsidian/40 text-lg font-medium leading-relaxed">
              {recipe.description}
            </p>

            <div className="flex gap-6 py-6 border-y border-black/5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-obsidian/20">Time</span>
                <span className="text-xs font-black text-obsidian flex items-center gap-1"><Clock className="w-3 h-3" /> 20 MIN</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-obsidian/20">Calories</span>
                <span className="text-xs font-black text-obsidian flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.nutrition[0].value}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-obsidian/20">Level</span>
                <span className="text-xs font-black text-obsidian flex items-center gap-1"><Utensils className="w-3 h-3" /> EASY</span>
              </div>
            </div>

            <a
              href={recipe.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-3 bg-obsidian hover:bg-copper text-white font-black py-5 rounded-[24px] transition-all shadow-2xl shadow-black/20 uppercase tracking-widest text-xs"
            >
              {recipe.affiliateLabel} <ShoppingCart className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-16">
          {/* Left Column: Ingredients & Nutrition */}
          <div className="md:col-span-5 flex flex-col gap-12">
            {/* Nutrition */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-[40px] p-8 border border-black/5 shadow-sm"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-obsidian/20 mb-6">Macro Density</h3>
              <div className="grid grid-cols-2 gap-6">
                {recipe.nutrition.map((n) => (
                  <div key={n.label}>
                    <div className="text-2xl font-black text-obsidian tracking-tighter">{n.value}</div>
                    <div className="text-[10px] font-black text-obsidian/30 uppercase tracking-widest">{n.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ingredients */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-black text-obsidian tracking-tight mb-6 uppercase italic underline decoration-sage/30 underline-offset-8">Ingredients</h3>
              <ul className="space-y-4">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-obsidian/60 group">
                    <span className="w-6 h-6 rounded-lg bg-sage/10 text-sage text-[10px] flex items-center justify-center font-black flex-shrink-0 group-hover:bg-sage group-hover:text-white transition-all">
                      {i + 1}
                    </span>
                    {ing}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Instructions */}
          <div className="md:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-black text-obsidian tracking-tight mb-8 uppercase italic underline decoration-sage/30 underline-offset-8">Method of Prep</h3>
              <div className="space-y-12 relative">
                 <div className="absolute left-4 top-4 bottom-4 w-px bg-black/5" />
                 {recipe.instructions.map((step, i) => (
                  <div key={i} className="relative pl-12 flex flex-col gap-2 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-background border-2 border-black/5 flex items-center justify-center text-xs font-black text-obsidian/20 group-hover:border-sage group-hover:text-sage transition-all z-10">
                      {i + 1}
                    </div>
                    <p className="text-obsidian font-medium leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-black/5 flex justify-between items-center">
           <Link href="/blog" className="text-obsidian/30 hover:text-sage transition-colors font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
             <ChevronLeft className="w-4 h-4" /> More Recipes
           </Link>
           <p className="text-obsidian/20 text-[10px] font-black uppercase tracking-[0.2em]">© Almond Mom Kitchen</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Ingredient {
  quantity: number;
  unit: string;
  ingredientName: string;
  isCleanSwap: boolean;
}

interface Recipe {
  _id: string;
  title: string;
  dietaryTags: string[];
  timeMetrics: { prepTime: number; cookTime: number };
  macros: { calories: number; protein: number; carbs: number; fat: number };
  imageUrl: string;
  ingredients: Ingredient[];
}

// Mock Database expanded with ingredients to match your schema
const RECIPE_DB: Record<string, Recipe> = {
  "1": {
    _id: "1",
    title: "Matcha Chia Seed Pudding",
    dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"],
    timeMetrics: { prepTime: 10, cookTime: 0 },
    macros: { calories: 250, protein: 12, carbs: 20, fat: 15 },
    imageUrl:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      {
        quantity: 0.25,
        unit: "cup",
        ingredientName: "Chia seeds",
        isCleanSwap: false,
      },
      {
        quantity: 1,
        unit: "cup",
        ingredientName: "Almond milk (unsweetened)",
        isCleanSwap: true,
      },
      {
        quantity: 1,
        unit: "tsp",
        ingredientName: "Ceremonial grade matcha",
        isCleanSwap: false,
      },
      {
        quantity: 1,
        unit: "tbsp",
        ingredientName: "Maple syrup",
        isCleanSwap: true,
      },
    ],
  },
  "2": {
    _id: "2",
    title: "Almond Flour Lemon Loaf",
    dietaryTags: ["Paleo", "Gluten-Free", "Vegetarian"],
    timeMetrics: { prepTime: 15, cookTime: 45 },
    macros: { calories: 180, protein: 6, carbs: 12, fat: 14 },
    imageUrl:
      "https://images.unsplash.com/photo-1615486171448-4afbf3692ea4?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      {
        quantity: 2,
        unit: "cups",
        ingredientName: "Almond flour",
        isCleanSwap: true,
      },
      {
        quantity: 3,
        unit: "whole",
        ingredientName: "Pasture-raised eggs",
        isCleanSwap: false,
      },
      {
        quantity: 0.25,
        unit: "cup",
        ingredientName: "Coconut oil",
        isCleanSwap: true,
      },
      {
        quantity: 2,
        unit: "tbsp",
        ingredientName: "Fresh lemon juice",
        isCleanSwap: false,
      },
    ],
  },
  "3": {
    _id: "3",
    title: "Wild Caught Salmon Bowl",
    dietaryTags: ["Dairy-Free", "Gluten-Free", "High Protein"],
    timeMetrics: { prepTime: 20, cookTime: 15 },
    macros: { calories: 420, protein: 35, carbs: 25, fat: 22 },
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      {
        quantity: 6,
        unit: "oz",
        ingredientName: "Wild-caught salmon",
        isCleanSwap: true,
      },
      {
        quantity: 0.5,
        unit: "cup",
        ingredientName: "Quinoa",
        isCleanSwap: true,
      },
      {
        quantity: 1,
        unit: "cup",
        ingredientName: "Mixed greens",
        isCleanSwap: false,
      },
      {
        quantity: 0.5,
        unit: "whole",
        ingredientName: "Avocado",
        isCleanSwap: false,
      },
    ],
  },
  "4": {
    _id: "4",
    title: "Adaptogenic Green Smoothie",
    dietaryTags: ["Vegan", "Raw", "No Added Sugar"],
    timeMetrics: { prepTime: 5, cookTime: 0 },
    macros: { calories: 190, protein: 8, carbs: 24, fat: 6 },
    imageUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      {
        quantity: 1,
        unit: "handful",
        ingredientName: "Organic spinach",
        isCleanSwap: false,
      },
      {
        quantity: 0.5,
        unit: "whole",
        ingredientName: "Frozen banana",
        isCleanSwap: false,
      },
      {
        quantity: 1,
        unit: "tsp",
        ingredientName: "Ashwagandha powder",
        isCleanSwap: true,
      },
      {
        quantity: 1,
        unit: "cup",
        ingredientName: "Coconut water",
        isCleanSwap: true,
      },
    ],
  },
};

export default function RecipeDetailPage() {
  const params = useParams();
  const recipe = RECIPE_DB[params.id as string] || RECIPE_DB["1"]; // Fallback

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#FDFCFB] pb-24 font-sans">
      {/* Abstract Backgrounds */}
      <div className="bg-lime-light pointer-events-none fixed top-[-5%] right-[-10%] h-[50%] w-[50%] rounded-full opacity-40 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-stone-100 opacity-60 blur-[120px]" />

      {/* Nav / Back Button */}
      <nav className="z-50 mx-auto mb-4 flex w-full max-w-4xl items-center justify-between p-6">
        <Link
          href="/dashboard"
          className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase transition-colors hover:text-stone-800"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          Back to Sanctuary
        </Link>
      </nav>

      <main className="z-10 mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[3rem] border border-stone-100 bg-white/80 shadow-2xl backdrop-blur-xl"
        >
          {/* Hero Image */}
          <div className="relative h-80 w-full overflow-hidden bg-stone-100">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {recipe.dietaryTags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold tracking-widest text-stone-800 uppercase shadow-sm backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-10 md:p-16">
            <h1 className="mb-10 font-serif text-4xl leading-tight text-stone-800 italic md:text-5xl">
              {recipe.title}
            </h1>

            {/* Metrics */}
            <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-stone-100/50 bg-stone-50 p-5">
                <span className="mb-2 block text-[9px] font-bold tracking-widest text-stone-400 uppercase">
                  Total Time
                </span>
                <span className="text-sm font-medium text-stone-800">
                  {recipe.timeMetrics.prepTime + recipe.timeMetrics.cookTime}{" "}
                  mins
                </span>
              </div>
              <div className="rounded-3xl border border-stone-100/50 bg-stone-50 p-5">
                <span className="mb-2 block text-[9px] font-bold tracking-widest text-stone-400 uppercase">
                  Calories
                </span>
                <span className="text-sm font-medium text-stone-800">
                  {recipe.macros.calories} kcal
                </span>
              </div>
              <div className="col-span-2 rounded-3xl border border-stone-100/50 bg-stone-50 p-5">
                <span className="mb-2 block text-[9px] font-bold tracking-widest text-stone-400 uppercase">
                  Macros
                </span>
                <div className="flex gap-6 text-sm text-stone-500">
                  <span>
                    <strong className="text-stone-800">
                      {recipe.macros.protein}g
                    </strong>{" "}
                    P
                  </span>
                  <span>
                    <strong className="text-stone-800">
                      {recipe.macros.carbs}g
                    </strong>{" "}
                    C
                  </span>
                  <span>
                    <strong className="text-stone-800">
                      {recipe.macros.fat}g
                    </strong>{" "}
                    F
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="mb-6 block text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing: Ingredient, i: number) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-stone-100/50 bg-stone-50/50 p-4 transition-colors hover:bg-stone-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-xs font-bold text-stone-800">
                        {ing.quantity} {ing.unit}
                      </span>
                      <span className="text-sm font-light text-stone-600">
                        {ing.ingredientName}
                      </span>
                    </div>
                    {ing.isCleanSwap && (
                      <span className="bg-lime-light/60 flex items-center gap-1 rounded-full px-3 py-1.5 text-[9px] font-bold tracking-widest text-stone-800 uppercase shadow-sm">
                        Clean Swap <span className="text-xs">🌿</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

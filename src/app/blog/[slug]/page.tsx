"use client";

import { use, useState } from "react";
import { recipes } from "@/data/recipes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RecipeCard } from "@/components/RecipeCard";
import { CartLink } from "@/components/cart-link";
import { ShoppableIngredients } from "@/components/shoppable-ingredients";
import { FocusWash } from "@/components/meal-motion";
import { ArrowLeft, CheckCircle2, Circle, Clock, Users, Flame } from "lucide-react";

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const recipe = recipes.find((r) => r.slug === resolvedParams.slug);

  if (!recipe) notFound();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [openRelatedId, setOpenRelatedId] = useState<string | null>(null);

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const related = recipes.filter(
    (r) => r.id !== recipe.id && r.dietaryTags.some((t) => recipe.dietaryTags.includes(t))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FBF9F6]">
      <FocusWash active={openRelatedId !== null} />
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-obsidian/5 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-obsidian/60 hover:text-obsidian transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Recipes
          </Link>
          <span className="font-playfair text-lg font-bold text-obsidian hidden sm:block">
            ALMOND<span className="text-sage italic">MOM</span>
          </span>
          <div className="flex items-center gap-2">
            <CartLink />
            {recipe.dietaryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sage/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sage"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-obsidian tracking-tight mb-4">
            {recipe.title}
          </h1>
          <p className="text-lg text-obsidian/60 max-w-2xl mx-auto">{recipe.description}</p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl mb-10"
        >
          <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-full" />
        </motion.div>

        {/* Meta strip */}
        <div className="grid grid-cols-3 gap-px bg-obsidian/5 rounded-2xl overflow-hidden mb-16 shadow-sm">
          {[
            { icon: Clock, label: "Prep", value: recipe.prepTime },
            { icon: Flame, label: "Cook", value: recipe.cookTime },
            { icon: Users, label: "Servings", value: `${recipe.servings}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white text-center px-4 py-5">
              <Icon className="h-5 w-5 mx-auto mb-1 text-sage" />
              <p className="text-xs text-obsidian/40 uppercase font-bold tracking-widest mb-1">{label}</p>
              <p className="text-lg font-semibold text-obsidian">{value}</p>
            </div>
          ))}
        </div>

        {/* Ingredients + Instructions */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {/* Ingredients — interactive checkboxes */}
          <div className="md:col-span-1">
            <h2 className="font-playfair text-2xl font-bold text-obsidian mb-6">Ingredients</h2>
            <p className="text-xs text-obsidian/40 uppercase tracking-widest mb-4">Tap to check off</p>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>
                  <button
                    onClick={() => toggle(i)}
                    className="flex items-start gap-3 w-full text-left group"
                  >
                    {checked.has(i) ? (
                      <CheckCircle2 className="h-5 w-5 text-sage shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-obsidian/20 shrink-0 mt-0.5 group-hover:text-sage/50 transition-colors" />
                    )}
                    <span
                      className={`text-sm leading-relaxed transition-colors ${
                        checked.has(i) ? "line-through text-obsidian/30" : "text-obsidian/70"
                      }`}
                    >
                      {ingredient}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {checked.size > 0 && (
              <button
                onClick={() => setChecked(new Set())}
                className="mt-6 text-xs text-obsidian/40 hover:text-obsidian underline underline-offset-2 transition-colors"
              >
                Clear all
              </button>
            )}
            <div className="mt-8">
              <h3 className="font-playfair text-lg font-bold text-obsidian">Buy these ingredients</h3>
              <ShoppableIngredients lines={recipe.ingredients} />
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h2 className="font-playfair text-2xl font-bold text-obsidian mb-6">Instructions</h2>
            <div className="space-y-8">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center font-bold text-sage text-sm">
                    {i + 1}
                  </div>
                  <p className="text-obsidian/70 text-base leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related recipes */}
        {related.length > 0 && (
          <div className="border-t border-obsidian/5 pt-16">
            <h2 className="font-playfair text-2xl font-bold text-obsidian mb-8 text-center">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipe={r}
                  open={openRelatedId === r.id}
                  dimmed={openRelatedId !== null && openRelatedId !== r.id}
                  onToggle={() =>
                    setOpenRelatedId((current) => (current === r.id ? null : r.id))
                  }
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

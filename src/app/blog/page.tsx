"use client";

import { useState, useMemo } from "react";
import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const ALL_TAGS = Array.from(new Set(recipes.flatMap((r) => r.dietaryTags))).sort();

export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !activeTag || r.dietaryTags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="min-h-screen bg-[#FBF9F6]">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-20 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <a href="/" className="font-playfair text-xl font-bold text-obsidian tracking-tight">
            ALMOND<span className="text-sage italic">MOM</span>
          </a>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search recipes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-200 bg-white pl-9 pr-4 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sage/40"
            />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-obsidian tracking-tight mb-4"
          >
            The Recipe Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-obsidian/60 italic"
          >
            Nourishing, aesthetically pleasing recipes for the modern health-conscious family.
          </motion.p>
        </div>

        {/* Tag filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTag === null
                ? "bg-obsidian text-white shadow-md"
                : "bg-white text-obsidian/60 border border-obsidian/10 hover:bg-obsidian/5"
            }`}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTag === tag
                  ? "bg-sage text-white shadow-md"
                  : "bg-white text-obsidian/60 border border-obsidian/10 hover:bg-sage/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-obsidian/40 text-lg italic">
            No recipes found. Try a different search.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </motion.div>
        )}

        <div className="mt-10 text-center text-xs text-obsidian/30 uppercase tracking-widest">
          {filtered.length} of {recipes.length} recipes
        </div>
      </main>
    </div>
  );
}

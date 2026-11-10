"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { recipes } from "@/data/recipes";
import { MealCard } from "@/components/kitchen/meal-card";
import BottomNav from "@/components/bottom-nav";

const ALL_TAGS = Array.from(new Set(recipes.flatMap((recipe) => recipe.dietaryTags))).sort();

export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesQuery =
        !query ||
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !activeTag || recipe.dietaryTags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto w-full max-w-md">
        <header className="sticky top-0 z-20 bg-cream/90 px-5 py-4 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link href="/" className="font-display text-xl font-extrabold">
              Recipes
            </Link>
            <div className="flex items-center gap-3 text-[11px] font-bold tracking-wider uppercase">
              <Link href="/journal" className="text-sage">
                Journal
              </Link>
              <Link href="/mission" className="text-muted-foreground">
                Mission
              </Link>
            </div>
          </div>
          <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
            Almond mom recipes for seed oil free, high-protein clean eating.
          </p>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              placeholder="Search recipes"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-border bg-white py-2 pr-4 pl-9 text-sm outline-none"
            />
          </div>
        </header>
        <main className="px-5 pt-4 pb-32">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-bold uppercase ${
                activeTag === null ? "bg-coral text-white" : "border border-border bg-white text-muted-foreground"
              }`}
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-bold uppercase ${
                  activeTag === tag ? "bg-coral text-white" : "border border-border bg-white text-muted-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">No recipes found. Try a different search.</p>
          ) : (
            <div className="space-y-8">
              {filtered.map((recipe) => (
                <MealCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

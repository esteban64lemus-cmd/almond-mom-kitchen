"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { recipes } from "@/data/recipes";
import {
  MEAL_FILTERS,
  matchesFilter,
  plateMacros,
  seasonIngredients,
  shortIngredientLabel,
  type MealFilter,
} from "@/lib/kitchen";
import BottomNav from "@/components/bottom-nav";
import { IngredientPhoto } from "@/components/kitchen/ingredient-photo";
import { MealCard } from "@/components/kitchen/meal-card";
import { NutritionBanner } from "@/components/kitchen/nutrition-banner";

export default function HomePage() {
  const [filter, setFilter] = useState<MealFilter | null>(null);
  const visible = useMemo(
    () => recipes.filter((recipe) => matchesFilter(recipe, filter)),
    [filter],
  );
  const season = useMemo(() => seasonIngredients(recipes), []);
  const plate = plateMacros(visible.length > 0 ? visible : recipes);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <header className="px-5 pt-14 pb-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Good morning,</p>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">Almond</h1>
            </div>
            <Link
              href="/dashboard"
              className="flex size-12 items-center justify-center overflow-hidden rounded-full border-2 border-coral bg-white text-sm font-extrabold text-coral"
              aria-label="Profile"
            >
              AM
            </Link>
          </div>
          <NutritionBanner today={plate} />
        </header>

        <main className="flex-1 pb-32">
          <section className="mb-8 px-5">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {MEAL_FILTERS.map((item) => {
                const active = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(active ? null : item)}
                    className={`shrink-0 rounded-full px-6 py-2.5 text-[12px] font-bold tracking-wider uppercase ${
                      active
                        ? "bg-coral text-white shadow-[0_4px_12px_rgba(255,139,92,0.3)]"
                        : "border border-border bg-white text-muted-foreground"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-10">
            <div className="mb-4 flex items-end justify-between px-5">
              <h2 className="font-display text-lg font-extrabold">Ingredients in season</h2>
              <Link
                href="/shop"
                className="text-[11px] font-bold tracking-wider text-coral uppercase"
              >
                Market →
              </Link>
            </div>
            <div className="flex gap-5 overflow-x-auto px-5 pb-4">
              {season.map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-2">
                  <IngredientPhoto name={item.name} className="size-16" />
                  <span className="max-w-16 text-center text-[10px] font-bold tracking-wide text-muted-foreground uppercase">
                    {shortIngredientLabel(item.name)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 px-5">
            {visible.length === 0 ? (
              <p className="rounded-[32px] bg-white p-6 text-sm text-muted-foreground">
                Nothing in this filter yet. Tap it again to see every meal.
              </p>
            ) : (
              visible.map((recipe, index) => (
                <MealCard key={recipe.id} recipe={recipe} hint={index === 0} />
              ))
            )}
          </section>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

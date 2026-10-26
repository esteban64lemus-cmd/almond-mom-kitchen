"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { recipes } from "@/data/recipes";
import { parseIngredientLine } from "@/lib/shoppable";
import { aisleFor, shortIngredientLabel } from "@/lib/kitchen";
import { useSaved } from "@/components/saved-provider";
import BottomNav from "@/components/bottom-nav";
import { IngredientPhoto } from "@/components/kitchen/ingredient-photo";
import { MealCard } from "@/components/kitchen/meal-card";

export default function SavedPage() {
  const saved = useSaved();
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [creating, setCreating] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const savedRecipes = useMemo(
    () => recipes.filter((recipe) => saved.ids.includes(recipe.id)),
    [saved.ids],
  );

  const visible = savedRecipes.filter((recipe) => {
    const inCollection = activeCollection
      ? saved.collections
          .find((collection) => collection.id === activeCollection)
          ?.recipeIds.includes(recipe.id)
      : true;
    const matches =
      !query || recipe.title.toLowerCase().includes(query.toLowerCase());
    return inCollection && matches;
  });

  const favorites = useMemo(() => {
    const source = savedRecipes.length > 0 ? savedRecipes : recipes.slice(0, 6);
    const seen = new Set<string>();
    const picks: string[] = [];
    for (const recipe of source) {
      for (const line of recipe.ingredients) {
        for (const item of parseIngredientLine(line)) {
          const aisle = aisleFor(item.productName);
          if (aisle !== "Produce" && aisle !== "Dairy" && aisle !== "Meat") continue;
          const key = item.productName.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          picks.push(item.productName);
          if (picks.length >= 5) return picks;
        }
      }
    }
    return picks;
  }, [savedRecipes]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <header className="px-5 pt-14 pb-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h1 className="font-display text-[32px] font-extrabold tracking-tight">Saved</h1>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Search saved meals"
                onClick={() => setSearching((value) => !value)}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-white"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                onClick={() => setCreating((value) => !value)}
                className="flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-extrabold text-white"
              >
                <Plus size={16} />
                Collection
              </button>
            </div>
          </div>
          {searching ? (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search saved meals"
              className="mb-3 w-full rounded-full border border-border bg-white px-4 py-2 text-sm outline-none"
            />
          ) : null}
          {creating ? (
            <form
              className="mb-3 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                saved.createCollection(collectionName);
                setCollectionName("");
                setCreating(false);
              }}
            >
              <input
                value={collectionName}
                onChange={(event) => setCollectionName(event.target.value)}
                placeholder="Collection name"
                className="min-w-0 flex-1 rounded-full border border-border bg-white px-4 py-2 text-sm outline-none"
              />
              <button type="submit" className="rounded-full bg-ink px-4 text-sm font-bold text-white">
                Save
              </button>
            </form>
          ) : null}
        </header>

        <main className="flex-1 pb-32">
          <div className="mb-6 flex gap-4 overflow-x-auto px-5 py-2">
            {saved.collections.length === 0 ? (
              <div className="w-44 shrink-0">
                <div className="mb-3 grid h-44 grid-cols-2 gap-1 rounded-[32px] bg-white p-1 shadow-[0_12px_28px_rgba(61,41,20,0.08)]">
                  {recipes.slice(0, 3).map((recipe) => (
                    <div
                      key={recipe.id}
                      className="rounded-2xl bg-cover bg-center first:row-span-2"
                      style={{ backgroundImage: `url(${recipe.image})` }}
                    />
                  ))}
                </div>
                <h2 className="px-2 font-bold">Start a collection</h2>
                <p className="px-2 text-xs text-muted-foreground">Group meals you love</p>
              </div>
            ) : (
              saved.collections.map((collection) => {
                const covers = recipes.filter((recipe) => collection.recipeIds.includes(recipe.id));
                return (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() =>
                      setActiveCollection((current) =>
                        current === collection.id ? null : collection.id,
                      )
                    }
                    className="w-44 shrink-0 text-left"
                  >
                    <div className="mb-3 grid h-44 grid-cols-2 gap-1 overflow-hidden rounded-[32px] bg-white p-1 shadow-[0_12px_28px_rgba(61,41,20,0.08)]">
                      {(covers.length > 0 ? covers : recipes).slice(0, 3).map((recipe) => (
                        <div
                          key={recipe.id}
                          className="rounded-2xl bg-cover bg-center first:col-span-2"
                          style={{ backgroundImage: `url(${recipe.image})` }}
                        />
                      ))}
                    </div>
                    <h2 className="px-2 font-bold">{collection.name}</h2>
                    <p className="px-2 text-xs text-muted-foreground">
                      {collection.recipeIds.length} recipes
                    </p>
                  </button>
                );
              })
            )}
          </div>

          <div className="mb-8 flex gap-2.5 overflow-x-auto px-5">
            <button
              type="button"
              onClick={() => setActiveCollection(null)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold ${
                activeCollection === null ? "bg-coral text-white" : "bg-secondary text-muted-foreground"
              }`}
            >
              All
            </button>
            {saved.collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => setActiveCollection(collection.id)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold ${
                  activeCollection === collection.id
                    ? "bg-coral text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>

          <section className="mb-8 px-5">
            <h2 className="mb-4 text-lg font-extrabold">Pantry favorites</h2>
            <div className="flex items-start justify-between gap-2">
              {favorites.map((name) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <IngredientPhoto name={name} />
                  <span className="max-w-14 text-center text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    {shortIngredientLabel(name)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {visible.length === 0 ? (
            <div className="px-5">
              <div className="rounded-[32px] bg-white p-8 text-center shadow-[0_12px_28px_rgba(61,41,20,0.08)]">
                <p className="font-display text-xl font-extrabold">Nothing saved yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tap the heart on a meal, or long-press it and choose Save.
                </p>
                <Link
                  href="/"
                  className="mt-5 inline-flex rounded-full bg-coral px-5 py-3 text-sm font-extrabold text-white"
                >
                  Browse meals
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-5">
              {visible.map((recipe) => (
                <MealCard
                  key={recipe.id}
                  recipe={recipe}
                  layout="tile"
                  allowMove
                  collections={saved.collections}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

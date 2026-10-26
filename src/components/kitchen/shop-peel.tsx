"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Check, Leaf, Milk, Beef } from "lucide-react";
import { recipes } from "@/data/recipes";
import { formatMoney } from "@/lib/cart-state";
import {
  AISLES,
  aisleFor,
  macrosForIngredient,
  shopItemsForRecipe,
  storeById,
  type Aisle,
  type StoreId,
} from "@/lib/kitchen";
import { useCart } from "@/components/cart-provider";
import { IngredientPhoto } from "@/components/kitchen/ingredient-photo";
import { SwipeRow } from "@/components/kitchen/swipe-row";
import { useHaveIt } from "@/components/kitchen/use-have-it";

const AISLE_ICON: Record<Aisle, typeof Leaf> = {
  Produce: Leaf,
  Meat: Beef,
  Pantry: Box,
  Dairy: Milk,
};

export function ShopPeel() {
  const reduce = useReducedMotion();
  const { lines, remove, addMany } = useCart();
  const have = useHaveIt();
  const [storeId, setStoreId] = useState<StoreId>("target");
  const [showHave, setShowHave] = useState(true);
  const store = storeById(storeId);

  const visible = lines.filter((line) => showHave || !have.has(line.id));
  const groups = store.aisleOrder
    .map((aisle) => ({
      aisle,
      rows: visible.filter((line) => aisleFor(line.name) === aisle),
    }))
    .filter((group) => group.rows.length > 0);

  const buying = lines.filter((line) => !have.has(line.id));
  const totals = useMemo(() => {
    return buying.reduce(
      (sum, line) => {
        const macros = macrosForIngredient(line.name);
        return {
          kcal: sum.kcal + macros.kcal * line.qty,
          protein: sum.protein + macros.protein * line.qty,
          carbs: sum.carbs + macros.carbs * line.qty,
          fat: sum.fat + macros.fat * line.qty,
          cents: sum.cents + line.priceCents * line.qty,
        };
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0, cents: 0 },
    );
  }, [buying]);

  const query = buying.map((line) => line.name).join(", ");

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0 px-5 pt-16 opacity-60 blur-sm">
        <div className="space-y-4">
          {recipes.slice(0, 2).map((recipe) => (
            <div
              key={recipe.id}
              className="h-48 rounded-[32px] bg-cover bg-center"
              style={{ backgroundImage: `url(${recipe.image})` }}
            />
          ))}
        </div>
      </div>

      <motion.section
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0.1 : 0.28,
          ease: reduce ? "linear" : [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-x-0 bottom-0 z-20 flex h-[85vh] flex-col rounded-t-[32px] bg-white shadow-[0_-12px_40px_rgba(61,41,20,0.12)]"
      >
        <div className="flex shrink-0 flex-col items-center pt-3 pb-2">
          <div className="h-1.5 w-12 rounded-full bg-border" />
          <p className="mt-2 text-[10px] font-bold tracking-widest text-faint uppercase">
            Pull to peel
          </p>
        </div>

        <header className="shrink-0 border-b border-border px-5 pb-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-xl font-extrabold tracking-tight">Groceries</h1>
              <p className="text-[13px] text-muted-foreground">
                {lines.length} {lines.length === 1 ? "item" : "items"}
                {totals.cents > 0 ? ` · ${formatMoney(totals.cents)}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-cream px-3 py-1.5 text-[11px] font-bold">
              <span className="text-kcal">{totals.kcal}</span>
              <span className="h-3 w-px bg-border" />
              <span className="text-protein">P{totals.protein}</span>
              <span className="text-carbs">C{totals.carbs}</span>
              <span className="text-fat">F{totals.fat}</span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto py-1">
            {(["target", "walmart", "instacart"] as StoreId[]).map((id) => {
              const option = storeById(id);
              const selected = id === storeId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStoreId(id)}
                  className={`h-10 shrink-0 rounded-full px-5 text-[13px] font-bold transition-[border-color,background-color,color] duration-200 ${
                    selected
                      ? "bg-coral text-white shadow-[0_0_0_3px_rgba(255,139,92,0.25)]"
                      : "border border-border bg-white text-muted-foreground"
                  }`}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6 pb-36">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowHave((value) => !value)}
              className="rounded-full bg-secondary px-4 py-2 text-[12px] font-bold text-coral-strong"
            >
              {showHave ? "Hide have-it" : "Show all have-it"}
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="rounded-[32px] border border-border bg-cream p-5">
              <h2 className="font-display text-lg font-extrabold">Your peel is empty</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a meal and its ingredients land here, grouped by aisle.
              </p>
              <div className="mt-4 space-y-2">
                {recipes.slice(0, 4).map((recipe) => (
                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() => addMany(shopItemsForRecipe(recipe))}
                    className="flex w-full items-center justify-between rounded-full border border-border bg-white px-4 py-3 text-left text-sm font-bold"
                  >
                    {recipe.title}
                    <span className="text-[11px] font-bold text-coral uppercase">Add</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {groups.map((group) => {
            const Icon = AISLE_ICON[group.aisle];
            return (
              <section key={group.aisle}>
                <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                  <Icon size={18} />
                  <h2 className="text-[13px] font-extrabold tracking-wider uppercase">
                    {group.aisle} ({group.rows.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {group.rows.map((line) => {
                    const owned = have.has(line.id);
                    return (
                      <SwipeRow
                        key={line.id}
                        faded={owned}
                        onHave={() => have.toggle(line.id)}
                        onRemove={() => remove(line.id)}
                      >
                        <div className={`flex items-center gap-4 p-4 ${owned ? "line-through" : ""}`}>
                          <IngredientPhoto
                            name={line.name}
                            className={owned ? "grayscale" : undefined}
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[15px] font-bold">{line.name}</h3>
                            <p className="text-[12px] text-muted-foreground">
                              {line.amount}
                              {line.qty > 1 ? ` · × ${line.qty}` : ""}
                            </p>
                            {line.recipeTitle ? (
                              <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                                {line.recipeTitle}
                              </span>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            aria-label={owned ? `Need ${line.name} again` : `Have ${line.name}`}
                            onClick={() => have.toggle(line.id)}
                            className={`flex size-6 items-center justify-center rounded-full border-2 ${
                              owned ? "border-protein bg-protein text-white" : "border-border"
                            }`}
                          >
                            {owned ? <Check size={14} /> : null}
                          </button>
                        </div>
                      </SwipeRow>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {lines.length > 0 && groups.length === 0 ? (
            <p className="text-sm text-muted-foreground">Everything here is marked have-it.</p>
          ) : null}

          <p className="text-[11px] text-faint">
            Aisles follow {store.name}: {store.aisleOrder.join(" · ")}. Swipe right to have it,
            left to remove.
          </p>
          <p className="sr-only">{AISLES.join(", ")}</p>
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-5 pt-4 pb-24 backdrop-blur-sm">
          <a
            href={query ? store.searchUrl(query) : store.searchUrl("groceries")}
            target="_blank"
            rel="noreferrer"
            className="flex h-16 w-full items-center justify-center rounded-full bg-coral text-[17px] font-extrabold text-white shadow-[0_12px_24px_rgba(255,139,92,0.3)] active:scale-[0.985] active:bg-coral-strong"
          >
            Send to {store.name} · {formatMoney(totals.cents)}
          </a>
        </footer>
      </motion.section>
    </div>
  );
}

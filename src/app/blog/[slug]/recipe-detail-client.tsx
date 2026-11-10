"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Clock, ExternalLink, Heart, Minus, Plus } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Recipe } from "@/data/recipes";
import {
  macrosForIngredient,
  macrosForRecipe,
  scaleMacros,
  shopItemsForRecipe,
  totalTimeLabel,
} from "@/lib/kitchen";
import { parseIngredientLine } from "@/lib/shoppable";
import {
  AFFILIATE_DISCLOSURE,
  getAffiliateLink,
  getAffiliateSearchLink,
} from "@/lib/Affiliate-Engine";
import { useCart } from "@/components/cart-provider";
import { useSaved } from "@/components/saved-provider";
import BottomNav from "@/components/bottom-nav";
import { IngredientPhoto } from "@/components/kitchen/ingredient-photo";
import { SwipeRow } from "@/components/kitchen/swipe-row";

function leadMacro(name: string) {
  const macros = macrosForIngredient(name);
  const options = [
    { label: `${macros.protein}P`, value: macros.protein, className: "text-protein" },
    { label: `${macros.carbs}C`, value: macros.carbs, className: "text-carbs" },
    { label: `${macros.fat}F`, value: macros.fat, className: "text-fat" },
  ];
  return options.reduce((best, option) => (option.value > best.value ? option : best));
}

export function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const { addMany } = useCart();
  const saved = useSaved();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 280], [0, reduce ? 0 : 8]);
  const [servings, setServings] = useState(recipe.servings);
  const [have, setHave] = useState<Set<string>>(new Set());

  const factor = servings / recipe.servings;
  const macros = scaleMacros(macrosForRecipe(recipe), factor);
  const items = recipe.ingredients.flatMap((line) => parseIngredientLine(line));
  const missingNames = items
    .filter((item) => !have.has(item.id))
    .map((item) => item.productName);
  const missingAffiliate = getAffiliateSearchLink(
    missingNames.length > 0 ? missingNames : items.map((item) => item.productName),
  );
  const isSaved = saved.isSaved(recipe.id);

  function toggleHave(id: string) {
    setHave((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto min-h-screen w-full max-w-md pb-40">
        <div className="relative h-[55vh] overflow-hidden rounded-b-[32px] shadow-lg">
          <motion.img
            src={recipe.image}
            alt={recipe.title}
            style={{ y: heroY }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent" />
          <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-14">
            <Link
              href="/blog"
              aria-label="Back to recipes"
              className="flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-md active:scale-95"
            >
              <ChevronLeft size={24} />
            </Link>
            <button
              type="button"
              aria-label={isSaved ? "Remove from saved" : "Save recipe"}
              onClick={() => saved.toggle(recipe.id)}
              className="flex size-11 items-center justify-center rounded-full bg-white/90 text-coral shadow-sm backdrop-blur-md active:scale-95"
            >
              <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </header>
        </div>

        <div className="mt-8 px-5">
          <h1 className="font-display mb-2 text-[28px] leading-tight font-extrabold">{recipe.title}</h1>
          <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">{recipe.description}</p>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
              <button
                type="button"
                aria-label="Fewer servings"
                className="text-lg leading-none font-bold text-coral active:scale-90"
                onClick={() => setServings((value) => Math.max(1, value - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="mx-2 text-sm font-bold">
                {servings} {servings === 1 ? "serving" : "servings"}
              </span>
              <button
                type="button"
                aria-label="More servings"
                className="text-lg leading-none font-bold text-coral active:scale-90"
                onClick={() => setServings((value) => Math.min(12, value + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Clock className="text-coral" size={16} />
              {totalTimeLabel(recipe.prepTime, recipe.cookTime)}
            </div>
          </div>

          <div className="mb-6 rounded-[24px] border border-border bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-faint uppercase">This meal</span>
              <span className="text-[13px] font-bold text-kcal">{macros.kcal} kcal</span>
            </div>
            <div className="mb-3 flex gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-protein" />
              <div className="h-1.5 flex-1 rounded-full bg-carbs" />
              <div className="h-1.5 flex-1 rounded-full bg-fat" />
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <div className="text-sm font-extrabold">{macros.protein}g</div>
                <div className="text-[10px] font-bold text-protein uppercase">P</div>
              </div>
              <div>
                <div className="text-sm font-extrabold">{macros.carbs}g</div>
                <div className="text-[10px] font-bold text-carbs uppercase">C</div>
              </div>
              <div>
                <div className="text-sm font-extrabold">{macros.fat}g</div>
                <div className="text-[10px] font-bold text-fat uppercase">F</div>
              </div>
            </div>
          </div>

          <section className="mb-8 rounded-[32px] border border-border bg-white p-5 shadow-[0_12px_28px_rgba(61,41,20,0.06)]">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-[13px] font-bold tracking-widest text-muted-foreground uppercase">
                Ingredients
              </h2>
              <span className="text-[12px] font-medium text-faint italic">swipe → have it</span>
            </div>
            <p className="mb-5 px-1 text-[11px] leading-relaxed text-faint">
              {AFFILIATE_DISCLOSURE}
            </p>
            <div className="flex flex-col gap-2">
              {items.map((item) => {
                const owned = have.has(item.id);
                const macro = leadMacro(item.productName);
                const affiliate = getAffiliateLink(item.productName);
                return (
                  <SwipeRow key={item.id} faded={owned} onHave={() => toggleHave(item.id)}>
                    <div className={`flex items-center gap-4 p-2 ${owned ? "line-through" : ""}`}>
                      <IngredientPhoto name={item.productName} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-bold">{item.productName}</div>
                        <div className="text-[12px] text-muted-foreground">
                          {item.amount} · <span className={macro.className}>{macro.label}</span>
                        </div>
                      </div>
                      <a
                        href={affiliate}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        aria-label={`Shop ${item.productName} on Amazon (affiliate)`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sage/15 px-3 py-1.5 text-[10px] font-bold tracking-wider text-sage uppercase"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Shop <ExternalLink size={12} />
                      </a>
                    </div>
                  </SwipeRow>
                );
              })}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-6 px-1 text-[13px] font-bold tracking-widest text-muted-foreground uppercase">
              Steps
            </h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-[15px] leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 bg-cream">
        <div className="mx-auto flex w-full max-w-md flex-col gap-2 px-5 pt-3 pb-2">
          <a
            href={missingAffiliate}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-sage/30 bg-sage/15 text-[13px] font-extrabold tracking-wider text-sage uppercase"
          >
            Shop missing on Amazon <ExternalLink size={14} />
          </a>
          <button
            type="button"
            onClick={() => {
              addMany(shopItemsForRecipe(recipe));
              router.push("/shop");
            }}
            className="flex h-14 w-full items-center justify-center rounded-full bg-coral text-[15px] font-extrabold tracking-widest text-white uppercase shadow-[0_8px_24px_rgba(255,139,92,0.3)] active:scale-[0.985] active:bg-coral-strong"
          >
            Add ingredients to Shop
          </button>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

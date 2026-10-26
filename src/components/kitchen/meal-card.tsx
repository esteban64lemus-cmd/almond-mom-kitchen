"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Heart, Share2, ShoppingCart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Recipe } from "@/data/recipes";
import { macrosForRecipe, shopItemsForRecipe } from "@/lib/kitchen";
import { useCart } from "@/components/cart-provider";
import { useSaved } from "@/components/saved-provider";
import { MacroPills } from "@/components/kitchen/macro-pills";
import type { Collection } from "@/lib/saved-state";

async function shareRecipe(recipe: Recipe) {
  const url = `${window.location.origin}/blog/${recipe.slug}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: recipe.title, url });
      return;
    } catch {
      return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // Sharing is optional when the browser blocks the clipboard.
  }
}

export function MealCard({
  recipe,
  layout = "feed",
  collections = [],
  allowMove = false,
  hint = false,
}: {
  recipe: Recipe;
  layout?: "feed" | "tile";
  collections?: Collection[];
  allowMove?: boolean;
  hint?: boolean;
}) {
  const reduce = useReducedMotion();
  const { addMany } = useCart();
  const saved = useSaved();
  const isSaved = saved.isSaved(recipe.id);
  const macros = macrosForRecipe(recipe);
  const [menu, setMenu] = useState(false);
  const timer = useRef<number | null>(null);
  const held = useRef(false);

  function clearTimer() {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  }

  function startPress() {
    held.current = false;
    clearTimer();
    timer.current = window.setTimeout(() => {
      held.current = true;
      setMenu(true);
    }, 480);
  }

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.1 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {menu ? (
        <>
          <button
            type="button"
            aria-label="Close quick actions"
            className="fixed inset-0 z-40 bg-cream/40 backdrop-blur-[2px]"
            onClick={() => setMenu(false)}
          />
          <div className="absolute -top-2 left-1/2 z-50 w-[min(240px,80%)] -translate-x-1/2 -translate-y-full rounded-[24px] border border-border bg-white p-2 shadow-[0_20px_40px_rgba(61,41,20,0.15)]">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-cream"
              onClick={() => {
                saved.toggle(recipe.id);
                setMenu(false);
              }}
            >
              <Bookmark className="text-coral" size={18} />
              {isSaved ? "Remove from saved" : "Save to collection"}
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border-y border-border/40 px-4 py-3 text-sm font-semibold hover:bg-cream"
              onClick={() => {
                addMany(shopItemsForRecipe(recipe));
                setMenu(false);
              }}
            >
              <ShoppingCart className="text-coral" size={18} />
              Add to Shop
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-cream"
              onClick={() => {
                void shareRecipe(recipe);
                setMenu(false);
              }}
            >
              <Share2 className="text-coral" size={18} />
              Share recipe
            </button>
            {allowMove
              ? collections.map((collection) => (
                  <button
                    key={collection.id}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-cream"
                    onClick={() => {
                      saved.moveTo(recipe.id, collection.id);
                      setMenu(false);
                    }}
                  >
                    <Bookmark className="text-coral" size={18} />
                    Move to {collection.name}
                  </button>
                ))
              : null}
          </div>
        </>
      ) : null}

      <Link
        href={`/blog/${recipe.slug}`}
        className={`kitchen-shadow block overflow-hidden rounded-[32px] border border-border bg-white ${
          menu ? "ring-4 ring-coral/20" : ""
        }`}
        onPointerDown={startPress}
        onPointerUp={clearTimer}
        onPointerLeave={clearTimer}
        onPointerCancel={clearTimer}
        onContextMenu={(event) => event.preventDefault()}
        onClick={(event) => {
          if (!held.current) return;
          event.preventDefault();
          held.current = false;
        }}
      >
        <div className={`relative ${layout === "tile" ? "h-56" : "aspect-[4/5]"}`}>
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes={layout === "tile" ? "180px" : "(min-width: 768px) 420px, 100vw"}
            className="object-cover"
          />
          <button
            type="button"
            aria-label={isSaved ? `Unsave ${recipe.title}` : `Save ${recipe.title}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              saved.toggle(recipe.id);
            }}
            className={`absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm ${
              isSaved ? "text-coral" : "text-muted-foreground"
            }`}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
        <div className={layout === "tile" ? "px-3 py-3" : "flex flex-col gap-4 p-6"}>
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-display font-extrabold ${layout === "tile" ? "text-sm leading-tight" : "text-xl"}`}
            >
              {recipe.title}
            </h3>
            {layout === "feed" ? (
              <span className="shrink-0 text-sm font-bold text-kcal">{macros.kcal} kcal</span>
            ) : null}
          </div>
          {layout === "tile" ? (
            <p className="mt-1 text-[11px] font-extrabold text-kcal">{macros.kcal} kcal</p>
          ) : (
            <MacroPills macros={macros} />
          )}
        </div>
      </Link>
      {hint ? (
        <p className="mt-3 text-center text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          Long-press for quick actions
        </p>
      ) : null}
    </motion.article>
  );
}

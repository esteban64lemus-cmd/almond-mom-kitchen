"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { ShoppableIngredients } from "@/components/shoppable-ingredients";

export function MealFinderCard({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  const panelId = `meal-ingredients-${recipe.id}`;

  return (
    <article className="overflow-hidden rounded-3xl border border-stone-100 bg-white/60 shadow-sm backdrop-blur-md">
      <Link href={`/blog/${recipe.slug}`} className="block">
        <div className="relative h-40 w-full overflow-hidden bg-stone-100">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 320px, 100vw"
          />
        </div>
        <div className="px-5 pt-5">
          <h3 className="text-md mb-2 font-serif leading-snug text-stone-800 italic">
            {recipe.title}
          </h3>
          <div className="flex gap-2">
            {recipe.dietaryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded bg-stone-100 px-2 py-1 text-[9px] font-bold text-stone-600 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="px-5 pt-4 pb-5">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 py-2.5 text-[10px] font-bold tracking-[0.18em] text-white uppercase"
        >
          <ShoppingBag size={14} />
          {open ? "Hide ingredients" : "Shop ingredients"}
        </button>
        {open ? (
          <div id={panelId}>
            <ShoppableIngredients lines={recipe.ingredients} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

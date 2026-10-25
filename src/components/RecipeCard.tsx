"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Recipe } from "@/data/recipes";
import { ShoppableIngredients } from "@/components/shoppable-ingredients";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  const panelId = `recipe-ingredients-${recipe.id}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${recipe.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={recipe.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {recipe.dietaryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col px-5 pt-5 pb-4">
          <h3 className="mb-2 line-clamp-1 text-xl font-bold text-neutral-900">{recipe.title}</h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-neutral-600">{recipe.description}</p>
          <div className="flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {recipe.prepTime}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              {recipe.servings} servings
            </span>
          </div>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 py-2 text-xs font-bold tracking-widest text-neutral-700 uppercase hover:bg-neutral-50"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
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

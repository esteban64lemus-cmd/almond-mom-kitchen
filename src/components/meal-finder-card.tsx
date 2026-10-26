"use client";

import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/data/recipes";
import { MealBlock } from "@/components/meal-block";

export function MealFinderCard({
  recipe,
  open,
  dimmed,
  onToggle,
}: {
  recipe: Recipe;
  open?: boolean;
  dimmed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <MealBlock
      title={recipe.title}
      panelId={`meal-ingredients-${recipe.id}`}
      lines={recipe.ingredients}
      open={open}
      dimmed={dimmed}
      onToggle={onToggle}
    >
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
    </MealBlock>
  );
}

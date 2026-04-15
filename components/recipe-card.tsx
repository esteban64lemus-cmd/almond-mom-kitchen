// recipe-card.tsx
// Renders recipe with affiliateUrl button + Verified Clean badge

import { getCleanBadgeLabel } from "@/lib/AI-Converter";

interface RecipeCardProps {
  title: string;
  description: string;
  category: string;
  affiliateUrl: string;
  isCleanSwap: boolean;
  imageUrl?: string;
}

export default function RecipeCard({
  title,
  description,
  category,
  affiliateUrl,
  isCleanSwap,
  imageUrl,
}: RecipeCardProps) {
  const badge = getCleanBadgeLabel(isCleanSwap);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-3">
        {/* Category tag */}
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
          {category}
        </span>

        {/* Title */}
        <h2 className="text-lg font-bold text-stone-800">{title}</h2>

        {/* Verified Clean Badge */}
        {badge && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium w-fit">
            {badge}
          </span>
        )}

        {/* Description */}
        <p className="text-sm text-stone-500 line-clamp-3">{description}</p>

        {/* Affiliate CTA Button */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-2 inline-block text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
        >
          Shop the Ingredients →
        </a>
      </div>
    </div>
  );
}

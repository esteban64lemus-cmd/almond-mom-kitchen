// SEO-Handler.tsx
// Manages metadata for recipe discoverability

import { Metadata } from "next";

interface RecipeSEOProps {
  title: string;
  description: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

export function generateRecipeMetadata({
  title,
  description,
  category,
  slug,
  imageUrl,
}: RecipeSEOProps): Metadata {
  const fullTitle = `${title} | Almond Mom Kitchen`;
  const canonicalUrl = `https://almondmomkitchen.com/blog/${slug}`;

  return {
    title: fullTitle,
    description,
    keywords: [category, "clean eating", "wellness recipe", "almond mom kitchen", title],
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "Almond Mom Kitchen",
      images: imageUrl ? [{ url: imageUrl, alt: title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

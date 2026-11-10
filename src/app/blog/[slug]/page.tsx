import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { recipes } from "@/data/recipes";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { recipeJsonLd } from "@/lib/recipe-seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { RecipeDetailClient } from "./recipe-detail-client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((entry) => entry.slug === slug);
  if (!recipe) {
    return { title: "Recipe not found" };
  }

  const title = `${recipe.title} | Almond Mom Recipes`;
  const description = `${recipe.description} Seed oil free clean eating for busy families.`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/blog/${recipe.slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/blog/${recipe.slug}`),
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: recipe.image, alt: recipe.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = recipes.find((entry) => entry.slug === slug);
  if (!recipe) notFound();

  return (
    <>
      <SEOHandler schemaData={recipeJsonLd(recipe)} />
      <RecipeDetailClient recipe={recipe} />
    </>
  );
}

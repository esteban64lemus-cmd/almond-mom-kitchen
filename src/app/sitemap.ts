import type { MetadataRoute } from "next";
import { recipes } from "@/data/recipes";
import { journalPosts } from "@/content/journal/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    // Anonymous `/` redirects to `/welcome`; keep welcome as the primary entry.
    { url: absoluteUrl("/welcome"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/mission"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/journal"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/desk"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: absoluteUrl(`/blog/${recipe.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: absoluteUrl(`/journal/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...recipeRoutes, ...journalRoutes];
}

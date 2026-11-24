export const SITE_URL = "https://www.almondmom.online";
export const APEX_URL = "https://almondmom.online";
export const PROFILE_URL = "https://esteban.almondmom.online";
export const INSTAGRAM_URL = "https://instagram.com/a_bagel_hater";
export const GITHUB_URL = "https://github.com/esteban64lemus-cmd/almond-mom-kitchen";

export const SITE_NAME = "Almond Mom Kitchen";
export const BRAND_NAME = "Almond Mom";
export const SITE_TITLE = "Almond Mom Kitchen — AI Fridge Rescue, Meal Planner & High-Protein Recipes";
export const DEFAULT_DESCRIPTION =
  "Almond Mom Kitchen: high-protein, seed oil free recipes, weekly meal prep, and an AI Fridge Rescue that turns the ingredients you already have into family meals.";
export const SITE_KEYWORDS = [
  "almond mom kitchen",
  "almond mom",
  "almond mom recipes",
  "high-protein meal prep",
  "AI fridge recipes",
  "seed oil free recipes",
];
// Working inbox (already public on /desk). Swap to hello@almondmom.online once
// Cloudflare Email Routing (free) forwards it to Gmail.
export const CONTACT_EMAIL = "esteban64lemus@gmail.com";
export const FOUNDER_NAME = "Esteban Lemus";
// X caps handles at 15 chars; "@almondmomkitchen" (16) can't be registered. Set once claimed.
export const X_HANDLE: string | undefined = undefined;
// Only profiles that exist and link back to the site. Add new handles here as you claim them.
export const SAME_AS = [PROFILE_URL, INSTAGRAM_URL, GITHUB_URL];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export const SITE_URL = "https://www.almondmom.online";
export const APEX_URL = "https://almondmom.online";
export const PROFILE_URL = "https://esteban.almondmom.online";
export const INSTAGRAM_URL = "https://instagram.com/a_bagel_hater";
export const GITHUB_URL = "https://github.com/esteban64lemus-cmd/almond-mom-kitchen";

export const SITE_NAME = "Almond Mom Kitchen";
export const DEFAULT_DESCRIPTION =
  "Almond Mom clean-eating recipes, seed oil free kitchen swaps, and an AI companion for organic family meals.";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

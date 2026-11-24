import { pillarGuides } from "./pillar-guides";

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  heroImage: string;
  sections: { heading: string; body: string[] }[];
};

const corePosts: JournalPost[] = [
  {
    slug: "seed-oil-free-grocery-swaps",
    title: "Seed Oil Free Grocery Swaps That Still Taste Like Luxury",
    description:
      "A practical seed oil free shopping list: clean label swaps for oils, dressings, snacks, and pantry staples almond moms actually buy.",
    date: "2026-04-08",
    tags: ["seed oil free", "clean label", "grocery swaps"],
    readingMinutes: 6,
    heroImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Why seed oils show up everywhere",
        body: [
          "Canola, soybean, sunflower, and “vegetable oil” blends are cheap, shelf-stable, and hidden in sauces, chips, tortillas, and takeout. If you are searching for seed oil free recipes, the first win is usually the grocery cart — not a new cookbook.",
          "Our take: prevention starts at the label. Western nutrition guidance already pushes whole foods; the holistic layer is noticing how often industrial oils sneak into “healthy” products.",
        ],
      },
      {
        heading: "High-impact swaps for an almond mom kitchen",
        body: [
          "Cooking fat: choose extra-virgin olive oil, avocado oil, ghee, butter, coconut oil, or tallow instead of canola blends.",
          "Dressings and mayo: buy olive-oil or avocado-oil versions, or whisk lemon, mustard, and EVOO at home in two minutes.",
          "Chips and crackers: look for avocado oil or olive oil on the front, then confirm the ingredient list has no “vegetable oil.”",
          "Protein bars and sauces: skip anything listing soybean oil, sunflower oil, or canola near the top of the label.",
        ],
      },
      {
        heading: "Turn swaps into weeknight dinners",
        body: [
          "Once the pantry is cleaner, almond mom recipes become easier: sear chicken in olive oil, finish vegetables with lemon, and stop fighting mystery oils in bottled marinades.",
          "Use Almond Mom’s Shop Upgrader when you paste a list — it is built to push elite organic alternatives instead of default ultra-processed picks.",
        ],
      },
    ],
  },
  {
    slug: "almond-mom-weeknight-dinners",
    title: "Almond Mom Weeknight Dinners: Clean Eating Family Meals in Under 30",
    description:
      "Almond mom recipes for busy nights — high protein, clean eating family meals that feel elevated without a weekend project.",
    date: "2026-04-10",
    tags: ["almond mom recipes", "family meals", "high protein"],
    readingMinutes: 7,
    heroImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "What “almond mom” cooking actually means here",
        body: [
          "Forget the internet caricature. In this kitchen, almond mom recipes mean clean ingredients, visible protein, and food that respects your family’s energy — not perfection theater.",
          "The pattern: one hero protein, one bright vegetable, one smart carb or leafy base, and fats you can name.",
        ],
      },
      {
        heading: "A 30-minute template that scales",
        body: [
          "Minute 0–5: heat a skillet, season chicken, salmon, or grass-fed beef.",
          "Minute 5–20: cook protein while a grain finishes or greens wilt in olive oil and garlic.",
          "Minute 20–30: plate with lemon, herbs, and a clean sauce — yogurt-tahini, chimichurri, or crushed tomato with basil.",
          "That template covers most clean eating family meals people search for: bowls, skillet dinners, and sheet-pan trays.",
        ],
      },
      {
        heading: "Where the AI kitchen helps",
        body: [
          "When leftovers look random, Fridge Rescue turns inventory into a gourmet clean-label plate instead of another delivery order.",
          "Browse the recipe journal for lemon herb chicken bowls, bone broth soups, and other high-protein dinners that match the almond mom aesthetic without seed oils.",
        ],
      },
    ],
  },
  {
    slug: "preventive-kitchen-habits",
    title: "Preventive Kitchen Habits: Holistic + Western Basics That Stick",
    description:
      "Preventive health habits that start in the kitchen — simple routines blending holistic awareness with practical western nutrition.",
    date: "2026-04-12",
    tags: ["preventive health", "habits", "nutrition"],
    readingMinutes: 5,
    heroImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    sections: [
      {
        heading: "Prevention is a repeatable kitchen system",
        body: [
          "The Almond Mom Journal exists for the questions between doctor visits: how do you eat in a way that supports energy, recovery, and long-term vitality?",
          "Western nutrition gives clear levers — protein, fiber, micronutrients, sleep-supporting evening meals. Holistic practice adds attention: cook more of what you can pronounce, notice how seed oils and ultra-processed snacks feel in your body.",
        ],
      },
      {
        heading: "Five habits with outsized return",
        body: [
          "Batch a clean protein twice a week so weeknights start halfway done.",
          "Keep olive oil, citrus, and herbs visible — flavor beats default bottled sauces.",
          "Audit one pantry shelf each Sunday for gums, dyes, and seed oils.",
          "Build a “always” list: eggs, greens, berries, yogurt or coconut yogurt, frozen wild fish.",
          "Use an AI pantry check when you are stuck instead of doom-scrolling takeout menus.",
        ],
      },
      {
        heading: "From reading to cooking",
        body: [
          "Articles create clarity. Recipes create momentum. Move from this journal into Almond Mom’s seed oil free recipe collection, then launch the app when you want Fridge Rescue or grocery upgrades.",
          "That loop — learn, cook, refine — is how preventive kitchen habits become identity instead of a January project.",
        ],
      },
    ],
  },
];

export const journalPosts: JournalPost[] = [...corePosts, ...pillarGuides];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export function getAllJournalSlugs() {
  return journalPosts.map((post) => post.slug);
}

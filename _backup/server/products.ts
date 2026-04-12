/**
 * Stripe Products Configuration
 * Define all products and pricing tiers for the Almond Mom Kitchen
 */

export const stripeProducts = {
  // E-Books & Cookbooks
  glutenFreeeCookbook: {
    name: "Gluten-Free Cookbook",
    description: "100+ gluten-free recipes from Almond Mom Kitchen",
    type: "ebook",
    price: 2999, // $29.99
    stripePriceId: process.env.STRIPE_GLUTEN_FREE_COOKBOOK_PRICE_ID || "",
  },
  
  noPreservativesCookbook: {
    name: "No Preservatives Cookbook",
    description: "50+ recipes with no artificial preservatives",
    type: "ebook",
    price: 1999, // $19.99
    stripePriceId: process.env.STRIPE_NO_PRESERVATIVES_COOKBOOK_PRICE_ID || "",
  },

  // Meal Plans - Subscriptions
  weeklyMealPlan: {
    name: "Weekly Meal Plan",
    description: "New meal plans every week with shopping lists",
    type: "meal_plan",
    price: 1299, // $12.99/week
    interval: "week",
    stripePriceId: process.env.STRIPE_WEEKLY_MEAL_PLAN_PRICE_ID || "",
  },

  monthlyMealPlan: {
    name: "Monthly Meal Plan",
    description: "4 weeks of meal plans with recipes and shopping lists",
    type: "meal_plan",
    price: 4999, // $49.99/month
    interval: "month",
    stripePriceId: process.env.STRIPE_MONTHLY_MEAL_PLAN_PRICE_ID || "",
  },

  yearlyMealPlan: {
    name: "Yearly Meal Plan",
    description: "52 weeks of meal plans (save 20%)",
    type: "meal_plan",
    price: 47999, // $479.99/year (saves $120)
    interval: "year",
    stripePriceId: process.env.STRIPE_YEARLY_MEAL_PLAN_PRICE_ID || "",
  },

  // Video Courses
  healthyBakingCourse: {
    name: "Healthy Baking Masterclass",
    description: "Learn to bake gluten-free, no-preservatives treats",
    type: "course",
    price: 4999, // $49.99 one-time
    stripePriceId: process.env.STRIPE_BAKING_COURSE_PRICE_ID || "",
  },

  mealPrepCourse: {
    name: "Meal Prep for Busy Moms",
    description: "Master meal prep with healthy, quick recipes",
    type: "course",
    price: 3999, // $39.99 one-time
    stripePriceId: process.env.STRIPE_MEAL_PREP_COURSE_PRICE_ID || "",
  },

  // Premium Content
  premiumRecipeBundle: {
    name: "Premium Recipe Bundle",
    description: "Access to 50+ exclusive premium recipes",
    type: "ebook",
    price: 1499, // $14.99
    stripePriceId: process.env.STRIPE_PREMIUM_RECIPE_BUNDLE_PRICE_ID || "",
  },
};

/**
 * Get product by key
 */
export function getProduct(key: keyof typeof stripeProducts) {
  return stripeProducts[key];
}

/**
 * Get all products
 */
export function getAllProducts() {
  return Object.entries(stripeProducts).map(([key, product]) => ({
    id: key,
    ...product,
  }));
}

/**
 * Get subscription products only
 */
export function getSubscriptionProducts() {
  return Object.entries(stripeProducts)
    .filter(([_, product]) => 'interval' in product && product.interval)
    .map(([key, product]) => ({
      id: key,
      ...product,
    }));
}

/**
 * Get one-time purchase products only
 */
export function getOneTimeProducts() {
  return Object.entries(stripeProducts)
    .filter(([_, product]) => !('interval' in product && product.interval))
    .map(([key, product]) => ({
      id: key,
      ...product,
    }));
}

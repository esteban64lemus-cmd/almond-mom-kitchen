import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Recipe categories for filtering
 */
export const recipes = mysqlTable("recipes", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  ingredients: text("ingredients").notNull(), // JSON array stored as text
  instructions: text("instructions").notNull(), // JSON array of steps
  prepTime: int("prepTime"), // minutes
  cookTime: int("cookTime"), // minutes
  servings: int("servings"),
  yield: varchar("yield", { length: 255 }), // e.g., "12 cookies"
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("easy"),
  category: mysqlEnum("category", ["gluten-free", "dairy-free", "no-preservatives", "no-gmo", "vegan", "quick-easy", "other"]).notNull(),
  tags: varchar("tags", { length: 500 }), // comma-separated
  nutritionInfo: text("nutritionInfo"), // JSON object
  imageUrl: text("imageUrl"),
  videoUrl: text("videoUrl"),
  authorId: int("authorId").notNull(),
  published: int("published").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;

/**
 * Draft recipes awaiting moderation
 */
export const recipeDrafts = mysqlTable("recipe_drafts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  ingredients: text("ingredients").notNull(), // JSON array
  instructions: text("instructions").notNull(), // JSON array
  prepTime: int("prepTime"),
  cookTime: int("cookTime"),
  servings: int("servings"),
  yield: varchar("yield", { length: 255 }),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("easy"),
  category: mysqlEnum("category", ["gluten-free", "dairy-free", "no-preservatives", "no-gmo", "vegan", "quick-easy", "other"]).notNull(),
  tags: varchar("tags", { length: 500 }),
  nutritionInfo: text("nutritionInfo"),
  imageUrl: text("imageUrl"),
  videoUrl: text("videoUrl"),
  submittedBy: int("submittedBy").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  aiAnalysis: text("aiAnalysis"), // JSON object with AI-generated insights
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RecipeDraft = typeof recipeDrafts.$inferSelect;
export type InsertRecipeDraft = typeof recipeDrafts.$inferInsert;
/**
 * User notifications for in-app alerts
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["recipe_published", "draft_approved", "draft_rejected", "recipe_submitted", "error", "info"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  relatedRecipeId: int("relatedRecipeId"),
  relatedDraftId: int("relatedDraftId"),
  read: int("read").default(0).notNull(),
  actionUrl: text("actionUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Products for e-commerce (cookbooks, meal plans, courses, etc.)
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["ebook", "meal_plan", "course", "affiliate"]).notNull(),
  price: int("price").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  imageUrl: text("imageUrl"),
  content: text("content"), // JSON with course modules, ebook chapters, etc.
  isRecurring: int("isRecurring").default(0).notNull(), // 1 for subscriptions
  recurringInterval: mysqlEnum("recurringInterval", ["week", "month", "year"]),
  featured: int("featured").default(0).notNull(),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * User purchases and orders
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }),
  amount: int("amount").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  downloadUrl: text("downloadUrl"), // for ebooks
  accessExpiresAt: timestamp("accessExpiresAt"), // for courses/meal plans
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * User subscriptions
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  status: mysqlEnum("status", ["active", "paused", "cancelled", "expired"]).default("active").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  cancelledAt: timestamp("cancelledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Affiliate products and recommendations
 */
export const affiliateProducts = mysqlTable("affiliate_products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  affiliateUrl: text("affiliateUrl").notNull(),
  imageUrl: text("imageUrl"),
  category: varchar("category", { length: 100 }),
  commission: varchar("commission", { length: 100 }), // e.g., "10%" or "$5"
  featured: int("featured").default(0).notNull(),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AffiliateProduct = typeof affiliateProducts.$inferSelect;
export type InsertAffiliateProduct = typeof affiliateProducts.$inferInsert;

/**
 * Customer testimonials
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerImage: text("customerImage"),
  content: text("content").notNull(),
  rating: int("rating"), // 1-5 stars
  featured: int("featured").default(0).notNull(),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Brand customization settings
 */
export const brandSettings = mysqlTable("brand_settings", {
  id: int("id").autoincrement().primaryKey(),
  siteTitle: varchar("siteTitle", { length: 255 }).default("Almond Mom Kitchen").notNull(),
  tagline: text("tagline"),
  logoUrl: text("logoUrl"),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#2d5016").notNull(), // forest green
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#f5f1e8").notNull(), // cream
  accentColor: varchar("accentColor", { length: 7 }).default("#8b6f47").notNull(), // brown
  fontFamily: varchar("fontFamily", { length: 100 }).default("Lato").notNull(),
  headingFont: varchar("headingFont", { length: 100 }).default("Playfair Display").notNull(),
  aboutText: text("aboutText"),
  missionStatement: text("missionStatement"),
  socialMediaLinks: text("socialMediaLinks"), // JSON
  contactEmail: varchar("contactEmail", { length: 320 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BrandSettings = typeof brandSettings.$inferSelect;
export type InsertBrandSettings = typeof brandSettings.$inferInsert;

/**
 * Analytics and tracking
 */
export const analytics = mysqlTable("analytics", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("eventType", { length: 100 }).notNull(), // "recipe_view", "product_purchase", etc.
  userId: int("userId"),
  productId: int("productId"),
  recipeId: int("recipeId"),
  metadata: text("metadata"), // JSON for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;

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
import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, recipes, recipeDrafts, Recipe, InsertRecipe, RecipeDraft, InsertRecipeDraft } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Recipe queries
export async function getPublishedRecipes(category?: string, limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(recipes).where(eq(recipes.published, 1));
  
  if (category) {
    query = db.select().from(recipes).where(and(eq(recipes.published, 1), eq(recipes.category, category as any)));
  }
  
  return query.orderBy(desc(recipes.createdAt)).limit(limit).offset(offset);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(recipes).where(and(eq(recipes.slug, slug), eq(recipes.published, 1))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createRecipe(recipe: InsertRecipe): Promise<Recipe | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(recipes).values(recipe);
    const created = await db.select().from(recipes).where(eq(recipes.slug, recipe.slug!)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create recipe:", error);
    throw error;
  }
}

export async function updateRecipe(id: number, updates: Partial<InsertRecipe>): Promise<Recipe | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.update(recipes).set(updates).where(eq(recipes.id, id));
    const updated = await db.select().from(recipes).where(eq(recipes.id, id)).limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update recipe:", error);
    throw error;
  }
}

// Recipe Draft queries
export async function createRecipeDraft(draft: InsertRecipeDraft): Promise<RecipeDraft | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(recipeDrafts).values(draft);
    const created = await db.select().from(recipeDrafts).where(eq(recipeDrafts.submittedBy, draft.submittedBy)).orderBy(desc(recipeDrafts.createdAt)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create recipe draft:", error);
    throw error;
  }
}

export async function getPendingDrafts(limit: number = 50): Promise<RecipeDraft[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(recipeDrafts).where(eq(recipeDrafts.status, "pending")).orderBy(desc(recipeDrafts.createdAt)).limit(limit);
}

export async function updateRecipeDraft(id: number, updates: Partial<InsertRecipeDraft>): Promise<RecipeDraft | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.update(recipeDrafts).set(updates).where(eq(recipeDrafts.id, id));
    const updated = await db.select().from(recipeDrafts).where(eq(recipeDrafts.id, id)).limit(1);
    return updated.length > 0 ? updated[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update recipe draft:", error);
    throw error;
  }
}

export async function approveDraft(draftId: number): Promise<Recipe | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const draft = await db.select().from(recipeDrafts).where(eq(recipeDrafts.id, draftId)).limit(1);
    if (draft.length === 0) return null;

    const d = draft[0];
    
    const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const recipe = await createRecipe({
      title: d.title,
      slug,
      description: d.description,
      ingredients: d.ingredients,
      instructions: d.instructions,
      prepTime: d.prepTime,
      cookTime: d.cookTime,
      servings: d.servings,
      yield: d.yield,
      difficulty: d.difficulty,
      category: d.category,
      tags: d.tags,
      nutritionInfo: d.nutritionInfo,
      imageUrl: d.imageUrl,
      videoUrl: d.videoUrl,
      authorId: d.submittedBy,
      published: 1,
    });

    await updateRecipeDraft(draftId, { status: "approved" });

    return recipe;
  } catch (error) {
    console.error("[Database] Failed to approve draft:", error);
    throw error;
  }
}

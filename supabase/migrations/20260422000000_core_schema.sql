-- Almond Mom Kitchen: Core Database Schema
-- Focus: High-performance recipe matching (Fridge Rescue) and Clean-Swap verification.

-- 1. Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Recipes Table (Relational mirror of Sanity content for fast filtering)
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    
    -- Macros (Almond Mom focus)
    calories INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER,
    
    -- Timing
    prep_time INTEGER, -- minutes
    cook_time INTEGER, -- minutes
    
    -- Metadata
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Ingredients Table (Canonical list for matching)
CREATE TABLE IF NOT EXISTS public.ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL, -- lowercase for search
    category TEXT, -- e.g., 'Produce', 'Dairy', 'Pantry', 'Protein'
    is_clean_swap BOOLEAN DEFAULT FALSE,
    clean_swap_alternative_id UUID REFERENCES public.ingredients(id),
    affiliate_url TEXT, -- Link to buy the clean version
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Recipe Ingredients (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
    ingredient_id UUID REFERENCES public.ingredients(id) ON DELETE CASCADE NOT NULL,
    quantity NUMERIC,
    unit TEXT, -- e.g., 'grams', 'oz', 'cups'
    
    UNIQUE(recipe_id, ingredient_id)
);

-- 5. User Pantry Inventory (For Fridge Rescue & Pantry Auditor)
CREATE TABLE IF NOT EXISTS public.pantry_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    ingredient_id UUID REFERENCES public.ingredients(id) ON DELETE CASCADE NOT NULL,
    quantity NUMERIC DEFAULT 0,
    unit TEXT,
    last_audited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    UNIQUE(user_id, ingredient_id)
);

-- 6. Row-Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;

-- Recipes: Everyone can view, only service_role/admin can edit
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Recipes are viewable by everyone' AND tablename = 'recipes') THEN
        CREATE POLICY "Recipes are viewable by everyone" ON public.recipes FOR SELECT USING (true);
    END IF;
END $$;

-- Ingredients: Everyone can view, only service_role/admin can edit
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Ingredients are viewable by everyone' AND tablename = 'ingredients') THEN
        CREATE POLICY "Ingredients are viewable by everyone" ON public.ingredients FOR SELECT USING (true);
    END IF;
END $$;

-- Recipe Ingredients: Everyone can view
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Recipe ingredients are viewable by everyone' AND tablename = 'recipe_ingredients') THEN
        CREATE POLICY "Recipe ingredients are viewable by everyone" ON public.recipe_ingredients FOR SELECT USING (true);
    END IF;
END $$;

-- Pantry Items: Users can only see and manage their own items
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own pantry items' AND tablename = 'pantry_items') THEN
        CREATE POLICY "Users can view own pantry items" ON public.pantry_items FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own pantry items' AND tablename = 'pantry_items') THEN
        CREATE POLICY "Users can insert own pantry items" ON public.pantry_items FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own pantry items' AND tablename = 'pantry_items') THEN
        CREATE POLICY "Users can update own pantry items" ON public.pantry_items FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own pantry items' AND tablename = 'pantry_items') THEN
        CREATE POLICY "Users can delete own pantry items" ON public.pantry_items FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- 7. Functions & Triggers

-- Function to search recipes by ingredients (The "Fridge Rescue" Engine)
CREATE OR REPLACE FUNCTION public.find_recipes_by_ingredients(search_ingredient_ids UUID[])
RETURNS SETOF public.recipes AS $$
BEGIN
    RETURN QUERY
    SELECT r.*
    FROM public.recipes r
    JOIN public.recipe_ingredients ri ON r.id = ri.recipe_id
    WHERE ri.ingredient_id = ANY(search_ingredient_ids)
    GROUP BY r.id
    HAVING COUNT(DISTINCT ri.ingredient_id) >= array_length(search_ingredient_ids, 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed Data for Almond Mom Kitchen
-- Focus: Clean Swaps and Initial Recipe for Fridge Rescue testing

-- 1. Insert Clean Ingredients
INSERT INTO public.ingredients (name, category, is_clean_swap)
VALUES 
    ('almond flour', 'Pantry', true),
    ('monk fruit sweetener', 'Pantry', true),
    ('grass-fed butter', 'Dairy', true),
    ('avocado oil', 'Pantry', true),
    ('organic eggs', 'Protein', true),
    ('chia seeds', 'Pantry', true),
    ('cauliflower rice', 'Produce', true)
ON CONFLICT (name) DO NOTHING;

-- 2. Insert "Dirty" Ingredients with Clean Swaps
DO $$
DECLARE
    almond_flour_id UUID;
    monk_fruit_id UUID;
    butter_id UUID;
BEGIN
    SELECT id INTO almond_flour_id FROM public.ingredients WHERE name = 'almond flour';
    SELECT id INTO monk_fruit_id FROM public.ingredients WHERE name = 'monk fruit sweetener';
    SELECT id INTO butter_id FROM public.ingredients WHERE name = 'grass-fed butter';

    INSERT INTO public.ingredients (name, category, is_clean_swap, clean_swap_alternative_id, affiliate_url)
    VALUES 
        ('all-purpose flour', 'Pantry', false, almond_flour_id, 'https://amzn.to/clean-almond-flour'),
        ('refined white sugar', 'Pantry', false, monk_fruit_id, 'https://amzn.to/clean-monk-fruit'),
        ('margarine', 'Dairy', false, butter_id, 'https://amzn.to/clean-butter')
    ON CONFLICT (name) DO NOTHING;
END $$;

-- 3. Insert Initial Recipes
INSERT INTO public.recipes (title, slug, description, calories, protein, carbs, fat, prep_time, cook_time)
VALUES 
    ('Almond Flour Power Pancakes', 'almond-flour-pancakes', 'Fluffy, high-protein pancakes that won''t spike your insulin. The ultimate clean swap for traditional breakfast.', 320, 18, 8, 22, 10, 15),
    ('Keto Avocado Power Bowl', 'keto-avocado-bowl', 'Dense nutrition with healthy fats and fiber. Clean energy for the whole day.', 450, 12, 10, 38, 15, 0)
ON CONFLICT (slug) DO NOTHING;

-- 4. Map Recipe Ingredients
DO $$
DECLARE
    pancake_id UUID;
    bowl_id UUID;
    almond_flour_id UUID;
    butter_id UUID;
    egg_id UUID;
    avocado_oil_id UUID;
BEGIN
    SELECT id INTO pancake_id FROM public.recipes WHERE slug = 'almond-flour-pancakes';
    SELECT id INTO bowl_id FROM public.recipes WHERE slug = 'keto-avocado-bowl';
    
    SELECT id INTO almond_flour_id FROM public.ingredients WHERE name = 'almond flour';
    SELECT id INTO butter_id FROM public.ingredients WHERE name = 'grass-fed butter';
    SELECT id INTO egg_id FROM public.ingredients WHERE name = 'organic eggs';
    SELECT id INTO avocado_oil_id FROM public.ingredients WHERE name = 'avocado oil';

    -- Pancakes
    INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
    VALUES 
        (pancake_id, almond_flour_id, 1.5, 'cups'),
        (pancake_id, butter_id, 2, 'tbsp'),
        (pancake_id, egg_id, 2, 'large')
    ON CONFLICT DO NOTHING;

    -- Bowl
    INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
    VALUES 
        (bowl_id, avocado_oil_id, 1, 'tbsp'),
        (bowl_id, egg_id, 1, 'large')
    ON CONFLICT DO NOTHING;
END $$;

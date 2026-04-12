import { drizzle } from "drizzle-orm/mysql2";
import { recipes } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

const sampleRecipes = [
  {
    title: "Golden Almond Butter Smoothie Bowl",
    slug: "golden-almond-butter-smoothie-bowl",
    description: "A creamy, nutrient-dense smoothie bowl topped with granola, fresh berries, and raw almonds. Perfect for a gluten-free breakfast.",
    category: "gluten-free" as const,
    ingredients: "2 cups unsweetened almond milk\n1 cup Greek yogurt (or dairy-free alternative)\n2 tbsp raw almond butter\n1 frozen banana\n1/2 cup frozen blueberries\n1 tbsp raw honey\n1/2 tsp vanilla extract\n\nToppings:\n1/4 cup granola\n1/4 cup fresh berries\n2 tbsp sliced almonds\n1 tbsp coconut flakes",
    instructions: "1. Blend almond milk, yogurt, almond butter, frozen banana, blueberries, honey, and vanilla until smooth.\n2. Pour into a bowl.\n3. Arrange granola, berries, almonds, and coconut flakes on top.\n4. Serve immediately with a spoon.",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "easy" as const,
    tags: "breakfast, gluten-free, dairy-free, vegan-option",
    imageUrl: "https://cdn.example.com/recipe1.jpg",
    status: "published" as const,
    publishedAt: new Date(),
  },
  {
    title: "Crispy Almond-Crusted Chicken Breast",
    slug: "crispy-almond-crusted-chicken-breast",
    description: "Juicy chicken breasts coated with a crunchy almond crust. Completely gluten-free and packed with protein.",
    category: "gluten-free" as const,
    ingredients: "4 boneless, skinless chicken breasts\n1 cup raw almonds (finely ground)\n2 eggs\n1/4 cup almond flour\n1 tsp sea salt\n1/2 tsp black pepper\n1/2 tsp garlic powder\n2 tbsp olive oil",
    instructions: "1. Preheat oven to 375°F.\n2. Pound chicken breasts to even thickness.\n3. Mix ground almonds, almond flour, salt, pepper, and garlic powder in a bowl.\n4. Beat eggs in another bowl.\n5. Dip chicken in egg, then coat with almond mixture.\n6. Heat olive oil in a skillet over medium-high heat.\n7. Sear chicken 3-4 minutes per side until golden.\n8. Transfer to oven and bake 12-15 minutes until cooked through.",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "medium" as const,
    tags: "gluten-free, protein, dinner, no-preservatives",
    imageUrl: "https://cdn.example.com/recipe2.jpg",
    status: "published" as const,
    publishedAt: new Date(),
  },
  {
    title: "Raw Almond Energy Balls",
    slug: "raw-almond-energy-balls",
    description: "No-bake, no-preservatives energy bites made with raw almonds, dates, and cacao. Perfect for snacking.",
    category: "no-preservatives" as const,
    ingredients: "2 cups raw almonds\n1 cup pitted dates\n3 tbsp raw cacao powder\n1 tbsp coconut oil\n1/4 tsp sea salt\nOptional: 1 tsp vanilla extract",
    instructions: "1. Pulse almonds in a food processor until finely chopped.\n2. Add dates, cacao powder, coconut oil, and salt.\n3. Pulse until mixture resembles wet sand.\n4. Roll into 1-inch balls.\n5. Refrigerate in an airtight container for up to 2 weeks.",
    prepTime: 20,
    cookTime: 0,
    servings: 24,
    yield: "24 balls",
    difficulty: "easy" as const,
    tags: "no-bake, no-preservatives, vegan, gluten-free, snack",
    imageUrl: "https://cdn.example.com/recipe3.jpg",
    status: "published" as const,
    publishedAt: new Date(),
  },
  {
    title: "Quick 15-Minute Almond Noodle Stir-Fry",
    slug: "quick-15-minute-almond-noodle-stir-fry",
    description: "A fast, delicious stir-fry with zucchini noodles, fresh veggies, and a creamy almond sauce. Gluten-free and ready in minutes.",
    category: "quick-easy" as const,
    ingredients: "3 medium zucchini (spiralized)\n2 cups mixed vegetables (bell peppers, broccoli, carrots)\n1/4 cup almond butter\n2 tbsp tamari (gluten-free soy sauce)\n1 tbsp rice vinegar\n1 clove garlic, minced\n1 tbsp sesame oil\n2 tbsp water\nToppings: sliced almonds, sesame seeds, green onions",
    instructions: "1. Heat sesame oil in a large wok or skillet over high heat.\n2. Add garlic and cook for 30 seconds.\n3. Add vegetables and stir-fry for 3-4 minutes.\n4. Mix almond butter, tamari, vinegar, and water in a bowl.\n5. Add zucchini noodles to the wok.\n6. Pour sauce over and toss for 2-3 minutes.\n7. Top with almonds, sesame seeds, and green onions.",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    difficulty: "easy" as const,
    tags: "quick-easy, gluten-free, vegan, no-preservatives",
    imageUrl: "https://cdn.example.com/recipe4.jpg",
    status: "published" as const,
    publishedAt: new Date(),
  },
  {
    title: "Vegan Almond Milk Latte",
    slug: "vegan-almond-milk-latte",
    description: "A creamy, dairy-free latte made with homemade almond milk and espresso. No artificial flavors or additives.",
    category: "vegan" as const,
    ingredients: "2 cups unsweetened almond milk\n1-2 shots espresso\n1 tbsp raw almond butter (optional, for creaminess)\n1 tsp raw honey or maple syrup\nPinch of cinnamon",
    instructions: "1. Brew 1-2 shots of espresso into your cup.\n2. Warm almond milk in a small saucepan (do not boil).\n3. Stir in almond butter if using.\n4. Pour warm almond milk into espresso.\n5. Top with a pinch of cinnamon.\n6. Sweeten with honey or maple syrup to taste.",
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    difficulty: "easy" as const,
    tags: "vegan, gluten-free, dairy-free, quick-easy, beverage",
    imageUrl: "https://cdn.example.com/recipe5.jpg",
    status: "published" as const,
    publishedAt: new Date(),
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding recipes...");
    
    for (const recipe of sampleRecipes) {
      const { status, publishedAt, ...recipeData } = recipe;
      await db.insert(recipes).values({
        ...recipeData,
        authorId: 1,
        published: 1,
      });
      console.log(`✅ Added: ${recipe.title}`);
    }
    
    console.log("✨ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();

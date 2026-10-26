export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  dietaryTags: string[];
  ingredients: string[];
  instructions: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    slug: "chia-seed-pudding-jar",
    title: "Overnight Chia Seed Pudding",
    description: "A nutrient-dense, low-glycemic breakfast that basically makes itself while you sleep.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Vegan", "Gluten-Free", "Keto-Friendly"],
    ingredients: [
      "2 tbsp organic chia seeds",
      "1/2 cup unsweetened almond milk (carrageenan-free)",
      "1/4 tsp vanilla bean powder",
      "Stevia drops to taste",
      "Handful of fresh organic raspberries"
    ],
    instructions: [
      "In a small glass jar, combine chia seeds, almond milk, vanilla, and stevia.",
      "Stir vigorously for 1 minute to prevent clumping.",
      "Let sit for 5 minutes, then stir again.",
      "Cover and refrigerate overnight.",
      "Top with fresh raspberries before serving."
    ]
  },
  {
    id: "2",
    slug: "bone-broth-detox-soup",
    title: "Healing Bone Broth Detox Soup",
    description: "Rich in collagen and gut-healing amino acids. The ultimate reset meal.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "30 mins",
    servings: 4,
    dietaryTags: ["Paleo", "Keto", "Dairy-Free"],
    ingredients: [
      "4 cups high-quality grass-fed beef bone broth",
      "2 cups organic kale, chopped",
      "1 tsp freshly grated ginger",
      "1/2 tsp ground turmeric",
      "Pink Himalayan salt to taste"
    ],
    instructions: [
      "Pour bone broth into a large pot and bring to a gentle simmer.",
      "Whisk in the grated ginger and turmeric.",
      "Add the chopped kale and simmer for 5-7 minutes until tender.",
      "Season with pink salt and serve immediately hot."
    ]
  },
  {
    id: "3",
    slug: "cauliflower-rice-sushi",
    title: "Cauliflower Rice Sushi Rolls",
    description: "All the aesthetic of sushi with exactly zero of the refined carbohydrates.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    prepTime: "20 mins",
    cookTime: "5 mins",
    servings: 2,
    dietaryTags: ["Low-Carb", "Keto", "Pescatarian"],
    ingredients: [
      "2 cups riced cauliflower",
      "1 tbsp coconut aminos",
      "4 nori seaweed sheets",
      "1/2 cucumber, julienned",
      "4 oz sashimi-grade wild-caught salmon"
    ],
    instructions: [
      "Lightly steam the cauliflower rice for 3-4 minutes. Let cool completely.",
      "Lay a nori sheet on a bamboo mat and spread a thin layer of cauliflower rice.",
      "Place cucumber and salmon strips along the edge.",
      "Roll tightly, slice into pieces with a sharp wet knife, and serve with coconut aminos."
    ]
  },
  {
    id: "4",
    slug: "matcha-collagen-latte",
    title: "Ceremonial Matcha Collagen Latte",
    description: "Jitter-free energy meets skin-glowing peptides in this morning ritual.",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Dairy-Free", "Paleo"],
    ingredients: [
      "1 tsp ceremonial grade matcha powder",
      "1 scoop unflavored collagen peptides",
      "1 cup hot (not boiling) filtered water",
      "1/4 cup frothed oat milk (unsweetened)"
    ],
    instructions: [
      "Sift matcha powder into a mug.",
      "Add 2 tablespoons of hot water and whisk with a bamboo whisk until frothy.",
      "Stir in the collagen peptides until dissolved.",
      "Pour in the remaining hot water and top with frothed oat milk."
    ]
  },
  {
    id: "5",
    slug: "zucchini-noodle-pesto",
    title: "Zucchini Noodle Basil Pesto",
    description: "A vibrant, raw, plant-powered take on traditional Italian pasta.",
    image: "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=80",
    prepTime: "15 mins",
    cookTime: "0 mins",
    servings: 2,
    dietaryTags: ["Raw Vegan", "Keto", "Gluten-Free"],
    ingredients: [
      "2 medium organic zucchinis, spiralized",
      "1 cup fresh basil leaves",
      "1/4 cup raw walnuts",
      "1 clove garlic",
      "2 tbsp extra virgin olive oil",
      "Nutritional yeast (optional, for cheesy flavor)"
    ],
    instructions: [
      "In a food processor, blend basil, walnuts, garlic, and olive oil until smooth.",
      "Place spiralized zucchini noodles in a large bowl.",
      "Toss the noodles gently with the raw pesto.",
      "Sprinkle with nutritional yeast and serve immediately at room temperature."
    ]
  },
  {
    id: "6",
    slug: "flaxseed-crackers",
    title: "Crispy Golden Flaxseed Crackers",
    description: "The perfect crunch for your avocado dip, packed with Omega-3s.",
    image: "https://images.unsplash.com/photo-1603912165089-9a25b1b4bd1b?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "30 mins",
    servings: 6,
    dietaryTags: ["Keto", "Vegan", "Nut-Free"],
    ingredients: [
      "1 cup golden flaxseed meal",
      "1/2 cup water",
      "1/2 tsp sea salt",
      "1/2 tsp garlic powder"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "In a bowl, mix flaxseed meal, water, salt, and garlic powder until a dough forms.",
      "Let rest for 5 minutes so the flax absorbs the water.",
      "Roll dough thinly between two sheets of parchment paper.",
      "Score into squares and bake for 25-30 minutes until crisp."
    ]
  },
  {
    id: "7",
    slug: "maca-root-smoothie",
    title: "Hormone Balancing Maca Smoothie",
    description: "An adaptogenic powerhouse to keep your cortisol levels in check.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: [
      "1/2 frozen green banana",
      "1 tsp organic maca powder",
      "1 tbsp almond butter",
      "1 cup unsweetened hemp milk",
      "Ice cubes"
    ],
    instructions: [
      "Add all ingredients to a high-speed blender.",
      "Blend on high until completely smooth and creamy.",
      "Pour into a chilled glass and enjoy immediately."
    ]
  },
  {
    id: "8",
    slug: "lemon-water-detox",
    title: "Morning Lemon ACV Elixir",
    description: "The non-negotiable first step of every morning routine.",
    image: "https://images.unsplash.com/photo-1513426871321-c42e56cc1b11?auto=format&fit=crop&w=800&q=80",
    prepTime: "2 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Vegan", "Fasting-Approved"],
    ingredients: [
      "16 oz room temperature filtered water",
      "Juice of 1/2 organic lemon",
      "1 tbsp Apple Cider Vinegar (with the mother)",
      "Pinch of cayenne pepper"
    ],
    instructions: [
      "Squeeze fresh lemon juice into the filtered water.",
      "Add the apple cider vinegar and cayenne pepper.",
      "Stir well. Drink through a glass straw to protect your tooth enamel."
    ]
  },
  {
    id: "9",
    slug: "almond-flour-pancakes",
    title: "Grain-Free Almond Flour Pancakes",
    description: "Sunday morning comfort without the midday sugar crash.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "10 mins",
    servings: 2,
    dietaryTags: ["Paleo", "Gluten-Free"],
    ingredients: [
      "1 cup blanched almond flour",
      "2 pasture-raised eggs",
      "1/4 cup unsweetened almond milk",
      "1 tsp baking powder",
      "Coconut oil for the pan"
    ],
    instructions: [
      "Whisk eggs and almond milk in a bowl.",
      "Stir in almond flour and baking powder until a batter forms.",
      "Heat coconut oil in a skillet over medium-low heat.",
      "Pour batter to form small pancakes. Cook until edges dry, flip, and cook 1 more minute."
    ]
  },
  {
    id: "10",
    slug: "kale-avocado-salad",
    title: "Massaged Kale & Avocado Salad",
    description: "Tough greens made tender through the magic of healthy fats.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 2,
    dietaryTags: ["Vegan", "Keto", "Raw"],
    ingredients: [
      "1 bunch organic Lacinato kale, de-stemmed and chopped",
      "1/2 ripe avocado",
      "Juice of 1 lemon",
      "1 tbsp olive oil",
      "Sea salt and black pepper"
    ],
    instructions: [
      "Place the chopped kale in a large mixing bowl.",
      "Add the avocado, lemon juice, olive oil, and a pinch of salt.",
      "Using clean hands, vigorously massage the avocado into the kale for 3-5 minutes until the kale shrinks and softens.",
      "Serve immediately or let sit for flavors to meld."
    ]
  },
  {
    id: "11",
    slug: "cacao-bliss-balls",
    title: "Raw Cacao Bliss Balls",
    description: "A refined-sugar-free energy bite for when the 3 PM slump hits.",
    image: "https://images.unsplash.com/photo-1605333555547-59d4c76ec7c6?auto=format&fit=crop&w=800&q=80",
    prepTime: "15 mins",
    cookTime: "0 mins",
    servings: 12,
    dietaryTags: ["Vegan", "Paleo", "No-Bake"],
    ingredients: [
      "1 cup Medjool dates, pitted",
      "1 cup raw walnuts or pecans",
      "1/4 cup raw cacao powder",
      "1 tbsp melted coconut oil",
      "Pinch of sea salt"
    ],
    instructions: [
      "Place nuts in a food processor and pulse until finely ground.",
      "Add dates, cacao powder, coconut oil, and salt. Process until a sticky dough forms.",
      "Roll the dough into 12 small balls using your hands.",
      "Store in the refrigerator for up to two weeks."
    ]
  },
  {
    id: "12",
    slug: "turmeric-roasted-cauliflower",
    title: "Anti-Inflammatory Roasted Cauliflower",
    description: "Golden, crispy, and packed with curcumin to fight inflammation.",
    image: "https://images.unsplash.com/photo-1623512214300-36a5a04467bd?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    dietaryTags: ["Vegan", "Keto", "Gluten-Free"],
    ingredients: [
      "1 head of cauliflower, cut into florets",
      "2 tbsp avocado oil",
      "1 tsp ground turmeric",
      "1/2 tsp black pepper (enhances turmeric absorption)",
      "Sea salt"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "In a bowl, toss cauliflower florets with avocado oil, turmeric, black pepper, and salt.",
      "Spread evenly on a baking sheet lined with parchment paper.",
      "Roast for 25 minutes, flipping halfway, until golden and tender."
    ]
  },
  {
    id: "13",
    slug: "celery-juice",
    title: "Pure Medical Medium Celery Juice",
    description: "Sixteen ounces of pure, unadulterated healing on an empty stomach.",
    image: "https://images.unsplash.com/photo-1608985223381-817abdf43f87?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Raw", "Vegan", "Fasting"],
    ingredients: [
      "1 large bunch of organic celery, washed thoroughly"
    ],
    instructions: [
      "Run the celery stalks through a cold-press masticating juicer.",
      "If you don't have a juicer, blend the celery until smooth and strain through a nut milk bag.",
      "Drink immediately on an empty stomach.",
      "Wait 15-30 minutes before consuming anything else."
    ]
  },
  {
    id: "14",
    slug: "salmon-avocado-boats",
    title: "Wild Salmon Avocado Boats",
    description: "Zero carbs, high protein, and loaded with healthy Omega-3 fats.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 2,
    dietaryTags: ["Keto", "Pescatarian", "Dairy-Free"],
    ingredients: [
      "2 ripe avocados, halved and pitted",
      "1 can (5 oz) wild-caught salmon, drained",
      "1 tbsp Primal Kitchen avocado oil mayo",
      "1 tsp Dijon mustard",
      "Fresh dill for garnish"
    ],
    instructions: [
      "In a small bowl, mix the drained salmon, avocado oil mayo, and mustard.",
      "Scoop a small amount of avocado out of each half to make the hole slightly larger.",
      "Fill each avocado half with the salmon mixture.",
      "Garnish with fresh dill and a squeeze of lemon."
    ]
  },
  {
    id: "15",
    slug: "spirulina-smoothie-bowl",
    title: "Mermaid Spirulina Smoothie Bowl",
    description: "A gorgeous, nutrient-dense blue-green bowl packed with B-vitamins.",
    image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Vegan", "Gluten-Free"],
    ingredients: [
      "1 frozen banana",
      "1/2 cup frozen zucchini (for hidden veggies)",
      "1 tsp blue spirulina powder",
      "1/2 cup coconut milk",
      "Toppings: coconut flakes, chia seeds, fresh berries"
    ],
    instructions: [
      "Blend the frozen banana, frozen zucchini, spirulina, and coconut milk until thick and creamy.",
      "You may need to use a tamper or scrape down the sides to keep it thick.",
      "Pour into a bowl and arrange toppings aesthetically on top.",
      "Enjoy immediately with a spoon."
    ]
  },
  {
    id: "17",
    slug: "almond-flour-banana-bread",
    title: "Grain-Free Almond Flour Banana Bread",
    description: "Moist, tender, and completely grain-free. The clean version your family will actually request.",
    image: "https://images.unsplash.com/photo-1621188988909-fbef0a2a1010?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "50 mins",
    servings: 10,
    dietaryTags: ["Gluten-Free", "Paleo", "Dairy-Free"],
    ingredients: [
      "2 cups blanched almond flour",
      "3 ripe organic bananas, mashed",
      "3 pasture-raised eggs",
      "2 tbsp pure maple syrup or raw honey",
      "1 tsp baking soda",
      "1 tsp vanilla extract",
      "Pinch of pink Himalayan salt",
      "Optional: 1/3 cup dark chocolate chips (85%+ cacao)"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Line a loaf pan with parchment paper.",
      "In a large bowl, mash the bananas until smooth.",
      "Whisk in the eggs, maple syrup, and vanilla extract.",
      "Fold in the almond flour, baking soda, and salt until just combined. Do not over-mix.",
      "Fold in chocolate chips if using.",
      "Pour into prepared pan and bake 45-55 minutes until a toothpick comes out clean.",
      "Cool completely in the pan before slicing."
    ]
  },
  {
    id: "18",
    slug: "turkey-lettuce-wraps",
    title: "Asian-Inspired Turkey Lettuce Wraps",
    description: "High-protein, low-carb, and ready in 20 minutes. Weeknight clean eating at its finest.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 mins",
    cookTime: "12 mins",
    servings: 4,
    dietaryTags: ["Keto", "Dairy-Free", "Gluten-Free"],
    ingredients: [
      "1 lb ground pasture-raised turkey",
      "1 head butter lettuce, leaves separated",
      "3 tbsp coconut aminos",
      "1 tbsp toasted sesame oil",
      "2 cloves garlic, minced",
      "1 tsp fresh ginger, grated",
      "1/2 cup water chestnuts, diced",
      "Green onions and sesame seeds for garnish"
    ],
    instructions: [
      "Heat sesame oil in a skillet over medium-high heat.",
      "Add garlic and ginger, cook 30 seconds until fragrant.",
      "Add ground turkey, breaking it apart, cook until no longer pink (8-10 minutes).",
      "Stir in coconut aminos and water chestnuts. Cook 2 more minutes.",
      "Spoon mixture into lettuce cups.",
      "Garnish with sliced green onions and sesame seeds."
    ]
  },
  {
    id: "19",
    slug: "golden-milk-overnight-oats",
    title: "Golden Milk Overnight Oats",
    description: "Anti-inflammatory spices meet slow-digesting oats in this prep-ahead morning powerhouse.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 1,
    dietaryTags: ["Vegan", "Gluten-Free", "Dairy-Free"],
    ingredients: [
      "1/2 cup gluten-free rolled oats",
      "1 cup unsweetened coconut milk",
      "1/2 tsp ground turmeric",
      "1/4 tsp cinnamon",
      "Pinch of black pepper",
      "1 tsp raw honey or maple syrup",
      "1/2 tsp vanilla extract",
      "Toppings: sliced mango, toasted coconut"
    ],
    instructions: [
      "Combine oats, coconut milk, turmeric, cinnamon, black pepper, sweetener, and vanilla in a jar.",
      "Stir well to combine — the black pepper is key to activating the curcumin.",
      "Cover and refrigerate overnight, or for at least 4 hours.",
      "In the morning, stir and add a splash more milk if too thick.",
      "Top with mango slices and toasted coconut before serving."
    ]
  },
  {
    id: "20",
    slug: "roasted-beet-walnut-salad",
    title: "Roasted Beet & Candied Walnut Salad",
    description: "A stunning, earthy salad that looks like it came from a Michelin-starred restaurant.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTime: "15 mins",
    cookTime: "45 mins",
    servings: 2,
    dietaryTags: ["Vegan", "Gluten-Free", "Paleo"],
    ingredients: [
      "3 medium beets, scrubbed",
      "1/2 cup raw walnuts",
      "1 tbsp maple syrup",
      "4 cups arugula",
      "2 tbsp extra virgin olive oil",
      "1 tbsp balsamic vinegar",
      "Sea salt and black pepper"
    ],
    instructions: [
      "Preheat oven to 400°F. Wrap beets in foil and roast 40-45 minutes until fork-tender.",
      "Meanwhile, toss walnuts with maple syrup and a pinch of salt. Toast in a dry pan 3-4 minutes until caramelized.",
      "Let beets cool, then peel (use gloves) and slice into wedges.",
      "Whisk together olive oil and balsamic vinegar for the dressing.",
      "Arrange arugula on plates, top with beet wedges and candied walnuts.",
      "Drizzle with dressing and finish with flaky sea salt."
    ]
  }
];

"use client";

import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { motion } from "framer-motion";

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4"
          >
            Almond Mom Kitchen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600"
          >
            Nourishing, aesthetically pleasing recipes for the modern health-conscious mom. 
            Gluten-free, sugar-free, completely guilt-free.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}

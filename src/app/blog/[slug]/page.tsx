"use client";

import { use } from "react";
import { recipes } from "@/data/recipes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const recipe = recipes.find((r) => r.slug === resolvedParams.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {recipe.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="bg-neutral-100 text-xs font-semibold px-3 py-1 rounded-full text-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-6">
            {recipe.title}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {recipe.description}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg mb-16"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Recipe Meta */}
        <div className="grid grid-cols-3 divide-x divide-neutral-200 border-y border-neutral-200 py-6 mb-16 bg-white rounded-xl shadow-sm">
          <div className="text-center px-4">
            <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Prep Time</p>
            <p className="text-lg font-medium text-neutral-900">{recipe.prepTime}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Cook Time</p>
            <p className="text-lg font-medium text-neutral-900">{recipe.cookTime}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Servings</p>
            <p className="text-lg font-medium text-neutral-900">{recipe.servings}</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
              Ingredients
            </h2>
            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-start text-neutral-700">
                  <svg className="w-5 h-5 text-neutral-300 mr-3 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Instructions
            </h2>
            <div className="space-y-8">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-500">
                    {i + 1}
                  </div>
                  <p className="text-neutral-700 text-lg leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

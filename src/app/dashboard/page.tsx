'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Mock data tailored to match your Sanity 'recipe' schema
const CURATED_RECIPES = [
  {
    _id: '1',
    title: 'Matcha Chia Seed Pudding',
    dietaryTags: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    timeMetrics: { prepTime: 10, cookTime: 0 },
    macros: { calories: 250, protein: 12, carbs: 20, fat: 15 },
    imageUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: '2',
    title: 'Almond Flour Lemon Loaf',
    dietaryTags: ['Paleo', 'Gluten-Free', 'Vegetarian'],
    timeMetrics: { prepTime: 15, cookTime: 45 },
    macros: { calories: 180, protein: 6, carbs: 12, fat: 14 },
    imageUrl: 'https://images.unsplash.com/photo-1615486171448-4afbf3692ea4?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: '3',
    title: 'Wild Caught Salmon Bowl',
    dietaryTags: ['Dairy-Free', 'Gluten-Free', 'High Protein'],
    timeMetrics: { prepTime: 20, cookTime: 15 },
    macros: { calories: 420, protein: 35, carbs: 25, fat: 22 },
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: '4',
    title: 'Adaptogenic Green Smoothie',
    dietaryTags: ['Vegan', 'Raw', 'No Added Sugar'],
    timeMetrics: { prepTime: 5, cookTime: 0 },
    macros: { calories: 190, protein: 8, carbs: 24, fat: 6 },
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&q=80&w=800',
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden flex flex-col items-center p-6 font-sans relative">
      {/* Abstract Background Elements */}
      <div className="fixed top-[-5%] left-[-10%] w-[50%] h-[50%] bg-lime-light rounded-full blur-[150px] opacity-40 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      {/* Top Nav */}
      <nav className="z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-serif italic text-stone-800">
          Almond Mom
        </Link>
        <div className="flex items-center gap-6">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors">
            My Pantry
          </button>
          <button className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold text-stone-500 hover:scale-105 transition-transform">
            JM {/* Placeholder for user initials */}
          </button>
        </div>
      </nav>

      <main className="w-full max-w-7xl mx-auto z-10 pt-8 pb-20">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-stone-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Daily Nourishment</span>
          <h1 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-4 leading-tight">
            Curated for your<br/>sanctuary.
          </h1>
          <p className="text-stone-500 text-sm font-light max-w-md">
            Based on your dietary preferences and wellness goals, we&apos;ve gathered the cleanest, most nourishing recipes for your day.
          </p>
        </motion.div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CURATED_RECIPES.map((recipe, index) => (
            <Link href={`/recipe/${recipe._id}`} key={recipe._id} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer bg-white/60 backdrop-blur-md rounded-3xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full"
              >
                {/* Recipe Image */}
                <div className="h-64 w-full relative overflow-hidden bg-stone-100">
                  <Image 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {recipe.dietaryTags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-800 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recipe Info */}
                <div className="p-8 flex flex-col grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif italic text-stone-800 leading-snug group-hover:text-stone-600 transition-colors">
                      {recipe.title}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100/50">
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1">Time</span>
                      <span className="text-xs text-stone-800 font-medium">{recipe.timeMetrics.prepTime + recipe.timeMetrics.cookTime} mins</span>
                    </div>
                    <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100/50">
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1">Calories</span>
                      <span className="text-xs text-stone-800 font-medium">{recipe.macros.calories} kcal</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t border-stone-100 pt-6 mt-auto">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Macros</span>
                    <div className="flex gap-3 text-xs text-stone-500">
                      <span><strong className="text-stone-800">{recipe.macros.protein}g</strong> P</span>
                      <span><strong className="text-stone-800">{recipe.macros.carbs}g</strong> C</span>
                      <span><strong className="text-stone-800">{recipe.macros.fat}g</strong> F</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
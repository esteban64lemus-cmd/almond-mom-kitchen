'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Flame, Activity, CheckCircle2, ChevronRight, Refrigerator, ShoppingCart, Moon } from "lucide-react"

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
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden flex flex-col items-center p-6 font-sans relative">
      {/* Abstract Background Elements */}
      <div className="fixed top-[-5%] left-[-10%] w-[50%] h-[50%] bg-lime-light rounded-full blur-[150px] opacity-40 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      {/* Top Nav (App Style) */}
      <nav className="z-50 py-4 flex justify-between items-center max-w-2xl mx-auto w-full mb-8">
        <div className="text-xl font-serif italic text-stone-800">
          Almond Mom Hub
        </div>
        <div className="flex items-center gap-6">
          <button className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold text-stone-500 hover:scale-105 transition-transform">
            JM
          </button>
        </div>
      </nav>

      <main className="w-full max-w-2xl mx-auto z-10 pb-20">
        
        {/* Welcome Section */}
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-serif italic text-stone-800 tracking-tight leading-tight"
          >
            Welcome back,<br />Jane
          </motion.h1>
        </header>

        {/* Quick Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          {/* Consistency Card */}
          <div className="bg-stone-900 rounded-[32px] p-6 text-white shadow-xl shadow-black/10 relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex items-center gap-2 mb-8">
              <Flame size={16} className="text-orange-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Consistency</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-sans font-black tracking-tighter">12</span>
              <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Days</span>
            </div>
          </div>

          {/* Energy Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 text-stone-800 border border-black/5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-100 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex items-center gap-2 mb-8">
              <Activity size={16} className="text-lime-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Current Energy</span>
            </div>
            <div className="text-2xl font-serif italic font-medium tracking-tight">
              Optimal
            </div>
          </div>
        </motion.div>

        {/* Core Tools Section */}
        <div className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 px-2">AI Tools</h2>
          <div className="flex flex-col gap-4">
            
            <Link href="/fridge-rescue" className="block">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 flex items-center justify-between border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-lime-100 text-lime-700 flex items-center justify-center group-hover:bg-lime-600 group-hover:text-white transition-colors">
                    <Refrigerator size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-800 tracking-tight">Fridge Scanner</h3>
                    <p className="text-xs font-medium text-stone-500">Audit your pantry with AI</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-stone-400 group-hover:bg-stone-800 group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

            <Link href="/shop" className="block">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 flex items-center justify-between border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <ShoppingCart size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-800 tracking-tight">Grocery Upgrader</h3>
                    <p className="text-xs font-medium text-stone-500">Clean up your shopping list</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-stone-400 group-hover:bg-stone-800 group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

          </div>
        </div>

        {/* Daily Nourishment / Meal Finder */}
        <div className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 px-2">Meal Finder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CURATED_RECIPES.slice(0,2).map((recipe, index) => (
              <Link href={`/recipe/${recipe._id}`} key={recipe._id} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="group cursor-pointer bg-white/60 backdrop-blur-md rounded-3xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-xl transition-all h-full"
                >
                  <div className="h-40 w-full relative overflow-hidden bg-stone-100">
                    <Image 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-md font-serif italic text-stone-800 leading-snug mb-2">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-2">
                      {recipe.dietaryTags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-stone-100 px-2 py-1 rounded text-[9px] font-bold uppercase text-stone-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
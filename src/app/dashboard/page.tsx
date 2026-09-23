"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Flame,
  Activity,
  ChevronRight,
  Refrigerator,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { recipes } from "@/data/recipes";

export default function DashboardPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#FDFCFB] p-6 font-sans">
      {/* Abstract Background Elements */}
      <div className="bg-lime-light pointer-events-none fixed top-[-5%] left-[-10%] h-[50%] w-[50%] rounded-full opacity-40 blur-[150px]" />
      <div className="pointer-events-none fixed right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-stone-100 opacity-60 blur-[120px]" />

      {/* Top Nav (App Style) */}
      <nav className="z-50 mx-auto mb-8 flex w-full max-w-2xl items-center justify-between py-4">
        <div className="font-serif text-xl text-stone-800 italic">
          Almond Mom Hub
        </div>
        <div className="flex items-center gap-6">
          <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-stone-200 text-xs font-bold text-stone-500 shadow-sm transition-transform hover:scale-105">
            JM
          </button>
        </div>
      </nav>

      <main className="z-10 mx-auto w-full max-w-2xl pb-20">
        {/* Welcome Section */}
        <header className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-4xl leading-tight tracking-tight text-stone-800 italic"
          >
            Welcome back,
            <br />
            Almond Mom
          </motion.h1>
        </header>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 grid grid-cols-2 gap-4"
        >
          {/* Consistency Card */}
          <div className="group relative overflow-hidden rounded-[32px] bg-stone-900 p-6 text-white shadow-xl shadow-black/10 transition-transform hover:scale-[1.02]">
            <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
            <div className="mb-8 flex items-center gap-2">
              <Flame size={16} className="text-orange-400" />
              <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                Consistency
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-4xl font-black tracking-tighter">
                12
              </span>
              <span className="text-sm font-bold tracking-widest text-white/60 uppercase">
                Days
              </span>
            </div>
          </div>

          {/* Energy Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-black/5 bg-white/80 p-6 text-stone-800 shadow-sm backdrop-blur-md transition-all hover:scale-[1.02] hover:shadow-md">
            <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-lime-100 blur-2xl" />
            <div className="mb-8 flex items-center gap-2">
              <Activity size={16} className="text-lime-600" />
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Current Energy
              </span>
            </div>
            <div className="font-serif text-2xl font-medium tracking-tight italic">
              Optimal
            </div>
          </div>
        </motion.div>

        {/* Core Tools Section */}
        <div className="mb-12">
          <h2 className="mb-4 px-2 text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
            AI Tools
          </h2>
          <div className="flex flex-col gap-4">
            <Link href="/quests" className="block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group flex items-center justify-between rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all hover:border-black/10 hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-light text-sage transition-colors group-hover:bg-sage group-hover:text-white">
                    <Sparkles size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-stone-800">
                      Daily Quests
                    </h3>
                    <p className="text-xs font-medium text-stone-500">
                      Sleep-aware stamina &amp; micro-quests
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-stone-400 transition-colors group-hover:bg-stone-800 group-hover:text-white">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

            <Link href="/fridge-rescue" className="block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group flex items-center justify-between rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all hover:border-black/10 hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-lime-700 transition-colors group-hover:bg-lime-600 group-hover:text-white">
                    <Refrigerator size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-stone-800">
                      Fridge Scanner
                    </h3>
                    <p className="text-xs font-medium text-stone-500">
                      Audit your pantry with AI
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-stone-400 transition-colors group-hover:bg-stone-800 group-hover:text-white">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

            <Link href="/shop" className="block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group flex items-center justify-between rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all hover:border-black/10 hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <ShoppingCart size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-stone-800">
                      Grocery Upgrader
                    </h3>
                    <p className="text-xs font-medium text-stone-500">
                      Clean up your shopping list
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-stone-400 transition-colors group-hover:bg-stone-800 group-hover:text-white">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Daily Nourishment / Meal Finder */}
        <div className="mb-12">
          <div className="mb-4 px-2 flex items-center justify-between">
            <h2 className="text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
              Meal Finder
            </h2>
            <Link href="/blog" className="text-[10px] font-bold tracking-widest text-stone-400 uppercase hover:text-stone-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {recipes.slice(0, 4).map((recipe, index) => (
              <Link
                href={`/blog/${recipe.slug}`}
                key={recipe.id}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-stone-100 bg-white/60 shadow-sm backdrop-blur-md transition-all hover:shadow-xl"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-md mb-2 font-serif leading-snug text-stone-800 italic">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-2">
                      {recipe.dietaryTags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-stone-100 px-2 py-1 text-[9px] font-bold text-stone-600 uppercase"
                        >
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
  );
}

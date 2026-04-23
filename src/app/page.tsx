"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Activity, CheckCircle2, ChevronRight, Refrigerator, ShoppingCart, Moon } from "lucide-react";
import BottomNav from "@/components/bottom-nav";

export default function AppDashboard() {
  return (
    <div className="min-h-dvh bg-background pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        
        {/* Header */}
        <header className="mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-obsidian/40">
              ALMOND MOM KITCHEN
            </span>
            <div className="w-10 h-10 rounded-full bg-obsidian text-white flex items-center justify-center font-serif italic text-lg shadow-md">
              A
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl font-serif italic text-obsidian tracking-tight leading-tight"
          >
            Welcome back,<br />Alex
          </motion.h1>
        </header>

        {/* Quick Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          {/* Consistency Card */}
          <div className="bg-obsidian rounded-[32px] p-6 text-white shadow-xl shadow-black/10 relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex items-center gap-2 mb-8">
              <Flame size={16} className="text-copper" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Consistency</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-sans font-black tracking-tighter">12</span>
              <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Days</span>
            </div>
          </div>

          {/* Energy Card */}
          <div className="bg-white rounded-[32px] p-6 text-obsidian border border-black/5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sage/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex items-center gap-2 mb-8">
              <Activity size={16} className="text-sage" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian/40">Current Energy</span>
            </div>
            <div className="text-2xl font-serif italic font-medium tracking-tight">
              Optimal
            </div>
          </div>
        </motion.div>

        {/* Core Tools Section */}
        <div className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 mb-4 px-2">Daily Tools</h2>
          <div className="flex flex-col gap-4">
            
            <Link href="/fridge-rescue" className="block">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-[32px] p-6 flex items-center justify-between border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-sage/10 text-sage flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                    <Refrigerator size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-obsidian tracking-tight">Fridge Detox</h3>
                    <p className="text-xs font-medium text-obsidian/40">Audit your pantry with AI</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-obsidian/40 group-hover:bg-obsidian group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

            <Link href="/shop" className="block">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-[32px] p-6 flex items-center justify-between border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-copper/10 text-copper flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors">
                    <ShoppingCart size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-obsidian tracking-tight">Grocery Upgrader</h3>
                    <p className="text-xs font-medium text-obsidian/40">Clean up your shopping list</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-obsidian/40 group-hover:bg-obsidian group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>

          </div>
        </div>

        {/* Recent Cycles */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-2 mb-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40">Recent Cycles</h2>
            <Link href="/log" className="text-[10px] font-black uppercase tracking-widest text-sage hover:text-obsidian transition-colors">View All</Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-[32px] p-6 border border-black/5 shadow-sm"
          >
            <div className="flex flex-col gap-6">
              {/* Day 1 */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-obsidian">Thursday</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian/40 flex items-center gap-1">
                      <Moon size={10} /> 7.5H SLEEP
                    </span>
                  </div>
                </div>
                <div className="text-lg font-serif italic text-obsidian">8<span className="text-sm text-obsidian/30">/10</span></div>
              </div>
              
              <div className="w-full h-px bg-black/5" />

              {/* Day 2 */}
              <div className="flex items-center justify-between group opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-copper/10 text-copper flex items-center justify-center">
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-obsidian">Wednesday</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian/40 flex items-center gap-1">
                      <Moon size={10} /> 6.0H SLEEP
                    </span>
                  </div>
                </div>
                <div className="text-lg font-serif italic text-obsidian">6<span className="text-sm text-obsidian/30">/10</span></div>
              </div>

              <div className="w-full h-px bg-black/5" />

              {/* Day 3 */}
              <div className="flex items-center justify-between group opacity-50 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-obsidian">Tuesday</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian/40 flex items-center gap-1">
                      <Moon size={10} /> 8.0H SLEEP
                    </span>
                  </div>
                </div>
                <div className="text-lg font-serif italic text-obsidian">7<span className="text-sm text-obsidian/30">/10</span></div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

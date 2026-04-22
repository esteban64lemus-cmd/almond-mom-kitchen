'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime-light rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-100 rounded-full blur-[120px] opacity-60" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-serif italic text-stone-800">
          Almond Mom
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/fridge-rescue" className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors">Fridge Rescue</Link>
          <Link href="/login" className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg">Sign In</Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-2xl w-full space-y-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-stone-100 shadow-sm">
            <Sparkles size={14} className="text-lime-clean" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">The New Standard of Wellness</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif italic text-stone-800 leading-[1.1]">
            Almond Mom <br />
            <span className="text-stone-400">Kitchen</span>
          </h1>
          
          <p className="text-stone-500 text-lg max-w-md mx-auto font-light leading-relaxed">
            A boutique AI companion for the modern kitchen. Audit your fridge, decode cravings, and upgrade your groceries to the cleanest version of yourself.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/dashboard" className="group relative bg-stone-900 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden hover:bg-stone-800 transition-all flex items-center space-x-3 shadow-2xl">
            <span>Enter Sanctuary</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-8 pt-12 border-t border-stone-100"
        >
          {[
            { label: 'Fridge Audit', icon: Leaf },
            { label: 'Craving Decode', icon: Sparkles },
            { label: 'Grocery Upgrade', icon: ShieldCheck },
          ].map((feature, idx) => (
            <div key={idx} className="space-y-3 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400">
                <feature.icon size={16} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500">{feature.label}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Aesthetic Footer */}
      <footer className="fixed bottom-8 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-300">
        Organic Luxury • Est. 2024
      </footer>
    </div>
  );
}

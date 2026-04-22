'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Refrigerator, 
  Sparkles, 
  ShoppingCart, 
  Activity
} from 'lucide-react';
import FridgeRescue from '@/components/fridge-rescue';
import CravingsCrusher from '@/components/cravings-crusher';
import GroceryUpgrader from '@/components/grocery-upgrader';
import EnergyTracker from '@/components/energy-tracker';

const TABS = [
  { id: 'detox', name: 'Detox', icon: Refrigerator, component: FridgeRescue },
  { id: 'crush', name: 'Crush', icon: Sparkles, component: CravingsCrusher },
  { id: 'upgrade', name: 'Upgrade', icon: ShoppingCart, component: GroceryUpgrader },
  { id: 'energy', name: 'Energy', icon: Activity, component: EnergyTracker },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('detox');
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || FridgeRescue;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#292524] pb-32">
      {/* Header */}
      <header className="p-8 flex justify-between items-center max-w-2xl mx-auto w-full">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Wednesday, April 22</p>
          <h1 className="text-2xl font-serif italic">Kitchen Sanctuary</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-stone-900 overflow-hidden">
             {/* Profile avatar placeholder */}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto px-6 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-2 py-2 rounded-full flex items-center space-x-1 shadow-2xl border-stone-100/50">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-full transition-all flex items-center space-x-2 ${
                activeTab === tab.id ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <tab.icon size={18} />
              {activeTab === tab.id && (
                <motion.span 
                  layoutId="tab-text"
                  className="text-xs font-bold uppercase tracking-widest"
                >
                  {tab.name}
                </motion.span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

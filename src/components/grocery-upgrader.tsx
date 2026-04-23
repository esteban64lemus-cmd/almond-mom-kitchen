'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { upgradeGroceryList } from '@/app/actions/ai-actions';

interface GroceryItem {
  original: string;
  swap: string;
  reason: string;
}

export default function GroceryUpgrader() {
  const [groceryInput, setGroceryInput] = useState('');
  const [groceryResult, setGroceryResult] = useState<GroceryItem[] | null>(null);
  const [isUpgradingGrocery, setIsUpgradingGrocery] = useState(false);
  const [groceryError, setGroceryError] = useState('');

  const handleUpgradeGrocery = async () => {
    if (!groceryInput.trim()) return;
    setIsUpgradingGrocery(true);
    setGroceryError('');
    setGroceryResult(null);

    const result = await upgradeGroceryList(groceryInput);
    
    if (result.success && result.data) {
      setGroceryResult(result.data);
    } else {
      setGroceryError(result.error || "The AI is resting. Please try again.");
    }
    setIsUpgradingGrocery(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-bottom duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif italic">Grocery Upgrader</h2>
        <p className="text-stone-500 text-sm max-w-xs mx-auto">Paste your basic shopping list and let AI swap it for the cleanest alternatives.</p>
      </div>

      <div className="space-y-4">
        <textarea 
          value={groceryInput}
          onChange={(e) => setGroceryInput(e.target.value)}
          placeholder="e.g. Peanut butter, Doritos, White bread, Coffee creamer..."
          className="w-full bg-white border border-stone-200 rounded-4xl p-6 text-sm shadow-sm focus:border-stone-400 outline-none transition-all placeholder:text-stone-300 min-h-[150px] resize-none"
        />
        <button 
          onClick={handleUpgradeGrocery}
          disabled={isUpgradingGrocery || !groceryInput.trim()}
          className="w-full bg-stone-900 text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isUpgradingGrocery ? <Loader2 className="animate-spin" size={18} /> : <ShoppingCart size={18} />}
          <span>{isUpgradingGrocery ? 'Curating List...' : 'Upgrade My Groceries'}</span>
        </button>
      </div>

      {groceryError && (
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex space-x-3 text-red-600">
          <AlertCircle size={18} />
          <p className="text-xs font-medium">{groceryError}</p>
        </div>
      )}

      <AnimatePresence>
        {groceryResult && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-2">Your Curated Swaps</h3>
            <div className="space-y-4">
              {groceryResult.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-stone-100 rounded-4xl p-6 shadow-sm group hover:shadow-md transition-all"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-50 pb-4">
                      <div className="flex-1">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1">Ditch</p>
                        <p className="text-stone-400 line-through font-serif italic text-sm">{item.original}</p>
                      </div>
                      <div className="px-6 text-stone-200"><ArrowRight size={20} strokeWidth={1.5} /></div>
                      <div className="flex-1 text-right">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-lime-clean mb-1">Upgrade</p>
                        <p className="text-stone-900 font-serif font-bold text-lg leading-tight">{item.swap}</p>
                      </div>
                    </div>
                    <div className="bg-stone-50/50 p-4 rounded-2xl border border-stone-100/50">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-2">Biological Rationale</p>
                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

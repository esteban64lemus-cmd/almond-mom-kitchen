"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { upgradeGroceryList } from "@/app/actions/ai-actions";

interface GroceryItem {
  original: string;
  swap: string;
  reason: string;
}

export default function GroceryUpgrader() {
  const [groceryInput, setGroceryInput] = useState("");
  const [groceryResult, setGroceryResult] = useState<GroceryItem[] | null>(
    null,
  );
  const [isUpgradingGrocery, setIsUpgradingGrocery] = useState(false);
  const [groceryError, setGroceryError] = useState("");

  const handleUpgradeGrocery = async () => {
    if (!groceryInput.trim()) return;
    setIsUpgradingGrocery(true);
    setGroceryError("");
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
    <div className="animate-in slide-in-bottom space-y-8 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="font-serif text-3xl italic">Grocery Upgrader</h2>
        <p className="mx-auto max-w-xs text-sm text-stone-500">
          Paste your basic shopping list and let AI swap it for the cleanest
          alternatives.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={groceryInput}
          onChange={(e) => setGroceryInput(e.target.value)}
          placeholder="e.g. Peanut butter, Doritos, White bread, Coffee creamer..."
          className="min-h-[150px] w-full resize-none rounded-4xl border border-stone-200 bg-white p-6 text-sm shadow-sm transition-all outline-none placeholder:text-stone-300 focus:border-stone-400"
        />
        <button
          onClick={handleUpgradeGrocery}
          disabled={isUpgradingGrocery || !groceryInput.trim()}
          className="flex w-full items-center justify-center space-x-2 rounded-full bg-stone-900 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-stone-800 disabled:opacity-50"
        >
          {isUpgradingGrocery ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <ShoppingCart size={18} />
          )}
          <span>
            {isUpgradingGrocery ? "Curating List..." : "Upgrade My Groceries"}
          </span>
        </button>
      </div>

      {groceryError && (
        <div className="flex space-x-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600">
          <AlertCircle size={18} />
          <p className="text-xs font-medium">{groceryError}</p>
        </div>
      )}

      <AnimatePresence>
        {groceryResult && (
          <div className="space-y-4">
            <h3 className="ml-2 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
              Your Curated Swaps
            </h3>
            <div className="space-y-4">
              {groceryResult.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-4xl border border-stone-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-50 pb-4">
                      <div className="flex-1">
                        <p className="mb-1 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
                          Ditch
                        </p>
                        <p className="font-serif text-sm text-stone-400 italic line-through">
                          {item.original}
                        </p>
                      </div>
                      <div className="px-6 text-stone-200">
                        <ArrowRight size={20} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-lime-clean mb-1 text-[9px] font-bold tracking-widest uppercase">
                          Upgrade
                        </p>
                        <p className="font-serif text-lg leading-tight font-bold text-stone-900">
                          {item.swap}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-stone-100/50 bg-stone-50/50 p-4">
                      <p className="mb-2 text-[9px] font-bold tracking-widest text-stone-400 uppercase">
                        Biological Rationale
                      </p>
                      <p className="text-xs leading-relaxed font-light text-stone-600">
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { analyzeCraving } from "@/app/actions/ai-actions";

interface CravingResult {
  deficiency: string;
  alternative: string;
  science: string;
  wellness_tip: string;
}

export default function CravingsCrusher() {
  const [cravingInput, setCravingInput] = useState("");
  const [cravingResult, setCravingResult] = useState<CravingResult | null>(
    null,
  );
  const [isAnalyzingCraving, setIsAnalyzingCraving] = useState(false);
  const [cravingError, setCravingError] = useState("");

  const handleCrushCraving = async () => {
    if (!cravingInput.trim()) return;
    setIsAnalyzingCraving(true);
    setCravingError("");
    setCravingResult(null);

    const result = await analyzeCraving(cravingInput);

    if (result.success && result.data) {
      setCravingResult(result.data);
    } else {
      setCravingError(result.error || "The AI is resting. Please try again.");
    }
    setIsAnalyzingCraving(false);
  };

  return (
    <div className="animate-in slide-in-bottom space-y-8 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="font-serif text-3xl italic">Cravings Crusher</h2>
        <p className="mx-auto max-w-xs text-sm text-stone-500">
          Decode your body&apos;s hidden signals.
        </p>
      </div>

      <div className="relative">
        <input
          value={cravingInput}
          onChange={(e) => setCravingInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCrushCraving()}
          placeholder="I'm craving..."
          className="w-full rounded-full border border-stone-200 bg-white py-4 pr-14 pl-6 text-sm shadow-sm transition-all outline-none placeholder:text-stone-300 focus:border-stone-400"
        />
        <button
          onClick={handleCrushCraving}
          disabled={isAnalyzingCraving || !cravingInput.trim()}
          className="absolute top-2 right-2 bottom-2 flex aspect-square items-center justify-center rounded-full bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50"
        >
          {isAnalyzingCraving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Sparkles size={18} />
          )}
        </button>
      </div>

      {cravingError && (
        <div className="flex space-x-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600">
          <AlertCircle size={18} />
          <p className="text-xs font-medium">{cravingError}</p>
        </div>
      )}

      <AnimatePresence>
        {cravingResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-xl"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Biological Gap
              </p>
              <p className="font-serif text-xl text-stone-800">
                {cravingResult.deficiency}
              </p>
            </div>
            <div className="h-px w-full bg-stone-100" />
            <div className="space-y-2">
              <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Clean Swap
              </p>
              <p className="font-serif text-lg text-stone-800 italic">
                {cravingResult.alternative}
              </p>
              <p className="text-xs leading-relaxed font-light text-stone-500">
                {cravingResult.science}
              </p>
            </div>
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4 text-center text-xs text-stone-600 italic">
              &quot; {cravingResult.wellness_tip} &quot;
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

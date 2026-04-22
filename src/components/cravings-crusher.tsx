'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { analyzeCraving } from '@/app/actions/ai-actions';

interface CravingResult {
  deficiency: string;
  alternative: string;
  science: string;
  wellness_tip: string;
}

export default function CravingsCrusher() {
  const [cravingInput, setCravingInput] = useState('');
  const [cravingResult, setCravingResult] = useState<CravingResult | null>(null);
  const [isAnalyzingCraving, setIsAnalyzingCraving] = useState(false);
  const [cravingError, setCravingError] = useState('');

  const handleCrushCraving = async () => {
    if (!cravingInput.trim()) return;
    setIsAnalyzingCraving(true);
    setCravingError('');
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
    <div className="space-y-8 animate-in slide-in-bottom duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif italic">Cravings Crusher</h2>
        <p className="text-stone-500 text-sm max-w-xs mx-auto">Decode your body&apos;s hidden signals.</p>
      </div>

      <div className="relative">
        <input 
          value={cravingInput}
          onChange={(e) => setCravingInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCrushCraving()}
          placeholder="I&apos;m craving..."
          className="w-full bg-white border border-stone-200 rounded-full pl-6 pr-14 py-4 text-sm shadow-sm focus:border-stone-400 outline-none transition-all placeholder:text-stone-300"
        />
        <button 
          onClick={handleCrushCraving}
          disabled={isAnalyzingCraving || !cravingInput.trim()}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-stone-800 disabled:opacity-50"
        >
          {isAnalyzingCraving ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
        </button>
      </div>

      {cravingError && (
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex space-x-3 text-red-600">
          <AlertCircle size={18} />
          <p className="text-xs font-medium">{cravingError}</p>
        </div>
      )}

      <AnimatePresence>
        {cravingResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-stone-100 rounded-[2.5rem] p-8 space-y-6 shadow-xl"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Biological Gap</p>
              <p className="text-xl font-serif text-stone-800">{cravingResult.deficiency}</p>
            </div>
            <div className="h-px bg-stone-100 w-full" />
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Clean Swap</p>
              <p className="text-lg font-serif italic text-stone-800">{cravingResult.alternative}</p>
              <p className="text-xs text-stone-500 leading-relaxed font-light">{cravingResult.science}</p>
            </div>
            <div className="bg-stone-50 rounded-2xl p-4 italic text-stone-600 text-xs text-center border border-stone-100">
              &quot; {cravingResult.wellness_tip} &quot;
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

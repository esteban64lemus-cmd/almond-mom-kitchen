"use client";

import react from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Loader2,
  ShieldAlert,
  Leaf,
  Sparkles,
} from "lucide-react";
import { auditFridgeItem, generateCleanRecipe } from "@/app/actions/ai-actions";

interface FridgeAuditData {
  verdict: string;
  hidden_toxins: string;
  clean_swap: string;
  impact: string;
}

interface CleanRecipeData {
  title: string;
  time: string;
  ingredients: string[];
  steps: string[];
  wellness_benefit: string;
}

export default function FridgeRescue() {
  const [ingredients, setIngredients] = react.useState<string[]>([]);
  const [inputValue, setInputValue] = react.useState("");
  const [auditResult, setAuditResult] = react.useState<FridgeAuditData | null>(
    null,
  );
  const [recipeResult, setRecipeResult] =
    react.useState<CleanRecipeData | null>(null);
  const [isAuditing, setIsAuditing] = react.useState(false);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = react.useState(false);
  const [error, setError] = react.useState("");

  const addIngredient = async (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (!trimmed || ingredients.includes(trimmed)) return;

    setIngredients([...ingredients, trimmed]);
    setInputValue("");

    // Audit the new item immediately
    setIsAuditing(true);
    setError("");
    const result = await auditFridgeItem(trimmed);
    if (result.success && result.data) {
      setAuditResult(result.data);
    }
    setIsAuditing(false);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    if (ingredients.length === 1) {
      setAuditResult(null);
      setRecipeResult(null);
    }
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) return;
    setIsGeneratingRecipe(true);
    setError("");
    const result = await generateCleanRecipe(ingredients);
    if (result.success && result.data) {
      setRecipeResult(result.data);
    } else {
      setError(result.error || "Could not generate recipe.");
    }
    setIsGeneratingRecipe(false);
  };

  return (
    <div className="animate-in slide-in-bottom space-y-8 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="font-serif text-3xl italic">Fridge Rescue</h2>
        <p className="mx-auto max-w-xs text-sm text-stone-500">
          Is that safe? Let AI audit your fridge and turn the
          &apos;clearest&apos; items into a gourmet meal.
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="relative">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIngredient(inputValue)}
            placeholder="Add an ingredient..."
            className="w-full rounded-full border border-stone-200 bg-white py-4 pr-14 pl-6 text-sm shadow-sm transition-all outline-none placeholder:text-stone-300 focus:border-stone-400"
          />
          <button
            onClick={() => addIngredient(inputValue)}
            title="Add ingredient"
            aria-label="Add ingredient"
            className="absolute top-2 right-2 bottom-2 flex aspect-square items-center justify-center rounded-full bg-stone-900 text-white hover:bg-stone-800"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {ingredients.map((item, idx) => (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              key={idx}
              className="flex items-center space-x-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-xs font-medium text-stone-700"
            >
              <span>{item}</span>
              <button
                onClick={() => removeIngredient(idx)}
                title="Remove ingredient"
                aria-label={`Remove ${item}`}
                className="text-stone-400 transition-colors hover:text-red-500"
              >
                <Trash2 size={12} />
              </button>
            </motion.span>
          ))}
          {ingredients.length === 0 && (
            <p className="text-[10px] font-bold tracking-widest text-stone-300 uppercase">
              Fridge is empty
            </p>
          )}
        </div>
      </div>

      {/* Audit Result */}
      <AnimatePresence mode="wait">
        {isAuditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-4"
          >
            <Loader2 className="animate-spin text-stone-400" />
          </motion.div>
        ) : (
          auditResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[2.5rem] border p-6 ${auditResult.verdict === "Toss" ? "border-red-100 bg-red-50" : "bg-lime-light border-lime-border"} space-y-4`}
            >
              <div className="flex items-center space-x-3">
                {auditResult.verdict === "Toss" ? (
                  <ShieldAlert className="text-red-500" />
                ) : (
                  <Leaf className="text-lime-clean" />
                )}
                <h3 className="font-serif text-stone-800 italic">
                  AI Audit: {auditResult.verdict.toUpperCase()}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-stone-600 italic">
                &quot;{auditResult.impact}&quot;
              </p>
              {auditResult.clean_swap && (
                <div className="pt-2">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    Recommended Swap
                  </p>
                  <p className="text-sm font-medium text-stone-800">
                    {auditResult.clean_swap}
                  </p>
                </div>
              )}
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Recipe Generation & Action Button */}
      {ingredients.length > 0 && (
        <div className="space-y-6">
          <button
            onClick={handleGenerateRecipe}
            disabled={isGeneratingRecipe}
            className="flex w-full items-center justify-center space-x-2 rounded-full bg-stone-900 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-xl shadow-stone-200 transition-all hover:bg-stone-800"
          >
            {isGeneratingRecipe ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Sparkles size={18} />
            )}
            <span>
              {isGeneratingRecipe
                ? "Creating Masterpiece..."
                : ingredients.length === 1
                  ? "Audit Ingredient"
                  : "Create Clean Meal"}
            </span>
          </button>

          <AnimatePresence>
            {recipeResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 rounded-[2.5rem] border border-stone-100 bg-white p-8 shadow-xl"
              >
                <div className="space-y-1">
                  <p className="text-lime-clean text-[10px] font-bold tracking-widest uppercase">
                    Chef&apos;s Selection
                  </p>
                  <h3 className="font-serif text-2xl leading-tight text-stone-800">
                    {recipeResult.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  <span className="flex items-center">
                    <Sparkles size={10} className="mr-1" /> Nutritious
                  </span>
                  <span>•</span>
                  <span>{recipeResult.time}</span>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    Method
                  </p>
                  <div className="space-y-3">
                    {recipeResult.steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex space-x-4">
                        <span className="font-serif text-sm text-stone-300 italic">
                          {idx + 1}.
                        </span>
                        <p className="text-xs leading-relaxed text-stone-600">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4 text-center text-[10px] text-stone-500 italic">
                  &quot; {recipeResult.wellness_benefit} &quot;
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}

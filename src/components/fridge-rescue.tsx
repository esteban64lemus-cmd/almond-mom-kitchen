'use client'

import { useState, useEffect } from 'react'
import { getIngredients, matchRecipes } from '@/app/actions/fridge-rescue'
import RecipeCard from './recipe-card'

interface Ingredient {
  id: string
  name: string
  category: string
}

export default function FridgeRescue() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Ingredient[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([])
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }
      const data = await getIngredients(query)
      setSuggestions(data as Ingredient[])
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [query])

  const addIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.find((i) => i.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
    setQuery('')
    setSuggestions([])
  }

  const removeIngredient = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i.id !== id))
  }

  const handleRescue = async () => {
    setLoading(true)
    const result = await matchRecipes(selectedIngredients.map((i) => i.id))
    if (result.success) {
      setRecipes(result.data || [])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 mb-12">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Fridge Rescue Engine 🥦</h2>
        <p className="text-stone-500 mb-8">Tell us what's in your fridge, and we'll find the cleanest recipes you can make right now.</p>

        {/* Input & Suggestions */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ingredients (e.g. Avocado, Almonds...)"
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-100 shadow-2xl rounded-2xl overflow-hidden z-50">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => addIngredient(s)}
                  className="w-full text-left px-6 py-3 hover:bg-amber-50 text-stone-700 transition-colors border-b border-stone-50 last:border-0"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="ml-2 text-xs text-stone-400 uppercase tracking-wider">{s.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Ingredients Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedIngredients.map((i) => (
            <span
              key={i.id}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200 animate-in fade-in zoom-in duration-200"
            >
              {i.name}
              <button
                onClick={() => removeIngredient(i.id)}
                className="hover:text-amber-600 transition-colors"
              >
                ✕
              </button>
            </span>
          ))}
          {selectedIngredients.length === 0 && (
            <span className="text-stone-400 italic text-sm py-2">No ingredients selected yet...</span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleRescue}
          disabled={selectedIngredients.length === 0 || loading}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
        >
          {loading ? 'Searching Recipes...' : 'Rescue My Dinner →'}
        </button>
      </div>

      {/* Results */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              category={recipe.category}
              isCleanSwap={recipe.is_clean_swap}
              affiliateUrl={recipe.affiliate_url}
              imageUrl={recipe.image_url}
            />
          ))}
        </div>
      ) : recipes.length === 0 && !loading && selectedIngredients.length > 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
          <p className="text-stone-400 font-medium">No recipes found matching ALL these ingredients.</p>
          <p className="text-stone-400 text-sm">Try removing one or two!</p>
        </div>
      ) : null}
    </div>
  )
}

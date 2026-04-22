'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function matchRecipes(ingredientIds: string[]) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.rpc('find_recipes_by_ingredients', {
    search_ingredient_ids: ingredientIds
  })

  if (error) {
    console.error('Error matching recipes:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function getIngredients(query: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(10)

  if (error) {
    console.error('Error fetching ingredients:', error)
    return []
  }

  return data
}

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="min-h-screen bg-stone-50 p-10 font-sans">
      <h1 className="text-3xl font-bold text-stone-800 mb-6">Supabase Todos Test</h1>
      <ul className="space-y-3">
        {todos?.map((todo) => (
          <li key={todo.id} className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm text-stone-700">
            {todo.name}
          </li>
        ))}
        {(!todos || todos.length === 0) && (
          <li className="text-stone-500 italic">No todos found. Make sure you have a 'todos' table with a 'name' column.</li>
        )}
      </ul>
      <div className="mt-10">
        <a href="/" className="text-amber-600 hover:underline">← Back to Home</a>
      </div>
    </div>
  )
}

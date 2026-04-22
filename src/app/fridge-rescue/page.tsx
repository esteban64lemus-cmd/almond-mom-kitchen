import FridgeRescue from '@/components/fridge-rescue'
import Link from 'next/link'

export const metadata = {
  title: 'Fridge Rescue | Almond Mom Kitchen',
  description: 'Enter your ingredients and find clean, healthy recipes you can make right now.',
}

export default function FridgeRescuePage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Nav */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-stone-800 tracking-tight">
            🌿 Almond Mom Kitchen
          </Link>
          <div className="flex gap-6 text-sm font-medium text-stone-600">
            <Link href="/blog" className="hover:text-amber-600 transition-colors">Recipes</Link>
            <Link href="/fridge-rescue" className="text-amber-600">Fridge Rescue</Link>
          </div>
        </div>
      </nav>

      <main className="py-20">
        <FridgeRescue />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400">
        <p>© {new Date().getFullYear()} Almond Mom Kitchen. All rights reserved.</p>
      </footer>
    </div>
  )
}

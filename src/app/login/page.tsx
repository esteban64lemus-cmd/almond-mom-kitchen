'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/app/actions/auth'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = isLogin ? await signIn(formData) : await signUp(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime-light rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-100 rounded-full blur-[120px] opacity-60" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-serif italic text-stone-800">
          Almond Mom
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/fridge-rescue" className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors">Fridge Rescue</Link>
          <Link href="/login" className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg">Sign In</Link>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif italic text-stone-800 tracking-tight block mb-4">
            Sanctuary Access
          </h1>
          <p className="text-stone-500 font-light text-sm">Step into your clean eating companion.</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-stone-100/50">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-5 text-[10px] uppercase tracking-widest font-bold transition-all ${
                isLogin ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-5 text-[10px] uppercase tracking-widest font-bold transition-all ${
                !isLogin ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-stone-50/50 border border-stone-100 rounded-full px-6 py-4 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-stone-300 transition-all placeholder:text-stone-300"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="hello@example.com"
                className="w-full bg-stone-50/50 border border-stone-100 rounded-full px-6 py-4 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-stone-300 transition-all placeholder:text-stone-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-stone-50/50 border border-stone-100 rounded-full px-6 py-4 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-stone-300 transition-all placeholder:text-stone-300"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-[10px] uppercase tracking-widest p-4 rounded-2xl animate-in fade-in zoom-in duration-200 text-center font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-full transition-all shadow-xl text-xs uppercase tracking-widest active:scale-[0.98] disabled:bg-stone-200 disabled:shadow-none mt-4"
            >
              {loading ? 'Processing...' : isLogin ? 'Enter Sanctuary →' : 'Begin Journey →'}
            </button>

            {isLogin && (
              <p className="text-center text-[10px] uppercase tracking-widest font-bold text-stone-400 mt-6">
                Forgot password? <button type="button" className="text-stone-600 hover:text-stone-900 transition-colors">Reset it</button>
              </p>
            )}
          </form>
        </div>

        {/* Social Auth */}
        <div className="mt-10">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200/50"></div>
            </div>
            <span className="relative px-4 bg-[#FDFCFB] text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-full py-4 hover:bg-white transition-all shadow-sm group">
              <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">G</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600 group-hover:text-stone-900 transition-colors">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-full py-4 hover:bg-white transition-all shadow-sm group">
              <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">A</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600 group-hover:text-stone-900 transition-colors">Apple</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

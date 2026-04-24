'use client'

/**
 * LoginPage Component
 * 
 * This component serves as the entry point for user authentication. It handles both
 * standard email/password authentication (Login/Sign Up) and OAuth providers (Google/Apple)
 * via Supabase.
 */

import { useState } from 'react'
import { signIn, signUp } from '@/app/actions/auth'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import InputField from '@/components/InputField'

export default function LoginPage() {
  // ==========================================
  // State & Dependencies
  // ==========================================
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // ==========================================
  // Event Handlers
  // ==========================================

  /**
   * Handles switching between Log In and Sign Up tabs while clearing errors
   */
  const handleTabSwitch = (isLoginView: boolean) => {
    setIsLogin(isLoginView)
    setError(null)
  }

  /**
   * Handles Third-Party OAuth Sign In
   */
  const handleOAuth = async (provider: 'google' | 'apple') => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  /**
   * Handles standard Email/Password Form Submission
   */
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

  // ==========================================
  // Render UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden flex flex-col items-center justify-center p-8">
      {/* --- Abstract Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime-light rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-100 rounded-full blur-[120px] opacity-60" />

      {/* --- Main Content Container --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo & Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif italic text-stone-800 tracking-tight block mb-4">
            Sanctuary Access
          </h1>
          <p className="text-stone-500 font-light text-sm">Step into your clean eating companion.</p>
        </div>

        {/* --- Authentication Card --- */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
          {/* Tab Navigation (Log In vs Sign Up) */}
          <div className="flex border-b border-stone-100/50">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-5 text-[10px] uppercase tracking-widest font-bold transition-all ${
                isLogin ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-5 text-[10px] uppercase tracking-widest font-bold transition-all ${
                !isLogin ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {!isLogin && (
              <InputField
                label="Full Name"
                name="fullName"
                type="text"
                required
                minLength={2}
                maxLength={50}
                placeholder="Jane Doe"
              />
            )}

            {/* Email Field */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              required
              placeholder="hello@example.com"
            />

            {/* Password Field */}
            <InputField
              label="Password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
            />

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-[10px] uppercase tracking-widest p-4 rounded-2xl animate-in fade-in zoom-in duration-200 text-center font-bold">
                {error}
              </div>
            )}

            {/* Submit Button */}
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

        {/* --- Social Authentication Section --- */}
        <div className="mt-10">
          {/* Divider */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200/50"></div>
            </div>
            <span className="relative px-4 bg-[#FDFCFB] text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold">Or continue with</span>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-full py-4 hover:bg-white transition-all shadow-sm group disabled:opacity-50"
            >
              <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">G</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600 group-hover:text-stone-900 transition-colors">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('apple')}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-full py-4 hover:bg-white transition-all shadow-sm group disabled:opacity-50"
            >
              <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">A</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-600 group-hover:text-stone-900 transition-colors">Apple</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

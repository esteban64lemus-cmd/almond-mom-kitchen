"use client";

/**
 * LoginPage Component
 *
 * This component serves as the entry point for user authentication. It handles both
 * standard email/password authentication (Login/Sign Up) and OAuth providers (Google/Apple)
 * via Supabase.
 */

import { useState } from "react";
import { signIn, signUp } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import InputField from "@/components/InputField";

export default function LoginPage() {
  // ==========================================
  // State & Dependencies
  // ==========================================
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // ==========================================
  // Event Handlers
  // ==========================================

  /**
   * Handles switching between Log In and Sign Up tabs while clearing errors
   */
  const handleTabSwitch = (isLoginView: boolean) => {
    setIsLogin(isLoginView);
    setError(null);
  };

  /**
   * Handles Third-Party OAuth Sign In
   */
  const handleOAuth = async (provider: "google" | "apple") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  /**
   * Handles standard Email/Password Form Submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = isLogin ? await signIn(formData) : await signUp(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  // ==========================================
  // Render UI
  // ==========================================
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FDFCFB] p-8">
      {/* --- Abstract Background Elements --- */}
      <div className="bg-lime-light absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full opacity-60 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-stone-100 opacity-60 blur-[120px]" />

      {/* --- Main Content Container --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo & Header Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 block font-serif text-5xl tracking-tight text-stone-800 italic">
            Sanctuary Access
          </h1>
          <p className="text-sm font-light text-stone-500">
            Step into your clean eating companion.
          </p>
        </div>

        {/* --- Authentication Card --- */}
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-100 bg-white/80 shadow-2xl backdrop-blur-xl">
          {/* Tab Navigation (Log In vs Sign Up) */}
          <div className="flex border-b border-stone-100/50">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-5 text-[10px] font-bold tracking-widest uppercase transition-all ${
                isLogin
                  ? "border-b-2 border-stone-900 text-stone-900"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-5 text-[10px] font-bold tracking-widest uppercase transition-all ${
                !isLogin
                  ? "border-b-2 border-stone-900 text-stone-900"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-10">
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
              <div className="animate-in fade-in zoom-in rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-[10px] font-bold tracking-widest text-red-600 uppercase duration-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-stone-900 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-xl transition-all hover:bg-stone-800 active:scale-[0.98] disabled:bg-stone-200 disabled:shadow-none"
            >
              {loading
                ? "Processing..."
                : isLogin
                  ? "Enter Sanctuary →"
                  : "Begin Journey →"}
            </button>

            {isLogin && (
              <p className="mt-6 text-center text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Forgot password?{" "}
                <button
                  type="button"
                  className="text-stone-600 transition-colors hover:text-stone-900"
                >
                  Reset it
                </button>
              </p>
            )}
          </form>
        </div>

        {/* --- Social Authentication Section --- */}
        <div className="mt-10">
          {/* Divider */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200/50"></div>
            </div>
            <span className="relative bg-[#FDFCFB] px-4 text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
              Or continue with
            </span>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={loading}
              className="group flex items-center justify-center gap-2 rounded-full border border-stone-200/50 bg-white/60 py-4 shadow-sm backdrop-blur-md transition-all hover:bg-white disabled:opacity-50"
            >
              <span className="text-lg opacity-70 transition-opacity group-hover:opacity-100">
                G
              </span>
              <span className="text-[10px] font-bold tracking-widest text-stone-600 uppercase transition-colors group-hover:text-stone-900">
                Google
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("apple")}
              disabled={loading}
              className="group flex items-center justify-center gap-2 rounded-full border border-stone-200/50 bg-white/60 py-4 shadow-sm backdrop-blur-md transition-all hover:bg-white disabled:opacity-50"
            >
              <span className="text-lg opacity-70 transition-opacity group-hover:opacity-100">
                A
              </span>
              <span className="text-[10px] font-bold tracking-widest text-stone-600 uppercase transition-colors group-hover:text-stone-900">
                Apple
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

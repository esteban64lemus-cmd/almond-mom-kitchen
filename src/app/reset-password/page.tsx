"use client";

/**
 * ResetPasswordPage Component
 *
 * Landing page for the password recovery link sent by
 * `supabase.auth.resetPasswordForEmail` (triggered from `/login`). The user
 * arrives here after `/auth/callback` has already exchanged the recovery
 * code for a session, so `supabase.auth.updateUser` can set the new
 * password directly.
 */

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import InputField from "@/components/InputField";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 block font-serif text-5xl tracking-tight text-stone-800 italic">
            New Password
          </h1>
          <p className="text-sm font-light text-stone-500">
            Choose a fresh password for your sanctuary.
          </p>
        </div>

        {/* --- Form Card --- */}
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-100 bg-white/80 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6 px-10 py-10">
            <InputField
              label="New Password"
              name="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <div className="animate-in fade-in zoom-in rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-[10px] font-bold tracking-widest text-red-600 uppercase duration-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-stone-900 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-xl transition-all hover:bg-stone-800 active:scale-[0.98] disabled:bg-stone-200 disabled:shadow-none"
            >
              {loading ? "Saving..." : "Save New Password →"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

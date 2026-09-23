"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { updateProfile } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const GOALS = ["More energy", "Better sleep", "Calmer mornings", "Consistency", "Gut comfort", "Cooking more at home"];
// Stored in `profiles.dietary_restrictions`; presented as preferences.
const PREFERENCES = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Nut-free", "Halal", "Kosher"];

interface OnboardingFormProps {
  initialName: string;
  initialGoals: string[];
  initialPreferences: string[];
}

export default function OnboardingForm({ initialName, initialGoals, initialPreferences }: OnboardingFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [goals, setGoals] = useState(initialGoals);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await updateProfile({
        fullName: name.trim() || undefined,
        wellnessGoals: goals,
        dietaryRestrictions: preferences,
        onboardingCompleted: true,
      });
      if (result.error) {
        setError("We couldn't save that just now. Please try again.");
        return;
      }
      router.push("/dashboard");
    });
  };

  return (
    <form onSubmit={submit} className="space-y-10">
      <div>
        <label htmlFor="full-name" className="mb-3 block text-xs font-bold tracking-widest text-stone-500 uppercase">
          What should I call you?
        </label>
        <input
          id="full-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          maxLength={80}
          className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-stone-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/30"
        />
      </div>

      <ChipGroup
        legend="What would feel good to work on?"
        options={GOALS}
        selected={goals}
        onChange={setGoals}
      />

      <ChipGroup
        legend="Any food preferences I should know?"
        hint="Optional — skip if none."
        options={PREFERENCES}
        selected={preferences}
        onChange={setPreferences}
      />

      {error && (
        <p role="alert" className="text-sm text-terracotta">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-800 py-5 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-stone-700 disabled:opacity-60"
      >
        {pending && <Loader2 size={14} className="animate-spin" aria-hidden />}
        Take me to my kitchen
      </button>
    </form>
  );
}

function ChipGroup({
  legend,
  hint,
  options,
  selected,
  onChange,
}: {
  legend: string;
  hint?: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (option: string) =>
    onChange(selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option]);

  return (
    <fieldset>
      <legend className="mb-1 text-xs font-bold tracking-widest text-stone-500 uppercase">{legend}</legend>
      {hint && <p className="mb-3 text-xs text-stone-400">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
                active
                  ? "border-sage bg-sage-light text-stone-800"
                  : "border-stone-200 bg-white text-stone-500 hover:border-sage/60",
              )}
            >
              {active && <Check size={14} aria-hidden />}
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

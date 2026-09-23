import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/app/actions/auth";
import OnboardingForm from "./onboarding-form";

export const metadata: Metadata = {
  title: "Welcome | Almond Mom",
};

export default async function SetupPage() {
  const profile = await getUserProfile();
  if (profile?.onboarding_completed) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-ivory px-6 py-12">
      <main className="mx-auto w-full max-w-xl">
        <header className="mb-10">
          <p className="font-hand text-2xl text-terracotta">Come on in, love.</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-stone-800 italic">
            Let&apos;s make this kitchen yours
          </h1>
          <p className="mt-3 text-stone-500">Three quick questions. You can change any of this later.</p>
        </header>
        <OnboardingForm
          initialName={profile?.full_name ?? ""}
          initialGoals={profile?.wellness_goals ?? []}
          initialPreferences={profile?.dietary_restrictions ?? []}
        />
      </main>
    </div>
  );
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: { email?: string; source?: string };
  try {
    body = (await request.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = (body.source || "site").slice(0, 80);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address" }, { status: 400 });
  }

  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

  if (hasSupabase) {
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      const { error } = await supabase.from("newsletter_subscribers").upsert(
        {
          email,
          source,
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      );

      if (error) {
        // Table may not exist yet — still accept the signup so marketing can ship.
        console.info("[newsletter] supabase upsert skipped:", error.message);
      }
    } catch (error) {
      console.info("[newsletter] supabase unavailable:", error);
    }
  } else {
    console.info("[newsletter] accepted without persistence", { email, source });
  }

  return NextResponse.json({ ok: true });
}

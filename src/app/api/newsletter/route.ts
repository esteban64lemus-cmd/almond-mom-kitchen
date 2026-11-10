import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
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

  const supabase = createServiceClient();
  if (!supabase) {
    // Accept the signup without persistence when service role is not configured.
    // Do not log the email address (PII).
    console.info("[newsletter] accepted without persistence (service role unset)");
    return NextResponse.json({ ok: true });
  }

  try {
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      source,
      subscribed_at: new Date().toISOString(),
    });

    if (error) {
      // Duplicate signup is success for the visitor; other errors still accept so
      // marketing CTAs stay resilient, but never log the email.
      const duplicate =
        error.code === "23505" || /duplicate|unique/i.test(error.message || "");
      if (!duplicate) {
        console.info("[newsletter] persistence skipped:", error.code || "unknown");
      }
    }
  } catch {
    console.info("[newsletter] persistence unavailable");
  }

  return NextResponse.json({ ok: true });
}

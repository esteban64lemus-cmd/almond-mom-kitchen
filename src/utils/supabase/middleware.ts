import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Placeholder fallbacks keep `next build` from crashing when env vars are
// absent; real values must be set in the environment for auth to work.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "placeholder-anon-key";

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // This automatically refreshes the auth token if needed
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Demo Mode Bypass
  const isDemo = request.cookies.has("demo_mode");

  // If user is logged in (or in demo mode) and tries to access /login, send them to dashboard
  if (
    (user || isDemo) &&
    request.nextUrl.pathname === "/login"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Logged-out visitors can browse static kitchen surfaces (home, recipes, saved, cart).
  // /shop hosts GroceryUpgrader (billable AI via AI_GATEWAY_API_KEY) — keep it behind
  // session/demo like fridge, quests, and profile.
  const path = request.nextUrl.pathname;
  const kitchen =
    path === "/" ||
    path === "/login" ||
    path === "/welcome" ||
    path === "/saved" ||
    path === "/cart" ||
    path.startsWith("/auth") ||
    path.startsWith("/blog");
  if (!user && !isDemo && !kitchen) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
};

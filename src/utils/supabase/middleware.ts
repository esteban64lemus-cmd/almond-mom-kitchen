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

  // This automatically refreshes the auth token if needed.
  // A Supabase session is the only way through this gate. Client cookies
  // such as demo_mode are ignored so logged-out visitors cannot skip /login.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Signed-in visitors do not need the login screen.
  if (user && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Logged-out visitors can browse marketing + static kitchen surfaces
  // (welcome, mission, journal, recipes, saved, cart) and Desk by Seb.
  // /shop hosts GroceryUpgrader (billable AI) — keep it behind a session.
  const path = request.nextUrl.pathname;

  // Cold traffic on `/` should land on the marketing funnel, not the app feed.
  if (!user && path === "/") {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  const kitchen =
    path === "/login" ||
    path === "/welcome" ||
    path === "/mission" ||
    path === "/saved" ||
    path === "/cart" ||
    path === "/desk" ||
    path.startsWith("/desk/") ||
    path.startsWith("/auth") ||
    path.startsWith("/blog") ||
    path.startsWith("/journal") ||
    path.startsWith("/api/newsletter");
  if (!user && !kitchen) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
};

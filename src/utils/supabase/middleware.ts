import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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

  // If user is logged in (or in demo mode), they should go directly to dashboard instead of root or login
  if (
    (user || isDemo) &&
    (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/login")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT logged in and NOT in demo mode, they must be at /login (or auth callbacks)
  if (
    !user &&
    !isDemo &&
    request.nextUrl.pathname !== "/login" &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
};

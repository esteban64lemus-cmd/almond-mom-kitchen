import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  // This helper refreshes the user's session if it has expired
  // and returns a NextResponse object with updated cookies.
  return await createClient(request);
}

// sitemap.xml / robots.txt are excluded so crawlers (always logged out) can read them;
// the auth gate was redirecting them to /login. Also allow-listed in utils/supabase/middleware.ts.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

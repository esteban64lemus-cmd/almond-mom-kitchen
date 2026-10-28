/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const mockGetUser = jest.fn();

jest.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
  }),
}));

import { createClient } from "./middleware";

function requestFor(path: string, cookieHeader?: string) {
  const headers = new Headers();
  if (cookieHeader) headers.set("cookie", cookieHeader);
  return new NextRequest(new URL(`http://localhost${path}`), { headers });
}

describe("auth middleware kitchen allowlist", () => {
  beforeEach(() => {
    mockGetUser.mockReset();
    mockGetUser.mockResolvedValue({ data: { user: null } });
  });

  it("redirects anonymous /shop visitors to /login (billable AI lives there)", async () => {
    const response = await createClient(requestFor("/shop"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/login");
  });

  it("still allows anonymous browsing of static kitchen routes", async () => {
    for (const path of ["/", "/blog", "/saved", "/cart"]) {
      const response = await createClient(requestFor(path));
      expect(response.status).toBe(200);
    }
  });

  it("allows /shop when demo_mode is set", async () => {
    const response = await createClient(
      requestFor("/shop", "demo_mode=true"),
    );
    expect(response.status).toBe(200);
  });
});

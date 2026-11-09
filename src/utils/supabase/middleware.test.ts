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

function requestFor(path: string) {
  return new NextRequest(new URL(`http://localhost${path}`));
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

  it("still allows anonymous browsing of static kitchen routes and /desk", async () => {
    for (const path of ["/", "/blog", "/saved", "/cart", "/desk"]) {
      const response = await createClient(requestFor(path));
      expect(response.status).toBe(200);
    }
  });

  it("allows /shop for a signed-in user", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    const response = await createClient(requestFor("/shop"));
    expect(response.status).toBe(200);
  });
});

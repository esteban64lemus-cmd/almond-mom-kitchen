/**
 * @jest-environment node
 */

const mockGetUser = jest.fn();
const mockCookiesHas = jest.fn();
const mockFetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(async () => ({
    getAll: () => [],
    get: () => undefined,
    has: mockCookiesHas,
    set: () => undefined,
  })),
}));

jest.mock("@/utils/supabase/server", () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
  }),
}));

import { upgradeGroceryList } from "@/app/actions/ai-actions";

describe("upgradeGroceryList auth gate", () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.AI_GATEWAY_API_KEY;

  beforeEach(() => {
    mockGetUser.mockReset();
    mockCookiesHas.mockReset();
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
    process.env.AI_GATEWAY_API_KEY = "test-key";
  });

  afterAll(() => {
    global.fetch = originalFetch;
    process.env.AI_GATEWAY_API_KEY = originalKey;
  });

  it("rejects anonymous callers before hitting the AI gateway", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    mockCookiesHas.mockReturnValue(false);

    const result = await upgradeGroceryList("milk, bread");

    expect(result).toEqual({
      success: false,
      error: "Sign in to use Almond Mom AI features.",
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("allows a signed-in user through to the gateway", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
    mockCookiesHas.mockReturnValue(false);
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                upgrades: [
                  {
                    original: "milk",
                    swap: "organic A2 milk",
                    reason: "cleaner fats",
                  },
                ],
              }),
            },
          },
        ],
      }),
    });

    const result = await upgradeGroceryList("milk");

    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("allows demo_mode without a session", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    mockCookiesHas.mockImplementation((name: string) => name === "demo_mode");
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({ upgrades: [] }),
            },
          },
        ],
      }),
    });

    const result = await upgradeGroceryList("chips");

    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});

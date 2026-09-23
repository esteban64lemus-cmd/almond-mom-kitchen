"use server";

import { SAFETY_RAILS, sanitizeAiInput } from "@/lib/ai-safety";

interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CravingData {
  deficiency: string;
  alternative: string;
  science: string;
  wellness_tip: string;
}

interface FridgeAuditData {
  verdict: "Enjoy" | "Level up";
  notes: string;
  clean_swap: string;
  impact: string;
}

interface CleanRecipeData {
  title: string;
  time: string;
  ingredients: string[];
  steps: string[];
  wellness_benefit: string;
}

interface GroceryUpgradeItem {
  original: string;
  swap: string;
  reason: string;
}

/**
 * GEMINI API INTEGRATION with Exponential Backoff
 */
const apiKey = process.env.AI_GATEWAY_API_KEY;

async function fetchAI(
  prompt: string,
  schemaProperties: Record<string, unknown>,
) {
  if (!apiKey) {
    throw new Error(
      "AI_GATEWAY_API_KEY is not configured. Please add it to your environment variables.",
    );
  }

  const url = `https://ai-gateway.vercel.sh/v1/chat/completions`;
  const systemPrompt = `You are Almond Mom, a warm holistic kitchen companion.

${SAFETY_RAILS}

Output ONLY valid JSON matching these schema properties: ${JSON.stringify(schemaProperties)}. Do not include markdown code blocks around the JSON.`;

  const payload = {
    model: "openai/gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  };

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`
        );
      }
      const result = await response.json();
      const content = result.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("Unexpected response structure from AI Gateway");
      }
      return JSON.parse(content);
    } catch (e) {
      if (i === 4) throw e;
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

export async function analyzeCraving(
  input: string,
): Promise<AIResponse<CravingData>> {
  const prompt = `User is craving: "${sanitizeAiInput(input)}". Gently explore what this craving may be telling them (for example rest, comfort, magnesium, or simply enjoyment — enjoyment is valid). Suggest a satisfying whole-food option they could have alongside or instead if they'd like, the simple science behind it, and a kind tip.`;

  const schema = {
    deficiency: { type: "string" },
    alternative: { type: "string" },
    science: { type: "string" },
    wellness_tip: { type: "string" },
  };

  try {
    const data = await fetchAI(prompt, schema);
    return { success: true, data };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Craving analysis error:", error);
    return { success: false, error: error.message };
  }
}

export async function auditFridgeItem(
  input: string,
): Promise<AIResponse<FridgeAuditData>> {
  const prompt = `User has "${sanitizeAiInput(input)}" in their refrigerator. Give a verdict of exactly "Enjoy" (great as is) or "Level up" (great with an easy addition). Add a short neutral note about what's in it, suggest one easy thing to pair or add for more nourishment, and describe in one sentence how it can support their day.`;

  const schema = {
    verdict: { type: "string", enum: ["Enjoy", "Level up"] },
    notes: { type: "string" },
    clean_swap: { type: "string" },
    impact: { type: "string" },
  };

  try {
    const data = await fetchAI(prompt, schema);
    return { success: true, data };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Fridge audit error:", error);
    return { success: false, error: error.message };
  }
}

export async function generateCleanRecipe(
  items: string[],
): Promise<AIResponse<CleanRecipeData>> {
  const prompt = `I have these items in my fridge/pantry: ${items.map(sanitizeAiInput).join(", ")}. Create a beautiful, cozy, gut-friendly recipe using some of these items (and basic pantry staples). Output the title, prep time, ingredients list, step-by-step instructions, and the core wellness benefit.`;

  const schema = {
    title: { type: "string" },
    time: { type: "string" },
    ingredients: { type: "array", items: { type: "string" } },
    steps: { type: "array", items: { type: "string" } },
    wellness_benefit: { type: "string" },
  };

  try {
    const data = await fetchAI(prompt, schema);
    return { success: true, data };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Recipe generation error:", error);
    return { success: false, error: error.message };
  }
}

export async function upgradeGroceryList(
  input: string,
): Promise<AIResponse<GroceryUpgradeItem[]>> {
  const prompt = `Here is my grocery list: "${sanitizeAiInput(input)}". For each item, suggest an optional upgrade — a whole-food variety, a more nourishing version, or something to add alongside it. Provide the original name, the suggestion, and one friendly sentence on why it's nice. Keeping the original is always fine.`;

  const schema = {
    upgrades: {
      type: "array",
      items: {
        type: "object",
        properties: {
          original: { type: "string" },
          swap: { type: "string" },
          reason: { type: "string" },
        },
      },
    },
  };

  try {
    const result = await fetchAI(prompt, schema);
    return { success: true, data: result.upgrades };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Grocery upgrade error:", error);
    return { success: false, error: error.message };
  }
}

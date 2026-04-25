"use server";

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
  verdict: string;
  hidden_toxins: string;
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
  const systemPrompt = `You are a high-end holistic wellness coach AI. Output ONLY valid JSON matching this schema properties: ${JSON.stringify(schemaProperties)}. Do not include markdown code blocks around the JSON.`;

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
  const prompt = `User is craving: "${input}". Act as a high-end wellness coach. Analyze the craving. Explain the biological deficiency (magnesium, etc.), provide a whole-food alternative, the science behind it, and a motivational tip.`;

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
  const prompt = `User has "${input}" in their refrigerator. Act as a strict but encouraging holistic wellness coach. Analyze this food item. Provide a verdict ("Keep" or "Toss"), identify any hidden toxins (seed oils, sugars, gums), suggest a clean swap, and explain the biological impact.`;

  const schema = {
    verdict: { type: "string" },
    hidden_toxins: { type: "string" },
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
  const prompt = `I have these items in my fridge/pantry: ${items.join(", ")}. Act as an Almond Mom Kitchen wellness chef. Create a highly aesthetic, clean-girl, gut-friendly recipe using some of these items (and basic pantry staples). Output the title, prep time, ingredients list, step-by-step instructions, and the core wellness benefit.`;

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
  const prompt = `Here is my standard grocery list: "${input}". Act as an elite holistic wellness coach. Upgrade this list to the cleanest, highest-quality 'Almond Mom' standards. For each item, provide the original name, a specific clean brand or whole-food alternative swap, and the health reason.`;

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

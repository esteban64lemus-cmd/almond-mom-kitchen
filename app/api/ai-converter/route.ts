// /app/api/ai-converter/route.ts
// API route: gram-to-ounce conversion + clean-swap check

import { NextRequest, NextResponse } from "next/server";
import { gramsToOunces, convertToAlmondMomSwap, isVerifiedClean } from "@/lib/AI-Converter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, value, isCleanSwap } = body;

    if (action === "gramsToOunces") {
      if (typeof value !== "number") {
        return NextResponse.json({ error: "value must be a number" }, { status: 400 });
      }
      return NextResponse.json({ result: gramsToOunces(value), unit: "oz" });
    }

    if (action === "convertToAlmondMomSwap") {
      if (typeof value !== "number") {
        return NextResponse.json({ error: "value must be a number" }, { status: 400 });
      }
      return NextResponse.json({ result: convertToAlmondMomSwap(value), unit: "g" });
    }

    if (action === "checkCleanSwap") {
      return NextResponse.json({ isVerifiedClean: isVerifiedClean(isCleanSwap) });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

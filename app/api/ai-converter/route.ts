import { NextRequest, NextResponse } from "next/server";
import { convertToAlmondMomSwap } from "@/lib/AI-Converter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, value } = body;

    // Only handle the action that actually has a working function
    if (action === "convertToAlmondMomSwap") {
      if (typeof value !== "number") {
        return NextResponse.json({ error: "value must be a number" }, { status: 400 });
      }
      return NextResponse.json({ result: convertToAlmondMomSwap(value), unit: "g" });
    }

    // If you try to call gramsToOunces or checkCleanSwap, return an error instead of crashing the build
    return NextResponse.json({ error: "This feature is currently unavailable" }, { status: 400 });
    
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

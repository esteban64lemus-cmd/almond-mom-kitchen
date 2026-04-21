import { NextRequest, NextResponse } from "next/server";
import { convertToAlmondMomSwap } from "@/lib/AI-Converter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, value } = body;

    if (action === "convertToAlmondMomSwap") {
      // Assuming 'value' contains the recipe or weight to swap
      if (value === undefined) {
        return NextResponse.json({ error: "value is missing" }, { status: 400 });
      }
      
      const result = await convertToAlmondMomSwap(value);
      return NextResponse.json({ result });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

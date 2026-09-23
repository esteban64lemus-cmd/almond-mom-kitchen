import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// ElevenLabs text-to-speech proxy. The API key never leaves the server, and
// only signed-in users can spend credits (demo mode falls back to the
// browser's built-in voice on the client).

const MAX_CHARS = 600;
// "Rachel" — an ElevenLabs premade voice; override with ELEVENLABS_VOICE_ID.
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
// Multilingual so the same voice can read EN and ES copy.
const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

export async function POST(request: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Voice is not configured." }, { status: 503 });
  }

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Sign in to use Almond Mom's voice." }, { status: 401 });
  }

  let text: unknown;
  try {
    ({ text } = await request.json());
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (typeof text !== "string" || !text.trim()) {
    return Response.json({ error: "`text` is required." }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return Response.json({ error: `Text must be ${MAX_CHARS} characters or fewer.` }, { status: 413 });
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID,
        // Warm and steady rather than theatrical — calm is the brief.
        voice_settings: { stability: 0.6, similarity_boost: 0.75, style: 0.2 },
      }),
    },
  );

  if (!upstream.ok || !upstream.body) {
    console.error("ElevenLabs TTS failed", upstream.status, await upstream.text().catch(() => ""));
    return Response.json({ error: "Voice is unavailable right now." }, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "private, no-store",
    },
  });
}

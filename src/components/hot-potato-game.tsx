"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, RotateCcw, Trophy, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  type Heat,
  eliminate,
  fuseProgress,
  heatLevel,
  normalizePlayers,
  pickBurnLine,
  randomFuseMs,
  tickIntervalMs,
} from "@/lib/hot-potato";

type Phase = "setup" | "ready" | "playing" | "burned" | "winner";

const HEAT_STYLES: Record<Heat, { potato: string; glow: string; label: string }> = {
  warm: { potato: "#d9a86c", glow: "rgba(217,168,108,0.35)", label: "Warm…" },
  hot: { potato: "#e08a4f", glow: "rgba(224,138,79,0.5)", label: "Getting hot!" },
  sizzling: { potato: "#d4553a", glow: "rgba(212,85,58,0.65)", label: "SIZZLING!" },
};

// One shared AudioContext; browsers only allow it to start after a tap.
function useBeeper(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensure = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const tone = useCallback(
    (freq: number, durationS: number, type: OscillatorType = "square", volume = 0.08) => {
      if (!enabled) return;
      const ctx = ensure();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationS);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationS);
    },
    [enabled, ensure],
  );

  const boom = useCallback(() => {
    if (!enabled) return;
    const ctx = ensure();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.7);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }, [enabled, ensure]);

  const cheer = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.25, "triangle", 0.12), i * 140));
  }, [tone]);

  return { ensure, tone, boom, cheer };
}

function Potato({ heat, shaking }: { heat: Heat; shaking: boolean }) {
  const style = HEAT_STYLES[heat];
  const wobble = heat === "sizzling" ? 9 : heat === "hot" ? 5 : 2;
  const speed = heat === "sizzling" ? 0.12 : heat === "hot" ? 0.22 : 0.5;

  return (
    <motion.div
      animate={shaking ? { rotate: [-wobble, wobble, -wobble], x: [-wobble / 2, wobble / 2, -wobble / 2] } : { rotate: 0, x: 0 }}
      transition={shaking ? { repeat: Infinity, duration: speed, ease: "easeInOut" } : { duration: 0.3 }}
      className="relative"
      style={{ filter: `drop-shadow(0 0 32px ${style.glow})` }}
    >
      <svg viewBox="0 0 200 160" className="h-48 w-60 sm:h-56 sm:w-72" aria-hidden>
        {shaking && heat !== "warm" && (
          <g stroke="#b8b0a4" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7">
            <path d="M70 22 q-8 -10 0 -18" />
            <path d="M100 18 q-8 -10 0 -18" />
            <path d="M130 22 q-8 -10 0 -18" />
          </g>
        )}
        <ellipse cx="100" cy="92" rx="88" ry="60" fill={style.potato} />
        <ellipse cx="72" cy="70" rx="30" ry="14" fill="#fff" opacity="0.18" />
        <g fill="#8b6a45" opacity="0.55">
          <circle cx="45" cy="110" r="4" />
          <circle cx="150" cy="70" r="3.5" />
          <circle cx="160" cy="118" r="4" />
          <circle cx="120" cy="130" r="3" />
        </g>
        {/* Face gets more panicked as the heat rises */}
        <circle cx="78" cy="88" r={heat === "sizzling" ? 9 : 7} fill="#2b2118" />
        <circle cx="122" cy="88" r={heat === "sizzling" ? 9 : 7} fill="#2b2118" />
        <circle cx="80" cy="85" r="2.5" fill="#fff" />
        <circle cx="124" cy="85" r="2.5" fill="#fff" />
        {heat === "warm" && <path d="M84 112 q16 12 32 0" stroke="#2b2118" strokeWidth="4" fill="none" strokeLinecap="round" />}
        {heat === "hot" && <path d="M86 116 h28" stroke="#2b2118" strokeWidth="4" strokeLinecap="round" />}
        {heat === "sizzling" && <ellipse cx="100" cy="118" rx="12" ry="10" fill="#2b2118" />}
        {heat !== "warm" && (
          <g fill="#7ec4e8">
            <path d="M58 70 q-5 9 0 12 q5 -3 0 -12z" />
            {heat === "sizzling" && <path d="M146 72 q-5 9 0 12 q5 -3 0 -12z" />}
          </g>
        )}
      </svg>
    </motion.div>
  );
}

export default function HotPotatoGame() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [draftNames, setDraftNames] = useState<string[]>(["", "", ""]);
  const [players, setPlayers] = useState<string[]>([]);
  const [heat, setHeat] = useState<Heat>("warm");
  const [burnLine, setBurnLine] = useState("");
  const [winner, setWinner] = useState<string | null>(null);
  const [sound, setSound] = useState(true);
  const [round, setRound] = useState(1);

  const { ensure, tone, boom, cheer } = useBeeper(sound);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => stopTimer, []);

  // The fuse: a self-rescheduling beep loop whose interval shrinks as it burns.
  // Keep the latest callbacks in refs so the loop isn't restarted on toggles.
  const toneRef = useRef(tone);
  const boomRef = useRef(boom);
  useEffect(() => {
    toneRef.current = tone;
    boomRef.current = boom;
  }, [tone, boom]);

  const light = () => {
    ensure(); // unlock audio inside the tap handler
    stopTimer();
    const fuseMs = randomFuseMs();
    const startedAt = performance.now();
    let high = false;
    setHeat("warm");
    setPhase("playing");

    const tick = () => {
      const progress = fuseProgress(performance.now() - startedAt, fuseMs);
      if (progress >= 1) {
        boomRef.current();
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.([300, 100, 300]);
        setBurnLine(pickBurnLine());
        setPhase("burned");
        timerRef.current = null;
        return;
      }
      const h = heatLevel(progress);
      setHeat(h);
      high = !high;
      toneRef.current(high ? 880 : 660, 0.06);
      timerRef.current = setTimeout(tick, tickIntervalMs(progress));
    };
    tick();
  };

  const startGame = (names: string[]) => {
    ensure();
    setPlayers(names);
    setRound(1);
    setWinner(null);
    setPhase("ready");
  };

  const burn = (name: string) => {
    const { remaining, winner: w } = eliminate(players, name);
    setPlayers(remaining);
    if (w) {
      setWinner(w);
      setPhase("winner");
      cheer();
    } else {
      setRound((r) => r + 1);
      setPhase("ready");
    }
  };

  const reset = () => {
    stopTimer();
    setPhase("setup");
    setWinner(null);
  };

  const roster = normalizePlayers(draftNames);
  const quickPlay = players.length === 0;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
          {phase === "setup" ? "Set the table" : phase === "winner" ? "Game over" : quickPlay ? "Quick play" : `Round ${round} · ${players.length} left`}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSound((s) => !s)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm hover:text-stone-800"
            aria-label={sound ? "Mute sound" : "Turn sound on"}
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          {phase !== "setup" && (
            <button
              type="button"
              onClick={reset}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm hover:text-stone-800"
              aria-label="New game"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {phase === "setup" && (
        <div className="w-full rounded-[32px] border border-black/5 bg-white/80 p-6 shadow-sm">
          <h2 className="mb-1 font-serif text-2xl text-stone-800 italic">Who&apos;s playing?</h2>
          <p className="mb-5 text-sm text-stone-500">Add everyone in the circle. Last one standing wins.</p>
          <div className="space-y-2">
            {draftNames.map((name, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={name}
                  onChange={(e) => setDraftNames((d) => d.map((n, j) => (j === i ? e.target.value : n)))}
                  placeholder={`Player ${i + 1}`}
                  maxLength={20}
                  aria-label={`Player ${i + 1} name`}
                  className="h-12 flex-1 rounded-2xl border border-stone-200 bg-ivory px-4 text-stone-800 outline-none focus:border-sage"
                />
                {draftNames.length > MIN_PLAYERS && (
                  <button
                    type="button"
                    onClick={() => setDraftNames((d) => d.filter((_, j) => j !== i))}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                    aria-label={`Remove player ${i + 1}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {draftNames.length < MAX_PLAYERS && (
            <button
              type="button"
              onClick={() => setDraftNames((d) => [...d, ""])}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-800"
            >
              <Plus size={16} /> Add player
            </button>
          )}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={roster.length < MIN_PLAYERS}
              onClick={() => startGame(roster)}
              className="h-14 rounded-2xl bg-terracotta font-bold text-white shadow-lg shadow-terracotta/20 transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
            >
              Start game
            </button>
            <button
              type="button"
              onClick={() => startGame([])}
              className="h-14 rounded-2xl bg-stone-100 font-bold text-stone-700 hover:bg-stone-200"
            >
              Quick play (no names)
            </button>
          </div>
        </div>
      )}

      {(phase === "ready" || phase === "playing") && (
        <div className="flex w-full flex-col items-center">
          <Potato heat={phase === "playing" ? heat : "warm"} shaking={phase === "playing"} />
          {phase === "ready" ? (
            <>
              <p className="mt-6 mb-6 text-center text-stone-500">
                Sit in a circle. When it starts, <b>pass the phone</b> to the next person — fast!
              </p>
              <button
                type="button"
                onClick={light}
                className="h-16 w-full max-w-xs rounded-full bg-terracotta text-lg font-black tracking-wide text-white shadow-xl shadow-terracotta/30 transition-transform hover:scale-105 active:scale-95"
              >
                Light the potato 🔥
              </button>
            </>
          ) : (
            <motion.p
              key={heat}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                "mt-8 text-center text-3xl font-black tracking-tight",
                heat === "sizzling" ? "text-terracotta" : "text-stone-700",
              )}
            >
              {HEAT_STYLES[heat].label}
              <span className="mt-2 block text-sm font-semibold tracking-widest text-stone-400 uppercase">
                Pass it! Pass it!
              </span>
            </motion.p>
          )}
        </div>
      )}

      {phase === "burned" && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-full rounded-[32px] bg-stone-900 p-8 text-center text-white shadow-xl"
        >
          <div className="mb-2 text-6xl" aria-hidden>
            💥🥔
          </div>
          <h2 className="mb-2 text-3xl font-black tracking-tight">{burnLine}</h2>
          {quickPlay ? (
            <>
              <p className="mb-6 text-white/60">Whoever&apos;s holding the phone is out. Everyone else — scoot in!</p>
              <button
                type="button"
                onClick={() => setPhase("ready")}
                className="h-14 w-full rounded-2xl bg-terracotta font-bold"
              >
                Next round
              </button>
            </>
          ) : (
            <>
              <p className="mb-6 text-white/60">Who was holding it?</p>
              <div className="grid grid-cols-2 gap-2">
                {players.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => burn(p)}
                    className="h-14 truncate rounded-2xl bg-white/10 px-3 font-bold hover:bg-terracotta"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}

      {phase === "winner" && winner && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-full rounded-[32px] border border-black/5 bg-white p-8 text-center shadow-xl"
        >
          <Trophy className="mx-auto mb-3 text-terracotta" size={48} />
          <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Coolest hands in the kitchen</p>
          <h2 className="mt-2 mb-6 font-serif text-4xl text-stone-800 italic">{winner} wins!</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => startGame(roster.length >= MIN_PLAYERS ? roster : [])}
              className="h-14 rounded-2xl bg-terracotta font-bold text-white"
            >
              Play again
            </button>
            <button type="button" onClick={reset} className="h-14 rounded-2xl bg-stone-100 font-bold text-stone-700">
              Change players
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

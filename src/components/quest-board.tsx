"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Flame, Moon, Sparkles } from "lucide-react";
import AlmondMomVoice from "@/components/almond-mom-voice";
import { cn } from "@/lib/utils";
import {
  type Quest,
  type QuestCategory,
  QUEST_POOL,
  calculateStamina,
  calculateStreak,
  getDailyQuests,
  questXp,
  toDateKey,
} from "@/lib/quests";

// v1 persists per-device in localStorage; move to a Supabase table once the
// profiles migration is live so progress follows the user across devices.
const STORAGE_KEY = "almond-mom:quests:v1";

interface DayLog {
  sleepHours: number;
  quality: number;
  done: string[];
}
type QuestLog = Record<string, DayLog>;

const CATEGORY_STYLES: Record<QuestCategory, { label: string; className: string }> = {
  focus: { label: "Focus", className: "bg-stone-100 text-stone-600" },
  body: { label: "Body", className: "bg-sage-light text-stone-700" },
  home: { label: "Home", className: "bg-scrap-paper text-taupe" },
  connect: { label: "Connect", className: "bg-terracotta/10 text-terracotta" },
};

const XP_BY_ID = new Map(QUEST_POOL.map((q) => [q.id, questXp(q)]));

const QUALITY_LABELS = ["Rough", "Restless", "Okay", "Good", "Restful"];

const subscribeNever = () => () => {};

function readLog(): QuestLog {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuestLog) : {};
  } catch {
    return {};
  }
}

function writeLog(log: QuestLog) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  } catch {
    // Private mode / storage full: progress just won't persist this session.
  }
}

export default function QuestBoard() {
  // Dates and storage are client-only; render a skeleton until hydrated so
  // server and client HTML match.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const [log, setLog] = useState<QuestLog>(readLog);
  const [editingSleep, setEditingSleep] = useState(false);
  const [sleepHours, setSleepHours] = useState(7);
  const [quality, setQuality] = useState(3);

  const today = hydrated ? new Date() : null;
  const todayKey = today ? toDateKey(today) : null;
  const todayLog = todayKey ? log[todayKey] : undefined;
  const stamina = todayLog ? calculateStamina(todayLog.sleepHours, todayLog.quality) : null;
  const quests = todayKey && stamina ? getDailyQuests(todayKey, stamina.tier) : [];

  const totalXp = Object.values(log).reduce(
    (sum, day) => sum + day.done.reduce((s, id) => s + (XP_BY_ID.get(id) ?? 0), 0),
    0,
  );
  const todayXp = quests.filter((q) => todayLog?.done.includes(q.id)).reduce((s, q) => s + questXp(q), 0);
  const streak = today
    ? calculateStreak(
        Object.entries(log)
          .filter(([, day]) => day.done.length > 0)
          .map(([date]) => date),
        today,
      )
    : 0;

  const update = (next: QuestLog) => {
    setLog(next);
    writeLog(next);
  };

  const saveSleep = () => {
    if (!todayKey) return;
    update({ ...log, [todayKey]: { sleepHours, quality, done: todayLog?.done ?? [] } });
    setEditingSleep(false);
  };

  const toggleQuest = (quest: Quest) => {
    if (!todayKey || !todayLog) return;
    const done = todayLog.done.includes(quest.id)
      ? todayLog.done.filter((id) => id !== quest.id)
      : [...todayLog.done, quest.id];
    update({ ...log, [todayKey]: { ...todayLog, done } });
  };

  const startEditing = () => {
    if (todayLog) {
      setSleepHours(todayLog.sleepHours);
      setQuality(todayLog.quality);
    }
    setEditingSleep(true);
  };

  if (!today) {
    return <div className="h-96 animate-pulse rounded-[2rem] bg-ivory" aria-busy="true" />;
  }

  const allDone = quests.length > 0 && quests.every((q) => todayLog?.done.includes(q.id));
  const showCheckIn = !todayLog || editingSleep;
  const readAloud = stamina
    ? `${stamina.label}. ${stamina.message} Today's quests: ${quests.map((q) => q.title).join(". ")}.`
    : "";

  return (
    <div className="space-y-8">
      {/* Progress chips */}
      <div className="flex flex-wrap gap-3">
        <Chip icon={<Flame size={14} className="text-terracotta" aria-hidden />}>
          {streak} day streak
        </Chip>
        <Chip icon={<Sparkles size={14} className="text-sage" aria-hidden />}>
          {totalXp} XP total
        </Chip>
      </div>

      {/* Sleep check-in → stamina */}
      <section aria-labelledby="stamina-heading" className="rounded-[2rem] border border-taupe/15 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-light text-sage">
            <Moon size={18} aria-hidden />
          </div>
          <h2 id="stamina-heading" className="font-serif text-2xl text-stone-800 italic">
            {showCheckIn ? "How did you sleep?" : "Today's stamina"}
          </h2>
        </div>

        {showCheckIn ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="sleep-hours" className="mb-2 flex justify-between text-xs font-bold tracking-widest text-stone-500 uppercase">
                <span>Hours of sleep</span>
                <span className="text-stone-800">{sleepHours}h</span>
              </label>
              <input
                id="sleep-hours"
                type="range"
                min={0}
                max={12}
                step={0.5}
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-[var(--sage)]"
              />
            </div>
            <fieldset>
              <legend className="mb-2 text-xs font-bold tracking-widest text-stone-500 uppercase">
                How rested do you feel?
              </legend>
              <div className="grid grid-cols-5 gap-2">
                {QUALITY_LABELS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setQuality(i + 1)}
                    aria-pressed={quality === i + 1}
                    className={cn(
                      "rounded-xl border px-1 py-2 text-[11px] font-semibold transition-colors",
                      quality === i + 1
                        ? "border-sage bg-sage-light text-stone-800"
                        : "border-stone-200 text-stone-500 hover:border-sage/60",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              onClick={saveSleep}
              className="w-full rounded-full bg-stone-800 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-stone-700"
            >
              Set my stamina
            </button>
          </div>
        ) : (
          stamina && (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold tracking-widest text-stone-500 uppercase">{stamina.label}</span>
                <span className="font-serif text-3xl text-stone-800">{stamina.score}</span>
              </div>
              <div
                role="progressbar"
                aria-label="Stamina"
                aria-valuenow={stamina.score}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-3 overflow-hidden rounded-full bg-stone-100"
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-700",
                    stamina.tier === "gentle" && "bg-terracotta/70",
                    stamina.tier === "steady" && "bg-taupe/70",
                    stamina.tier === "bright" && "bg-sage",
                  )}
                  style={{ width: `${stamina.score}%` }}
                />
              </div>
              <p className="text-sm leading-relaxed text-stone-600">{stamina.message}</p>
              <div className="flex flex-wrap items-center gap-3">
                <AlmondMomVoice text={readAloud} label="Read my day" />
                <button
                  type="button"
                  onClick={startEditing}
                  className="text-[10px] font-bold tracking-widest text-stone-400 uppercase underline-offset-4 hover:text-stone-700 hover:underline"
                >
                  Update sleep
                </button>
              </div>
            </div>
          )
        )}
      </section>

      {/* Micro-quests */}
      {stamina && !editingSleep && (
        <section aria-labelledby="quests-heading">
          <div className="mb-4 flex items-center justify-between px-2">
            <h2 id="quests-heading" className="text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
              Micro-quests
            </h2>
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">+{todayXp} XP today</span>
          </div>
          <ul className="space-y-3">
            {quests.map((quest) => {
              const done = todayLog?.done.includes(quest.id) ?? false;
              const category = CATEGORY_STYLES[quest.category];
              return (
                <li key={quest.id}>
                  <button
                    type="button"
                    onClick={() => toggleQuest(quest)}
                    aria-pressed={done}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition-colors",
                      done ? "border-sage/40 bg-sage-light/60" : "border-stone-100 bg-white hover:border-sage/50",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        done ? "border-sage bg-sage text-white" : "border-stone-300",
                      )}
                      aria-hidden
                    >
                      {done && <Check size={14} strokeWidth={3} />}
                    </span>
                    <span className="flex-1">
                      <span className={cn("block font-semibold text-stone-800", done && "text-stone-500 line-through")}>
                        {quest.title}
                      </span>
                      <span className="mt-1 block text-sm text-stone-500">{quest.hint}</span>
                      <span className="mt-3 flex gap-2">
                        <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase", category.className)}>
                          {category.label}
                        </span>
                        <span className="rounded bg-stone-50 px-2 py-1 text-[9px] font-bold text-stone-500 uppercase">
                          +{questXp(quest)} XP
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {allDone && (
            <p className="mt-6 text-center font-hand text-2xl text-terracotta" role="status">
              All done for today. Go put your feet up, love.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-taupe/15 bg-white px-4 py-2 text-xs font-bold text-stone-600">
      {icon}
      {children}
    </span>
  );
}

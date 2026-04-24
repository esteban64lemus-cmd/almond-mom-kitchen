"use client";

import { useState, useMemo } from "react";
import { Zap, Coffee } from "lucide-react";

const MOCK_LOGS = [
  { date: new Date(), level: 8, sleep: 7.5 },
  { date: new Date(Date.now() - 86400000), level: 6, sleep: 6.0 },
  { date: new Date(Date.now() - 172800000), level: 7, sleep: 8.0 },
];

export default function EnergyTracker() {
  const [energyLevel, setEnergyLevel] = useState(5);

  const logs = useMemo(() => MOCK_LOGS, []);

  return (
    <div className="animate-in fade-in space-y-8 duration-500">
      <h2 className="text-center font-serif text-3xl italic">Energy Log</h2>
      <div className="space-y-10 rounded-[3rem] border border-stone-100 bg-white p-8 shadow-sm">
        <div className="space-y-6">
          <label className="block text-center text-[10px] font-bold tracking-widest text-stone-400 uppercase">
            Energy Today
          </label>
          <div className="flex items-center justify-between px-2">
            {[1, 2, 3, 4, 5, 6, 7].map((val) => (
              <button
                key={val}
                onClick={() => setEnergyLevel(val)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  val === energyLevel
                    ? "scale-125 bg-stone-900 text-white shadow-lg"
                    : "text-stone-300 hover:text-stone-500"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-stone-100 bg-stone-50 text-stone-400">
            {energyLevel >= 5 ? <Zap className="text-amber-500" /> : <Coffee />}
          </div>
        </div>

        <button className="w-full rounded-full bg-stone-900 py-5 text-xs font-bold tracking-widest text-white uppercase shadow-xl shadow-stone-200 transition-all hover:bg-stone-800">
          Log Ritual
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="ml-2 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
          Recent Cycles
        </h3>
        <div className="space-y-3">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-3xl border border-stone-50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-400">
                  {log.level >= 7 ? (
                    <Zap size={16} className="text-amber-500" />
                  ) : (
                    <Coffee size={16} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {log.date.toLocaleDateString("en-US", { weekday: "long" })}
                  </p>
                  <p className="text-[10px] font-bold tracking-tighter text-stone-400 uppercase">
                    {log.sleep}h Sleep
                  </p>
                </div>
              </div>
              <span className="font-serif text-lg text-stone-800 italic">
                {log.level}/10
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

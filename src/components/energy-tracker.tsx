'use client'

import { useState, useMemo } from 'react';
import { Zap, Coffee } from 'lucide-react';

const MOCK_LOGS = [
  { date: new Date(), level: 8, sleep: 7.5 },
  { date: new Date(Date.now() - 86400000), level: 6, sleep: 6.0 },
  { date: new Date(Date.now() - 172800000), level: 7, sleep: 8.0 },
];

export default function EnergyTracker() {
  const [energyLevel, setEnergyLevel] = useState(5);

  const logs = useMemo(() => MOCK_LOGS, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-serif italic text-center">Energy Log</h2>
      <div className="bg-white border border-stone-100 p-8 rounded-[3rem] space-y-10 shadow-sm">
        <div className="space-y-6">
          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block text-center">Energy Today</label>
          <div className="flex justify-between items-center px-2">
            {[1, 2, 3, 4, 5, 6, 7].map(val => (
              <button 
                key={val} 
                onClick={() => setEnergyLevel(val)}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                  val === energyLevel 
                    ? 'bg-stone-900 text-white scale-125 shadow-lg' 
                    : 'text-stone-300 hover:text-stone-500'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 border border-stone-100">
            {energyLevel >= 5 ? <Zap className="text-amber-500" /> : <Coffee />}
          </div>
        </div>

        <button className="w-full bg-stone-900 text-white py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl shadow-stone-200">
          Log Ritual
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-2">Recent Cycles</h3>
        <div className="space-y-3">
          {logs.map((log, idx) => (
            <div key={idx} className="bg-white border border-stone-50 p-4 rounded-3xl flex justify-between items-center shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                  {log.level >= 7 ? <Zap size={16} className="text-amber-500" /> : <Coffee size={16} />}
                </div>
                <div>
                  <p className="font-bold text-sm">{log.date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-tighter">{log.sleep}h Sleep</p>
                </div>
              </div>
              <span className="text-lg font-serif italic text-stone-800">{log.level}/10</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

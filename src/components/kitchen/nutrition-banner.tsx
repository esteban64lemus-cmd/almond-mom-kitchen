"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import {
  DAY_BUDGET,
  formatMacro,
  remainingMacros,
  type Macros,
} from "@/lib/kitchen";

function CountUp({ value, animate }: { value: number; animate: boolean }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!animate || reduce) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 200);
      setShown(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, reduce, value]);

  return <>{formatMacro(shown)}</>;
}

export function NutritionBanner({ today }: { today: Macros }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hasFlipped, setHasFlipped] = useState(false);
  function show(next: number) {
    setIndex(next);
    setHasFlipped(true);
  }
  const remaining = remainingMacros(today);
  const slides = [
    {
      eyebrow: "Today's Plate",
      macros: today,
      hint: "Meals in view",
    },
    {
      eyebrow: "Remaining",
      macros: remaining,
      hint: `${formatMacro(DAY_BUDGET.kcal)} kcal day`,
    },
  ];
  const slide = slides[index];

  return (
    <div className="relative">
      <motion.div
        drag={reduce ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -48) show(1);
          else if (info.offset.x > 48) show(0);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.eyebrow}
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[32px] border border-border bg-coral-soft p-5 shadow-[0_12px_28px_rgba(61,41,20,0.06)]"
          >
            <div className="mb-4 flex items-start justify-between">
              <p className="text-[11px] font-bold tracking-widest text-coral-strong uppercase">
                {slide.eyebrow}
              </p>
              <Flame className="text-coral-strong" size={22} />
            </div>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold tracking-tight">
                <CountUp
                  key={`${slide.eyebrow}-${slide.macros.kcal}`}
                  value={slide.macros.kcal}
                  animate={hasFlipped}
                />
              </span>
              <span className="text-sm font-bold text-muted-foreground uppercase">kcal</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-protein/20 px-3 py-1.5 text-[11px] font-bold text-success">
                  P {slide.macros.protein}g
                </span>
                <span className="rounded-full bg-carbs/20 px-3 py-1.5 text-[11px] font-bold text-[#A66D00]">
                  C {slide.macros.carbs}g
                </span>
                <span className="rounded-full bg-fat/20 px-3 py-1.5 text-[11px] font-bold text-[#2C66D8]">
                  F {slide.macros.fat}g
                </span>
              </div>
              <div className="flex gap-1" aria-hidden>
                {slides.map((item, dot) => (
                  <span
                    key={item.eyebrow}
                    className={`size-1.5 rounded-full ${dot === index ? "bg-coral-strong" : "bg-coral-strong/20"}`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[11px] font-medium text-muted-foreground">{slide.hint}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="mt-2 flex items-center justify-center gap-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        <button type="button" aria-label="Show today's plate" onClick={() => show(0)}>
          <ChevronLeft size={14} />
        </button>
        swipe
        <button type="button" aria-label="Show remaining" onClick={() => show(1)}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SwipeRow({
  onHave,
  onRemove,
  faded = false,
  children,
}: {
  onHave: () => void;
  onRemove?: () => void;
  faded?: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative rounded-[28px] ${faded ? "opacity-45" : ""}`}>
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
        aria-hidden
      >
        <div className="absolute inset-0 flex items-center bg-success px-5 text-sm font-bold text-white">
          Have it
        </div>
        {onRemove ? (
          <div className="absolute inset-0 flex items-center justify-end bg-destructive px-5 text-sm font-bold text-white">
            Remove
          </div>
        ) : null}
      </div>
      <motion.div
        drag={reduce ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x > 72) onHave();
          else if (info.offset.x < -72 && onRemove) onRemove();
        }}
        className="relative rounded-[28px] border border-border bg-white"
      >
        {children}
      </motion.div>
      {reduce ? (
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={onHave}
            className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-coral-strong"
          >
            Have it
          </button>
          {onRemove ? (
            <button
              type="button"
              onClick={onRemove}
              className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-destructive"
            >
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

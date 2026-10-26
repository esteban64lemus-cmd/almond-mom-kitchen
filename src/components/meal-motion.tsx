"use client";

import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const MEAL_EASE = [0.22, 1, 0.36, 1] as const;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type Phase = "rest" | "hover" | "open";

const SHIFT: Record<Phase, number> = { rest: 0, hover: 3, open: 6 };
const SCALE: Record<Phase, number> = { rest: 0.84, hover: 0.94, open: 1 };
const OPACITY: Record<Phase, number> = { rest: 0, hover: 0.55, open: 0.95 };

export function OpenSeam({ phase }: { phase: Phase }) {
  const reduced = useReducedMotion();
  const resolved: Phase = reduced ? "rest" : phase;
  const transition = {
    duration: reduced ? 0 : resolved === "hover" ? 0.24 : 0.55,
    ease: MEAL_EASE,
  };
  const shift = SHIFT[resolved];
  const scale = SCALE[resolved];
  const opacity = reduced ? 0 : OPACITY[resolved];
  const line = "pointer-events-none absolute bg-stone-800";

  return (
    <div className="pointer-events-none absolute -inset-2" aria-hidden="true">
      <motion.span
        className={`${line} top-2 right-5 left-5 h-px`}
        initial={false}
        animate={{ y: -shift, scaleX: scale, opacity }}
        transition={transition}
      />
      <motion.span
        className={`${line} right-5 bottom-2 left-5 h-px`}
        initial={false}
        animate={{ y: shift, scaleX: scale, opacity }}
        transition={transition}
      />
      <motion.span
        className={`${line} top-5 bottom-5 left-2 w-px`}
        initial={false}
        animate={{ x: -shift, scaleY: scale, opacity }}
        transition={transition}
      />
      <motion.span
        className={`${line} top-5 right-2 bottom-5 w-px`}
        initial={false}
        animate={{ x: shift, scaleY: scale, opacity }}
        transition={transition}
      />
    </div>
  );
}

export function FocusWash({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const isClient = useIsClient();
  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {active && !reduced ? (
        <motion.div
          key="meal-focus-wash"
          className="pointer-events-none fixed inset-0 z-[5] bg-stone-900/[0.16]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: MEAL_EASE }}
        />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

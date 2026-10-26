"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { MEAL_EASE, OpenSeam } from "@/components/meal-motion";
import { ShoppableIngredients } from "@/components/shoppable-ingredients";

export function MealBlock({
  title,
  panelId,
  lines,
  open: openProp,
  dimmed = false,
  onToggle,
  children,
}: {
  title: string;
  panelId: string;
  lines: string[];
  open?: boolean;
  dimmed?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const [internalOpen, setInternalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const controlled = onToggle !== undefined;
  const open = controlled ? Boolean(openProp) : internalOpen;
  const phase = open ? "open" : hovered ? "hover" : "rest";

  const toggle = () => {
    if (onToggle) onToggle();
    else setInternalOpen((value) => !value);
  };

  useEffect(() => {
    if (open && !wasOpen.current) {
      articleRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest",
      });
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !wasOpen.current) return;
      if (onToggle) onToggle();
      else setInternalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onToggle]);

  return (
    <motion.article
      ref={articleRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      initial={false}
      animate={{
        opacity: !reduced && dimmed ? 0.4 : 1,
        scale: !reduced && dimmed ? 0.985 : 1,
      }}
      transition={{ duration: reduced ? 0 : 0.5, ease: MEAL_EASE }}
      style={{ zIndex: open ? 10 : 0 }}
      className="group relative scroll-mt-24"
    >
      <OpenSeam phase={phase} />
      <motion.div
        initial={false}
        animate={{ scale: !reduced && open ? 1.012 : 1 }}
        transition={{ duration: reduced ? 0 : 0.62, ease: MEAL_EASE }}
        style={{ transformOrigin: "center top" }}
        className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-colors duration-500 ${
          open ? "border-transparent shadow-xl" : "border-stone-200"
        }`}
      >
        {children}
        <div className="px-5 pt-4 pb-5">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "Hide" : "Shop"} ingredients for ${title}`}
            onClick={toggle}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-[10px] font-bold tracking-[0.18em] text-white uppercase"
          >
            <ShoppingBag size={14} />
            {open ? "Hide ingredients" : "Shop ingredients"}
          </button>
          <motion.div
            className="grid"
            initial={false}
            animate={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            transition={{ duration: reduced ? 0 : 0.62, ease: MEAL_EASE }}
          >
            <div className="min-h-0 overflow-hidden" inert={!open} aria-hidden={!open}>
              <div id={panelId}>
                <ShoppableIngredients lines={lines} active={open} enter />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}

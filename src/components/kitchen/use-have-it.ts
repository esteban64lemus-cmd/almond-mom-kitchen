"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "almond-mom-have-it";
let snapshot: string[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (!loaded) {
    loaded = true;
    snapshot = readStorage();
  }
  return snapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: string[]) {
  snapshot = next;
  loaded = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Have-it still works in memory.
  }
  listeners.forEach((listener) => listener());
}

export function useHaveIt() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback((id: string) => {
    const current = getSnapshot();
    commit(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }, []);
  return { ids, has, toggle };
}

"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import {
  addCollection,
  EMPTY_SAVED,
  isSavedState,
  moveToCollection,
  toggleSaved,
  type Collection,
  type SavedState,
} from "@/lib/saved-state";

const STORAGE_KEY = "almond-mom-saved";

let snapshot: SavedState = EMPTY_SAVED;
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): SavedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SAVED;
    const parsed: unknown = JSON.parse(raw);
    return isSavedState(parsed) ? parsed : EMPTY_SAVED;
  } catch {
    return EMPTY_SAVED;
  }
}

function getSnapshot(): SavedState {
  if (!loaded) {
    loaded = true;
    snapshot = readStorage();
  }
  return snapshot;
}

function getServerSnapshot(): SavedState {
  return EMPTY_SAVED;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: SavedState) {
  snapshot = next;
  loaded = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Saved meals still work in memory if storage is blocked.
  }
  listeners.forEach((listener) => listener());
}

type SavedContextValue = {
  ids: string[];
  collections: Collection[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
  createCollection: (name: string) => void;
  moveTo: (recipeId: string, collectionId: string) => void;
};

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<SavedContextValue>(
    () => ({
      ids: state.ids,
      collections: state.collections,
      isSaved: (id) => state.ids.includes(id),
      toggle: (id) => commit(toggleSaved(getSnapshot(), id)),
      createCollection: (name) => commit(addCollection(getSnapshot(), name)),
      moveTo: (recipeId, collectionId) =>
        commit(moveToCollection(getSnapshot(), recipeId, collectionId)),
    }),
    [state],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const saved = useContext(SavedContext);
  if (!saved) throw new Error("useSaved must be used within SavedProvider");
  return saved;
}

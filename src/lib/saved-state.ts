export type Collection = {
  id: string;
  name: string;
  recipeIds: string[];
};

export type SavedState = {
  ids: string[];
  collections: Collection[];
};

export const EMPTY_SAVED: SavedState = { ids: [], collections: [] };

export function isSavedState(value: unknown): value is SavedState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  if (!Array.isArray(state.ids) || !state.ids.every((id) => typeof id === "string")) return false;
  if (!Array.isArray(state.collections)) return false;
  return state.collections.every((collection) => {
    if (!collection || typeof collection !== "object") return false;
    const row = collection as Record<string, unknown>;
    return (
      typeof row.id === "string" &&
      typeof row.name === "string" &&
      Array.isArray(row.recipeIds) &&
      row.recipeIds.every((id) => typeof id === "string")
    );
  });
}

export function toggleSaved(state: SavedState, recipeId: string): SavedState {
  if (!recipeId) return state;
  const saved = state.ids.includes(recipeId);
  return {
    ids: saved ? state.ids.filter((id) => id !== recipeId) : [...state.ids, recipeId],
    collections: state.collections.map((collection) => ({
      ...collection,
      recipeIds: saved
        ? collection.recipeIds.filter((id) => id !== recipeId)
        : collection.recipeIds,
    })),
  };
}

export function addCollection(state: SavedState, name: string): SavedState {
  const trimmed = name.trim();
  if (!trimmed) return state;
  const id = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!id || state.collections.some((collection) => collection.id === id)) return state;
  return {
    ...state,
    collections: [...state.collections, { id, name: trimmed, recipeIds: [] }],
  };
}

export function moveToCollection(
  state: SavedState,
  recipeId: string,
  collectionId: string,
): SavedState {
  if (!state.ids.includes(recipeId)) {
    state = { ...state, ids: [...state.ids, recipeId] };
  }
  return {
    ...state,
    collections: state.collections.map((collection) => {
      const without = collection.recipeIds.filter((id) => id !== recipeId);
      if (collection.id !== collectionId) return { ...collection, recipeIds: without };
      return { ...collection, recipeIds: [...without, recipeId] };
    }),
  };
}

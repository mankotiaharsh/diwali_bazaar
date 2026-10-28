import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_STYLES, isItemId, normalizeStyles, type ItemId, type StyleChoice, type StyledItemId } from "../data/items";

export interface ThaliState {
  items: ItemId[];
  styles: StyleChoice;
  note: string;
  from: string;
  to: string;
}

interface ThaliApi extends ThaliState {
  has: (id: ItemId) => boolean;
  toggle: (id: ItemId) => void;
  add: (id: ItemId) => void;
  /** Set the chosen designs; an empty list takes the item off the thali. */
  setStyles: (item: StyledItemId, styleIds: string[]) => void;
  setNote: (n: string) => void;
  setNames: (from: string, to: string) => void;
  reset: () => void;
}

const KEY = "diwali-thali:v1";
const EMPTY: ThaliState = { items: [], styles: DEFAULT_STYLES, note: "", from: "", to: "" };

// The basket lives only as long as the tab: it survives a refresh and the Cashfree redirect,
// but every new visit starts with an empty thali the visitor fills by their own choice.
function load(): ThaliState {
  try {
    localStorage.removeItem(KEY); // baskets saved long-term by earlier versions
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const saved = JSON.parse(raw);
    // Drop items that no longer exist on the shelf and fill in any new style defaults.
    return {
      ...EMPTY,
      ...saved,
      items: Array.isArray(saved.items) ? saved.items.filter(isItemId) : [],
      styles: normalizeStyles(saved.styles),
    };
  } catch {
    return EMPTY;
  }
}

const Ctx = createContext<ThaliApi | null>(null);

export function ThaliProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThaliState>(load);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [state]);

  const api = useMemo<ThaliApi>(
    () => ({
      ...state,
      has: (id) => state.items.includes(id),
      toggle: (id) =>
        setState((s) => ({
          ...s,
          items: s.items.includes(id) ? s.items.filter((x) => x !== id) : [...s.items, id],
        })),
      add: (id) => setState((s) => (s.items.includes(id) ? s : { ...s, items: [...s.items, id] })),
      setStyles: (item, styleIds) =>
        setState((s) =>
          styleIds.length
            ? { ...s, styles: { ...s.styles, [item]: styleIds }, items: s.items.includes(item) ? s.items : [...s.items, item] }
            : { ...s, items: s.items.filter((x) => x !== item) },
        ),
      setNote: (note) => setState((s) => ({ ...s, note })),
      setNames: (from, to) => setState((s) => ({ ...s, from, to })),
      reset: () => setState(EMPTY),
    }),
    [state],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useThali() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useThali must be used inside <ThaliProvider>");
  return v;
}

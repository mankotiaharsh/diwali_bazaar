import {
  NAME_MAX,
  NOTE_MAX,
  STYLED_ITEMS,
  isItemId,
  normalizeStyles,
  type ItemId,
  type StyleChoice,
} from "../data/items";

/** A thali as the backend stores it and the recipient sees it. */
export interface ThaliData {
  from: string;
  to: string;
  items: ItemId[];
  styles: Partial<StyleChoice>;
  note: string;
}

/** What gets sent to the backend: only the designs of items actually on the thali. */
export function toThaliData(t: { from: string; to: string; items: ItemId[]; styles: StyleChoice; note: string }): ThaliData {
  const styles = Object.fromEntries(STYLED_ITEMS.filter((id) => t.items.includes(id)).map((id) => [id, t.styles[id]]));
  return { from: t.from, to: t.to, items: t.items, styles, note: t.note };
}

/** Read a thali from the backend defensively: unknown items are dropped, missing designs get defaults. */
export function fromThaliData(raw: unknown): ThaliData & { styles: StyleChoice } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    from: String(r.from ?? "").slice(0, NAME_MAX),
    to: String(r.to ?? "").slice(0, NAME_MAX),
    items: Array.isArray(r.items) ? r.items.filter(isItemId) : [],
    styles: normalizeStyles(r.styles),
    note: String(r.note ?? "").slice(0, NOTE_MAX),
  };
}

/** Full shareable URL for a paid thali id. */
export const thaliUrl = (id: string) => `${window.location.origin}/t/${id}`;

import {
  NAME_MAX,
  NOTE_MAX,
  SHOP_ITEMS,
  STYLED_ITEMS,
  normalizeStyles,
  type ItemId,
  type StyleChoice,
} from "../data/items";

/** What travels inside the link. Short keys keep URLs small. */
interface Payload {
  f: string; // from (sender)
  t: string; // to (recipient)
  i: ItemId[];
  s: Partial<StyleChoice>; // chosen designs per item, e.g. { mithai: ["jalebi", "kaju-katli"] }
  n: string; // note
}

export interface SharedThali {
  from: string;
  to: string;
  items: ItemId[];
  styles: StyleChoice;
  note: string;
}

const VALID_IDS = new Set(SHOP_ITEMS.filter((i) => i.kind === "free").map((i) => i.id));

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeThali(t: SharedThali): string {
  // Only send styles for items actually on the thali.
  const s = Object.fromEntries(STYLED_ITEMS.filter((id) => t.items.includes(id)).map((id) => [id, t.styles[id]]));
  const p: Payload = { f: t.from, t: t.to, i: t.items, s, n: t.note };
  return toBase64Url(JSON.stringify(p));
}

export function decodeThali(code: string): SharedThali | null {
  try {
    const p = JSON.parse(fromBase64Url(code)) as Partial<Payload>;
    if (!p || !Array.isArray(p.i)) return null;
    return {
      from: String(p.f ?? "").slice(0, NAME_MAX),
      to: String(p.t ?? "").slice(0, NAME_MAX),
      items: p.i.filter((x): x is ItemId => VALID_IDS.has(x as ItemId)),
      styles: normalizeStyles(p.s),
      note: String(p.n ?? "").slice(0, NOTE_MAX),
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(t: SharedThali): string {
  return `${window.location.origin}/t/${encodeThali(t)}`;
}

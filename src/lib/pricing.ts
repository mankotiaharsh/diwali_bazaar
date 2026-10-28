import { ITEM_BY_ID, STYLE_OPTIONS, isStyled, itemLooks, type ItemId, type StyleChoice } from "../data/items";

/**
 * Whole-rupee prices from the backend (/api/config), keyed "item" or "item:design".
 * The backend is the source of truth and bills from its own list; these are for display.
 */
export type Prices = Record<string, number>;

export const priceOf = (prices: Prices | undefined, key: string) => prices?.[key] ?? 0;
export const priceLabel = (rupees: number) => (rupees === 0 ? "Free" : `₹${rupees.toLocaleString("en-IN")}`);

export interface BillLine {
  key: string;
  name: string;
  category: string;
  image: string;
  price: number;
}

/** One line per chosen item/design, in the order they were added — same keys the backend bills by. */
export function billFor(items: ItemId[], styles: StyleChoice, prices: Prices | undefined): BillLine[] {
  return items.flatMap((id) =>
    itemLooks(id, styles).map((look) => ({
      key: look.key,
      name: look.name,
      category: ITEM_BY_ID[id].name,
      image: look.image,
      price: priceOf(prices, look.key),
    })),
  );
}

export const billTotal = (lines: BillLine[]) => lines.reduce((sum, l) => sum + l.price, 0);

/** Shelf badge: "Free", "₹10", "Free options" when some designs are free, or "From ₹10". */
export function shelfBadge(id: ItemId, prices: Prices): string {
  if (!isStyled(id)) return priceLabel(priceOf(prices, id));
  const values = STYLE_OPTIONS[id].map((s) => priceOf(prices, `${id}:${s.id}`));
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return priceLabel(min);
  return min === 0 ? "Free options" : `From ₹${min}`;
}

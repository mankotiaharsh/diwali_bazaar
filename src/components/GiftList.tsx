import { useState } from "react";
import { ITEM_BY_ID, itemLooks, type ItemId, type StyleChoice } from "../data/items";

interface Props {
  items: ItemId[];
  styles: StyleChoice;
  from: string;
}

/** Gifts shown before "Show all". */
const PREVIEW = 5;

/** Everything on the thali, shown to the recipient as gifts — pictures and names, never prices. */
export function GiftList({ items, styles, from }: Props) {
  const [expanded, setExpanded] = useState(false);
  const gifts = items.flatMap((id) =>
    itemLooks(id, styles).map((look) => ({ ...look, category: ITEM_BY_ID[id].name })),
  );
  if (!gifts.length) return null;

  const shown = expanded ? gifts : gifts.slice(0, PREVIEW);

  return (
    <section className="gifts pop-in" aria-label="Your Diwali gifts">
      <h2>🪔 What's in your thali</h2>
      <p className="gifts-sub">🎁 {from} sent you {gifts.length === 1 ? "a Diwali gift" : `${gifts.length} Diwali gifts`}</p>
      <ul id="gift-list">
        {shown.map((g, i) => (
          // Newly revealed gifts pop in one after another too.
          <li key={g.key} style={{ animationDelay: `${0.15 + (i % PREVIEW) * 0.08}s` }}>
            <img src={g.image} alt="" />
            <span className="gift-name">{g.name}</span>
            {g.name !== g.category && <span className="gift-category">{g.category}</span>}
          </li>
        ))}
      </ul>
      {gifts.length > PREVIEW && (
        <button
          type="button"
          className="gifts-toggle"
          aria-expanded={expanded}
          aria-controls="gift-list"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less ▴" : `See all ${gifts.length} gifts ▾`}
        </button>
      )}
    </section>
  );
}

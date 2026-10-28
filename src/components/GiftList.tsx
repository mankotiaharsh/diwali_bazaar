import { ITEM_BY_ID, itemLooks, type ItemId, type StyleChoice } from "../data/items";

interface Props {
  items: ItemId[];
  styles: StyleChoice;
  from: string;
}

/** Everything on the thali, shown to the recipient as gifts — pictures and names, never prices. */
export function GiftList({ items, styles, from }: Props) {
  const gifts = items.flatMap((id) =>
    itemLooks(id, styles).map((look) => ({ ...look, category: ITEM_BY_ID[id].name })),
  );
  if (!gifts.length) return null;

  return (
    <section className="gifts pop-in" aria-label="Your Diwali gifts">
      <h2>🪔 What's in your thali</h2>
      <p className="gifts-sub">🎁 {from} sent you {gifts.length === 1 ? "a Diwali gift" : `${gifts.length} Diwali gifts`}</p>
      <ul>
        {gifts.map((g, i) => (
          <li key={g.key} style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
            <img src={g.image} alt="" />
            <span className="gift-name">{g.name}</span>
            {g.name !== g.category && <span className="gift-category">{g.category}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

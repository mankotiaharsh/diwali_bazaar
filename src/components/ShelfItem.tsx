import type { ShopItem } from "../data/items";

interface Props {
  item: ShopItem;
  image?: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}

const BADGE: Record<ShopItem["kind"], string> = { free: "Free", soon: "Soon", note: "Note" };

export function ShelfItem({ item, image, selected, onClick, index }: Props) {
  return (
    <button
      className={`shelf-item kind-${item.kind}${selected ? " is-selected" : ""}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
      aria-pressed={item.kind === "free" ? selected : undefined}
      title={item.blurb}
    >
      <span className={`badge badge-${item.kind}`}>{BADGE[item.kind]}</span>
      {selected && <span className="tick" aria-hidden>✓</span>}
      <img src={image ?? item.image} alt="" draggable={false} />
      <span className="shelf-name">{item.name}</span>
    </button>
  );
}

import { useState } from "react";
import sceneImg from "../assets/shop-scene.svg";
import { SHOP_ITEMS, isStyled, itemLooks, type ItemId, type ShopItem, type StyledItemId } from "../data/items";
import { useThali } from "../state/ThaliContext";
import { ShelfItem } from "../components/ShelfItem";
import { BasketBar } from "../components/BasketBar";
import { StylePicker } from "../components/StylePicker";
import { NoteModal } from "../components/NoteModal";
import { Footer } from "../components/Footer";
import { useToast } from "../components/Toast";
import { BRAND } from "../config/brand";
import { countdownLabel } from "../lib/countdown";

export default function ShopPage() {
  const thali = useThali();
  const [picking, setPicking] = useState<StyledItemId | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const toast = useToast();

  const onPick = (item: ShopItem) => {
    if (item.kind === "soon") return toast.show(`${item.name} is coming soon ✨`);
    if (item.kind === "note") return setNoteOpen(true);
    if (isStyled(item.id)) return setPicking(item.id);
    const id = item.id as ItemId;
    thali.toggle(id);
    toast.show(thali.has(id) ? `${item.name} removed` : `${item.name} added to thali`);
  };

  return (
    <div className="page shop-page">
      <header className="scene">
        <img className="scene-bg" src={sceneImg} alt="A Diwali stall at night, lit with diyas, lanterns and fireworks" />
        <div className="scene-overlay">
          <div className="brand-mark">{BRAND.name}</div>
          <div className="countdown">{countdownLabel()}</div>
        </div>
      </header>

      <main className="counter">
        <div className="counter-top" aria-hidden />
        <div className="shelf">
          {SHOP_ITEMS.map((item, i) => (
            <ShelfItem
              key={item.id}
              index={i}
              item={item}
              image={item.kind === "free" && thali.has(item.id as ItemId) ? itemLooks(item.id as ItemId, thali.styles)[0].image : undefined}
              selected={item.id === "note" ? !!thali.note : item.kind === "free" && thali.has(item.id as ItemId)}
              onClick={() => onPick(item)}
            />
          ))}
        </div>
        <p className="tagline">{BRAND.tagline}</p>
        <Footer />
      </main>

      <BasketBar />
      <StylePicker itemId={picking} onClose={() => setPicking(null)} />
      <NoteModal open={noteOpen} onClose={() => setNoteOpen(false)} />
      {toast.node}
    </div>
  );
}

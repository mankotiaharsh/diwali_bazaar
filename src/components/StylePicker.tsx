import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ITEM_BY_ID, MULTI_PICK, STYLE_OPTIONS, type StyledItemId } from "../data/items";
import { useThali } from "../state/ThaliContext";
import { usePublicConfig } from "../lib/api";
import { priceLabel, priceOf } from "../lib/pricing";

interface Props {
  itemId: StyledItemId | null;
  onClose: () => void;
}

/**
 * Pick designs of an item and put them on the thali.
 * Single-pick items (diya) apply on tap; multi-pick items (mithai, patakhe) collect ticks until "Done".
 */
export function StylePicker({ itemId, onClose }: Props) {
  const { has, toggle, styles, setStyles } = useThali();
  const prices = usePublicConfig()?.item_prices;
  const [picked, setPicked] = useState<string[]>([]);
  const [focus, setFocus] = useState("");

  useEffect(() => {
    if (!itemId) return;
    const current = has(itemId) ? styles[itemId] : [];
    setPicked(current);
    setFocus(current[0] ?? "");
    // Only reset the draft when the picker opens.
  }, [itemId]);

  if (!itemId) return null;

  const options = STYLE_OPTIONS[itemId];
  const name = ITEM_BY_ID[itemId].name.toLowerCase();
  const multi = MULTI_PICK[itemId];
  const onPlate = has(itemId);
  const focused = options.find((s) => s.id === focus) ?? options[0];
  const pickedTotal = picked.reduce((sum, sid) => sum + priceOf(prices, `${itemId}:${sid}`), 0);

  const tap = (id: string) => {
    if (!multi) {
      setStyles(itemId, [id]);
      return onClose();
    }
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const done = () => {
    setStyles(itemId, picked);
    onClose();
  };

  return (
    <Modal open title={`Choose your ${name}`} onClose={onClose}>
      <p className="style-blurb">{focused.blurb}</p>
      {multi && <p className="style-hint">Pick as many as you like</p>}
      <div className={`style-grid${options.length > 3 ? " is-wide" : ""}`}>
        {options.map((s) => {
          const selected = multi ? picked.includes(s.id) : onPlate && styles[itemId][0] === s.id;
          return (
            <button
              key={s.id}
              className={`style-option${selected ? " is-selected" : ""}`}
              aria-pressed={multi ? selected : undefined}
              onClick={() => tap(s.id)}
              onMouseEnter={() => setFocus(s.id)}
              onFocus={() => setFocus(s.id)}
            >
              {selected && multi && <span className="tick" aria-hidden>✓</span>}
              <img src={s.image} alt="" />
              <span className="style-name">{s.name}</span>
              <span className={`style-price${priceOf(prices, `${itemId}:${s.id}`) ? " is-paid" : ""}`}>
                {priceLabel(priceOf(prices, `${itemId}:${s.id}`))}
              </span>
            </button>
          );
        })}
      </div>
      {multi ? (
        <button className="btn btn-primary full" onClick={done} disabled={!picked.length && !onPlate}>
          {picked.length
            ? `Add ${picked.length} to thali${pickedTotal ? ` · ₹${pickedTotal}` : ""}`
            : onPlate ? `Remove ${name} from thali` : `Pick at least one ${name}`}
        </button>
      ) : (
        onPlate && (
          <button className="btn btn-ghost full" onClick={() => { toggle(itemId); onClose(); }}>
            Remove {name} from thali
          </button>
        )
      )}
    </Modal>
  );
}

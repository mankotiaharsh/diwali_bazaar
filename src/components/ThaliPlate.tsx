import thaliImg from "../assets/thali.svg";
import { getStyle, itemLooks, type ItemId, type StyleChoice } from "../data/items";

interface Props {
  items: ItemId[];
  styles: StyleChoice;
  /** Play the "items land on the plate" animation. */
  animate?: boolean;
}

/** A brass pooja thali with the diya in the centre and everything else arranged around it. */
export function ThaliPlate({ items, styles, animate = false }: Props) {
  const ring = items.filter((i) => i !== "diya");
  const hasDiya = items.includes("diya");
  const slots = Math.max(ring.length, 1);
  // Shrink items as the ring fills up so they don't overlap.
  const size = ring.length > 6 ? 21 : 26;
  const diya = getStyle("diya", styles.diya[0]);
  let landed = 0;

  return (
    <div className={`thali${animate ? " thali-animate" : ""}${hasDiya ? " is-lit" : ""}`}>
      <img className="thali-base" src={thaliImg} alt="Brass pooja thali" />

      {ring.flatMap((id, i) => {
        const angle = (i / slots) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 31;
        const y = 50 + Math.sin(angle) * 31;
        const looks = itemLooks(id, styles);
        // Several sweets or crackers share one spot: shrink them and fan them out around it.
        const n = looks.length;
        const w = n === 1 ? size : size * (n === 2 ? 0.72 : 0.6);
        const spread = n === 1 ? 0 : size * 0.3;
        return looks.map((look, j) => {
          const a = (j / n) * 2 * Math.PI - Math.PI / 2;
          return (
            <img
              key={look.key}
              className="thali-item"
              src={look.image}
              alt={look.name}
              style={{
                left: `${x + Math.cos(a) * spread}%`,
                top: `${y + Math.sin(a) * spread}%`,
                width: `${w}%`,
                animationDelay: animate ? `${0.4 + landed++ * 0.18}s` : "0s",
              }}
            />
          );
        });
      })}

      {hasDiya && (
        <img
          className="thali-diya"
          src={diya.image}
          alt={`Diya — ${diya.name}`}
          style={{ animationDelay: animate ? `${0.5 + landed * 0.18}s` : "0s" }}
        />
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { useThali } from "../state/ThaliContext";
import { itemLooks } from "../data/items";

export function BasketBar() {
  const { items, styles, note } = useThali();
  const count = items.reduce((n, id) => n + itemLooks(id, styles).length, 0) + (note.trim() ? 1 : 0);
  const empty = items.length === 0;

  return (
    <div className="basket-bar">
      <div className="basket-info">
        <span className="basket-icon" aria-hidden>🧺</span>
        <span>
          Basket · <strong>{count}</strong> {count === 1 ? "item" : "items"}
        </span>
      </div>
      {empty ? (
        <span className="btn btn-primary is-disabled" aria-disabled>
          Add something to your thali
        </span>
      ) : (
        <Link to="/review" className="btn btn-primary">
          Review your Thali →
        </Link>
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { decodeThali } from "../lib/shareLink";
import { ThaliPlate } from "../components/ThaliPlate";
import { BRAND } from "../config/brand";
import { Footer } from "../components/Footer";

const FIREWORK_COLORS = ["#fde047", "#f472b6", "#67e8f9", "#fb923c", "#a78bfa", "#4ade80"];

/** What the recipient sees when they open the link. */
export default function OpenThaliPage() {
  const { code = "" } = useParams();
  const thali = useMemo(() => decodeThali(code), [code]);
  const [opened, setOpened] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    if (!opened || !thali) return;
    const delay = 900 + thali.items.length * 260;
    const id = window.setTimeout(() => setShowNote(true), delay);
    return () => window.clearTimeout(id);
  }, [opened, thali]);

  if (!thali || thali.items.length === 0) {
    return (
      <div className="page open-page">
        <div className="envelope-card">
          <h1 className="title">Hmm, this thali link looks broken</h1>
          <p>Ask whoever sent it to share it again, or make one of your own.</p>
          <Link to="/" className="btn btn-primary">Make a thali</Link>
        </div>
      </div>
    );
  }

  const from = thali.from || "Someone special";
  const to = thali.to || "you";

  return (
    <div className="page open-page">
      {!opened ? (
        <div className="envelope-card pop-in">
          <div className="envelope" aria-hidden>
            <div className="seal">🪔</div>
          </div>
          <p className="kicker">Dear {to},</p>
          <h1 className="title">{from} sent you a Diwali thali</h1>
          <button className="btn btn-primary big" onClick={() => setOpened(true)}>
            Open your thali
          </button>
        </div>
      ) : (
        <div className="reveal">
          <p className="kicker">Happy Diwali, {to}!</p>
          <ThaliPlate items={thali.items} styles={thali.styles} animate />
          {showNote && (
            <div className="note-card pop-in">
              {thali.note && <p>“{thali.note}”</p>}
              <p className="sign">— with love, {from}</p>
            </div>
          )}
          {showNote && (
            <Link to="/" className="btn btn-ghost pop-in">
              Send a thali with {BRAND.name} →
            </Link>
          )}
          <div className="sky" aria-hidden>
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="firework"
                style={{
                  left: `${8 + ((i * 37) % 84)}%`,
                  top: `${6 + ((i * 23) % 38)}%`,
                  color: FIREWORK_COLORS[i % FIREWORK_COLORS.length],
                  animationDelay: `${(i * 0.7) % 3.5}s`,
                }}
              />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={`s${i}`} className="spark" style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i % 6) * 0.6}s`, animationDuration: `${5 + (i % 4)}s` }} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

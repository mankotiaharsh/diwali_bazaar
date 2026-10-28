import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRemoteThali } from "../lib/useRemoteThali";
import happyUrl from "../assets/sounds/happy.mp3";
import { ThaliPlate } from "../components/ThaliPlate";
import { GiftList } from "../components/GiftList";
import { BRAND } from "../config/brand";
import { Footer } from "../components/Footer";

const FIREWORK_COLORS = ["#fde047", "#f472b6", "#67e8f9", "#fb923c", "#a78bfa", "#4ade80"];

/** What the recipient sees when they open the link. */
export default function OpenThaliPage() {
  const { id = "" } = useParams();
  const remote = useRemoteThali(id);
  const thali = remote.state === "ok" ? remote.thali : null;
  const [opened, setOpened] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const music = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  // Background music loops while the thali is open; stop it when the visitor leaves the page.
  useEffect(() => () => music.current?.pause(), []);

  const open = () => {
    setOpened(true);
    // Started from the tap, so browsers allow it to play.
    music.current ??= Object.assign(new Audio(happyUrl), { loop: true, volume: 0.5 });
    void music.current.play().catch(() => {});
  };

  const toggleMusic = () => {
    const audio = music.current;
    if (!audio) return;
    audio.muted = !muted;
    if (audio.paused) void audio.play().catch(() => {});
    setMuted(!muted);
  };

  useEffect(() => {
    if (!opened || !thali) return;
    const delay = 900 + thali.items.length * 260;
    const id = window.setTimeout(() => setShowNote(true), delay);
    return () => window.clearTimeout(id);
  }, [opened, thali]);

  if (remote.state === "loading") {
    return (
      <div className="page open-page">
        <div className="envelope-card">
          <div className="envelope" aria-hidden><div className="seal">🪔</div></div>
          <p className="kicker">Opening your thali…</p>
          {remote.slow && <p className="slow-hint">Lighting the diyas — this can take up to a minute the first time. Please keep this page open.</p>}
        </div>
      </div>
    );
  }

  if (remote.state === "error") {
    return (
      <div className="page open-page">
        <div className="envelope-card">
          <h1 className="title">Couldn't open this thali</h1>
          <p>{remote.message}</p>
          <button className="btn btn-primary" onClick={remote.retry}>Try again</button>
        </div>
      </div>
    );
  }

  if (!thali) {
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
          <button className="btn btn-primary big" onClick={open}>
            Open your thali
          </button>
        </div>
      ) : (
        <div className="reveal">
          <button
            className="music-toggle"
            onClick={toggleMusic}
            aria-label={muted ? "Play music" : "Mute music"}
            title={muted ? "Play music" : "Mute music"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <p className="kicker">Happy Diwali, {to}!</p>
          <ThaliPlate items={thali.items} styles={thali.styles} animate />
          {showNote && (
            <div className="note-card pop-in">
              {thali.note && <p>“{thali.note}”</p>}
              <p className="sign">— with love, {from}</p>
            </div>
          )}
          {showNote && <GiftList items={thali.items} styles={thali.styles} from={from} />}
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

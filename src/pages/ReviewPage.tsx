import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useThali } from "../state/ThaliContext";
import { ThaliPlate } from "../components/ThaliPlate";
import { ITEM_BY_ID, NAME_MAX, isStyled, itemLooks } from "../data/items";
import { buildShareUrl } from "../lib/shareLink";
import { useToast } from "../components/Toast";
import { Footer } from "../components/Footer";
import { NoteModal } from "../components/NoteModal";

export default function ReviewPage() {
  const t = useThali();
  const [from, setFrom] = useState(t.from);
  const [to, setTo] = useState(t.to);
  const [link, setLink] = useState<string | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const toast = useToast();

  const ready = from.trim().length > 0 && to.trim().length > 0;
  const shareText = useMemo(
    () => (link ? `${from.trim()} sent you a Diwali thali 🪔 Open it here: ${link}` : ""),
    [link, from],
  );

  // The note travels inside the link, so a new note needs a new link.
  useEffect(() => setLink(null), [t.note]);

  if (t.items.length === 0) return <Navigate to="/" replace />;

  const create = () => {
    t.setNames(from.trim(), to.trim());
    setLink(
      buildShareUrl({ from: from.trim(), to: to.trim(), items: t.items, styles: t.styles, note: t.note }),
    );
  };

  const copy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      toast.show("Link copied!");
    } catch {
      toast.show("Couldn't copy — long-press the link instead");
    }
  };

  const nativeShare = async () => {
    if (!link) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: "A Diwali thali for you", text: shareText, url: link });
      } catch {
        /* user cancelled */
      }
    } else copy();
  };

  return (
    <div className="page review-page">
      <div className="review-wrap">
        <Link to="/" className="back">← Back to the shop</Link>
        <h1 className="title">Your Diwali Thali</h1>

        <ThaliPlate items={t.items} styles={t.styles} />

        <ul className="contents">
          {t.items.map((id) => {
            const looks = itemLooks(id, t.styles);
            return (
              <li key={id}>
                <div className="contents-imgs">
                  {looks.map((l) => <img key={l.key} src={l.image} alt="" />)}
                </div>
                <span>{isStyled(id) ? `${ITEM_BY_ID[id].name} · ${looks.map((l) => l.name).join(", ")}` : ITEM_BY_ID[id].name}</span>
                <button className="icon-btn" aria-label={`Remove ${ITEM_BY_ID[id].name}`} onClick={() => { t.toggle(id); setLink(null); }}>×</button>
              </li>
            );
          })}
        </ul>

        {t.note ? (
          <div className="note-card note-edit">
            <p>“{t.note}”</p>
            <button className="add-note" onClick={() => setNoteOpen(true)}>Edit note</button>
          </div>
        ) : (
          <button className="add-note" onClick={() => setNoteOpen(true)}>+ Add a note</button>
        )}

        <div className="card form">
          <label>
            Your name
            <input value={from} maxLength={NAME_MAX} placeholder="e.g. Priya" onChange={(e) => { setFrom(e.target.value); setLink(null); }} />
          </label>
          <label>
            Who's it for?
            <input value={to} maxLength={NAME_MAX} placeholder="e.g. Maa, Rohan, the Sharma family" onChange={(e) => { setTo(e.target.value); setLink(null); }} />
          </label>

          {!link ? (
            <button className="btn btn-primary full" disabled={!ready} onClick={create}>
              Create thali link 🪔
            </button>
          ) : (
            <div className="share">
              <div className="link-box">{link}</div>
              <div className="share-row">
                <button className="btn btn-primary" onClick={copy}>Copy link</button>
                <a className="btn btn-whatsapp" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <button className="btn btn-ghost" onClick={nativeShare}>Share…</button>
              </div>
              <a className="preview-link" href={link} target="_blank" rel="noreferrer">Preview what {to.trim()} will see ↗</a>
            </div>
          )}
        </div>

        <button className="btn btn-ghost full" onClick={() => { if (confirm("Start a new thali?")) t.reset(); }}>
          Start over
        </button>
        <Footer />
      </div>
      <NoteModal open={noteOpen} onClose={() => setNoteOpen(false)} />
      {toast.node}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { NOTE_MAX } from "../data/items";
import { useThali } from "../state/ThaliContext";

const SUGGESTIONS = [
  "May this Diwali light up your home with joy and prosperity. 🪔",
  "Miles apart this year, but sending you all my light and love.",
  "Save me some kaju katli! Happy Diwali! 😄",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NoteModal({ open, onClose }: Props) {
  const { note, setNote } = useThali();
  const [draft, setDraft] = useState(note);

  useEffect(() => {
    if (open) setDraft(note);
  }, [open, note]);

  const save = () => {
    setNote(draft.trim());
    onClose();
  };

  return (
    <Modal open={open} title="Write a note" onClose={onClose}>
      <textarea
        className="note-input"
        value={draft}
        maxLength={NOTE_MAX}
        placeholder="Wishing you a Diwali full of…"
        rows={6}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
      />
      <div className="note-meta">{draft.length}/{NOTE_MAX}</div>
      <div className="chips">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="chip" onClick={() => setDraft(s)}>{s}</button>
        ))}
      </div>
      <button className="btn btn-primary full" onClick={save}>
        {draft.trim() ? "Tuck note into thali" : "Save without a note"}
      </button>
    </Modal>
  );
}

import { useToast } from "./Toast";

interface Props {
  url: string;
  from: string;
  to: string;
}

/** Copy / WhatsApp / native share for a paid thali link. */
export function SharePanel({ url, from, to }: Props) {
  const toast = useToast();
  const shareText = `${from} sent you a Diwali thali 🪔 Open it here: ${url}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.show("Link copied!");
    } catch {
      toast.show("Couldn't copy — long-press the link instead");
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return copy();
    try {
      await navigator.share({ title: "A Diwali thali for you", text: shareText, url });
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="share">
      <div className="link-box">{url}</div>
      <div className="share-row">
        <button className="btn btn-primary" onClick={copy}>Copy link</button>
        <a className="btn btn-whatsapp" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <button className="btn btn-ghost" onClick={nativeShare}>Share…</button>
      </div>
      <a className="preview-link" href={url} target="_blank" rel="noreferrer">Preview what {to} will see ↗</a>
      {toast.node}
    </div>
  );
}

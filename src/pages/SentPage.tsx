import { Link, useParams } from "react-router-dom";
import { ThaliPlate } from "../components/ThaliPlate";
import { SharePanel } from "../components/SharePanel";
import { Footer } from "../components/Footer";
import { thaliUrl } from "../lib/thali";
import { useRemoteThali } from "../lib/useRemoteThali";
import { usePublicConfig } from "../lib/api";

/** After a successful payment: the thali is live, here's the link to send. Safe to refresh or revisit. */
export default function SentPage() {
  const { id = "" } = useParams();
  const remote = useRemoteThali(id);
  const config = usePublicConfig();

  return (
    <div className="page review-page">
      <div className="review-wrap">
        {remote.state === "loading" && <p className="status-msg">Loading your thali…</p>}

        {remote.state === "notfound" && (
          <div className="card status-card">
            <h1 className="title">Thali not found</h1>
            <p>This thali doesn't exist or its payment wasn't completed.</p>
            <Link to="/" className="btn btn-primary">Make a thali</Link>
          </div>
        )}

        {remote.state === "error" && (
          <div className="card status-card">
            <p>{remote.message}</p>
            <button className="btn btn-primary" onClick={remote.retry}>Try again</button>
          </div>
        )}

        {remote.state === "ok" && (
          <>
            <p className="paid-badge">✓ Shagun paid</p>
            <h1 className="title">Your thali for {remote.thali.to} is ready!</h1>
            <ThaliPlate items={remote.thali.items} styles={remote.thali.styles} />
            <div className="card form">
              <p className="sent-lead">Send this link to {remote.thali.to}. Anyone with the link can open the thali.</p>
              <SharePanel url={thaliUrl(id)} from={remote.thali.from} to={remote.thali.to} />
            </div>
            {config?.receipts_enabled && (
              <p className="receipt-note">📧 Your receipt and invoice are on their way to your email.</p>
            )}
            <Link to="/" className="btn btn-ghost full">Make another thali</Link>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

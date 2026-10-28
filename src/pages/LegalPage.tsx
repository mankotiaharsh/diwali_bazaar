import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";
import { Footer } from "../components/Footer";

// Starter text only — have a lawyer review before you launch.
const CONTENT = {
  terms: {
    title: "Terms & Conditions",
    body: [
      `${BRAND.name} lets you build a digital Diwali thali and share it as a link. It is free to use.`,
      "A thali is a digital Diwali greeting only. No physical goods are shipped.",
      "You're responsible for the names and messages you write. Don't use the service to send anything abusive, unlawful or that impersonates someone else.",
      "Anyone who has a thali link can open it, so only share it with the people you mean to.",
      "We may change or pause the service at any time. The service is provided as-is, without warranties.",
      `Questions? Write to ${BRAND.contactEmail}.`,
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We don't require an account and we don't store your thali on our servers.",
      "Your names, chosen items and note are packed into the link itself. Anyone with the link can read them.",
      "While you build a thali, your progress is saved in your own browser's local storage so it isn't lost on refresh. Clear your browser data to remove it.",
      "Our hosting provider may keep standard server logs (such as IP address and time of visit) for security.",
      `For any privacy request, contact ${BRAND.contactEmail}.`,
    ],
  },
};

export default function LegalPage({ kind }: { kind: keyof typeof CONTENT }) {
  const c = CONTENT[kind];
  return (
    <div className="page legal-page">
      <div className="review-wrap">
        <Link to="/" className="back">← Back to the shop</Link>
        <h1 className="title">{c.title}</h1>
        <div className="card">
          {c.body.map((p) => <p key={p}>{p}</p>)}
        </div>
        <Footer />
      </div>
    </div>
  );
}

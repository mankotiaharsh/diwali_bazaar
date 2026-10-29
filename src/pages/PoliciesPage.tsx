import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

const POLICIES = [
  { to: "/terms", title: "Terms & Conditions", blurb: "The rules for using Diwali Bazaar and making payments." },
  { to: "/privacy", title: "Privacy Policy", blurb: "What we store, why, and how to ask us to delete it." },
  { to: "/refund", title: "Refund & Cancellation Policy", blurb: "When and how you get your money back." },
  { to: "/contact", title: "Contact Us", blurb: "Questions, payment problems or taking a thali down." },
];

/** One place that links every policy, so they stay easy to find from the footer. */
export default function PoliciesPage() {
  return (
    <div className="page legal-page">
      <div className="review-wrap">
        <Link to="/" className="back">← Back to the shop</Link>
        <h1 className="title">Policies</h1>
        <ul className="policy-list">
          {POLICIES.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className="card policy-link">
                <strong>{p.title}</strong>
                <span>{p.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </div>
  );
}

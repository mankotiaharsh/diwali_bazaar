import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";

export function Footer() {
  return (
    <footer className="footer">
      {/* One link keeps the footer clean; /policies lists Terms, Privacy, Refund and Contact. */}
      <Link to="/policies">Policies</Link>
      <span>·</span>
      <span>© {new Date().getFullYear()} {BRAND.name}</span>
    </footer>
  );
}

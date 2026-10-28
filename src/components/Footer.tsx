import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";

export function Footer() {
  return (
    <footer className="footer">
      <Link to="/terms">Terms &amp; Conditions</Link>
      <span>·</span>
      <Link to="/privacy">Privacy Policy</Link>
      <span>·</span>
      <span>© {new Date().getFullYear()} {BRAND.name}</span>
    </footer>
  );
}

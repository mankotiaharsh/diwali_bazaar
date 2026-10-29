import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Every page change starts at the top (the browser otherwise keeps the old scroll position). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

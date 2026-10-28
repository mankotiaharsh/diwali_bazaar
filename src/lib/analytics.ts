/**
 * Thali links work like keys (anyone with /t/<id> can open that thali), so analytics only ever
 * sees the route pattern, never the real id or order query string.
 */
export function maskUrl(url: string): string {
  try {
    const u = new URL(url);
    u.pathname = u.pathname.replace(/^\/(t|sent)\/[^/]+/, "/$1/[id]");
    u.search = "";
    return u.toString();
  } catch {
    return url;
  }
}

export const maskEvent = <T extends { url: string }>(event: T): T => ({ ...event, url: maskUrl(event.url) });

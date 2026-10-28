import { BRAND } from "../config/brand";

/** Whole days from today until Diwali (local time). */
export function daysUntilDiwali(now = new Date()): number {
  const [y, m, d] = BRAND.diwaliDate.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function countdownLabel(): string {
  const n = daysUntilDiwali();
  if (n === 0) return "Diwali is today!";
  if (n === 1) return "Diwali is tomorrow!";
  if (n > 1) return `Diwali in ${n} days`;
  return "Send some light any day";
}

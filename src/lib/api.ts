import { useEffect, useState } from "react";
import type { ThaliData } from "./thali";

const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").trim().replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

/** Turn FastAPI's error body ({detail: "..."} or a list of validation errors) into one readable sentence. */
function errorMessage(body: unknown, status: number): string {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length) {
    const msg = String((detail[0] as { msg?: string }).msg ?? "");
    return msg.replace(/^Value error, /, "") || "Please check the details and try again.";
  }
  return status >= 500 ? "Something went wrong on our side. Please try again." : "Request failed.";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) throw new ApiError("The app isn't connected to its server (VITE_API_BASE_URL is missing).", 0);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError("Can't reach the server. Check your internet connection and try again.", 0);
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(errorMessage(body, res.status), res.status);
  return body as T;
}

export interface PublicConfig {
  amount: string;
  min_amount: number;
  max_amount: number;
  preset_amounts: number[];
  currency: string;
  cashfree_mode: "sandbox" | "production";
  payments_enabled: boolean;
  receipts_enabled: boolean;
  /** Whole rupees per "item" or "item:design"; missing = free. */
  item_prices: Record<string, number>;
}

export interface CheckoutInput {
  thali: ThaliData;
  phone: string;
  email: string;
  /** Shagun in whole rupees, within the server's min/max. Item prices are added by the server. */
  amount: number;
}

export interface CheckoutResponse {
  order_id: string;
  payment_session_id: string;
  cashfree_mode: "sandbox" | "production";
  amount: string; // total charged
  items_total: string;
  shagun: string;
  currency: string;
}

export interface VerifyResponse {
  status: "paid" | "pending" | "failed";
  thali_id: string | null;
  share_path: string | null;
}

export const api = {
  config: () => request<PublicConfig>("/api/config"),
  checkout: (input: CheckoutInput) =>
    request<CheckoutResponse>("/api/thalis/checkout", { method: "POST", body: JSON.stringify(input) }),
  verify: (orderId: string) =>
    request<VerifyResponse>("/api/thalis/verify", { method: "POST", body: JSON.stringify({ order_id: orderId }) }),
  thali: (id: string) => request<{ id: string; thali: unknown }>(`/api/thalis/${encodeURIComponent(id)}`),
};

/**
 * Ask the backend whether an order is paid. Right after the popup closes Cashfree can take a moment
 * to mark it PAID, so keep asking for a few seconds while it's still pending.
 */
export async function verifyUntilSettled(orderId: string, attempts = 6, delayMs = 2000): Promise<VerifyResponse> {
  let last = await api.verify(orderId);
  for (let i = 1; i < attempts && last.status === "pending"; i++) {
    await new Promise((r) => setTimeout(r, delayMs));
    last = await api.verify(orderId);
  }
  return last;
}

let configPromise: Promise<PublicConfig> | null = null;

/** The shagun price etc. from the server, fetched once per page load. */
export function usePublicConfig(): PublicConfig | null {
  const [config, setConfig] = useState<PublicConfig | null>(null);
  useEffect(() => {
    configPromise ??= api.config().catch((e) => {
      configPromise = null; // retry on the next mount
      throw e;
    });
    let alive = true;
    configPromise.then((c) => alive && setConfig(c)).catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return config;
}

/** "51" or "51.00" → "₹51" */
export const formatRupees = (amount: string | number) => `₹${Number(amount).toLocaleString("en-IN")}`;

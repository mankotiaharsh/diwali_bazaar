import { load } from "@cashfreepayments/cashfree-js";
import { ApiError, api, verifyUntilSettled, type CheckoutInput } from "./api";

export type PayStep = "creating" | "paying" | "confirming";

export type PayOutcome =
  | { status: "paid"; thaliId: string }
  | { status: "redirecting" }
  | { status: "pending" | "failed" | "cancelled"; orderId: string; message: string };

/**
 * Create the shagun order on our server, take the payment in Cashfree's popup, then let the
 * server confirm it with Cashfree. The browser never decides on its own that a payment succeeded.
 */
export async function payForThali(input: CheckoutInput, onStep: (s: PayStep) => void): Promise<PayOutcome> {
  onStep("creating");
  const order = await api.checkout(input);

  const cashfree = await load({ mode: order.cashfree_mode });
  if (!cashfree) throw new ApiError("Couldn't open the payment window. Please refresh and try again.", 0);

  onStep("paying");
  const result = await cashfree.checkout({ paymentSessionId: order.payment_session_id, redirectTarget: "_modal" });
  // Some methods (e.g. netbanking on some banks) leave the page; /payment/return picks up from there.
  if (result.redirect) return { status: "redirecting" };

  onStep("confirming");
  const v = await verifyUntilSettled(order.order_id, result.error ? 1 : 6);
  if (v.status === "paid" && v.thali_id) return { status: "paid", thaliId: v.thali_id };

  if (result.error && v.status !== "failed") {
    return { status: "cancelled", orderId: order.order_id, message: result.error.message || "The payment wasn't completed." };
  }
  if (v.status === "failed") {
    return { status: "failed", orderId: order.order_id, message: "The payment didn't go through. Please try again." };
  }
  return {
    status: "pending",
    orderId: order.order_id,
    message: "We're still waiting for the bank to confirm your payment.",
  };
}

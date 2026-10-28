// @cashfreepayments/cashfree-js ships without TypeScript types; this covers what we use.
declare module "@cashfreepayments/cashfree-js" {
  export interface CheckoutResult {
    error?: { message?: string; code?: string; type?: string };
    redirect?: boolean;
    paymentDetails?: { paymentMessage?: string };
  }

  export interface Cashfree {
    checkout(options: {
      paymentSessionId: string;
      redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | HTMLElement;
      returnUrl?: string;
    }): Promise<CheckoutResult>;
  }

  export function load(options: { mode: "sandbox" | "production" }): Promise<Cashfree | null>;
}

import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ApiError, verifyUntilSettled } from "../lib/api";
import { useThali } from "../state/ThaliContext";
import { Footer } from "../components/Footer";

type State = "checking" | "pending" | "failed" | "error";

/**
 * Cashfree sends the buyer here (?order_id=…) when a payment method leaves the site,
 * and the review page links here when confirmation is slow. We ask the server, never the URL.
 */
export default function PaymentReturnPage() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id") ?? "";
  const navigate = useNavigate();
  const { reset } = useThali();
  const [state, setState] = useState<State>("checking");
  const [message, setMessage] = useState("");

  const check = useCallback(async () => {
    setState("checking");
    try {
      const v = await verifyUntilSettled(orderId, 8);
      if (v.status === "paid" && v.thali_id) {
        navigate(`/sent/${v.thali_id}`, { replace: true });
        reset();
      } else {
        setState(v.status === "failed" ? "failed" : "pending");
      }
    } catch (e) {
      setMessage(e instanceof ApiError ? e.message : "Couldn't check the payment.");
      setState(e instanceof ApiError && e.status === 404 ? "failed" : "error");
    }
  }, [orderId, navigate, reset]);

  // Check once per order id. (`check` changes identity whenever the basket changes, which isn't a reason to re-check.)
  useEffect(() => {
    if (orderId) check();
  }, [orderId]);

  if (!orderId) return <Navigate to="/" replace />;

  return (
    <div className="page review-page">
      <div className="review-wrap">
        <div className="card status-card">
          {state === "checking" && (
            <>
              <h1 className="title">Confirming your payment…</h1>
              <p>This usually takes a few seconds. Please don't close this page.</p>
            </>
          )}
          {state === "pending" && (
            <>
              <h1 className="title">Payment not confirmed yet</h1>
              <p>Your bank hasn't confirmed the payment yet. If money was deducted, it usually confirms within a few minutes.</p>
              <button className="btn btn-primary" onClick={check}>Check again</button>
            </>
          )}
          {state === "failed" && (
            <>
              <h1 className="title">Payment didn't go through</h1>
              <p>{message || "The payment was not completed, so no link was created."} You can go back and try again.</p>
              <Link to="/review" className="btn btn-primary">Back to your thali</Link>
            </>
          )}
          {state === "error" && (
            <>
              <h1 className="title">Couldn't check the payment</h1>
              <p>{message}</p>
              <button className="btn btn-primary" onClick={check}>Try again</button>
            </>
          )}
          <p className="order-ref">Order ID: {orderId}</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

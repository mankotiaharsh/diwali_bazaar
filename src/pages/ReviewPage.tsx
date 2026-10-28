import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useThali } from "../state/ThaliContext";
import { ThaliPlate } from "../components/ThaliPlate";
import { ITEM_BY_ID, NAME_MAX, isStyled, itemLooks } from "../data/items";
import { ApiError, formatRupees, usePublicConfig } from "../lib/api";
import { payForThali, type PayOutcome, type PayStep } from "../lib/payment";
import { toThaliData } from "../lib/thali";
import { Footer } from "../components/Footer";
import { NoteModal } from "../components/NoteModal";

const STEP_LABEL: Record<PayStep, string> = {
  creating: "Creating your order…",
  paying: "Complete the payment in the Cashfree window…",
  confirming: "Confirming your payment…",
};

/** Same rules as the backend: 10-digit Indian mobile, with optional +91 / 0 in front. */
function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

type Problem = Extract<PayOutcome, { orderId: string }> | { status: "error"; message: string };

export default function ReviewPage() {
  const t = useThali();
  const navigate = useNavigate();
  const config = usePublicConfig();
  const [from, setFrom] = useState(t.from);
  const [to, setTo] = useState(t.to);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // A preset amount, or "custom" to type one. null = the minimum shagun.
  const [choice, setChoice] = useState<number | "custom" | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [step, setStep] = useState<PayStep | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);

  if (t.items.length === 0) return <Navigate to="/" replace />;

  const cleanPhone = normalizePhone(phone);
  const emailOk = isEmail(email);

  const amount = choice === "custom" ? Number(customAmount) : choice ?? config?.min_amount ?? null;
  let amountError: string | null = null;
  if (config && choice === "custom") {
    if (!/^\d+$/.test(customAmount)) amountError = "Enter the amount in whole rupees.";
    else if (amount! < config.min_amount) amountError = `The minimum shagun is ${formatRupees(config.min_amount)}.`;
    else if (amount! > config.max_amount) amountError = `The maximum shagun is ${formatRupees(config.max_amount)}.`;
  }
  const amountOk = amount !== null && amountError === null;
  const price = amountOk ? formatRupees(amount) : "";

  const busy = step !== null;
  const ready = from.trim() !== "" && to.trim() !== "" && cleanPhone !== null && emailOk && amountOk && !busy;

  const pay = async () => {
    if (!cleanPhone || !amountOk) return;
    const names = { from: from.trim(), to: to.trim() };
    t.setNames(names.from, names.to);
    setProblem(null);
    try {
      const outcome = await payForThali(
        { thali: toThaliData({ ...t, ...names }), phone: cleanPhone, email: email.trim(), amount: amount! },
        setStep,
      );
      if (outcome.status === "paid") {
        navigate(`/sent/${outcome.thaliId}`, { replace: true });
        t.reset();
      } else if (outcome.status !== "redirecting") {
        setProblem(outcome);
      }
    } catch (e) {
      setProblem({ status: "error", message: e instanceof ApiError ? e.message : "Something went wrong. Please try again." });
    } finally {
      setStep(null);
    }
  };

  return (
    <div className="page review-page">
      <div className="review-wrap">
        <Link to="/" className="back">← Back to the shop</Link>
        <h1 className="title">Your Diwali Thali</h1>

        <ThaliPlate items={t.items} styles={t.styles} />

        <ul className="contents">
          {t.items.map((id) => {
            const looks = itemLooks(id, t.styles);
            return (
              <li key={id}>
                <div className="contents-imgs">
                  {looks.map((l) => <img key={l.key} src={l.image} alt="" />)}
                </div>
                <span>{isStyled(id) ? `${ITEM_BY_ID[id].name} · ${looks.map((l) => l.name).join(", ")}` : ITEM_BY_ID[id].name}</span>
                <button className="icon-btn" aria-label={`Remove ${ITEM_BY_ID[id].name}`} disabled={busy} onClick={() => t.toggle(id)}>×</button>
              </li>
            );
          })}
        </ul>

        {t.note ? (
          <div className="note-card note-edit">
            <p>“{t.note}”</p>
            <button className="add-note" disabled={busy} onClick={() => setNoteOpen(true)}>Edit note</button>
          </div>
        ) : (
          <button className="add-note" disabled={busy} onClick={() => setNoteOpen(true)}>+ Add a note</button>
        )}

        <div className="card form">
          <label>
            Your name
            <input value={from} maxLength={NAME_MAX} placeholder="e.g. Priya" disabled={busy} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label>
            Who's it for?
            <input value={to} maxLength={NAME_MAX} placeholder="e.g. Maa, Rohan, the Sharma family" disabled={busy} onChange={(e) => setTo(e.target.value)} />
          </label>
          <label>
            Your mobile number
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phone}
              maxLength={16}
              placeholder="98765 43210"
              disabled={busy}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span className="field-hint">
              {phone && !cleanPhone ? "Enter a 10-digit Indian mobile number." : "Needed by Cashfree for the payment. It is never shown to the person you send the thali to."}
            </span>
          </label>
          <label>
            Your email
            <input
              type="email"
              autoComplete="email"
              value={email}
              maxLength={254}
              placeholder="you@example.com"
              disabled={busy}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="field-hint">
              {email && !emailOk ? "Enter a valid email address." : "We'll email your payment receipt and invoice here."}
            </span>
          </label>

          {config && (
            <fieldset className="shagun-box" disabled={busy}>
              <legend>
                <span>Shagun</span>
                <strong>{price || "—"}</strong>
              </legend>
              <div className="shagun-chips">
                {config.preset_amounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`shagun-chip${amount === value && choice !== "custom" ? " is-selected" : ""}`}
                    aria-pressed={amount === value && choice !== "custom"}
                    onClick={() => setChoice(value)}
                  >
                    {formatRupees(value)}
                  </button>
                ))}
                <button
                  type="button"
                  className={`shagun-chip${choice === "custom" ? " is-selected" : ""}`}
                  aria-pressed={choice === "custom"}
                  onClick={() => setChoice("custom")}
                >
                  Custom
                </button>
              </div>
              {choice === "custom" && (
                <label>
                  <span className="shagun-custom">
                    <span>₹</span>
                    <input
                      inputMode="numeric"
                      autoFocus
                      value={customAmount}
                      placeholder={`${config.min_amount} or more`}
                      aria-label="Custom shagun amount in rupees"
                      onChange={(e) => setCustomAmount(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                    />
                  </span>
                  <span className="field-hint">
                    {customAmount && amountError
                      ? amountError
                      : `Any amount from ${formatRupees(config.min_amount)} to ${formatRupees(config.max_amount)}.`}
                  </span>
                </label>
              )}
            </fieldset>
          )}

          {config && !config.payments_enabled ? (
            <p className="pay-problem" role="alert">Payments aren't available right now. Please try again later.</p>
          ) : (
            <button className="btn btn-primary full" disabled={!ready || !config} onClick={pay}>
              {step ? STEP_LABEL[step] : `Pay ${price} shagun & create link 🪔`}
            </button>
          )}

          {problem && (
            <div className="pay-problem" role="alert">
              <p>{problem.message}</p>
              {problem.status === "pending" && (
                <Link to={`/payment/return?order_id=${problem.orderId}`}>Check payment status →</Link>
              )}
              {"orderId" in problem && <p className="order-ref">Order ID: {problem.orderId}</p>}
            </div>
          )}

          <p className="pay-secure">🔒 Secure payment by Cashfree · UPI, cards, netbanking &amp; wallets</p>
        </div>

        <button className="btn btn-ghost full" disabled={busy} onClick={() => { if (confirm("Start a new thali?")) t.reset(); }}>
          Start over
        </button>
        <Footer />
      </div>
      <NoteModal open={noteOpen} onClose={() => setNoteOpen(false)} />
    </div>
  );
}

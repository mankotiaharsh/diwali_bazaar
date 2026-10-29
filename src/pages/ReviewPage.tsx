import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useThali } from "../state/ThaliContext";
import { ThaliPlate } from "../components/ThaliPlate";
import { ITEM_BY_ID, NAME_MAX, isStyled, itemLooks } from "../data/items";
import { ApiError, formatRupees, usePublicConfig } from "../lib/api";
import { payForThali, type PayOutcome, type PayStep } from "../lib/payment";
import { toThaliData } from "../lib/thali";
import { billFor, billTotal, priceLabel } from "../lib/pricing";
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

/** Bill lines shown before "Show all". */
const BILL_PREVIEW = 5;

const isEmail =(v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

type Problem = Extract<PayOutcome, { orderId: string }> | { status: "error"; message: string };
type Field = "from" | "to" | "phone" | "email" | "amount";

const FIELD_LABEL: Record<Field, string> = {
  from: "your name",
  to: "who it's for",
  phone: "mobile number",
  email: "email",
  amount: "shagun amount",
};

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
  const [billExpanded, setBillExpanded] = useState(false);
  const [step, setStep] = useState<PayStep | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  // Becomes true on the first Pay click, so empty required fields only turn red after that.
  const [attempted, setAttempted] = useState(false);
  const refs = {
    from: useRef<HTMLInputElement>(null),
    to: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    amount: useRef<HTMLInputElement>(null),
  };

  if (t.items.length === 0) return <Navigate to="/" replace />;

  const cleanPhone = normalizePhone(phone);

  const amount = choice === "custom" ? Number(customAmount) : choice ?? config?.min_amount ?? null;
  let amountError: string | null = null;
  if (config && choice === "custom") {
    if (!/^\d+$/.test(customAmount)) amountError = "Enter the amount in whole rupees.";
    else if (amount! < config.min_amount) amountError = `The minimum shagun is ${formatRupees(config.min_amount)}.`;
    else if (amount! > config.max_amount) amountError = `The maximum shagun is ${formatRupees(config.max_amount)}.`;
  }
  const amountOk = amount !== null && amountError === null;
  const price = amountOk ? formatRupees(amount) : "";

  // Display copy of the bill; the backend charges from its own price list.
  const bill = billFor(t.items, t.styles, config?.item_prices);
  const itemsTotal = billTotal(bill);
  const billLineCount = bill.length + (t.note ? 1 : 0);
  const total = amountOk ? itemsTotal + amount! : null;

  // Every problem with the form. Format errors show while typing; "required" ones only after a Pay attempt.
  const errors: Partial<Record<Field, string>> = {};
  if (!from.trim()) errors.from = "Please enter your name.";
  if (!to.trim()) errors.to = "Please tell us who the thali is for.";
  if (!phone.trim()) errors.phone = "Please enter your mobile number.";
  else if (!cleanPhone) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!email.trim()) errors.email = "Please enter your email.";
  else if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (amountError) errors.amount = amountError;
  const missing = (Object.keys(errors) as Field[]).filter((f) => errors[f]);
  const shown = (field: Field, value: string) => (attempted || value.trim() !== "" ? errors[field] : undefined);
  const hint = (field: Field, value: string, normal?: string) => {
    const err = shown(field, value);
    if (!err && !normal) return null;
    return <span className={`field-hint${err ? " is-error" : ""}`} id={`${field}-hint`}>{err ?? normal}</span>;
  };

  const busy = step !== null;

  const pay = async () => {
    if (missing.length) {
      setAttempted(true);
      const first = refs[missing[0]].current;
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus({ preventScroll: true });
      return;
    }
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
            <input
              ref={refs.from}
              value={from}
              maxLength={NAME_MAX}
              placeholder="e.g. Priya"
              disabled={busy}
              aria-invalid={!!shown("from", from)}
              aria-describedby="from-hint"
              onChange={(e) => setFrom(e.target.value)}
            />
            {hint("from", from)}
          </label>
          <label>
            Who's it for?
            <input
              ref={refs.to}
              value={to}
              maxLength={NAME_MAX}
              placeholder="e.g. Maa, Rohan, the Sharma family"
              disabled={busy}
              aria-invalid={!!shown("to", to)}
              aria-describedby="to-hint"
              onChange={(e) => setTo(e.target.value)}
            />
            {hint("to", to)}
          </label>
          <label>
            Your mobile number
            <input
              ref={refs.phone}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phone}
              maxLength={16}
              placeholder="98765 43210"
              disabled={busy}
              aria-invalid={!!shown("phone", phone)}
              aria-describedby="phone-hint"
              onChange={(e) => setPhone(e.target.value)}
            />
            {hint("phone", phone, "Needed by Cashfree for the payment. It is never shown to the person you send the thali to.")}
          </label>
          <label>
            Your email
            <input
              ref={refs.email}
              type="email"
              autoComplete="email"
              value={email}
              maxLength={254}
              placeholder="you@example.com"
              disabled={busy}
              aria-invalid={!!shown("email", email)}
              aria-describedby="email-hint"
              onChange={(e) => setEmail(e.target.value)}
            />
            {hint("email", email, "We'll email your payment receipt and invoice here.")}
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
                  <span className={`shagun-custom${shown("amount", customAmount) ? " is-invalid" : ""}`}>
                    <span>₹</span>
                    <input
                      ref={refs.amount}
                      inputMode="numeric"
                      autoFocus
                      value={customAmount}
                      placeholder={`${config.min_amount} or more`}
                      aria-label="Custom shagun amount in rupees"
                      aria-invalid={!!shown("amount", customAmount)}
                      aria-describedby="amount-hint"
                      onChange={(e) => setCustomAmount(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                    />
                  </span>
                  {hint("amount", customAmount, `Any amount from ${formatRupees(config.min_amount)} to ${formatRupees(config.max_amount)}.`)}
                </label>
              )}
            </fieldset>
          )}

          {config && (
            <section className="bill" aria-label="Your bill">
              <h2>You added</h2>
              <ul id="bill-lines">
                {(billExpanded ? bill : bill.slice(0, BILL_PREVIEW)).map((line) => (
                  <li key={line.key}>
                    <img src={line.image} alt="" />
                    <span className="bill-name">
                      {line.name}
                      {line.name !== line.category && <small>{line.category}</small>}
                    </span>
                    <span className={`bill-price${line.price ? "" : " is-free"}`}>{priceLabel(line.price)}</span>
                  </li>
                ))}
                {t.note && (billExpanded || bill.length < BILL_PREVIEW) && (
                  <li>
                    <span className="bill-name">Your note</span>
                    <span className="bill-price is-free">Free</span>
                  </li>
                )}
              </ul>
              {billLineCount > BILL_PREVIEW && (
                <button
                  type="button"
                  className="bill-toggle"
                  aria-expanded={billExpanded}
                  aria-controls="bill-lines"
                  onClick={() => setBillExpanded((v) => !v)}
                >
                  {billExpanded ? "Show less ▴" : `Show all ${billLineCount} items ▾`}
                </button>
              )}
              <div className="bill-row"><span>Items</span><span>{priceLabel(itemsTotal)}</span></div>
              <div className="bill-row"><span>Shagun for {to.trim() || "them"}</span><span>{price || "—"}</span></div>
              <div className="bill-total"><span>Total</span><strong>{total !== null ? formatRupees(total) : "—"}</strong></div>
            </section>
          )}

          {attempted && missing.length > 0 && (
            <p className="form-missing" role="alert">
              Please fill in {missing.map((f) => FIELD_LABEL[f]).join(", ")} to continue.
            </p>
          )}

          {config && !config.payments_enabled ? (
            <p className="pay-problem" role="alert">Payments aren't available right now. Please try again later.</p>
          ) : (
            <button className="btn btn-primary full" disabled={busy || !config} onClick={pay}>
              {step ? STEP_LABEL[step] : `Pay ${total !== null ? formatRupees(total) : ""} & create link 🪔`}
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

          <p className="pay-consent">
            By paying, you agree to our <Link to="/terms">Terms</Link> and{" "}
            <Link to="/refund">Refund Policy</Link> · Need help? <Link to="/contact">Contact us</Link>
          </p>

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

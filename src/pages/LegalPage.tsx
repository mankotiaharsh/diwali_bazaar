import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";
import { Footer } from "../components/Footer";

// Written to match how the app actually works (no accounts, no database, thali data lives in the link).
// It's a solid starting point, not legal advice — have a lawyer review it before relying on it commercially.

/** A paragraph, or a bulleted list. */
type Block = string | string[];

interface Section {
  heading: string;
  body: Block[];
}

interface LegalDoc {
  title: string;
  summary: string;
  sections: Section[];
}

const { name, contactEmail, shagunAmount, operatorName, contactPhone, contactAddress, supportHours } = BRAND;
const SHAGUN = `₹${shagunAmount}`;

const CONTENT: Record<"terms" | "privacy" | "refund" | "contact", LegalDoc> = {
  contact: {
    title: "Contact Us",
    summary: `Questions about a payment, a refund or a thali link? Write to us and we will reply within 2 working days.`,
    sections: [
      {
        heading: "Get in touch",
        body: [
          [
            `Business: ${name}${operatorName ? ` (operated by ${operatorName})` : ""}`,
            `Email: ${contactEmail}`,
            ...(contactPhone ? [`Phone: ${contactPhone}`] : []),
            ...(contactAddress ? [`Address: ${contactAddress}`] : []),
            `Support hours: ${supportHours}`,
          ],
        ],
      },
      {
        heading: "Payment or refund issues",
        body: [
          `Please include your Order ID (shown on the payment screens and in your receipt email), the mobile number you used and a short description. See our Refund Policy for when and how refunds are made.`,
        ],
      },
      {
        heading: "Taking a link down",
        body: [`If you want a thali link removed, email us the link and we will disable it.`],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    summary: `${name} lets you make a digital Diwali thali and send it as a link. Many items are free and some cost ₹10 each; each link also carries a shagun of at least ${SHAGUN}. Everything is paid together, securely through Cashfree. Be kind with what you write, share links only with people you trust, and remember that nothing here is a physical product.`,
    sections: [
      {
        heading: "1. About these terms",
        body: [
          `These Terms & Conditions ("Terms") govern your use of the ${name} website and service (the "Service"). By using the Service, you agree to these Terms. If you do not agree, please do not use the Service.`,
          `In these Terms, "we", "us" and "our" refer to ${name}, and "you" refers to anyone who uses the Service, including people who create a thali and people who open a thali link.`,
        ],
      },
      {
        heading: "2. The Service",
        body: [
          `${name} lets you choose illustrated items (such as a diya, mithai, phool, pooja samagri and patakhe), add an optional message and, after paying a one-time shagun, receive a link that shows your digital Diwali thali to whoever opens it.`,
          [
            "Building and previewing a thali is free. To create its share link you pay for any priced items you chose plus a shagun of at least the minimum shown (or any higher amount you choose).",
            "Every thali is a digital greeting only. No physical goods are sold, shipped or delivered, and the items shown are illustrations.",
            "Patakhe (fireworks) in the Service are digital animations only. If you celebrate with real fireworks, please follow local laws, any restrictions on timing or type, and safety guidance.",
            "No account or sign-up is required.",
          ],
        ],
      },
      {
        heading: "3. Payments",
        body: [
          [
            `Item prices (Free or ₹10 each) are shown next to every item and listed in the bill before you pay. The minimum shagun for each thali link is ${SHAGUN} (Indian Rupees), and you may choose to give more. The total on the payment button (items plus shagun) is the amount charged.`,
            "Payments are processed by Cashfree Payments, a licensed payment aggregator. We never see or store your card, UPI or bank details.",
            "Your link is created only after Cashfree confirms the payment. If a payment fails, no link is created.",
            "A receipt and invoice are emailed to the address you provide after a successful payment.",
            "Refunds are covered by our Refund Policy.",
          ],
        ],
      },
      {
        heading: "4. Eligibility",
        body: [
          "You may use the Service if you are able to form a binding agreement under applicable law. If you are under 18, please use the Service with the involvement of a parent or guardian, who accepts these Terms on your behalf.",
        ],
      },
      {
        heading: "5. Your content and conduct",
        body: [
          'You are solely responsible for the names, messages and any other content you add to a thali ("Your Content"). You confirm that you have the right to use Your Content and that it does not break any law or anyone else\'s rights.',
          "You agree not to use the Service to:",
          [
            "send content that is abusive, harassing, threatening, hateful, obscene, defamatory or otherwise unlawful;",
            "hurt religious sentiments or target any person or group on the basis of religion, caste, gender, ethnicity or any other protected characteristic;",
            "impersonate any person, or misrepresent who a thali is from;",
            "send spam, scams, phishing or misleading content;",
            "share another person's personal or sensitive information without their consent;",
            "interfere with, disrupt, overload or attempt to gain unauthorised access to the Service or its infrastructure.",
          ],
          "We do not review thalis before they are shared, but we may remove a thali that breaks these Terms. You keep ownership of Your Content, and you control who receives your link.",
        ],
      },
      {
        heading: "6. Thali links",
        body: [
          [
            "Anyone who has a thali link can open it and see everything in it, including names and the message. Share links only with the people you intend to.",
            "A thali cannot be edited after its link is created. To change it, create a new thali. If you need a link taken down, contact us.",
            "Messaging apps and websites you share a link through (such as WhatsApp) are operated by third parties and have their own terms and privacy policies.",
          ],
        ],
      },
      {
        heading: "7. Intellectual property",
        body: [
          `The Service, including its design, illustrations, animations, text, code and the ${name} name, belongs to us or our licensors and is protected by intellectual property laws. You may use the Service for personal, non-commercial purposes. You may not copy, modify, distribute, sell or reverse-engineer any part of the Service except as permitted by law.`,
        ],
      },
      {
        heading: "8. Availability and changes",
        body: [
          "We may change, suspend or discontinue any part of the Service at any time, without notice. We do not guarantee that the Service will always be available, uninterrupted or error-free, or that links will keep working if the Service changes or stops.",
        ],
      },
      {
        heading: "9. Disclaimer",
        body: [
          'The Service is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement.',
        ],
      },
      {
        heading: "10. Limitation of liability",
        body: [
          "To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of data, goodwill or reputation, arising from your use of, or inability to use, the Service, or from any content sent through it by users. Our total liability for any claim relating to a thali is limited to the shagun you paid for it, except where the law does not allow such a limit.",
        ],
      },
      {
        heading: "11. Indemnity",
        body: [
          "You agree to indemnify and hold us harmless from any claims, losses, liabilities and expenses (including reasonable legal fees) arising from Your Content or from your breach of these Terms or of any law.",
        ],
      },
      {
        heading: "12. Governing law and disputes",
        body: [
          "These Terms are governed by the laws of India. Any dispute arising from or relating to these Terms or the Service will be subject to the jurisdiction of the competent courts in India. Before starting any formal proceedings, please contact us so we can try to resolve the matter informally.",
        ],
      },
      {
        heading: "13. Changes to these terms",
        body: [
          'We may update these Terms from time to time. The "Last updated" date at the top of this page shows when they were last changed. By continuing to use the Service after an update, you accept the revised Terms.',
        ],
      },
      {
        heading: "14. Contact and grievances",
        body: [
          `For questions about these Terms, or to report content or misuse of the Service, write to ${contactEmail}. In line with the Information Technology Act, 2000 and the rules made under it, we will acknowledge complaints within 24 hours and aim to resolve them within 15 days.`,
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    summary: `${name} has no accounts, no cookies and no ad tracking; we only count visits anonymously. When you pay for a thali we store it, with your mobile number and email, so its link works and we can send your receipt. Anyone with the link can see the thali, but never your contact details. Payments are handled by Cashfree, so we never see your card or UPI details.`,
    sections: [
      {
        heading: "1. About this policy",
        body: [
          `This Privacy Policy explains what information is involved when you use ${name} (the "Service"), how it is handled, and the choices you have. It is intended to comply with the Information Technology Act, 2000, the rules made under it, and the Digital Personal Data Protection Act, 2023.`,
        ],
      },
      {
        heading: "2. Information you provide",
        body: [
          "When you create a thali, you may enter:",
          [
            "your name and the recipient's name;",
            "an optional personal message;",
            "the items you choose for the thali;",
            "your mobile number, which our payment partner Cashfree requires for every payment;",
            "your email address, to send your payment receipt and invoice.",
          ],
          "We do not ask for your location or any government ID. Please do not include sensitive personal information (such as financial, health or identity details) in names or messages.",
        ],
      },
      {
        heading: "3. Where your thali is kept",
        body: [
          [
            "On our servers. When you pay, your thali (names, items and message), your mobile number, your email address and the payment reference are stored in our database so the link can be opened. The link itself contains only a short random code.",
            "In your browser tab. While you build a thali, your progress is kept in your browser for that tab only, so it isn't lost if you refresh. It is not sent to us until you pay, and it is cleared when you close the tab or tap \"Start over\".",
          ],
        ],
      },
      {
        heading: "4. Information collected automatically",
        body: [
          "We do not use cookies, advertising or cross-site tracking. Like any website, some technical information is processed by the services that make the site work:",
          [
            "Hosting. The website and its server are hosted by third-party providers (such as Vercel). They may record standard server logs such as IP address, date and time, browser type and the address requested, for security and reliability.",
            "Visit statistics. We use Vercel Web Analytics and Speed Insights to count page visits and measure how fast pages load. They use no cookies, do not identify you, and report only aggregated data such as page, country, browser and device type. Thali link codes are removed before anything is sent.",
            "Fonts. Our fonts are loaded from Google Fonts, so your browser connects to Google's servers, which can see your IP address and browser details.",
          ],
          "These providers act under their own privacy policies.",
        ],
      },
      {
        heading: "5. How information is used",
        body: [
          "Information is used only to build and display your thali, to process and confirm your payment, to handle refunds and support requests, and to operate, secure and maintain the Service. We do not sell, rent or trade personal information, and we do not use it for advertising or profiling.",
        ],
      },
      {
        heading: "6. Sharing",
        body: [
          [
            "With the recipient. Sharing a link shares the thali with whoever opens it, and with anyone they forward it to. Your mobile number and email are never shown.",
            "With Cashfree. Your name, mobile number, email and the amount are shared with Cashfree Payments to process the payment. Your card, UPI or bank details go directly to Cashfree and never reach us.",
            "With our email provider. Your email address, name and receipt details are passed to our email delivery provider (Resend) only to send your receipt.",
            "Through messaging apps. If you share a link through WhatsApp or another app, that app handles the link under its own privacy policy and may generate a preview of it.",
            "Legal requirements. We may disclose information where required by law or a valid order of a court or government authority.",
          ],
        ],
      },
      {
        heading: "7. Data retention",
        body: [
          "Paid thalis are kept so their links keep working, and payment records are kept as long as required for accounting, tax and legal purposes. Unpaid checkouts are kept only as long as needed to confirm whether they were paid. Data kept in your browser tab is cleared when you close it. You can ask us to delete a thali at any time (see section 9).",
        ],
      },
      {
        heading: "8. Security",
        body: [
          "The Service is served over a secure, encrypted (HTTPS) connection, and access to stored data is restricted. A thali link is not password-protected: anyone who gets hold of it can view it. No method of transmission over the internet is completely secure, so please share links with care.",
        ],
      },
      {
        heading: "9. Your rights and choices",
        body: [
          [
            "You choose what to enter: the message is optional and you can use nicknames. The mobile number and email are required only to make the payment and send your receipt.",
            "An unpaid thali in your browser disappears when you close the tab, or at any time with \"Start over\".",
            "If you shared a link by mistake, or want a thali taken down, write to us with the link and we will remove it.",
          ],
          `Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may contact us at ${contactEmail} to ask about, correct or erase any personal data relating to you, or to raise a grievance.`,
        ],
      },
      {
        heading: "10. Children",
        body: [
          "The Service is suitable for family use, but it is not directed at children without supervision. Children under 18 should use it with the involvement of a parent or guardian. We do not knowingly collect personal data from children.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        body: [
          'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page shows when it was last changed. Continued use of the Service after an update means you accept the revised policy.',
        ],
      },
      {
        heading: "12. Contact and grievances",
        body: [
          `For any privacy question, request or complaint, write to ${contactEmail}. We will acknowledge your message within 24 hours and aim to resolve it within 15 days.`,
        ],
      },
    ],
  },
  refund: {
    title: "Refund & Cancellation Policy",
    summary: `Your payment (any priced items plus your shagun) is for a digital thali link that is delivered instantly. If you were charged but didn't get your link, or were charged twice, we'll make it right.`,
    sections: [
      {
        heading: "1. What you pay for",
        body: [
          `You pay once per thali link: the price of any priced items you chose (₹10 each; many are free) plus a shagun of at least ${SHAGUN}, which you may increase. It is a digital service: your link is created and shown to you immediately after Cashfree confirms the payment. Nothing is shipped.`,
        ],
      },
      {
        heading: "2. Delivery",
        body: [
          'Delivery is instant and online. After a successful payment you are taken to a page with your link, which you can copy or share right away, and a receipt with your link is emailed to you. If you closed the page, the link is still created; contact us with your Order ID and we will send it to you.',
        ],
      },
      {
        heading: "3. Cancellations",
        body: [
          "You can cancel at any time before paying by simply closing the payment window. Once the payment succeeds, the link is created instantly, so the order cannot be cancelled after that.",
        ],
      },
      {
        heading: "4. When we refund",
        body: [
          "We will refund the full amount you paid if:",
          [
            "money was deducted but your link was not created;",
            "you were charged a different amount from the one shown on the payment button;",
            "you were charged more than once for the same thali;",
            "the link we created does not work and we cannot fix it.",
          ],
          "Because the link is delivered instantly, we do not offer refunds for a successfully created link because of a change of mind, a typo you made in a name or message, or a link shared with the wrong person. Contact us and we will gladly take such a link down.",
        ],
      },
      {
        heading: "5. How to ask for a refund",
        body: [
          `Write to ${contactEmail} within 7 days of the payment, with your Order ID (shown on the payment screens), the mobile number you used and a short description. We will reply within 2 working days.`,
        ],
      },
      {
        heading: "6. Refund timeline",
        body: [
          "Approved refunds are processed to the original payment method through Cashfree within 5–7 working days. Your bank or UPI app may take a few extra days to show the credit.",
          "If money was deducted for a failed payment, it is usually reversed automatically by your bank within 5–7 working days. If it isn't, contact us.",
        ],
      },
      {
        heading: "7. Contact",
        body: [`For any payment or refund question, write to ${contactEmail}.`],
      },
    ],
  },
};

export default function LegalPage({ kind }: { kind: keyof typeof CONTENT }) {
  const doc = CONTENT[kind];
  return (
    <div className="page legal-page">
      <div className="review-wrap">
        <Link to="/" className="back">← Back to the shop</Link>
        <h1 className="title">{doc.title}</h1>
        <p className="legal-updated">Last updated: {BRAND.legalUpdated}</p>

        <div className="legal-summary">
          <strong>In short:</strong> {doc.summary}
        </div>

        <article className="card legal-body">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i}>{b}</p>
                ) : (
                  <ul key={i}>{b.map((li) => <li key={li}>{li}</li>)}</ul>
                ),
              )}
            </section>
          ))}
          <p className="legal-contact">
            Contact: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </article>

        <p className="legal-switch">
          {kind !== "terms" && <Link to="/terms">Terms &amp; Conditions</Link>}
          {kind !== "privacy" && <Link to="/privacy">Privacy Policy</Link>}
          {kind !== "refund" && <Link to="/refund">Refund Policy</Link>}
          {kind !== "contact" && <Link to="/contact">Contact Us</Link>}
        </p>
        <Footer />
      </div>
    </div>
  );
}

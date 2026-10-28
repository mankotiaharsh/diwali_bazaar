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

const { name, contactEmail } = BRAND;

const CONTENT: Record<"terms" | "privacy", LegalDoc> = {
  terms: {
    title: "Terms & Conditions",
    summary: `${name} is a free way to make a digital Diwali thali and share it as a link. Be kind with what you write, share links only with people you trust, and remember that nothing here is a physical product.`,
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
          `${name} lets you choose illustrated items (such as a diya, mithai, phool, pooja samagri and patakhe), add an optional message, and generate a link that shows your digital Diwali thali to whoever opens it.`,
          [
            "The Service is free of charge.",
            "Every thali is a digital greeting only. No physical goods are sold, shipped or delivered, and the items shown are illustrations.",
            "Patakhe (fireworks) in the Service are digital animations only. If you celebrate with real fireworks, please follow local laws, any restrictions on timing or type, and safety guidance.",
            "No account or sign-up is required.",
          ],
        ],
      },
      {
        heading: "3. Eligibility",
        body: [
          "You may use the Service if you are able to form a binding agreement under applicable law. If you are under 18, please use the Service with the involvement of a parent or guardian, who accepts these Terms on your behalf.",
        ],
      },
      {
        heading: "4. Your content and conduct",
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
          "We do not review thalis before they are shared. You keep ownership of Your Content. Because Your Content lives inside the link you create, you control who receives it.",
        ],
      },
      {
        heading: "5. Thali links",
        body: [
          [
            "Anyone who has a thali link can open it and see everything in it, including names and the message. Share links only with the people you intend to.",
            "We cannot edit, disable or delete a link after it has been created and shared, because the thali is stored in the link itself and not on our servers. To change a thali, create a new link.",
            "Messaging apps and websites you share a link through (such as WhatsApp) are operated by third parties and have their own terms and privacy policies.",
          ],
        ],
      },
      {
        heading: "6. Intellectual property",
        body: [
          `The Service, including its design, illustrations, animations, text, code and the ${name} name, belongs to us or our licensors and is protected by intellectual property laws. You may use the Service for personal, non-commercial purposes. You may not copy, modify, distribute, sell or reverse-engineer any part of the Service except as permitted by law.`,
        ],
      },
      {
        heading: "7. Availability and changes",
        body: [
          "We may change, suspend or discontinue any part of the Service at any time, without notice. We do not guarantee that the Service will always be available, uninterrupted or error-free, or that links will keep working if the Service changes or stops.",
        ],
      },
      {
        heading: "8. Disclaimer",
        body: [
          'The Service is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement.',
        ],
      },
      {
        heading: "9. Limitation of liability",
        body: [
          "To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of data, goodwill or reputation, arising from your use of, or inability to use, the Service, or from any content sent through it by users. Because the Service is provided free of charge, our total liability for any claim relating to the Service is limited to zero, except where the law does not allow such a limit.",
        ],
      },
      {
        heading: "10. Indemnity",
        body: [
          "You agree to indemnify and hold us harmless from any claims, losses, liabilities and expenses (including reasonable legal fees) arising from Your Content or from your breach of these Terms or of any law.",
        ],
      },
      {
        heading: "11. Governing law and disputes",
        body: [
          "These Terms are governed by the laws of India. Any dispute arising from or relating to these Terms or the Service will be subject to the jurisdiction of the competent courts in India. Before starting any formal proceedings, please contact us so we can try to resolve the matter informally.",
        ],
      },
      {
        heading: "12. Changes to these terms",
        body: [
          'We may update these Terms from time to time. The "Last updated" date at the top of this page shows when they were last changed. By continuing to use the Service after an update, you accept the revised Terms.',
        ],
      },
      {
        heading: "13. Contact and grievances",
        body: [
          `For questions about these Terms, or to report content or misuse of the Service, write to ${contactEmail}. In line with the Information Technology Act, 2000 and the rules made under it, we will acknowledge complaints within 24 hours and aim to resolve them within 15 days.`,
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    summary: `${name} has no accounts, no database and no tracking. Your thali, including names and your message, is packed into the link you share, so anyone with that link can read it. Your browser keeps an unfinished thali so you don't lose it on refresh.`,
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
            "the items you choose for the thali.",
          ],
          "We do not ask for your email address, phone number, location, payment details or any government ID. Please do not include sensitive personal information (such as financial, health or identity details) in names or messages.",
        ],
      },
      {
        heading: "3. Where your thali is kept",
        body: [
          [
            "Inside the link. When you create a thali, its contents are encoded into the web address (URL) of the link. We do not save thalis in any database. Anyone who has the link can decode and read its contents.",
            "In your browser. While you build a thali, your progress is saved in your browser's local storage on your own device, so it isn't lost if you refresh. It is not sent to us. You can remove it with \"Start over\" or by clearing your browser's site data.",
          ],
        ],
      },
      {
        heading: "4. Information collected automatically",
        body: [
          "We do not use cookies, analytics, advertising or tracking tools. However, like any website, some technical information is processed by the services that make the site work:",
          [
            "Hosting. The Service is hosted by Vercel. When you load a page, Vercel may record standard server logs such as IP address, date and time, browser type and the address requested, for security and reliability. Because a thali's contents are part of its link, the requested address may include that thali's data.",
            "Fonts. Our fonts are loaded from Google Fonts, so your browser connects to Google's servers, which can see your IP address and browser details.",
          ],
          "These providers act under their own privacy policies.",
        ],
      },
      {
        heading: "5. How information is used",
        body: [
          "Information is used only to build and display your thali and to operate, secure and maintain the Service. We do not sell, rent or trade personal information, and we do not use it for advertising or profiling.",
        ],
      },
      {
        heading: "6. Sharing",
        body: [
          [
            "With the recipient. Sharing a link shares its contents with whoever opens it, and with anyone they forward it to.",
            "Through messaging apps. If you share a link through WhatsApp or another app, that app handles the link under its own privacy policy and may generate a preview of it.",
            "Legal requirements. We may disclose information where required by law or a valid order of a court or government authority.",
          ],
        ],
      },
      {
        heading: "7. Data retention",
        body: [
          "We do not keep thalis on our servers. A link keeps working for as long as the Service is online and the link exists in the places you shared it. Data saved in your browser stays until you clear it. Hosting logs are kept by our hosting provider in line with its own retention policy.",
        ],
      },
      {
        heading: "8. Security",
        body: [
          "The Service is served over a secure, encrypted (HTTPS) connection. However, a thali link is not password-protected: anyone who gets hold of it can view it. No method of transmission over the internet is completely secure, so please share links with care.",
        ],
      },
      {
        heading: "9. Your rights and choices",
        body: [
          [
            "You choose what to enter: every field, including the message, is optional except the names needed to create a link, and you can use a nickname.",
            "You can delete the thali saved in your browser at any time with \"Start over\" or by clearing site data.",
            "You can stop sharing a link, but we cannot revoke a link that has already been sent. If you shared a link by mistake, ask the recipient to delete it.",
          ],
          `Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may contact us at ${contactEmail} to ask about, correct or erase any personal data relating to you, or to raise a grievance. As we hold no database of thalis, we may have nothing on record about you.`,
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
          {kind === "terms" ? <Link to="/privacy">Read our Privacy Policy →</Link> : <Link to="/terms">Read our Terms &amp; Conditions →</Link>}
        </p>
        <Footer />
      </div>
    </div>
  );
}

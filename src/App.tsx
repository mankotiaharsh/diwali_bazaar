import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThaliProvider } from "./state/ThaliContext";
import { maskEvent } from "./lib/analytics";
import { ScrollToTop } from "./components/ScrollToTop";
import ShopPage from "./pages/ShopPage";
import ReviewPage from "./pages/ReviewPage";
import OpenThaliPage from "./pages/OpenThaliPage";
import LegalPage from "./pages/LegalPage";
import SentPage from "./pages/SentPage";
import PaymentReturnPage from "./pages/PaymentReturnPage";
import PoliciesPage from "./pages/PoliciesPage";

export default function App() {
  return (
    <ThaliProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/t/:id" element={<OpenThaliPage />} />
          <Route path="/sent/:id" element={<SentPage />} />
          <Route path="/payment/return" element={<PaymentReturnPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/refund" element={<LegalPage kind="refund" />} />
          <Route path="/contact" element={<LegalPage kind="contact" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Analytics beforeSend={maskEvent} />
      <SpeedInsights beforeSend={maskEvent} />
    </ThaliProvider>
  );
}

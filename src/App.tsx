import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThaliProvider } from "./state/ThaliContext";
import ShopPage from "./pages/ShopPage";
import ReviewPage from "./pages/ReviewPage";
import OpenThaliPage from "./pages/OpenThaliPage";
import LegalPage from "./pages/LegalPage";
import SentPage from "./pages/SentPage";
import PaymentReturnPage from "./pages/PaymentReturnPage";

export default function App() {
  return (
    <ThaliProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/t/:id" element={<OpenThaliPage />} />
          <Route path="/sent/:id" element={<SentPage />} />
          <Route path="/payment/return" element={<PaymentReturnPage />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/refund" element={<LegalPage kind="refund" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThaliProvider>
  );
}

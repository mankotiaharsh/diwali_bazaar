import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThaliProvider } from "./state/ThaliContext";
import ShopPage from "./pages/ShopPage";
import ReviewPage from "./pages/ReviewPage";
import OpenThaliPage from "./pages/OpenThaliPage";
import LegalPage from "./pages/LegalPage";

export default function App() {
  return (
    <ThaliProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/t/:code" element={<OpenThaliPage />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThaliProvider>
  );
}

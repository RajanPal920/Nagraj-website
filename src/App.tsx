import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { WhyUsPage } from "./pages/WhyUsPage";
import { ContactPage } from "./pages/ContactPage";
import { CertificatesPage } from "./pages/CertificatesPage";
import { TechnicalInfoPage } from "./pages/TechnicalInfoPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { WhatsAppButton } from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/technical-info" element={<TechnicalInfoPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;

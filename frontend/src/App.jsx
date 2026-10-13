import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";
import Home from "./pages/Home";
import About from "./pages/About";
import Offers from "./pages/Offers";
import Gallery from "./pages/Gallery";
import Clients from "./pages/Clients";
import SolarDataNotice from "./pages/SolarDataNotice";
import SolarServiceTerms from "./pages/SolarServiceTerms";

function RouteScrollAndTitleManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const titles = {
      "/": "Smart Solar Solutions | #1 Solar Panel Installation, Subsidy & Water Pumps in Tarapur, Munger, Bihar",
      "/about":
        "About Smart Solar Solutions | Certified Rooftop Solar & Pump Contractor in Tarapur, Munger, Bihar",
      "/offer":
        "Solar Packages & Pricing | Home Rooftop Solar, Commercial Plants, Water Pumps & Atta Chakki in Bihar",
      "/gallery":
        "Solar Project Gallery | Real Rooftop Solar, Commercial Plants & Water Pump Installations in Bihar",
      "/clients":
        "Institutions & Commercial Clients | Solar Installations by Smart Solar Solutions in Tarapur & Munger",
      "/privacy-policy": "Privacy Policy | Smart Solar Solutions Tarapur, Bihar",
      "/terms-and-conditions":
        "Terms & Conditions | Smart Solar Solutions Tarapur, Bihar",
    };

    document.title = titles[pathname] || titles["/"];
  }, [pathname, hash]);

  return null;
}

export default function App() {
  // Default theme: "light" as requested
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Lightbox Modal State
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    items: [],
    currentIndex: 0,
  });

  // Apply theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Lightbox Handlers
  const openLightbox = (items, index) => {
    setLightboxState({
      isOpen: true,
      items: items || [],
      currentIndex: index || 0,
    });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "";
  };

  const nextLightbox = () => {
    setLightboxState((prev) => {
      if (!prev.items || prev.items.length === 0) return prev;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.items.length,
      };
    });
  };

  const prevLightbox = () => {
    setLightboxState((prev) => {
      if (!prev.items || prev.items.length === 0) return prev;
      return {
        ...prev,
        currentIndex:
          (prev.currentIndex - 1 + prev.items.length) % prev.items.length,
      };
    });
  };

  const selectLightboxIndex = (index) => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: index,
    }));
  };

  return (
    <BrowserRouter>
      <RouteScrollAndTitleManager />
      <div className="smart-solar-app" data-theme={theme}>
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleTheme={toggleTheme}
        />

        <Routes>
          <Route path="/" element={<Home openLightbox={openLightbox} />} />
          <Route path="/about" element={<About />} />
          <Route path="/offer" element={<Offers />} />
          <Route
            path="/gallery"
            element={<Gallery openLightbox={openLightbox} />}
          />
          <Route path="/clients" element={<Clients />} />
          <Route path="/privacy-policy" element={<SolarDataNotice />} />
          <Route
            path="/terms-and-conditions"
            element={<SolarServiceTerms />}
          />
          <Route path="*" element={<Home openLightbox={openLightbox} />} />
        </Routes>

        <Footer />

        {/* FLOATING WHATSAPP */}
        <a
          className="float-wa"
          href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20have%20an%20inquiry%20regarding%20solar%20installation."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Us"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>

        {/* LIGHTBOX MODAL */}
        <Lightbox
          lightboxState={lightboxState}
          isOpen={lightboxState.isOpen}
          items={lightboxState.items}
          currentIndex={lightboxState.currentIndex}
          closeLightbox={closeLightbox}
          prevLightbox={prevLightbox}
          nextLightbox={nextLightbox}
          selectLightboxIndex={selectLightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      </div>
    </BrowserRouter>
  );
}

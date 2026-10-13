import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OFFER_WHATSAPP_MSG =
  "Hello Smart Solar Solutions, I saw your Dussehra & Diwali festive offer (Free 20g Silver Coin on Solar Installation). I want to claim this offer and get a consultation.";

const OFFER_WHATSAPP_URL = `https://wa.me/919931798080?text=${encodeURIComponent(
  OFFER_WHATSAPP_MSG
)}`;

export default function OfferModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Show popup automatically on website load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEnquiryClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/#contact");
    } else {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="offer-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Festive Solar Offer"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="offer-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="offer-modal-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close offer modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* CLICKABLE OFFER BANNER IMAGE (DESKTOP + MOBILE) */}
        <a
          href={OFFER_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="offer-modal-img-wrap"
          aria-label="Festive Solar Offer"
        >
          <picture>
            <source
              media="(max-width: 680px)"
              srcSet="/solar-offer-mobile.webp"
            />
            <img
              src="/solar-offer-desktop.webp"
              alt="Dussehra and Diwali Festive Solar Offer - Free 20g Silver Coin on Solar Installation"
              className="offer-modal-img"
              loading="eager"
            />
          </picture>
        </a>

        {/* ACTION BUTTONS ROW */}
        <div className="offer-modal-actions">
          <button
            type="button"
            className="btn btn-outline offer-btn-enquiry"
            onClick={handleEnquiryClick}
          >
            <i className="fa-solid fa-file-pen"></i> Get Enquiry
          </button>

          <a
            href={OFFER_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary offer-btn-whatsapp"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-brands fa-whatsapp"></i> Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}


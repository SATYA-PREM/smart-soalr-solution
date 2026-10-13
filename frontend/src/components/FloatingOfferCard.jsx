import React, { useState } from "react";

const FLOATING_OFFER_WHATSAPP_MSG =
  "Hello Smart Solar Solutions, I want to inquire about the Festive Solar Offer (Free 20g Silver Coin on Solar Installation). Please guide me.";

const FLOATING_OFFER_WHATSAPP_URL = `https://wa.me/919931798080?text=${encodeURIComponent(
  FLOATING_OFFER_WHATSAPP_MSG
)}`;

export default function FloatingOfferCard() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      className={`floating-corner-offer ${isMinimized ? "minimized" : ""}`}
      aria-label="Festive Solar Offer Widget"
    >
      {isMinimized ? (
        <button
          type="button"
          className="floating-offer-pill-btn"
          onClick={() => setIsMinimized(false)}
          aria-label="Expand Festive Offer"
        >
          <span className="pill-badge-icon">🎁</span>
          <span className="pill-badge-text">20g Silver Coin Offer</span>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      ) : (
        <div className="floating-offer-card-body">
          {/* CARD TOP CONTROLS */}
          <div className="floating-offer-header">
            <span className="floating-offer-tag">
              <i className="fa-solid fa-gift"></i> FESTIVE SOLAR OFFER
            </span>
            <button
              type="button"
              className="floating-offer-minimize"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize offer popup"
              title="Minimize offer"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          {/* CLICKABLE OFFER BADGE IMAGE */}
          <a
            href={FLOATING_OFFER_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-offer-img-link"
            aria-label="Festive Solar Offer"
          >
            <img
              src="/solar-corner-badge.webp"
              alt="Festive Solar Offer - 20g Silver Coin Free"
              className="floating-offer-img"
              loading="lazy"
            />
          </a>

          {/* ACTION BUTTON */}
          <div className="floating-offer-footer">
            <a
              href={FLOATING_OFFER_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary floating-offer-cta"
            >
              <i className="fa-brands fa-whatsapp"></i> Claim Offer on WhatsApp
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}


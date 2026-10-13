import React, { useState } from "react";

/**
 * Adblocker-safe Google Maps Facade Component
 * Prevents Google Maps iframe from auto-firing play.google.com/log and maps/preview/log204
 * telemetry requests on initial page load (which trigger net::ERR_BLOCKED_BY_CLIENT in browsers
 * with Brave Shields, uBlock Origin, or AdBlock).
 */
export default function MapEmbed({
  title = "Smart Solar Solutions Tarapur Location",
  height = "220px",
  borderRadius = "16px",
}) {
  const [showLiveMap, setShowLiveMap] = useState(false);

  const mapsDirectUrl =
    "https://www.google.com/maps/search/?api=1&query=Smart+Solar+Solutions+Near+State+Bank+of+India+Tarapur+Munger+Bihar+813221";
  const embedSrc =
    "https://maps.google.com/maps?q=Tarapur%2C%20Munger%2C%20Bihar%20813221&t=&z=14&ie=UTF8&iwloc=&output=embed";

  if (showLiveMap) {
    return (
      <div
        className="map-facade-active"
        style={{
          position: "relative",
          width: "100%",
          height,
          minHeight: height,
          borderRadius,
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        <iframe
          title={title}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            minHeight: height,
            borderRadius,
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div
      className="map-facade-card"
      style={{
        position: "relative",
        width: "100%",
        minHeight: height,
        borderRadius,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--soft-sage)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-sm)",
          background: "var(--pure-white)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--forest-green)",
          fontSize: "20px",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <i className="fa-solid fa-map-location-dot"></i>
      </div>

      <div>
        <strong
          style={{
            display: "block",
            fontSize: "15px",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}
        >
          Smart Solar Solutions — Tarapur, Munger
        </strong>
        <span
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            display: "block",
            maxWidth: "360px",
            lineHeight: "1.5",
          }}
        >
          Main Road, Near State Bank of India, Tarapur, Munger, Bihar – 813221
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginTop: "4px",
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowLiveMap(true)}
          style={{ padding: "9px 16px", fontSize: "13px" }}
        >
          <i className="fa-solid fa-map"></i> Load Interactive Map
        </button>
        <a
          className="btn btn-outline"
          href={mapsDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "9px 16px", fontSize: "13px" }}
        >
          <i className="fa-solid fa-up-right-from-square"></i> Open in Google
          Maps
        </a>
      </div>
    </div>
  );
}


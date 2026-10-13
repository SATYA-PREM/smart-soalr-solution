import React from "react";
import { CLIENTS_LIST } from "../services/solarService";
import ProgressiveImage from "../components/ProgressiveImage";

export default function Clients() {
  return (
    <main>
      {/* COMPACT EDITORIAL CORPORATE HERO */}
      <section className="gallery-hero compact-hero">
        <div className="container gallery-hero-grid">
          <div>
            <div className="eyebrow left">
              <i className="fa-solid fa-building-columns"></i> INSTITUTIONS &
              COMMERCIAL CLIENTS
            </div>
            <h1>
              Our Worked Stations & <span>Trusted Portfolio</span>
            </h1>
            <p>
              Proudly powering top schools, medical clinics, ITI institutes,
              commercial showrooms, and fuel stations across Tarapur, Munger,
              and Bihar.
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="btn btn-green"
              href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20commercial%20solar%20quote."
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> Commercial Consultation{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* COMPACT CLIENTS PORTFOLIO SECTION */}
      <section className="section customers-portfolio-section compact-section">
        <div className="container reveal show">
          <div className="eyebrow">
            <i className="fa-solid fa-check-double"></i> 100% VERIFIED WORKED
            STATIONS
          </div>
          <h2 className="section-title">Institutions & Businesses We Serve</h2>
          <p className="section-sub">
            Explore the establishments powered by Smart Solar Solutions.
          </p>

          {/* COMPACT 10-CLIENT PORTFOLIO GRID */}
          <div className="client-portfolio-grid compact-client-grid">
            {CLIENTS_LIST.map((client) => (
              <div key={client.id} className="client-card">
                <div
                  className="client-logo-box"
                  style={
                    client.thumb
                      ? {
                          backgroundImage: `url("${client.thumb}")`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : undefined
                  }
                >
                  {client.img ? (
                    <ProgressiveImage
                      src={client.img}
                      thumb={client.thumb}
                      alt={client.name}
                      objectFit="contain"
                    />
                  ) : (
                    <i className={`${client.icon} client-fuel-icon`}></i>
                  )}
                </div>
                <div className="client-card-info">
                  <span className="client-badge">{client.badge}</span>
                  <h3>
                    {client.name}
                    <span className="client-arrow">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </h3>
                  <p>{client.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DEDICATED COMMERCIAL CONSULTATION & REFERENCE REQUEST BOX */}
          <div className="clients-cta-box">
            <div className="clients-cta-copy">
              <div className="eyebrow left">
                <i className="fa-solid fa-bolt"></i> COMMERCIAL & INDUSTRIAL
                SCALE
              </div>
              <h2>
                Planning a commercial project or need more station references?
              </h2>
              <p>
                Get custom engineering design, load calculation, DISCOM
                net-metering assistance, and a full list of 150+ reference
                installations across Bihar.
              </p>
            </div>
            <a
              className="btn btn-green"
              href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20commercial%20quote%20and%20full%20list%20of%20worked%20stations."
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Commercial Quote & List{" "}
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


import React, { useState } from "react";
import { GALLERY_PROJECTS } from "../services/solarService";
import ProgressiveImage from "../components/ProgressiveImage";

export default function Gallery({ openLightbox }) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = GALLERY_PROJECTS.filter((item) => {
    if (filter === "all") return true;
    return item.category.includes(filter);
  });

  return (
    <main>
      {/* COMPACT EDITORIAL PROJECT HERO */}
      <section className="gallery-hero compact-hero">
        <div className="container gallery-hero-grid">
          <div>
            <div className="eyebrow left">
              <i className="fa-solid fa-solar-panel"></i> REAL INSTALLATION
              PORTFOLIO
            </div>
            <h1>
              Explore our <span>solar projects</span>
            </h1>
            <p>
              Browse our completed rooftop solar panel installations, commercial
              solar plants, agricultural solar pumps, and battery storage setups
              across Bihar.
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="btn btn-green"
              href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> Book Site Visit{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* COMPACT ARCHITECTURAL GALLERY GRID SECTION */}
      <section className="section gallery-section compact-section">
        <div className="container">
          {/* SEGMENTED FILTER BAR */}
          <div className="filter-bar">
            {[
              { id: "all", label: "All Projects" },
              { id: "solar", label: "Rooftop Solar" },
              { id: "commercial", label: "Commercial" },
              { id: "pump", label: "Solar Pumps" },
              { id: "battery", label: "Hybrid Backup" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                className={`filter ${filter === btn.id ? "active" : ""}`}
                onClick={() => setFilter(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* COMPACT 7-PROJECT PORTFOLIO GRID */}
          <div className="gallery-grid full-gallery compact-gallery-grid">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="gallery-item"
                onClick={() => openLightbox(filteredProjects, idx)}
                style={{
                  backgroundImage: `url("${proj.thumb}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <ProgressiveImage
                  src={proj.image}
                  thumb={proj.thumb}
                  alt={proj.title}
                />
                <div className="gallery-overlay">
                  <span className="badge">{proj.badge}</span>
                  <h3>
                    {proj.title}
                    <span className="arrow-icon">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </h3>
                  <p>{proj.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DEDICATED SEPARATED MEDIA EXPLORATION BAR */}
          <div className="gallery-bottom-bar">
            <div className="gallery-bottom-copy">
              <div className="eyebrow left">
                <i className="fa-solid fa-camera-retro"></i> 150+ LIVE
                INSTALLATIONS
              </div>
              <h3>Want to see more project videos & photos?</h3>
              <p>
                Request live video walkthroughs of rooftop plants, agricultural
                tube wells, and school solar systems on WhatsApp.
              </p>
            </div>
            <a
              className="btn btn-green"
              href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20please%20send%20more%20installation%20photos%20and%20videos."
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Full Media Library{" "}
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


import React from "react";
import { GALLERY_PROJECTS } from "../services/solarService";
import ProgressiveImage from "../components/ProgressiveImage";

export default function Gallery({ openLightbox }) {
  return (
    <main>
      {/* COMPACT EDITORIAL PROJECT HERO */}
      <section className="gallery-hero compact-hero">
        <div className="container gallery-hero-grid">
          <div>
            <div className="eyebrow left">
              <i className="fa-solid fa-solar-panel"></i> REAL INSTALLATION PORTFOLIO
            </div>
            <h1>
              Explore our <span>solar projects</span>
            </h1>
            <p>
              Browse our live rooftop solar installations, agricultural solar water
              pumps, and commercial power systems across Bihar. Tap any photo or video
              to view enlarged in full resolution.
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="btn btn-youtube"
              href="https://www.youtube.com/@smartsolarsolutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-youtube"></i> Watch on YouTube (@smartsolarsolutions)
            </a>
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

      {/* DYNAMIC MASONRY GALLERY SECTION (TIGHT SPACING, UNCONSTRAINED RATIOS) */}
      <section className="section gallery-section compact-section">
        <div className="container">
          <div className="masonry-gallery">
            {GALLERY_PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                className={`masonry-item ${proj.orientation || "landscape"} ${
                  proj.youtubeId ? "is-video" : ""
                }`}
                onClick={() => openLightbox(GALLERY_PROJECTS, idx)}
                title={proj.title}
              >
                <ProgressiveImage
                  src={proj.image}
                  thumb={proj.thumb}
                  alt={proj.title}
                  loading="lazy"
                  className="masonry-img"
                />

                {proj.youtubeId && (
                  <span className="media-play-pill">
                    <i className="fa-brands fa-youtube"></i> Video
                  </span>
                )}

                <div className="masonry-hover-overlay">
                  <span className="masonry-badge">{proj.shortBadge}</span>
                  <h4 className="masonry-title">{proj.title}</h4>
                  <span className="masonry-expand-btn">
                    <i
                      className={
                        proj.youtubeId
                          ? "fa-brands fa-youtube"
                          : "fa-solid fa-expand"
                      }
                    ></i>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* DEDICATED SEPARATED MEDIA EXPLORATION BAR */}
          <div className="gallery-bottom-bar">
            <div className="gallery-bottom-copy">
              <div className="eyebrow left">
                <i className="fa-brands fa-youtube"></i> OFFICIAL YOUTUBE CHANNEL
              </div>
              <h3>Explore 30+ Project Videos on YouTube</h3>
              <p>
                Subscribe to <b>@smartsolarsolutions</b> for live load tests, customer
                reviews, 3D structure walk-throughs, and step-by-step solar net-metering demonstrations.
              </p>
            </div>
            <div className="gallery-bottom-actions">
              <a
                className="btn btn-youtube"
                href="https://www.youtube.com/@smartsolarsolutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube"></i> Subscribe on YouTube
              </a>
              <a
                className="btn btn-green"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20please%20send%20more%20installation%20photos%20and%20videos."
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


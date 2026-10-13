import React from "react";
import StatsBar from "../components/StatsBar";
import MapEmbed from "../components/MapEmbed";
import ProgressiveImage from "../components/ProgressiveImage";

export default function About() {
  return (
    <main>
      {/* ABOUT HERO */}
      <section className="offers-hero">
        <div className="container offers-hero-grid">
          <div>
            <div className="eyebrow left">
              <i className="fa-solid fa-shield-halved"></i> ABOUT SMART SOLAR
              SOLUTIONS
            </div>
            <h1>
              Engineering clean energy & <span>trusted solar standards</span>
            </h1>
            <p>
              Dedicated to providing high-efficiency rooftop solar systems,
              solar water pumps, and hybrid energy solutions across Tarapur,
              Munger, and Bihar.
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="btn btn-green"
              href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20solar%20consultation."
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* MAIN ABOUT SECTION */}
      <section className="section about">
        <div className="container about-grid reveal show">
          <div
            className="about-img-wrap"
            style={{
              backgroundImage:
                'url("/ChatGPT Image Feb 11, 2026, 12_23_15 PM-thumb.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <ProgressiveImage
              className="about-img"
              src="/ChatGPT Image Feb 11, 2026, 12_23_15 PM.webp"
              thumb="/ChatGPT Image Feb 11, 2026, 12_23_15 PM-thumb.webp"
              alt="Rooftop Solar Installation Tarapur"
              loading="lazy"
            />
            <div className="about-badge">
              <strong>150+</strong>
              <span>Projects Delivered</span>
            </div>
          </div>
          <div className="about-copy">
            <div className="eyebrow left">
              <i className="fa-solid fa-award"></i> OUR MISSION
            </div>
            <h2>Solar planning built around actual site requirements.</h2>
            <p>
              Smart Solar Solutions is a certified solar power contractor
              located near State Bank of India in Tarapur, Munger. We specialize
              in custom solar engineering for residential homes, commercial
              complexes, schools, clinics, petrol pumps, and agricultural tube
              wells.
            </p>
            <p>
              Our expert team handles end-to-end execution: load analysis,
              shadow mapping, structural fabrication, Tier-1 Mono PERC solar
              panels, hybrid inverters, earthing, DISCOM net-metering, and PM
              Surya Ghar Muft Bijli Yojana government subsidy processing.
            </p>

            <div className="checks">
              <span>
                <i className="fa-solid fa-circle-check"></i> Tier-1 Solar Panels
                & Inverters
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> 25-Year Performance
                Warranty
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> PM Surya Ghar
                Subsidy Support
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> On-Grid, Off-Grid &
                Hybrid
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> Agriculture Solar
                Pumps
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> Local Maintenance &
                Service
              </span>
            </div>

            <a
              className="btn btn-primary"
              href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20to%20plan%20a%20solar%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to Our Solar Engineer{" "}
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <StatsBar />

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container reveal show">
          <div className="eyebrow">
            <i className="fa-solid fa-star"></i> WHY CHOOSE SMART SOLAR
          </div>
          <h2 className="section-title">
            The Smart Solar <span>Advantage</span>
          </h2>
          <p className="section-sub">
            Why homeowners, businesses, and institutions across Munger & Bihar
            trust Smart Solar Solutions.
          </p>

          <div className="offer-grid">
            <article className="offer">
              <div className="offer-body">
                <i
                  className="fa-solid fa-screwdriver-wrench"
                  style={{
                    fontSize: "32px",
                    color: "var(--green)",
                    marginBottom: "16px",
                  }}
                ></i>
                <h3>Certified Engineering</h3>
                <p>
                  Proper structure elevation, hot-dip galvanized mounting,
                  shadow-free panel placement, and AC/DC protection boxes for
                  maximum generation.
                </p>
              </div>
            </article>

            <article className="offer">
              <div className="offer-body">
                <i
                  className="fa-solid fa-hand-holding-dollar"
                  style={{
                    fontSize: "32px",
                    color: "var(--green)",
                    marginBottom: "16px",
                  }}
                ></i>
                <h3>Subsidy Facilitation</h3>
                <p>
                  Direct bank subsidy assistance under PM Surya Ghar Muft Bijli
                  Yojana (up to ₹78,000) with hassle-free DISCOM documentation.
                </p>
              </div>
            </article>

            <article className="offer">
              <div className="offer-body">
                <i
                  className="fa-solid fa-headset"
                  style={{
                    fontSize: "32px",
                    color: "var(--green)",
                    marginBottom: "16px",
                  }}
                ></i>
                <h3>Local After-Sales Support</h3>
                <p>
                  Based right here in Tarapur. Quick response times, regular
                  system maintenance, and prompt warranty support whenever you
                  need it.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT INFO & MAP SECTION */}
      <section className="section about-contact-section" id="location">
        <div className="container reveal show">
          <div className="eyebrow">
            <i className="fa-solid fa-map-location-dot"></i> VISIT OUR OFFICE •
            GET IN TOUCH
          </div>
          <h2 className="section-title">
            Contact & <span>Office Location</span>
          </h2>
          <p className="section-sub">
            Have questions regarding solar installation, PM Surya Ghar subsidy,
            or site visits? Visit our office in Tarapur or call our solar
            engineers directly.
          </p>

          <div className="about-contact-grid">
            <div className="about-contact-cards">
              <div className="about-contact-card">
                <div className="acc-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4>Head Office Address</h4>
                  <p>
                    Smart Solar Solutions, Main Road, Near State Bank of India,
                    Tarapur, Munger, Bihar – 813221
                  </p>
                </div>
              </div>

              <div className="about-contact-card">
                <div className="acc-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4>Phone & Consultation</h4>
                  <p>
                    <a href="tel:+919931798080">+91 9931798080</a> /{" "}
                    <a href="tel:+917049798080">+91 7049798080</a>
                  </p>
                  <small
                    style={{
                      color: "var(--muted)",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    Direct Engineer Support: 9:00 AM – 7:00 PM
                  </small>
                </div>
              </div>

              <div className="about-contact-card">
                <div className="acc-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4>Email & Official Inquiries</h4>
                  <p>
                    <a href="mailto:smartsolartrp@gmail.com">
                      smartsolartrp@gmail.com
                    </a>
                  </p>
                  <small
                    style={{
                      color: "var(--muted)",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    Send commercial tenders & institutional queries
                  </small>
                </div>
              </div>

              <div className="about-contact-card">
                <div className="acc-icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                  <small
                    style={{
                      color: "var(--muted)",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    Sunday: Site Visits by Prior Appointment
                  </small>
                </div>
              </div>

              <a
                className="btn btn-green"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20to%20visit%20your%20office%20or%20get%20a%20site%20inspection."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  textAlign: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <i className="fa-brands fa-whatsapp"></i> Chat with Solar
                Engineer on WhatsApp
              </a>
            </div>

            <div className="about-map-box">
              <MapEmbed
                title="Smart Solar Solutions Location Map"
                height="420px"
                borderRadius="16px"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import MapEmbed from "../components/MapEmbed";
import ProgressiveImage from "../components/ProgressiveImage";
import {
  HERO_SLIDES,
  CLIENTS_LIST,
  GALLERY_PROJECTS,
  FAQ_DATA,
  PROCESS_STEPS,
  calculateSolarMetrics,
  buildLeadWhatsappUrl,
} from "../services/solarService";

export default function Home({ openLightbox }) {
  const location = useLocation();

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Trusted Portfolio Mobile Expand State
  const [showAllPartners, setShowAllPartners] = useState(false);

  // Solar Calculator State
  const [selectedType, setSelectedType] = useState("Home Solar");
  const [bill, setBill] = useState(3000);

  // Gallery Glimpse Carousel State
  const [glimpseIndex, setGlimpseIndex] = useState(0);
  const glimpseTrackRef = useRef(null);

  // Mobile Process Step State
  const [activeProcessStep, setActiveProcessStep] = useState(1);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Home Solar (On-Grid / Hybrid)",
    load: "",
    message: "",
  });

  // Scroll to hash section (#calculator or #contact) if present
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  // Hero Slider Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Real Solar Calculator Metrics from Service Layer
  const { kwDisplay, area, annualSavings, subsidyText, payback, calcWaHref } =
    calculateSolarMetrics(bill, selectedType);

  // Glimpse Carousel Projects
  const glimpseProjects = GALLERY_PROJECTS.filter((p) => p.inGlimpse);

  const handleGlimpseSlide = (direction) => {
    let visibleCount = 3;
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 600) visibleCount = 1;
      else if (window.innerWidth <= 900) visibleCount = 2;
    }
    const maxIndex = Math.max(0, glimpseProjects.length - visibleCount);
    setGlimpseIndex((prev) => {
      const next = prev + direction;
      if (next > maxIndex) return 0;
      if (next < 0) return maxIndex;
      return next;
    });
  };

  // Lead Form Submission
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const url = buildLeadWhatsappUrl(formData);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeSlideObj = HERO_SLIDES[currentSlide] || HERO_SLIDES[0];

  return (
    <main>
      {/* HERO SECTION — ARCHITECTURAL EDITORIAL SPLIT */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow left">
              <i className="fa-solid fa-solar-panel"></i> SMART SOLAR SOLUTIONS • #1 SOLAR EPC CONTRACTOR IN BIHAR
            </div>
            <h1>
              Power your property with <span>Smart Solar Solutions.</span>
            </h1>
            <p>
              Bihar's trusted leader for high-efficiency rooftop solar installations,
              PM Surya Ghar subsidy approvals up to ₹78,000, solar water pumps,
              and hybrid energy storage. Custom engineered for homes, commercial
              complexes, and agriculture across Tarapur, Munger & Bihar.
            </p>
            <div className="actions">
              <a
                className="btn btn-primary"
                href="#calculator"
                onClick={(e) => scrollToSection(e, "calculator")}
              >
                <i className="fa-solid fa-calculator"></i> Solar Calculator
              </a>
              <a
                className="btn btn-outline"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20solar%20system%20quotation."
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i> Get Free Quotation
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <i className="fa-solid fa-circle-check"></i> 50+ Installations Across Bihar
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> PM Surya Ghar Subsidy (Up to ₹78k)
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> Tier-1 Tech & 25-Yr Warranty
              </span>
              <span>
                <i className="fa-solid fa-circle-check"></i> 24/7 Dedicated Support
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div
              className="hero-slider"
              id="heroSlider"
              style={{
                backgroundImage: `url("${activeSlideObj.thumb}")`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              {HERO_SLIDES.map((slide, idx) => (
                <ProgressiveImage
                  key={idx}
                  className={`hero-slide ${
                    idx === currentSlide ? "active" : ""
                  }`}
                  src={slide.src}
                  thumb={slide.thumb}
                  alt={slide.alt}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              ))}
              <div className="hero-slider-overlay"></div>
              <div className="hero-slider-dots" id="heroDots">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Slide ${idx + 1}`}
                    className={idx === currentSlide ? "active" : ""}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
            </div>

            {/* THUMBNAIL STRIP VIEW UNDER THE FULL HERO IMAGE */}
            <div className="hero-thumb-strip" aria-label="Slide Thumbnails">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hero-thumb-btn ${
                    idx === currentSlide ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`View ${slide.alt}`}
                >
                  <img
                    src={slide.thumb}
                    alt={slide.alt}
                    loading="eager"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <StatsBar />

      {/* TRUSTED PORTFOLIO SECTION */}
      <section className="section customers" id="portfolio">
        <div className="container reveal show">
          <div className="eyebrow">
            <i className="fa-solid fa-building-columns"></i> TRUSTED PORTFOLIO
          </div>
          <h2 className="section-title">Institutions & Businesses We Serve</h2>
          <p className="section-sub">
            Trusted by leading schools, clinics, institutions, and commercial
            establishments across the region.
          </p>

          <div
            className={`customer-grid ${showAllPartners ? "show-all" : ""}`}
            id="customerGrid"
          >
            {CLIENTS_LIST.map((client) => (
              <div
                key={client.id}
                className={`customer ${
                  !client.alwaysVisibleOnHome ? "customer-item-more" : ""
                }`}
              >
                {client.img ? (
                  <ProgressiveImage
                    src={client.img}
                    thumb={client.thumb}
                    alt={client.name}
                    objectFit="contain"
                  />
                ) : (
                  <i
                    className={client.icon}
                    style={{
                      fontSize: "28px",
                      color: "var(--green)",
                      marginBottom: "8px",
                    }}
                  ></i>
                )}
                <b>{client.name}</b>
              </div>
            ))}
          </div>

          <div className="partner-actions-row">
            <button
              className="toggle-partners-btn"
              id="togglePartnersBtn"
              onClick={() => setShowAllPartners((prev) => !prev)}
            >
              {showAllPartners ? (
                <>
                  View Less Partners <i className="fa-solid fa-chevron-up"></i>
                </>
              ) : (
                <>
                  View More Partners{" "}
                  <i className="fa-solid fa-chevron-down"></i>
                </>
              )}
            </button>
            <Link className="btn btn-outline" to="/clients">
              View All Worked Stations & Clients{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SOLAR CALCULATOR SECTION */}
      <section className="section calculator-section" id="calculator">
        <div className="container">
          <div className="eyebrow">
            <i className="fa-solid fa-chart-line"></i> INSTANT ESTIMATOR
          </div>
          <h2 className="section-title">
            Calculate Your <span>Solar Savings & Capacity</span>
          </h2>
          <p className="section-sub">
            Slide your monthly electricity bill to see real capacity sizing,
            roof area, DISCOM savings, government subsidy, and payback period.
          </p>

          <div className="calc-container">
            <div className="calc-grid">
              <div className="calc-form">
                <h3>1. Select Application & Electricity Usage</h3>

                <div className="calc-field">
                  <label>Application Type</label>
                  <div className="calc-type-selector">
                    {[
                      { label: "Residential", type: "Home Solar" },
                      { label: "Commercial", type: "Commercial Solar" },
                      { label: "Solar Pump", type: "Solar Pump" },
                      { label: "Mill / Machine", type: "Mill Solar" },
                    ].map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        className={`type-btn ${
                          selectedType === item.type ? "active" : ""
                        }`}
                        onClick={() => setSelectedType(item.type)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-field">
                  <label>
                    Average Monthly Bill:{" "}
                    <span id="billDisplay">
                      ₹{bill.toLocaleString("en-IN")}
                    </span>
                  </label>
                  <input
                    type="range"
                    id="billSlider"
                    className="calc-slider"
                    min="1000"
                    max="30000"
                    step="500"
                    value={bill}
                    onChange={(e) => setBill(parseInt(e.target.value, 10))}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "var(--muted)",
                      fontSize: "12px",
                      marginTop: "6px",
                    }}
                  >
                    <span>₹1,000/mo</span>
                    <span>₹15,000/mo</span>
                    <span>₹30,000+/mo</span>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "var(--muted)" }}>
                  <i
                    className="fa-solid fa-circle-info"
                    style={{ color: "var(--green)" }}
                  ></i>{" "}
                  Real calculations based on Bihar DISCOM tariff (avg
                  ₹7.5/kWh), regional solar generation (4 kWh/kW/day), and PM
                  Surya Ghar subsidy rules.
                </p>
              </div>

              <div className="calc-result-card">
                <div className="calc-result-head">Real Data Solar Solution</div>
                <div className="calc-result-main">
                  <strong id="calcKw">{kwDisplay} kW</strong>
                  <span>Recommended Solar Power System</span>
                </div>

                <div className="calc-stats-list">
                  <div className="calc-stat-item">
                    <b id="calcArea">{area} sq.ft</b>
                    <small>Roof Space Required</small>
                  </div>
                  <div className="calc-stat-item">
                    <b id="calcSavings">
                      ₹{annualSavings.toLocaleString("en-IN")}
                    </b>
                    <small>Estimated Yearly Savings</small>
                  </div>
                  <div className="calc-stat-item">
                    <b id="calcSubsidy" style={{ color: "var(--yellow)" }}>
                      {subsidyText}
                    </b>
                    <small>PM Surya Ghar Subsidy*</small>
                  </div>
                  <div className="calc-stat-item">
                    <b id="calcPayback">{payback}</b>
                    <small>Est. Payback Period</small>
                  </div>
                </div>

                <a
                  id="calcWhatsappBtn"
                  className="btn btn-green calc-cta"
                  href={calcWaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i> Get Custom Quote for
                  this System
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE GALLERY CAROUSEL GLIMPSE */}
      <section className="section gallery-glimpse-section" id="gallery-preview">
        <div className="container reveal show">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow left">
                <i className="fa-solid fa-images"></i> PROJECT GALLERY GLIMPSE
              </div>
              <h2 className="section-title left-title">
                Move through our <span>real installations</span>
              </h2>
            </div>
            <div className="glimpse-controls">
              <button
                className="glimpse-btn"
                id="glimpsePrev"
                aria-label="Previous Project"
                onClick={() => handleGlimpseSlide(-1)}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="glimpse-btn"
                id="glimpseNext"
                aria-label="Next Project"
                onClick={() => handleGlimpseSlide(1)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="gallery-glimpse-track-wrap">
            <div
              className="gallery-glimpse-track"
              id="glimpseTrack"
              ref={glimpseTrackRef}
              style={{
                transform: `translateX(-${glimpseIndex * 340}px)`,
              }}
            >
              {glimpseProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="glimpse-card gallery-item"
                  onClick={() => openLightbox(glimpseProjects, idx)}
                  style={{
                    backgroundImage: `url("${proj.thumb}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <ProgressiveImage
                    src={proj.image}
                    thumb={proj.thumb}
                    alt={proj.shortTitle}
                  />
                  <div className="gallery-info">
                    <small>{proj.shortBadge}</small>
                    <h3>{proj.shortTitle}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="center-action">
            <Link className="btn btn-outline" to="/gallery">
              View Full Project Gallery{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="section reveal show" id="solutions">
        <div className="container">
          <div className="eyebrow">
            <i className="fa-solid fa-solar-panel"></i> SOLAR SOLUTIONS
          </div>
          <h2 className="section-title">
            Choose the system that fits your needs
          </h2>
          <p className="section-sub">
            Explore tailored solar power solutions for home, business,
            agriculture, and high-load industrial machinery.
          </p>

          <div className="offer-grid">
            <article className="offer">
              <div
                className="offer-media"
                style={{
                  backgroundImage:
                    'url("/ChatGPT Image Feb 12, 2026, 01_31_12 PM-thumb.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <ProgressiveImage
                  src="/ChatGPT Image Feb 12, 2026, 01_31_12 PM.webp"
                  thumb="/ChatGPT Image Feb 12, 2026, 01_31_12 PM-thumb.webp"
                  alt="Domestic Solar System for Homes"
                />
                <span className="offer-tag">RESIDENTIAL</span>
              </div>
              <div className="offer-body">
                <h3>Domestic Solar Systems</h3>
                <p>
                  1kW to 5kW+ rooftop systems for home lighting, fans, TVs,
                  refrigerators, and air conditioners with hybrid backup
                  options.
                </p>
                <Link className="mini-link" to="/offer?service=home">
                  View Residential Packages{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            <article className="offer">
              <div
                className="offer-media"
                style={{
                  backgroundImage:
                    'url("/ChatGPT Image Feb 13, 2026, 11_33_56 PM-thumb.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <ProgressiveImage
                  src="/ChatGPT Image Feb 13, 2026, 11_33_56 PM.webp"
                  thumb="/ChatGPT Image Feb 13, 2026, 11_33_56 PM-thumb.webp"
                  alt="Commercial Solar Power Plant"
                />
                <span className="offer-tag">COMMERCIAL</span>
              </div>
              <div className="offer-body">
                <h3>Commercial & Industrial Solar</h3>
                <p>
                  5kW to 50kW+ solar plants designed for shops, schools,
                  hospitals, petrol pumps, showrooms, and factories to
                  drastically cut daytime power costs.
                </p>
                <Link className="mini-link" to="/offer?service=business">
                  View Commercial Packages{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            <article className="offer">
              <div
                className="offer-media"
                style={{
                  backgroundImage:
                    'url("/ChatGPT Image Feb 11, 2026, 12_12_02 PM-thumb.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <ProgressiveImage
                  src="/ChatGPT Image Feb 11, 2026, 12_12_02 PM.webp"
                  thumb="/ChatGPT Image Feb 11, 2026, 12_12_02 PM-thumb.webp"
                  alt="Solar Water Pump Agriculture"
                />
                <span className="offer-tag">AGRICULTURE</span>
              </div>
              <div className="offer-body">
                <h3>Solar Water Pumps</h3>
                <p>
                  1HP to 5HP+ agricultural solar pumping systems for deep bore
                  wells, tube wells, and continuous farm irrigation without
                  diesel engines.
                </p>
                <Link className="mini-link" to="/offer?service=pump">
                  View Solar Pump Packages{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>
          </div>
          <div className="center-action">
            <Link className="btn btn-primary" to="/offer">
              Explore All 6 Solar Offerings{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT BANNER LINK */}
      <section className="section about-banner-section">
        <div className="container reveal show">
          <div className="about-banner-card">
            <div>
              <div className="eyebrow left">
                <i className="fa-solid fa-shield-halved"></i> ABOUT SMART SOLAR
                SOLUTIONS
              </div>
              <h2>
                Engineering clean energy & trusted solar standards in Bihar
              </h2>
              <p>
                Learn more about our company background, certified engineering
                standards, 50+ completed projects, and 24/7 support in
                Tarapur, Munger & Bihar.
              </p>
            </div>
            <Link className="btn btn-green" to="/about">
              Read Our Story <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="section reveal show">
        <div className="container">
          <div className="eyebrow">
            <i className="fa-solid fa-list-check"></i> HOW IT WORKS
          </div>
          <h2 className="section-title">
            From requirement to lifelong solar power
          </h2>
          <p className="section-sub">
            Our streamlined 4-step process ensures hassle-free solar
            installation for your property.
          </p>

          {/* DESKTOP GRID */}
          <div className="process-grid">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process">
                <div className="num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* COMPACT INTERACTIVE MOBILE PROCESS STEP CONTAINER */}
          <div className="process-mobile-container">
            <div className="process-step-nav">
              {PROCESS_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`p-step-btn ${
                    activeProcessStep === idx + 1 ? "active" : ""
                  }`}
                  onClick={() => setActiveProcessStep(idx + 1)}
                >
                  Step {step.num}
                </button>
              ))}
            </div>
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`p-step-content ${
                  activeProcessStep === idx + 1 ? "active" : ""
                }`}
              >
                <div className="num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="eyebrow">
            <i className="fa-solid fa-circle-question"></i> FREQUENTLY ASKED
            QUESTIONS
          </div>
          <h2 className="section-title">
            Got questions about <span>Solar Power?</span>
          </h2>
          <p className="section-sub">
            Find clear answers to common questions about solar installations,
            costs, savings, and subsidies in Bihar.
          </p>

          <div className="faq-container">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  >
                    <span>{item.question}</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <div className="faq-answer">
                    {item.answerHtml ? (
                      <p
                        dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                      />
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section contact" id="contact">
        <div className="container contact-grid reveal show">
          <div className="contact-card">
            <div className="eyebrow left">
              <i className="fa-solid fa-headset"></i> GET IN TOUCH
            </div>
            <h3>Let's plan your solar power system</h3>

            <div className="contact-row">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <strong>Main Store & Office</strong>
                <span>
                  Near State Bank of India, Tarapur (813221), Munger, Bihar
                </span>
              </div>
            </div>

            <div className="contact-row">
              <i className="fa-solid fa-phone"></i>
              <div>
                <strong>Call Our Experts</strong>
                <span>+91 9931798080 · +91 7049798080</span>
              </div>
            </div>

            <div className="contact-row">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <strong>Email Inquiries</strong>
                <span>smartsolartrp@gmail.com</span>
              </div>
            </div>

            <div className="contact-row">
              <i className="fa-solid fa-clock"></i>
              <div>
                <strong>Working Hours</strong>
                <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
              </div>
            </div>

            <MapEmbed
              title="Smart Solar Solutions Tarapur Location"
              height="220px"
              borderRadius="16px"
            />
          </div>

          <div className="form-card">
            <h3>Request a Consultation & Quote</h3>
            <form id="leadForm" onSubmit={handleLeadSubmit}>
              <div className="form-grid">
                <label className="full">
                  Your Name
                  <input
                    id="name"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+91 Mobile Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </label>
                <label>
                  System Application
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  >
                    <option>Home Solar (On-Grid / Hybrid)</option>
                    <option>Commercial Solar (Business / School)</option>
                    <option>Solar Water Pump (Agriculture)</option>
                    <option>Battery Backup System</option>
                    <option>Atta Chakki / Rice Mill Solar</option>
                  </select>
                </label>
                <label className="full">
                  Approx. Load / Requirement
                  <input
                    id="load"
                    placeholder="e.g. 3kW system / 5HP pump / ₹4000 monthly bill"
                    value={formData.load}
                    onChange={(e) =>
                      setFormData({ ...formData, load: e.target.value })
                    }
                  />
                </label>
                <label className="full">
                  Message / Appliance Details
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about appliances (ACs, motors, lights) or roof size..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </label>
                <button className="btn btn-primary full" type="submit">
                  Send Inquiry on WhatsApp{" "}
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

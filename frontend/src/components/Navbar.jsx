import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ theme, toggleTheme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleThemeToggle = toggleTheme || onToggleTheme;

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleHashLink = (e, hashId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/#" + hashId);
    } else {
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={() => setMobileMenuOpen(false)}>
          <img
            src="/logo smart.webp"
            alt="Smart Solar Solutions Logo"
            style={{
              backgroundImage: 'url("/logo smart-thumb.webp")',
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="brand-text">
            <strong>Smart Solar Solutions</strong>
            <small>Authorized Solar Partner</small>
          </div>
        </Link>

        {/* Centered Desktop Navigation & Mobile Drawer */}
        <nav
          className={`nav-links ${mobileMenuOpen ? "open" : ""}`}
          id="navLinks"
          aria-label="Main Navigation"
        >
          <Link
            className={isActive("/") ? "active" : ""}
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="/#calculator"
            onClick={(e) => handleHashLink(e, "calculator")}
          >
            Calculator
          </a>
          <Link
            className={isActive("/about") ? "active" : ""}
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            className={isActive("/offer") ? "active" : ""}
            to="/offer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Offers
          </Link>
          <Link
            className={isActive("/gallery") ? "active" : ""}
            to="/gallery"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            className={isActive("/clients") ? "active" : ""}
            to="/clients"
            onClick={() => setMobileMenuOpen(false)}
          >
            Clients
          </Link>
          <a href="/#contact" onClick={(e) => handleHashLink(e, "contact")}>
            Contact
          </a>

          {/* WhatsApp CTA inside mobile drawer */}
          <a
            className="wa nav-mobile-cta"
            href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20solar%20system%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </nav>

        {/* Right Actions: Theme Toggle + Desktop WhatsApp + Mobile Menu Toggle */}
        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            id="themeToggleBtn"
            aria-label="Toggle Theme"
            onClick={handleThemeToggle}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <i
              className={
                theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"
              }
            ></i>
          </button>

          <a
            className="wa nav-desktop-cta"
            href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20a%20solar%20system%20consultation."
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </a>

          <button
            className="menu"
            id="menuBtn"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}

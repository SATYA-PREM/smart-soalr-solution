import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashLink = (e, hashId) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#" + hashId);
    } else {
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="/logo smart.webp"
            alt="Smart Solar Solutions Logo"
            loading="lazy"
            style={{
              backgroundImage: 'url("/logo smart-thumb.webp")',
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <h3>Smart Solar Solutions</h3>
          <p>
            Reliable solar energy solutions for residential, agricultural,
            commercial, and industrial clients across Bihar.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a
                href="/#calculator"
                onClick={(e) => handleHashLink(e, "calculator")}
              >
                Solar Calculator
              </a>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/offer">Solar Offers</Link>
            </li>
            <li>
              <Link to="/gallery">Project Gallery</Link>
            </li>
            <li>
              <Link to="/clients">Clients Portfolio</Link>
            </li>
            <li>
              <a href="/#contact" onClick={(e) => handleHashLink(e, "contact")}>
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Our Solutions</h4>
          <ul>
            <li>Rooftop Solar Installation</li>
            <li>Battery Storage Systems</li>
            <li>Hybrid Inverters</li>
            <li>Solar Water Pumps</li>
            <li>Atta Chakki VFD Solar</li>
            <li>DISCOM Net Metering</li>
          </ul>
        </div>
        <div>
          <h4>Contact Info</h4>
          <ul>
            <li>
              <i className="fa-solid fa-phone"></i> +91 9931798080
            </li>
            <li>
              <i className="fa-solid fa-phone"></i> +91 7049798080
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i> smartsolartrp@gmail.com
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i> Tarapur, Munger,
              Bihar - 813221
            </li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        <div>
          © 2026 Smart Solar Solutions. All rights reserved. | Optimized for
          Fast & Clean Solar Energy.
        </div>
        <div className="copyright-links">
          <Link to="/privacy-policy">Privacy Policy</Link> •{" "}
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}


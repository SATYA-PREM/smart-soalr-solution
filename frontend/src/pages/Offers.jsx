import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Offers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialService = searchParams.get("service") || "home";
  const [activeTab, setActiveTab] = useState(initialService);

  useEffect(() => {
    const paramService = searchParams.get("service");
    if (
      paramService &&
      ["home", "business", "pump", "backup", "subsidy", "mill"].includes(
        paramService
      )
    ) {
      setActiveTab(paramService);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ service: tabId });
  };

  return (
    <>
      <section className="offers-hero">
        <div className="container offers-hero-grid">
          <div>
            <div className="eyebrow left">
              <i className="fa-solid fa-solar-panel"></i> SOLAR OFFER CATALOGUE
            </div>
            <h1>
              Find the right solar system for <span>your application</span>
            </h1>
            <p>
              Explore practical configurations for homes, businesses, farms,
              battery backup, and machine-driven applications. Compare capacity,
              use cases, and planning references.
            </p>
          </div>
          <div className="hero-badge">
            <strong>6+</strong>
            <span>Solution categories</span>
          </div>
        </div>
      </section>

      <main className="container offers-layout">
        <aside className="sidebar">
          <h3>Solar Services</h3>
          <button
            className={`tab ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleTabChange("home")}
          >
            <i className="fa-solid fa-house"></i> Domestic Solar
          </button>
          <button
            className={`tab ${activeTab === "business" ? "active" : ""}`}
            onClick={() => handleTabChange("business")}
          >
            <i className="fa-solid fa-building"></i> Commercial Solar
          </button>
          <button
            className={`tab ${activeTab === "pump" ? "active" : ""}`}
            onClick={() => handleTabChange("pump")}
          >
            <i className="fa-solid fa-droplet"></i> Solar Pump
          </button>
          <button
            className={`tab ${activeTab === "backup" ? "active" : ""}`}
            onClick={() => handleTabChange("backup")}
          >
            <i className="fa-solid fa-battery-half"></i> Battery Backup
          </button>
          <button
            className={`tab ${activeTab === "subsidy" ? "active" : ""}`}
            onClick={() => handleTabChange("subsidy")}
          >
            <i className="fa-solid fa-sun"></i> Solar Without Battery
          </button>
          <button
            className={`tab ${activeTab === "mill" ? "active" : ""}`}
            onClick={() => handleTabChange("mill")}
          >
            <i className="fa-solid fa-gears"></i> Atta Chakki / Rice Mill
          </button>
        </aside>

        <section className="offers-content">
          {/* HOME SOLAR */}
          <div
            className={`panel ${activeTab === "home" ? "active" : ""}`}
            id="home"
          >
            <div className="panel-head">
              <div>
                <div className="eyebrow left">RESIDENTIAL</div>
                <h2>Domestic Solar Systems</h2>
                <p>
                  On-grid, hybrid, and backup-oriented rooftop configurations
                  based on power availability and home load.
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <span className="badge">Small Homes</span>
                <h3>1kW System</h3>
                <div className="specs">
                  <p>
                    <b>Generation:</b> 4–5 Units/day
                  </p>
                  <p>
                    <b>Roof Area:</b> ~100 sq.ft
                  </p>
                  <p>
                    <b>Inverter:</b> On-Grid / Hybrid
                  </p>
                </div>
                <h4>Runs</h4>
                <ul>
                  <li>Fans & Lights</li>
                  <li>TV + Laptop + WiFi</li>
                  <li>Mobile Charging</li>
                </ul>
                <div className="green-note">1–2 Batteries Supported</div>
              </div>

              <div className="card">
                <span className="badge">1BHK Homes</span>
                <h3>1.5kW System</h3>
                <div className="specs">
                  <p>
                    <b>Generation:</b> 6–7 Units/day
                  </p>
                  <p>
                    <b>Roof Area:</b> 150 sq.ft
                  </p>
                  <p>
                    <b>Inverter:</b> Hybrid
                  </p>
                </div>
                <h4>Runs</h4>
                <ul>
                  <li>Full Lighting & Fans</li>
                  <li>Refrigerator</li>
                  <li>0.5 HP Water Pump</li>
                </ul>
                <div className="green-note">2–4 Battery Backup Ready</div>
              </div>

              <div className="card">
                <span className="badge">Small Families</span>
                <h3>2kW System</h3>
                <div className="specs">
                  <p>
                    <b>Generation:</b> 8–10 Units/day
                  </p>
                  <p>
                    <b>Roof Area:</b> 200 sq.ft
                  </p>
                  <p>
                    <b>Inverter:</b> Hybrid
                  </p>
                </div>
                <h4>Runs</h4>
                <ul>
                  <li>Refrigerator + Cooler</li>
                  <li>Washing Machine (Day)</li>
                  <li>Complete Lighting</li>
                </ul>
                <div className="green-note">Full Night Backup Possible</div>
              </div>

              <div className="card highlight">
                <span className="badge">Most Popular</span>
                <h3>3kW System</h3>
                <div className="specs">
                  <p>
                    <b>Generation:</b> 12–15 Units/day
                  </p>
                  <p>
                    <b>Roof Area:</b> 300 sq.ft
                  </p>
                  <p>
                    <b>Inverter:</b> Hybrid
                  </p>
                </div>
                <h4>Runs</h4>
                <ul>
                  <li>1 Ton AC (Daytime)</li>
                  <li>Fridge + Washing Machine</li>
                  <li>Complete Home Load</li>
                </ul>
                <div className="green-note">PM Surya Ghar Subsidy ₹78,000*</div>
              </div>

              <div className="card">
                <span className="badge">Large Homes</span>
                <h3>5kW System</h3>
                <div className="specs">
                  <p>
                    <b>Generation:</b> 20–25 Units/day
                  </p>
                  <p>
                    <b>Roof Area:</b> 500 sq.ft
                  </p>
                  <p>
                    <b>Inverter:</b> Hybrid
                  </p>
                </div>
                <h4>Runs</h4>
                <ul>
                  <li>2 ACs (Daytime)</li>
                  <li>Water Motor</li>
                  <li>Kitchen Appliances</li>
                </ul>
                <div className="green-note">Full House Night Backup</div>
              </div>
            </div>
            <div className="panel-cta">
              <div>
                <b>Not sure which size you need?</b>
                <p>
                  Tell us your appliances and we will design the optimal
                  configuration.
                </p>
              </div>
              <a
                className="cta"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20need%20a%20domestic%20solar%20recommendation."
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Recommendation
              </a>
            </div>
          </div>

          {/* COMMERCIAL SOLAR */}
          <div
            className={`panel ${activeTab === "business" ? "active" : ""}`}
            id="business"
          >
            <div className="panel-head">
              <div>
                <div className="eyebrow left">BUSINESS & INDUSTRY</div>
                <h2>Commercial Solar Systems</h2>
                <p>
                  Designed for daytime power consumption at shops, schools,
                  hospitals, petrol pumps, and factories.
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <span className="badge">Small Commercial</span>
                <h3>5kW Plant</h3>
                <div className="specs">
                  <p>
                    <b>Panels:</b> 9–10 × 550W Mono PERC
                  </p>
                  <p>
                    <b>Generation:</b> 20–25 Units/day
                  </p>
                  <p>
                    <b>Area:</b> ~500 sq.ft
                  </p>
                  <p>
                    <b>Connection:</b> Single / Three Phase
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Retail Shops</li>
                  <li>Clinics & Labs</li>
                  <li>Small Offices</li>
                  <li>Computer Centers</li>
                </ul>
                <div className="green-note">Net Metering Supported</div>
              </div>

              <div className="card highlight">
                <span className="badge">Most Installed</span>
                <h3>10kW Plant</h3>
                <div className="specs">
                  <p>
                    <b>Panels:</b> 18–20 × 550W
                  </p>
                  <p>
                    <b>Generation:</b> 40–50 Units/day
                  </p>
                  <p>
                    <b>Area:</b> ~1000 sq.ft
                  </p>
                  <p>
                    <b>Connection:</b> 3 Phase Recommended
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Petrol Pumps</li>
                  <li>Schools & Colleges</li>
                  <li>Showrooms</li>
                  <li>Restaurants</li>
                </ul>
                <div className="green-note">Fast ROI Category</div>
              </div>

              <div className="card">
                <span className="badge">Medium Industry</span>
                <h3>20kW Plant</h3>
                <div className="specs">
                  <p>
                    <b>Panels:</b> 36–40 × 550W
                  </p>
                  <p>
                    <b>Generation:</b> 80–100 Units/day
                  </p>
                  <p>
                    <b>Area:</b> ~2000 sq.ft
                  </p>
                  <p>
                    <b>Connection:</b> 3 Phase
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Cold Storage</li>
                  <li>Workshops</li>
                  <li>Marriage Halls</li>
                  <li>Small Factories</li>
                </ul>
                <div className="green-note">Industrial Meter Compatible</div>
              </div>

              <div className="card">
                <span className="badge">Heavy Load</span>
                <h3>50kW+ Plant</h3>
                <div className="specs">
                  <p>
                    <b>Generation:</b> 200+ Units/day
                  </p>
                  <p>
                    <b>Area:</b> 4500+ sq.ft
                  </p>
                  <p>
                    <b>Connection:</b> HT / LT Industrial Line
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Rice Mills</li>
                  <li>Flour Mills</li>
                  <li>Manufacturing Units</li>
                  <li>Warehouses</li>
                </ul>
                <div className="green-note">Custom Engineering Design</div>
              </div>
            </div>
            <div className="panel-cta">
              <div>
                <b>Planning a commercial installation?</b>
                <p>
                  Share your current load and operating hours for a detailed
                  proposal.
                </p>
              </div>
              <a
                className="cta"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20need%20a%20commercial%20solar%20proposal."
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss Commercial Solar
              </a>
            </div>
          </div>

          {/* SOLAR PUMP */}
          <div
            className={`panel ${activeTab === "pump" ? "active" : ""}`}
            id="pump"
          >
            <div className="panel-head">
              <div>
                <div className="eyebrow left">AGRICULTURE</div>
                <h2>Solar Water Pump Systems</h2>
                <p>
                  Solar-powered irrigation options for farms, tube wells, and
                  continuous agricultural water pumping.
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <span className="badge">Small Farms</span>
                <h3>1HP Solar Pump</h3>
                <div className="specs">
                  <p>
                    <b>Water Output:</b> 25,000–35,000 L/day
                  </p>
                  <p>
                    <b>Depth:</b> up to 70–80 ft
                  </p>
                  <p>
                    <b>Panels:</b> ~1kW Array
                  </p>
                  <p>
                    <b>Motor:</b> DC / AC Submersible
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Vegetable Farming</li>
                  <li>Drip Irrigation</li>
                  <li>Small Bore Wells</li>
                </ul>
                <div className="green-note">Site-dependent sizing</div>
              </div>

              <div className="card">
                <span className="badge">Regular Farming</span>
                <h3>2HP Solar Pump</h3>
                <div className="specs">
                  <p>
                    <b>Water Output:</b> 40,000–60,000 L/day
                  </p>
                  <p>
                    <b>Depth:</b> up to 120 ft
                  </p>
                  <p>
                    <b>Panels:</b> ~2kW Array
                  </p>
                  <p>
                    <b>Motor:</b> AC Submersible
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Wheat & Crop Fields</li>
                  <li>Medium Agriculture Land</li>
                </ul>
                <div className="green-note">No Diesel Expense</div>
              </div>

              <div className="card highlight">
                <span className="badge">Most Installed</span>
                <h3>3HP Solar Pump</h3>
                <div className="specs">
                  <p>
                    <b>Water Output:</b> 70,000–90,000 L/day
                  </p>
                  <p>
                    <b>Depth:</b> up to 180 ft
                  </p>
                  <p>
                    <b>Panels:</b> ~3kW Array
                  </p>
                  <p>
                    <b>Motor:</b> AC Submersible
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Paddy Fields</li>
                  <li>Large Farms</li>
                  <li>Deep Tube Wells</li>
                </ul>
                <div className="green-note">High Performance Pump</div>
              </div>

              <div className="card">
                <span className="badge">Heavy Irrigation</span>
                <h3>5HP Solar Pump</h3>
                <div className="specs">
                  <p>
                    <b>Water Output:</b> 1,00,000+ L/day
                  </p>
                  <p>
                    <b>Depth:</b> up to 250 ft
                  </p>
                  <p>
                    <b>Panels:</b> ~5kW Array
                  </p>
                  <p>
                    <b>Motor:</b> High Capacity Submersible
                  </p>
                </div>
                <h4>Suitable For</h4>
                <ul>
                  <li>Continuous Irrigation</li>
                  <li>Multiple Acre Farming</li>
                </ul>
                <div className="green-note">Site Assessment Required</div>
              </div>
            </div>
            <div className="panel-cta">
              <div>
                <b>Need a farm-specific pump?</b>
                <p>Share your HP, bore depth, and water requirement.</p>
              </div>
              <a
                className="cta"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20need%20a%20solar%20pump%20quote."
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Pump Advice
              </a>
            </div>
          </div>

          {/* BATTERY BACKUP */}
          <div
            className={`panel ${activeTab === "backup" ? "active" : ""}`}
            id="backup"
          >
            <div className="panel-head">
              <div>
                <div className="eyebrow left">BACKUP POWER</div>
                <h2>Battery Backup Systems</h2>
                <p>
                  Inverter and battery combinations for long power cuts and
                  night-time load support.
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <span className="badge">Basic Home</span>
                <h3>1.5kVA System</h3>
                <div className="specs">
                  <p>
                    <b>Load:</b> 900W
                  </p>
                  <p>
                    <b>Battery:</b> 1–2 Batteries
                  </p>
                  <p>
                    <b>Backup:</b> 3–5 Hours
                  </p>
                </div>
                <ul>
                  <li>Fans & Lights</li>
                  <li>TV & WiFi</li>
                </ul>
              </div>

              <div className="card highlight">
                <span className="badge">Most Common</span>
                <h3>3kVA System</h3>
                <div className="specs">
                  <p>
                    <b>Load:</b> 2000W
                  </p>
                  <p>
                    <b>Battery:</b> 2–4 Batteries
                  </p>
                  <p>
                    <b>Backup:</b> 5–8 Hours
                  </p>
                </div>
                <ul>
                  <li>Full house lighting</li>
                  <li>Refrigerator</li>
                </ul>
              </div>

              <div className="card">
                <span className="badge">Large Home</span>
                <h3>5kVA System</h3>
                <div className="specs">
                  <p>
                    <b>Load:</b> 3500W
                  </p>
                  <p>
                    <b>Battery:</b> 4–6 Batteries
                  </p>
                  <p>
                    <b>Backup:</b> Full Night
                  </p>
                </div>
                <ul>
                  <li>Cooler</li>
                  <li>Washing Machine</li>
                </ul>
              </div>
            </div>
            <div className="panel-cta">
              <div>
                <b>Need backup sizing advice?</b>
                <p>
                  Tell us what appliances you want to keep running during power
                  cuts.
                </p>
              </div>
              <a
                className="cta"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20need%20battery%20backup%20advice."
                target="_blank"
                rel="noopener noreferrer"
              >
                Size My Backup
              </a>
            </div>
          </div>

          {/* SOLAR WITHOUT BATTERY */}
          <div
            className={`panel ${activeTab === "subsidy" ? "active" : ""}`}
            id="subsidy"
          >
            <div className="panel-head">
              <div>
                <div className="eyebrow left">DAYTIME SOLAR</div>
                <h2>Solar Without Battery (On-Grid)</h2>
                <p>
                  Run loads directly from solar power during sunlight hours with
                  net-metering export.
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card highlight">
                <span className="badge">Daytime Savings</span>
                <h3>On-Grid Solar Plant</h3>
                <div className="specs">
                  <p>
                    <b>Power:</b> Solar + DISCOM Grid
                  </p>
                  <p>
                    <b>Battery:</b> Not Required
                  </p>
                  <p>
                    <b>Maintenance:</b> Very Low
                  </p>
                </div>
                <h4>Best For</h4>
                <ul>
                  <li>Homes with daytime usage</li>
                  <li>Shops & Offices</li>
                  <li>Schools & Clinics</li>
                </ul>
                <div className="green-note">Maximum Bill Reduction</div>
              </div>
            </div>
            <div className="panel-cta">
              <div>
                <b>Want a battery-less solar system?</b>
                <p>We assess your daytime load and net-metering feasibility.</p>
              </div>
              <a
                className="cta"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20want%20an%20On-Grid%20solar%20system."
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss On-Grid
              </a>
            </div>
          </div>

          {/* MACHINES & MILLS */}
          <div
            className={`panel ${activeTab === "mill" ? "active" : ""}`}
            id="mill"
          >
            <div className="panel-head">
              <div>
                <div className="eyebrow left">MACHINES & MILLS</div>
                <h2>Atta Chakki / Rice Mill Systems</h2>
                <p>
                  Solar VFD drive configurations for heavy motor-driven flour
                  mills and processing machines.
                </p>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <span className="badge">Small Mill</span>
                <h3>5HP Motor Setup</h3>
                <div className="specs">
                  <p>
                    <b>Motor Load:</b> 3.7kW
                  </p>
                  <p>
                    <b>Solar:</b> ~6kW Array
                  </p>
                  <p>
                    <b>Inverter:</b> Solar VFD Drive
                  </p>
                  <p>
                    <b>Operation:</b> Direct Daytime
                  </p>
                </div>
                <ul>
                  <li>Single Atta Chakki</li>
                  <li>Small Flour Units</li>
                </ul>
                <div className="green-note">No Diesel Expense</div>
              </div>

              <div className="card highlight">
                <span className="badge">Most Common</span>
                <h3>7.5HP Motor Setup</h3>
                <div className="specs">
                  <p>
                    <b>Motor Load:</b> 5.5kW
                  </p>
                  <p>
                    <b>Solar:</b> ~8–9kW Array
                  </p>
                  <p>
                    <b>Inverter:</b> MPPT Solar VFD
                  </p>
                </div>
                <ul>
                  <li>Village Atta Chakki</li>
                  <li>Medium Flour Mill</li>
                </ul>
                <div className="green-note">Heavy Duty VFD Drive</div>
              </div>

              <div className="card">
                <span className="badge">Rice Huller</span>
                <h3>10HP Motor Setup</h3>
                <div className="specs">
                  <p>
                    <b>Motor Load:</b> 7.5kW
                  </p>
                  <p>
                    <b>Solar:</b> ~12kW Array
                  </p>
                  <p>
                    <b>Connection:</b> 3 Phase
                  </p>
                </div>
                <ul>
                  <li>Rice Huller Machine</li>
                  <li>Mini Processing Units</li>
                </ul>
                <div className="green-note">Grid Assist Available</div>
              </div>
            </div>
            <div className="panel-cta">
              <div>
                <b>Running a mill or heavy motor load?</b>
                <p>
                  Share your motor HP and operating hours for custom VFD design.
                </p>
              </div>
              <a
                className="cta"
                href="https://wa.me/919931798080?text=Hello%20Smart%20Solar%20Solutions,%20I%20need%20solar%20for%20an%20atta%20chakki."
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss Machine Load
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


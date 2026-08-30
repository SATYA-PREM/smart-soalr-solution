/**
 * SMART SOLAR SOLUTIONS - JAVASCRIPT ENGINE
 * Full Interactivity: Theme Engine, Calculator, Slider, Gallery, Tabs, Accordions, Lightbox
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. THEME SWITCHER ENGINE (DUAL THEME WITH LOCALSTORAGE)
       ========================================================= */
    const themeBtn = document.getElementById("themeToggleBtn");
    
    // Default to dark luxury theme if not set
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    
    if (themeBtn) {
        const icon = themeBtn.querySelector("i");
        if (icon) {
            icon.className = currentTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }

        themeBtn.addEventListener("click", () => {
            const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
            const newTheme = activeTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            if (icon) {
                icon.className = newTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
            }
        });
    }

    /* =========================================================
       2. MOBILE NAVIGATION DRAWER
       ========================================================= */
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("menu-open", isOpen);
        });

        // Close when clicking any nav link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });

        // Close on click outside
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        });
    }

    /* =========================================================
       3. HERO VISUAL IMAGE SLIDER
       ========================================================= */
    const slides = [...document.querySelectorAll(".hero-slide")];
    const dotsBox = document.getElementById("heroDots");

    if (slides.length && dotsBox) {
        let currentSlide = 0;
        let slideTimer;

        dotsBox.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Slide ${index + 1}`);
            dot.className = index === 0 ? "active" : "";
            dot.addEventListener("click", () => {
                currentSlide = index;
                renderSlide();
                resetSlideTimer();
            });
            dotsBox.appendChild(dot);
        });

        const dots = [...dotsBox.querySelectorAll("button")];

        function renderSlide() {
            slides.forEach((slide, idx) => {
                slide.classList.toggle("active", idx === currentSlide);
            });
            dots.forEach((dot, idx) => {
                dot.classList.toggle("active", idx === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            renderSlide();
        }

        function resetSlideTimer() {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, 4500);
        }

        renderSlide();
        resetSlideTimer();
    }

    /* =========================================================
       4. SCROLL REVEAL ANIMATIONS
       ========================================================= */
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("show"));
    }

    /* =========================================================
       5. STATS NUMBER COUNTERS
       ========================================================= */
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        let animated = false;
        const animateCounter = () => {
            if (animated) return;
            animated = true;

            const target = Number(counter.dataset.target) || 0;
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));

            const timer = setInterval(() => {
                current = Math.min(target, current + step);
                counter.textContent = current + "+";
                if (current >= target) clearInterval(timer);
            }, 30);
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounter();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            observer.observe(counter);
        } else {
            animateCounter();
        }
    });

    /* =========================================================
       6. TRUSTED PORTFOLIO MOBILE TOGGLE
       ========================================================= */
    const togglePartnersBtn = document.getElementById("togglePartnersBtn");
    const customerGrid = document.getElementById("customerGrid");

    if (togglePartnersBtn && customerGrid) {
        togglePartnersBtn.addEventListener("click", () => {
            const isExpanded = customerGrid.classList.toggle("show-all");
            togglePartnersBtn.innerHTML = isExpanded 
                ? 'View Less Partners <i class="fa-solid fa-chevron-up"></i>' 
                : 'View More Partners <i class="fa-solid fa-chevron-down"></i>';
        });
    }

    /* =========================================================
       7. REAL DATA SOLAR SAVINGS CALCULATOR
       ========================================================= */
    const billSlider = document.getElementById("billSlider");
    const billDisplay = document.getElementById("billDisplay");
    const typeBtns = document.querySelectorAll(".type-btn");
    const calcKw = document.getElementById("calcKw");
    const calcArea = document.getElementById("calcArea");
    const calcSavings = document.getElementById("calcSavings");
    const calcSubsidy = document.getElementById("calcSubsidy");
    const calcPayback = document.getElementById("calcPayback");
    const calcWhatsappBtn = document.getElementById("calcWhatsappBtn");

    if (billSlider && calcKw) {
        let selectedType = "Home Solar";

        typeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                typeBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedType = btn.dataset.type || "Home Solar";
                updateCalculator();
            });
        });

        billSlider.addEventListener("input", () => {
            updateCalculator();
        });

        function updateCalculator() {
            const bill = parseInt(billSlider.value, 10);
            if (billDisplay) {
                billDisplay.textContent = "₹" + bill.toLocaleString("en-IN");
            }

            // Real calculations based on Bihar DISCOM tariffs (~₹7.5/kWh) & 4 kWh/kW/day generation
            const monthlyUnits = bill / 7.5;
            let kw = (monthlyUnits / 120).toFixed(1);
            if (kw < 1.0) kw = 1.0;

            const area = Math.round(kw * 100);
            const annualSavings = Math.round(bill * 12 * 0.90);

            let subsidyText = "₹0";
            let payback = "3.2 Yrs";

            if (selectedType === "Home Solar") {
                if (kw <= 1.2) {
                    subsidyText = "₹30,000";
                    payback = "2.9 Yrs";
                } else if (kw <= 2.2) {
                    subsidyText = "₹60,000";
                    payback = "3.1 Yrs";
                } else {
                    subsidyText = "₹78,000";
                    payback = "3.2 Yrs";
                }
            } else if (selectedType === "Commercial Solar") {
                subsidyText = "Tax Deprec.*";
                payback = "2.8 Yrs";
            } else if (selectedType === "Solar Pump") {
                subsidyText = "KUSUM Eligible*";
                payback = "2.5 Yrs";
            } else {
                subsidyText = "Commercial ROI";
                payback = "2.2 Yrs";
            }

            if (calcKw) calcKw.textContent = kw + " kW";
            if (calcArea) calcArea.textContent = area + " sq.ft";
            if (calcSavings) calcSavings.textContent = "₹" + annualSavings.toLocaleString("en-IN");
            if (calcSubsidy) calcSubsidy.textContent = subsidyText;
            if (calcPayback) calcPayback.textContent = payback;

            if (calcWhatsappBtn) {
                const msg = `Hello Smart Solar Solutions, I calculated on your website for a monthly bill of ₹${bill.toLocaleString("en-IN")} (${selectedType}). Recommended System: ${kw} kW (${area} sq.ft roof). Please share a quotation.`;
                calcWhatsappBtn.href = "https://wa.me/919931798080?text=" + encodeURIComponent(msg);
            }
        }

        // Initialize on load
        updateCalculator();
    }

    /* =========================================================
       8. INTERACTIVE GALLERY GLIMPSE CAROUSEL
       ========================================================= */
    const glimpseTrack = document.getElementById("glimpseTrack");
    const glimpsePrev = document.getElementById("glimpsePrev");
    const glimpseNext = document.getElementById("glimpseNext");

    if (glimpseTrack && glimpsePrev && glimpseNext) {
        let glimpseIndex = 0;

        function getVisibleCardsCount() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function slideGlimpse() {
            const cards = glimpseTrack.querySelectorAll(".glimpse-card");
            if (!cards.length) return;

            const visibleCount = getVisibleCardsCount();
            const maxIndex = Math.max(0, cards.length - visibleCount);
            
            if (glimpseIndex > maxIndex) glimpseIndex = 0;
            if (glimpseIndex < 0) glimpseIndex = maxIndex;

            const cardWidth = cards[0].offsetWidth + 20; // width + gap
            glimpseTrack.style.transform = `translateX(-${glimpseIndex * cardWidth}px)`;
        }

        glimpseNext.addEventListener("click", () => {
            glimpseIndex++;
            slideGlimpse();
        });

        glimpsePrev.addEventListener("click", () => {
            glimpseIndex--;
            slideGlimpse();
        });

        window.addEventListener("resize", slideGlimpse);
    }

    /* =========================================================
       9. PROCESS MOBILE STEP SWITCHER
       ========================================================= */
    const pStepBtns = document.querySelectorAll(".p-step-btn");
    const pStepContents = document.querySelectorAll(".p-step-content");

    if (pStepBtns.length && pStepContents.length) {
        pStepBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const step = btn.dataset.step;
                
                pStepBtns.forEach(b => b.classList.remove("active"));
                pStepContents.forEach(c => c.classList.remove("active"));

                btn.classList.add("active");
                const targetContent = document.getElementById("pstep" + step);
                if (targetContent) {
                    targetContent.classList.add("active");
                }
            });
        });
    }

    /* =========================================================
       10. FAQ ACCORDION HANDLER
       ========================================================= */
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const parent = btn.closest(".faq-item");
            if (!parent) return;

            const isActive = parent.classList.contains("active");
            
            // Close all items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });

            // Toggle selected item
            if (!isActive) {
                parent.classList.add("active");
            }
        });
    });

    /* =========================================================
       11. SOLAR OFFERS CATALOGUE TABS (OFFER.HTML)
       ========================================================= */
    const offerTabs = [...document.querySelectorAll(".sidebar .tab")];
    const offerPanels = [...document.querySelectorAll(".offers-content .panel")];

    if (offerTabs.length && offerPanels.length) {
        function activateOfferTab(targetId) {
            offerTabs.forEach(tab => {
                tab.classList.toggle("active", tab.dataset.target === targetId);
            });
            offerPanels.forEach(panel => {
                panel.classList.toggle("active", panel.id === targetId);
            });
        }

        offerTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                activateOfferTab(tab.dataset.target);
            });
        });

        // Check URL parameters or hash
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get("service") || window.location.hash.substring(1);
        if (serviceParam && document.getElementById(serviceParam)) {
            activateOfferTab(serviceParam);
        }
    }

    /* =========================================================
       12. PROJECT GALLERY FILTERS & LIGHTBOX (GALLERY.HTML & INDEX.HTML)
       ========================================================= */
    const filterBtns = document.querySelectorAll(".filter-bar .filter");
    const galleryItems = document.querySelectorAll(".full-gallery .gallery-item, .gallery-grid .gallery-item");

    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter || "all";

                galleryItems.forEach(item => {
                    const category = (item.dataset.category || "").toLowerCase();
                    if (filter === "all" || category.includes(filter)) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    // Lightbox modal functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDesc = document.getElementById("lightboxDescription");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    if (lightbox) {
        let allGalleryItems = [...document.querySelectorAll(".gallery-item")];
        let currentItemIndex = 0;

        function openLightbox(item) {
            allGalleryItems = [...document.querySelectorAll(".gallery-item")].filter(el => el.offsetParent !== null);
            currentItemIndex = allGalleryItems.indexOf(item);
            if (currentItemIndex === -1) currentItemIndex = 0;

            showLightboxItem(allGalleryItems[currentItemIndex]);
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("menu-open");
        }

        function showLightboxItem(item) {
            if (!item) return;
            const img = item.querySelector("img");
            const src = item.dataset.image || (img ? img.src : "");
            const title = item.dataset.title || (item.querySelector("h3") ? item.querySelector("h3").textContent : "Solar Project");
            const desc = item.dataset.description || (item.querySelector("p") ? item.querySelector("p").textContent : "Smart Solar Solutions Installation");

            if (lightboxImage && src) lightboxImage.src = src;
            if (lightboxTitle) lightboxTitle.textContent = title;
            if (lightboxDesc) lightboxDesc.textContent = desc;
        }

        function closeLightbox() {
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.classList.remove("menu-open");
        }

        // Attach click to all gallery items
        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", () => openLightbox(item));
        });

        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", (e) => {
                e.stopPropagation();
                currentItemIndex = (currentItemIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
                showLightboxItem(allGalleryItems[currentItemIndex]);
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener("click", (e) => {
                e.stopPropagation();
                currentItemIndex = (currentItemIndex + 1) % allGalleryItems.length;
                showLightboxItem(allGalleryItems[currentItemIndex]);
            });
        }

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("open")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft" && lightboxPrev) lightboxPrev.click();
            if (e.key === "ArrowRight" && lightboxNext) lightboxNext.click();
        });
    }

    /* =========================================================
       13. WHATSAPP LEAD FORM
       ========================================================= */
    const leadForm = document.getElementById("leadForm");
    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name")?.value.trim() || "";
            const phone = document.getElementById("phone")?.value.trim() || "";
            const service = document.getElementById("service")?.value || "";
            const load = document.getElementById("load")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            const text = `Hello Smart Solar Solutions,\n\nName: ${name}\nPhone: ${phone}\nApplication: ${service}\nLoad/Requirement: ${load}\nMessage: ${message}`;
            const url = "https://wa.me/919931798080?text=" + encodeURIComponent(text);
            window.open(url, "_blank", "noopener,noreferrer");
        });
    }

});
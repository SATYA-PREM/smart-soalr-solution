document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       THEME ENGINE (LIGHT DEFAULT & DARK TOGGLE)
    ========================================= */
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            if (themeToggleBtn) {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                themeToggleBtn.setAttribute("aria-label", "Switch to Light Theme");
            }
        } else {
            document.documentElement.removeAttribute("data-theme");
            if (themeToggleBtn) {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                themeToggleBtn.setAttribute("aria-label", "Switch to Dark Theme");
            }
        }
    }

    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            document.body.classList.toggle("menu-open", isOpen);
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                document.body.classList.remove("menu-open");
            });
        });
    }

    /* =========================================
       HERO IMAGE SLIDER
    ========================================= */
    const slides = [...document.querySelectorAll(".hero-slide")];
    const dotsBox = document.getElementById("heroDots");

    if (slides.length && dotsBox) {
        let current = 0;
        let timer = null;

        dotsBox.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Show slide ${index + 1}`);
            dot.className = index === 0 ? "active" : "";
            dot.addEventListener("click", () => {
                current = index;
                showSlide();
                restartSlider();
            });
            dotsBox.appendChild(dot);
        });

        const dots = [...dotsBox.querySelectorAll("button")];

        function showSlide() {
            slides.forEach((slide, index) => {
                slide.classList.toggle("active", index === current);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === current);
            });
        }

        function nextSlide() {
            current = (current + 1) % slides.length;
            showSlide();
        }

        function restartSlider() {
            clearInterval(timer);
            timer = setInterval(nextSlide, 4500);
        }

        showSlide();
        restartSlider();
    }

    /* =========================================
       TRUSTED PARTNERS COLLAPSIBLE FOR MOBILE
    ========================================= */
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

    /* =========================================
       COMPACT MOBILE PROCESS STEP SWITCHER
    ========================================= */
    const stepBtns = document.querySelectorAll(".p-step-btn");
    const stepContents = document.querySelectorAll(".p-step-content");

    if (stepBtns.length && stepContents.length) {
        stepBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetStep = btn.dataset.step;
                stepBtns.forEach(b => b.classList.remove("active"));
                stepContents.forEach(c => c.classList.remove("active"));
                btn.classList.add("active");
                const activeContent = document.getElementById("pstep" + targetStep);
                if (activeContent) activeContent.classList.add("active");
            });
        });
    }

    /* =========================================
       SOLAR SAVINGS & CAPACITY CALCULATOR (REAL DATA)
    ========================================= */
    const billSlider = document.getElementById("billSlider");
    const billDisplay = document.getElementById("billDisplay");
    const calcKw = document.getElementById("calcKw");
    const calcArea = document.getElementById("calcArea");
    const calcSavings = document.getElementById("calcSavings");
    const calcSubsidy = document.getElementById("calcSubsidy");
    const calcPayback = document.getElementById("calcPayback");
    const calcWhatsappBtn = document.getElementById("calcWhatsappBtn");
    const typeBtns = document.querySelectorAll(".type-btn");

    if (billSlider && calcKw) {
        let currentType = "Home Solar";
        const tariffPerUnit = 7.5; // Real avg Bihar DISCOM electricity tariff ₹7.5/kWh

        function updateCalculator() {
            const bill = parseInt(billSlider.value, 10) || 3000;
            if (billDisplay) {
                billDisplay.textContent = "₹" + bill.toLocaleString("en-IN");
            }

            const monthlyUnits = bill / tariffPerUnit;
            const dailyUnits = monthlyUnits / 30;
            
            let rawKw = dailyUnits / 4;
            let recommendedKw = Math.max(1, Math.ceil(rawKw * 2) / 2);
            
            if (currentType === "Commercial Solar" && recommendedKw < 5) recommendedKw = Math.max(5, recommendedKw);
            if (currentType === "Solar Pump" && recommendedKw < 2) recommendedKw = 2;

            const area = Math.round(recommendedKw * 100);
            const monthlySavings = Math.round(recommendedKw * 4 * 30 * tariffPerUnit);
            const yearlySavings = monthlySavings * 12;

            let subsidy = 0;
            if (currentType === "Home Solar") {
                if (recommendedKw === 1) subsidy = 30000;
                else if (recommendedKw === 2) subsidy = 60000;
                else if (recommendedKw >= 3) subsidy = 78000;
            } else {
                subsidy = 0;
            }

            const approxSystemCost = recommendedKw * 55000;
            const netInvestment = Math.max(20000, approxSystemCost - subsidy);
            const paybackYears = (netInvestment / yearlySavings).toFixed(1);

            calcKw.textContent = recommendedKw + " kW";
            if (calcArea) calcArea.textContent = area + " sq.ft";
            if (calcSavings) calcSavings.textContent = "₹" + yearlySavings.toLocaleString("en-IN");
            if (calcSubsidy) calcSubsidy.textContent = subsidy > 0 ? "₹" + subsidy.toLocaleString("en-IN") : "Tax Benefit";
            if (calcPayback) calcPayback.textContent = paybackYears + " Yrs";

            if (calcWhatsappBtn) {
                const msg = `Hello Smart Solar Solutions,%0A%0AI used your website Real Data Solar Calculator with the following details:%0A- Application: ${encodeURIComponent(currentType)}%0A- Monthly Bill: ₹${bill}%0A- Recommended System: ${recommendedKw} kW%0A- Required Roof Area: ~${area} sq.ft%0A- Estimated Annual Savings: ₹${yearlySavings.toLocaleString("en-IN")}%0A- Eligible Govt. Subsidy: ₹${subsidy.toLocaleString("en-IN")}%0A- Est. Payback Period: ${paybackYears} Years%0A%0APlease provide a detailed quote and site visit plan.`;
                calcWhatsappBtn.href = `https://wa.me/919931798080?text=${msg}`;
            }
        }

        billSlider.addEventListener("input", updateCalculator);

        typeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                typeBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentType = btn.dataset.type || "Home Solar";
                updateCalculator();
            });
        });

        updateCalculator();
    }

    /* =========================================
       INTERACTIVE GALLERY GLIMPSE CAROUSEL (INDEX PAGE)
    ========================================= */
    const glimpseTrack = document.getElementById("glimpseTrack");
    const glimpsePrev = document.getElementById("glimpsePrev");
    const glimpseNext = document.getElementById("glimpseNext");

    if (glimpseTrack && glimpsePrev && glimpseNext) {
        let glimpseIndex = 0;
        const cards = glimpseTrack.querySelectorAll(".glimpse-card");
        
        function getCardsPerPage() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function updateGlimpseTrack() {
            const cardsPerPage = getCardsPerPage();
            const maxIndex = Math.max(0, cards.length - cardsPerPage);
            glimpseIndex = Math.min(glimpseIndex, maxIndex);
            
            const cardWidth = cards[0].getBoundingClientRect().width + 18;
            glimpseTrack.style.transform = `translateX(-${glimpseIndex * cardWidth}px)`;
        }

        glimpseNext.addEventListener("click", () => {
            const cardsPerPage = getCardsPerPage();
            const maxIndex = Math.max(0, cards.length - cardsPerPage);
            if (glimpseIndex < maxIndex) {
                glimpseIndex++;
            } else {
                glimpseIndex = 0;
            }
            updateGlimpseTrack();
        });

        glimpsePrev.addEventListener("click", () => {
            const cardsPerPage = getCardsPerPage();
            const maxIndex = Math.max(0, cards.length - cardsPerPage);
            if (glimpseIndex > 0) {
                glimpseIndex--;
            } else {
                glimpseIndex = maxIndex;
            }
            updateGlimpseTrack();
        });

        window.addEventListener("resize", updateGlimpseTrack);
    }

    /* =========================================
       FAQ ACCORDION
    ========================================= */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        if (questionBtn) {
            questionBtn.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");
                faqItems.forEach(i => i.classList.remove("active"));
                if (!isOpen) {
                    item.classList.add("active");
                }
            });
        }
    });

    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */
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

    /* =========================================
       ANIMATED STAT COUNTERS
    ========================================= */
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        let completed = false;
        const runCounter = () => {
            if (completed) return;
            completed = true;
            const target = Number(counter.dataset.target) || 0;
            let value = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                value = Math.min(target, value + step);
                counter.textContent = value + "+";
                if (value >= target) clearInterval(timer);
            }, 30);
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    runCounter();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            observer.observe(counter);
        } else {
            runCounter();
        }
    });

    /* =========================================
       OFFER TABS (OFFER PAGE)
    ========================================= */
    const tabs = [...document.querySelectorAll(".tab")];
    const panels = [...document.querySelectorAll(".panel")];

    if (tabs.length && panels.length) {
        function activateOffer(id, updateURL = true) {
            tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.target === id));
            panels.forEach(panel => panel.classList.toggle("active", panel.id === id));
            if (updateURL) {
                history.replaceState(null, "", "#" + id);
            }
        }

        tabs.forEach(tab => {
            tab.addEventListener("click", () => activateOffer(tab.dataset.target));
        });

        const queryService = new URLSearchParams(window.location.search).get("service");
        const hash = window.location.hash.substring(1);

        if (queryService && document.getElementById(queryService)) {
            activateOffer(queryService, false);
        } else if (hash && document.getElementById(hash)) {
            activateOffer(hash, false);
        }
    }

    /* =========================================
       GALLERY FILTERING & LIGHTBOX
    ========================================= */
    const galleryGrid = document.getElementById("galleryGrid");
    if (galleryGrid) {
        const galleryItems = [...galleryGrid.querySelectorAll(".gallery-item")];
        const filterButtons = [...document.querySelectorAll(".filter")];
        const viewMoreButton = document.getElementById("viewMoreBtn");

        let activeFilter = "all";
        let expanded = false;

        function getCategories(item) {
            return (item.dataset.category || "").toLowerCase().split(/\s+/).filter(Boolean);
        }

        function itemMatchesFilter(item, filter) {
            if (filter === "all") return true;
            return getCategories(item).includes(filter.toLowerCase());
        }

        function renderGallery() {
            const matchingItems = [];
            galleryItems.forEach(item => {
                item.classList.remove("hidden", "collapsed");
                if (itemMatchesFilter(item, activeFilter)) {
                    matchingItems.push(item);
                } else {
                    item.classList.add("hidden");
                }
            });

            if (activeFilter === "all" && !expanded) {
                matchingItems.forEach((item, index) => {
                    if (index >= 12) item.classList.add("collapsed");
                });
            }

            if (viewMoreButton) {
                if (activeFilter === "all" && matchingItems.length > 12) {
                    viewMoreButton.style.display = "inline-flex";
                    viewMoreButton.innerHTML = expanded
                        ? 'Show Fewer Projects <i class="fa-solid fa-arrow-up"></i>'
                        : 'View More Projects <i class="fa-solid fa-arrow-down"></i>';
                } else {
                    viewMoreButton.style.display = "none";
                }
            }
        }

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeFilter = btn.dataset.filter || "all";
                expanded = activeFilter !== "all";
                renderGallery();
            });
        });

        if (viewMoreButton) {
            viewMoreButton.addEventListener("click", () => {
                expanded = !expanded;
                renderGallery();
            });
        }

        renderGallery();
    }

    /* LIGHTBOX MODAL HANDLER */
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDescription = document.getElementById("lightboxDescription");

    if (lightbox) {
        let visibleItems = [];
        let currentIndex = 0;

        function getVisibleGalleryItems() {
            return [...document.querySelectorAll(".gallery-item:not(.hidden):not(.collapsed)")];
        }

        function updateLightbox(item) {
            if (!item) return;
            const imgSrc = item.dataset.image || item.querySelector("img")?.src;
            const videoSrc = item.dataset.video || item.querySelector("video source")?.src;

            lightbox.querySelectorAll(".lightbox-video").forEach(v => v.remove());

            if (videoSrc) {
                if (lightboxImage) lightboxImage.style.display = "none";
                const videoEl = document.createElement("video");
                videoEl.className = "lightbox-video";
                videoEl.controls = true;
                videoEl.autoplay = true;
                videoEl.src = videoSrc;
                const container = lightbox.querySelector(".lightbox-media") || lightbox;
                container.appendChild(videoEl);
            } else if (imgSrc && lightboxImage) {
                lightboxImage.src = imgSrc;
                lightboxImage.alt = item.dataset.title || "Solar Project";
                lightboxImage.style.display = "block";
            }

            if (lightboxTitle) lightboxTitle.textContent = item.dataset.title || "Smart Solar Installation";
            if (lightboxDescription) lightboxDescription.textContent = item.dataset.description || "Professional solar system project by Smart Solar Solutions.";
        }

        function openLightbox(item) {
            visibleItems = getVisibleGalleryItems();
            currentIndex = Math.max(0, visibleItems.indexOf(item));
            updateLightbox(visibleItems[currentIndex]);
            lightbox.classList.add("open");
            document.body.classList.add("menu-open");
        }

        function closeLightbox() {
            lightbox.classList.remove("open");
            document.body.classList.remove("menu-open");
            lightbox.querySelectorAll(".lightbox-video").forEach(v => {
                v.pause();
                v.remove();
            });
        }

        function moveLightbox(dir) {
            visibleItems = getVisibleGalleryItems();
            if (!visibleItems.length) return;
            currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
            updateLightbox(visibleItems[currentIndex]);
        }

        document.querySelectorAll(".gallery-item").forEach(item => {
            item.addEventListener("click", () => openLightbox(item));
        });

        document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
        document.getElementById("lightboxPrev")?.addEventListener("click", (e) => { e.stopPropagation(); moveLightbox(-1); });
        document.getElementById("lightboxNext")?.addEventListener("click", (e) => { e.stopPropagation(); moveLightbox(1); });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("open")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") moveLightbox(-1);
            if (e.key === "ArrowRight") moveLightbox(1);
        });
    }

    /* =========================================
       WHATSAPP LEAD FORM SUBMIT
    ========================================= */
    const leadForm = document.getElementById("leadForm");
    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const getValue = id => document.getElementById(id)?.value.trim() || "";
            const name = getValue("name");
            const phone = getValue("phone");
            const service = getValue("service");
            const load = getValue("load");
            const message = getValue("message");

            const text = `Hello Smart Solar Solutions,%0A%0ANew Recommendation Request from Website:%0A- Name: ${encodeURIComponent(name)}%0A- Phone: ${encodeURIComponent(phone)}%0A- Application: ${encodeURIComponent(service)}%0A- Requirement: ${encodeURIComponent(load)}%0A- Message: ${encodeURIComponent(message)}`;
            
            window.open(`https://wa.me/919931798080?text=${text}`, "_blank", "noopener,noreferrer");
        });
    }
});
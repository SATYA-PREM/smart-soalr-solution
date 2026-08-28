document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menu = document.getElementById("menuBtn");
    const nav = document.getElementById("navLinks");

    if (menu && nav) {

        menu.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menu.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =========================================
       HERO IMAGE SLIDER
    ========================================= */

    const slides = [
        ...document.querySelectorAll(".hero-slide")
    ];

    const dotsBox =
        document.getElementById("heroDots");

    if (slides.length && dotsBox) {

        let current = 0;
        let timer;

        dotsBox.innerHTML = "";

        slides.forEach((_, index) => {

            const dot =
                document.createElement("button");

            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                `Show hero image ${index + 1}`
            );

            dot.className =
                index === 0 ? "active" : "";

            dot.addEventListener("click", () => {

                current = index;

                showSlide();

                restartSlider();

            });

            dotsBox.appendChild(dot);

        });


        const dots = [
            ...dotsBox.querySelectorAll("button")
        ];


        function showSlide() {

            slides.forEach((slide, index) => {

                slide.classList.toggle(
                    "active",
                    index === current
                );

            });

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === current
                );

            });

        }


        function nextSlide() {

            current =
                (current + 1) % slides.length;

            showSlide();

        }


        function restartSlider() {

            clearInterval(timer);

            timer =
                setInterval(nextSlide, 4500);

        }


        showSlide();

        restartSlider();

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =========================================
       COUNTERS
    ========================================= */

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach(counter => {

        let completed = false;

        const runCounter = () => {

            if (completed) return;

            completed = true;

            const target =
                Number(counter.dataset.target) || 0;

            let value = 0;

            const step =
                Math.max(
                    1,
                    Math.ceil(target / 50)
                );

            const timer =
                setInterval(() => {

                    value =
                        Math.min(
                            target,
                            value + step
                        );

                    counter.textContent =
                        value + "+";

                    if (value >= target) {

                        clearInterval(timer);

                    }

                }, 25);

        };


        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        if (
                            entries[0].isIntersecting
                        ) {

                            runCounter();

                            observer.disconnect();

                        }

                    },
                    {
                        threshold: 0.7
                    }
                );

            observer.observe(counter);

        } else {

            runCounter();

        }

    });


    /* =========================================
       OFFER TABS
    ========================================= */

    const tabs = [
        ...document.querySelectorAll(".tab")
    ];

    const panels = [
        ...document.querySelectorAll(".panel")
    ];

    if (tabs.length && panels.length) {

        function activateOffer(id, updateURL = true) {

            tabs.forEach(tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.target === id
                );

            });


            panels.forEach(panel => {

                panel.classList.toggle(
                    "active",
                    panel.id === id
                );

            });


            if (updateURL) {

                history.replaceState(
                    null,
                    "",
                    "#" + id
                );

            }

        }


        tabs.forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    activateOffer(
                        tab.dataset.target
                    );

                }
            );

        });


        const queryService =
            new URLSearchParams(
                window.location.search
            ).get("service");

        const hash =
            window.location.hash.substring(1);


        if (
            queryService &&
            document.getElementById(queryService)
        ) {

            activateOffer(
                queryService,
                false
            );

        } else if (
            hash &&
            document.getElementById(hash)
        ) {

            activateOffer(
                hash,
                false
            );

        }

    }


    /* =========================================
       GALLERY
       - MULTIPLE CATEGORIES
       - FILTERS
       - VIEW MORE
    ========================================= */

    const galleryGrid =
        document.getElementById("galleryGrid");


    if (galleryGrid) {

        const galleryItems = [
            ...galleryGrid.querySelectorAll(
                ".gallery-item"
            )
        ];


        const filterButtons = [
            ...document.querySelectorAll(".filter")
        ];


        const viewMoreButton =
            document.getElementById(
                "viewMoreBtn"
            );


        let activeFilter = "all";

        let expanded = false;


        function getCategories(item) {

            return (
                item.dataset.category || ""
            )
                .toLowerCase()
                .split(/\s+/)
                .filter(Boolean);

        }


        function itemMatchesFilter(
            item,
            filter
        ) {

            if (filter === "all") {

                return true;

            }

            return getCategories(item)
                .includes(filter);

        }


        function renderGallery() {

            const matchingItems = [];


            galleryItems.forEach(item => {

                item.classList.remove(
                    "hidden",
                    "collapsed"
                );


                if (
                    itemMatchesFilter(
                        item,
                        activeFilter
                    )
                ) {

                    matchingItems.push(item);

                } else {

                    item.classList.add(
                        "hidden"
                    );

                }

            });


            /*
             * On "All Projects", initially show
             * only the first 12 projects.
             */

            if (
                activeFilter === "all" &&
                !expanded
            ) {

                matchingItems.forEach(
                    (item, index) => {

                        if (index >= 12) {

                            item.classList.add(
                                "collapsed"
                            );

                        }

                    }
                );

            }


            if (viewMoreButton) {

                const hasMore =
                    matchingItems.length > 12;


                if (
                    activeFilter === "all" &&
                    hasMore
                ) {

                    viewMoreButton.style.display =
                        "inline-flex";


                    if (expanded) {

                        viewMoreButton.innerHTML =
                            `
                            Show Fewer Projects
                            <i class="fa-solid fa-arrow-up"></i>
                            `;

                    } else {

                        viewMoreButton.innerHTML =
                            `
                            View More Projects
                            <i class="fa-solid fa-arrow-down"></i>
                            `;

                    }

                } else {

                    viewMoreButton.style.display =
                        "none";

                }

            }

        }


        /* FILTER BUTTONS */

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    activeFilter =
                        button.dataset.filter;


                    /*
                     * When a category is selected,
                     * show all matching projects.
                     */

                    expanded =
                        activeFilter !== "all";


                    renderGallery();

                }
            );

        });


        /* VIEW MORE */

        if (viewMoreButton) {

            viewMoreButton.addEventListener(
                "click",
                () => {

                    expanded = !expanded;

                    renderGallery();

                }
            );

        }


        renderGallery();

    }


    /* =========================================
       GALLERY LIGHTBOX
       IMAGE + VIDEO SUPPORT
    ========================================= */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxTitle =
        document.getElementById(
            "lightboxTitle"
        );


    const lightboxDescription =
        document.getElementById(
            "lightboxDescription"
        );


    if (lightbox) {

        let visibleItems = [];

        let currentIndex = 0;


        function getVisibleGalleryItems() {

            return [
                ...document.querySelectorAll(
                    ".gallery-item:not(.hidden):not(.collapsed)"
                )
            ];

        }


        function updateLightbox(item) {

            if (!item) return;


            const image =
                item.querySelector(
                    "img"
                );


            const video =
                item.querySelector(
                    "video"
                );


            /*
             * Remove previous lightbox media
             */

            lightbox
                .querySelectorAll(
                    ".lightbox-video"
                )
                .forEach(videoElement => {

                    videoElement.remove();

                });


            if (lightboxImage) {

                lightboxImage.style.display =
                    "none";

            }


            /*
             * IMAGE
             */

            if (image) {

                if (lightboxImage) {

                    lightboxImage.src =
                        item.dataset.image ||
                        image.currentSrc ||
                        image.src;

                    lightboxImage.alt =
                        item.dataset.title ||
                        image.alt ||
                        "Solar project";

                    lightboxImage.style.display =
                        "block";

                }

            }


            /*
             * VIDEO
             */

            if (video) {

                const videoSource =
                    video.querySelector(
                        "source"
                    );


                const lightboxVideo =
                    document.createElement(
                        "video"
                    );


                lightboxVideo.className =
                    "lightbox-video";


                lightboxVideo.controls = true;

                lightboxVideo.autoplay = true;

                lightboxVideo.playsInline = true;


                if (videoSource) {

                    lightboxVideo.src =
                        videoSource.src;

                }


                lightboxVideo.style.maxWidth =
                    "92vw";

                lightboxVideo.style.maxHeight =
                    "78vh";

                lightboxVideo.style.width =
                    "auto";

                lightboxVideo.style.height =
                    "auto";


                const mediaContainer =
                    lightbox.querySelector(
                        ".lightbox-media"
                    );


                if (mediaContainer) {

                    mediaContainer.appendChild(
                        lightboxVideo
                    );

                } else {

                    lightbox.appendChild(
                        lightboxVideo
                    );

                }

            }


            if (lightboxTitle) {

                lightboxTitle.textContent =
                    item.dataset.title || "";

            }


            if (lightboxDescription) {

                lightboxDescription.textContent =
                    item.dataset.description || "";

            }

        }


        function openLightbox(item) {

            visibleItems =
                getVisibleGalleryItems();


            currentIndex =
                Math.max(
                    0,
                    visibleItems.indexOf(item)
                );


            updateLightbox(
                visibleItems[currentIndex]
            );


            lightbox.classList.add(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "menu-open"
            );

        }


        function closeLightbox() {

            lightbox.classList.remove(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "menu-open"
            );


            lightbox
                .querySelectorAll(
                    ".lightbox-video"
                )
                .forEach(video => {

                    video.pause();

                    video.remove();

                });

        }


        function moveLightbox(direction) {

            visibleItems =
                getVisibleGalleryItems();


            if (!visibleItems.length) {

                return;

            }


            currentIndex =
                (
                    currentIndex +
                    direction +
                    visibleItems.length
                ) %
                visibleItems.length;


            updateLightbox(
                visibleItems[currentIndex]
            );

        }


        /*
         * Open when clicking gallery card.
         */

        galleryGrid
            ?.querySelectorAll(
                ".gallery-item"
            )
            .forEach(item => {

                item.addEventListener(
                    "click",
                    () => {

                        openLightbox(item);

                    }
                );

            });


        /*
         * Close
         */

        document
            .getElementById(
                "lightboxClose"
            )
            ?.addEventListener(
                "click",
                closeLightbox
            );


        /*
         * Previous
         */

        document
            .getElementById(
                "lightboxPrev"
            )
            ?.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    moveLightbox(-1);

                }
            );


        /*
         * Next
         */

        document
            .getElementById(
                "lightboxNext"
            )
            ?.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    moveLightbox(1);

                }
            );


        /*
         * Click outside media
         */

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        /*
         * Keyboard controls
         */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    !lightbox.classList.contains(
                        "open"
                    )
                ) {

                    return;

                }


                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    moveLightbox(-1);

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    moveLightbox(1);

                }

            }
        );

    }


    /* =========================================
       VIDEO PREVIEWS
    ========================================= */

    const galleryVideos =
        document.querySelectorAll(
            ".gallery-video-preview"
        );


    galleryVideos.forEach(video => {

        video.muted = true;

        video.loop = true;

        video.playsInline = true;


        /*
         * Automatically preview video when
         * it enters the viewport.
         */

        if (
            "IntersectionObserver" in window
        ) {

            const videoObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    video.play()
                                        .catch(
                                            () => {}
                                        );

                                } else {

                                    video.pause();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            videoObserver.observe(video);

        }

    });


    /* =========================================
       WHATSAPP LEAD FORM
    ========================================= */

    const leadForm =
        document.getElementById(
            "leadForm"
        );


    if (leadForm) {

        leadForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const getValue = id => {

                    return (
                        document
                            .getElementById(id)
                            ?.value
                            .trim() || ""
                    );

                };


                const name =
                    getValue("name");

                const phone =
                    getValue("phone");

                const service =
                    getValue("service");

                const load =
                    getValue("load");

                const message =
                    getValue("message");


                const whatsappMessage =
                    `
Hello Smart Solar Solutions,

Name: ${name}
Phone: ${phone}
Application: ${service}
Requirement: ${load}
Message: ${message}
                    `.trim();


                const whatsappURL =
                    "https://wa.me/919931798080?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


});
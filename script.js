document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   SAFE SELECTOR HELPER
===================================================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


/* =====================================================
   MOBILE MENU
===================================================== */
const hamburger = $('.hamburger');
const navMenu = $('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}


/* =====================================================
   SMOOTH SCROLL
===================================================== */
const header = $('.header');

$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        const id = this.getAttribute('href');
        if (id.length <= 1) return;

        const target = $(id);
        if (!target) return;

        e.preventDefault();

        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 10;

        window.scrollTo({ top, behavior: "smooth" });
    });
});


/* =====================================================
   ACTIVE LINK ON SCROLL
===================================================== */
const sections = $$('section');
const navLinks = $$('.nav-link');

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach(sec => {
            const top = sec.offsetTop - (header?.offsetHeight || 0) - 20;
            if (window.scrollY >= top) current = sec.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
        });
    });
}


/* =====================================================
   CONTACT FORM → WHATSAPP
===================================================== */
const form = $('.contact-form form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]')?.value.trim();
        const email = this.querySelector('input[type="email"]')?.value.trim();
        const phone = this.querySelector('input[type="tel"]')?.value.trim();
        const service = this.querySelector('select')?.value;
        const message = this.querySelector('textarea')?.value.trim();

        if (!name || !phone) {
            alert("Please enter your Name and Phone number.");
            return;
        }

        let text = `Hello, I am interested in solar services.%0A%0A`;
        text += `Name: ${name}%0APhone: ${phone}%0A`;

        if (email) text += `Email: ${email}%0A`;
        if (service) text += `Service: ${service}%0A`;
        if (message) text += `Message: ${message}`;

        window.open(`https://wa.me/919931798080?text=${text}`, '_blank');
        this.reset();
    });
}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */
if (header) {
    window.addEventListener('scroll', () => {
        header.style.background =
            window.scrollY > 100
            ? 'rgba(255,255,255,0.98)'
            : 'rgba(255,255,255,0.95)';
    });
}


/* =====================================================
   HERO SLIDER
===================================================== */
const slides = $$('.slide');
const nextBtn = $('.next');
const prevBtn = $('.prev');

if (slides.length) {
    let current = 0;

    const showSlide = i => {
        slides.forEach(s => s.classList.remove('active'));
        slides[i].classList.add('active');
    };

    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 3500);

    if (nextBtn)
        nextBtn.addEventListener('click', () => showSlide(current = (current + 1) % slides.length));

    if (prevBtn)
        prevBtn.addEventListener('click', () => showSlide(current = (current - 1 + slides.length) % slides.length));
}


/* =====================================================
   SERVICE TABS
===================================================== */
const tabs = $$('.service-tab');
const panels = $$('.service-panel');

if (tabs.length && panels.length) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');

            const panel = document.getElementById(tab.dataset.target);
            if (panel) panel.classList.add('active');
        });
    });
}

});

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   HELPERS
===================================================== */
const $ = (s, p=document)=>p.querySelector(s);
const $$ = (s, p=document)=>p.querySelectorAll(s);

const hamburger = $('.hamburger');
const navMenu = $('.nav-menu');
const closeBtn = $('.menu-close');

if (hamburger && navMenu){

    hamburger.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);

    document.addEventListener('click', e=>{
        if(document.body.classList.contains('menu-open')){
            if(!navMenu.contains(e.target) && !hamburger.contains(e.target))
                closeMenu();
        }
    });

    $$('.nav-link').forEach(link=>link.addEventListener('click', closeMenu));

    function openMenu(){
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMenu(){
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}


/* =====================================================
   SMOOTH SCROLL + ACTIVE LINK
===================================================== */
const header = $('.header');
const sections = $$('section');
const navLinks = $$('.nav-link');

navLinks.forEach(link=>{
    link.addEventListener('click', e=>{
        const id = link.getAttribute('href');
        if(!id.startsWith('#')) return;

        const target = $(id);
        if(!target) return;

        e.preventDefault();

        const offset = header?.offsetHeight || 0;
        window.scrollTo({
            top: target.offsetTop - offset - 10,
            behavior:'smooth'
        });
    });
});

if(sections.length){
    window.addEventListener('scroll', ()=>{
        let current="";
        sections.forEach(sec=>{
            const top=sec.offsetTop-(header?.offsetHeight||0)-20;
            if(window.scrollY>=top) current=sec.id;
        });

        navLinks.forEach(link=>{
            link.classList.toggle('active-link', link.getAttribute('href')===`#${current}`);
        });
    });
}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */
if(header){
    window.addEventListener('scroll', ()=>{
        header.style.background =
        window.scrollY>100
        ?'rgba(255,255,255,0.98)'
        :'rgba(255,255,255,0.95)';
    });
}


/* =====================================================
   HERO SLIDER WITH TOUCH SUPPORT
===================================================== */

const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const slideshow = document.querySelector('.slideshow');

if (slides.length) {

    let current = 0;
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    const showSlide = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    };

    const nextSlide = () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    };

    const prevSlide = () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    };

    /* Auto Slide */
    let autoSlide = setInterval(nextSlide, 1500);

    /* Buttons */
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAuto();
    });

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAuto();
    });

    function resetAuto(){
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 3500);
    }

    /* ================= TOUCH EVENTS ================= */

    slideshow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slideshow.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slideshow.addEventListener('touchend', () => {
        handleSwipe();
    });

    /* ================= MOUSE DRAG (Tablet/Desktop) ================= */

    slideshow.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    slideshow.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        endX = e.clientX;
    });

    slideshow.addEventListener('mouseup', () => {
        if (isDragging) handleSwipe();
        isDragging = false;
    });

    slideshow.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    /* ================= SWIPE LOGIC ================= */

    function handleSwipe() {
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {   // threshold
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAuto();
        }
    }
}


/* =====================================================
   SERVICE TABS + URL PARAM
===================================================== */
const tabs = $$('.service-tab');
const panels = $$('.service-panel');

function activateTab(tab){
    tabs.forEach(t=>t.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));

    tab.classList.add('active');
    const panel = $('#'+tab.dataset.target);
    panel?.classList.add('active');
}

if(tabs.length){
    tabs.forEach(tab=>tab.addEventListener('click',()=>activateTab(tab)));

    // auto open from offer.html?service=business
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if(service){
        const targetTab = $(`.service-tab[data-target="${service}"]`);
        if(targetTab) activateTab(targetTab);
    }
}


/* =====================================================
   CONTACT FORM MODAL → EMAIL / WHATSAPP
===================================================== */
const form = $('.contact-form form');
const modal = $('#formSuccessModal');
const emailBtn = $('#emailOption');
const whatsappBtn = $('#whatsappOption');

let formData=null;

if(form && modal){

    form.addEventListener('submit', e=>{
        e.preventDefault();

        const name=form.querySelector('input[type="text"]').value.trim();
        const email=form.querySelector('input[type="email"]').value.trim();
        const phone=form.querySelector('input[type="tel"]').value.trim();
        const service=form.querySelector('select').value;
        const message=form.querySelector('textarea').value.trim();

        if(!name||!phone){
            alert("Please enter Name and Phone number");
            return;
        }

        formData={name,email,phone,service,message};
        modal.classList.add('active');
    });
}

/* WHATSAPP */
whatsappBtn?.addEventListener('click',()=>{
    if(!formData) return;

    let text=`Hello, I am interested in solar services.%0A%0A`;
    text+=`Name: ${formData.name}%0A`;
    text+=`Phone: ${formData.phone}%0A`;
    if(formData.email) text+=`Email: ${formData.email}%0A`;
    if(formData.service) text+=`Service: ${formData.service}%0A`;
    if(formData.message) text+=`Message: ${formData.message}`;

    window.open(`https://wa.me/919931798080?text=${text}`,'_blank');
    modal.classList.remove('active');
    form?.reset();
});

/* EMAIL */
emailBtn?.addEventListener('click',()=>{
    if(!formData) return;

    const subject=encodeURIComponent("Solar Service Inquiry");

    let body=`Hello,
I would like information about solar services.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email||'-'}
Service: ${formData.service||'-'}
Message: ${formData.message||'-'}`;

    const encoded=encodeURIComponent(body);
    const mobile=/Android|iPhone|iPad/i.test(navigator.userAgent);

    if(mobile)
        window.location.href=`mailto:smartsolartrp@gmail.com?subject=${subject}&body=${encoded}`;
    else
        window.open(`https://mail.google.com/mail/?view=cm&to=smartsolartrp@gmail.com&su=${subject}&body=${encoded}`,'_blank');

    modal.classList.remove('active');
    form?.reset();
});


/* =====================================================
   RECOMMEND BUTTON
===================================================== */
const recommendBtn=$('#recommendBtn');

recommendBtn?.addEventListener('click',e=>{
    e.preventDefault();

    if(window.innerWidth>=992){
        if(location.pathname.includes("index.html")||location.pathname==="/")
            $('#contact')?.scrollIntoView({behavior:'smooth'});
        else
            location.href="index.html#contact";
    }else{
        window.open("https://wa.me/9931798080?text=Hello%20I%20want%20more%20information",'_blank');
    }
});
});document.addEventListener("DOMContentLoaded", function () {

/* =================================
   MODAL CLOSE (FORM)
================================= */

const modal = document.getElementById("formSuccessModal");
const form = document.querySelector(".contact-form form");
let formData = null;

function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form?.reset();
    formData = null;
}

modal?.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});


/* =================================
   GALLERY + LIGHTBOX (IMAGE + VIDEO)
================================= */

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lbImage = document.querySelector(".lb-image");
const lbVideo = document.querySelector(".lb-video");
const lbClose = document.querySelector(".lb-close");
const lbNext = document.querySelector(".lb-next");
const lbPrev = document.querySelector(".lb-prev");

let currentIndex = 0;
let startX = 0;
let endX = 0;

const mediaList = [];

// Collect images and videos
galleryItems.forEach(item => {
    const img = item.querySelector("img");
    const video = item.querySelector("video");

    if (img) {
        mediaList.push({ type: "image", src: img.src });
    } else if (video) {
        const source = video.querySelector("source");
        mediaList.push({ type: "video", src: source.src });
    }
});

/* OPEN LIGHTBOX */
function openLightbox(index) {
    currentIndex = index;
    showMedia(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

/* CLOSE */
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";

    // Stop video if playing
    lbVideo.pause();
    lbVideo.currentTime = 0;
}

/* SHOW IMAGE OR VIDEO */
function showMedia(index) {
    currentIndex = (index + mediaList.length) % mediaList.length;
    const media = mediaList[currentIndex];

    lbImage.style.display = "none";
    lbVideo.style.display = "none";
    lbVideo.pause();

    if (media.type === "image") {
        lbImage.src = media.src;
        lbImage.style.display = "block";
    } else {
        lbVideo.src = media.src;
        lbVideo.style.display = "block";
        lbVideo.play();
    }
}

/* CLICK GALLERY ITEM */
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        openLightbox(index);
    });
});

/* BUTTON NAV */
lbNext?.addEventListener("click", () => showMedia(currentIndex + 1));
lbPrev?.addEventListener("click", () => showMedia(currentIndex - 1));
lbClose?.addEventListener("click", closeLightbox);

/* CLICK OUTSIDE */
lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

/* KEYBOARD NAV */
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showMedia(currentIndex + 1);
    if (e.key === "ArrowLeft") showMedia(currentIndex - 1);
});

/* TOUCH SWIPE */
lightbox?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

lightbox?.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

lightbox?.addEventListener("touchend", () => {
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) showMedia(currentIndex + 1);
        else showMedia(currentIndex - 1);
    }
});


/* =================================
   LOAD MORE / HIDE
================================= */

const items = document.querySelectorAll(".gallery-item");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const hideBtn = document.getElementById("hideBtn");

const batchSize = 12;
let visibleCount = batchSize;

function updateGallery() {
    items.forEach((item, index) => {
        item.style.display = index < visibleCount ? "block" : "none";
    });

    hideBtn.style.display = visibleCount > batchSize ? "inline-block" : "none";
    loadMoreBtn.style.display = visibleCount >= items.length ? "none" : "inline-block";
}

updateGallery();

loadMoreBtn?.addEventListener("click", function () {
    visibleCount += batchSize;
    if (visibleCount > items.length) visibleCount = items.length;
    updateGallery();
});

hideBtn?.addEventListener("click", function () {
    visibleCount -= batchSize;
    if (visibleCount < batchSize) visibleCount = batchSize;
    updateGallery();

    window.scrollTo({
        top: document.getElementById("gallery").offsetTop - 100,
        behavior: "smooth"
    });
});

});






const customerItems = document.querySelectorAll(".customer-card");
const loadBtn = document.getElementById("customerLoadMore");
const hideBtn = document.getElementById("customerHide");

function getBatchSize() {
    return window.innerWidth <= 768 ? 6 : 12;
}

let batchSize = getBatchSize();
let visibleCount = batchSize;

function updateCustomerGrid() {

    customerItems.forEach((item, index) => {
        item.style.display = index < visibleCount ? "flex" : "none";
    });

    hideBtn.style.display = visibleCount > batchSize ? "inline-block" : "none";
    loadBtn.style.display = visibleCount >= customerItems.length ? "none" : "inline-block";
}

// Initial render
updateCustomerGrid();

// Show More
loadBtn.addEventListener("click", function () {
    visibleCount += batchSize;
    if (visibleCount > customerItems.length) {
        visibleCount = customerItems.length;
    }
    updateCustomerGrid();
});

// Hide
hideBtn.addEventListener("click", function () {
    visibleCount -= batchSize;
    if (visibleCount < batchSize) {
        visibleCount = batchSize;
    }
    updateCustomerGrid();

    document.querySelector(".our-customers").scrollIntoView({
        behavior: "smooth"
    });
});

// Recalculate batch size on resize
window.addEventListener("resize", function () {
    batchSize = getBatchSize();
    visibleCount = batchSize;
    updateCustomerGrid();
});
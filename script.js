document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   HELPERS
===================================================== */
const $ = (s, p=document)=>p.querySelector(s);
const $$ = (s, p=document)=>p.querySelectorAll(s);


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

    $$('.nav-link').forEach(link =>
        link.addEventListener('click', closeMenu)
    );

    document.addEventListener('click', e=>{
        if(!navMenu.contains(e.target) && !hamburger.contains(e.target))
            closeMenu();
    });

    function closeMenu(){
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}


/* =====================================================
   SMOOTH SCROLL
===================================================== */
const header = $('.header');

$$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
        const id = a.getAttribute('href');
        const target = $(id);
        if(!target) return;

        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;

        window.scrollTo({
            top: target.offsetTop - offset - 10,
            behavior:'smooth'
        });
    });
});


/* =====================================================
   SERVICE TABS (SINGLE SYSTEM)
===================================================== */
const tabs = $$('.service-tab');
const panels = $$('.service-panel');

function activateTab(tab){
    tabs.forEach(t=>t.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));

    tab.classList.add('active');

    const panel = $('#'+tab.dataset.target);
    if(panel) panel.classList.add('active');
}

if(tabs.length && panels.length){

    tabs.forEach(tab=>{
        tab.addEventListener('click', ()=>activateTab(tab));
    });

    /* ---- URL PARAM ACTIVATION ---- */
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");

    if(service){
        const targetTab = $(`.service-tab[data-target="${service}"]`);
        if(targetTab) activateTab(targetTab);
    }
}


/* =====================================================
   CONTACT FORM MODAL
===================================================== */
const form = $('.contact-form form');
const modal = $('#formSuccessModal');
const emailBtn = $('#emailOption');
const whatsappBtn = $('#whatsappOption');

let formDataCache=null;

if(form && modal){

    form.addEventListener('submit', e=>{
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const service = form.querySelector('select').value;
        const message = form.querySelector('textarea').value.trim();

        if(!name || !phone){
            alert("Please enter Name and Phone number");
            return;
        }

        formDataCache={name,email,phone,service,message};
        modal.classList.add('active');
    });
}


/* ---- WHATSAPP ---- */
if(whatsappBtn){
    whatsappBtn.addEventListener('click', ()=>{
        if(!formDataCache) return;

        let text=`Hello, I am interested in solar services.%0A%0A`;
        text+=`Name: ${formDataCache.name}%0A`;
        text+=`Phone: ${formDataCache.phone}%0A`;
        if(formDataCache.email) text+=`Email: ${formDataCache.email}%0A`;
        if(formDataCache.service) text+=`Service: ${formDataCache.service}%0A`;
        if(formDataCache.message) text+=`Message: ${formDataCache.message}`;

        window.open(`https://wa.me/919931798080?text=${text}`,'_blank');
        modal.classList.remove('active');
        form?.reset();
    });
}


/* ---- EMAIL ---- */
if(emailBtn){
    emailBtn.addEventListener('click', ()=>{
        if(!formDataCache) return;

        const subject=encodeURIComponent("Solar Service Inquiry");

        let body=`Hello,
I would like information about solar services.

Name: ${formDataCache.name}
Phone: ${formDataCache.phone}
Email: ${formDataCache.email || '-'}
Service: ${formDataCache.service || '-'}
Message: ${formDataCache.message || '-'}`;

        const encodedBody=encodeURIComponent(body);

        const isMobile=/Android|iPhone|iPad/i.test(navigator.userAgent);

        if(isMobile){
            window.location.href=`mailto:smartsolartrp@gmail.com?subject=${subject}&body=${encodedBody}`;
        }else{
            window.open(`https://mail.google.com/mail/?view=cm&to=smartsolartrp@gmail.com&su=${subject}&body=${encodedBody}`,'_blank');
        }

        modal.classList.remove('active');
        form?.reset();
    });
}


/* =====================================================
   RECOMMEND BUTTON
===================================================== */
const recommendBtn = $('#recommendBtn');
if(recommendBtn){
    recommendBtn.addEventListener('click', e=>{
        e.preventDefault();

        if(window.innerWidth>=992){
            if(location.pathname.includes("index.html") || location.pathname==="/"){
                $('#contact')?.scrollIntoView({behavior:'smooth'});
            }else{
                location.href="index.html#contact";
            }
        }else{
            window.open("https://wa.me/9931798080?text=Hello%20I%20want%20more%20information",'_blank');
        }
    });
}

});

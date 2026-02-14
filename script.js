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
   HERO SLIDER
===================================================== */
const slides = $$('.slide');
const nextBtn = $('.next');
const prevBtn = $('.prev');

if(slides.length){
    let current=0;

    const showSlide=i=>{
        slides.forEach(s=>s.classList.remove('active'));
        slides[i].classList.add('active');
    };

    setInterval(()=>{
        current=(current+1)%slides.length;
        showSlide(current);
    },3500);

    nextBtn?.addEventListener('click', ()=>showSlide(current=(current+1)%slides.length));
    prevBtn?.addEventListener('click', ()=>showSlide(current=(current-1+slides.length)%slides.length));
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

});

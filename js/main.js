// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
let selectedDate = null;
const supabaseClient = typeof supabase !== 'undefined'
        ? supabase.createClient(
                'https://bmopddzlchraqgymmamo.supabase.co',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb3BkZHpsY2hyYXFneW1tYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjQ0NjcsImV4cCI6MjA5MjA0MDQ2N30.5L8gXMhopPXCmg29xbXfy6aME2kTr9FVEYq_MQJuJ4w'
        )
        : null;
async function mostrarFechas() {
    if (!supabaseClient) {
        return;
    }
    
  const container = document.getElementById("fechas-container");
 if (!container) return;
 if (container.children.length > 0) return;
  const { data, error } = await supabaseClient
    .from("tours")
    .select("*")
    .gte("date", new Date().toISOString().split("T")[0]) 
    .order("date", { ascending: true });

  if (error) {
    console.error(error);
    container.innerHTML = "Error cargando fechas";
    return;
  }
data.forEach(tour => {
  const available = tour.capacity - tour.booked;

  const div = document.createElement("div");
  div.classList.add("fecha");

  if (available > 0) {
    div.classList.add("disponible");
    div.innerText = `${tour.date} — ${available} plazas`;
  } else {
    div.classList.add("completo");
    div.innerText = `${tour.date} — COMPLETO`;
  }

  // 🔥 CLICK en fecha
  div.addEventListener("click", () => {
    if (available <= 0) return;

    selectedDate = tour.date;

    // feedback visual
    document.querySelectorAll(".fecha").forEach(f => f.classList.remove("active"));
    div.classList.add("active");

    // abrir flujo de reserva
    abrirReserva(tour.date);
  });

  container.appendChild(div);
});
function abrirReserva(date) {
  const people = prompt("¿Cuántas personas quieres reservar?");

  if (!people || people <= 0) return;

  reservar(date, parseInt(people));
}


}

async function reservar(date, people) {
  const { data } = await supabaseClient
    .from("tours")
    .select("*")
    .eq("date", date)
    .single();

  const available = data.capacity - data.booked;

  if (available < people) {
    alert("No hay plazas suficientes");
    return;
  }

  const res = await fetch("https://bmopddzlchraqgymmamo.supabase.co/functions/v1/create-checkout-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ date, people }),
});

  const { url } = await res.json();


   window.location.href = url;
}


// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (link.classList.contains('nav-dropdown-toggle')) {
            return;
        }

        if (navMenu) {
            navMenu.classList.remove('active');
        }

        document.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
            dropdown.classList.remove('open');
            const toggleButton = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");
const navDropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

navDropdownToggles.forEach((toggleButton) => {
    toggleButton.addEventListener('click', (event) => {
        const dropdown = toggleButton.closest('.nav-dropdown');
        if (!dropdown) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (!isMobile) {
            dropdown.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
            return;
        }

        event.preventDefault();

        const willOpen = !dropdown.classList.contains('open');

        document.querySelectorAll('.nav-dropdown.open').forEach((openDropdown) => {
            if (openDropdown !== dropdown) {
                openDropdown.classList.remove('open');
                const openToggle = openDropdown.querySelector('.nav-dropdown-toggle');
                if (openToggle) {
                    openToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        dropdown.classList.toggle('open', willOpen);
        toggleButton.setAttribute('aria-expanded', String(willOpen));
    });
});

window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
        document.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
            dropdown.classList.remove('open');
            const toggleButton = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
        if (dropdown.contains(event.target)) return;

        dropdown.classList.remove('open');
        const toggleButton = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Hide/Show Navbar on Scroll
// ===================================
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    if (!navbar) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY < 100) {
        // At the top of the page
        navbar.classList.remove('navbar-hidden');
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

if (navbar) {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
            });
            ticking = true;
        }
    });
}

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('nav-link-active');
        } else if (navLink) {
            navLink.classList.remove('nav-link-active');
        }
    });
}

if (sections.length > 0) {
    window.addEventListener('scroll', highlightNavigation);
}

// ===================================
// Image Lazy Loading (for better performance)
// ===================================
const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// Language Switcher
// ===================================
let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data attributes
    // document.querySelectorAll('[data-en][data-es]').forEach(element => {
    //     if (element.tagName === 'A' || element.tagName === 'BUTTON') {
    //         element.textContent = element.getAttribute(`data-${lang}`);
    //     } else {
    //         element.textContent = element.getAttribute(`data-${lang}`);
    //     }
    // });
    document.querySelectorAll('[data-en][data-es]').forEach(element => {

    if (element.classList.contains('language-link')) {
        element.setAttribute('href', element.getAttribute(`data-${lang}`));
        return;
    }

    // Si el elemento tiene estructura interna
    if (element.hasAttribute('data-structured')) {
        const label = element.querySelector('.btn-label');
        if (label) {
            label.textContent = element.getAttribute(`data-${lang}`);
        }
    } 
    else {
        element.textContent = element.getAttribute(`data-${lang}`);
    }

});

    document.querySelectorAll('[data-placeholder-en][data-placeholder-es]').forEach((element) => {
        element.setAttribute('placeholder', element.getAttribute(`data-placeholder-${lang}`));
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;

    if (typeof window.refreshFaqSearch === 'function') {
        window.refreshFaqSearch();
    }
}

// Language button click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

document.querySelectorAll(".language-link").forEach((link) => {
  const newHref = link.dataset[currentLang];

  if (newHref) {
    link.href = newHref;
  }
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    initCarousel();
    initImageReveal();
    initMobileTourCardBackgrounds();
    initPrivateTourForm();
    initFaqSearch();
});

// ===================================
// Mobile Tour Card Background Rotation
// ===================================
function initMobileTourCardBackgrounds() {
    const mobileBreakpoint = window.matchMedia('(max-width: 768px)');
    const tourCards = Array.from(document.querySelectorAll('.tour-card'));

    if (tourCards.length === 0) return;

    const mobileBackgroundSets = [
        [
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752939/FOTON_10_lpw4gi.jpg',
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752953/FOTON_1_aa2fix.jpg',
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752951/FOTON_4_z5t3z2.jpg'
        ],
        [
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752941/FOTON_9_qevmtn.jpg',
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752938/FOTON_3_kdbgpq.jpg',
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752952/FOTON_6_gyn3vl.jpg'
        ],
        [
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752939/FOTON_8_r598ic.jpg',
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752938/FOTON_5_fjb344.jpg',
            'https://res.cloudinary.com/dky2dtykl/image/upload/q_auto/f_auto/v1777752939/FOTON_7_fr0grr.jpg'
        ]
    ];

    const stateByCard = new WeakMap();
    const slideDuration = 700;
    const slideDelay = 3000;

    function buildBackground(url) {
        return `linear-gradient(rgba(17, 17, 17, 0.72), rgba(17, 17, 17, 0.72)), url('${url}')`;
    }

    function setLayerBackground(layer, imageUrl) {
        layer.style.backgroundImage = buildBackground(imageUrl);
    }

    function clearTimers(state) {
        if (state.intervalId) {
            window.clearInterval(state.intervalId);
            state.intervalId = null;
        }

        if (state.timeoutId) {
            window.clearTimeout(state.timeoutId);
            state.timeoutId = null;
        }
    }

    function resetCard(state) {
        clearTimers(state);
        state.isAnimating = false;
        state.currentIndex = 0;

        const firstImage = state.images[0];
        const secondImage = state.images[1] || firstImage;

        setLayerBackground(state.currentLayer, firstImage);
        setLayerBackground(state.nextLayer, secondImage);

        state.currentLayer.classList.add('is-current');
        state.currentLayer.style.transition = 'none';
        state.currentLayer.style.transform = 'translateX(0)';

        state.nextLayer.classList.remove('is-current');
        state.nextLayer.style.transition = 'none';
        state.nextLayer.style.transform = 'translateX(100%)';
    }

    function finishSlide(state, nextIndex, incomingLayer, outgoingLayer) {
        outgoingLayer.style.transition = 'none';
        outgoingLayer.style.transform = 'translateX(100%)';
        outgoingLayer.classList.remove('is-current');

        incomingLayer.style.transition = 'none';
        incomingLayer.style.transform = 'translateX(0)';
        incomingLayer.classList.add('is-current');

        state.currentLayer = incomingLayer;
        state.nextLayer = outgoingLayer;
        state.currentIndex = nextIndex;
        state.isAnimating = false;
        state.timeoutId = null;
    }

    function advanceCard(state) {
        if (!mobileBreakpoint.matches || !state.isActive || state.isAnimating || state.images.length < 2) {
            return;
        }

        state.isAnimating = true;

        const outgoingLayer = state.currentLayer;
        const incomingLayer = state.nextLayer;
        const nextIndex = (state.currentIndex + 1) % state.images.length;

        setLayerBackground(incomingLayer, state.images[nextIndex]);

        outgoingLayer.style.transition = 'none';
        outgoingLayer.style.transform = 'translateX(0)';

        incomingLayer.style.transition = 'none';
        incomingLayer.style.transform = 'translateX(100%)';

        incomingLayer.offsetHeight;

        outgoingLayer.style.transition = `transform ${slideDuration}ms ease`;
        incomingLayer.style.transition = `transform ${slideDuration}ms ease`;

        requestAnimationFrame(() => {
            outgoingLayer.style.transform = 'translateX(-100%)';
            incomingLayer.style.transform = 'translateX(0)';
        });

        state.timeoutId = window.setTimeout(() => {
            finishSlide(state, nextIndex, incomingLayer, outgoingLayer);
        }, slideDuration + 40);
    }

    function startCardRotation(state) {
        if (state.intervalId || !mobileBreakpoint.matches || !state.isActive || state.images.length < 2) {
            return;
        }

        state.intervalId = window.setInterval(() => {
            advanceCard(state);
        }, slideDelay);
    }

    function stopCardRotation(state) {
        clearTimers(state);
        state.isAnimating = false;
    }

    function syncCardRotation(state) {
        if (!mobileBreakpoint.matches || !state.isActive || document.hidden) {
            stopCardRotation(state);
            resetCard(state);
            return;
        }

        startCardRotation(state);
    }

    tourCards.forEach((card, index) => {
        const images = mobileBackgroundSets[index];
        if (!images || images.length === 0) return;

        const backgroundShell = document.createElement('div');
        backgroundShell.className = 'tour-card-bg';

        const currentLayer = document.createElement('div');
        currentLayer.className = 'tour-card-bg-layer is-current';

        const nextLayer = document.createElement('div');
        nextLayer.className = 'tour-card-bg-layer';

        backgroundShell.appendChild(currentLayer);
        backgroundShell.appendChild(nextLayer);
        card.prepend(backgroundShell);

        const state = {
            card,
            images,
            currentIndex: 0,
            currentLayer,
            nextLayer,
            intervalId: null,
            timeoutId: null,
            isActive: false,
            isAnimating: false
        };

        resetCard(state);
        stateByCard.set(card, state);
    });

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const state = stateByCard.get(entry.target);
            if (!state) return;

            entry.target.classList.toggle('active', entry.isIntersecting);
            state.isActive = entry.isIntersecting;
            syncCardRotation(state);
        });
    }, {
        threshold: 0.6
    });

    tourCards.forEach((card) => {
        if (stateByCard.has(card)) {
            activeObserver.observe(card);
        }
    });

    function syncAllCards() {
        tourCards.forEach((card) => {
            const state = stateByCard.get(card);
            if (!state) return;

            state.isActive = state.card.classList.contains('active');
            syncCardRotation(state);
        });
    }

    const activeClassObserver = new MutationObserver((entries) => {
        entries.forEach((entry) => {
            const state = stateByCard.get(entry.target);
            if (!state) return;

            state.isActive = entry.target.classList.contains('active');
            syncCardRotation(state);
        });
    });

    tourCards.forEach((card) => {
        if (stateByCard.has(card)) {
            activeClassObserver.observe(card, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    });

    document.addEventListener('visibilitychange', () => {
        syncAllCards();
    });

    if (typeof mobileBreakpoint.addEventListener === 'function') {
        mobileBreakpoint.addEventListener('change', syncAllCards);
    } else {
        mobileBreakpoint.addListener(syncAllCards);
    }

    syncAllCards();
}

// ===================================
// Image Reveal on Scroll
// ===================================
function initImageReveal() {
    const images = document.querySelectorAll('.decorative-img, .photo-item');
    
    if (!images.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Aparece cuando entra al viewport
                entry.target.classList.add('visible');
            } else {
                // Desaparece cuando sale del viewport
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all images
    images.forEach(img => {
        observer.observe(img);
    });
}

// Make appear the deployable of the hero section
 function toggleHeroCTA() {
    //cambiar a otra clase para hacer una transición suave
    const hiddenText = document.querySelector('.hidden-text');
    if (hiddenText) {
        hiddenText.classList.toggle('visible');
    }
}
const cards = document.querySelectorAll('.tour-card');

// ===================================
// Carousel Gallery
// ===================================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    
    // Exit early if carousel doesn't exist (it's commented out)
    if (!track) return;
    
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Update carousel position
    function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // Next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateCarousel(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
            resetAutoSlide();
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2500); // Change slide every 2.5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Start auto-slide on load
    startAutoSlide();

    // Pause auto-slide on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });
}

function initPrivateTourForm() {
    const form = document.querySelector('[data-private-tour-form]');
    const result = document.querySelector('[data-private-tour-result]');

    if (!form || !result) return;

    const emailLink = result.querySelector('[data-private-email-link]');
    const whatsappLink = result.querySelector('[data-private-whatsapp-link]');
    const summary = result.querySelector('[data-private-summary]');

    const copy = {
        en: {
            title: 'Your request is ready',
            lead: 'Use one of these channels to send the details. I will reply with availability and a tailored proposal.',
            summaryHeading: 'Trip brief',
            emailCta: 'Send by email',
            whatsappCta: 'Send by WhatsApp',
            subject: 'Private tour request in Amsterdam',
            labels: {
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                date: 'Preferred date',
                guests: 'Number of guests',
                duration: 'Preferred duration',
                focus: 'Tour focus',
                message: 'Extra details'
            }
        },
        es: {
            title: 'Tu solicitud esta lista',
            lead: 'Usa uno de estos canales para enviarme los detalles. Te responderé con disponibilidad y una propuesta a medida.',
            summaryHeading: 'Resumen de la solicitud',
            emailCta: 'Enviar por email',
            whatsappCta: 'Enviar por WhatsApp',
            subject: 'Solicitud de tour privado en Amsterdam',
            labels: {
                name: 'Nombre',
                email: 'Email',
                phone: 'Telefono',
                date: 'Fecha preferida',
                guests: 'Numero de personas',
                duration: 'Duracion preferida',
                focus: 'Enfoque del tour',
                message: 'Detalles adicionales'
            }
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const langCopy = copy[currentLang] || copy.en;
        const fields = [
            ['name', formData.get('name')],
            ['email', formData.get('email')],
            ['phone', formData.get('phone')],
            ['date', formData.get('date')],
            ['guests', formData.get('guests')],
            ['duration', formData.get('duration')],
            ['focus', formData.get('focus')],
            ['message', formData.get('message')]
        ].filter(([, value]) => value);

        const messageLines = fields.map(([key, value]) => `${langCopy.labels[key]}: ${value}`);
        const body = messageLines.join('\n');
        const whatsappBody = encodeURIComponent(`${langCopy.subject}\n\n${body}`);
        const mailtoBody = encodeURIComponent(body);

        if (summary) {
            summary.innerHTML = `
                <h3>${langCopy.summaryHeading}</h3>
                <p>${langCopy.lead}</p>
                <ul>${messageLines.map((line) => `<li>${line}</li>`).join('')}</ul>
            `;
        }

        if (emailLink) {
            emailLink.href = `mailto:jorgemarinmarlasca@gmail.com?subject=${encodeURIComponent(langCopy.subject)}&body=${mailtoBody}`;
            emailLink.textContent = langCopy.emailCta;
        }

        if (whatsappLink) {
            whatsappLink.href = `https://wa.me/34662226546?text=${whatsappBody}`;
            whatsappLink.textContent = langCopy.whatsappCta;
        }

        result.hidden = false;
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function initFaqSearch() {
    const searchInput = document.querySelector('[data-faq-search]');
    const searchStatus = document.querySelector('[data-faq-search-status]');
    const emptyState = document.querySelector('[data-faq-search-empty]');
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));

    if (!searchInput || !searchStatus || !emptyState || faqItems.length === 0) return;

    function getStatusCopy(visibleCount) {
        return currentLang === 'es'
            ? `${visibleCount} preguntas encontradas.`
            : `${visibleCount} questions found.`;
    }

    const stopWords = new Set([
        'a', 'al', 'and', 'any', 'at', 'by', 'con', 'como', 'como', 'de', 'del', 'do', 'el', 'en', 'es', 'for', 'from', 'how', 'i', 'in', 'is', 'la', 'las',
        'lo', 'los', 'me', 'mi', 'my', 'of', 'or', 'para', 'por', 'que', 'se', 'si', 'the', 'to', 'un', 'una', 'what', 'where', 'with', 'y'
    ]);

    const synonymGroups = [
        ['pet', 'pets', 'animal', 'animals', 'dog', 'dogs', 'cat', 'cats', 'mascota', 'mascotas', 'animales', 'perro', 'perros', 'gato', 'gatos'],
        ['price', 'pricing', 'cost', 'costs', 'fee', 'fees', 'pay', 'payment', 'payments', 'price range', 'minimum', 'tip', 'tips', 'donation', 'donations', 'free tour', 'pay what you want', 'precio', 'precios', 'coste', 'costes', 'pago', 'pagos', 'tarifa', 'tarifas', 'aportacion', 'aportaciones', 'minimo', 'minima', 'donativo', 'propina'],
        ['book', 'booking', 'reserve', 'reservation', 'reservations', 'bookings', 'availability', 'slot', 'slots', 'spot', 'spots', 'schedule', 'day', 'time', 'confirm', 'confirmation', 'reserva', 'reservar', 'reservas', 'disponibilidad', 'plaza', 'plazas', 'horario', 'fecha', 'fechas', 'hora', 'horas', 'confirmar', 'confirmacion', 'confirmación'],
        ['cancel', 'cancellation', 'change', 'modify', 'modification', 'cancelar', 'cancelacion', 'cambio', 'cambiar', 'modificar', 'modificacion'],
        ['duration', 'length', 'time', 'hours', 'minutes', 'pace', 'duracion', 'tiempo', 'horas', 'minutos', 'ritmo'],
        ['language', 'languages', 'idioma', 'idiomas', 'spanish', 'espanol', 'español', 'english', 'ingles', 'inglés', 'dutch', 'neerlandes', 'neerlandés'],
        ['meeting', 'meeting point', 'meetingpoint', 'point', 'location', 'meeting place', 'meeting spot', 'dam square', 'krasnapolsky', 'umbrella', 'orange umbrella', 'punto de encuentro', 'encuentro', 'ubicacion', 'ubicación', 'lugar', 'plaza dam', 'paraguas', 'paraguas naranja'],
        ['mobility', 'wheelchair', 'accessible', 'accessibility', 'reduced mobility', 'stairs', 'rest', 'sit', 'elderly', 'movilidad', 'silla de ruedas', 'accesible', 'accesibilidad', 'escaleras', 'descansar', 'sentarse', 'mayores'],
        ['weather', 'rain', 'cold', 'clothes', 'clothing', 'forecast', 'shoes', 'footwear', 'snow', 'storm', 'ropa', 'clima', 'lluvia', 'frio', 'frío', 'abrigo', 'pronostico', 'pronóstico', 'calzado', 'nieve', 'tormenta'],
        ['private', 'custom', 'customized', 'personalized', 'exclusive', 'tailor made', 'privado', 'privada', 'personalizado', 'personalizada', 'exclusivo', 'exclusiva', 'a medida'],
        ['late', 'lost', 'lose', 'group', 'tarde', 'retraso', 'perder', 'perdido', 'grupo'],
        ['card', 'cards', 'cash', 'donation', 'bizum', 'transfer', 'bank transfer', 'tikki', 'tarjeta', 'tarjetas', 'efectivo', 'donacion', 'donación', 'transferencia'],
        ['transport', 'car', 'metro', 'tram', 'bus', 'train', 'parking', 'directions', 'how to get', 'transporte', 'coche', 'tranvia', 'tranvía', 'autobus', 'autobús', 'tren', 'parking', 'aparcamiento', 'estacionamiento', 'como llegar', 'cómo llegar'],
        ['contact', 'call', 'email', 'whatsapp', 'instagram', 'phone', 'business hours', 'help', 'question', 'questions', 'contacto', 'llamada', 'correo', 'telefono', 'teléfono', 'horario', 'ayuda', 'duda', 'dudas'],
        ['children', 'child', 'kid', 'kids', 'family', 'families', 'minor', 'minors', 'ages', 'adults', 'nino', 'niño', 'ninos', 'niños', 'familia', 'familias', 'menor', 'menores', 'edades', 'adulto', 'adultos'],
        ['route', 'itinerary', 'stops', 'monuments', 'landmarks', 'places', 'highlights', 'includes', 'consist', 'recorrido', 'itinerario', 'paradas', 'monumentos', 'lugares', 'incluye', 'incluye', 'imprescindible'],
        ['photo', 'photos', 'photography', 'pictures', 'camera', 'foto', 'fotos', 'fotografia', 'fotografía', 'imagenes', 'imágenes'],
        ['history', 'culture', 'gastronomy', 'curiosities', 'historic', 'historia', 'cultura', 'gastronomia', 'gastronomía', 'curiosidades', 'historico', 'histórico'],
        ['restaurant', 'restaurants', 'food', 'eat', 'comida', 'restaurante', 'restaurantes', 'comer'],
        ['question', 'questions', 'answer', 'answers', 'faq', 'pregunta', 'preguntas', 'respuesta', 'respuestas', 'duda', 'dudas']
    ];

    const synonymMap = synonymGroups.reduce((map, group) => {
        group.forEach((term) => {
            map.set(normalizeSearchText(term), group.map((item) => normalizeSearchText(item)));
        });
        return map;
    }, new Map());
    const synonymTerms = Array.from(synonymMap.keys());

    function normalizeSearchText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function tokenizeSearchText(text) {
        return normalizeSearchText(text)
            .split(' ')
            .filter((token) => token.length > 1 && !stopWords.has(token));
    }

    function singularizeToken(token) {
        if (token.endsWith('ies') && token.length > 4) return `${token.slice(0, -3)}y`;
        if (token.endsWith('es') && token.length > 4) return token.slice(0, -2);
        if (token.endsWith('s') && token.length > 3) return token.slice(0, -1);
        return token;
    }

    function getTokenRoot(token) {
        const suffixes = [
            'izaciones', 'izacion', 'iciones', 'icion', 'aciones', 'acion', 'amiento', 'imientos', 'imiento', 'adoras', 'adores', 'adora', 'ador',
            'mente', 'idades', 'idad', 'ismos', 'ismo', 'istas', 'ista', 'logias', 'logia', 'amente', 'ments', 'ment', 'ation', 'ations', 'tions',
            'tion', 'ings', 'ing', 'ness', 'less', 'able', 'ible', 'ized', 'izer', 'ised', 'ises', 'ers', 'er', 'ies', 'ied', 'ed', 'ados', 'adas',
            'ado', 'ada', 'idos', 'idas', 'ido', 'ida', 'icos', 'icas', 'ico', 'ica'
        ];
        let root = singularizeToken(token);

        suffixes.some((suffix) => {
            if (root.endsWith(suffix) && root.length - suffix.length >= 4) {
                root = root.slice(0, -suffix.length);
                return true;
            }
            return false;
        });

        return root;
    }

    function createPhraseUnits(tokens) {
        const units = [...tokens];

        for (let index = 0; index < tokens.length - 1; index += 1) {
            units.push(`${tokens[index]} ${tokens[index + 1]}`);
        }

        for (let index = 0; index < tokens.length - 2; index += 1) {
            units.push(`${tokens[index]} ${tokens[index + 1]} ${tokens[index + 2]}`);
        }

        return units;
    }

    function buildSearchProfile(text) {
        const tokens = tokenizeSearchText(text);
        const uniqueTokens = Array.from(new Set(tokens));

        return {
            tokens: uniqueTokens,
            tokenSet: new Set(uniqueTokens),
            roots: new Set(uniqueTokens.map((token) => getTokenRoot(token)).filter((root) => root.length >= 3))
        };
    }

    function getLevenshteinDistance(source, target) {
        if (source === target) return 0;
        if (!source.length) return target.length;
        if (!target.length) return source.length;

        const previousRow = Array.from({ length: target.length + 1 }, (_, index) => index);

        for (let row = 1; row <= source.length; row += 1) {
            let previousDiagonal = previousRow[0];
            previousRow[0] = row;

            for (let column = 1; column <= target.length; column += 1) {
                const storedValue = previousRow[column];
                const substitutionCost = source[row - 1] === target[column - 1] ? 0 : 1;

                previousRow[column] = Math.min(
                    previousRow[column] + 1,
                    previousRow[column - 1] + 1,
                    previousDiagonal + substitutionCost
                );
                previousDiagonal = storedValue;
            }
        }

        return previousRow[target.length];
    }

    function areTokensRelated(queryToken, candidateToken) {
        if (queryToken === candidateToken) return true;

        const queryRoot = getTokenRoot(queryToken);
        const candidateRoot = getTokenRoot(candidateToken);

        if (queryRoot.length >= 4 && queryRoot === candidateRoot) return true;
        if (queryRoot.length >= 5 && candidateRoot.startsWith(queryRoot)) return true;
        if (candidateRoot.length >= 5 && queryRoot.startsWith(candidateRoot)) return true;
        if (queryToken.length < 4 || candidateToken.length < 4) return false;

        // Keep fuzzy matching for longer words and likely typos,
        // but avoid false positives on short words such as "perro" -> "pero".
        if (queryToken.length < 6 || candidateToken.length < 6) return false;
        if (Math.abs(queryToken.length - candidateToken.length) > 1) return false;

        const maxDistance = Math.max(1, Math.floor(Math.min(queryToken.length, candidateToken.length) / 4));
        return getLevenshteinDistance(queryToken, candidateToken) <= maxDistance;
    }

    function getExpandedTerms(query) {
        const baseTerms = tokenizeSearchText(query);
        const expandedTerms = new Set(createPhraseUnits(baseTerms));

        createPhraseUnits(baseTerms).forEach((term) => {
            const relatedGroups = [];
            const exactSynonyms = synonymMap.get(term);

            if (exactSynonyms) {
                relatedGroups.push(exactSynonyms);
            }

            if (!exactSynonyms && term.length >= 4) {
                synonymTerms.forEach((synonymTerm) => {
                    if (synonymTerm.startsWith(term)) {
                        relatedGroups.push(synonymMap.get(synonymTerm));
                    }
                });
            }

            relatedGroups.forEach((synonyms) => {
                synonyms.forEach((synonym) => {
                    expandedTerms.add(synonym);
                });
            });
        });

        return Array.from(expandedTerms);
    }

    function matchesSingleTerm(term, profile) {
        if (profile.tokenSet.has(term)) return true;
        if (term.length < 3) return false;

        return profile.tokens.some((token) => token.startsWith(term));
    }

    function hasConceptMatch(queryProfile, entryProfile) {
        if (queryProfile.tokens.length === 0) return false;

        const matchedTokens = queryProfile.tokens.filter((queryToken) => {
            const queryRoot = getTokenRoot(queryToken);

            if (entryProfile.tokenSet.has(queryToken) || entryProfile.roots.has(queryRoot)) {
                return true;
            }

            return entryProfile.tokens.some((candidateToken) => areTokensRelated(queryToken, candidateToken));
        });

        const minimumMatches = Math.max(1, Math.ceil(queryProfile.tokens.length * 0.6));
        return matchedTokens.length >= minimumMatches;
    }

    const faqIndex = faqItems.map((item) => ({
        item,
        searchableText: normalizeSearchText(item.textContent),
        profile: buildSearchProfile(item.textContent)
    }));

    function applyFilter() {
        const query = normalizeSearchText(searchInput.value.trim());
        const hasQuery = query !== '';
        let visibleCount = 0;
        const expandedTerms = hasQuery ? getExpandedTerms(query) : [];
        const queryProfile = hasQuery ? buildSearchProfile(query) : null;

        faqIndex.forEach(({ item, searchableText, profile }) => {
            const matchesDirectly = hasQuery && expandedTerms.some((term) => {
                return term.includes(' ')
                    ? searchableText.includes(term)
                    : matchesSingleTerm(term, profile);
            });
            const matchesByConcept = hasQuery && queryProfile ? hasConceptMatch(queryProfile, profile) : false;
            const matches = matchesDirectly || matchesByConcept;

            item.classList.toggle('is-filtered-out', !matches);

            if (matches) {
                item.setAttribute('open', 'open');
                visibleCount += 1;
            } else {
                item.removeAttribute('open');
            }
        });

        searchStatus.textContent = hasQuery ? getStatusCopy(visibleCount) : '';
        emptyState.hidden = !hasQuery || visibleCount !== 0;
    }

    searchInput.addEventListener('input', applyFilter);
    window.refreshFaqSearch = applyFilter;
    applyFilter();
}


// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
let selectedDate = null;
const supabaseClient = supabase.createClient(
  "https://bmopddzlchraqgymmamo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb3BkZHpsY2hyYXFneW1tYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjQ0NjcsImV4cCI6MjA5MjA0MDQ2N30.5L8gXMhopPXCmg29xbXfy6aME2kTr9FVEYq_MQJuJ4w"
);
async function mostrarFechas() {
    
  const container = document.getElementById("fechas-container");
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
        navMenu.classList.remove('active');
    });
});
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
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

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbar();
        });
        ticking = true;
    }
});

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
            navLink.style.color = 'var(--primary-color)';
        } else if (navLink) {
            navLink.style.color = 'var(--text-color)';
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

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

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
}

// Language button click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    initCarousel();
    initImageReveal();
    initToursCarousel();
});

// ===================================
// Tours Carousel (Mobile/Tablet only)
// ===================================
function initToursCarousel() {
    const toursGrid = document.querySelector('.tours-grid');
    const tourCards = Array.from(toursGrid.children);
    const prevBtn = document.querySelector('.tours-carousel-prev');
    const nextBtn = document.querySelector('.tours-carousel-next');
    const dotsContainer = document.querySelector('.tours-carousel-dots');
    
    if (!toursGrid || tourCards.length === 0) return;

    let currentIndex = 0;
    let isCarouselActive = false;

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        tourCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('tours-carousel-dot');
            dot.setAttribute('aria-label', `Go to tour ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
    }

    // Update carousel position
    function updateCarousel(index) {
        if (!isCarouselActive) return;
        
        const offset = -index * 100;
        toursGrid.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // Next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % tourCards.length;
        updateCarousel(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + tourCards.length) % tourCards.length;
        updateCarousel(prevIndex);
    }

    // Check if mobile/tablet
    function checkCarouselMode() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && !isCarouselActive) {
            // Activate carousel
            isCarouselActive = true;
            createDots();
            updateCarousel(0);
        } else if (!isMobile && isCarouselActive) {
            // Deactivate carousel
            isCarouselActive = false;
            toursGrid.style.transform = '';
            dotsContainer.innerHTML = '';
        }
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Dot clicks
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tours-carousel-dot')) {
            const dots = Array.from(dotsContainer.children);
            const index = dots.indexOf(e.target);
            updateCarousel(index);
        }
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    toursGrid.addEventListener('touchstart', (e) => {
        if (!isCarouselActive) return;
        touchStartX = e.changedTouches[0].screenX;
    });

    toursGrid.addEventListener('touchend', (e) => {
        if (!isCarouselActive) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }

    // Initialize and handle resize
    checkCarouselMode();
    window.addEventListener('resize', checkCarouselMode);
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


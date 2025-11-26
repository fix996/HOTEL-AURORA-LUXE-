// Mobile Menu Toggle
document.getElementById('mobileMenu').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.slider-dot');

function showTestimonial(n) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 6000);

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImg.src = item.querySelector('img').src;
        lightbox.classList.add('active');
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentImageIndex].querySelector('img').src;
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentImageIndex].querySelector('img').src;
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Admin Panel
const adminBtn = document.getElementById('adminBtn');
const adminPanel = document.getElementById('adminPanel');
const adminClose = document.getElementById('adminClose');
const adminTabs = document.querySelectorAll('.admin-tab');
const adminContents = document.querySelectorAll('.admin-content');

adminBtn.addEventListener('click', () => {
    // Simulación de login (en producción esto sería más seguro)
    const username = prompt('Usuario:');
    const password = prompt('Contraseña:');
    
    if (username === 'admin' && password === 'admin') {
        adminPanel.classList.add('active');
    } else {
        alert('Credenciales incorrectas');
    }
});

adminClose.addEventListener('click', () => {
    adminPanel.classList.remove('active');
});

adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        adminTabs.forEach(t => t.classList.remove('active'));
        adminContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.getElementById('navMenu').classList.remove('active');
    });
});

// Form Submission
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por su reserva! Nos pondremos en contacto con usted pronto.');
    this.reset();
    
    // Track form submission in admin panel
    const currentCount = parseInt(document.getElementById('contactForms').textContent);
    document.getElementById('contactForms').textContent = currentCount + 1;
});

// Track button clicks for statistics
document.querySelectorAll('.btn-reserve, .floating-btn').forEach(button => {
    button.addEventListener('click', function() {
        const currentCount = parseInt(document.getElementById('reservationClicks').textContent);
        document.getElementById('reservationClicks').textContent = currentCount + 1;
    });
});

// Track room views
const roomCards = document.querySelectorAll('.room-card');
roomCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const currentCount = parseInt(document.getElementById('roomViews').textContent);
        document.getElementById('roomViews').textContent = currentCount + 1;
    }, { once: true }); // Count only once per session
});

// Increment total visitors on page load
window.addEventListener('load', function() {
    const currentCount = parseInt(document.getElementById('totalVisitors').textContent);
    document.getElementById('totalVisitors').textContent = currentCount + 1;
});
/* ============================================
   CLASSIQUE CYCLING - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initPortfolioFilter();
    initLightbox();
});

/* === Navbar Scroll Effect === */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* === Mobile Menu === */
function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

/* === Scroll Animations === */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/* === FAQ Accordion === */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Close other items
            faqItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* === Portfolio Filter === */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            // Filter items
            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(function (item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* === Smooth Scroll for Anchor Links === */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* === Form Validation === */
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

/* === Format Price (for future use) === */
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(price);
}

/* === Lightbox Gallery === */
function initLightbox() {
    var overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;

    var img = document.getElementById('lightbox-img');
    var counter = document.getElementById('lightbox-counter');
    var btnClose = document.getElementById('lightbox-close');
    var btnPrev = document.getElementById('lightbox-prev');
    var btnNext = document.getElementById('lightbox-next');

    var gallery = [];
    var currentIndex = 0;

    function openLightbox(images, startIndex) {
        gallery = images;
        currentIndex = startIndex || 0;
        showImage();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage() {
        img.src = gallery[currentIndex];
        img.alt = 'Imagen ' + (currentIndex + 1) + ' de ' + gallery.length;
        counter.textContent = (currentIndex + 1) + ' / ' + gallery.length;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % gallery.length;
        showImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        showImage();
    }

    // Click on gallery cards
    var galleryCards = document.querySelectorAll('.has-gallery');
    galleryCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var images = JSON.parse(card.getAttribute('data-gallery'));
            openLightbox(images, 0);
        });
    });

    // Controls
    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        prevImage();
    });
    btnNext.addEventListener('click', function (e) {
        e.stopPropagation();
        nextImage();
    });

    // Close on overlay click (not on image)
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

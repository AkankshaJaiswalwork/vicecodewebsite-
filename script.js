document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation & Scroll Effects --- //
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');

    // Handle Scroll for Navbar styling
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveLink();
        });
    }

    // Mobile Menu Toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu on link click
    if (links && navLinks && mobileToggle) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Highlight active link based on scroll position
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                const id = section.getAttribute('id');
                if (id) {
                    current = id;
                }
            }
        });

        if (current) {
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) --- //
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => observer.observe(el));

    // --- FAQ Accordion Logic --- //
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // Check if already active
            const isActive = item.classList.contains('active');

            // First close all FAQs (comment this out if you want multiple open at once)
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle the clicked one
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Dynamic Year in Footer --- //
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Stats Counter Logic --- //
    const statVals = document.querySelectorAll('.stat-val');
    let hasCounted = false;

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                statVals.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    let current = 0;
                    const increment = target / 40; // Adjust for speed
                    const updateValue = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateValue);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    updateValue();
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const marqueeContainer = document.querySelector('.stats-marquee-container');
    if (marqueeContainer) {
        countObserver.observe(marqueeContainer);
    }

});

// --- Lightbox Functions (Global) --- //
function openLightbox(imagePath) {
    const lightbox = document.getElementById('news-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg && imagePath) {
        lightboxImg.src = imagePath;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(e) {
    const lightbox = document.getElementById('news-lightbox');
    if (lightbox && (!e || e.target.id === 'news-lightbox' || e.target.classList.contains('lightbox-close') || e.target.closest('.lightbox-close'))) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}


// --- Home Gallery Slider Logic --- //
function scrollGallery(direction) {
    const slider = document.getElementById('homeGallerySlider');
    if (slider) {
        const scrollAmount = 350 + 24; // slide width + gap
        slider.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

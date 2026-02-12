// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with slide-up class
document.querySelectorAll('.slide-up').forEach(element => {
    observer.observe(element);
});

// Contact Form Enhancement
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        // Create mailto body
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const subject = `Portfolio Contact from ${firstName} ${lastName}`;
        const body = `Name: ${firstName} ${lastName}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        // Update the form action
        contactForm.action = `mailto:kaustuvprajapati@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
}

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-accent');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-accent');
        }
    });
});

// Lazy Loading for Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Prevent default behavior for mailto links in forms
document.querySelectorAll('form[action^="mailto:"]').forEach(form => {
    form.addEventListener('submit', function (e) {
        // Let the default mailto behavior work
        setTimeout(() => {
            form.reset();
        }, 100);
    });
});

// Add animation delays to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Parallax effect for floating elements
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape, .floating-dot, .floating-medium');

    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.02);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Console Easter Egg
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #d4a574;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #a8adb8;');
console.log('%chttps://github.com/kaustuvp', 'font-size: 14px; color: #d4a574;');

// Prevent console errors from external scripts
window.addEventListener('error', (e) => {
    if (e.message.includes('Script error')) {
        e.preventDefault();
    }
});

// Add smooth reveal for project cards
const projectCards = document.querySelectorAll('#projects .card-hover');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Press '/' to focus on first input (if exists)
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const firstInput = document.querySelector('input[type="text"], input[type="email"]');
        if (firstInput && document.activeElement !== firstInput) {
            e.preventDefault();
            firstInput.focus();
        }
    }
});

// Initialize all animations on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial parallax update
    updateParallax();
});



/* -----------------------------
   START DYING PROCESS
----------------------------- */

function removeIcon(icon) {
    icon.dying = true;
    icon.deathStart = Date.now();
}


// ==================== MOBILE MENU TOGGLE ====================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}


// ==================== HEADER SCROLL EFFECT ====================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!header) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});


// ==================== SMOOTH SCROLL (event delegation) ====================
// Uses delegation so it works for anchor links injected after page load.

document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
        e.preventDefault();
        const headerOffset = 72;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});


// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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


// ==================== KEYBOARD NAVIGATION ====================

document.addEventListener('keydown', (e) => {
    if (document.getElementById('cheatsheet-search')) return;

    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const firstInput = document.querySelector('input[type="text"], input[type="email"]');
        if (firstInput && document.activeElement !== firstInput) {
            e.preventDefault();
            firstInput.focus();
        }
    }
});


// ==================== CONSOLE EASTER EGG ====================

console.log('%c Hello there!', 'font-size: 20px; font-weight: bold; color: #d4a574;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #a8adb8;');
console.log('%chttps://github.com/kaustuvp', 'font-size: 14px; color: #d4a574;');


// ==================== PAGE LOAD ====================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

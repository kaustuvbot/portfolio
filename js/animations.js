// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // For .reveal elements, add 'visible'; for legacy .slide-up, add 'fade-in'
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.add('fade-in');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-up, .reveal').forEach(element => {
    observer.observe(element);
});


// ==================== TIMELINE ANIMATION DELAYS ====================

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});


// ==================== PROJECT CARD ANIMATION DELAYS ====================

const projectCards = document.querySelectorAll('#projects .card-hover');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});


// ==================== TYPING EFFECT ====================

document.addEventListener("DOMContentLoaded", function () {
    const text = "Kaustuv Prajapati";
    const speed = 90;
    const target = document.getElementById("typedName");

    if (!target) return;

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            target.classList.add("typing-cursor");
        }
    }

    typeWriter();
});

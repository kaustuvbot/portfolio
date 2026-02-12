// ==================== CONTACT FORM ENHANCEMENT ====================

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const subject = `Portfolio Contact from ${firstName} ${lastName}`;
        const body = `Name: ${firstName} ${lastName}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        contactForm.action = `mailto:kaustuvprajapati@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
}


// ==================== FORM RESET AFTER SUBMIT ====================

document.querySelectorAll('form[action^="mailto:"]').forEach(form => {
    form.addEventListener('submit', function (e) {
        setTimeout(() => {
            form.reset();
        }, 100);
    });
});


// ==================== ERROR SUPPRESSION ====================

window.addEventListener('error', (e) => {
    if (e.message.includes('Script error')) {
        e.preventDefault();
    }
});

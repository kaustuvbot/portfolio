// ==================== CONTACT FORM FEEDBACK ====================

function initForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const btn = document.getElementById('submit-btn');
        const status = document.getElementById('form-status');
        const defaultText = btn ? btn.innerHTML : '';

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!btn) return;

            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            if (status) {
                status.classList.remove('hidden', 'text-accent');
                status.classList.add('text-secondary-text');
                status.textContent = 'Sending your message...';
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    },
                    body: formData,
                });

                const payload = await response.json().catch(() => ({}));

                if (!response.ok || payload.success === 'false') {
                    throw new Error(payload.message || 'Unable to send your message right now.');
                }

                contactForm.reset();
                if (status) {
                    status.classList.remove('hidden', 'text-secondary-text');
                    status.classList.add('text-accent');
                    status.textContent = 'Message sent. Check your email for the FormSubmit activation link if this is the first submission.';
                }
            } catch (error) {
                if (status) {
                    status.classList.remove('hidden', 'text-accent');
                    status.classList.add('text-secondary-text');
                    status.textContent = error.message || 'Message failed to send. Please try again in a moment.';
                }
            } finally {
                btn.innerHTML = defaultText;
                btn.disabled = false;
            }
        });
    }
}

initForm();

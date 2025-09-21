// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initFormHandling();
    initParallaxEffects();
    initTypingAnimation();
    initActiveNavigation();
    initSkillBars();
    initCounterAnimations();
    initFloatingAnimations();
    initCursorTracker();
    initPageTransitions();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu button
        const svg = mobileMenuBtn.querySelector('svg');
        svg.style.transform = mobileMenu.classList.contains('hidden') 
            ? 'rotate(0deg)' 
            : 'rotate(90deg)';
        svg.style.transition = 'transform 0.3s ease';
    });
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const svg = mobileMenuBtn.querySelector('svg');
            svg.style.transform = 'rotate(0deg)';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            const svg = mobileMenuBtn.querySelector('svg');
            svg.style.transform = 'rotate(0deg)';
        }
    });
}

// Header Shadow on Scroll with Active Navigation
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
            header.style.backgroundColor = 'rgba(255, 251, 245, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.classList.remove('shadow-md');
            header.style.backgroundColor = 'rgba(255, 251, 245, 0.8)';
            header.style.backdropFilter = 'blur(5px)';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${id}"]`);
            
            if (entry.isIntersecting && navLink) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('text-accent', 'font-bold');
                    link.classList.add('text-primary-text');
                });
                
                // Add active class to current nav link
                navLink.classList.add('text-accent', 'font-bold');
                navLink.classList.remove('text-primary-text');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => fadeObserver.observe(el));
    
    // Slide up animations with staggered timing
    const slideElements = document.querySelectorAll('.slide-up');
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                slideObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    slideElements.forEach(el => slideObserver.observe(el));
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(el => timelineObserver.observe(el));
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add ripple effect to clicked link
                createRippleEffect(link, e);
            }
        });
    });
}

// Create ripple effect for buttons and links
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Form Handling with Validation
function initFormHandling() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('#submit-btn');
    
    // Add focus animations and validation to inputs
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.3s ease';
            if (label) {
                label.style.color = '#F97316';
                label.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
            if (label && !input.value) {
                label.style.color = '';
                label.style.transform = '';
            }
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Enhanced form submission with mailto fallback
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm(form)) {
            shakeForm(form);
            return;
        }
        
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(form);
        
        // Get form values
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Animate button - loading state
        submitBtn.innerHTML = '<span class="animate-spin inline-block">⏳</span> Opening Email...';
        submitBtn.style.transform = 'scale(0.98)';
        submitBtn.disabled = true;
        
        // Create email content
        const subject = `Portfolio Contact: ${firstName} ${lastName}`;
        const body = `Hello Kaustuv,\n\nI am reaching out through your portfolio website.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${firstName} ${lastName}`;
        
        // Create mailto link
        const mailtoLink = `mailto:kaustuvprajapati@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Try to open email client
        setTimeout(() => {
            try {
                // Create temporary link and click it
                const tempLink = document.createElement('a');
                tempLink.href = mailtoLink;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                
                // Success state
                submitBtn.innerHTML = '✉️ Email Opened!';
                submitBtn.style.backgroundColor = '#10B981';
                submitBtn.style.transform = 'scale(1.05)';
                
                // Success animation
                form.style.animation = 'pulse 0.5s ease';
                
                // Show success message
                showNotification('Email client opened! Please send the email from your default email app.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.transform = 'scale(1)';
                    submitBtn.disabled = false;
                    form.style.animation = '';
                    
                    // Don't reset form data to allow user to copy if needed
                    showNotification('You can copy the message details if needed, or contact directly at kaustuvprajapati@gmail.com', 'info');
                    
                    // Reset label styles but keep form data
                    inputs.forEach(input => {
                        const label = input.previousElementSibling;
                        if (label && input.value) {
                            label.style.color = '#F97316';
                            label.style.transform = 'translateY(-2px)';
                        }
                        // Reset validation styling
                        input.classList.remove('border-red-500', 'bg-red-50');
                        input.classList.add('border-orange-200', 'bg-orange-50');
                    });
                }, 3000);
                
            } catch (error) {
                // Error state
                console.error('Error:', error);
                submitBtn.innerHTML = '❌ Try Again';
                submitBtn.style.backgroundColor = '#EF4444';
                submitBtn.style.transform = 'scale(1.05)';
                
                // Show error message with email address
                showNotification('Could not open email client. Please contact directly: kaustuvprajapati@gmail.com', 'error');
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.transform = 'scale(1)';
                    submitBtn.disabled = false;
                }, 3000);
            }
        }, 1000);
    });
}

// Input validation function
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Remove existing error styling
    input.classList.remove('border-red-500', 'bg-red-50');
    input.classList.add('border-orange-200', 'bg-orange-50');
    
    // Check validation rules
    if (input.required && !value) {
        isValid = false;
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }
    
    // Apply error styling if invalid
    if (!isValid) {
        input.classList.remove('border-orange-200', 'bg-orange-50');
        input.classList.add('border-red-500', 'bg-red-50');
    }
    
    return isValid;
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shake animation for form errors
function shakeForm(form) {
    form.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

// Show notification messages
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#10B981';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#EF4444';
        notification.style.color = 'white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="flex-shrink-0">
                ${type === 'success' ? '✅' : '❌'}
            </div>
            <p class="text-sm font-medium">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto flex-shrink-0 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Enhanced Parallax Effects for Background Elements
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.floating-shape');
    const dots = document.querySelectorAll('.floating-dot');
    const mediums = document.querySelectorAll('.floating-medium');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.01}deg)`;
        });
        
        dots.forEach((dot, index) => {
            const speed = 0.05 + (index * 0.02);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.1 + (index * 30);
            dot.style.transform = `translateY(${yPos}px) rotate(${rotation}deg) scale(${1 + Math.sin(scrolled * 0.01) * 0.1})`;
        });
        
        mediums.forEach((medium, index) => {
            const speed = 0.08 + (index * 0.03);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.05 + (index * 45);
            medium.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Typing Animation for Main Heading
function initTypingAnimation() {
    const titleElement = document.querySelector('h1 .text-accent');
    const subtitleElement = document.querySelector('h2.text-accent');
    
    if (!titleElement || !subtitleElement) return;
    
    const originalText = titleElement.textContent;
    
    // Set fixed width to prevent layout shift
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = window.getComputedStyle(titleElement).fontSize;
    tempSpan.style.fontWeight = window.getComputedStyle(titleElement).fontWeight;
    tempSpan.style.fontFamily = window.getComputedStyle(titleElement).fontFamily;
    tempSpan.textContent = originalText;
    document.body.appendChild(tempSpan);
    
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    // Set minimum width to prevent text shifting
    titleElement.style.minWidth = textWidth + 'px';
    titleElement.style.display = 'inline-block';
    
    // Hide subtitle initially
    subtitleElement.style.opacity = '0';
    subtitleElement.style.transform = 'translateY(10px)';
    subtitleElement.style.transition = 'all 0.5s ease';
    
    // Start typing animation
    titleElement.textContent = '';
    titleElement.style.borderRight = '3px solid #F97316';
    titleElement.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Remove cursor and show subtitle
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
                titleElement.style.animation = 'none';
                
                // Animate in the subtitle
                subtitleElement.style.opacity = '1';
                subtitleElement.style.transform = 'translateY(0)';
            }, 1000);
        }
    }
    
    // Start typing after page loads
    setTimeout(typeWriter, 1000);
}

// Enhanced Floating Animations for Background Elements
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-shape, .floating-dot, .floating-medium');
    
    // Add continuous floating animation to each element
    floatingElements.forEach((element, index) => {
        // Set initial random position variations
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;
        const randomAmplitude = 10 + Math.random() * 20;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        
        // Add CSS custom properties for unique animations
        element.style.setProperty('--float-y', `${randomAmplitude}px`);
        element.style.setProperty('--float-x', `${randomAmplitude * 0.5}px`);
        element.style.setProperty('--float-rotation', `${Math.random() * 360}deg`);
        
        // Apply different animation patterns based on element type
        if (element.classList.contains('floating-shape')) {
            element.style.animation += `, float-large ${randomDuration}s ease-in-out infinite alternate`;
        } else if (element.classList.contains('floating-dot')) {
            element.style.animation += `, float-small ${randomDuration * 0.8}s ease-in-out infinite alternate`;
        } else if (element.classList.contains('floating-medium')) {
            element.style.animation += `, float-medium ${randomDuration * 1.2}s ease-in-out infinite alternate`;
        }
    });
}

// Skill bars animation
function initSkillBars() {
    const skillCards = document.querySelectorAll('#skills .card-hover');
    
    skillCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skill items with staggered delay
                    const skillItems = card.querySelectorAll('.space-y-2 p');
                    skillItems.forEach((item, itemIndex) => {
                        setTimeout(() => {
                            item.style.transform = 'translateX(0)';
                            item.style.opacity = '1';
                        }, itemIndex * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);
        
        // Set initial state for skill items
        const skillItems = card.querySelectorAll('.space-y-2 p');
        skillItems.forEach(item => {
            item.style.transform = 'translateX(-20px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.5s ease';
        });
    });
}

// Counter animations for achievements or stats
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('[data-count]');
    
    counterElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Cursor tracking for interactive elements
function initCursorTracker() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-tracker');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(249, 115, 22, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    // Track cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card-hover, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursor.style.transform = 'scale(1)';
        });
    });
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
}

// Page transition effects
function initPageTransitions() {
    // Add entrance animation to main content
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        main.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Add additional CSS animations dynamically
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #F97316; }
        51%, 100% { border-color: transparent; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(249, 115, 22, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float-large {
        0% { transform: translateY(var(--float-y, 0px)) translateX(0px) rotate(0deg); }
        33% { transform: translateY(calc(var(--float-y, 0px) * -0.5)) translateX(var(--float-x, 0px)) rotate(var(--float-rotation, 0deg)); }
        66% { transform: translateY(calc(var(--float-y, 0px) * -1)) translateX(calc(var(--float-x, 0px) * -0.5)) rotate(calc(var(--float-rotation, 0deg) * -1)); }
        100% { transform: translateY(var(--float-y, 0px)) translateX(0px) rotate(0deg); }
    }
    
    @keyframes float-small {
        0% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(calc(var(--float-y, 0px) * -0.8)) scale(1.1); }
        100% { transform: translateY(0px) scale(1); }
    }
    
    @keyframes float-medium {
        0% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(calc(var(--float-y, 0px) * -0.3)) rotate(90deg) scale(1.05); }
        50% { transform: translateY(calc(var(--float-y, 0px) * -0.8)) rotate(180deg) scale(0.95); }
        75% { transform: translateY(calc(var(--float-y, 0px) * -0.3)) rotate(270deg) scale(1.05); }
        100% { transform: translateY(0px) rotate(360deg) scale(1); }
    }
    
    /* Enhanced card hover effects */
    .card-hover:hover {
        box-shadow: 0 20px 60px rgba(249, 115, 22, 0.2);
        transform: translateY(-8px);
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    }
    
    /* Loading animation for buttons */
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(additionalStyles);

// Performance optimization: Throttle scroll and resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based animations can be added here
}, 16)); // ~60fps

// Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Cleanup function for better memory management
window.addEventListener('beforeunload', () => {
    // Clean up any intervals or observers if needed
    const cursor = document.querySelector('.cursor-tracker');
    if (cursor) cursor.remove();
});


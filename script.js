// IP Büroservice – Izabela Pluszczak
(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const yearEl = document.getElementById('year');

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== NAVBAR SCROLL =====
    let scrollTicking = false;
    function onScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 40) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                updateActiveNav();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== MOBILE MENU =====
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        const open = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', open);
        document.body.classList.toggle('menu-open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    document.addEventListener('click', (e) => {
        if (!navMenu) return;
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector('.nav-menu a[href="#' + id + '"]');
            if (!link) return;
            if (scrollY >= top && scrollY < bottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== INTERSECTION OBSERVER =====
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.service-card, .value-card, .contact-card, .feature, .process-step').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const isPolish = document.documentElement.lang === 'pl';
            const t = isPolish
                ? {
                    fillRequired: 'Proszę wypełnić wszystkie wymagane pola.',
                    invalidEmail: 'Proszę podać poprawny adres e-mail.',
                    privacy: 'Proszę zaakceptować politykę prywatności.',
                    sending: 'Wysyłanie…',
                    success: 'Dziękuję za wiadomość! Odpowiem najszybciej, jak to możliwe.'
                }
                : {
                    fillRequired: 'Bitte füllen Sie alle Pflichtfelder aus.',
                    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
                    privacy: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
                    sending: 'Wird gesendet…',
                    success: 'Vielen Dank! Ich melde mich schnellstmöglich bei Ihnen.'
                };

            const data = Object.fromEntries(new FormData(this).entries());

            if (!data.name || !data.email || !data.message) {
                showNotification(t.fillRequired, 'error');
                return;
            }
            if (!validateEmail(data.email)) {
                showNotification(t.invalidEmail, 'error');
                return;
            }
            if (!data.privacy) {
                showNotification(t.privacy, 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = t.sending;
            submitBtn.disabled = true;

            // Placeholder – tu w przyszłości podepniemy realny endpoint (np. Formspree, Vercel function).
            setTimeout(() => {
                showNotification(t.success, 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const n = document.createElement('div');
        n.className = 'notification notification-' + type;
        n.style.animation = 'slideIn 0.3s ease forwards';

        const span = document.createElement('span');
        span.textContent = message;

        const btn = document.createElement('button');
        btn.setAttribute('aria-label', 'Close');
        btn.innerHTML = '&times;';
        btn.addEventListener('click', () => n.remove());

        n.appendChild(span);
        n.appendChild(btn);
        document.body.appendChild(n);

        setTimeout(() => {
            if (n.parentElement) {
                n.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => n.remove(), 300);
            }
        }, 5000);
    }

    // Initial nav state
    onScroll();
})();

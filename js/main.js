/* ==========================================================================
   PRINCIA VADLEA – PORTFOLIO WEBSITE
   Main JavaScript – Navigation, Animations, Form Handling
   ========================================================================== */

(function () {
    'use strict';

    // ======================================================================
    // DOM References
    // ======================================================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('.section');
    const revealElements = document.querySelectorAll('.reveal');
    const statNumbers = document.querySelectorAll('.hero-stat-number');

    // ======================================================================
    // MOBILE NAVIGATION
    // ======================================================================

    /** Toggle mobile hamburger menu */
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Create or toggle overlay
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeMobileMenu);
        }
        overlay.classList.toggle('visible', isOpen);
    }

    /** Close mobile menu */
    function closeMobileMenu() {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
        const overlay = document.querySelector('.nav-overlay');
        if (overlay) overlay.classList.remove('visible');
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // ======================================================================
    // STICKY NAVBAR ON SCROLL
    // ======================================================================

    /** Add/remove scrolled class based on scroll position */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ======================================================================
    // BACK TO TOP BUTTON
    // ======================================================================

    /** Show/hide back-to-top button */
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ======================================================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ======================================================================

    /** Highlight the nav link corresponding to the currently visible section */
    function highlightActiveSection() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var id = section.getAttribute('id');
            var offset = section.offsetTop;
            var height = section.offsetHeight;

            if (scrollPos >= offset && scrollPos < offset + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Special case: hero section at the very top
        if (window.scrollY < 200) {
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        }
    }

    // ======================================================================
    // SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // ======================================================================

    /** Initialize IntersectionObserver for .reveal elements */
    function initScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        // Stagger children if multiple reveals in view
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ======================================================================
    // STAT COUNTER ANIMATION
    // ======================================================================

    /** Animate stat numbers counting up */
    function animateCounters() {
        if (!('IntersectionObserver' in window)) return;

        var counterObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var target = parseInt(el.getAttribute('data-count'), 10);
                        var duration = 1500; // ms
                        var start = 0;
                        var startTime = null;

                        function step(timestamp) {
                            if (!startTime) startTime = timestamp;
                            var progress = Math.min((timestamp - startTime) / duration, 1);
                            // Ease out cubic
                            var eased = 1 - Math.pow(1 - progress, 3);
                            el.textContent = Math.floor(eased * target);
                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                el.textContent = target;
                            }
                        }

                        requestAnimationFrame(step);
                        counterObserver.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statNumbers.forEach(function (num) {
            counterObserver.observe(num);
        });
    }

    // ======================================================================
    // CONTACT FORM – MAILTO FALLBACK
    // ======================================================================

    /** Handle form submission via mailto */
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('contactName').value.trim();
        var email = document.getElementById('contactEmail').value.trim();
        var message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) return;

        var subject = encodeURIComponent('Portfolio Contact from ' + name);
        var body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            'Message:\n' + message
        );

        var mailtoLink = 'mailto:princia.vadlea@gmail.com?subject=' + subject + '&body=' + body;
        window.location.href = mailtoLink;

        // Show brief confirmation
        var btn = document.getElementById('contactSubmit');
        var originalText = btn.innerHTML;
        btn.innerHTML = '<svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Opening Email Client...';
        btn.style.pointerEvents = 'none';

        setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.pointerEvents = '';
        }, 3000);
    });

    // ======================================================================
    // PROJECT FILTER TABS
    // ======================================================================

    /** Filter project cards by company when tabs are clicked */
    var projectTabs = document.querySelectorAll('.project-tab');
    var projectCards = document.querySelectorAll('.project-card');

    projectTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var company = this.getAttribute('data-company');

            // Update active tab
            projectTabs.forEach(function (t) { t.classList.remove('active'); });
            this.classList.add('active');

            // Filter cards
            projectCards.forEach(function (card) {
                if (company === 'all' || card.getAttribute('data-company') === company) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ======================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ======================================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ======================================================================
    // SCROLL EVENT (Throttled)
    // ======================================================================

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                handleNavbarScroll();
                handleBackToTop();
                highlightActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ======================================================================
    // INITIALIZE
    // ======================================================================
    handleNavbarScroll();
    initScrollReveal();
    animateCounters();
})();

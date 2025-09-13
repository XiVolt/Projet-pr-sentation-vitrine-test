/* ===== ELECTRIC WAVES - MODERN INTERACTIVE JAVASCRIPT ===== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURATION ===== //
    const config = {
        scrollOffset: 100,
        animationDelay: 100,
        particleCount: 50,
        scrollProgressThrottle: 10,
        // Electric Waves concert date
        concertDate: new Date('2025-11-22T20:00:00').getTime()
    };

    // ===== UTILITY FUNCTIONS ===== //
    
    // Throttle function for performance
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // ===== ELECTRIC WAVES COUNTDOWN TIMER ===== //
    
    class CountdownTimer {
        constructor() {
            this.targetDate = config.concertDate;
            this.daysElement = document.getElementById('days');
            this.hoursElement = document.getElementById('hours');
            this.minutesElement = document.getElementById('minutes');
            this.secondsElement = document.getElementById('seconds');
            
            if (this.daysElement && this.hoursElement && this.minutesElement && this.secondsElement) {
                this.init();
            }
        }

        init() {
            this.updateCountdown();
            // Update every second
            this.interval = setInterval(() => this.updateCountdown(), 1000);
        }

        updateCountdown() {
            const now = new Date().getTime();
            const difference = this.targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                // Animate number changes
                this.animateNumber(this.daysElement, days);
                this.animateNumber(this.hoursElement, hours);
                this.animateNumber(this.minutesElement, minutes);
                this.animateNumber(this.secondsElement, seconds);
            } else {
                // Concert has started!
                this.daysElement.textContent = '00';
                this.hoursElement.textContent = '00';
                this.minutesElement.textContent = '00';
                this.secondsElement.textContent = '00';
                
                // Add some celebration animation
                document.querySelectorAll('.time-unit').forEach(unit => {
                    unit.classList.add('celebration');
                });
                
                clearInterval(this.interval);
            }
        }

        animateNumber(element, newValue) {
            const currentValue = parseInt(element.textContent);
            const formattedValue = newValue.toString().padStart(2, '0');
            
            if (currentValue !== newValue) {
                element.style.transform = 'scale(1.1)';
                element.style.color = 'var(--text-neon)';
                
                setTimeout(() => {
                    element.textContent = formattedValue;
                    element.style.transform = 'scale(1)';
                    element.style.color = '';
                }, 150);
            }
        }

        destroy() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

    // ===== MOBILE MENU HANDLER ===== //
    
    class MobileMenu {
        constructor() {
            this.toggle = document.getElementById('navToggle');
            this.menu = document.getElementById('navMenu');
            this.links = this.menu ? this.menu.querySelectorAll('.nav-link') : [];
            this.init();
        }

        init() {
            if (this.toggle && this.menu) {
                this.toggle.addEventListener('click', () => this.toggleMenu());
                
                // Close menu when clicking on a link
                this.links.forEach(link => {
                    link.addEventListener('click', () => this.closeMenu());
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                        this.closeMenu();
                    }
                });

                // Close menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeMenu();
                    }
                });
            }
        }

        toggleMenu() {
            const isOpen = this.menu.classList.contains('active');
            if (isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        }

        openMenu() {
            this.menu.classList.add('active');
            this.toggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate hamburger lines
            const lines = this.toggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }

        closeMenu() {
            this.menu.classList.remove('active');
            this.toggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger lines
            const lines = this.toggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        }
    }

    // ===== THEME MANAGEMENT ===== //
    
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark for Electric Waves
            this.toggle = document.getElementById('themeToggle');
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggleTheme());
            }
        }

        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update theme toggle icon with smooth transition
            if (this.toggle) {
                this.toggle.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    this.toggle.style.transform = '';
                }, 300);
            }
        }
    }

    // ===== SMOOTH SCROLLING ===== //
    
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            // Handle anchor links
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        
                        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }

    // ===== SCROLL PROGRESS BAR ===== //
    
    class ScrollProgress {
        constructor() {
            this.progressBar = document.querySelector('.scroll-progress-bar');
            if (!this.progressBar) {
                this.createProgressBar();
            }
            this.init();
        }

        createProgressBar() {
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'scroll-progress-bar';
            this.progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary), var(--accent));
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(this.progressBar);
        }

        init() {
            window.addEventListener('scroll', throttle(() => this.updateProgress(), config.scrollProgressThrottle));
        }

        updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (this.progressBar) {
                this.progressBar.style.width = Math.min(scrollPercent, 100) + '%';
            }
        }
    }

    // ===== STICKY HEADER ===== //
    
    class StickyHeader {
        constructor() {
            this.header = document.getElementById('header');
            this.lastScrollY = 0;
            this.init();
        }

        init() {
            if (!this.header) return;
            
            window.addEventListener('scroll', throttle(() => this.handleScroll(), 10));
        }

        handleScroll() {
            const currentScrollY = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // ===== SMOOTH SCROLL NAVIGATION ===== //
    
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            // Handle anchor links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (link) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').slice(1);
                    const target = document.getElementById(targetId);
                    
                    if (target) {
                        this.scrollToElement(target);
                        this.updateActiveNavLink(link);
                    }
                }
            });

            // Update active nav on scroll
            window.addEventListener('scroll', throttle(() => this.updateActiveNavOnScroll(), 50));
        }

        scrollToElement(element) {
            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        updateActiveNavLink(clickedLink) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            clickedLink.classList.add('active');
        }

        updateActiveNavOnScroll() {
            const sections = document.querySelectorAll('section[id]');
            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.pageYOffset - headerHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const scrollPosition = window.pageYOffset;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const navLink = document.querySelector(`a[href="#${section.id}"]`);
                    if (navLink && !navLink.classList.contains('active')) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        navLink.classList.add('active');
                    }
                }
            });
        }
    }

    // ===== SCROLL ANIMATIONS ===== //
    
    class ScrollAnimations {
        constructor() {
            this.elements = document.querySelectorAll('.animate-on-scroll');
            this.init();
        }

        init() {
            // Create intersection observer
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe all elements
            this.elements.forEach(element => {
                this.observer.observe(element);
            });

            // Add stagger animation to grid items
            this.setupStaggerAnimations();
        }

        setupStaggerAnimations() {
            const grids = document.querySelectorAll('.grid');
            grids.forEach(grid => {
                const items = grid.querySelectorAll('.card, .grid > *');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * config.animationDelay}ms`;
                });
            });
        }
    }

    // ===== HERO PARTICLES ===== //
    
    class HeroParticles {
        constructor() {
            this.heroSection = document.querySelector('.hero');
            this.particleContainer = null;
            this.particles = [];
            this.init();
        }

        init() {
            if (!this.heroSection) return;
            
            this.createParticleContainer();
            this.generateParticles();
            this.animateParticles();
        }

        createParticleContainer() {
            this.particleContainer = document.createElement('div');
            this.particleContainer.className = 'hero-particles';
            this.heroSection.appendChild(this.particleContainer);
        }

        generateParticles() {
            for (let i = 0; i < config.particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random initial position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (8 + Math.random() * 4) + 's';
                
                this.particleContainer.appendChild(particle);
                this.particles.push(particle);
            }
        }

        animateParticles() {
            // Particles are animated via CSS animations
            // This method can be extended for more complex animations
        }
    }

    // ===== BACK TO TOP BUTTON ===== //
    
    class BackToTop {
        constructor() {
            this.button = document.getElementById('backToTop');
            this.init();
        }

        init() {
            if (!this.button) {
                this.createButton();
            }
            
            this.button.addEventListener('click', () => this.scrollToTop());
            window.addEventListener('scroll', throttle(() => this.toggleVisibility(), 100));
        }

        createButton() {
            this.button = document.createElement('button');
            this.button.id = 'backToTop';
            this.button.className = 'back-to-top';
            this.button.setAttribute('aria-label', 'Retour en haut');
            this.button.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                </svg>
            `;
            document.body.appendChild(this.button);
        }

        toggleVisibility() {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // ===== MOBILE MENU ===== //
    
    class MobileMenu {
        constructor() {
            this.toggle = document.getElementById('navToggle');
            this.menu = document.getElementById('navMenu');
            this.isOpen = false;
            this.init();
        }

        init() {
            if (!this.toggle || !this.menu) return;
            
            this.toggle.addEventListener('click', () => this.toggleMenu());
            
            // Close menu on link click
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isOpen) {
                        this.closeMenu();
                    }
                });
            });

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (this.isOpen && !e.target.closest('.nav-container')) {
                    this.closeMenu();
                }
            });
        }

        toggleMenu() {
            this.isOpen ? this.closeMenu() : this.openMenu();
        }

        openMenu() {
            this.isOpen = true;
            this.menu.classList.add('active');
            this.toggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate hamburger lines
            const lines = this.toggle.querySelectorAll('.hamburger-line');
            if (lines.length >= 3) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        }

        closeMenu() {
            this.isOpen = false;
            this.menu.classList.remove('active');
            this.toggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger lines
            const lines = this.toggle.querySelectorAll('.hamburger-line');
            if (lines.length >= 3) {
                lines[0].style.transform = '';
                lines[1].style.opacity = '';
                lines[2].style.transform = '';
            }
        }
    }

    // ===== FORM ENHANCEMENTS ===== //
    
    class FormEnhancements {
        constructor() {
            this.forms = document.querySelectorAll('form');
            this.init();
        }

        init() {
            this.forms.forEach(form => {
                this.enhanceForm(form);
            });
        }

        enhanceForm(form) {
            // Add loading states
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    submitBtn.style.opacity = '0.7';
                    submitBtn.disabled = true;
                    
                    // Re-enable after 3 seconds (demo purposes)
                    setTimeout(() => {
                        submitBtn.style.opacity = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });

            // Enhanced input focus effects
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('focused');
                });
            });
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS ===== //
    
    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            // Preload critical images
            this.preloadImages();
            
            // Lazy load non-critical images
            this.setupLazyLoading();
            
            // Optimize animations based on user preferences
            this.respectUserPreferences();
        }

        preloadImages() {
            const criticalImages = document.querySelectorAll('img[data-preload]');
            criticalImages.forEach(img => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src;
                document.head.appendChild(link);
            });
        }

        setupLazyLoading() {
            if ('loading' in HTMLImageElement.prototype) {
                // Native lazy loading support
                const images = document.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            } else {
                // Fallback for browsers without native support
                this.setupIntersectionObserverLazyLoading();
            }
        }

        setupIntersectionObserverLazyLoading() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        respectUserPreferences() {
            // Reduce motion if user prefers it
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--transition-fast', '0ms');
                document.documentElement.style.setProperty('--transition', '0ms');
                document.documentElement.style.setProperty('--transition-slow', '0ms');
            }
        }
    }

    // ===== ACCESSIBILITY ENHANCEMENTS ===== //
    
    class AccessibilityEnhancements {
        constructor() {
            this.init();
        }

        init() {
            // Skip to main content link
            this.addSkipLink();
            
            // Focus management
            this.manageFocus();
            
            // Keyboard navigation
            this.enhanceKeyboardNavigation();
        }

        addSkipLink() {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Aller au contenu principal';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1000;
                transition: top 0.3s;
            `;
            
            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '6px';
            });
            
            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        manageFocus() {
            // Ensure focus is visible
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-nav');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-nav');
            });
        }

        enhanceKeyboardNavigation() {
            // Escape key to close modals/menus
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.nav-menu.active');
                    if (mobileMenu) {
                        document.getElementById('navToggle')?.click();
                    }
                }
            });
        }
    }

    // ===== ACCESSIBILITY ENHANCEMENTS ===== //
    
    class AccessibilityEnhancements {
        constructor() {
            this.init();
        }

        init() {
            // Skip to main content link
            this.addSkipLink();
            
            // Focus management
            this.manageFocus();
            
            // Keyboard navigation
            this.enhanceKeyboardNavigation();
        }

        addSkipLink() {
            if (document.querySelector('.skip-link')) return; // Already exists
            
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Aller au contenu principal';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1000;
                transition: top 0.3s;
            `;
            
            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '6px';
            });
            
            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        manageFocus() {
            // Ensure focus is visible
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-nav');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-nav');
            });
        }

        enhanceKeyboardNavigation() {
            // Escape key to close modals/menus
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.nav-menu.active');
                    if (mobileMenu) {
                        document.getElementById('navToggle')?.click();
                    }
                }
            });
        }
    }

    // ===== INITIALIZATION ===== //
    
    // Initialize all components
    const countdownTimer = new CountdownTimer();  // Electric Waves countdown
    const mobileMenu = new MobileMenu();          // Mobile navigation
    const themeManager = new ThemeManager();      // Theme switching
    const scrollProgress = new ScrollProgress();  // Scroll progress bar
    const smoothScroll = new SmoothScroll();      // Smooth scrolling
    const accessibilityEnhancements = new AccessibilityEnhancements();

    // ===== RESPONSIVE PERFORMANCE OPTIMIZATIONS ===== //
    
    // Optimize for mobile devices
    if (window.innerWidth <= 768) {
        // Reduce animations on mobile for better performance
        document.documentElement.style.setProperty('--transition-fast', '100ms');
        document.documentElement.style.setProperty('--transition', '200ms');
        document.documentElement.style.setProperty('--transition-slow', '300ms');
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', debounce(() => {
        // Recalculate layout after orientation change
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }, 300));

    // Handle resize events for responsive behavior
    window.addEventListener('resize', debounce(() => {
        // Adjust countdown timer for different screen sizes
        if (countdownTimer) {
            const countdownElement = document.querySelector('.countdown-timer');
            if (countdownElement) {
                if (window.innerWidth <= 480) {
                    countdownElement.style.gap = 'var(--space-2)';
                } else if (window.innerWidth <= 768) {
                    countdownElement.style.gap = 'var(--space-4)';
                } else {
                    countdownElement.style.gap = 'var(--space-6)';
                }
            }
        }
    }, 250));

    // ===== GLOBAL ERROR HANDLING ===== //
    
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // In production, you might want to send this to an error tracking service
    });

    // ===== UTILITY FUNCTIONS FOR EXTERNAL USE ===== //
    
    // Make some functions globally available
    window.ElectricWaves = {
        countdown: countdownTimer,
        scrollToElement: (selector) => {
            const element = document.querySelector(selector);
            if (element) {
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = element.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        },
        toggleTheme: () => {
            if (themeManager) {
                themeManager.toggleTheme();
            }
        },
        toggleMobileMenu: () => {
            if (mobileMenu) {
                mobileMenu.toggleMenu();
            }
        }
    };

    console.log('🎸 Electric Waves - Site responsive initialisé avec succès!');
});
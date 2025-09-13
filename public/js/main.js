// ===============================================
// SITE VITRINE - JavaScript Simplifié et Fonctionnel
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript chargé');
    
    // ===============================================
    // 1. PRELOADER
    // ===============================================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Disparition du preloader après 1.5 secondes
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    // ===============================================
    // 2. DARK MODE
    // ===============================================
    function initDarkMode() {
        const darkToggle = document.getElementById('darkModeToggle');
        if (!darkToggle) return;

        // Charger la préférence sauvegardée
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkToggle.textContent = '☀️';
        }

        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('darkMode', isDark);
            
            // Animation du bouton
            darkToggle.style.transform = 'scale(0.8)';
            setTimeout(() => {
                darkToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // ===============================================
    // 3. PROGRESS BAR DE SCROLL
    // ===============================================
    function initScrollProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            width: 0%;
            background: linear-gradient(90deg, var(--accent-orange), var(--main-color));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scroll / height) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        });
    }

    // ===============================================
    // 4. MENU ACTIF AU SCROLL
    // ===============================================
    function initActiveMenu() {
        const sections = document.querySelectorAll('main section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===============================================
    // 5. ANIMATIONS AU SCROLL
    // ===============================================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.service-card, .project-card, .team-member, .testimonial');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    // ===============================================
    // 6. EFFETS HOVER SUR LES CARTES
    // ===============================================
    function initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .project-card, .team-member');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 2px 16px rgba(37,99,235,0.08)';
            });
        });
    }

    // ===============================================
    // 7. BOUTONS AVEC RIPPLE EFFECT
    // ===============================================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Ajouter l'animation CSS
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===============================================
    // 8. MENU BURGER RESPONSIVE
    // ===============================================
    function initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('open');
            });

            // Fermer le menu quand on clique sur un lien
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('open');
                });
            });
        }
    }

    // ===============================================
    // 9. SCROLL FLUIDE POUR LES ANCRES
    // ===============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===============================================
    // 10. SYSTÈME DE PARTICULES SIMPLE
    // ===============================================
    function initSimpleParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Créer des particules
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 106, 61, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    // ===============================================
    // PROJECT FILTERING
    // ===============================================
    function initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card-large');

        if (!filterButtons.length || !projectCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter projects with animation
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    const shouldShow = filter === 'all' || categories.includes(filter);

                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===============================================
    // CONTACT FORM
    // ===============================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Votre message a été envoyé avec succès !', 'success');
                form.reset();
                
            } catch (error) {
                showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
            } finally {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    // ===============================================
    // NOTIFICATION SYSTEM
    // ===============================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        const timeoutId = setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeoutId);
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ===============================================
    // CHAT WIDGET (PLACEHOLDER)
    // ===============================================
    window.openChat = function() {
        showNotification('Chat en direct sera bientôt disponible !', 'success');
    };

    // ===============================================
    // INITIALISATION DE TOUTES LES FONCTIONS
    // ===============================================
    try {
        // initPreloader(); // Désactivé pour améliorer l'UX
        initDarkMode();
        initScrollProgressBar();
        initActiveMenu();
        initScrollAnimations();
        initCardEffects();
        initRippleEffect();
        initMobileMenu();
        initSmoothScroll();
        // Particules seulement sur la homepage
        if (document.getElementById('particleCanvas')) {
            initSimpleParticles();
        }
        initProjectFilters();
        initContactForm();
        
        console.log('Toutes les fonctions JavaScript sont initialisées');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
});
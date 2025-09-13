// ========================================
// SITE PROFESSIONNEL - JavaScript Avancé
// ========================================

class ProfessionalSite {
  constructor() {
    try {
      this.init();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      // S'assurer que le preloader disparaît même en cas d'erreur
      this.forceHidePreloader();
    }
  }

  forceHidePreloader() {
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 500);
  }

  init() {
    this.initPreloader();
    try {
      this.initDarkMode();
      this.initScrollEffects();
      this.initParticleSystem();
      this.initCustomCursor();
      this.initRippleEffects();
      this.initProjectCarousel();
      this.initModalSystem();
      this.initMicroInteractions();
      this.initScrollAnimations();
    } catch (error) {
      console.error('Erreur dans une fonction d\'initialisation:', error);
    }
  }

  // ========================================
  // PRELOADER AVANCÉ
  // ========================================
  initPreloader() {
    // Simple timeout pour assurer que le preloader disparaît
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 1000); // Réduit à 1 seconde

    // Backup au cas où l'event load ne se déclenche pas
    window.addEventListener('load', () => {
      setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('hide')) {
          preloader.classList.add('hide');
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 500);
        }
      }, 100);
    });
  }

  // ========================================
  // DARK MODE PROFESSIONNEL
  // ========================================
  initDarkMode() {
    const darkToggle = document.getElementById('darkModeToggle');
    if (!darkToggle) return;

    // Smooth transition
    const enableTransitions = () => {
      document.body.style.transition = 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    };

    darkToggle.addEventListener('click', () => {
      enableTransitions();
      document.body.classList.toggle('dark-mode');
      darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      
      // Animation du toggle
      darkToggle.style.transform = 'scale(0.8) rotate(180deg)';
      setTimeout(() => {
        darkToggle.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
    });

    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkToggle.textContent = '☀️';
    }
  }

  // ========================================
  // EFFETS DE SCROLL AVANCÉS
  // ========================================
  initScrollEffects() {
    // Progress bar
    this.createScrollProgressBar();
    
    // Parallax
    this.initParallax();
    
    // Menu actif
    this.initActiveMenu();
  }

  createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
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

    let ticking = false;
    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scroll / height) * 100;
      progressBar.style.width = `${progress}%`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });
  }

  initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .mission-bg');
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  initActiveMenu() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let ticking = false;
    const updateActiveMenu = () => {
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
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveMenu);
        ticking = true;
      }
    });
  }

  // ========================================
  // SYSTÈME DE PARTICULES
  // ========================================
  initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 106, 61, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 106, 61, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  // ========================================
  // CURSEUR PERSONNALISÉ (OPTIONNEL)
  // ========================================
  initCustomCursor() {
    try {
      // Désactivé pour éviter les problèmes - peut être réactivé plus tard
      return;
      
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--accent-orange);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        opacity: 0;
      `;
      document.body.appendChild(cursor);

      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '0.7';
      });

      document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
      });

      // Smooth cursor movement
      const updateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(updateCursor);
      };
      updateCursor();

      // Hover effects
      const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card');
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(2)';
          cursor.style.background = 'var(--main-color)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.background = 'var(--accent-orange)';
        });
      });
    } catch (error) {
      console.error('Erreur curseur personnalisé:', error);
    }
  }

  // ========================================
  // EFFETS RIPPLE
  // ========================================
  initRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .service-card, .project-card');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
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
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    const style = document.createElement('style');
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

  // ========================================
  // CAROUSEL PROJECTS
  // ========================================
  initProjectCarousel() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = `
      <div class="carousel-container">
        <div class="carousel-track">
          ${Array.from(projectsGrid.children).map(child => child.outerHTML).join('')}
        </div>
        <button class="carousel-btn carousel-prev">‹</button>
        <button class="carousel-btn carousel-next">›</button>
        <div class="carousel-dots"></div>
      </div>
    `;

    const track = projectsGrid.querySelector('.carousel-track');
    const prevBtn = projectsGrid.querySelector('.carousel-prev');
    const nextBtn = projectsGrid.querySelector('.carousel-next');
    const dots = projectsGrid.querySelector('.carousel-dots');
    const items = track.children;

    let currentSlide = 0;
    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(items.length / itemsPerSlide);

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.addEventListener('click', () => goToSlide(i));
      dots.appendChild(dot);
    }

    const updateCarousel = () => {
      const offset = -currentSlide * (100 / totalSlides);
      track.style.transform = `translateX(${offset}%)`;
      
      dots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    const goToSlide = (slide) => {
      currentSlide = slide;
      updateCarousel();
    };

    prevBtn.addEventListener('click', () => {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateCarousel();
    });

    // Auto-play
    setInterval(() => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateCarousel();
    }, 5000);

    updateCarousel();
  }

  // ========================================
  // SYSTÈME MODAL
  // ========================================
  initModalSystem() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">×</button>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.project-caption').textContent;
        const img = card.querySelector('img').src;
        
        modal.querySelector('.modal-body').innerHTML = `
          <h3>${title}</h3>
          <img src="${img}" alt="${title}" style="width: 100%; border-radius: 1rem; margin: 1rem 0;">
          <p>Description détaillée du projet ${index + 1}. Technologies utilisées, défis relevés, et résultats obtenus.</p>
          <div class="modal-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
            <span class="tag">MongoDB</span>
          </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ========================================
  // MICRO-INTERACTIONS
  // ========================================
  initMicroInteractions() {
    // Boutons morphing
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
        btn.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = '0 4px 18px rgba(26,34,56,0.10)';
      });
    });

    // Cards 3D tilt effect
    const cards = document.querySelectorAll('.service-card, .project-card, .team-member');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ========================================
  // ANIMATIONS DE SCROLL
  // ========================================
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .team-member, .testimonial').forEach(el => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  new ProfessionalSite();
});

// Menu burger responsive
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Scroll fluide pour les ancres
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
}
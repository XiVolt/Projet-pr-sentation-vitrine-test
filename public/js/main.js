// Navigation mobile et scroll actif
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Smooth scroll pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Fermer le menu mobile
        if (navToggle && navMenu) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Gestion de l'état actif basé sur le scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    // Reset tous les états actifs
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Trouver la section actuelle
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Activer le lien correspondant
    if (currentSection) {
      const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    } else if (window.scrollY < 100) {
      // Si en haut de page, activer Accueil
      const homeLink = document.querySelector('.nav-link[href="/"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
    }
  }
  
  // Écouter le scroll
  window.addEventListener('scroll', updateActiveNav);
  // Initialiser
  updateActiveNav();
});
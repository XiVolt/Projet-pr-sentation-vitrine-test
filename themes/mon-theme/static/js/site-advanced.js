// Dark mode toggle
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  // On load
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkToggle.textContent = '☀️';
  }
}

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '4px';
progressBar.style.width = '0';
progressBar.style.background = 'linear-gradient(90deg, var(--accent-orange), var(--main-color))';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.2s';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scroll / height) * 100}%`;
});

// Parallax effet sur hero
const hero = document.querySelector('.hero-section');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
  });
}

// Reveal animations on scroll (IntersectionObserver)
const revealEls = document.querySelectorAll('.service-card, .project-card, .team-member, .testimonial, .about-section, .mission-section');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// Highlight menu on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
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

/* ===== 7 Training — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Hamburger Menu Toggle =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('navbar__hamburger--active');
      navMenu.classList.toggle('navbar__menu--open');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('navbar__hamburger--active');
        navMenu.classList.remove('navbar__menu--open');
      });
    });
  }

  // ===== Navbar Background on Scroll =====
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    });
  }

  // ===== Contact Form Handling =====
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (form && formStatus) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.form__submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Invio in corso...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = 'Messaggio inviato con successo! Ti risponderò al più presto.';
          formStatus.className = 'form__status form__status--success';
          form.reset();
        } else {
          throw new Error('Errore nell\'invio');
        }
      } catch (error) {
        formStatus.textContent = 'Errore nell\'invio. Riprova o contattami su Instagram.';
        formStatus.className = 'form__status form__status--error';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // ===== Scroll Fade-In Animation =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

});

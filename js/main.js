/* ============================================
   FARM OF THE CHILD — Main JS
   Scroll animations, parallax, counters, nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV scroll shadow ──
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Mobile nav toggle ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    const isOpen = mobileNav?.classList.contains('open');
    if (bars[0]) bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    if (bars[1]) bars[1].style.opacity = isOpen ? '0' : '1';
    if (bars[2]) bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  // ── Parallax hero ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const isMobile = window.matchMedia('(max-width:960px)').matches;
    if (!isMobile) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY * 0.4;
        heroBg.style.transform = `translateY(${y}px)`;
      }, { passive: true });
    }
  }

  // ── Scroll reveal (Intersection Observer) ──
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Animated counters ──
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1600;
          const start = performance.now();
          const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }

  // ── Active nav link by current page ──
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Smooth hover on child cards ──
  document.querySelectorAll('.child-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.willChange = 'transform');
    card.addEventListener('mouseleave', () => card.style.willChange = 'auto');
  });

});

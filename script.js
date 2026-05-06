// Initialize Lucide icons after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // Show the sticky CTA banner with a springy entrance after a short delay
  const banner = document.getElementById('cta-banner');
  if (banner) {
    setTimeout(() => {
      banner.classList.add('is-visible');
    }, 900);
  }

  // Parallax on hero background blobs
  const hero = document.getElementById('hero');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          hero.style.setProperty('--parallax-y', `${window.scrollY * 0.25}px`);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});

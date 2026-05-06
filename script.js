// Initialize Lucide icons after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

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

// Initialize Lucide icons after DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
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

  // Load configuration and render cards
  const grid = document.getElementById('dynamic-services-grid');
  const template = document.getElementById('prof-card-template');

  if (grid && template) {
    // Inject loading skeletons
    const skeletonHTML = Array(4).fill(0).map(() => `
      <article class="prof-card skeleton-card" style="opacity: 0.7; pointer-events: none;">
        <div class="prof-card__scenario" style="background-color: var(--neutral-94); color: transparent; width: 60%; height: 24px; border-radius: var(--r-full);"></div>
        <div class="prof-card__icon" style="background-color: var(--neutral-94); border-radius: var(--r-full);"></div>
        <div class="prof-card__body" style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="background-color: var(--neutral-94); height: 20px; width: 80%; border-radius: 4px;"></div>
          <div style="background-color: var(--neutral-94); height: 14px; width: 60%; border-radius: 4px;"></div>
        </div>
        <div class="prof-card__cta" style="background-color: var(--neutral-94); color: transparent; height: 48px; border-radius: var(--r-lg);"></div>
      </article>
    `).join('');

    grid.innerHTML = skeletonHTML;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'config.json', true);

    xhr.onload = function () {
      // status 0 is returned for local file:// protocol on some browsers
      if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status === 0 && xhr.responseText)) {
        try {
          const cardsData = JSON.parse(xhr.responseText);

          // Clear skeletons
          grid.innerHTML = '';

          cardsData.forEach(card => {
            const clone = template.content.cloneNode(true);


            // Icon
            const img = clone.querySelector('.prof-card__icon img');
            img.src = card.imgSrc;
            img.alt = card.imgAlt;

            // Body
            clone.querySelector('.prof-card__title').textContent = card.title;
            clone.querySelector('.prof-card__subtitle').innerHTML = card.subtitle;

            // CTA
            const a = clone.querySelector('.prof-card__cta');
            a.href = card.link;
            if (card.ariaLabel) {
              a.setAttribute('aria-label', card.ariaLabel);
            }

            grid.appendChild(clone);
          });

          // Create Lucide icons for the newly injected content
          lucide.createIcons();
        } catch (error) {
          showError('Invalid JSON format');
        }
      } else if (xhr.status === 0) {
        // Status 0 is typically a CORS error or local file scheme error
        showError('Network error or file:// protocol issue');
      } else {
        showError(`HTTP error! status: ${xhr.status}`);
      }
    };

    xhr.onerror = function () {
      showError('Network error occurred');
    };

    xhr.send();

    function showError(msg) {
      console.error('Error loading config.json:', msg);
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--sp-4xl); background-color: #fff1f2; color: #e11d48; border-radius: var(--r-xl); border: 1px solid #fda4af;">
          <i data-lucide="alert-triangle" style="width: 32px; height: 32px; margin-bottom: 12px; display: inline-block;"></i>
          <h3 style="font-size: var(--fs-title-m); font-weight: 700; margin-bottom: 8px;">ไม่สามารถโหลดข้อมูลได้</h3>
          <p style="font-size: var(--fs-body-m); opacity: 0.8;">หากคุณเปิดไฟล์นี้จากเครื่องโดยตรง (file://) กรุณาใช้ Local Web Server หรือตรวจสอบว่ามีไฟล์ config.json อยู่ในระบบ</p>
        </div>
      `;
      lucide.createIcons();
    }
  } else {
    // If grid/template aren't there, still need to init static icons
    lucide.createIcons();
  }
});

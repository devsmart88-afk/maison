
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const brand = document.querySelector('.site-header .brand');
  const brandText = brand
    ? [...brand.childNodes]
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent.trim())
        .join(' ')
    : 'MAISON ÉCLAT';

  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div class="brand-intro" role="status" aria-label="Welcome to ${brandText}">
      <span class="intro-mark">✧</span>
      <strong>${brandText}</strong>
      <small>NAIL & BEAUTY STUDIO</small>
    </div>`
  );

  if (!reducedMotion) {
    setTimeout(() => document.body.classList.add('intro-complete'), 3000);
  } else {
    document.body.classList.add('intro-complete');
  }

  const instagram = document.querySelector('.float.instagram');
  const whatsapp = document.querySelector('.float.whatsapp');

  if (instagram) {
    instagram.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/></svg>';
  }

  if (whatsapp) {
    whatsapp.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.7l1.6-4.8a8.4 8.4 0 1 1 15.9-4.2Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.4 7.8c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.5 1 1.2 1.7 2.3 2.2l.6-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5v.5c0 .4-.2.7-.6.8-1 .3-2.7-.2-4.4-1.8-1.7-1.7-2.2-3.4-1.9-4.4Z" fill="currentColor"/></svg>';
  }

  document.querySelectorAll('.hero-botanicals,.ritual-botanical,.flora')
    .forEach(node => node.remove());

  const ritual = document.querySelector('.ritual');
  const scene = document.querySelector('.ritual-sticky');
  const detail = document.querySelector('.ritual-detail');
  const message = document.querySelector('.ritual-message');

  const lightSections = [
    ...document.querySelectorAll(
      '.hero,.services,.artists,.gallery,.about,.testimonials,.contact,.offer'
    )
  ];

  const services = document.querySelector('.services');

  if (services) {
    const grid = services.querySelector('.service-grid');

    grid.innerHTML = [
      ['L’Oréal Hair Colour Expert','Bespoke colour, gloss and tonal artistry for luminous, healthy-looking hair.','120 min · Demo from ₹2,499','assets/haircolor.jpg'],
      ['Signature Manicure','An unhurried ritual of shaping, cuticle care and a beautifully polished finish.','45 min · Demo ₹899','https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=88'],
      ['Professional Skin Treatment','Personalised skin care that restores calm, clarity and a natural, lasting glow.','60 min · Demo ₹1,799','https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=88'],
      ['Certified Makeup Artist','Soft, considered makeup artistry for celebrations, occasions and your most confident self.','75 min · Demo from ₹2,199','https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=88'],
      ['Gel & Nail Art','Long-wearing gel and expressive nail art, refined for your individual style.','60 min · Demo ₹1,299','https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=88']
    ].map(([title, copy, meta, image]) =>
      `<article class="service-card">
        <img src="${image}" alt="${title}">
        <div>
          <p class="eyebrow">MAISON ÉCLAT RITUAL</p>
          <h3>${title}</h3>
          <p>${copy}</p>
          <b>${meta}</b>
          <button class="text-btn book-trigger" data-service="${title}">Book this ritual →</button>
        </div>
      </article>`
    ).join('');

    grid.querySelectorAll('.book-trigger').forEach(button => {
      button.addEventListener('click', () => {
        const dialog = document.querySelector('#booking');
        const select = document.querySelector('[name=service]');

        if (![...select.options].some(option => option.value === button.dataset.service)) {
          const option = document.createElement('option');
          option.value = button.dataset.service;
          option.textContent = button.dataset.service;
          select.append(option);
        }

        select.value = button.dataset.service;
        dialog.showModal();
        document.querySelector('[name=name]').focus();
      });
    });
  }

  const servicePages = services
    ? [...services.querySelectorAll('.service-card')]
    : [];

  const artists = document.querySelector('.artists');
  const artistCards = artists
    ? [...artists.querySelectorAll('.artist-grid article')]
    : [];

  const offer = document.querySelector('.offer');
  const testimonials = document.querySelector('.testimonials');
  const reviews = testimonials
    ? [...testimonials.querySelectorAll('.review-grid article')]
    : [];

  let ticking = false;

  const scrollProgress = element => {
    const rect = element.getBoundingClientRect();
    return Math.max(
      0,
      Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height * 0.28))
    );
  };

  const update = () => {
    if (reducedMotion) return;

    if (ritual && scene && detail && message) {
      const bounds = ritual.getBoundingClientRect();
      const travel = Math.max(1, ritual.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / travel));

      scene.style.setProperty('--ritual-progress', progress.toFixed(3));
      detail.style.clipPath =
        `inset(${Math.max(0, 100 - progress * 175)}% 0 0 0)`;
      message.style.opacity =
        Math.max(0, Math.min(1, (progress - 0.34) * 3.4));
      message.style.transform =
        `translateY(${Math.max(0, 22 - progress * 62)}px)`;

      ritual.style.setProperty('--ritual-light-x', `${54 + progress * 26}%`);
      ritual.style.setProperty('--ritual-light-y', `${41 - progress * 14}%`);
      ritual.style.setProperty(
        '--ritual-light-opacity',
        (0.15 + progress * 0.25).toFixed(2)
      );
    }

    lightSections.forEach(section => {
      section.style.setProperty(
        '--section-light',
        scrollProgress(section).toFixed(3)
      );
    });

    // Same scroll-driven service-card animation on desktop and mobile.
    if (services && servicePages.length) {
      const bounds = services.getBoundingClientRect();
      const travel = Math.max(1, services.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / travel));

      const stage = Math.min(
        servicePages.length - 1,
        Math.floor(progress * servicePages.length)
      );

      servicePages.forEach((page, index) => {
        const state = index - stage;
        const current = state === 0;
        const past = state < 0;

        page.style.opacity = current ? '1' : '0';

        page.style.transform = current
          ? 'translate3d(0,0,0) rotate(0deg) scale(1)'
          : past
            ? 'translate3d(110%,0,0) rotate(5deg) scale(.88)'
            : 'translate3d(-65%,0,0) rotate(-5deg) scale(.88)';

        page.style.zIndex = String(
          current ? 20 : past ? 5 + index : 10 - index
        );
      });
    }

    if (artists) {
      const progress = scrollProgress(artists);

      artistCards.forEach((card, index) => {
        const local = Math.max(
          0,
          Math.min(1, progress * 1.45 - index * 0.13)
        );

        card.style.transform =
          `translateY(${(1 - local) * 28}px) scale(${0.96 + local * 0.04})`;
        card.style.opacity = local.toFixed(3);
      });
    }

    if (offer) {
      const progress = scrollProgress(offer);
      offer.style.setProperty('--offer-light', progress.toFixed(3));

      const image = offer.querySelector('img');
      const copy = offer.querySelector('div');
      const cta = offer.querySelector('button');

      if (image) {
        image.style.transform =
          `translateX(${(1 - progress) * -26}px) scale(${0.96 + progress * 0.04})`;
      }

      if (copy) {
        copy.style.transform = `translateY(${(1 - progress) * 20}px)`;
        copy.style.opacity = progress.toFixed(3);
      }

      if (cta) {
        cta.style.transform = `translateY(${(1 - progress) * 16}px)`;
        cta.style.opacity = Math.max(0, (progress - 0.12) * 1.2).toFixed(3);
      }
    }

    if (testimonials && innerWidth > 820) {
      const bounds = testimonials.getBoundingClientRect();
      const travel = Math.max(1, testimonials.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / travel));

      const stage = Math.min(
        reviews.length - 1,
        Math.round(progress * (reviews.length - 1))
      );

      reviews.forEach((review, index) => {
        const state = index - stage;

        review.style.opacity = state === 0 ? '1' : '0';
        review.style.transform = state === 0
          ? 'translateY(0)'
          : state < 0
            ? 'translateY(68px)'
            : 'translateY(-68px)';

        review.style.zIndex = state === 0 ? '10' : '1';
      });
    }

    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  addEventListener('resize', update, { passive: true });

  const revealSections = document.querySelectorAll(
    '.services,.artists,.gallery,.about,.testimonials,.contact'
  );

  revealSections.forEach(section => section.classList.add('reveal-ready'));

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealSections.forEach(section => observer.observe(section));
  } else {
    revealSections.forEach(section => section.classList.add('is-visible'));
  }

  document.querySelectorAll('.demo-label').forEach(label => {
    label.textContent =
      'Appointment requests are personally confirmed by our studio.';
  });

  document.querySelectorAll('.eyebrow').forEach(label => {
    if (label.textContent.includes('DEMO REVIEWS')) {
      label.textContent = 'KIND WORDS';
    }
  });

  const requestForm = document.querySelector('#booking-form');
  const bookingDialog = document.querySelector('#booking');

  let reminderShown =
    sessionStorage.getItem('maison-reminder-shown') === 'yes';

  const showReminder = () => {
    if (
      reminderShown ||
      localStorage.getItem('maison-booking-complete') === 'yes' ||
      !bookingDialog ||
      bookingDialog.open
    ) return;

    reminderShown = true;
    sessionStorage.setItem('maison-reminder-shown', 'yes');
    bookingDialog.showModal();
  };

  setTimeout(showReminder, 15000);

  addEventListener('scroll', () => {
    if (scrollY > (document.documentElement.scrollHeight - innerHeight) * 0.5) {
      showReminder();
    }
  }, { passive: true });

  if (requestForm) {
    requestForm.addEventListener('submit', () => {
      localStorage.setItem('maison-booking-complete', 'yes');
    });
  }

  const galleryImages = [...document.querySelectorAll('.masonry img')];
  const lightbox = document.querySelector('.lightbox');
  const expanded = document.querySelector('.lightbox img');

  document.addEventListener('keydown', event => {
    if (
      !lightbox ||
      lightbox.hidden ||
      !expanded ||
      !['ArrowLeft', 'ArrowRight'].includes(event.key)
    ) return;

    const index = galleryImages.findIndex(image => image.src === expanded.src);
    if (!galleryImages.length) return;

    const next =
      (index + (event.key === 'ArrowRight' ? 1 : -1) + galleryImages.length) %
      galleryImages.length;

    expanded.src = galleryImages[next].src;
    expanded.alt = galleryImages[next].alt;
  });

  update();
})();



// ---------------------------------------------------------
// Create lucide icons
// ---------------------------------------------------------

lucide.createIcons();


// ==========================================
// HERO SECTION SWIPER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const autoplayDelay = 5000;
  let remainingTime = autoplayDelay;

  const swiperEl = document.querySelector('.heroSwiper');
  if (!swiperEl) return;

  const slides = swiperEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
  const slideCount = slides.length;

  const swiper = new Swiper('.heroSwiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: slideCount > 1,
    autoplay: slideCount > 1 ? {
      delay: autoplayDelay,
      disableOnInteraction: false,
    } : false,

    pagination: {
      el: '.hero-pagination-tailwind',
      clickable: true,
      renderBullet: function (index, className) {
        return `
          <span class="${className} relative! m-0! h-2! flex-1! rounded-none! bg-white/30! opacity-100! overflow-hidden cursor-pointer">
            <span class="bullet-progress absolute left-0 top-0 h-full w-0 bg-white"></span>
          </span>
        `;
      }
    },

    navigation: {
      prevEl: '.heroSwiper_prev',
      nextEl: '.heroSwiper_next',
    },

    on: {
      init: function () {
        handleSingleSlideVisibility(this, slideCount);
        updateSlideInfo(this, slideCount);
        playActiveVideo(this);

        if (slideCount > 1) {
          updatePaginationState(this);
        }
      },

      slideChange: function () {
        if (slideCount <= 1) return;

        remainingTime = autoplayDelay;
        updateSlideInfo(this, slideCount);
        updatePaginationState(this);
        playActiveVideo(this);
      }
    }
  });

  function handleSingleSlideVisibility(swiper, totalSlides) {
    if (totalSlides <= 1) {
      const elementsToHide = [
        swiper.pagination?.el,
        swiper.navigation?.prevEl,
        swiper.navigation?.nextEl,
        document.getElementById('currentSlide')?.parentElement,
        document.getElementById('currentSlide'),
        document.getElementById('totalSlides')
      ];

      elementsToHide.forEach((el) => {
        if (el) {
          el.style.display = 'none';
        }
      });
    }
  }

  function updateSlideInfo(swiper, totalSlides) {
    const current = swiper.realIndex + 1;
    const format = (num) => String(num).padStart(2, '0');

    const currentEl = document.getElementById('currentSlide');
    const totalEl = document.getElementById('totalSlides');

    if (currentEl) currentEl.textContent = format(current);
    if (totalEl) totalEl.textContent = format(totalSlides);
  }

  function playActiveVideo(swiper) {
    document.querySelectorAll('.heroSwiper video').forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide ? activeSlide.querySelector('video') : null;

    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  }

  function updatePaginationState(swiper) {
    const bullets = swiper.pagination.bullets;
    if (!bullets || bullets.length === 0) return;

    const currentIndex = swiper.realIndex;

    bullets.forEach((bullet, index) => {
      const progressBar = bullet.querySelector('.bullet-progress');
      if (!progressBar) return;

      progressBar.style.transition = 'none';

      if (index < currentIndex) {
        progressBar.style.width = '100%';
      } else if (index > currentIndex) {
        progressBar.style.width = '0%';
      } else {
        progressBar.style.width = '0%';
        void progressBar.offsetWidth;

        if (swiper.autoplay && swiper.autoplay.running) {
          progressBar.style.transition = `width ${remainingTime}ms linear`;
          progressBar.style.width = '100%';
        }
      }
    });
  }
});

// ==========================================
// CARDS SECTION SWIPER
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const swiperEl = document.querySelector(".swiper-cards");
 
  if (swiperEl && !swiperEl.swiper) {
    const swiperWrapper = swiperEl.querySelector(".swiper-wrapper");
 
    let cardSlides = Array.from(
      swiperEl.querySelectorAll(".swiper-slide")
    ).filter((el) => {
      const emptyParent = el.parentElement
        ? el.parentElement.closest(".w-dyn-empty")
        : null;
 
      return !emptyParent;
    });
 
    cardSlides.forEach((slide) => {
      swiperWrapper.appendChild(slide);
    });
 
    const dynList = swiperWrapper.querySelector(".w-dyn-list");
 
    if (dynList) {
      dynList.remove();
    }
 
    cardSlides = Array.from(
      swiperWrapper.querySelectorAll(".swiper-slide")
    );
 
    if (cardSlides.length <= 3) {
      const originalSlides = [...cardSlides];
 
      if (originalSlides.length === 1) {
        while (cardSlides.length < 4) {
          originalSlides.forEach((slide) => {
            if (cardSlides.length < 4) {
              const clone = slide.cloneNode(true);
              swiperWrapper.appendChild(clone);
              cardSlides.push(clone);
            }
          });
        }
      } else {
        originalSlides.forEach((slide) => {
          const clone = slide.cloneNode(true);
          swiperWrapper.appendChild(clone);
        });
      }
    }
 
    // Initialize Swiper
    const swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlides: false,
      watchSlidesProgress: true,
      loop: false,
      loopAdditionalSlides: 2,
      slidesOffsetBefore: 1,
 
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
 
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
          centeredSlides: false,
          loop: true,
        },
 
        500: {
          slidesPerView: 1.5,
          spaceBetween: 24,
          centeredSlides: true,
          loop: true,
        },
 
        992: {
          slidesPerView: 2,
          spaceBetween: 24,
          loop: true,
          slidesOffsetBefore: 0,
        },
 
        1280: {
          slidesPerView: 2,
          spaceBetween: 32,
          loop: true,
          slidesOffsetBefore: 0,
        },
      },
    });
 
    const swiperPrev = document.querySelector(
      ".swiper-cards_prev, .card-arrow-prev"
    );
 
    const swiperNext = document.querySelector(
      ".swiper-cards_next, .card-arrow-next"
    );
 
    if (swiperPrev) {
      swiperPrev.addEventListener("click", () => swiper.slidePrev());
    }
 
    if (swiperNext) {
      swiperNext.addEventListener("click", () => swiper.slideNext());
    }
  }
});

// ==========================================
// PARTNERS LOGO SECTION SWIPER
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const swiperEl = document.querySelector(".swiper-partners");
  if (!swiperEl || swiperEl.swiper) return;

  const slideCount = swiperEl.querySelectorAll(".swiper-slide").length;
  const maxSlidesPerView = 5;
  const canLoop = slideCount > maxSlidesPerView;

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: canLoop,
    watchOverflow: true,
    grabCursor: true,

    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
    },

    navigation: {
      prevEl: ".logo-nav-prev",
      nextEl: ".logo-nav-next",
    },

    pagination: {
      el: ".swiper-pagination-partners",
      clickable: true,
    },
  });

  const sliderWrapper = swiperEl.closest(".relative") || swiperEl.parentElement;
  const controls = sliderWrapper.querySelectorAll(
    ".logo-nav-prev, .logo-nav-next, .swiper-pagination-partners"
  );
  swiper.on("lock", () => controls.forEach((el) => el.classList.add("hidden")));
  swiper.on("unlock", () => controls.forEach((el) => el.classList.remove("hidden")));
});


// ==========================================
// CERTIFICATES
// ==========================================
document.addEventListener('alpine:init', () => {
  Alpine.data('certificateGallery', () => ({
    open: false,
    activeEl: null,

    init() {
      // Re-initialize Lucide icons whenever the modal opens
      this.$watch('open', (isOpen) => {
        if (isOpen) {
          this.$nextTick(() => {
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
              window.lucide.createIcons();
            }
          });
        }
      });
    },

    get currentTitle() {
      return this.activeEl ? this.activeEl.getAttribute('data-title') : '';
    },
    get currentImg() {
      return this.activeEl ? this.activeEl.getAttribute('data-img') : '';
    },
    get currentPdf() {
      return this.activeEl ? this.activeEl.getAttribute('data-pdf') : '';
    },

    openCert(triggerElement) {
      this.activeEl = triggerElement.closest('.cert-card');
      this.open = true;
      document.body.style.overflow = 'hidden';
    },

    // Explicitly handles backdrop click and button clicks
    closeModal() {
      this.open = false;
      this.activeEl = null;
      document.body.style.overflow = '';
    },

    next() {
      if (!this.activeEl) return;
      const cards = Array.from(document.querySelectorAll('.cert-card'));
      const currentIndex = cards.indexOf(this.activeEl);
      const nextIndex = (currentIndex + 1) % cards.length;
      this.activeEl = cards[nextIndex];
    },

    prev() {
      if (!this.activeEl) return;
      const cards = Array.from(document.querySelectorAll('.cert-card'));
      const currentIndex = cards.indexOf(this.activeEl);
      const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
      this.activeEl = cards[prevIndex];
    }
  }));
});

// ==========================================
// SECTION GALLERY
// ==========================================
document.addEventListener('alpine:init', () => {
  Alpine.data('imageGallery', () => ({
    open: false,
    activeEl: null,

    init() {
      // Watch 'open' state to toggle body scroll AND lower header z-index
      this.$watch('open', value => {
        // 1. Lock/unlock body scroll
        document.body.style.overflow = value ? 'hidden' : '';

        // 2. Set header z-index to 0 when gallery is open, restore default when closed
        const header = document.querySelector('header'); // Adjust selector if using a class (e.g. '.site-header')
        if (header) {
          header.style.zIndex = value ? '0' : '';
        }
      });
    },

    get currentTitle() {
      return this.activeEl ? (this.activeEl.getAttribute('data-title') || 'DrySoTec') : 'DrySoTec';
    },

    get currentImg() {
      return this.activeEl ? this.activeEl.getAttribute('data-img') : '';
    },

    get imageCounter() {
      if (!this.activeEl) return '';
      const cards = Array.from(document.querySelectorAll('.cert-card:not(.swiper-slide-duplicate)'));
      const activeSrc = this.currentImg;
      const index = cards.findIndex(card => card.getAttribute('data-img') === activeSrc);
      
      const currentNum = index !== -1 ? index + 1 : 1;
      return `Bild ${currentNum} von ${cards.length}`;
    },

    openCert(triggerElement) {
      this.activeEl = triggerElement.closest('.cert-card');
      this.open = true;
    },

    closeModal() {
      this.open = false;
      // Note: activeEl is kept intact during transition fade-out for smooth animation
    },

    next() {
      if (!this.activeEl) return;
      const cards = Array.from(document.querySelectorAll('.cert-card:not(.swiper-slide-duplicate)'));
      const activeSrc = this.currentImg;
      let currentIndex = cards.findIndex(card => card.getAttribute('data-img') === activeSrc);
      
      const nextIndex = (currentIndex + 1) % cards.length;
      this.activeEl = cards[nextIndex];
    },

    prev() {
      if (!this.activeEl) return;
      const cards = Array.from(document.querySelectorAll('.cert-card:not(.swiper-slide-duplicate)'));
      const activeSrc = this.currentImg;
      let currentIndex = cards.findIndex(card => card.getAttribute('data-img') === activeSrc);
      
      const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
      this.activeEl = cards[prevIndex];
    }
  }));
});

// Swiper Initialization
document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.gallerySwiper', {
    loop: true,
    slidesPerView: 4.3,
    spaceBetween: 24,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 1.5, spaceBetween: 12 },
      640: { slidesPerView: 2.3, spaceBetween: 16 },
      992: { slidesPerView: 3.3, spaceBetween: 16 },
      1200: { slidesPerView: 4.3, spaceBetween: 16 }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

// ==========================================
// AOS ANIMATION SCRIPT
// ==========================================
  AOS.init();

  // ------------------------------------------------
// Back to top button (Vanilla JS)
// ------------------------------------------------
const button = document.getElementById("backToTop");
const progressCircle = document.getElementById("progressCircle");

if (button && progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    // Initialize SVG circle stroke styles
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    // Apply smooth CSS transition for visibility and position
    button.style.transition = "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease";

    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Prevent division by zero if page is not scrollable
        if (scrollHeight <= 0) return;

        // Calculate progress percentage
        const progress = scrollTop / scrollHeight;
        const offset = circumference - progress * circumference;
        progressCircle.style.strokeDashoffset = offset;

        // Toggle button visibility based on scroll distance
        if (scrollTop > 200) {
            button.classList.remove("opacity-0", "invisible");
            button.classList.add("opacity-100", "visible");
            button.style.transform = "translateY(0)";
        } else {
            button.classList.remove("opacity-100", "visible");
            button.classList.add("opacity-0", "invisible");
            button.style.transform = "translateY(20px)";
        }
    }

    // Scroll listener with initial check
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Smooth scroll to top on click
    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
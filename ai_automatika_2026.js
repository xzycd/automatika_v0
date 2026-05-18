document.addEventListener('DOMContentLoaded', () => {
  // ============================================================================
  // 1. MOBILE HAMBURGER MENU TOGGLE
  // ============================================================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('visible');
      menuBtn.classList.toggle('open');
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('visible');
        menuBtn.classList.remove('open');
      });
    });
  }

  // ============================================================================
  // 2. ANIMATED SCROLL COUNTERS
  // ============================================================================
  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          const duration = 2000; // 2 seconds
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(startValue + (target - startValue) * progress);
            entry.target.textContent = '+' + current;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  };

  animateCounters();

  // ============================================================================
  // 3. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  // ============================================================================
  const setupScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('[data-delay]');

          if (children.length === 0) {
            entry.target.classList.add('visible');
          } else {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('visible');
              }, index * 100);
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
  };

  setupScrollAnimations();

  // ============================================================================
  // 4. LANGUAGE SWITCHER (LT/EN)
  // ============================================================================
  const setupLanguageSwitcher = () => {
    const currentLang = localStorage.getItem('language') || 'lt';
    updateLanguage(currentLang);

    const langToggles = document.querySelectorAll('[data-lang-toggle]');
    langToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const newLang = toggle.getAttribute('data-lang-toggle');
        localStorage.setItem('language', newLang);
        updateLanguage(newLang);

        // Update active state
        langToggles.forEach(t => t.classList.remove('active'));
        toggle.classList.add('active');
      });
    });

    // Set initial active state
    document.querySelector(`[data-lang-toggle="${currentLang}"]`)?.classList.add('active');
  };

  const updateLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-lt][data-en]');
    elements.forEach(element => {
      element.textContent = lang === 'lt' ? element.getAttribute('data-lt') : element.getAttribute('data-en');
    });
  };

  setupLanguageSwitcher();

  // ============================================================================
  // 5. FAQ ACCORDION
  // ============================================================================
  const setupFAQAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      const answer = item.querySelector('.faq-answer');

      if (header && answer) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              if (otherAnswer) {
                otherAnswer.style.maxHeight = '0';
              }
            }
          });

          // Toggle current item
          item.classList.toggle('active');
          if (!isActive) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '0';
          }
        });
      }
    });
  };

  setupFAQAccordion();

  // ============================================================================
  // 6. SOCIAL PROOF TOAST NOTIFICATIONS
  // ============================================================================
  const setupSocialProofToasts = () => {
    const toastData = [
      { lt: 'Tomas iš Vilniaus ką tik pradėjo', en: 'Tomas from Vilnius just started' },
      { lt: 'Rasa iš Kauno sutaupė 24h/mėn', en: 'Rasa from Kaunas saved 24h/month' },
      { lt: 'Mindaugas iš Klaipėdos padidino efektyvumą 40%', en: 'Mindaugas from Klaipėda increased efficiency 40%' },
      { lt: 'Laima iš Šiaulių sumažino išlaidas 15%', en: 'Laima from Šiauliai reduced costs 15%' },
      { lt: 'Aurelijus iš Panevėžio sutaupė €800/mėn', en: 'Aurelijus from Panevėžys saved €800/month' },
      { lt: 'Gintarė iš Vilniaus sutaupė 30h/mėn', en: 'Gintarė from Vilnius saved 30h/month' },
      { lt: 'Donatas iš Druskininkų pradėjo naudoti AI', en: 'Donatas from Druskininkai started using AI' },
      { lt: 'Danutė iš Alytaus padidino produktyvumą 35%', en: 'Danutė from Alytus increased productivity 35%' },
    ];

    const getRandomToast = () => {
      return toastData[Math.floor(Math.random() * toastData.length)];
    };

    const showToast = () => {
      const currentLang = localStorage.getItem('language') || 'lt';
      const toast = getRandomToast();
      const message = currentLang === 'lt' ? toast.lt : toast.en;

      const toastEl = document.createElement('div');
      toastEl.className = 'toast-notification';
      toastEl.textContent = message;
      document.body.appendChild(toastEl);

      // Trigger animation
      setTimeout(() => {
        toastEl.classList.add('visible');
      }, 10);

      // Remove after 4 seconds
      setTimeout(() => {
        toastEl.classList.remove('visible');
        setTimeout(() => {
          toastEl.remove();
        }, 300);
      }, 4000);
    };

    // Show toast every 8-12 seconds
    const scheduleToast = () => {
      const delay = Math.random() * 4000 + 8000; // 8-12 seconds
      setTimeout(() => {
        showToast();
        scheduleToast();
      }, delay);
    };

    scheduleToast();
  };

  setupSocialProofToasts();

  // ============================================================================
  // 7. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================================
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navHeight = 80; // Fixed navbar height
          const targetPosition = targetElement.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  };

  setupSmoothScroll();

  // ============================================================================
  // 8. SCROLL PROGRESS BAR
  // ============================================================================
  const setupScrollProgressBar = () => {
    const progressBar = document.getElementById('progress-bar');

    if (progressBar) {
      window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;

        progressBar.style.width = scrollPercent + '%';
      });
    }
  };

  setupScrollProgressBar();

  // ============================================================================
  // 9. PRICING TOGGLE (MONTHLY/ANNUAL)
  // ============================================================================
  const setupPricingToggle = () => {
    const pricingToggle = document.querySelector('[data-pricing-toggle]');

    if (pricingToggle) {
      pricingToggle.addEventListener('change', () => {
        const isAnnual = pricingToggle.checked;
        const priceElements = document.querySelectorAll('[data-price-monthly][data-price-annual]');

        priceElements.forEach(element => {
          const monthlyPrice = parseFloat(element.getAttribute('data-price-monthly'));
          const annualPrice = parseFloat(element.getAttribute('data-price-annual'));
          const displayPrice = isAnnual ? annualPrice : monthlyPrice;

          element.textContent = displayPrice.toFixed(2);
        });

        // Toggle billing period labels
        const billingPeriods = document.querySelectorAll('[data-billing-period]');
        billingPeriods.forEach(element => {
          if (isAnnual) {
            element.textContent = element.getAttribute('data-billing-period-annual');
          } else {
            element.textContent = element.getAttribute('data-billing-period-monthly');
          }
        });
      });
    }
  };

  setupPricingToggle();

  // ============================================================================
  // 10. NAVBAR SCROLL EFFECT
  // ============================================================================
  const setupNavbarScroll = () => {
    const navbar = document.querySelector('navbar, nav, header');

    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  };

  setupNavbarScroll();

  // ============================================================================
  // 11. ROI CALCULATOR
  // ============================================================================
  const setupROICalculator = () => {
    const hoursInput = document.getElementById('roi-hours');
    const rateInput = document.getElementById('roi-rate');
    const monthlyOutput = document.getElementById('roi-monthly');
    const annualOutput = document.getElementById('roi-annual');

    if (hoursInput && rateInput && monthlyOutput && annualOutput) {
      const calculateROI = () => {
        const hours = parseFloat(hoursInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;

        // Calculate monthly savings (4.33 weeks per month average)
        const monthlySavings = hours * 4.33 * rate;
        const annualSavings = monthlySavings * 12;

        monthlyOutput.textContent = monthlySavings.toFixed(2) + ' €';
        annualOutput.textContent = annualSavings.toFixed(2) + ' €';
      };

      hoursInput.addEventListener('input', calculateROI);
      rateInput.addEventListener('input', calculateROI);

      // Initial calculation
      calculateROI();
    }
  };

  setupROICalculator();

  // ============================================================================
  // 12. COPY PHONE/EMAIL TO CLIPBOARD
  // ============================================================================
  const setupCopyButtons = () => {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = button.getAttribute('data-copy');

        if (!textToCopy) return;

        try {
          await navigator.clipboard.writeText(textToCopy);

          // Get current language for tooltip text
          const currentLang = localStorage.getItem('language') || 'lt';
          const tooltipText = currentLang === 'lt' ? 'Nukopijuota!' : 'Copied!';

          // Show tooltip
          const originalText = button.textContent;
          button.textContent = tooltipText;
          button.classList.add('copied');

          // Restore original text after 2 seconds
          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  };

  setupCopyButtons();
});

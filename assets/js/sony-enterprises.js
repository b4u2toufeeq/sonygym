/* ==========================================================================
   Sony Enterprises — site behaviour
   ========================================================================== */
(function () {
  'use strict';

  var SUPPORT_EMAIL = 'marketing@sonyenterprises.in';
  var WA_NUMBER = '919390989002';
  var PHONE = '+919390989002';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function waLink(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ----------------------------------------------------------- WhatsApp */
  document.querySelectorAll('.js-order').forEach(function (link) {
    var product = link.getAttribute('data-product') || 'your product';
    link.setAttribute('href', waLink('Hi, I want to order ' + product + '. Please share price and availability.'));
  });

  var waFloat = document.getElementById('waFloat');
  if (waFloat) {
    waFloat.setAttribute('href', waLink('Hi, I want to know more about inverter batteries, solar and automotive solutions.'));
  }

  /* --------------------------------------- Promo banner carousel */
  var promoCarousel = document.getElementById('promoCarousel');
  if (promoCarousel && window.bootstrap && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Bootstrap auto-cycles the banner on load; keep it manual for reduced-motion users.
    window.addEventListener('load', function () {
      var promo = window.bootstrap.Carousel.getInstance(promoCarousel);
      if (promo) promo.pause();
    });
  }

  /* --------------------------------------------------------- Sub nav */
  var subNav = document.getElementById('subNavMenu');
  if (subNav && window.bootstrap) {
    subNav.addEventListener('shown.bs.collapse', function () {
      subNav.scrollTop = 0;
    });
    subNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          var inst = window.bootstrap.Collapse.getInstance(subNav);
          if (inst) inst.hide();
        }
      });
    });
  }

  /* --------------------------------------------------------- Lead forms */
  function setFormStatus(form, message, ok) {
    var status = form.querySelector('.lead-form-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('ok', !!ok);
    status.classList.toggle('err', !ok);
  }

  function sendLeadForm(form) {
    var data = new FormData(form);
    if (data.get('_honey')) return Promise.resolve({ skipped: true });

    var name = (data.get('name') || '').trim();
    var email = (data.get('email') || '').trim();
    var phone = (data.get('phone') || '').trim();
    var pincode = (data.get('pincode') || '').trim();
    var source = data.get('source') || 'Website form';

    if (!name || !/^[0-9]{10}$/.test(phone.replace(/\D/g, '').slice(-10)) || !/^[0-9]{6}$/.test(pincode)) {
      return Promise.reject(new Error('Please enter your name, a 10-digit contact number and a 6-digit PIN code.'));
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Promise.reject(new Error('Please enter a valid email address.'));
    }

    var payload = {
      _subject: 'Website enquiry — ' + name + ' (' + source + ')',
      _template: 'table',
      _captcha: 'false',
      Name: name,
      Email: email || 'Not provided',
      'Contact Number': phone,
      'PIN Code': pincode,
      Source: source,
      'WhatsApp order link': waLink('Order enquiry from ' + name)
    };

    return fetch('https://formsubmit.co/ajax/' + SUPPORT_EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('Email service unavailable');
      return res.json();
    }).catch(function () {
      var body = [
        'Name: ' + name,
        'Email: ' + (email || 'Not provided'),
        'Contact Number: ' + phone,
        'PIN Code: ' + pincode,
        'Source: ' + source
      ].join('\n');
      window.location.href = 'mailto:' + SUPPORT_EMAIL
        + '?subject=' + encodeURIComponent('Website enquiry — ' + name)
        + '&body=' + encodeURIComponent(body);
      return { fallback: true };
    });
  }

  document.querySelectorAll('.js-lead-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      setFormStatus(form, '', true);
      if (btn) { btn.disabled = true; btn.textContent = 'SENDING...'; }
      sendLeadForm(form).then(function (result) {
        if (result && result.skipped) return;
        form.reset();
        setFormStatus(form, result && result.fallback
          ? 'Opening your email app to send this enquiry.'
          : 'Thanks! Your enquiry has been sent. We will get in touch shortly.', true);
      }).catch(function (err) {
        setFormStatus(form, err.message || 'Could not send. Please try again.', false);
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'GET IN TOUCH'; }
      });
    });
  });

  /* --------------------------------------- Free demo popup (idle / exit) */
  (function () {
    var IDLE_DELAY = 1000;    // ms of no activity before the popup shows
    var CLOSE_GRACE = 1000;   // ms after a cancelled tab/window close
    var SEEN_KEY = 'sonyDemoPopupSeen';
    var modalEl = document.getElementById('demoModal');
    if (!modalEl || !window.bootstrap) return;

    var seen = false;
    var engaged = false;
    var timer = null;
    var closeTimer = null;
    var guardDepth = 0;
    var demoModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });

    var demoWa = modalEl.querySelector('.btn-whatsapp');
    if (demoWa) demoWa.setAttribute('href', waLink('Hi, I want to book a free demo. Please share available slots.'));

    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (err) { seen = false; }

    function markSeen() {
      seen = true;
      clearTimeout(timer);
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (err) {}
    }
    function isTyping() {
      var el = document.activeElement;
      return !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    }
    function anyModalOpen() {
      return !!document.querySelector('.modal.show');
    }
    function show() {
      if (seen || isTyping() || anyModalOpen()) return;
      markSeen();
      demoModal.show();
    }
    function restart() {
      engaged = true;
      clearTimeout(timer);
      if (seen) return;
      timer = setTimeout(show, IDLE_DELAY);
    }

    ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'].forEach(function (evt) {
      document.addEventListener(evt, restart, { passive: true });
    });

    // Exit intent: pointer leaving through the top of the viewport
    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget && e.clientY <= 0) show();
    });
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY <= 0) show();
    });

    // Direct close / refresh: ask to stay, then offer the demo if they do
    window.addEventListener('beforeunload', function (e) {
      if (seen || !engaged) return undefined;
      e.preventDefault();
      e.returnValue = '';
      clearTimeout(closeTimer);
      closeTimer = setTimeout(show, CLOSE_GRACE);
      return '';
    });

    // Never block a real departure
    window.addEventListener('pagehide', function () { seen = true; });

    // Mobile fallback: back button and app switches bypass beforeunload
    history.pushState({ sonyGuard: 1 }, '');
    window.addEventListener('popstate', function () {
      if (seen || guardDepth > 1) { history.back(); return; }
      guardDepth++;
      show();
      history.pushState({ sonyGuard: 1 }, '');
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden' && !seen) {
        engaged = true;
        clearTimeout(closeTimer);
        closeTimer = setTimeout(show, CLOSE_GRACE);
      }
    });

    // A dismissed popup must not return this session
    modalEl.addEventListener('hidden.bs.modal', function () {
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (err) {}
    });

    restart();
  })();

  /* ------------------------------------------------------- Mobile nav */
  var navCollapseEl = document.getElementById('siteNav');
  if (navCollapseEl && window.bootstrap) {
    var bsCollapse = new bootstrap.Collapse(navCollapseEl, { toggle: false });
    document.querySelectorAll('#siteNav a, #siteNav button, .sub-nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapseEl.classList.contains('show')) bsCollapse.hide();
      });
    });
  }

  /* --------------------------------------- Active sub-nav highlighting */
  var subLinks = Array.prototype.slice.call(document.querySelectorAll('.sub-nav-links a'));
  var sections = subLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        subLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------- Keep the "call" links consistent in markup */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.setAttribute('href', 'tel:' + PHONE);
  });
})();

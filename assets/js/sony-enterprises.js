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

  /* ------------------------------------------------- In-page navigation */
  /* The header navs are Bootstrap collapses. While one animates open/closed it
     changes the page height, so a native fragment scroll resolves its target
     against the old layout and lands in the wrong place. Close every open
     collapse first, then navigate once the last one has finished. */
  var NAV_COLLAPSES = ['siteNav', 'subNavMenu'];

  function openNavCollapses() {
    return NAV_COLLAPSES
      .map(function (id) { return document.getElementById(id); })
      .filter(function (el) {
        return el && (el.classList.contains('show') || el.classList.contains('collapsing'));
      });
  }

  function fragmentOf(link) {
    var href = link.getAttribute('href') || '';
    if (href.charAt(0) !== '#' || href.length < 2) return null;
    var target = document.getElementById(href.slice(1));
    return target ? { hash: href, target: target } : null;
  }

  function scrollToFragment(hash, target) {
    if (window.history && history.replaceState) history.replaceState(null, '', hash);
    // No explicit `behavior` — it falls back to the computed scroll-behavior on
    // <html>, so the reduced-motion override in the stylesheet still applies.
    // scroll-padding-top on <html> keeps the target clear of the sticky header.
    if (typeof target.scrollIntoView === 'function') target.scrollIntoView({ block: 'start' });
    else location.hash = hash;
  }

  function followNavLink(link) {
    var frag = fragmentOf(link);
    if (!frag || !window.bootstrap) return;

    var pending = openNavCollapses();
    if (!pending.length) return;
    // Bail out to native navigation if any open panel has no Collapse instance,
    // otherwise `hidden.bs.collapse` would never arrive and the scroll would hang.
    if (!pending.every(function (el) { return !!window.bootstrap.Collapse.getInstance(el); })) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      var remaining = pending.length;
      var done = function () {
        remaining -= 1;
        if (remaining > 0) return;
        pending.forEach(function (el) { el.removeEventListener('hidden.bs.collapse', done); });
        scrollToFragment(frag.hash, frag.target);
      };
      pending.forEach(function (el) {
        el.addEventListener('hidden.bs.collapse', done);
        window.bootstrap.Collapse.getInstance(el).hide();
      });
    });
  }

  /* --------------------------------------------------------- Sub nav */
  var subNav = document.getElementById('subNavMenu');
  if (subNav) {
    subNav.addEventListener('shown.bs.collapse', function () {
      subNav.scrollTop = 0;
    });
    subNav.querySelectorAll('a').forEach(followNavLink);
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
    var bsCollapse = new window.bootstrap.Collapse(navCollapseEl, { toggle: false });
    document.querySelectorAll('#siteNav button').forEach(function (el) {
      el.addEventListener('click', function () {
        if (navCollapseEl.classList.contains('show')) bsCollapse.hide();
      });
    });
    document.querySelectorAll('#siteNav a').forEach(function (link) {
      // Fragment links close the panel and then scroll (see followNavLink);
      // anything else just closes it before the browser leaves the page.
      if (fragmentOf(link)) {
        followNavLink(link);
      } else {
        link.addEventListener('click', function () {
          if (navCollapseEl.classList.contains('show')) bsCollapse.hide();
        });
      }
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

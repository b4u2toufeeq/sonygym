/* ==========================================================================
   Sony Motors — electric 2-wheeler site behaviour
   Mirrors assets/js/sony-enterprises.js so the sub-site feels identical
   to the parent Sony Enterprises site, with the showcase rail added.
   ========================================================================== */
(function () {
  'use strict';

  var SUPPORT_EMAIL = 'marketing@sonyenterprises.in';
  var WA_NUMBER = '919390989002';
  var PHONE = '+919390989002';
  var BRAND = 'Sony Motors';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function waLink(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ----------------------------------------------------------- WhatsApp */
  // Every product on the page carries data-product (and optionally data-price),
  // so each "Order Now" button opens WhatsApp pre-filled with that scooter.
  document.querySelectorAll('.js-order').forEach(function (link) {
    var product = link.getAttribute('data-product') || 'an electric scooter';
    var price = link.getAttribute('data-price');
    var variant = link.getAttribute('data-variant');
    var msg = 'Hi, I want to order ' + product;
    if (variant) msg += ' in ' + variant;
    if (price) msg += ' (' + price + ')';
    msg += '. Please share availability, delivery details and test ride options.';
    link.setAttribute('href', waLink(msg));
  });

  var waFloat = document.getElementById('waFloat');
  if (waFloat) {
    waFloat.setAttribute('href', waLink('Hi ' + BRAND + ', I want to know more about your electric 2-wheelers, test ride and dealership.'));
  }

  /* --------------------------------------- Hero banner carousel */
  var promoCarousel = document.getElementById('promoCarousel');
  if (promoCarousel && window.bootstrap && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('load', function () {
      var promo = window.bootstrap.Carousel.getInstance(promoCarousel);
      if (promo) promo.pause();
    });
  }

  /* =========================================================
     Showcase rail — e-Ashwa style horizontal scroll-snap track
     ========================================================= */
  (function rail() {
    var track = document.getElementById('scooterRail');
    if (!track) return;

    var prevBtn = document.querySelector('.rail-nav [data-rail="prev"]');
    var nextBtn = document.querySelector('.rail-nav [data-rail="next"]');
    var dotsWrap = document.getElementById('railDots');
    var emptyMsg = document.getElementById('railEmpty');
    var filterWrap = document.getElementById('showcaseFilters');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function cards() {
      return Array.prototype.slice.call(track.querySelectorAll('.scooter-card'));
    }

    function visibleCards() {
      return cards().filter(function (card) { return !card.hidden; });
    }

    function step() {
      var first = visibleCards()[0];
      if (!first) return 320;
      var styles = window.getComputedStyle(track);
      var gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      var second = visibleCards()[1];
      if (!second) return first.getBoundingClientRect().width + gap;
      return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    }

    function scrollByCard(dir) {
      track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    function atStart() { return track.scrollLeft <= 4; }
    function atEnd() { return track.scrollLeft >= track.scrollWidth - track.clientWidth - 4; }

    function updateArrows() {
      if (prevBtn) prevBtn.disabled = atStart();
      if (nextBtn) nextBtn.disabled = atEnd();
    }

    /* Dots: one per "page" of the rail, based on how many cards fit. */
    var MAX_DOTS = 8;

    function buildDots() {
      if (!dotsWrap) return;
      var list = visibleCards();
      dotsWrap.innerHTML = '';
      // No layout yet (0 width) means we can't paginate - wait for a real measure.
      var width = track.clientWidth;
      var stride = step();
      if (list.length < 2 || !width || !stride) return;

      var perView = Math.max(1, Math.round(width / stride));
      var pages = Math.min(MAX_DOTS, Math.max(1, Math.ceil(list.length / perView)));

      for (var i = 0; i < pages; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Go to scooter ' + (i + 1) + ' of ' + pages);
        dot.addEventListener('click', (function (index) {
          return function () { track.scrollTo({ left: index * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' }); };
        })(i));
        dotsWrap.appendChild(dot);
      }
      syncDots();
    }

    function currentPage() {
      var dots = dotsWrap ? dotsWrap.children.length : 0;
      var width = track.clientWidth;
      if (!dots || !width) return 0;
      var page = Math.round(track.scrollLeft / width);
      return Math.min(Math.max(page, 0), dots - 1);
    }

    function syncDots() {
      if (!dotsWrap) return;
      var page = currentPage();
      for (var i = 0; i < dotsWrap.children.length; i++) {
        dotsWrap.children[i].classList.toggle('active', i === page);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

    /* Gentle autoplay: pauses on hover, focus, tab-hide and any manual scroll. */
    var timer = null;
    var AUTOPLAY_MS = 4200;
    var autoScrolling = false;   // ignore the scroll events our own autoplay causes

    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function scrollByCard(dir) {
      if (!reduceMotion) autoScrolling = true;
      track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
      if (reduceMotion) autoScrolling = false;
    }
    function startAutoplay() {
      if (reduceMotion || document.hidden) return;
      stopAutoplay();
      timer = setInterval(function () {
        if (atEnd()) track.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        else scrollByCard(1);
      }, AUTOPLAY_MS);
    }
    function holdAutoplay() { stopAutoplay(); }

    var scrollEndTimer = null;
    track.addEventListener('scroll', function () {
      updateArrows();
      syncDots();
      if (autoScrolling) return;          // our own scroll - keep the timer alive
      // A manual scroll stops autoplay; it restarts once scrolling settles.
      holdAutoplay();
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(startAutoplay, 2600);
    }, { passive: true });

    track.addEventListener('mouseenter', holdAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    track.addEventListener('focusin', holdAutoplay);
    track.addEventListener('focusout', startAutoplay);
    track.addEventListener('wheel', holdAutoplay, { passive: true });
    track.addEventListener('touchstart', holdAutoplay, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });

    /* Colour swatches: highlight the chosen dot (visual only — one photo per model). */
    track.addEventListener('click', function (event) {
      var dot = event.target.closest('.swatch-dot');
      if (!dot) return;
      var group = dot.closest('.swatches');
      if (!group) return;
      group.querySelectorAll('.swatch-dot').forEach(function (el) {
        el.setAttribute('aria-pressed', el === dot ? 'true' : 'false');
      });
    });

    /* Showcase filter chips */
    function applyFilter(value) {
      var shown = 0;
      cards().forEach(function (card) {
        var cat = card.getAttribute('data-category') || '';
        var match = value === 'all' || cat.split(' ').indexOf(value) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      if (emptyMsg) emptyMsg.classList.toggle('d-none', shown !== 0);
      track.scrollTo({ left: 0, behavior: 'auto' });
      updateArrows();
      buildDots();
    }

    if (filterWrap) {
      filterWrap.addEventListener('click', function (event) {
        var btn = event.target.closest('button[data-filter]');
        if (!btn) return;
        filterWrap.querySelectorAll('button[data-filter]').forEach(function (el) {
          el.setAttribute('aria-pressed', el === btn ? 'true' : 'false');
        });
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    }

    window.addEventListener('resize', function () {
      updateArrows();
      buildDots();
    });

    // Images finish decoding after first paint, so re-measure once they're in.
    window.addEventListener('load', function () {
      autoScrolling = false;
      updateArrows();
      buildDots();
      startAutoplay();
    });
    updateArrows();
    buildDots();
    startAutoplay();
  })();

  /* =========================================================
     Catalogue grid — search + category filter
     ========================================================= */
  (function grid() {
    var grid = document.getElementById('catalogueGrid');
    if (!grid) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll('.product-item'));
    var filterRow = document.getElementById('catalogueFilters');
    var search = document.getElementById('catalogueSearch');
    var noResults = document.getElementById('catalogueEmpty');
    var countEl = document.getElementById('catalogueCount');
    var category = 'all';
    var term = '';

    function matches(item) {
      var cat = item.getAttribute('data-category') || '';
      var name = (item.getAttribute('data-name') || '').toLowerCase();
      var okCat = category === 'all' || cat.split(' ').indexOf(category) !== -1;
      var okTerm = !term || name.indexOf(term) !== -1;
      return okCat && okTerm;
    }

    function render() {
      var shown = 0;
      items.forEach(function (item) {
        var ok = matches(item);
        item.hidden = !ok;
        if (ok) shown++;
      });
      if (noResults) noResults.classList.toggle('d-none', shown !== 0);
      if (countEl) {
        countEl.textContent = shown + (shown === 1 ? ' model' : ' models') +
          (category === 'all' && !term ? ' in the 2-wheeler range' : ' matching your filter');
      }
    }

    if (filterRow) {
      filterRow.addEventListener('click', function (event) {
        var btn = event.target.closest('button[data-filter]');
        if (!btn) return;
        filterRow.querySelectorAll('button[data-filter]').forEach(function (el) {
          el.setAttribute('aria-pressed', el === btn ? 'true' : 'false');
        });
        category = btn.getAttribute('data-filter') || 'all';
        render();
      });
    }

    if (search) {
      search.addEventListener('input', function () {
        term = search.value.trim().toLowerCase();
        render();
      });
    }

    render();
  })();

  /* --------------------------------------------------------- Sub nav */
  var subNav = document.getElementById('subNavMenu');
  if (subNav && window.bootstrap) {
    subNav.addEventListener('shown.bs.collapse', function () { subNav.scrollTop = 0; });
    subNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          var inst = window.bootstrap.Collapse.getInstance(subNav);
          if (inst) inst.hide();
        }
      });
    });
  }

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
    var source = data.get('source') || 'Sony Motors website form';

    if (!name || !/^[0-9]{10}$/.test(phone.replace(/\D/g, '').slice(-10)) || !/^[0-9]{6}$/.test(pincode)) {
      return Promise.reject(new Error('Please enter your name, a 10-digit contact number and a 6-digit PIN code.'));
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Promise.reject(new Error('Please enter a valid email address.'));
    }

    var payload = {
      _subject: 'Sony Motors enquiry — ' + name + ' (' + source + ')',
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
        + '?subject=' + encodeURIComponent('Sony Motors enquiry — ' + name)
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
        if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'SEND ENQUIRY'; }
      });
    });
  });

  /* --------------------------------------- Product quick-view modal */
  var modalEl = document.getElementById('productModal');
  if (modalEl && window.bootstrap) {
    var productModal = new bootstrap.Modal(modalEl);
    var mImg = document.getElementById('modalProductImage');
    var mTitle = document.getElementById('modalProductTitle');
    var mPrice = document.getElementById('modalProductPrice');
    var mDesc = document.getElementById('modalProductDescription');
    var mSpecs = document.getElementById('modalProductSpecs');
    var mOrder = document.getElementById('modalOrderButton');

    document.querySelectorAll('[data-modal-product]').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        var card = trigger.closest('.scooter-card, .range-card');
        if (!card) return;
        var name = card.getAttribute('data-name') || '';
        var img = card.querySelector('img');
        if (mImg) { mImg.src = img ? img.getAttribute('src') : ''; mImg.alt = name; }
        if (mTitle) mTitle.textContent = name;
        if (mPrice) mPrice.textContent = card.getAttribute('data-price') || '';
        if (mDesc) mDesc.textContent = card.getAttribute('data-desc') || '';
        if (mSpecs) {
          // Rail cards use dt/dd rows; catalogue cards use range-specs <li> items.
          var rows = Array.prototype.slice.call(card.querySelectorAll('.scooter-info .row-spec, .range-specs li'));
          var html = rows.map(function (row) {
            var value = row.querySelector('dd');
            var label = row.querySelector('dt');
            var labelText = label ? label.textContent.trim() : '';
            var valueText = value ? value.textContent.trim() : row.textContent.trim();
            return '<div class="row-spec"><dt>' + labelText + '</dt><dd>' + valueText + '</dd></div>';
          }).join('');
          // The colour swatches are buttons with no text, so summarise them by count.
          var dots = card.querySelectorAll('.swatches .swatch-dot');
          if (dots.length) {
            html += '<div class="row-spec"><dt>Colours</dt><dd>' + dots.length + ' available</dd></div>';
          }
          mSpecs.innerHTML = html;
        }
        if (mOrder) {
          mOrder.setAttribute('href', waLink('Hi, I want to order ' + name +
            '. Please share availability, delivery details and test ride options.'));
        }
        productModal.show();
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
/* =========================================================================
   Интерактив сайта: прогресс скролла, шапка, мобильное меню,
   подсветка активного раздела, появление при скролле, счётчики.
   Ванильный JS, без внешних зависимостей.
   ========================================================================= */
(function () {
  "use strict";

  window.__siteReady = true; // флаг инициализации для аварийного failsafe в index.html

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- текущий год в подвале ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- прогресс скролла + класс шапки ---------- */
  var progress = document.getElementById("scrollProgress");
  var header = document.getElementById("header");

  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", st > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- мобильное меню ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- счётчики (объявляем заранее) ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var counted = false;
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null, done = false;
    function finish() { if (done) return; done = true; el.textContent = target + suffix; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) { el.textContent = Math.round(target * eased); requestAnimationFrame(step); }
      else finish();
    }
    requestAnimationFrame(step);
    setTimeout(finish, dur + 400); // failsafe, если rAF приостановлен (фоновая вкладка)
  }
  function runCounters() {
    if (counted) return; counted = true;
    counters.forEach(animateCount);
  }

  /* ---------- появление при скролле (без зависимости от IntersectionObserver) ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function inView(el, ratio) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight * (ratio || 0.9) && r.bottom > 0;
  }
  function checkReveal() {
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (!el.classList.contains("in") && inView(el)) el.classList.add("in");
    }
    if (!counted) {
      var hs = document.querySelector(".hero-stats");
      if (hs && inView(hs, 1)) runCounters();
    }
  }
  if (prefersReduced) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    runCounters();
  } else {
    checkReveal();
    window.addEventListener("scroll", checkReveal, { passive: true });
    window.addEventListener("resize", checkReveal);
    window.addEventListener("load", checkReveal);
  }

  /* ---------- подсветка активного раздела ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

})();

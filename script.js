(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Split-text reveal (chars rise into place) ---------- */
  function splitReveal(el) {
    var text = el.textContent;
    el.textContent = "";
    var words = text.split(" ");
    words.forEach(function (word, wi) {
      var wordWrap = document.createElement("span");
      wordWrap.className = "split-word";
      word.split("").forEach(function (ch) {
        var outer = document.createElement("span");
        outer.className = "char-outer";
        var inner = document.createElement("span");
        inner.className = "char-inner";
        inner.textContent = ch;
        outer.appendChild(inner);
        wordWrap.appendChild(outer);
      });
      el.appendChild(wordWrap);
      if (wi < words.length - 1) {
        var space = document.createElement("span");
        space.className = "word-space";
        el.appendChild(space);
      }
    });
  }

  function playReveal(el) {
    var chars = el.querySelectorAll(".char-inner");
    chars.forEach(function (c, i) {
      c.style.transitionDelay = (i * 18) + "ms";
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        chars.forEach(function (c) { c.classList.add("is-revealed"); });
      });
    });
  }

  var splitEls = document.querySelectorAll("[data-split-reveal]");
  var autoplayEls = [];
  if (!reducedMotion) {
    splitEls.forEach(function (el) {
      splitReveal(el);
      if (el.hasAttribute("data-split-autoplay")) {
        autoplayEls.push(el);
      }
    });
    if (splitEls.length) {
      var splitIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.hasAttribute("data-split-autoplay")) {
              playReveal(entry.target);
              splitIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      splitEls.forEach(function (el) {
        if (!el.hasAttribute("data-split-autoplay")) splitIo.observe(el);
      });
    }
  }

  /* ---------- Portal loader + header rule (play on every load) ---------- */
  var loader = document.getElementById("portal-loader");
  var headerRule = document.getElementById("header-rule");
  function runLoadSequence() {
    if (reducedMotion) {
      if (loader) loader.classList.add("is-done");
      if (headerRule) headerRule.classList.add("is-drawn");
      autoplayEls.forEach(function (el) { playReveal(el); });
      return;
    }
    if (loader) {
      requestAnimationFrame(function () {
        loader.classList.add("is-visible");
      });
      setTimeout(function () {
        loader.classList.add("is-opening");
        if (headerRule) headerRule.classList.add("is-drawn");
        autoplayEls.forEach(function (el) { playReveal(el); });
      }, 900);
      setTimeout(function () {
        loader.classList.add("is-done");
      }, 1900);
    } else {
      if (headerRule) headerRule.classList.add("is-drawn");
      autoplayEls.forEach(function (el) { playReveal(el); });
    }
  }
  if (document.readyState === "complete") {
    runLoadSequence();
  } else {
    window.addEventListener("load", runLoadSequence);
  }

  /* Header solid state on scroll */
  var header = document.getElementById("site-header");
  function updateHeader() {
    if (window.scrollY > 80) {
      header.classList.add("is-solid");
    } else {
      header.classList.remove("is-solid");
    }
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* Hero crossfade (slow, elegant) */
  var slides = document.querySelectorAll("[data-hero-slide]");
  if (slides.length > 1 && !reducedMotion) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 4200);
  }

  /* Reveal on scroll: fade+rise, slide-in, section sweep lines, eyebrows and the onde-table rule all share the same trigger */
  var revealEls = document.querySelectorAll(".reveal, .reveal-x, .section-sweep, .eyebrow, .onde-table");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Background motif: slow continuous drift + subtle parallax toward the mouse, combined in one loop */
  var motifs = document.querySelectorAll(".bg-motif");
  if (motifs.length && !reducedMotion) {
    var mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", function (e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    }, { passive: true });

    function driftLoop(t) {
      var driftX = Math.sin(t / 9000) * 12;
      var driftY = Math.cos(t / 12000) * 8;
      var x = driftX + mouseX;
      var y = driftY + mouseY;
      motifs.forEach(function (m) {
        m.style.transform = "translate3d(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px, 0)";
      });
      requestAnimationFrame(driftLoop);
    }
    requestAnimationFrame(driftLoop);
  }

  /* Portfolio filter */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var portfolioItems = document.querySelectorAll(".portfolio-item");
  var countEl = document.getElementById("portfolio-count");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      var visible = 0;
      portfolioItems.forEach(function (item) {
        var match = filter === "Tudo" || item.getAttribute("data-category") === filter;
        item.hidden = !match;
        if (match) visible++;
      });
      if (countEl) countEl.textContent = visible + (visible === 1 ? " imagem" : " imagens");
    });
  });

  /* Before/after: tap to toggle on touch devices */
  document.querySelectorAll(".ad-frame").forEach(function (frame) {
    frame.addEventListener("click", function () {
      frame.classList.toggle("is-touched");
    });
  });
})();

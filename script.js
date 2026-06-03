/* ===================================================================
   alma nueva — interacción
   =================================================================== */
(function () {
  "use strict";

  /* ----- Navbar: cambia de fondo al hacer scroll ----- */
  var navbar = document.getElementById("navbar");
  var onScroll = function () {
    if (window.scrollY > 80) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Menú móvil ----- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // cierra el menú al pulsar un enlace
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ----- Reproductor de tráiler simulado ----- */
  var player = document.getElementById("trailerPlayer");
  if (player) {
    var togglePlay = function () {
      player.classList.toggle("is-playing");
    };
    player.addEventListener("click", togglePlay);
    player.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    });
  }

  /* ----- Reveal al hacer scroll (IntersectionObserver) ----- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach(function (el) { observer.observe(el); });
})();

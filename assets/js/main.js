(function () {
  var drawer = document.getElementById("mobile-drawer");
  var toggles = document.querySelectorAll("[data-menu-toggle]");
  if (!drawer || !toggles.length) return;

  function closeDrawer() {
    drawer.classList.add("hidden");
    drawer.setAttribute("aria-hidden", "true");
    toggles.forEach(function (t) {
      t.setAttribute("aria-expanded", "false");
    });
  }

  function openDrawer() {
    drawer.classList.remove("hidden");
    drawer.setAttribute("aria-hidden", "false");
    toggles.forEach(function (t) {
      t.setAttribute("aria-expanded", "true");
    });
  }

  toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("hidden")) openDrawer();
      else closeDrawer();
    });
  });

  document.querySelectorAll("[data-drawer-close]").forEach(function (el) {
    el.addEventListener("click", closeDrawer);
  });

  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });
})();

(function () {
  var root = document.querySelector("[data-services-carousel]");
  if (!root) return;

  var vp = root.querySelector("[data-services-carousel-viewport]");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  var statusEl = root.querySelector("[data-carousel-status]");
  var slides = root.querySelectorAll("[data-carousel-slide]");
  if (!vp || !slides.length) return;

  function slideStep() {
    var slide = slides[0];
    if (!slide) return 0;
    var cs = window.getComputedStyle(vp);
    var gapRaw = cs.columnGap || cs.gap || "0";
    var gap = parseFloat(gapRaw) || 0;
    return slide.getBoundingClientRect().width + gap;
  }

  function currentIndex() {
    var step = slideStep();
    if (step <= 0) return 0;
    return Math.min(
      slides.length - 1,
      Math.max(0, Math.round(vp.scrollLeft / step))
    );
  }

  function updateStatus() {
    if (statusEl) {
      statusEl.textContent = currentIndex() + 1 + " / " + slides.length;
    }
  }

  function scrollBySlide(delta) {
    var step = slideStep();
    if (step <= 0) return;
    vp.scrollBy({ left: delta * step, behavior: "smooth" });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      scrollBySlide(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      scrollBySlide(1);
    });
  }

  var scrollTid;
  vp.addEventListener("scroll", function () {
    clearTimeout(scrollTid);
    scrollTid = setTimeout(updateStatus, 80);
  });

  vp.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        scrollBySlide(-1);
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        scrollBySlide(1);
      }
    },
    true
  );

  window.addEventListener("resize", updateStatus);
  updateStatus();
})();

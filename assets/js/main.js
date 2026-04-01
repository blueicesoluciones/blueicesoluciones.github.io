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

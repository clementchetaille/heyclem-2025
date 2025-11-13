document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Activer les transitions après chargement
  setTimeout(() => {
    body.classList.add("theme-loaded");
  }, 100);

  // Charger le header dynamiquement
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Initialiser le dark mode APRÈS insertion du header
      initDarkMode();

      // Initialiser le menu hamburger
      initHamburgerMenu();
    })
    .catch((error) => console.error("Erreur chargement header:", error));

  // === SWIPE ANIMATION - Mobile only ===
  if (window.innerWidth <= 480) {
    const path = document.querySelector(".path");
    const handIcon = document.querySelector(".hand-icon");
    if (path && handIcon) {
      path.style.animation = "swipe-dot 2s 0.5s infinite";
      handIcon.style.animation = "swipe-hand 2s infinite";
    }
  }
});

// === FONCTION DARK MODE ===
function initDarkMode() {
  const body = document.body;
  const html = document.documentElement; // ← Ajoutez ceci
  const checkbox = document.querySelector(".switch input");

  if (!checkbox) {
    console.warn("Switch dark mode introuvable");
    return;
  }

  // Synchroniser avec localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  checkbox.checked = isDarkMode;

  // Écouter les changements
  checkbox.addEventListener("change", function () {
    const isDark = this.checked;

    // ✅ Appliquer sur html (documentElement)
    html.classList.toggle("dark", isDark);

    localStorage.setItem("darkMode", isDark);
  });
}

// === FONCTION MENU HAMBURGER ===
function initHamburgerMenu() {
  const body = document.body;
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".nav-bar");
  const navLinks = document.querySelectorAll(".nav-bar a");

  if (!hamburger || !navBar) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navBar.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navBar.classList.remove("active");
      body.classList.remove("menu-open");
    });
  });

  navBar.addEventListener("click", (e) => {
    if (e.target === navBar) {
      hamburger.classList.remove("active");
      navBar.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });
}

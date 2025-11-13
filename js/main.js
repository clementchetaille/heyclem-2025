document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Charger le header dynamiquement
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      alert("✅ Header chargé");

      // === SWITCH DARK MODE ===
      const checkbox = document.querySelector(".switch input");

      if (!checkbox) {
        alert("❌ ERREUR : Checkbox introuvable !");
        return;
      }

      alert("✅ Checkbox trouvé");

      // Appliquer le thème sauvegardé
      if (localStorage.getItem("darkMode") === "true") {
        checkbox.checked = true;
        body.classList.add("dark");
        alert("✅ Dark mode activé au chargement");
      }

      checkbox.addEventListener("change", () => {
        const isDark = checkbox.checked;
        alert("🎯 Clic détecté ! isDark = " + isDark);
        body.classList.toggle("dark", isDark);
        localStorage.setItem("darkMode", isDark);
        alert("Classes body: " + body.className);
      });

      // === MENU HAMBURGER ===
      const hamburger = document.querySelector(".hamburger");
      const navBar = document.querySelector(".nav-bar");
      const navLinks = document.querySelectorAll(".nav-bar a");

      if (hamburger && navBar) {
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
    });

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

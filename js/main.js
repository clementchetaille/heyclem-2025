document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Charger le header dynamiquement
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // === SWITCH DARK MODE ===
      const checkbox = document.querySelector(".switch input");
      if (checkbox) {
        // Appliquer le thème sauvegardé
        if (localStorage.getItem("darkMode") === "true") {
          checkbox.checked = true;
          body.classList.add("dark");
        }

        checkbox.addEventListener("change", () => {
          const isDark = checkbox.checked;
          body.classList.toggle("dark", isDark);
          localStorage.setItem("darkMode", isDark);
        });
      }

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

      // === HEADER QUI DISPARAÎT AU SCROLL ===
      const header = document.querySelector(".header");
      const scrollThreshold = 100;
      if (header) {
        window.addEventListener("scroll", () => {
          const currentScroll = window.pageYOffset;
          if (currentScroll <= 10) {
            header.classList.remove("header--hidden");
          } else if (currentScroll > scrollThreshold) {
            header.classList.add("header--hidden");
          }
        });
      }
    });
});

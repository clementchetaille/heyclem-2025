document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");
  const imageWrappers = document.querySelectorAll(".image-wrapper");

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const projectId = this.getAttribute("data-project");

      // Retirer la classe active de tous les items
      projectItems.forEach((i) => i.classList.remove("active"));
      imageWrappers.forEach((img) => img.classList.remove("active"));

      // Ajouter la classe active à l'item survolé
      this.classList.add("active");

      // Afficher l'image correspondante
      const targetImage = document.querySelector(
        `.image-wrapper[data-project="${projectId}"]`
      );
      if (targetImage) {
        targetImage.classList.add("active");
      }
    });

    // Pour mobile : toggle au clic sur le projet (pas sur le bouton)
    item.addEventListener("click", function (e) {
      // Si on clique sur le bouton, on ne fait rien (le lien fonctionnera normalement)
      if (e.target.classList.contains("project-button")) {
        return;
      }

      // Sur mobile uniquement
      if (window.innerWidth <= 768) {
        e.preventDefault();

        const projectId = this.getAttribute("data-project");
        const isActive = this.classList.contains("active");

        // Fermer tous les projets
        projectItems.forEach((i) => i.classList.remove("active"));
        imageWrappers.forEach((img) => img.classList.remove("active"));

        // Si ce n'était pas actif, l'ouvrir
        if (!isActive) {
          this.classList.add("active");
          const targetImage = document.querySelector(
            `.image-wrapper[data-project="${projectId}"]`
          );
          if (targetImage) {
            targetImage.classList.add("active");
          }
        }
      }
    });
  });
});

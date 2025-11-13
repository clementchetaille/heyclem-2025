// Gestion de l'interaction des projets
document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");
  const imageWrappers = document.querySelectorAll(".image-wrapper");

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const projectId = this.getAttribute("data-project");

      // Retirer la classe active de tous les éléments
      projectItems.forEach((p) => p.classList.remove("active"));
      imageWrappers.forEach((img) => img.classList.remove("active"));

      // Ajouter la classe active aux éléments correspondants
      this.classList.add("active");
      const correspondingImage = document.querySelector(
        `.image-wrapper[data-project="${projectId}"]`
      );
      if (correspondingImage) {
        correspondingImage.classList.add("active");
      }
    });
  });

  // Optionnel : Empêcher le clic de supprimer l'état actif
  projectItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      link.addEventListener("click", function (e) {
        // Le lien fonctionne normalement, pas besoin d'empêcher le comportement par défaut
      });
    }
  });
});

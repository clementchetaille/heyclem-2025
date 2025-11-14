// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  const photos = [
    "assets/images/P1003064.jpg",

    // Ajoute tes URLs ici
  ];

  const shutterBtn = document.getElementById("shutterBtn");
  const flash = document.getElementById("flash");
  const polaroidPhoto = document.getElementById("polaroidPhoto");
  const photoImg = document.getElementById("photoImg");

  if (!shutterBtn) {
    console.error("Bouton non trouvé !");
    return;
  }

  console.log("Appareil photo prêt !"); // Pour vérifier que ça marche

  let canTakePhoto = true;

  shutterBtn.addEventListener("click", () => {
    console.log("Clic détecté !"); // Pour debug

    if (!canTakePhoto) return;

    canTakePhoto = false;

    // Effet flash
    flash.classList.add("active");
    setTimeout(() => flash.classList.remove("active"), 300);

    // Sélectionner une photo aléatoire
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    photoImg.src = randomPhoto;

    // Animer la sortie de la photo
    setTimeout(() => {
      polaroidPhoto.classList.add("show");
    }, 300);

    // Réinitialiser après 3 secondes
    setTimeout(() => {
      polaroidPhoto.classList.remove("show");
      setTimeout(() => {
        canTakePhoto = true;
      }, 800);
    }, 3000);
  });
});

/* ==========================
   🌟 Script principal
========================== */

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  
  /* 🌐 Navbar scroll effect */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0,0,0,0.95)";
      navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    } else {
      navbar.style.background = "rgba(0,0,0,0.8)";
      navbar.style.boxShadow = "none";
    }
  });

  /* 🍔 Menu Burger */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle"); // animation du burger
    });
  }

  /* 🌟 Hero animations (déjà dans CSS mais on peut déclencher JS) */
  const heroH1 = document.querySelector(".hero h1");
  const heroP = document.querySelector(".hero p");
  if (heroH1) heroH1.classList.add("fadeIn");
  if (heroP) heroP.classList.add("slideUp");

  /* 🌟 Formulaire de réservation */
  const reservationForm = document.querySelector(".reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // récupération des valeurs
      const formData = new FormData(reservationForm);
      console.log("Réservation:", Object.fromEntries(formData.entries()));
      
      // afficher message
      const msg = document.querySelector(".confirmation-message");
      if (msg) {
        msg.style.display = "block";
        msg.innerText = "Réservation confirmée ! Merci 😊";
      }

      // reset form
      reservationForm.reset();
    });
  }

  /* 🌟 Contact form */
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      console.log("Contact:", Object.fromEntries(formData.entries()));
      
      const msg = document.querySelector(".confirmation-message");
      if (msg) {
        msg.style.display = "block";
        msg.innerText = "Message envoyé avec succès !";
      }

      contactForm.reset();
    });
  }

  /* 🌟 Galerie (lightbox simple) */
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  if (galleryImages.length) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.8)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.cursor = "pointer";
        overlay.style.zIndex = 1000;

        const imgClone = img.cloneNode();
        imgClone.style.maxWidth = "90%";
        imgClone.style.maxHeight = "80%";
        imgClone.style.borderRadius = "12px";
        overlay.appendChild(imgClone);

        overlay.addEventListener("click", () => overlay.remove());

        document.body.appendChild(overlay);
      });
    });
  }

});

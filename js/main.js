/* ==========================
   🌟 main.js (mis à jour)
   ========================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Référence éléments ---------- */
  const navbar = document.querySelector(".navbar");
  const pageContent = document.querySelector("main.page-content"); // doit exister dans tes pages
  const navCollapse = document.getElementById("mainNav"); // si tu utilises Bootstrap collapse (id="mainNav")
  
  /* ---------- Fonction : met à jour le padding-top sécurisé ---------- */
  function updateSafeTop() {
    if (!navbar || !pageContent) return;
    const navHeight = navbar.offsetHeight;            // hauteur réelle de la navbar
    const extra = 12;                                 // espace supplémentaire en px (ajuste si tu veux)
    const total = navHeight + extra;
    // met à jour la variable CSS globale
    document.documentElement.style.setProperty("--nav-safe-top", `${total}px`);
    // fallback : écriture inline sur main (utile si un CSS plus spécifique écrase la variable)
    pageContent.style.paddingTop = `calc(var(--nav-safe-top, ${total}px))`;
  }

  // premier calcul
  updateSafeTop();

  // recalculer au resize (tablettes / rotation)
  window.addEventListener("resize", () => {
    updateSafeTop();
  });

  // si on utilise Bootstrap collapse pour le menu mobile, recalculer quand il s'ouvre/ferme
  if (navCollapse) {
    navCollapse.addEventListener("shown.bs.collapse", updateSafeTop);
    navCollapse.addEventListener("hidden.bs.collapse", updateSafeTop);
  }

  /* ---------- Navbar scroll effect ---------- */
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0,0,0,0.95)";
      navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    } else {
      navbar.style.background = "rgba(0,0,0,0.8)";
      navbar.style.boxShadow = "none";
    }
  });

  /* ---------- Burger custom (gardé uniquement si tu n'utilises PAS Bootstrap sur cette page) ---------- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
      // après ouverture/fermeture, recalcule la safe top (si menu pousse le contenu)
      setTimeout(updateSafeTop, 220);
    });
  }

  /* ---------- Hero animations (si tu veux déclencher via JS aussi) ---------- */
  const heroH1 = document.querySelector(".hero h1");
  const heroP = document.querySelector(".hero p");
  if (heroH1) heroH1.classList.add("fadeIn");
  if (heroP) heroP.classList.add("slideUp");

  /* ---------- Formulaire de réservation (ex. mailto) ---------- */
  const reservationForm = document.querySelector(".reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(reservationForm);
      // ... ton traitement (ou l'envoi mailto existant) ...
      const msg = document.querySelector(".confirmation-message");
      if (msg) {
        msg.style.display = "block";
        msg.innerText = "Réservation confirmée ! Merci 😊";
      }
      reservationForm.reset();
    });
  }

  /* ---------- Contact form (WhatsApp) ---------- */
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value?.trim() || "";
      const email = document.getElementById("email")?.value?.trim() || "";
      const message = document.getElementById("message")?.value?.trim() || "";

      if (name && email && message) {
        const whatsappMessage = `Bonjour ILEA Café, je suis ${name} (${email}) et voici mon message : ${message}`;
        const whatsappLink = `https://wa.me/221778272306?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappLink, "_blank");
        const confirmation = document.getElementById("contactConfirmation");
        if (confirmation) {
          confirmation.style.display = "block";
          confirmation.style.color = "green";
          confirmation.textContent = "Votre message est prêt dans WhatsApp !";
        }
        contactForm.reset();
      } else {
        const confirmation = document.getElementById("contactConfirmation");
        if (confirmation) {
          confirmation.style.display = "block";
          confirmation.style.color = "red";
          confirmation.textContent = "Veuillez remplir tous les champs.";
        }
      }
    });
  }

  /* ---------- Galerie (lightbox simple) ---------- */
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
        overlay.style.zIndex = 10000;

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

}); // DOMContentLoaded

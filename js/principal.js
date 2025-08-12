// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
  // Elementos del DOM:
  // - Botón del menú móvil
  // - Contenedor de los enlaces de navegación
  // - Overlay del menú (fondo oscuro)
  // - Todos los enlaces de navegación
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector(".nav-links");
  const menuOverlay = document.querySelector(".menu-overlay");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  // Variable de estado para rastrear si el menú está abierto o cerrado
  let isMenuOpen = false;

  // Función para abrir el menú móvil
  function openMobileMenu() {
    // Añade clases 'active' para mostrar el menú y el overlay
    navMenu.classList.add("active");
    menuOverlay.classList.add("active");
    // Previene el scroll del body cuando el menú está abierto
    document.body.classList.add("no-scroll");
    // Cambia el icono de hamburguesa a 'X'
    mobileMenuBtn.querySelector("i").classList.replace("fa-bars", "fa-times");
    // Actualiza el estado del menú
    isMenuOpen = true;
    
    // Agrega un event listener para cerrar el menú al hacer scroll
    window.addEventListener('scroll', closeOnScroll, { passive: true });
  }

  // Función para cerrar el menú móvil
  function closeMobileMenu() {
    // Remueve las clases 'active' para ocultar el menú y el overlay
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    // Permite nuevamente el scroll del body
    document.body.classList.remove("no-scroll");
    // Cambia el icono 'X' de vuelta a hamburguesa
    mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
    // Actualiza el estado del menú
    isMenuOpen = false;
    
    // Remueve el event listener de scroll
    window.removeEventListener('scroll', closeOnScroll);
  }

  // Función para alternar (abrir/cerrar) el menú móvil
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Función que se ejecuta al hacer scroll, cierra el menú si está abierto
  function closeOnScroll() {
    if (isMenuOpen) {
      closeMobileMenu();
    }
  }

  // Función para cerrar el menú al hacer clic en un enlace
  function closeOnLinkClick() {
    closeMobileMenu();
    
    // Scroll suave al enlace clickeado (si es un ancla)
    const targetId = this.getAttribute("href");
    if (targetId.startsWith("#")) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Hace scroll a la sección con un offset de 80px (por el header fijo)
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth"
        });
      }
    }
  }

  // ========== EVENT LISTENERS ==========

  // Abre/cierra el menú al hacer clic en el botón móvil
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  
  // Cierra el menú al hacer clic en el overlay
  menuOverlay.addEventListener("click", closeMobileMenu);
  
  // Cierra el menú y hace scroll suave al hacer clic en enlaces
  navLinks.forEach(link => {
    link.addEventListener("click", closeOnLinkClick);
  });

  // Cierra el menú si la pantalla se hace más grande de 768px
  window.addEventListener("resize", function() {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMobileMenu();
    }
  });
});
// Espera a que todo el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el carrusel de imágenes
  initCarousel();

  // Animar los pasos del proceso cuando aparecen en pantalla
  animateProcessSteps();

  // Aplicar efectos al pasar el mouse sobre las secciones destacadas
  initSectionHoverEffects();

  // Animar elementos al hacer scroll
  initScrollAnimations();
});

// Función para inicializar el carrusel
function initCarousel() {
  const carousel = document.querySelector(".carousel"); // Contenedor principal del carrusel
  const inner = carousel.querySelector(".carousel-inner"); // Contenedor interno con los elementos del carrusel
  const items = carousel.querySelectorAll(".carousel-item"); // Todos los slides del carrusel
  const prevBtn = carousel.querySelector(".prev"); // Botón para ir al slide anterior
  const nextBtn = carousel.querySelector(".next"); // Botón para ir al siguiente slide
  const indicators = carousel.querySelectorAll(".indicator"); // Indicadores de navegación (puntos)

  let currentIndex = 0; // Índice del slide actual
  let intervalId = null; // ID del intervalo automático
  const intervalDuration = 5000; // Duración de 5 segundos entre slides

  // Muestra el slide correspondiente al índice dado
  function showSlide(index) {
    // Oculta todos los slides
    items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-hidden", "true");
    });

    // Desactiva todos los indicadores
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Muestra el slide actual
    items[index].classList.add("active");
    items[index].setAttribute("aria-hidden", "false");

    // Activa el indicador correspondiente
    indicators[index].classList.add("active");

    // Actualiza el índice actual
    currentIndex = index;

    // Reinicia el temporizador
    resetInterval();
  }

  // Avanza al siguiente slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }

  // Retrocede al slide anterior
  function prevSlide() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }

  // Inicia el cambio automático de slides
  function startInterval() {
    intervalId = setInterval(nextSlide, intervalDuration);
  }

  // Reinicia el intervalo automático
  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  // Evento para botón "siguiente"
  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  // Evento para botón "anterior"
  prevBtn.addEventListener("click", () => {
    prevSlide();
  });

  // Evento para los indicadores (puntos)
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Navegación por teclado con flechas izquierda y derecha
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Pausa el carrusel cuando el cursor está sobre él
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  // Reanuda el carrusel cuando el cursor se retira
  carousel.addEventListener("mouseleave", () => {
    startInterval();
  });

  // Mostrar primer slide y empezar carrusel
  showSlide(0);
  startInterval();
}

// Función para animar los pasos del proceso
function animateProcessSteps() {
  const steps = document.querySelectorAll(".process-steps li"); // Selecciona todos los pasos del proceso

  steps.forEach((step, index) => {
    // Inicializa opacidad y posición de cada paso
    step.style.opacity = "0";
    step.style.transform = "translateX(-20px)";
    step.style.transition = `opacity 0.5s ease ${
      index * 0.2
    }s, transform 0.5s ease ${index * 0.2}s`;

    // Observa si el paso entra en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.1 }
    ); // Se activa cuando al menos el 10% es visible

    observer.observe(step); // Empieza a observar el paso
  });
}

// Función para aplicar efectos al pasar el mouse sobre las secciones
function initSectionHoverEffects() {
  const sections = document.querySelectorAll(".feature-section"); // Selecciona todas las secciones destacadas

  sections.forEach((section) => {
    // Al poner el mouse, se activa la transición
    section.addEventListener("mouseenter", () => {
      section.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    // Al quitar el mouse, se mantiene la misma transición
    section.addEventListener("mouseleave", () => {
      section.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });
}

// Función para animar elementos al hacer scroll
function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    ".feature-highlight, .benefits-list li"
  ); // Selecciona los elementos a animar

  // Observador que detecta cuando los elementos son visibles
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  ); // Umbral del 10%

  // Inicializa estilos y comienza a observar
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });
}

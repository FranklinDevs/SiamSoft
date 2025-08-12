// Esperar a que el DOM esté completamente cargado antes de ejecutar las funciones
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el carrusel de imágenes
  initCarousel();

  // Inicializar efectos de hover para las tarjetas de la línea de tiempo
  initTimelineHoverEffects();

  // Inicializar efectos de hover para los elementos de la lista de beneficios
  initBenefitsHoverEffects();

  // Iniciar la animación de la línea de tiempo
  animateTimeline();
});

// Función que inicializa el carrusel
function initCarousel() {
  // Obtener los elementos principales del carrusel
  const carousel = document.querySelector(".carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const indicators = carousel.querySelectorAll(".indicator");

  let currentIndex = 0; // Índice del slide actual
  let intervalId = null; // ID del temporizador automático
  const intervalDuration = 5000; // Duración entre slides (5 segundos)

  // Mostrar el slide correspondiente al índice recibido
  function showSlide(index) {
    // Ocultar todos los slides
    items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-hidden", "true");
    });

    // Desactivar todos los indicadores
    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Mostrar el slide actual
    items[index].classList.add("active");
    items[index].setAttribute("aria-hidden", "false");

    // Activar el indicador correspondiente
    indicators[index].classList.add("active");

    // Actualizar el índice actual
    currentIndex = index;

    // Reiniciar el temporizador automático
    resetInterval();
  }

  // Pasar al siguiente slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }

  // Retroceder al slide anterior
  function prevSlide() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }

  // Iniciar el cambio automático de slides
  function startInterval() {
    intervalId = setInterval(nextSlide, intervalDuration);
  }

  // Reiniciar el intervalo automático (detener e iniciar de nuevo)
  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  // Eventos para los botones "siguiente" y "anterior"
  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
  });

  // Eventos para los indicadores (puntos de navegación)
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Navegación por teclado (flechas izquierda/derecha)
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Pausar el carrusel cuando el mouse está sobre él
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  // Reanudar el carrusel cuando el mouse sale del área
  carousel.addEventListener("mouseleave", () => {
    startInterval();
  });

  // Mostrar el primer slide y comenzar el carrusel
  showSlide(0);
  startInterval();
}

// Función para animar el efecto hover en los elementos de la línea de tiempo
function initTimelineHoverEffects() {
  const timelineItems = document.querySelectorAll(".timeline-content");

  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });
}

// Función para animar el efecto hover en los ítems de beneficios
function initBenefitsHoverEffects() {
  const benefitsItems = document.querySelectorAll(".benefits-list li");

  benefitsItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(5px)"; // Mover ligeramente a la derecha
      item.style.transition = "transform 0.2s ease";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0)"; // Regresar a su posición original
    });
  });
}

// Función para animar la aparición de los elementos de la línea de tiempo
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Usar IntersectionObserver para detectar si los elementos son visibles en pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1, // Se activa cuando al menos el 10% del elemento es visible
    }
  );

  // Aplicar estilo inicial y observar cada ítem
  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `opacity 0.5s ease ${
      index * 0.1
    }s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
  });
}

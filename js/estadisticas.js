// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar los gráficos al cargar la página
  initCharts();

  // Inicializar el carrusel
  initCarousel();

  // Inicializar los efectos de hover para las tarjetas
  initCardHoverEffects();

  // Inicializar el comportamiento de los botones de reporte
  initReportButtons();
});

// Función para inicializar los gráficos con Chart.js
function initCharts() {
  // Gráfico de barras: Tiempos de procesamiento por área
  const ctx1 = document.getElementById("processingTimeChart").getContext("2d");
  new Chart(ctx1, {
    type: "bar", // Tipo de gráfico
    data: {
      // Etiquetas de las áreas
      labels: [
        "Área Administrativa",
        "Área Financiera",
        "Área Legal",
        "Recursos Humanos",
        "Servicios Generales",
      ],
      datasets: [
        {
          label: "Tiempo promedio (horas)",
          // Datos de cada área
          data: [3.2, 5.7, 8.1, 4.5, 2.9],
          // Colores de fondo para las barras
          backgroundColor: [
            "rgba(0, 179, 110, 0.7)",
            "rgba(0, 61, 130, 0.7)",
            "rgba(255, 107, 0, 0.7)",
            "rgba(51, 51, 51, 0.7)",
            "rgba(108, 117, 125, 0.7)",
          ],
          // Colores del borde de las barras
          borderColor: [
            "rgba(0, 179, 110, 1)",
            "rgba(0, 61, 130, 1)",
            "rgba(255, 107, 0, 1)",
            "rgba(51, 51, 51, 1)",
            "rgba(108, 117, 125, 1)",
          ],
          borderWidth: 1, // Grosor del borde
        },
      ],
    },
    options: {
      responsive: true, // Adaptable al tamaño del contenedor
      maintainAspectRatio: false, // No mantener el aspecto original
      scales: {
        y: {
          beginAtZero: true, // El eje Y empieza en 0
          title: {
            display: true,
            text: "Horas", // Título del eje Y
          },
        },
      },
      plugins: {
        legend: {
          position: "top", // Posición de la leyenda
        },
        tooltip: {
          callbacks: {
            // Personalizar el tooltip para mostrar "x horas"
            label: function (context) {
              return context.parsed.y.toFixed(1) + " horas";
            },
          },
        },
      },
    },
  });

  // Gráfico de líneas: Evolución mensual de documentos procesados
  const ctx2 = document.getElementById("monthlyTrendChart").getContext("2d");
  new Chart(ctx2, {
    type: "line", // Tipo de gráfico
    data: {
      // Etiquetas de los meses
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      datasets: [
        {
          label: "Documentos procesados",
          // Valores por mes
          data: [
            1250, 1900, 1700, 2100, 2400, 2300, 2600, 2450, 2800, 3000, 3200,
            3500,
          ],
          fill: false, // No rellenar el área bajo la línea
          backgroundColor: "rgba(0, 179, 110, 0.2)",
          borderColor: "rgba(0, 179, 110, 1)", // Color de línea
          borderWidth: 3, // Grosor de línea
          tension: 0.4, // Suavizado de curva
          pointBackgroundColor: "rgba(0, 61, 130, 1)", // Color de los puntos
          pointRadius: 5, // Tamaño del punto
          pointHoverRadius: 7, // Tamaño del punto al pasar el mouse
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false, // No necesariamente empezar desde cero
          title: {
            display: true,
            text: "Documentos", // Título del eje Y
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            // Tooltip muestra número con separador de miles
            label: function (context) {
              return context.parsed.y.toLocaleString() + " documentos";
            },
          },
        },
      },
    },
  });
}

// Función para inicializar el carrusel
function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const indicators = carousel.querySelectorAll(".indicator");

  let currentIndex = 0;
  let intervalId = null;
  const intervalDuration = 5000; // Intervalo de 5 segundos

  // Mostrar el slide correspondiente al índice dado
  function showSlide(index) {
    items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-hidden", "true");
    });

    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    items[index].classList.add("active");
    items[index].setAttribute("aria-hidden", "false");

    indicators[index].classList.add("active");

    currentIndex = index;
    resetInterval();
  }

  // Avanzar al siguiente slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }

  // Retroceder al slide anterior
  function prevSlide() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }

  // Iniciar el intervalo automático
  function startInterval() {
    intervalId = setInterval(nextSlide, intervalDuration);
  }

  // Reiniciar el intervalo (detener y volver a iniciar)
  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  // Botón "siguiente"
  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  // Botón "anterior"
  prevBtn.addEventListener("click", () => {
    prevSlide();
  });

  // Indicadores: ir a slide específico
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Soporte para navegación con teclado
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  // Pausar cuando el mouse entra en el carrusel
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  // Reanudar cuando el mouse sale
  carousel.addEventListener("mouseleave", () => {
    startInterval();
  });

  // Iniciar mostrando el primer slide
  showSlide(0);
  startInterval();
}

// Función para aplicar efectos de hover a las tarjetas
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".metric-card, .report-card");

  cards.forEach((card) => {
    // Al entrar el mouse, aplicar transición
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    // Al salir el mouse, mantener la misma transición
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });
}

// Función para manejar clics en los botones de reporte
function initReportButtons() {
  const reportButtons = document.querySelectorAll(".report-button");

  reportButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Mostrar icono de carga y deshabilitar el botón
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
      button.disabled = true;

      // Simular espera de 1.5 segundos
      setTimeout(() => {
        // Cambiar el texto por "Reporte listo"
        button.innerHTML = '<i class="fas fa-check"></i> Reporte listo';

        // Después de 2 segundos, restaurar el botón
        setTimeout(() => {
          button.innerHTML = "Generar Reporte";
          button.disabled = false;
        }, 2000);
      }, 1500);
    });
  });
}

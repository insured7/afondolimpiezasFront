<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>A Fondo Limpiezas</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Bootstrap CSS desde CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <!-- Icono -->
  <link rel="icon" type="image/png" href="static/img/AFondoLogo.png" />
  <style>
    /* Puedes añadir estilos CSS aquí si quieres */
  </style>
</head>
<body class="landing-page bg-light text-dark d-flex flex-column min-vh-100">

<%@ include file="cabecera.jsp" %>

  <!-- Hero Section -->
  <section class="text-center py-5" style="background: url('static/img/ImagenFondo.jpg') center/cover no-repeat;">
    <div class="bg-success bg-opacity-75 p-4 rounded text-white d-inline-block">
      <h2 class="mb-0">Tu mejor elección en limpieza</h2>
    </div>
  </section>

  <!-- Botón presupuesto -->
  <section class="text-center my-4">
    <a href="form-presupuesto.jsp" class="btn btn-secondary btn-warning btn-lg rounded-pill fw-bold shadow">
      Consulta tu presupuesto
    </a>
  </section>

  <!-- Paneles de información -->
  <section class="container my-5" style="background-image: url('static/img/ImagenFondo2.jpg');">
    <div class="row g-4 justify-content-center">
      <div class="col-md-5">
        <div class="p-4 bg-white shadow-sm rounded">
          <h5 class="fw-bold">Servicios de Limpieza Profesional</h5>
          <p class="fs-5">
            Ofrecemos soluciones integrales para la limpieza de oficinas, comunidades, locales comerciales y viviendas particulares.
            Nuestro equipo está altamente capacitado para garantizar un entorno limpio, seguro y saludable adaptado a tus necesidades.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="p-4 bg-white shadow-sm rounded">
          <h5 class="fw-bold">Compromiso con la Calidad</h5>
          <p class="fs-5">
            Trabajamos con productos ecológicos y maquinaria de última generación para cuidar del medio ambiente y ofrecer resultados impecables.
            Nuestro compromiso es tu satisfacción: puntualidad, eficiencia y transparencia en cada servicio.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-dark text-white text-center py-4 mt-auto">
    <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
  </footer>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

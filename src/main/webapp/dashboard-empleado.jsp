<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard Empleado - A Fondo Limpiezas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="d-flex flex-column min-vh-100">

  <%@ include file="cabecera.jsp" %>

  <div class="container my-5">
    <h2 class="mb-4 text-center">Bienvenido, <span id="nombreEmpleado">Empleado</span></h2>
    <div class="card shadow">
      <div class="card-body">
        <p><strong>Correo:</strong> <span id="correoEmpleado"></span></p>
        <p><strong>Direccion:</strong> <span id="direccionEmpleado"></span></p>
        <p><strong>Teléfono:</strong> <span id="telefonoEmpleado"></span></p>
        <p><strong>Soporte:</strong> Contacta soporte en <a href="mailto:soporte@afondolimpiezas.com">soporte@afondolimpiezas.com</a></p>
      </div>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-4 mt-auto">
    <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
  </footer>

  <script src="js/dashboard-empleado.js"></script>
</body>
</html>

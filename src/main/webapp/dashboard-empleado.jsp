<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Empleado - A Fondo Limpiezas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="d-flex flex-column min-vh-100">

  <%@ include file="cabecera.jsp" %>

  <div class="container my-5">
    <h2 class="mb-4 text-center">Panel de Empleado</h2>
    <div class="card shadow">
      <div class="card-body">
        <p><strong>Próximos trabajos asignados:</strong></p>
        <ul>
          <li>1 de junio - Cliente: Juan Pérez - Limpieza oficina</li>
          <li>3 de junio - Cliente: María López - Limpieza hogar</li>
        </ul>
        <p><strong>Horario semanal:</strong> Lunes a Viernes, 9:00 - 17:00</p>
        <p><strong>Coordinador:</strong> Laura Sánchez (laura@afondolimpiezas.com)</p>
      </div>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-4 mt-auto">
    <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
  </footer>

</body>
</html>

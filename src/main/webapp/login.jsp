<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Login - A Fondo Limpiezas</title>
  <!-- Incluye Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="d-flex flex-column min-vh-100">

  <%@ include file="cabecera.jsp" %>

  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center"
       style="background: url('static/img/ImagenFondo2.jpg'); background-size: cover; background-position: center;">
    <div class="row w-100">
      <div class="col-md-4 mx-auto p-4 bg-light rounded shadow-lg">
        <h2 class="text-center mb-4">Iniciar sesión</h2>
        <form id="loginForm">
          <div class="form-group mb-3">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" class="form-control" required />
          </div>

          <div class="form-group mb-3">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" class="form-control" required />
          </div>

          <div class="form-group mb-3">
            <label for="userType">Tipo de Usuario</label>
            <select id="userType" name="userType" class="form-control" required>
              <option value="user">Usuario</option>
              <option value="employee">Empleado</option>
            </select>
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-success">Ingresar</button>
          </div>
        </form>
        <div id="errorMessage" class="text-danger mt-3"></div>
      </div>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-4 mt-auto">
    <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
  </footer>

  <script src="auth.js"></script>

</body>
</html>

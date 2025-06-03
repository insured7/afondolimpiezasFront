<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Usuario - A Fondo Limpiezas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="d-flex flex-column min-vh-100">

  <%@ include file="cabecera.jsp" %>

  <div class="container my-5 text-center">

    <h2 class="mb-4">Bienvenido, <span id="nombreUsuario">Usuario</span></h2>

    <!-- Foto de perfil -->
    <img id="fotoPerfil" src="static/img/AFondoLogo.png" alt="Foto de perfil" 
         class="rounded-circle mb-3" style="width:150px; height:150px; object-fit:cover;"/>

    <!-- Formulario para subir foto -->
    <form id="formFotoPerfil" class="mb-4" enctype="multipart/form-data">
      <input type="file" id="inputFoto" name="file" accept="image/*" required />
      <button type="submit" class="btn btn-primary">Subir Foto</button>
    </form>

    <div class="card shadow">
      <div class="card-body text-start">
        <p><strong>Correo:</strong> <span id="correoUsuario"></span></p>
        <p><strong>Solicitudes contratadas:</strong></p>
        <ul id="listaServicios">
          <!-- Solicitudes se cargarán desde JS -->
        </ul>
        <p><strong>Soporte:</strong> Puedes contactar a soporte a través del correo 
          <a href="mailto:soporte@afondolimpiezas.com">soporte@afondolimpiezas.com</a>
        </p>
      </div>
    </div>
  </div>

  <footer class="bg-dark text-white text-center py-4 mt-auto">
    <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
  </footer>

  <script src="js/dashboard-usuario.js"></script>

</body>
</html>

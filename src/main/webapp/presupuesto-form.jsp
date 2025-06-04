<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Solicitar Presupuesto - A Fondo Limpiezas</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <!-- Bootstrap JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<%@ include file="cabecera.jsp" %>

  <!-- Formulario presupuesto -->
  <div class="container-fluid py-5 d-flex align-items-center justify-content-center"
       style="background: url('static/img/ImagenFondo2.jpg'); min-height: 100vh; background-size: cover; background-position: center">
    <div class="row w-100 justify-content-center">
      <div class="col-lg-5 col-md-8 mx-auto p-4 bg-light rounded shadow-lg">
        <section id="presupuesto">
          <h2 class="text-center mb-4">Solicitar Presupuesto</h2>
          <form id="presupuestoForm">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre o Empresa</label>
                  <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu nombre o empresa" required/>
               
                  
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="direccion" class="form-label">Dirección</label>
                  <input type="text" class="form-control" id="direccion" placeholder="Ingresa la dirección" required/>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="detalles" class="form-label">Detalles del Servicio</label>
              <textarea class="form-control" id="detalles" rows="4" placeholder="Detalla el servicio que necesitas" required></textarea>
            </div>
            
            <input type="hidden" id="usuarioId" value="<%= session.getAttribute("usuarioId") %>">
            

            <div class="text-center">
              <button type="submit" class="btn btn-primary btn-lg">
                Solicitar Presupuesto
              </button>
            </div>
          </form>
          <!-- Mensajes de respuesta -->
          <div id="responseMessage" class="mt-3"></div>
        </section>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-dark text-white text-center py-4">
    <small>&copy; 2025 A Fondo Limpiezas | contacto@afondolimpiezas.com | +34 600 123 456</small>
  </footer>

  <script src="js/presupuesto.js"></script>
</body>
</html>

<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page import="java.net.URLDecoder" %>
<%
    String token = request.getParameter("token");
    if (token != null) {
        token = URLDecoder.decode(token, "UTF-8");
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Activar Cuenta - A Fondo Limpiezas</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
    <style>
        html, body { height: 100%; }
        .landing-page { min-height: 100vh; display: flex; flex-direction: column; }
        .activation-container {
            flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem;
        }
    </style>
</head>
<body data-token="<%= token != null ? token : "" %>">

<div class="landing-page bg-light text-dark">
    <main class="activation-container">
        <div class="card shadow" style="width: 100%; max-width: 500px;">
            <div class="card-body p-4">
                <h1 class="h4 mb-4 text-center">Activación de cuenta</h1>

                <!-- Contenedor para mensajes -->
                <div id="mensaje" class="alert d-none mb-4"></div>

                <!-- Spinner cargando -->
                <div id="loading" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-2">Procesando activación...</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-dark text-white text-center py-4 mt-auto">
        <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
    </footer>
</div>

<script src="js/activarcuenta.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>

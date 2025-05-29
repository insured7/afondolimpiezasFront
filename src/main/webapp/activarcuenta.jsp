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
    <meta charset="UTF-8">
    <title>Activar Cuenta - A Fondo Limpiezas</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        html, body {
            height: 100%;
        }
        .landing-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
    </style>
</head>
<body data-token="<%= token != null ? token : "" %>">

<div class="landing-page bg-light text-dark">

    <%-- <%@ include file="cabecera.jsp" %> --%>

    <footer class="bg-dark text-white text-center py-4 mt-auto">
        <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
    </footer>

</div>

<script src="js/activarcuenta.js"></script>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

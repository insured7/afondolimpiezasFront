<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Solicitud - Dashboard Admin</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="mb-4 text-center">Editar Solicitud de Presupuesto</h2>

    <!-- Alerta dinámica -->
    <div id="alert-placeholder"></div>

    <form id="formEditarSolicitud" style="max-width: 600px; margin: 0 auto;">
        <input type="hidden" id="idSolicitud">

        <div class="mb-3">
            <label for="estado" class="form-label">Estado</label>
            <select class="form-select" id="estado" required>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="detalles" class="form-label">Descripción / Detalles</label>
            <textarea class="form-control" id="detalles" rows="4" required></textarea>
        </div>

        <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <input type="text" class="form-control" id="direccion" required>
        </div>

        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <a href="dashboard-admin.jsp" class="btn btn-secondary ms-2">Volver al Dashboard</a>
    </form>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- JS específico para editar solicitud -->
<script src="js/editar-solicitud.js"></script>

</body>
</html>

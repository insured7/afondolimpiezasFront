<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Admin - Solicitudes</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="mb-4 text-center">Solicitudes de Presupuesto</h2>

    <!-- Alerta dinámica -->
    <div id="alert-placeholder"></div>

    <!-- Mensaje si no hay solicitudes -->
    <div id="noSolicitudesMsg" class="alert alert-info text-center" style="display: none;">
        No hay solicitudes disponibles.
    </div>

    <!-- Tabla de solicitudes -->
    <div class="table-responsive">
        <table id="tablaSolicitudes" class="table table-striped table-bordered" style="display: none;">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
               
            </tbody>
        </table>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Lógica del dashboard admin -->
<script src="js/dashboard-admin.js"></script>

</body>
</html>
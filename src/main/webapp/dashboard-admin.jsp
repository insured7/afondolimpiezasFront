<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Dashboard Admin - Solicitudes</title>
<!-- Bootstrap CSS -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet" />
</head>
<body class="bg-light">

	<%@ include file="cabecera.jsp"%>

	<div class="container mt-5">
		<h2 class="mb-4 text-center">Solicitudes de Presupuesto</h2>

		<!-- Alerta dinámica -->
		<div id="alert-placeholder"></div>

		<!-- Mensaje si no hay solicitudes -->
		<div id="noSolicitudesMsg" class="alert alert-info text-center"
			style="display: none;">No hay solicitudes disponibles.</div>

		<!-- Tabla de solicitudes -->
		<div class="table-responsive">
			<table id="tablaSolicitudes"
				class="table table-striped table-bordered" style="display: none;">
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
				<tbody></tbody>
			</table>
		</div>

		<!-- Formulario para asignar empleado -->
		<div class="mt-5">
			<h4>Asignar Empleado a Solicitud</h4>
			<form id="formAsignarEmpleado" class="row g-3">
				<div class="col-md-3">
					<label for="solicitudId" class="form-label">ID Solicitud</label> <input
						type="number" class="form-control" id="solicitudId" required />
				</div>
				<div class="col-md-3">
					<label for="empleadoId" class="form-label">ID Empleado</label> <input
						type="number" class="form-control" id="empleadoId" required />
				</div>
				<div class="col-md-3">
					<label for="rol" class="form-label">Rol</label> <input type="text"
						class="form-control" id="rol" placeholder="Ej: Técnico" required />
				</div>
				<div class="col-md-3 align-self-end">
					<button type="submit" class="btn btn-primary"
						id="btn-asignarempleado">Asignar Empleado</button>
				</div>
			</form>

		</div>
	</div>

	<!-- Bootstrap JS -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

	<script src="js/dashboard-admin.js"></script>

</body>
</html>

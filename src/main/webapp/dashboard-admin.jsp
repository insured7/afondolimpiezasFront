<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Admin</title>
    <meta charset="UTF-8" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="d-flex flex-column min-vh-100">

<%@ include file="cabecera.jsp" %>

<div class="container flex-grow-1 my-4">
    <h1 class="mb-4">Panel de Administración</h1>

    <div class="card mb-4">
        <div class="card-header">
            <h3>Información personal</h3>
        </div>
        <div class="card-body">
            <p><strong>Nombre:</strong> ${admin.nombre} ${admin.apellidos}</p>
            <p><strong>Correo:</strong> ${admin.correo}</p>
            <p><strong>Teléfono:</strong> ${admin.telefono}</p>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            <h3>Panel de control de solicitudes</h3>
        </div>
        <div class="card-body">
            <c:if test="${not empty solicitudes}">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="sol" items="${solicitudes}">
                            <tr>
                                <td>${sol.id}</td>
                                <td>${sol.usuario.nombre} ${sol.usuario.apellidos}</td>
                                <td><fmt:formatDate value="${sol.fecha}" pattern="dd/MM/yyyy" /></td>
                                <td>${sol.estado}</td>
                                <td>${sol.descripcion}</td>
                                <td>
                                    <!-- Aquí botones o enlaces para gestionar la solicitud -->
                                    <a href="admin/solicitud/ver?id=${sol.id}" class="btn btn-sm btn-primary">Ver</a>
                                    <a href="admin/solicitud/editar?id=${sol.id}" class="btn btn-sm btn-warning">Editar</a>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </c:if>
            <c:if test="${empty solicitudes}">
                <p>No hay solicitudes para mostrar.</p>
            </c:if>
        </div>
    </div>
</div>

<footer class="bg-dark text-white text-center py-4 mt-auto">
    <small>&copy; 2025 A Fondo Limpiezas | contacto&#64;afondolimpiezas.com | +34 600 123 456</small>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

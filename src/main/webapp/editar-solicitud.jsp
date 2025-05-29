<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Solicitud - Admin Dashboard</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-dark text-white">
                    <h4 class="mb-0">
                        <i class="fas fa-edit me-2"></i>
                        Editar Solicitud de Presupuesto
                    </h4>
                </div>
                <div class="card-body">
                    <!-- Alerta dinámica -->
                    <div id="alert-placeholder"></div>

                    <!-- Loading indicator -->
                    <div id="loading" class="text-center" style="display: none;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="mt-2">Cargando datos de la solicitud...</p>
                    </div>

                    <!-- Formulario de edición -->
                    <form id="editarSolicitudForm" style="display: none;">
                        <input type="hidden" id="solicitudId">
                        
                        <!-- Información del cliente (solo lectura) -->
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label"><strong>Cliente:</strong></label>
                                <p id="clienteInfo" class="form-control-plaintext bg-light p-2 rounded"></p>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><strong>Fecha de Solicitud:</strong></label>
                                <p id="fechaInfo" class="form-control-plaintext bg-light p-2 rounded"></p>
                            </div>
                        </div>

                        <!-- Estado de la solicitud -->
                        <div class="mb-3">
                            <label for="estado" class="form-label"><strong>Estado:</strong></label>
                            <select class="form-select" id="estado" required>
                                <option value="">Seleccionar estado...</option>
                                <option value="PENDIENTE">Pendiente</option>
                                <option value="EN_PROCESO">En Proceso</option>
                                <option value="COMPLETADA">Completada</option>
                                <option value="CANCELADA">Cancelada</option>
                                <option value="RECHAZADA">Rechazada</option>
                            </select>
                        </div>

                        <!-- Descripción -->
                        <div class="mb-3">
                            <label for="descripcion" class="form-label"><strong>Descripción:</strong></label>
                            <textarea class="form-control" id="descripcion" rows="4" readonly></textarea>
                            <small class="form-text text-muted">La descripción no se puede modificar</small>
                        </div>

                        <!-- Dirección -->
                        <div class="mb-3">
                            <label for="direccion" class="form-label"><strong>Dirección del Servicio:</strong></label>
                            <textarea class="form-control" id="direccion" rows="3" 
                                      placeholder="Ingrese la dirección donde se realizará el servicio..."></textarea>
                        </div>

                        <!-- Detalles adicionales -->
                        <div class="mb-3">
                            <label for="detalles" class="form-label"><strong>Detalles Adicionales:</strong></label>
                            <textarea class="form-control" id="detalles" rows="4" 
                                      placeholder="Agregue detalles adicionales, presupuesto, observaciones, etc..."></textarea>
                        </div>

                        <!-- Botones de acción -->
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary" onclick="volver()">
                                <i class="fas fa-arrow-left me-1"></i>
                                Volver al Dashboard
                            </button>
                            <div>
                                <button type="button" class="btn btn-danger me-2" onclick="eliminarSolicitud()">
                                    <i class="fas fa-trash me-1"></i>
                                    Eliminar
                                </button>
                                <button type="submit" class="btn btn-success">
                                    <i class="fas fa-save me-1"></i>
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<!-- Font Awesome para iconos -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>

<script>
let solicitudId = null;

document.addEventListener('DOMContentLoaded', () => {
    verificarAcceso();
    
    // Obtener ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    solicitudId = urlParams.get('id');
    
    if (!solicitudId) {
        mostrarAlerta('No se especificó ID de solicitud', 'danger');
        setTimeout(() => volver(), 2000);
        return;
    }
    
    cargarSolicitud();
    
    // Event listener para el formulario
    document.getElementById('editarSolicitudForm').addEventListener('submit', actualizarSolicitud);
});

function verificarAcceso() {
    const token = localStorage.getItem('authToken');
    const rol = localStorage.getItem('rol');
    
    if (!token || rol !== 'ADMIN') {
        alert('Acceso denegado. Debes ser administrador.');
        window.location.href = '../../dashboard-admin.jsp';
    }
}

function cargarSolicitud() {
    const token = localStorage.getItem('authToken');
    
    document.getElementById('loading').style.display = 'block';
    
    fetch(`http://localhost:8080/admin/solicitudes/${solicitudId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
            window.location.href = '../../login.jsp';
            throw new Error('No autorizado');
        }
        
        if (response.status === 404) {
            throw new Error('Solicitud no encontrada');
        }
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return response.json();
    })
    .then(data => {
        console.log('Solicitud cargada:', data);
        llenarFormulario(data);
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('editarSolicitudForm').style.display = 'block';
    })
    .catch(error => {
        console.error('Error cargando solicitud:', error);
        document.getElementById('loading').style.display = 'none';
        mostrarAlerta(`Error cargando la solicitud: ${error.message}`, 'danger');
    });
}

function llenarFormulario(solicitud) {
    document.getElementById('solicitudId').value = solicitud.id;
    
    // Información del cliente
    const clienteNombre = solicitud.usuario ? 
        `${solicitud.usuario.nombre} ${solicitud.usuario.apellidos}` : 
        'Cliente desconocido';
    document.getElementById('clienteInfo').textContent = clienteNombre;
    
    // Fecha
    const fecha = new Date(solicitud.fecha);
    document.getElementById('fechaInfo').textContent = fecha.toLocaleDateString('es-ES');
    
    // Campos editables
    document.getElementById('estado').value = solicitud.estado || '';
    document.getElementById('descripcion').value = solicitud.descripcion || '';
    document.getElementById('direccion').value = solicitud.direccion || '';
    document.getElementById('detalles').value = solicitud.detalles || '';
}

function actualizarSolicitud(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');
    const formData = {
        estado: document.getElementById('estado').value,
        direccion: document.getElementById('direccion').value,
        detalles: document.getElementById('detalles').value
    };
    
    console.log('Actualizando solicitud:', formData);
    
    fetch(`http://localhost:8080/admin/solicitudes/${solicitudId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.status === 401) {
            alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
            window.location.href = '../../login.jsp';
            throw new Error('No autorizado');
        }
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return response.json();
    })
    .then(data => {
        console.log('Solicitud actualizada:', data);
        mostrarAlerta('Solicitud actualizada correctamente', 'success');
        
        // Volver al dashboard después de 2 segundos
        setTimeout(() => volver(), 2000);
    })
    .catch(error => {
        console.error('Error actualizando solicitud:', error);
        mostrarAlerta(`Error actualizando la solicitud: ${error.message}`, 'danger');
    });
}

function eliminarSolicitud() {
    if (!confirm('¿Estás seguro de que quieres eliminar esta solicitud? Esta acción no se puede deshacer.')) {
        return;
    }
    
    const token = localStorage.getItem('authToken');
    
    fetch(`http://localhost:8080/admin/solicitudes/${solicitudId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
            window.location.href = '../../login.jsp';
            throw new Error('No autorizado');
        }
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        mostrarAlerta('Solicitud eliminada correctamente', 'success');
        
        // Volver al dashboard después de 2 segundos
        setTimeout(() => volver(), 2000);
    })
    .catch(error => {
        console.error('Error eliminando solicitud:', error);
        mostrarAlerta(`Error eliminando la solicitud: ${error.message}`, 'danger');
    });
}

function volver() {
    window.location.href = '../../dashboard-admin.jsp';
}

function mostrarAlerta(mensaje, tipo) {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
}
</script>

</body>
</html>
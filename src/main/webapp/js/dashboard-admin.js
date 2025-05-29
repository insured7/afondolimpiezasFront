document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard cargado');
    console.log('Token actual:', localStorage.getItem('authToken'));
    console.log('Rol actual:', localStorage.getItem('rol'));
    
    if (verificarRolAdmin()) {
        cargarSolicitudes();
    }
});

function verificarRolAdmin() {
    const rol = localStorage.getItem('rol');
    console.log('Verificando rol:', rol, 'Tipo:', typeof rol);
    
    if (!rol) {
        alert("No se encontró rol de usuario. Por favor, inicia sesión.");
        window.location.href = 'login.jsp';
        return false;
    }
    
    if (rol !== 'ADMIN') {
        alert(`Acceso denegado. Tu rol es: ${rol}. Necesitas ser ADMIN.`);
        window.location.href = 'index.jsp';
        return false;
    }
    
    return true;
}

function cargarSolicitudes() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert("No hay token de sesión. Por favor, inicia sesión.");
        window.location.href = 'login.jsp';
        return;
    }
    
    console.log('Iniciando carga de solicitudes...');
    console.log('URL de destino:', 'http://localhost:8080/admin/solicitudes');
    console.log('Token a enviar:', token.substring(0, 20) + '...');
    
    fetch('http://localhost:8080/admin/solicitudes', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Estado de respuesta:', response.status);
        
        if (response.status === 401) {
            alert("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
            localStorage.removeItem('authToken');
            localStorage.removeItem('rol');
            window.location.href = 'login.jsp';
            throw new Error('No autorizado');
        }
        
        if (response.status === 403) {
            alert("No tienes permisos para acceder a esta funcionalidad.");
            throw new Error('Acceso prohibido');
        }
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data);
        console.log('Número de solicitudes:', data ? data.length : 0);
        
        if (!data || data.length === 0) {
            document.getElementById('tablaSolicitudes').style.display = 'none';
            document.getElementById('noSolicitudesMsg').style.display = 'block';
            console.log('No hay solicitudes para mostrar');
            return;
        }
        
        renderizarSolicitudes(data);
    })
    .catch(error => {
        console.error('Error completo:', error);
        mostrarAlerta(`Error cargando solicitudes: ${error.message}`, 'danger');
    });
}

function renderizarSolicitudes(solicitudes) {
    console.log('Renderizando', solicitudes.length, 'solicitudes');
    
    const tbody = document.querySelector('#tablaSolicitudes tbody');
    if (!tbody) {
        console.error('No se encontró el tbody de la tabla');
        return;
    }
    
    tbody.innerHTML = '';

    solicitudes.forEach((sol, index) => {
        console.log(`Procesando solicitud ${index + 1}:`, sol);
        
        const tr = document.createElement('tr');
        const fecha = new Date(sol.fecha);
        const fechaStr = fecha.toLocaleDateString('es-ES');

        // Determinar clase CSS según el estado
        let estadoClass = '';
        switch(sol.estado) {
            case 'PENDIENTE':
                estadoClass = 'bg-warning text-dark';
                break;
            case 'EN_PROCESO':
                estadoClass = 'bg-info text-white';
                break;
            case 'COMPLETADA':
                estadoClass = 'bg-success text-white';
                break;
            case 'CANCELADA':
            case 'RECHAZADA':
                estadoClass = 'bg-danger text-white';
                break;
            default:
                estadoClass = 'bg-secondary text-white';
        }

        tr.innerHTML = `
            <td>${sol.id || 'N/A'}</td>
            <td>${sol.usuario ? (sol.usuario.nombre + ' ' + sol.usuario.apellidos) : 'Usuario desconocido'}</td>
            <td>${fechaStr}</td>
            <td><span class="badge ${estadoClass}">${sol.estado || 'Sin estado'}</span></td>
            <td>
                <div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" 
                     title="${sol.descripcion || 'Sin descripción'}">
                    ${sol.descripcion || 'Sin descripción'}
                </div>
            </td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onclick="verSolicitud(${sol.id})" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editarSolicitud(${sol.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="confirmarBorrado(${sol.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('tablaSolicitudes').style.display = '';
    document.getElementById('noSolicitudesMsg').style.display = 'none';
    
    console.log('Tabla renderizada correctamente');
}

function mostrarAlerta(mensaje, tipo) {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    if (!alertPlaceholder) {
        console.error('No se encontró el contenedor de alertas');
        return;
    }
    
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
    
    // Auto-ocultar después de 5 segundos para alertas de éxito
    if (tipo === 'success') {
        setTimeout(() => {
            const alert = alertPlaceholder.querySelector('.alert');
            if (alert) {
                alert.remove();
            }
        }, 5000);
    }
}

function verSolicitud(id) {
    // Crear modal o nueva página para ver detalles
    console.log('Ver solicitud:', id);
    // Por ahora redirigir a editar
    editarSolicitud(id);
}

function editarSolicitud(id) {
    console.log('Editando solicitud:', id);
    window.location.href = `admin/solicitud/editar.jsp?id=${id}`;
}

function confirmarBorrado(id) {
    // Crear un modal de confirmación más elaborado
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'confirmarBorradoModal';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Confirmar Eliminación
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-3">
                        <strong>¿Estás seguro de que quieres eliminar esta solicitud?</strong>
                    </p>
                    <p class="text-muted mb-0">
                        <i class="fas fa-info-circle me-1"></i>
                        Esta acción no se puede deshacer y eliminará permanentemente todos los datos asociados.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-1"></i>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-danger" onclick="borrarSolicitud(${id})">
                        <i class="fas fa-trash me-1"></i>
                        Sí, Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Limpiar el modal cuando se cierre
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function borrarSolicitud(id) {
    const token = localStorage.getItem('authToken');
    console.log('Borrando solicitud:', id);
    
    // Cerrar el modal de confirmación
    const modal = document.getElementById('confirmarBorradoModal');
    if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    }
    
    fetch(`http://localhost:8080/admin/solicitudes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Respuesta de borrado:', response.status);
        
        if (response.status === 401) {
            alert("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
            localStorage.removeItem('authToken');
            localStorage.removeItem('rol');
            window.location.href = 'login.jsp';
            throw new Error('No autorizado');
        }
        
        if (response.status === 404) {
            throw new Error('La solicitud no existe o ya fue eliminada');
        }
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        mostrarAlerta('Solicitud eliminada correctamente.', 'success');
        
        // Recargar la lista de solicitudes
        setTimeout(() => cargarSolicitudes(), 1000);
    })
    .catch(error => {
        console.error('Error borrando solicitud:', error);
        mostrarAlerta(`Error eliminando solicitud: ${error.message}`, 'danger');
    });
}

// Función para refrescar la lista
function refrescarSolicitudes() {
    console.log('Refrescando lista de solicitudes');
    cargarSolicitudes();
}
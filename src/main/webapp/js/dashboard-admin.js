document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard cargado');
    console.log('Token actual:', localStorage.getItem('authToken'));
    console.log('Rol actual:', localStorage.getItem('rol'));

    if (verificarRolAdmin()) {
        cargarSolicitudes();
    }
});

function verificarRolAdmin() {
    var rol = localStorage.getItem('rol');
    if (!rol) {
        alert("No se encontró rol de usuario. Por favor, inicia sesión.");
        window.location.href = 'login.jsp';
        return false;
    }

    if (rol !== 'ADMIN') {
        alert("Acceso denegado. Tu rol es: " + rol + ". Necesitas ser ADMIN.");
        window.location.href = 'index.jsp';
        return false;
    }

    return true;
}

function cargarSolicitudes() {
    var token = localStorage.getItem('authToken');
    if (!token) {
        alert("No hay token de sesión. Por favor, inicia sesión.");
        window.location.href = 'login.jsp';
        return;
    }

    fetch('http://localhost:8080/admin/solicitudes', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        if (!response.ok) {
            if (response.status === 401) {
                alert("Sesión expirada o no autorizada.");
                localStorage.clear();
                window.location.href = 'login.jsp';
            }
            throw new Error('Error al cargar solicitudes');
        }
        return response.json();
    })
    .then(function (data) {
        if (!data || data.length === 0) {
            document.getElementById('tablaSolicitudes').style.display = 'none';
            document.getElementById('noSolicitudesMsg').style.display = 'block';
            return;
        }
        renderizarSolicitudes(data);
    })
    .catch(function (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al cargar solicitudes: ' + error.message, 'danger');
    });
}

function renderizarSolicitudes(solicitudes) {
    var tbody = document.querySelector('#tablaSolicitudes tbody');
    tbody.innerHTML = '';

    for (var i = 0; i < solicitudes.length; i++) {
        var sol = solicitudes[i];
        var tr = document.createElement('tr');
        var fecha = new Date(sol.fecha).toLocaleDateString('es-ES');

        var estadoClass = 'bg-secondary text-white';
        if (sol.estado === 'PENDIENTE') estadoClass = 'bg-warning text-dark';
        else if (sol.estado === 'EN_PROCESO') estadoClass = 'bg-info text-white';
        else if (sol.estado === 'COMPLETADA') estadoClass = 'bg-success text-white';
        else if (sol.estado === 'CANCELADA' || sol.estado === 'RECHAZADA') estadoClass = 'bg-danger text-white';

        tr.innerHTML = 
            '<td>' + sol.id + '</td>' +
            '<td>' + (sol.usuario ? sol.usuario.nombre + ' ' + sol.usuario.apellidos : '') + '</td>' +
            '<td>' + fecha + '</td>' +
            '<td><span class="badge ' + estadoClass + '">' + sol.estado + '</span></td>' +
            '<td><div title="' + sol.descripcion + '" style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + sol.descripcion + '</div></td>' +
            '<td>' +
            '<button class="btn btn-sm btn-outline-primary" onclick="verSolicitud(' + sol.id + ')"><i class="fas fa-eye"></i></button> ' +
            '<button class="btn btn-sm btn-warning" onclick="editarSolicitud(' + sol.id + ')"><i class="fas fa-edit"></i></button> ' +
			'<button class="btn btn-sm btn-danger btn-eliminar" data-id="' + sol.id + '"><i class="fas fa-trash"></i></button>' + 

            '</td>';
        tbody.appendChild(tr);
    }

    document.getElementById('tablaSolicitudes').style.display = '';
    document.getElementById('noSolicitudesMsg').style.display = 'none';
	
	// Agregar eventos a botones de eliminar
	var botones = document.querySelectorAll('.btn-eliminar');
	for (var i = 0; i < botones.length; i++) {
	    botones[i].addEventListener('click', function () {
	        var id = this.getAttribute('data-id');
	        confirmarBorrado(parseInt(id));
	    });
	}

}

function mostrarAlerta(mensaje, tipo) {
    var contenedor = document.getElementById('alert-placeholder');
    contenedor.innerHTML = 
        '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' +
        mensaje +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>' +
        '</div>';
}

function verSolicitud(id) {
    editarSolicitud(id);
}

function editarSolicitud(id) {
    window.location.href = 'admin/solicitud/editar.jsp?id=' + id;
}

function confirmarBorrado(id) {
    var modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
    var btnConfirmar = document.getElementById('btnConfirmarBorrado');
    btnConfirmar.onclick = function () {
        borrarSolicitud(id);
    };
    modal.show();
}

function borrarSolicitud(id) {
    var token = localStorage.getItem('authToken');

    fetch('http://localhost:8080/admin/solicitudes/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Error al eliminar la solicitud');
        }
        mostrarAlerta('Solicitud eliminada correctamente.', 'success');
        cargarSolicitudes();
    })
    .catch(function (error) {
        mostrarAlerta('Error eliminando solicitud: ' + error.message, 'danger');
    });
}

// Modal HTML añadido dinámicamente
document.body.insertAdjacentHTML('beforeend',
    '<div class="modal fade" id="modalConfirmacion" tabindex="-1">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header bg-danger text-white">' +
    '<h5 class="modal-title">Confirmar Eliminación</h5>' +
    '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>' +
    '</div>' +
    '<div class="modal-body">¿Estás seguro de que deseas eliminar esta solicitud?</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +
    '<button type="button" class="btn btn-danger" id="btnConfirmarBorrado">Sí, eliminar</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
);

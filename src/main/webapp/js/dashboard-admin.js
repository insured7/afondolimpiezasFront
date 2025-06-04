document.addEventListener('DOMContentLoaded', function() {
    var token = localStorage.getItem('authToken');
    var rol = localStorage.getItem('rol');

    if (!token) {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.jsp';
        return;
    }
    if (rol !== 'ADMIN') {
        alert('Acceso denegado. Solo ADMIN puede entrar.');
        window.location.href = 'login.jsp';
        return;
    }

    cargarSolicitudes();

    // Delegación para botones editar y eliminar (solo uno)
    document.querySelector('#tablaSolicitudes tbody').addEventListener('click', function(e) {
        var btnEditar = e.target.closest('.btn-editar');
        if (btnEditar) {
            var id = btnEditar.getAttribute('data-id');
            window.location.href = 'editar-solicitud.jsp?id=' + id;
            return;
        }

        var btnEliminar = e.target.closest('.btn-eliminar');
        if (btnEliminar) {
            var id = btnEliminar.getAttribute('data-id');
            if (isNaN(Number(id))) {
                alert('ID inválido: ' + id);
                return;
            }
            if (confirm('¿Eliminar solicitud ID ' + id + '?')) {
                borrarSolicitud(id);
            }
        }
    });
});

function cargarSolicitudes() {
    var token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/admin/solicitudes', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('Error al cargar solicitudes');
    })
    .then(function(data) {
        console.log(data); // Para depurar y ver qué llega
        var tbody = document.querySelector('#tablaSolicitudes tbody');
        if (!data.length) {
            document.getElementById('noSolicitudesMsg').style.display = 'block';
            document.getElementById('tablaSolicitudes').style.display = 'none';
            return;
        }
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var s = data[i];

            var correoUsuario = s.correo ? s.correo : 'Desconocido';

            // Aquí si tienes campo fecha en DTO, úsalo; si no, puedes dejar vacío
            var fechaFormateada = s.fecha ? new Date(s.fecha).toLocaleDateString() : '';

            html += '<tr>' +
                '<td>' + s.solicitudId + '</td>' +
                '<td>' + correoUsuario + '</td>' +
                '<td>' + fechaFormateada + '</td>' +
                '<td>' + s.estado + '</td>' +
                '<td title="' + s.detalles + '" style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;">' + s.detalles + '</td>' +
                '<td>' +
                    '<button class="btn btn-warning btn-editar me-2" data-id="' + s.solicitudId + '">Editar</button>' +
                    '<button class="btn btn-danger btn-eliminar" data-id="' + s.solicitudId + '">Eliminar</button>' +
                '</td>' +
            '</tr>';
        }
        tbody.innerHTML = html;
        document.getElementById('noSolicitudesMsg').style.display = 'none';
        document.getElementById('tablaSolicitudes').style.display = '';
    })
    .catch(function(error) {
        mostrarAlerta('Error al cargar solicitudes', 'danger');
    });
}

function borrarSolicitud(id) {
    var token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/admin/solicitudes/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function(response) {
		console.log('Respuesta eliminar:', response);
        if (!response.ok) {
            throw new Error('No se pudo eliminar la solicitud');
        }
        mostrarAlerta('Solicitud eliminada.', 'success');
        cargarSolicitudes();
    })
    .catch(function(error) {
        mostrarAlerta(error.message, 'danger');
    });
}

function asignarEmpleadoASolicitud(solicitudId, empleadoId, rol) {
    var token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/admin/solicitudes/asignar-empleado', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            solicitudId: solicitudId,
            empleadoId: empleadoId,
            rol: rol
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text || 'Error asignando empleado'); });
        }
        return response.text();
    })
    .then(data => {
        alert(data); // Mensaje de éxito
        // Aquí recarga datos si quieres
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}


function mostrarAlerta(mensaje, tipo) {
    var contenedor = document.getElementById('alert-placeholder');
    contenedor.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' +
        mensaje +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>' +
        '</div>';
}

document.getElementById('formAsignarEmpleado').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    var solicitudId = document.getElementById('solicitudId').value;
    var empleadoId = document.getElementById('empleadoId').value;
    var rol = document.getElementById('rol').value.trim();

    if (!solicitudId || !empleadoId || !rol) {
        alert('Por favor completa todos los campos.');
        return;
    }

    asignarEmpleadoASolicitud(Number(solicitudId), Number(empleadoId), rol);
});

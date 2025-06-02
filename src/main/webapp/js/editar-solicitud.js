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

    // Obtener el parámetro id de la URL (ej: editar-solicitud.jsp?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const idSolicitud = urlParams.get('id');
    if (!idSolicitud) {
        alert('No se especificó la solicitud a editar.');
        window.location.href = 'dashboard-admin.jsp';
        return;
    }

    // Cargar datos de la solicitud para rellenar el formulario
    fetch('http://localhost:8080/admin/solicitudes/' + idSolicitud, {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la solicitud');
        return res.json();
    })
    .then(data => {
        document.getElementById('idSolicitud').value = data.id_solicitudes_presupuesto;
        document.getElementById('estado').value = data.estado || 'Pendiente';
        document.getElementById('detalles').value = data.detalles || '';
        document.getElementById('direccion').value = data.direccion || '';
    })
    .catch(err => {
        alert(err.message);
        window.location.href = 'dashboard-admin.jsp';
    });

    // Manejar submit del formulario
    document.getElementById('formEditarSolicitud').addEventListener('submit', function(e) {
        e.preventDefault();

        const payload = {
            estado: document.getElementById('estado').value,
            detalles: document.getElementById('detalles').value.trim(),
            direccion: document.getElementById('direccion').value.trim()
        };

        fetch('http://localhost:8080/admin/solicitudes/' + idSolicitud, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (!res.ok) throw new Error('Error al guardar los cambios');
            alert('Solicitud actualizada correctamente.');
            window.location.href = 'dashboard-admin.jsp';
        })
        .catch(err => {
            mostrarAlerta(err.message, 'danger');
        });
    });
});

function mostrarAlerta(mensaje, tipo) {
    var contenedor = document.getElementById('alert-placeholder');
    contenedor.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' +
        mensaje +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>' +
        '</div>';
}

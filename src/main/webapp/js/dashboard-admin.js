document.addEventListener('DOMContentLoaded', () => {
    verificarRolAdmin();
    cargarSolicitudes();
});

function verificarRolAdmin() {
    const rol = localStorage.getItem('rol');
    if (rol !== 'ADMIN') {
        alert("Acceso denegado. Debes ser administrador.");
        window.location.href = 'index.jsp';
    }
}

function cargarSolicitudes() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/admin/solicitudes', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
            window.location.href = 'login.jsp';
            throw new Error('No autorizado');
        }
        if (!response.ok) throw new Error('Error al cargar solicitudes');
        return response.json();
    })
    .then(data => {
        if (!data.length) {
            document.getElementById('tablaSolicitudes').style.display = 'none';
            document.getElementById('noSolicitudesMsg').style.display = 'block';
            return;
        }
        renderizarSolicitudes(data);
    })
    .catch(error => {
        console.error(error);
        mostrarAlerta('Error cargando solicitudes.', 'danger');
    });
}

function renderizarSolicitudes(solicitudes) {
    const tbody = document.querySelector('#tablaSolicitudes tbody');
    tbody.innerHTML = '';

    solicitudes.forEach(sol => {
        const tr = document.createElement('tr');
        const fecha = new Date(sol.fecha);
        const fechaStr = fecha.toLocaleDateString('es-ES');

        tr.innerHTML = `
            <td>${sol.id}</td>
            <td>${sol.usuario.nombre} ${sol.usuario.apellidos}</td>
            <td>${fechaStr}</td>
            <td>${sol.estado}</td>
            <td>${sol.descripcion}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editarSolicitud(${sol.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="borrarSolicitud(${sol.id})">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('tablaSolicitudes').style.display = '';
    document.getElementById('noSolicitudesMsg').style.display = 'none';
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

function editarSolicitud(id) {
    window.location.href = `admin/solicitud/editar.jsp?id=${id}`;
}

function borrarSolicitud(id) {
    if (!confirm('¿Estás seguro de que quieres borrar esta solicitud?')) return;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/admin/solicitudes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.status === 401) {
            alert("Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.");
            window.location.href = 'login.jsp';
            throw new Error('No autorizado');
        }
        if (!response.ok) throw new Error('Error al borrar solicitud');
        mostrarAlerta('Solicitud borrada correctamente.', 'success');
        cargarSolicitudes();
    })
    .catch(error => {
        console.error(error);
        mostrarAlerta('Error borrando solicitud.', 'danger');
    });
}

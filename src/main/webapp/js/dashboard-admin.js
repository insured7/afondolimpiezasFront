document.addEventListener('DOMContentLoaded', function() {
	var token = localStorage.getItem('authToken');
	var rol = localStorage.getItem('rol');

	// Control básico de acceso en frontend
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

	//Delegacion para boton editar
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
	        if (confirm('¿Eliminar solicitud ID ' + id + '?')) {
	            borrarSolicitud(id);
	        }
	    }
	});
	// Delegación para botón eliminar
	document.querySelector('#tablaSolicitudes tbody').addEventListener('click', function(e) {
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
			var tbody = document.querySelector('#tablaSolicitudes tbody');
			if (!data.length) {
				document.getElementById('noSolicitudesMsg').style.display = 'block';
				document.getElementById('tablaSolicitudes').style.display = 'none';
				return;
			}
			var html = '';
			for (var i = 0; i < data.length; i++) {
			    var s = data[i];
			    console.log('Solicitud ID:', s.id_solicitudes_presupuesto);
			    if (!s.id_solicitudes_presupuesto) {
			        console.log('Solicitud sin ID válida, se omite:', s);
			        continue; // Saltar si no tiene id válido
			    }
			    var nombreUsuario = ''; // Aquí ajusta si tienes usuario anidado o solo usuarioId
			    var fechaFormateada = ''; // Si tienes campo fecha, sino deja vacío o adapta
			    
			    // Construcción HTML con id correcto
			    html += '<tr>' +
			        '<td>' + s.id_solicitudes_presupuesto + '</td>' +
			        '<td>' + nombreUsuario + '</td>' +
			        '<td>' + fechaFormateada + '</td>' +
			        '<td>' + s.estado + '</td>' +
			        '<td title="' + s.detalles + '" style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;">' + s.detalles + '</td>' +
					'<td>' +
					        '<button class="btn btn-warning btn-editar me-2" data-id="' + s.id_solicitudes_presupuesto + '">Editar</button>' +
					        '<button class="btn btn-danger btn-eliminar" data-id="' + s.id_solicitudes_presupuesto + '">Eliminar</button>' +
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

function mostrarAlerta(mensaje, tipo) {
	var contenedor = document.getElementById('alert-placeholder');
	contenedor.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' +
		mensaje +
		'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>' +
		'</div>';
}

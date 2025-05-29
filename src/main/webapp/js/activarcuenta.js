document.addEventListener('DOMContentLoaded', function() {
	const token = document.body.getAttribute('data-token');
	if (!token || token.trim() === "") {
		mostrarMensaje('Token no válido o ausente.', 'danger');
		return;
	}


	fetch('http://localhost:8080/auth/activar-cuenta?token=' + encodeURIComponent(token), {
		method: 'GET'
	})
		.then(response => {
			if (response.ok) {
				mostrarMensaje('¡Cuenta activada correctamente! Ahora puedes iniciar sesión.', 'success');
				setTimeout(() => window.location.href = 'login.jsp', 3000);
			} else {
				return response.json().then(data => {
					mostrarMensaje(data.mensaje || 'Error al activar la cuenta.', 'danger');
				});
			}
		})
		.catch(() => {
			mostrarMensaje('Error de conexión con el servidor.', 'danger');
		});

	function mostrarMensaje(texto, tipo) {
		var mensajeDiv = document.getElementById('mensaje');
		mensajeDiv.textContent = texto;
		mensajeDiv.className = 'alert alert-' + tipo;
		mensajeDiv.classList.remove('d-none');
	}
});

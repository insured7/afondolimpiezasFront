document.addEventListener('DOMContentLoaded', function() {

	console.log("auth.js cargado"); //Test para ver si lo carga la pagina
	var loginForm = document.getElementById('loginForm');
	if (!loginForm) {
		console.error("El formulario no se encontró en el DOM.");
		return;
	}
	loginForm.addEventListener('submit', function(e) {
		e.preventDefault();
		console.log("Formulario enviado"); // Esto debe verse al hacer click en el botón

		var correo = document.getElementById('correo').value.trim();
		var contrasenia = document.getElementById('contrasenia').value.trim();
		var userType = document.getElementById('userType').value;

		var loginUrl = userType === 'user'
			? 'http://localhost:8080/auth/login-usuario'
			: 'http://localhost:8080/auth/login-empleado';


			//Login
		fetch(loginUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ correo, contrasenia })
		})
			.then(res => {
				if (!res.ok) throw new Error('Credenciales incorrectas');
				return res.json();
			})
			.then(data => {
				console.log("Respuesta login-empleado:", data);
				if (data.token) {
					localStorage.setItem('authToken', data.token);

					if (userType === 'user') {
						localStorage.setItem('rol', 'USUARIO');
					} else {
						localStorage.setItem('rol', data.esAdmin ? 'ADMIN' : 'EMPLEADO');
					}
					if (userType === 'user') {
						// Si es usuario normal
						window.location.href = 'dashboard-usuario.jsp';
					} else {
						// Es empleado, mira si es admin
						if (data.esAdmin) {
							window.location.href = 'dashboard-admin.jsp';
						} else {
							window.location.href = 'dashboard-empleado.jsp';
						}
					}
				} else {
					throw new Error('No se recibió token');
				}
			})
			.catch(error => {
				document.getElementById('errorMessage').textContent = error.message;
			});
	});
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("auth.js cargado");

  var loginForm = document.getElementById('loginForm');
  if (!loginForm) {
    console.error("El formulario no se encontró en el DOM.");
    return;
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Formulario enviado");

    var correo = document.getElementById('correo').value.trim();
    var contrasenia = document.getElementById('contrasenia').value.trim();
    var userType = document.getElementById('userType').value;

    var loginUrl = (userType === 'user')
      ? 'http://localhost:8080/auth/login-usuario'
      : 'http://localhost:8080/auth/login-empleado';

    fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: correo, contrasenia: contrasenia })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Credenciales incorrectas');
        return res.json();
      })
      .then(function (data) {
        console.log("Login OK:", data);

        if (!data.token) throw new Error('No se recibió token');

        // Guardamos solo el token JWT como string
        localStorage.setItem('authToken', data.token);
		localStorage.setItem('usuarioId', data.usuarioId);

        // Guardamos rol para control de acceso
        var rol;
        if (userType === 'user') {
          rol = 'USUARIO';
        } else {
          rol = data.esAdmin ? 'ADMIN' : 'EMPLEADO';
        }
        localStorage.setItem('rol', rol);

        // Redirección según el tipo de usuario
        if (userType === 'user') {
          window.location.href = 'dashboard-usuario.jsp';
        } else {
          window.location.href = rol === 'ADMIN'
            ? 'dashboard-admin.jsp'
            : 'dashboard-empleado.jsp';
        }
      })
      .catch(function (error) {
        console.error("Error al iniciar sesión:", error);
        document.getElementById('errorMessage').textContent = error.message;
      });
  });
});

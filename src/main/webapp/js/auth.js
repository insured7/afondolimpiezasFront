// auth.js

// Listener para el submit del formulario de login
var loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var userType = document.getElementById('userType').value;

    // URL según tipo de usuario
    var loginUrl = userType === 'user' 
      ? '/auth/login-usuario' 
      : '/auth/login-empleado';

    // Enviar datos con claves que espera el backend: correo y contrasenia
    fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, contrasenia: password })
    })
    .then(function(res) {
      if (!res.ok) {
        throw new Error('Credenciales incorrectas');
      }
      return res.json();
    })
    .then(function(data) {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard.jsp'; // o la página que tengas
      } else {
        throw new Error('No se recibió token');
      }
    })
    .catch(function(error) {
      var errorDiv = document.getElementById('errorMessage');
      if (errorDiv) {
        errorDiv.textContent = error.message;
      }
    });
  });
}

// Función fetch con token JWT para llamadas autenticadas
function fetchWithAuth(url, options) {
  options = options || {};
  options.headers = options.headers || {};

  var token = localStorage.getItem('authToken');
  if (token) {
    options.headers['Authorization'] = 'Bearer ' + token;
  }

  return fetch(url, options).then(function(res) {
    if (res.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login.jsp';
      throw new Error('No autorizado');
    }
    return res;
  });
}

window.fetchWithAuth = fetchWithAuth;

function navigateTo(url) {
  window.location.href = url;
}

// Obtener datos del almacenamiento local
const token = localStorage.getItem('authToken');
const rol = localStorage.getItem('rol');

// Obtener botones del DOM
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnPresupuesto = document.getElementById('btnPresupuesto');

const pagina = window.location.pathname;

// Control de visibilidad del login/logout
if (btnLogin && btnLogout) {
  if (token) {
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
  } else {
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
  }
}

// Acción del botón de logout
if (btnLogout) {
  btnLogout.addEventListener('click', function () {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rol');

    // Podrías invalidar sesión en el servidor también aquí si usas una URL como /logout
    // fetch('/logout', { method: 'POST' });

    window.location.href = 'index.jsp';
  });
}

// Ocultar botón de presupuesto para empleados/admin
if (btnPresupuesto && (rol === 'EMPLEADO' || rol === 'ADMIN')) {
  btnPresupuesto.style.display = 'none';
}

// Redirigir al login si no hay token y se intenta acceder al dashboard
if (!token && pagina.includes('dashboard')) {
  window.location.href = 'index.jsp';
}

// Prevenir que empleados/admin accedan al formulario de presupuestos
if ((rol === 'EMPLEADO' || rol === 'ADMIN') && pagina.endsWith('presupuesto-form.jsp')) {
  alert('Solo los usuarios pueden solicitar presupuestos.');
  window.location.href = 'index.jsp';
}

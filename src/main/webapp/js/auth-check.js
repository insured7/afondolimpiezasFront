document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  const rol = localStorage.getItem('rol');

  // URL actual
  const path = window.location.pathname;

  // Reglas por ruta
  const reglas = [
    { ruta: '/dashboard-admin.jsp', rol: 'ADMIN' },
    { ruta: '/dashboard-empleado.jsp', rol: 'EMPLEADO' },
    { ruta: '/dashboard-usuario.jsp', rol: 'USUARIO' },
    { ruta: '/formulario-presupuesto.jsp', rol: 'USUARIO' },
  ];

  const reglaActual = reglas.find(regla => path.endsWith(regla.ruta));

  if (!token || (reglaActual && reglaActual.rol !== rol)) {
    alert('No tienes permisos o no has iniciado sesión.');
    window.location.href = 'login.jsp';
  }
});

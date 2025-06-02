function navigateTo(url) {
    window.location.href = url;
  }

  var token = localStorage.getItem('authToken');
  var rol = localStorage.getItem('rol');
  var btnLogin = document.getElementById('btnLogin');
  var btnLogout = document.getElementById('btnLogout');
  var btnPresupuesto = document.getElementById('btnPresupuesto');
  var pagina = window.location.pathname;

  if (token) {
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
  } else {
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
  }

  btnLogout.addEventListener('click', function() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rol');
    window.location.href = 'index.jsp';
  });

  // Ocultar botón presupuesto para empleados/admin
  if (btnPresupuesto && (rol === 'EMPLEADO' || rol === 'ADMIN')) {
    btnPresupuesto.style.display = 'none';
  }

  // Redirección si no hay token y están en dashboard
  if (!token && pagina.includes('dashboard')) {
    window.location.href = 'index.jsp';
  }

  // Solo usuarios pueden ir a formulario de presupuesto
  if ((rol === 'EMPLEADO' || rol === 'ADMIN') && pagina.endsWith('presupuesto-form.jsp')) {
    alert('Solo los usuarios pueden solicitar presupuestos.');
    window.location.href = 'index.jsp';
  }
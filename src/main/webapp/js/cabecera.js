function navigateTo(url) {
  window.location.href = url;
}

// Obtener token y rol del almacenamiento local (modo ES5)
var token = localStorage.getItem("authToken");
var rol = localStorage.getItem("rol");

// Obtener botones
var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");
var btnPresupuesto = document.getElementById("btnPresupuesto");
var btnDashboardUsuario = document.getElementById("btnDashboardUsuario");
var btnDashboardEmpleado = document.getElementById("btnDashboardEmpleado");
var btnDashboardAdmin = document.getElementById("btnDashboardAdmin");

var pagina = window.location.pathname;



// Mostrar solo el botón de dashboard que corresponda según rol
if (rol === "USUARIO") {
  if (btnDashboardUsuario) btnDashboardUsuario.style.display = "inline-block";
} else if (rol === "EMPLEADO") {
  if (btnDashboardEmpleado) btnDashboardEmpleado.style.display = "inline-block";
} else if (rol === "ADMIN") {
  if (btnDashboardAdmin) btnDashboardAdmin.style.display = "inline-block";
}

// Mostrar u ocultar botones según login
if (token) {
  if (btnLogin) btnLogin.style.display = "none";
  if (btnLogout) btnLogout.style.display = "inline-block";
} else {
  if (btnLogin) btnLogin.style.display = "inline-block";
  if (btnLogout) btnLogout.style.display = "none";
}

// Acción del botón logout
if (btnLogout) {
  btnLogout.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    localStorage.removeItem("rol");
    window.location.href = "index.jsp";
  });
}

// Mostrar u ocultar botón presupuesto:
// Visible para USUARIO y para no logueados (token null), oculto para admin o empleado
if (btnPresupuesto) {
  if (rol === "ADMIN" || rol === "EMPLEADO") {
    btnPresupuesto.style.display = "none";
  } else {
    btnPresupuesto.style.display = "inline-block";
  }
}

// Bloquear acceso a presupuesto-form.jsp si no hay sesión (token null)
if (pagina.indexOf("presupuesto-form.jsp") !== -1) {
  if (!token) {
    alert("Debes iniciar sesión para solicitar un presupuesto.");
    window.location.href = "login.jsp";
  } else if (rol !== "USUARIO") {
    alert("Solo los usuarios pueden solicitar presupuestos.");
    window.location.href = "index.jsp";
  }
}

// Redirigir si no hay sesión e intenta acceder a un dashboard
if (!token && pagina.indexOf("dashboard") !== -1) {
  alert("Debes iniciar sesión para acceder al panel.");
  window.location.href = "login.jsp";
}

// Proteger dashboards por rol
if (pagina.indexOf("dashboard-usuario") !== -1 && rol !== "USUARIO") {
  alert("No tienes acceso al panel de usuario.");
  window.location.href = "index.jsp";
}

if (pagina.indexOf("dashboard-empleado") !== -1 && rol !== "EMPLEADO") {
  alert("No tienes acceso al panel de empleado.");
  window.location.href = "index.jsp";
}

if (pagina.indexOf("dashboard-admin") !== -1 && rol !== "ADMIN") {
  alert("No tienes acceso al panel de administrador.");
  window.location.href = "index.jsp";
}

// Prevenir acceso al formulario de presupuesto para roles no permitidos
if ((rol === "EMPLEADO" || rol === "ADMIN") && pagina.indexOf("presupuesto-form.jsp") !== -1) {
  alert("Solo los usuarios pueden solicitar presupuestos.");
  window.location.href = "index.jsp";
}

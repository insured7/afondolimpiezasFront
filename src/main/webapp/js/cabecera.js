function navigateTo(url) {
   window.location.href = url;
 }

 const token = localStorage.getItem('authToken');
 const btnLogin = document.getElementById('btnLogin');
 const btnLogout = document.getElementById('btnLogout');
 const rol = localStorage.getItem('rol');
 const btnPresupuesto = document.querySelector('[onclick*="presupuesto-form.jsp"]');
 const pagina = window.location.pathname;

 if (token) {
   btnLogin.style.display = 'none';
   btnLogout.style.display = 'inline-block';
 } else {
   btnLogin.style.display = 'inline-block';
   btnLogout.style.display = 'none';
 }

 btnLogout.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('rol');
  window.location.href = 'index.jsp';
});

if (btnPresupuesto && (rol === 'EMPLEADO' || rol === 'ADMIN')) {
  btnPresupuesto.style.display = 'none';
}
 
 if (!token && window.location.pathname.includes('dashboard')) {
   window.location.href = 'index.jsp';
 }
 
 if ((rol === 'EMPLEADO' || rol === 'ADMIN') && pagina.endsWith('presupuesto-form.jsp')) {
   alert('Solo los usuarios pueden solicitar presupuestos.');
   window.location.href = 'index.jsp';
 }
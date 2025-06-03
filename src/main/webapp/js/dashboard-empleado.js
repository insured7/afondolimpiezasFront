document.addEventListener('DOMContentLoaded', function() {
  var token = localStorage.getItem('authToken');

  if (!token) {
    alert('No has iniciado sesión.');
    window.location.href = 'login.jsp';
    return;
  }

  fetch('http://localhost:8080/dashboard/empleado', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(response) {
    if (!response.ok) throw new Error('No autorizado o error al obtener datos.');
    return response.json();
  })
  .then(function(data) {
    document.getElementById('nombreEmpleado').textContent = data.nombre || 'Empleado';
    document.getElementById('correoEmpleado').textContent = data.correo || 'No disponible';
	document.getElementById('direccionEmpleado').textContent = data.direccion || 'No disponible';
    document.getElementById('telefonoEmpleado').textContent = data.telefono || 'No disponible';
  })
  .catch(function(error) {
    alert('Error al cargar datos del empleado.');
    console.error(error);
  });
});

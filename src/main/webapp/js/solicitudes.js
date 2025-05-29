document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token'); // mi JWT para autorización

  function cargarSolicitudes() {
    fetch('http://localhost:8080/admin/', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('solicitudes-body');
      tbody.innerHTML = ''; // limpiar tabla

      data.forEach(sol => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${sol.id}</td>
          <td>${sol.usuario.nombre} ${sol.usuario.apellidos}</td>
          <td>${new Date(sol.fecha).toLocaleDateString()}</td>
          <td>${sol.estado}</td>
          <td>${sol.descripcion}</td>
          <td>
            <button class="btn btn-sm btn-primary btn-ver" data-id="${sol.id}">Ver</button>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${sol.id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-borrar" data-id="${sol.id}">Borrar</button>
          </td>`;
        tbody.appendChild(tr);
      });

      asignarEventos();
    })
    .catch(err => {
      console.error('Error al cargar solicitudes:', err);
      alert('Error al cargar solicitudes');
    });
  }

  function asignarEventos() {
    document.querySelectorAll('.btn-borrar').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id;
        if (confirm('¿Seguro que quieres borrar esta solicitud?')) {
          borrarSolicitud(id);
        }
      });
    });

    document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id;
        // Aquí puedes abrir modal o redirigir a página de edición
        window.location.href = `admin/solicitud/editar?id=${id}`;
      });
    });

    document.querySelectorAll('.btn-ver').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id;
        // Redirige a vista detalle
        window.location.href = `admin/solicitud/ver?id=${id}`;
      });
    });
  }

  function borrarSolicitud(id) {
    fetch(`http://localhost:8080/admin/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(response => {
      if (response.ok) {
        alert('Solicitud borrada');
        cargarSolicitudes(); // refrescar tabla
      } else {
        alert('Error al borrar solicitud');
      }
    })
    .catch(err => {
      console.error('Error al borrar:', err);
      alert('Error al borrar solicitud');
    });
  }

  // Inicializar carga
  cargarSolicitudes();
});

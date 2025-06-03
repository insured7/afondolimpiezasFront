document.addEventListener('DOMContentLoaded', function () {
  var token = localStorage.getItem('authToken');

  if (!token) {
    alert('No has iniciado sesión.');
    window.location.href = 'login.jsp';
    return;
  }

  // Obtener datos del usuario (nombre, correo, fotoPerfil)
  fetch('http://localhost:8080/dashboard/usuario', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(function (response) {
      if (!response.ok) throw new Error('No autorizado o error al obtener datos.');
      return response.json();
    })
    .then(function (data) {
      document.getElementById('nombreUsuario').textContent = data.nombre || 'Usuario';
      document.getElementById('correoUsuario').textContent = data.correo || 'No disponible';

      var imgFoto = document.getElementById('fotoPerfil');
      if (data.fotoPerfilUrl) {
        // Aquí asumimos que el backend sirve la imagen correctamente en /uploads/
        imgFoto.src = data.fotoPerfilUrl;
        imgFoto.alt = 'Foto de perfil de ' + data.nombre;
      } else {
        imgFoto.src = 'images/default-profile.png'; // foto por defecto local
        imgFoto.alt = 'Foto de perfil por defecto';
      }
    })
    .catch(function (error) {
      alert('Error al cargar datos del usuario.');
      console.error(error);
    });

  // Subir foto al servidor
  document.getElementById('formFotoPerfil').addEventListener('submit', function (e) {
    e.preventDefault();

    var archivo = document.getElementById('inputFoto').files[0];
    if (!archivo) {
      alert('Selecciona una imagen primero.');
      return;
    }

    var formData = new FormData();
    formData.append('file', archivo);

    fetch('http://localhost:8080/dashboard/usuario/foto', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Error al subir la foto');
        return res.text();
      })
      .then(function (msg) {
        alert(msg);
        location.reload();  // recarga para actualizar la imagen
      })
      .catch(function (err) {
        alert('Error al subir la foto: ' + err.message);
      });
  });

  // Cargar solicitudes del usuario y mostrarlas en la lista
  fetch('http://localhost:8080/dashboard/usuario/solicitudes', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener solicitudes');
      return res.json();
    })
    .then(data => {
      var listaSolicitudes = document.getElementById('listaServicios'); // El id en el HTML es listaServicios
      listaSolicitudes.innerHTML = '';

      if (data.length === 0) {
        var li = document.createElement('li');
        li.textContent = 'No hay solicitudes registradas.';
        listaSolicitudes.appendChild(li);
      } else {
        data.forEach(solicitud => {
          var li = document.createElement('li');
          li.textContent = solicitud.detalles || 'Solicitud sin descripción';
          listaSolicitudes.appendChild(li);
        });
      }
    })
    .catch(err => {
      console.error('Error al cargar solicitudes:', err);
    });

});

document.addEventListener('DOMContentLoaded', function() {
    var formulario = document.getElementById('form-registro');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Limpiar y validar teléfono
        let telefono = document.getElementById('telefono').value.trim().replace(/\D/g, '');
        if (telefono.length !== 9) {
            alert("El teléfono debe contener exactamente 9 dígitos numéricos.");
            return;
        }

        var datos = {
            nombre: document.getElementById('nombre').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            telefono: telefono,
            contrasenia: document.getElementById('contrasenia').value
        };

        fetch('http://localhost:8080/auth/registro-usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(function(respuesta) {
            if (respuesta.ok) {
                alert("Registro exitoso");
                window.location.href = "index.jsp";
            } else {
                respuesta.text().then(texto => {
                    alert("Error al registrar: " + texto);
                });
            }
        }).catch(function(error) {
            alert("Error de conexión con el servidor.");
            console.error(error);
        });
    });
});

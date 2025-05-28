document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('form-registro');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        var datos = {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            correo: document.getElementById('correo').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
            contrasenia: document.getElementById('contrasenia').value
        };

        fetch('http://localhost:8080/auth/registro-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }).then(function (respuesta) {
            if (respuesta.ok) {
                alert("Registro exitoso");
                window.location.href = "/index.html";
            } else {
                respuesta.json().then(function (error) {
                    alert("Error al registrar: " + (error.mensaje || "verifica los datos."));
                });
            }
        }).catch(function (error) {
            alert("Error de conexión con el servidor.");
            console.error(error);
        });
    });
});

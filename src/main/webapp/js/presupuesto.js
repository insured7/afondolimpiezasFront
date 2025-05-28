document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("presupuestoForm");
  var responseDiv = document.getElementById("responseMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var direccion = document.getElementById("direccion").value;
    var detalles = document.getElementById("detalles").value;
	var usuarioId = document.getElementById("usuarioId").value;

    var data = {
      nombre: nombre,
      direccion: direccion,
      detalles: detalles,
	  usuarioId: usuarioId
    };

    fetch("/solicitudes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Si estás autenticado, aquí iría también:
        // "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al enviar el presupuesto");
        }
      })
      .then(function (data) {
        responseDiv.innerHTML =
          '<div class="alert alert-success">Presupuesto enviado correctamente. ¡Gracias!</div>';
        form.reset();
      })
      .catch(function (error) {
        responseDiv.innerHTML =
          '<div class="alert alert-danger">Hubo un problema: ' + error.message + '</div>';
      });
  });
});

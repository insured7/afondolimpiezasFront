document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("presupuestoForm");
  var responseDiv = document.getElementById("responseMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var direccion = document.getElementById("direccion").value;
    var detalles = document.getElementById("detalles").value;

    var data = {
      nombre: nombre,
      direccion: direccion,
      detalles: detalles
    };

    fetch("http://localhost:8080/solicitudes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken")
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      if (response.ok) {
        return response.text().then(text => text ? JSON.parse(text) : {});
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

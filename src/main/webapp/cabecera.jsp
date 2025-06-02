<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

<header class="container-fluid bg-success text-white py-3">
  <div class="d-flex align-items-center justify-content-between flex-wrap">
    <div class="d-flex align-items-center">
      <img src="static/img/AFondoLogo.png" alt="Logo" class="img-fluid" style="height: 100px; width: 180px;" />
    </div>
    <div>
      <h4 class="ms-3 mb-0 fw-bold text-center w-100"
          style="display: flex; align-items: center;justify-content: center; flex-direction: column;">
        A FONDO LIMPIEZAS
      </h4>
    </div>
    <nav class="d-flex gap-2 mt-3 mt-md-0">
      <button class="btn btn-light fw-bold"  onclick="navigateTo('index.jsp')">Inicio</button>
      <button class="btn btn-light fw-bold" onclick="navigateTo('sobre-nosotros.jsp')">Sobre Nosotros</button>
      <button class="btn btn-light fw-bold" onclick="navigateTo('presupuesto-form.jsp')">Presupuesto</button>
      <button class="btn btn-light fw-bold" id="btnLogin" onclick="navigateTo('login.jsp')">Login</button>
      <button class="btn btn-danger fw-bold" id="btnLogout" style="display:none;">Logout</button>
    </nav>
  </div>
</header>

<script src="js/cabecera.js"></script>

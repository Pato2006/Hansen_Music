$(document).ready(function () {
  $("#login-btn").click(function () {
    str = `
    <main class="login">
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h4 class="text-white-50 mb-5 text-center">Bienvenido a</h4>
                    <img src="imagenes/svg/HasenLogin.svg" alt="" class="mb-5">
                    <p class="text-white-50 mb-5 text-center">Inicia Sesión</p>
                    <form action="" method="POST" id="form_login">
                      <div class="">
                        <div class="romero">
                          <p id="cambio" class="form-label" for="typeEmailX">Nombre de Usuario/Correo Electronico</p>
                        </div>
                        <input type="email" id="typeEmailX" class="form-control form-control-lg" style="width: 100%;" name="username" />
                      </div>
                      <div class="form-outline form-white mb-4 text-center">
                        <p id="cambio1" class="form-label santiaguinñ" for="typePasswordX">Contraseña</p>
                        <input type="password" id="typePasswordX" class="form-control form-control-lg" style="width: 100%;" name="password" />
                      </div>
                      <button class="btn-outline btn-lg px-5 ms-2" type="button" id="login">Iniciar sesión</button>
                    </form>
                  </div>
                  <div>
                    <p class="mb-0">¿No tienes una cuenta?
                      <a href="#" class="text-white-50 fw-bold" id=register onclick="registrarse()">Regístrate</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>`;
    $("#contenedor").html(str);

    $("#login").click(function () {
      $.ajax({
        url: "php/login.php",
        type: "POST",
        dataType: "text",
        data: $("#form_login").serialize(),
        async: false,
        success: function (response) {
          if (response == "admin") {
            alert("Hola admin");
            $("#navbar-zarpado").css("background-color", "gray");
            window.location.href = "index.php";
          } 
          else if(response == "user") {
            alert("Hola user");
            window.location.href = "index.php";
          } 
          else {
            var cambio = document.getElementById("cambio");
            var cambio2 = document.getElementById("cambio1");
            cambio.textContent = "Usuario/Correo Electrónico ❌";
            cambio2.textContent = "Contraseña ❌";
            alert("Inicio de sesión fallido");
          }
        },
        error: function () {
          alert("Algo salió mal");
        },
      });
    });
  });
});

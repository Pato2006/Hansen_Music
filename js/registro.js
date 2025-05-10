function registrarse() {
  str = `
  <main class="login">
  <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div class="card bg-dark text-white" style="border-radius: 1rem;">
                      <div class="card-body p-5 text-center">
                          <div class="mb-md-5 mt-md-4 pb-5">
                              <form action="" id="form_register" method="POST">
                                  <h4 class="text-white-50 mb-5">Bienvenido a</h4>
                                  <img src="imagenes/svg/HasenLogin.svg" alt="" class="mb-5">
                                  <p class="text-white-50 mb-5">Registrate</p>
                                  <div class="form-outline form-white mb-4">
                                      <p class="form-label" for="">Nombre de usuario</p>
                                      <input type="text" id="typeNameX" class="form-control form-control-lg"
                                          style="width: 380px;" name="username" />
                                  </div>
                                  <div class="form-outline form-white mb-4">
                                      <p class="form-label" for="">Nombre</p>
                                      <input type="text" id="typeNombreX" class="form-control form-control-lg"
                                          style="width: 380px;" name="name" />
                                  </div>
                                  <div class="form-outline form-white mb-4">
                                      <p class="form-label" for="">Apellido</p>
                                      <input type="text" id="typesurnameX" class="form-control form-control-lg"
                                          style="width: 380px;" name="surname" />
                                  </div>
                                  <div class="form-outline form-white mb-4">
                                      <p class="form-label" for="typeEmailX">Correo Electronico</p>
                                      <input type="email" id="typeEmailX" class="form-control form-control-lg"
                                          style="width: 380px;" name="mail" />
                                  </div>
                                  <div class="form-outline form-white mb-4">
                                      <p class="form-label" for="typePasswordX">Contraseña</p>
                                      <input type="password" id="typePasswordX"
                                          class="form-control form-control-lg" style="width: 380px;"
                                          name="password" />
                                  </div>
                                  <button class="btn-outline btn-lg px-5 ms-2" type="submit"
                                      id="registrarse">Registrar</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</main>
`
  $("#contenedor").html(str)
  $("#registrarse").click(function () {
    $.ajax({
      url: "php/register.php",
      type: "POST",
      dataType: "text",
      data: $("#form_register").serialize(),
      async: false,
      success: function (response) {
        if (response == "1") {
          alert("Registro Exitoso")
          //window.location.href = "index.php";
        }
        else {
          alert(response)
        }

      },
      error: function () {
        alert("MAL");
      },
    });
  })
}

$(document).ready(function () {
  $("#register").click(function (event) {
    event.preventDefault();
    registrarse(); // Llamando a la función registrarse
  });

})

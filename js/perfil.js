$(document).ready(function () {
  $("#perfil-btn").click(function () {
    $.ajax({
      url: "php/perfil.php",
      type: "POST",
      dataType: "json",
      async: false,
      success: function (data) {
        if (data.error) {
          alert(data.error);
          return;
        } else {
          str = `
            <main class="fondo-perfil">
                <section class="perfil-fondo">
                    <div class="perfil-foto">
                        <img src="imagenes/svg/person.svg" alt="" id="imagen_usuario">
                    </div>
                    <div class="perfil-informacion">
                        <label class="perfil" id="perfil"></label>
                        <label class="descripcion" id="correo"></label>
                        <label class="descripcion" id="residencia"></label>
                    </div>
                </section>
                <a href="#"><button type="button" class="btn btn-lg ms-5" id="mod-info">Modificar informacion</button></a>
                <button type="button" class="btn btn-danger m-4 p-2" id="borrar-cuenta">Borrar cuenta</button>
                <button type="button" class="btn btn-warning" id="cerrar-sesion">Cerrar Sesion</button>`;
          for (let i = 0; i < data.productos.length; i++) {
            str += `
                  <div class="perfil-envio">
                  <label class="envio_label">${data.productos[i].publication
              }</label>
                  </div>
              <section class="estado">
                  <div class="envio-estado-1" id="envio-estado-${(i * 3) + 1}">
                      <label for="envio">Despachado</label>
                  </div>
                  <div class="separador-1" id="separador_${(i * 3) + 1}"></div>
                  <div class="envio-estado-2" id="envio-estado-${(i * 3) + 2}">
                      <label for="envio">En envio</label>
                  </div>
                  <div class="separador-2" id="separador_${(i * 3) + 2}">
                  </div>
                  <div class="envio-estado-3" id ="envio-estado-${(i * 3) + 3}">
                      <label for="envio">Entregado</label>
                  </div>
              </section>`;
          }
          for (i = 0; i < data.ventas.length; i++) {
            str += `
              <div class="tarperpro-container">
              <img class="tarimg" src='imagenes/publicacion/${data.ventas_img[i]}'>
                  <div class="tarperpro-title">${data.ventas[i].name}</div>
                  <button type="button" class="btn btn-edito" id="botonedit" onclick="editarpubli(`+ data.ventas[i].id + `)"><img class="lapizz" src="imagenes/svg/lapiz.svg" alt=""></button>
                  <button type="button" class="btn btn-elim" id="" onclick="borrarpubli(`+ data.ventas[i].id + `)"><img class="borrer" src="imagenes/svg/basura.svg" alt=""></button>
          </div>
            `
          }
          //compras
          str += `</main>`;
          $("#contenedor").html(str);
          for (let i = 0; i < data.productos.length; i++) {
            switch (data.productos[i].status) {

              case '1':
                $(`#envio-estado-${(i * 3) + 1}`).css("background-color", "#FF0000");
                $(`#separador_${(i * 3) + 1}`).css("background-color", "#FF0000");
                break;
              case '2':
                $(`#envio-estado-${(i * 3) + 1}`).css("background-color", "FF0000");
                $(`#separador_${(i * 3) + 1}`).css("background-color", "#FF0000");
                $(`#envio-estado-${(i * 3) + 2}`).css("background-color", "#FF0000");
                $(`#separador_${(i * 3) + 2}`).css("background-color", "#FF0000");

                break;
              case '3':
                $(`#envio-estado-${(i * 3) + 1}`).css("background-color", "#FF0000");
                $(`#separador_${(i * 3) + 1}`).css("background-color", "#FF0000");
                $(`#envio-estado-${(i * 3) + 2}`).css("background-color", "#FF0000");
                $(`#separador_${(i * 3) + 2}`).css("background-color", "#FF0000");
                $(`#envio-estado-${(i * 3) + 3}`).css("background-color", "#FF0000");
                break;
              default:
                continue;
            }
          }
          var usuario = data[0];
          $("#perfil").html(usuario.username);
          $("#residencia").html(usuario.location);
          $("#correo").html(usuario.mail);
          if (data.imagenes[0]) {
            $("#imagen_usuario").attr("src", "imagenes/perfil/" + data.imagenes[0]);
          }
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
    $("#mod-info").click(function () {
      str = `
      <main class="fondo-perfil">
      <div class="perfil-fondo d-flex align-items-start">
          <form action="" id="form_actualizar" method="POST" enctype="multipart/form-data">
              <div class="row">
                  <div class="col-md-6">
                      <div class="perfil-foto">
                          <img src="imagenes/svg/person.svg" alt="" id="imagen_perfil"><br>
                          <div class="text-center ms-5 mt-4">
                              <input class="form-control" id="formFileLg" type="file" name="imagen" onchange="FotoPerfil()"><br>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="perfil-informacion">
                      <input type="text" class="descripcion" placeholder="Mail de contacto" id="mail" name="mail">
                      <input type="text" class="descripcion" placeholder="Direccion de casa" id="residencia" name="residencia">
                      <button type="button" class="btn btn-lg ms-5 mt-4" id="actualizar">Aceptar</button>
                    </div>
              </div>
          </form>
      </div>
  </main>
          `;
      $("#contenedor").html(str);
      $.ajax({
        url: "php/perfil.php",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
          $("#residencia").val(data[0].location);
          $("#mail").val(data[0].mail);
        },
      });
    });
    $("#borrar-cuenta").click(function () {
      var confirmacion = confirm("¿Quieres borrar tu cuenta?");
      if (confirmacion) {
        $.ajax({
          url: "php/borrar_cuenta.php",
          type: "POST",
          dataType: "json",
          async: false,
          success: function (data) {
            alert(data);
            window.location.href = "index.php";
          },
          error: function (error) {
            console.log(error);
          },
        });
      } else {
        return;
      }
    });
    $("#cerrar-sesion").click(function () {
      var confirmacion = confirm("¿Quieres cerrar sesion?");
      if (confirmacion) {
        $.ajax({
          url: "php/cerrar_sesion.php",
          type: "POST",
          dataType: "json",
          async: false,
          success: function (data) {
            alert(data);
            window.location.href = "index.php";
          },
          error: function (error) {
            alert(error);
          },
        });
      } else {
        return;
      }
    });

  });
});

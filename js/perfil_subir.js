$(document).ready(function () {
  $("#contenedor").on("click", "#actualizar", function () {
    if (document.getElementById("mail").value === "" || document.getElementById("residencia").value === "") {
      alert("Ingresa datos")
      return;
    }
    $.ajax({
      url: "php/perfil_subir.php",
      type: "POST",
      dataType: "text",
      data: $("#form_actualizar").serialize(),
      async: false,
      success: function (data) {
        alert(data)
        //window.location.href = "index.php";
      },
      error: function (data) {
        console.log(data)
        alert(data);
      },
    });
  })
})
function FotoPerfil() {
  form = document.getElementById("form_actualizar");
  imagenInput = document.getElementById("formFileLg");

  if (imagenInput && imagenInput.files.length > 0) {
    archivo = imagenInput.files[0];

    formData = new FormData(form);

    formData.append("nomb", archivo.name);
    formData.append("tipo", archivo.type);
    formData.append("tamaño", archivo.size);
    $.ajax({
      url: "php/perfil_subir_img.php",
      type: "POST",
      dataType: "text",
      data: formData,
      processData: false,
      contentType: false,
      async: false,
      success: function (data) {
        alert(data);
        $.ajax({
          url: "php/visualizar_img.php",
          type: "POST",
          dataType: "json",
          async: false,
          success: function (imagen) {
            var usuario = imagen[0];
            var nombreUsuario = usuario.name;
            var imagenes = imagen.imagenes;
            for (var i = 0; i < imagenes.length; i++) {
              var imagen = imagenes[i];
              if (nombreUsuario + ".png" === imagen) {
                var randomValue = new Date().getTime();
                var imageUrl = "imagenes/perfil/" + imagen + "?" + randomValue;
                $("#imagen_perfil").attr("src", imageUrl);
              }
            }
          },
          error: function (error) {
            alert(error)
          }
        })
      },
      error: function (data) {
        alert(data);
      },
    });
  } else {
    alert("Selecciona una imagen antes de enviar.");
  }
}
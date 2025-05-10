$(document).ready(function () {
    $.ajax({
        url: "PHP/imagen_index.php",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.imagen.length <= 0) {
                $("#person_img").attr("src", "imagenes/svg/person-check.svg");
            }
            else {
                $("#person_img").attr("src", "imagenes/perfil/" + data.imagen[0]);
            }
        },
        error: function (error) {
        }
    });
    // Productos borrar imagenes
    $('#borrar').click(function () {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            var currentImage = carouselImages.eq(currentImageIndex);
            currentImage.attr('src', 'img-svg/plus-lg.svg');
            $('#inputGroupFile01').val('');
        }
    });
})

// Elegir Opcion Input 
function seleccionarOpcion(categoria, opcion_input, opcion_mostrar) {
    var dropdown = document.getElementById(`${categoria}Dropdown`);
    var input = document.getElementById(`${categoria}_seleccionado`);

    dropdown.innerHTML = opcion_mostrar;
    input.value = opcion_input;

    // Agrega una condición para manejar el tipo (en este caso, la marca)
}

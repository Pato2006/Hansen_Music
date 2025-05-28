$(document).ready(function () {
    $.ajax({
        url: "PHP/roles_id.php",
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data.roles);
            if (data.roles == 2) {
                // Nada por ahora
            }
            else if (data.roles == 1) {
                if ($('#contenedor').css('display') === 'none') {
                    $('#contenedor').css('display', 'block');
                }

                if ($('#contenedor').css('display') === 'block') {
                    var str = `
        <main class="products">
            <div class="tarjetas-container">
                <a href="#" class="articulos">
                    <div class="contenido tarjeta-blanca">
                        <div class="foto">
                            <img src="img/guitarra.jpg" alt="instrumento">
                        </div>
                        <div class="info-texto">
                            <h3>Fender Stratocaster</h3>
                            <p><strong>Marca:</strong> Fender</p>
                            <p><strong>Precio:</strong> $1200</p>
                            <p><strong>Publicado:</strong> 04/08/2024</p>
                            <p><strong>Usuario:</strong> skibidi_07</p>
                        </div>
                        <div class="icono-svg" id="boton_reporte">
                            <img src="img-svg/santi2.svg" alt="alerta" style="width:50px; height: 50px;">
                        </div>
                    </div>
                </a>
            </div>
        </main>
        `;
                    $("#contenedor").html(str);

                    $("#buscador").css('display', 'none');
                    $("#vende-btn").css("display", "none")
                    $("#busqueda").css("display", "none")
                    $("#navbar-zarpado").css("background-color", "gray");

                    // Listener para el botón de reporte
                    $("#boton_reporte").on("click", function () {
                        $.ajax({
                            url: "PHP/reportes.php",
                        })

                    });
                }
            }
        },
        error: function (data) {
            console.log("Error: " + data.status + " " + data.statusText);
        }
    });
});

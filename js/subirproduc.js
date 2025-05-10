
$(document).ready(function () {
    $("#vende-btn").click(function (e) {

        $.ajax({
            url: "php/prohibicion.php", // Ruta para verificar la sesión
            type: "POST",
            dataType: "json",
            success: function (secion) {
                if (secion.estado === "activo") {
                    // La sesión está activa, continuar con la construcción de la página
                    hacerPag();
                } else {
                    // La sesión no está activa, mostrar un alert
                    alert("Debes estar logeado para vender un producto");
                }
            },
            error: function () {
                // Error al verificar la sesión, manejar según sea necesario
                alert("Debes iniciar secion para vender un producto");
            }
        });

        function hacerPag() {
            e.preventDefault()
            $.ajax({
                url: "php/buscado.php",
                type: "POST",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    str = `
                        <main class="fondo-black">
                        <div class="container">
                            <div class="fondo-contenido d-flex align-items-start justify-content-center">
                                <form action="#" method="POST" id="form_subir">
                                    <section class="subir-producto">
                                            <img id="imagenSeleccionada" class="subir-imagen" src="./imagenes/svg/plus-lg.svg" alt="Imagen seleccionada">
                                            <div class="subir-imagen-input mb-3 text-center">
                                               <input type="file" class="form-control" name="img_producto" id="inputGroupFile01" onchange="Fotopubli()">
                                            </div>
                                            <div class="eliminar-imagen">
                                                <button type="button" class="btn-lg" id="borrar" onclick="Borrarimgpubli()">Borrar imagen actual</button>
                                            </div>
                                        <div class="subir-titulo">
                                            <div class="mb-3 align-items-center">
                                                <section class="rounded">
                                                    <input type="text" class="form-control form-control-lg"
                                                        placeholder="nombre del producto" id="nombre_producto" name="nombre">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-descripcion ml-4">
                                            <div class="input-group input-group-lg mb-3 align-items-center ">
                                                <section class="rounded">
                                                    <input type="text" class="form-control form-control-lg"
                                                        placeholder="Descripcion del producto" id="descrip_producto" name="descripcion">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-filtros mb-5 me-auto">
                                            
                                            <div class="input-group">
                                                <button id="estadoDropdown" class="btnsub btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Estado</button>
                                                <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('estado', 'Nuevo','Nuevo')">Nuevo</a></li>
                                                <li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('estado', 'Usado','Usado')">Usado</a></li>
                                                </ul>
                                                <input type="hidden" name="estado_selec" id="estado_seleccionado" name="estado">
                                            </div>
                                            <div class="input-group">
                                                <button id="typeDropdown" class="btnsub btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Tipo de instrumento</button>
                                                <ul class="dropdown-menu">`
                    $.each(data["types"], function (index, type) {
                        str += `<li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('type', '${type.id}', '${type.name}')">${type.name}</a></li>`;
                    });
                    str +=  `</ul>
                                                                                               
                                            </ul>
                                                <input type="hidden" name="type_selec" id="type_seleccionado">
                                            </div>
                                            <div class="input-group">
                                                

                                                    <div class="input-group">
                                                <button id="productDropdown" class="btnsub btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">producto</button>
                                                <ul class="dropdown-menu">
                                                `
                    $.each(data["products"], function (index, product) {
                        str += `<li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('product', '${product.id}', '${product.name}')">${product.name}</a></li>`;
                    });
                    str += `</ul>
                                            
                                                <input type="hidden" name="product_selec" id="product_seleccionado" >
                                            </div>
                                            </div>
                                        
                                        
                                            <div class="input-group">
                                                <button id="sendDropdown" class="btnsub btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Entrega</button>
                                                <ul class="dropdown-menu">
                                                `
                    $.each(data["sends"], function (index, send) {
                        str += `<li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('send', '${send.id}', '${send.name}')">${send.name}</a></li>`;
                    });
                    str += `</ul>
                                                <input type="hidden" name="send_selec" id="send_seleccionado">
                                                
                                            </div>
                                            <div class="input-group">
                                            <div class="d-flex-normal justify-content-center align-items-center">
                                            <button class="subir_boto" type="button" id="subirM">Subir Modelo</button>
                                            </div>
                                          </div>
                                            
                                        </div>
                                        <div class="subir-precio">
                                            <div class="input-group input-group-lg mb-3 align-items-center">
                                                <section class="rounded">
                                                    <input type="number" class="form-control form-control-lg" placeholder="Precio"
                                                        id="precio" name="precio">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-boton d-flex-normal justify-content-center align-items-center">
                                            <button class="w-100 h-100" type="submit" id="subir_prod">Subir</button>
                                        </div>
                                    </section>
                                </form>
                            </div>
                        </div>
                        </main>`;
                    $("#contenedor").html(str)
                    $("#form_subir").submit(function (event) {
                        event.preventDefault();
                        var formData = new FormData(this);
                        $.ajax({
                            url: "php/subir_produc.php",
                            type: "POST",
                            dataType: "text",
                            data: formData,
                            contentType: false,
                            processData: false,
                            success: function (asd) {
                                console.log(formData);
                                alert(asd);
                                window.location.href = "index.php";
                            }
                        });
                    });
                }
            });
        }

    });
});



function Fotopubli() {
    var input = document.getElementById("inputGroupFile01");
    var imagenSeleccionada = document.getElementById("imagenSeleccionada");

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imagenSeleccionada.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function Borrarimgpubli() {
    var imagenSeleccionada = document.getElementById("imagenSeleccionada");
    var inputImgProducto = document.getElementById("inputGroupFile01");

    // Limpia la imagen al hacer clic en "Borrar imagen actual"
    imagenSeleccionada.src = "";

    // Borra el valor del input img_producto
    inputImgProducto.value = "";
}


$(document).on('click', '#subirM', function () {
    subirM();
    $(document).on('submit', '#form_model', function (e) {
        console.log("Funca")
        e.preventDefault();
        formData = new FormData(this);
        modelo = $("#nombre_modelo").val().trim()

        orientacion = $("#orientacion_seleccionado").val().trim()

        marca = $("#marca_seleccionado").val().trim()

        tipo = $("#tipo_seleccionado").val().trim()

        if (modelo === '') {
            alert("Por favor, ingrese un modelo válido.");
            return;
        }
        if (marca === 'Marca') {
            alert("Por favor, ingrese una marca.");
            return;
        }
        if (orientacion === 'Orientación') {
            alert("Por favor, ingrese una orientacion.");
            return;
        }

        // Si pasa la validación, continuar con el envío del formulario
        $.ajax({
            url: "php/subir_model.php",
            type: "POST",
            dataType: "json",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(formData);
                console.log(data);
                alert(data.message);
            }
        });
    });
})


//Funcion para crear la pagina subir modelo
function subirM() {
    $.ajax({
        url: "php/buscado.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data);
            str2 = ""
            str2 =
                `<main class="fondo-model">
                    <div class="container">
                        <div class="fondo-contenidomodel d-flex align-items-start justify-content-center">
                            <form action="" method="POST" id="form_model">
                                <section class="subir-productomodel">
                                    <div class="subir-titulo">
                                        <div class="mb-3 align-items-center">
                                            <section class="rounded">
                                                <input type="text" class="modelbusq" placeholder="Nombre de modelo" id="nombre_modelo" name="nombre">
                                            </section>
                                        </div>
                                    </div>
                                    <div class="subir-filtrosmodel mb-5 me-auto">
                                        <div class="input-group">
                                            <button id="marcaDropdown" class="btnmo dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Marca</button>
                                            <ul class="dropdown-menu">`
            $.each(data["brands"], function (index, brands) {

                str2 += `<li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('marca', '${brands.id}', '${brands.name}')">${brands.name}</a></li>`

            });
            str2 += ` </ul>
                                            <input type="hidden" name="marca_selec" id="marca_seleccionado" value="Marca">
                                        </div>
                                        <div class="input-group">
                                            <button id="orientacionDropdown" class="btnmo dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Orientación</button>
                                            <ul class="dropdown-menu">`
            $.each(data["orientations"], function (index, orientations) {

                str2 += `<li><a class="dropdown-item" href="#" onclick="seleccionarOpcion('orientacion', '${orientations.id}', '${orientations.name}', 'orientacion')">${orientations.name}</a></li>`

            });
            str2 += ` </ul>
                                            <input type="hidden" name="orientacion_selec" id="orientacion_seleccionado" value="Orientación">
                                        </div>
                                    <div class="subir-envio">
                                    </div>
                                    </div>
                                    <div class="subir-botonmodel d-flex-normal justify-content-center align-items-center">
                                        <button class="btn w-100 h-100" type="submit" id="subir_model">Subir</button>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </div>
                </main>`
            $("#contenedor").html(str2);
        }
    })
}

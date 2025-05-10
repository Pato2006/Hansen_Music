var contenido = {};
function editarpubli(id) {
    var idpubli = id;
    $.ajax({
        url: "php/idpubli.php",
        type: "POST",
        dataType: "json",
        data: { idpubli: idpubli },
        async: false,
        success: function (data1) {
            check = true;
            contenido = data1;
           
            hacerPag_MOD();
            mostrarImagen();
            console.log(contenido);

        }
    });
}
function hacerPag_MOD() {
    var datoproducto = 0;
    var datosend = 0;
    $.ajax({
        url: "php/buscado.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
           
            str = `
                <main class="fondo-black">
                <div class="container">
                    <div class="fondo-contenido d-flex align-items-start justify-content-center">
                        <form action="#" method="POST" id="form_modif">
                            <section class="subir-producto">
                                    <img id="imagenSeleccionada" class="subir-imagen" src='imagenes/publicacion/${contenido.id}.png' alt="Imagen seleccionada">
                                    <div class="subir-imagen-input mb-3 text-center">
                                       <input type="file" class="form-control" name="img_producto" id="inputGroupFile01" onchange="Fotopubli()">
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
                                    <button class="btn w-100 h-100" type="submit" id="subir_prod">Subir</button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
                </main>`;
                for (var key in data.products) {
                    if (data.products.hasOwnProperty(key)) {
                        var product = data.products[key];
                        if (product.id == contenido.product_id) {
                            datoproducto = product.name;
                            console.log(datoproducto);
                        }
                    }
                }
                
                for (var key in data.sends) {
                    if (data.sends.hasOwnProperty(key)) {
                        var send = data.sends[key];
                        if (send.id == contenido.send_id) {
                            datosend = send.name;
                            console.log(datosend);
                        }
                    }
                }
            $("#contenedor").html(str)
            console.log(data);
            if(check){
                $("#nombre_producto").val(contenido.name);
                $("#descrip_producto").val(contenido.description);
                $("#precio").val(contenido.price);    
                if (contenido.state) {
                    seleccionarOpcion('estado', contenido.state, contenido.state);
                }
                if (contenido.product_id) {
                    seleccionarOpcion('product', contenido.product_id, datoproducto); // Supongo que name es el nombre del producto
                }
                if (contenido.send_id) {
                    seleccionarOpcion('send', contenido.send_id, datosend); // Supongo que name es el nombre del envío
                }        
            }

            $("#form_modif").submit(function (event) {
                event.preventDefault();
                var formData = new FormData(this);
                formData.append('id', contenido.id);
                $.ajax({
                    url: "php/editar_publi.php",
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
            })
        }
    });
}


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

function mostrarImagen() {
    var urlImagen = `imagenes/publicacion/${contenido.id}.png`;
    
    // Ajustar el valor del input al nombre de la imagen
    $("#inputGroupFile01").val(urlImagen);
}
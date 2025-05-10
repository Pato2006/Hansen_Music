<?php
require_once("env.php");

$name_producto = $_POST['nombre'];
$descripcion_producto = $_POST['descripcion'];
$estado = $_POST['estado_selec'];
$producto = $_POST['product_selec'];
$tipo = $_POST['type_selec'];
$entrega = $_POST['send_selec'];
$precio = $_POST['precio'];
session_start();

// Subir la foto del producto
$nombre_archivo = "";
$tipo_archivo = "";
$tamaño_archivo = 0;
$archivo_temporal = "";

if (isset($_FILES['img_producto']) && $_FILES['img_producto']['name'] != "") {
    $nombre_archivo = $_FILES['img_producto']['name'];
    $tipo_archivo = $_FILES['img_producto']['type'];
    $tamaño_archivo = $_FILES['img_producto']['size'];
    $archivo_temporal = $_FILES['img_producto']['tmp_name'];
}

// Confirmar sesión e identificar usuario
if (isset($_SESSION['username']) && $_SESSION['username'] != "") {
    $sql1 = "SELECT id FROM users WHERE username = ?";
    $stmt = mysqli_prepare($con, $sql1);
    mysqli_stmt_bind_param($stmt, "s", $_SESSION['username']);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    if ($resultado && $datos = mysqli_fetch_assoc($resultado)) {
        $vendedor = $datos['id'];

        // Validar datos del producto
        if ($name_producto != "" && $descripcion_producto != "" && $estado != "" && $producto != "" && $entrega != "" && $precio != "" && $tipo != "") {
            if ($nombre_archivo != "" && $tipo_archivo != "") {
                if (strpos($tipo_archivo, 'png') !== false || strpos($tipo_archivo, 'jpg') !== false || strpos($tipo_archivo, 'jpeg') !== false) {
                    
                    // Subir publicación
                    $sql2 = "INSERT INTO publications (seller_id, product_id, name, description, price, state, type_id, send_id) 
                             VALUES ('$vendedor', '$producto', '$name_producto', '$descripcion_producto', '$precio', '$estado', '$tipo', '$entrega')";
                    $result2 = mysqli_query($con, $sql2);

                    if ($result2) {
                        require_once("subir_produc_img.php");
                        echo '"Gracias por publicar su producto"';
                    } else {
                        echo "Algo salió mal al guardar en la base de datos.";
                    }

                } else {
                    echo "El archivo debe ser png, jpg o jpeg.";
                }
            } else {
                echo "No se puede hacer una publicación sin foto.";
            }
        } else {
            echo "Por favor, completa todos los campos.";
        }
    } else {
        echo "Error al obtener el ID del usuario.";
    }
} else {
    echo "Necesitas iniciar sesión para subir publicaciones.";
}

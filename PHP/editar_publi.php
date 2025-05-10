<?php
include_once("env.php");

$name_producto = $_POST['nombre'];
$descripcion_producto = $_POST['descripcion'];
$estado = $_POST['estado_selec'];
$producto = $_POST['product_selec'];
$entrega = $_POST['send_selec'];
$precio = $_POST['precio'];
$id = $_POST['id'];

$nombre_archivo = $_FILES['img_producto']['name'];
$tipo_archivo = $_FILES['img_producto']['type'];
$tamaño_archivo = $_FILES['img_producto']['size'];
$archivo_temporal = $_FILES['img_producto']['tmp_name'];

if ($name_producto != "" && $descripcion_producto != ""  && $estado != "" && $producto != "" && $entrega != "" && $precio != "") {
    $sql = "UPDATE publications
            SET product_id = '$producto',
                name = '$name_producto',
                description = '$descripcion_producto', 
                price = '$precio', 
                state = '$estado', 
                send_id = '$entrega' 
            WHERE id ='$id'";
$result = mysqli_query($con, $sql);
    $rutaAntigua = "../imagenes/publicacion/" . $id . ".png";
    $rutaNueva = "../imagenes/publicacion/" . $id . ".png";
    if ($nombre_archivo != "" && $tipo_archivo != "") {
        // Verifica si el archivo antiguo existe y lo borra
        if (file_exists($rutaAntigua)) {
            unlink($rutaAntigua);
        }

        // Mueve el nuevo archivo a la ubicación deseada
        if (move_uploaded_file($archivo_temporal, $rutaNueva)) {
            echo "La imagen se ha subido correctamente.";
        } else {
            echo "Hubo un problema al subir la imagen.";
        }
    }

    // Ejecuta la consulta SQL
    // Asegúrate de utilizar algún método para ejecutar la consulta, dependiendo del acceso a la base de datos que estés utilizando
} else {
    echo "Por favor no dejar campos sin completar";
}

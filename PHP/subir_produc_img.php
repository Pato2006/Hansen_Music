<?php
require_once("env.php");

// Obtener información del archivo
$nombre_archivo = $_FILES['img_producto']['name'];
$tipo_archivo = $_FILES['img_producto']['type'];
$tamaño_archivo = $_FILES['img_producto']['size'];
$archivo_temporal = $_FILES['img_producto']['tmp_name'];

// Obtener el ID de la última publicación
$id_query = "SELECT id FROM publications ORDER BY id DESC LIMIT 1";
$id_result = mysqli_query($con, $id_query);
$id_row = mysqli_fetch_assoc($id_result);
$id = $id_row['id'];

if ($id_result) {
    // Validar el tipo de archivo
    

        $directorio_destino = '../imagenes/publicacion/';
        $ruta_imagen = $directorio_destino . $id . ".png";

        // Mover el archivo temporal al directorio de destino
        if (move_uploaded_file($archivo_temporal, $ruta_imagen)) {
            echo "El archivo ha sido cargado correctamente.";

        } else {
            echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
        }
    }
 else {
    echo "Error al obtener el ID de la última publicación.";
}
?>

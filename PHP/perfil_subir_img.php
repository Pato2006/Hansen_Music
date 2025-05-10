<?php
require_once("env.php");
session_start();

$name = $_SESSION['username'];
$tipo_imagen = $_POST['tipo'];
$tamaño_imagen = $_POST['tamaño'];
$temp_imagen = $_FILES['imagen']['tmp_name'];

$sql = "SELECT * FROM users WHERE name = '$name'";

if (mysqli_query($con, $sql)) {
    if (!(strpos($tipo_imagen, 'png') || strpos($tipo_imagen, 'jpg') || strpos($tipo_imagen, 'jpeg'))) {
        echo "La imagen no es .png o .jpg";
    } else {
        $directorio_destino = '../imagenes/perfil/';
        $ruta_imagen = $directorio_destino . $name . ".png";
        if (rename($temp_imagen, $ruta_imagen)) {
            echo "El archivo ha sido cargado correctamente.";
        } else {
            echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
        }
    }
}

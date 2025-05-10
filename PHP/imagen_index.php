<?php
session_start();
$data = array();



if ($_SESSION['username']) {
    $imagenname = array();
    $directorio = '../imagenes/perfil/';
    $imagen_buscar = $_SESSION['username'] . ".png";
    $archivos = scandir($directorio);

    if ($archivos) {
        foreach ($archivos as $archivo) {
            if ($archivo == $imagen_buscar) {
                $imagenname[] = $archivo;
            }
        }
    }

    $data['imagen'] = $imagenname;
} else {
    $data['error'] = "No estás logeado";
}

// Devuelve los datos en formato JSON
echo json_encode($data);

<?php
require_once ("env.php");
session_start();
$name = $_SESSION['name'];
$sql = "SELECT name FROM users WHERE name = '$name'";
$result = mysqli_query($con, $sql);

if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
}

$imagenes = scandir('../imagenes/perfil/');
$imagenname = array();
foreach ($imagenes as $archivo) {
    if (pathinfo($archivo, PATHINFO_EXTENSION) === 'png') {
        $imagenname[] = $archivo;
    }
}
$data['imagenes'] = $imagenname;

echo json_encode($data);

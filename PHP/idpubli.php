<?php
require_once("env.php");
// Verifica si 'idpubli' está presente en la solicitud POST
if (isset($_POST["idpubli"])) {
    $idpubli = $_POST["idpubli"];

    // Consulta preparada
    $sql = "SELECT * FROM publications WHERE id = ?";

    // Prepara la consulta
    $stmt = mysqli_prepare($con, $sql);
    // Vincula el parámetro
    mysqli_stmt_bind_param($stmt, "i", $idpubli);

    // Ejecuta la consulta
    mysqli_stmt_execute($stmt);

    // Obtiene el resultado de la consulta
    $result = mysqli_stmt_get_result($stmt);

    // Convierte el resultado en un array asociativo
    $data = mysqli_fetch_assoc($result);

    // Cierra la consulta preparada
    mysqli_stmt_close($stmt);

    // Imprime el resultado en formato JSON
    echo json_encode($data);
} else {
    // Si 'idpubli' no está presente, devuelve un mensaje de error
    echo json_encode(array('error' => 'No se proporcionó el valor de idpubli'));
}



?>
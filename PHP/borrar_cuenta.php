<?php
require_once "env.php";
session_start();

$user = @$_SESSION['username'];
$borrar_img = "../imagenes/perfil/$user.png";

$data = [];

try {
    $sql = "DELETE FROM users WHERE username = '$user' OR mail = '$user'";
    $result = mysqli_query($con, $sql);

    if ($result) {
        $data[] = "Tu cuenta se borró satisfactoriamente";
        $_SESSION['username'] = "";

        if (file_exists($borrar_img)) {
            if (!unlink($borrar_img)) {
                $data[] = "No se pudo borrar la imagen de perfil.";
            }
        }
    } else {
        $data[] = "Error SQL: " . mysqli_error($con);
    }
} catch (mysqli_sql_exception $e) {
    $data[] = "Error MySQL: " . $e->getMessage();
}

mysqli_close($con);
echo json_encode($data);

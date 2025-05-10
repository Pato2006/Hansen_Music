<?php
require_once("env.php");
session_start();

$name = $_SESSION['username'];
$mail = $_POST['mail'];
$location = $_POST['residencia'];

if (filter_var($mail, FILTER_SANITIZE_EMAIL) == !$mail) {
    echo "No se admiten caracteres ilegales";
    exit;
}

if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
} else {
    echo ("Correo invalido");
    exit;
}

$sql = "SELECT * FROM users WHERE username = '$name'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    $sql_insert = "UPDATE users SET mail = '$mail', `location` = '$location' WHERE username = '$name'";
    if (mysqli_query($con, $sql_insert)) {
        echo "Actualizacion Exitosa";
    } else {
        echo "Hubo un error al modificar los datos: " . mysqli_error($con);
    }
    mysqli_close($con);
} else {
    echo "Error";
}

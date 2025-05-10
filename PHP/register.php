<?php
require_once("env.php");

// Obtener los valores del formulario
$username = $_POST["username"];
$surname = $_POST["surname"];
$user = $_POST["name"];
$mail = $_POST["mail"];
$contraseña = $_POST["password"];

// Verificar si los campos están vacíos
if ($username == "" || $user == "" || $surname == "" || $mail == "" || $contraseña == "") {
    echo "Ingresa todos los datos";
    exit;
}

// Validar el correo electrónico
if (filter_var($mail, FILTER_SANITIZE_EMAIL) == !$mail) {
    echo "No se admiten caracteres ilegales en el correo";
    exit;
}

if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    echo "Correo inválido";
    exit;
}

// Hash de la contraseña
$hash = password_hash($contraseña, PASSWORD_DEFAULT);

// Verificar si el nombre de usuario ya está registrado
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "Ese nombre de usuario ya está tomado, elige otro.";
    exit;
} else {
    // Insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO users (username, name, surname, mail, password,roles_id) 
            VALUES ('$username', '$user', '$surname', '$mail', '$hash',2)";
    $result = mysqli_query($con, $sql);
    mysqli_close($con);

    if ($result) {
        echo "1";  // Registro exitoso
    } else {
        echo "Algo falló al registrar el usuario";
    }
}
?>

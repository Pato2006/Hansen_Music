<?php
require_once ("env.php");
$user = $_POST["username"];
$contraseña = $_POST["password"];

$sql = "SELECT * FROM users WHERE username = '$user' OR mail = '$user'";
$result = mysqli_query($con, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    if ($row && password_verify($contraseña, $row['password'])) {
        session_start();
        $_SESSION['username'] = $row['username'];
        $_SESSION['role_id'] = $row['roles_id']; // Guardar el ID del rol en la sesión

        // Verificar el rol del usuario y devolver una respuesta al frontend
        $role = $row['roles_id'];
        if ($role == 1) {
            echo "admin"; // Si es admin, enviar 'admin' al frontend
        } else {
            echo "user"; // Si es usuario normal, enviar 'user' al frontend
        }
    } else {
        echo "Usuario o contraseña incorrectos";
    }
} else {
    echo "Error en la consulta";
}
?>

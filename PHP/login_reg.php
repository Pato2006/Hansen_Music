<?php
require_once  ("env.php");
$user = $_POST["username"];
$name = $_POST["name"];
$surname = $_POST["surname"];
$mail = $_POST["mail"];
$contraseña = $_POST["contraseña"];
$hash = password_hash($contraseña, PASSWORD_DEFAULT);
switch ($_POST["action"]) {
    case "login":
        $sql = "SELECT * FROM users";
        $result = mysqli_query($con, $sql);

        if ($result) {
            $data = array();

            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            // echo json_encode($data); para ver el array en json
        }
        mysqli_close($con);

        $contraseña_aparece = false;

        foreach ($data as $row) {
            if (password_verify($contraseña, $row['contraseña']) && $user == $row['username'] || $user == $row['mail']) {
                $contraseña_aparece = true;
                session_start();
                $_SESSION['username'] = $row['username'];
                break;
            }
        }

        if ($contraseña_aparece) {
            echo "1";
        } else {
            echo "Usuario o contraseña incorrectos";
        }
        break;
        case "registrarse":
        echo $name
        /*
        $sql = "INSERT INTO users (name, contraseña) VALUES ('$user', '$hash')";
        $result = mysqli_query($con, $sql);
        if ($result) {
            echo "1";
        } else {
            echo "Algo fallo";
        }
            */
        break;
}

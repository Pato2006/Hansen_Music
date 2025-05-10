<?php
require_once("env.php");
session_start();
$id = $_POST['id'];
date_default_timezone_set('America/Argentina/Buenos_Aires');

if (isset($_SESSION['username'])) {
    $user = $_SESSION['username'];

    // Obtener el ID del comprador
    $sql = "SELECT id FROM users WHERE username = '$user' OR mail = '$user'";
    $result = mysqli_query($con, $sql);
    $data = array();

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }

            $comprador = $data[0]['id'];

            // Obtener el seller_id y nombre del vendedor
            $sellerQuery = "
                SELECT publications.seller_id, users.username AS seller
                FROM publications
                INNER JOIN users ON users.id = publications.seller_id
                WHERE publications.id = '$id'
            ";
            $sellerResult = mysqli_query($con, $sellerQuery);

            if ($sellerResult && mysqli_num_rows($sellerResult) > 0) {
                $sellerData = mysqli_fetch_assoc($sellerResult);
                $sellerId = $sellerData['seller'];
                $sellerNumericId = $sellerData['seller_id'];

                // Verificar si el comprador es también el vendedor
                if ($comprador == $sellerNumericId) {
                    echo json_encode(["message" => "No puedes comprar tu propio producto"]);
                    exit;
                }
            } else {
                echo json_encode(["error" => mysqli_error($con)]);
                exit;
            }

            $fecha = date('Y-m-d H:i:s');

            // Registrar la compra
            $stmt = mysqli_prepare($con, "INSERT INTO buys (user_buyer_id, publication_id, status_id, purchase_date) VALUES (?, ?, 1, ?)");
            mysqli_stmt_bind_param($stmt, 'sss', $comprador, $id, $fecha);

            $result = mysqli_stmt_execute($stmt);

            if ($result) {
                echo json_encode([
                    "message" => "Gracias por tu compra",
                    "seller" => $sellerId
                ]);
            } else {
                echo json_encode(["error" => mysqli_error($con)]);
            }
        } else {
            echo json_encode(["error" => "No estás logeado"]);
        }
    } else {
        echo json_encode(["error" => mysqli_error($con)]);
    }
} else {
    echo json_encode(["message" => "No estás logeado"]);
    exit;
}
?>

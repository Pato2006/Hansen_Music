<?php
require_once("env.php");

$model = isset($_POST['nombre']) ? $_POST['nombre'] : '';

$brand = isset($_POST['marca_selec']) ? $_POST['marca_selec'] : '';

$orientation = isset($_POST['orientacion_selec']) ? $_POST['orientacion_selec'] : '';

$sql = "INSERT INTO products (name, brand_id, orientation_id) VALUES ('$model', '$brand', '$orientation')";

$result = mysqli_query($con, $sql);

$response = [
    'model' => $model,
    'brand' => $brand,
    'orientations' => $orientation,
];

if (!empty($model) && $brand != "Marca" && $orientation != "Orientación") {
    if ($result) {
        $response['message'] = "Gracias por subir su modelo";
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
<?php
require_once "env.php";

$texto = isset($_POST['texto_buscar']) ? $_POST['texto_buscar'] : '';
$marca = isset($_POST['marca']) ? $_POST['marca'] : '';
$orientacion = isset($_POST['orientacion']) ? $_POST['orientacion'] : '';
$estado = isset($_POST['estado']) ? $_POST['estado'] : '';
$from = isset($_POST['from']) ? $_POST['from'] : '';
$to = isset($_POST['to']) ? $_POST['to'] : '';

$sqlCount = "SELECT COUNT(*) AS total
    FROM publications
    INNER JOIN products ON publications.product_id = products.id
    INNER JOIN brands ON products.brand_id = brands.id
    INNER JOIN orientations ON products.orientation_id = orientations.id
    WHERE publications.name LIKE '%" . $texto . "%'";

if (!empty($marca)) {
    $sqlCount .= " AND brands.id = '$marca'";
}

if (!empty($from) && !empty($to)) {
    $sqlCount .= " AND publications.price BETWEEN '$from' AND '$to'";
} else if (!empty($from) && empty($to)) {
    $sqlCount .= " AND publications.price >= '$from'";
}

if (!empty($orientacion)) {
    $sqlCount .= " AND orientations.id = '$orientacion'";
}

if (!empty($estado)) {
    $sqlCount .= " AND publications.state = '$estado'";
}

$resultCount = mysqli_query($con, $sqlCount);

if (!$resultCount) {
    die("Error en la consulta para contar registros: " . mysqli_error($con));
}

$rowCount = mysqli_fetch_assoc($resultCount);
$totalCount = (int) $rowCount['total'];


?>

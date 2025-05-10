<?php
require_once "env.php";

$texto = isset($_POST['texto_buscar']) ? $_POST['texto_buscar'] : '';
$marca = isset($_POST['marca']) ? $_POST['marca'] : '';
$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
$orientacion = isset($_POST['orientacion']) ? $_POST['orientacion'] : '';
$estado = isset($_POST['estado']) ? $_POST['estado'] : '';
$from = isset($_POST['from']) ? $_POST['from'] : '';
$to = isset($_POST['to']) ? $_POST['to'] : '';
$page = isset($_POST['page']) ? $_POST['page'] : 1;
$publicationsPerPage = 6;
$offset = ($page - 1) * $publicationsPerPage;

// Consulta SQL con consultas preparadas
$sql = "SELECT publications.name, publications.state, publications.price, publications.id, products.name AS product, orientations.name AS orientation, brands.name AS brand
    FROM publications
    INNER JOIN products ON publications.product_id = products.id
    INNER JOIN brands ON products.brand_id = brands.id
    INNER JOIN orientations ON products.orientation_id = orientations.id
    WHERE publications.name LIKE ?";

$params = array("%$texto%");

if (!empty($marca)) {
    $sql .= " AND brands.id = ?";
    $params[] = $marca;
}

if (!empty($from) && !empty($to)) {
    $sql .= " AND publications.price BETWEEN ? AND ?";
    $params[] = $from;
    $params[] = $to;
} else if (!empty($from) && empty($to)) {
    $sql .= " AND publications.price >= ?";
    $params[] = $from;
}

if (!empty($orientacion)) {
    $sql .= " AND orientations.id = ?";
    $params[] = $orientacion;
}

if (!empty($estado)) {
    $sql .= " AND publications.state = ?";
    $params[] = $estado;
}

$sql .= " LIMIT ?, ?";
$params[] = $offset;
$params[] = $publicationsPerPage;

//Prepara la consulta
$stmt = mysqli_prepare($con, $sql);
if ($stmt === false) {
    die("Error en la preparación de la consulta: " . mysqli_error($con));
}

//Vincular parámetros
$types = str_repeat('s', count($params)); // 's' para cada parámetro, ajustar si es necesario
mysqli_stmt_bind_param($stmt, $types, ...$params);


$result = mysqli_stmt_execute($stmt);

if (!$result) {
    die("Error en la consulta principal: " . mysqli_error($con));
}

$resultSet = mysqli_stmt_get_result($stmt);

$publications = array();
while ($row = mysqli_fetch_assoc($resultSet)) {
    $publications[] = $row;
}

require_once "marcas.php";
require_once "orientaciones.php";
require_once "product.php";
require_once "sends.php";
require_once "types.php";

require_once "registros.php";

$response = [
    'brands' => $brands,
    'publications' => $publications,
    'orientations' => $orientations,
    'types' => $types,
    'products' => $products,
    'sends' => $sends,
    'registros' => $totalCount,
    'totalpages' => ceil($totalCount / $publicationsPerPage),
    'from' => $from,
    'to' => $to
];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
?>
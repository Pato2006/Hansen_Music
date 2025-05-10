<?php
require_once("env.php");
$id = $_POST['id'];
$sql = "SELECT publications.*, 
products.name AS product, 
brands.name AS brand, 
orientations.name AS orientation, 
sends.name AS sends,
users.username AS seller,
types.name AS type
FROM publications 
        LEFT JOIN users
        ON publications.seller_id = users.id
        INNER JOIN products
        ON products.id = publications.product_id
        INNER JOIN brands
        ON products.brand_id = brands.id
        INNER JOIN orientations
        ON orientations.id = products.orientation_id
        INNER JOIN sends
        ON publications.send_id = sends.id
        INNER JOIN types
        ON types.id = publications.type_id
        WHERE publications.id = $id

";
$result = mysqli_query($con, $sql);
if ($result) {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
}
$imagenes = scandir('../imagenes/publicacion/');
$imagenname = array();
foreach ($imagenes as $archivo) {
    if (pathinfo($archivo, PATHINFO_EXTENSION) === 'png') {
        $imagenname[] = $archivo;
    }
}
$data['imagenes'] = $imagenname;
echo json_encode($data);

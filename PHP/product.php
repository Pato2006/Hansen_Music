<?php 
require_once("env.php");
$sql = "SELECT * FROM products";
$result = mysqli_query($con, $sql);

if ($result) {
    $products = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $products[$row['id']] = $row;
    }
    //mysqli_close($con);

}
?>
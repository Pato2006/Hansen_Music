<?php
require_once("env.php");
$sql = "SELECT * FROM brands";
$result = mysqli_query($con, $sql);

if ($result) {
    $brands = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $brands[$row['id']] = $row;
    }
    //mysqli_close($con);

}

?>
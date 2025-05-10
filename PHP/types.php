<?php
require_once("env.php");
$sql = "SELECT * FROM types";
$result = mysqli_query($con, $sql);

if ($result) {
    $types = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $types[$row['id']] = $row;
    }
    //mysqli_close($con);

}

?>
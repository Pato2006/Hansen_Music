<?php
require_once("env.php");
$sql = "SELECT * FROM orientations";
$result = mysqli_query($con, $sql);

if ($result) {
    $orientations = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $orientations[$row['id']] = $row;
    }
    //mysqli_close($con);

}

?>
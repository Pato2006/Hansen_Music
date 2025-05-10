<?php 
require_once("env.php");
$sql = "SELECT * FROM sends";
$result = mysqli_query($con, $sql);

if ($result) {
    $sends = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $sends[$row['id']] = $row;
    }
    //mysqli_close($con);

}
?>
<?php
require_once  ("env.php");
$sql = "SELECT * FROM publications";
$result = mysqli_query($con,$sql);

if($result){
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
    echo json_encode($data);
}
?>
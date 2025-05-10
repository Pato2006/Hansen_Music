<?php
require_once("env.php");
session_start();
$username = @$_SESSION['username'];
$sql = "SELECT roles_id FROM users WHERE username = '$username'";
$result = mysqli_query($con, $sql);
$data["roles"] = array();
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data["roles"][] = $row['roles_id'];
    }
}
echo json_encode($data);


?>
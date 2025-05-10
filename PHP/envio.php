<?php 
require_once "env.php";
$sql = "SELECT * FROM `sends`";
$results = mysqli_query($con,$sql);
if($results){
    $envio = array();
    while($row = mysqli_fetch_assoc($results)){
        $envio [] = $row;
    }
}
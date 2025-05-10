<?php
include_once("env.php");
$id = $_POST['idpubli'];
$sql="DELETE FROM publications WHERE id = '$id'";
$result = mysqli_query($con, $sql);
$rutaborrar = "../imagenes/publicacion/" . $id . ".png";
if($result){
    echo json_encode("la publicacion ha sido borrada con éxito");
    if (file_exists($rutaborrar)) {
        unlink($rutaborrar);
    }
}else{
    echo "algo salio mal";
}
?>
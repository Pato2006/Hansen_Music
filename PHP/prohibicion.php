<?php
require_once("env.php");
session_start();

if (isset($_SESSION['username']) && $_SESSION['username'] != ""){
    $respuesta = array('estado' => 'activo', 'usuario_nombre' => $_SESSION['username']);
    echo json_encode($respuesta);
}

?>
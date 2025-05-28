<?php
require_once("env.php");

if (isset($_POST['id'])) {
    $publication_ID = $_POST['id'];
    $report_date = date('Y-m-d');

    // Preparar la consulta con mysqli procedimental
    $stmt = mysqli_prepare($con, "INSERT INTO reports (publication_id, report_date) VALUES (?, ?)");
    if ($stmt) {
        // Vincular parámetros: i = integer, s = string
        mysqli_stmt_bind_param($stmt, "is", $publication_ID, $report_date);

        // Ejecutar la consulta
        if (mysqli_stmt_execute($stmt)) {
            echo "Reporte insertado correctamente.";
        } else {
            echo "Error al ejecutar la consulta: " . mysqli_stmt_error($stmt);
        }

        // Cerrar la sentencia
        mysqli_stmt_close($stmt);
    } else {
        echo "Error en la preparación de la consulta: " . mysqli_error($con);
    }
} else {
    echo "No se recibió ningún id.";
}
?>

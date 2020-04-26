<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "eventos";
$usuario   = "root";
$password  = "";

// Recojo los datos de entrada
$idAct = $_POST["idAct"];
$nombreActividad = $_POST["nombreActividad"];
$tipoActividad = $_POST["tipoActividad"];
$direccionActividad = $_POST["direccionActividad"];
$fechaActividad = $_POST["fechaActividad"];
$horaActividad = $_POST["horaActividad"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "UPDATE `actividad` SET `nombre` = '".$nombreActividad."', `idTipo` = '".$tipoActividad."', `lugar` = '".$direccionActividad."', `fecha` = '".$fechaActividad."', `hora` = '".$horaActividad."' WHERE `actividad`.`idAct` = ".$idAct.";";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Modificación realizada";
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de modificación de la actividad: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>


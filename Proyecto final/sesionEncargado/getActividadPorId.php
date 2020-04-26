<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "eventos";
$usuario   = "root";
$password  = "";

$idAct = $_GET["idAct"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "SELECT * FROM `actividad` WHERE idAct = ".$idAct."";
$resultado = mysqli_query($conexion,$sql);
$fila = mysqli_fetch_assoc($resultado);

echo json_encode($fila);

mysqli_close($conexion);

?>
<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "eventos";
$usuario   = "root";
$password  = "";

$idAct = $_POST["idAct"];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

$sql = "DELETE FROM `actividad` WHERE `actividad`.`idAct` = ".$idAct."";
$resultado = mysqli_query($conexion,$sql);

if($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Se ha eliminado con éxito";
}else{
    $respuesta["mensaje"] = "Error en el proceso de borrado: ".mysqli_error($conexion);
    $respuesta["error"] = 1;
}

echo json_encode($respuesta);

mysqli_close($conexion);

?>
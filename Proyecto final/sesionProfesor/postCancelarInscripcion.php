<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "eventos";
$usuario   = "root";
$password  = "";

$idAct = $_POST["idAct"];
$dniProfe = $_POST["dniProfe"];


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "DELETE FROM `inscripcion` WHERE `inscripcion`.`dni` = '".$dniProfe."' AND `inscripcion`.`idAct` = ".$idAct."";
$resultado = mysqli_query($conexion,$sql);

if($resultado){
    //Enviar correo al usuario??
    $devolver["mensaje"] = "Has cancelado tu inscripción.";
}else{
    $devolver["mensaje"] = "Error: ".mysqli_error($conexion);
}

echo json_encode($devolver);

mysqli_close($conexion);

?>
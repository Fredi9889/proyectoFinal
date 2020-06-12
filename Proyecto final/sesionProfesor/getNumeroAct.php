<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";
$dniProfe = $_GET["dniProfe"];


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "select count(actividad.nombre) as suma from actividad inner join inscripcion on inscripcion.idAct = actividad.idAct inner join profesor on profesor.dni = inscripcion.dni where profesor.dni = '".$dniProfe."' ";
$resultado = mysqli_query($conexion,$sql);

$devolver =  mysqli_fetch_assoc($resultado);

echo json_encode($devolver);

mysqli_close($conexion);

?>
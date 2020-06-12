<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

$dniProfe = $_POST["dniProfe"];


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "select actividad.*, inscripcion.confirmado as confirmado from actividad inner join inscripcion on inscripcion.idAct = actividad.idAct inner join profesor on profesor.dni = inscripcion.dni where profesor.dni = '".$dniProfe."'";
$resultado = mysqli_query($conexion,$sql);

$arrayDatos = Array();
while($fila = mysqli_fetch_assoc($resultado)){
    $arrayDatos[] = $fila;
}
$respuesta["datos"] = $arrayDatos;
echo json_encode($respuesta);

mysqli_close($conexion);

?>
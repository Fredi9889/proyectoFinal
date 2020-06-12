<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

$idAct = $_POST["idAct"];
$dniProfe = $_POST["dniProfe"];


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "INSERT INTO `inscripcion` (`dni`, `idAct`, `fecha`, `confirmado`) VALUES ('".$dniProfe."', '".$idAct."', '".date("Y-m-d")."', '0');";
$resultado = mysqli_query($conexion,$sql);
$sql2 = "select count(actividad.nombre) as suma from actividad inner join inscripcion on inscripcion.idAct = actividad.idAct inner join profesor on profesor.dni = inscripcion.dni where profesor.dni = '".$dniProfe."' ";
$resultado2 = mysqli_query($conexion,$sql2);

if($resultado){
    $devolver["mensaje"] = "Se ha inscrito en la actividad. Para confirmar su asistencia vaya a 'Mis actividades'.";
    $devolver["datos"] =  mysqli_fetch_assoc($resultado2)["suma"];
}else{
    $devolver["mensaje"] = "Error: ya se ha inscrito en esa actividad.";
}

echo json_encode($devolver);

mysqli_close($conexion);

?>
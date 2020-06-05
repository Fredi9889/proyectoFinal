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

// Consulta SQL para obtener los datos
$sql = "SELECT a.idAct, a.nombre as nombreAct, i.confirmado, p.dni, p.nombre as nombreProf , p.apellidos, p.mail, p.colegio, c.nombre as nombreCuerpo from actividad a INNER JOIN inscripcion i on a.idAct = i.idAct INNER JOIN profesor p on i.dni = p.dni INNER JOIN cuerpoprofesor c on c.idCuerpo = p.idCuerpo where a.idAct = '".$idAct."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
while($fila = mysqli_fetch_assoc($resultados)){
    $arrayDatos[] = $fila;
}

echo json_encode($arrayDatos);

mysqli_close($conexion);
?>
<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

$idAct = $_GET["idAct"];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos
$sql = "SELECT a.idAct, a.nombre as nombreAct, i.confirmado, p.dni, p.nombre as nombreProf , p.apellidos, p.mail, p.colegio, c.nombre as nombreCuerpo from actividad a INNER JOIN inscripcion i on a.idAct = i.idAct INNER JOIN profesor p on i.dni = p.dni INNER JOIN cuerpoprofesor c on c.idCuerpo = p.idCuerpo where a.idAct = '".$idAct."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$arrayDatos = array();
while($fila = mysqli_fetch_assoc($resultados)){
    $arrayDatos[] = $fila;
}
if(count($arrayDatos) == 0){
    $sql1 = "SELECT a.idAct, a.nombre from actividad a where a.idAct = '".$idAct."'";
    $resultado = mysqli_query($conexion,$sql1) or die(mysqli_error($conexion));
    echo json_encode($f = mysqli_fetch_assoc($resultado));
}else{
    echo json_encode($arrayDatos);
}


mysqli_close($conexion);
?>
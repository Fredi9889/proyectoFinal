<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos
$sql = "select idCuerpo, nombre from cuerpoProfesor";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$arrayDatos = Array();
while($fila = mysqli_fetch_assoc($resultados)){
    $arrayDatos[] = $fila;
}
$respuesta["datos"] = $arrayDatos;



echo json_encode($respuesta);

mysqli_close($conexion);
?>
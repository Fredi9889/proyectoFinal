<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "eventos";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos
$sql = "select idTipo, nombre from tipoactividad";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$arrayDatos = Array();
while($fila = mysqli_fetch_assoc($resultados)){
    $arrayDatos[] = $fila;
}
$respuesta["datos"] = $arrayDatos;



echo json_encode($respuesta);

mysqli_close($conexion);
?>
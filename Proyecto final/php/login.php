<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

// Recojo los datos de entrada
$user = $_GET["usuario"];
$contrasena = $_GET["contrasena"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "SELECT * FROM `encargado` WHERE nombre = '".$user."' and contrasena ='".$contrasena."'";
$resultado = mysqli_query($conexion,$sql);

$sql2 = "SELECT * FROM `profesor` WHERE nombre = '".$user."' and contrasena ='".$contrasena."'";
$resultado2 = mysqli_query($conexion,$sql2);

if($fila = mysqli_fetch_assoc($resultado)){
    $respuesta["encargado"] = 1;
    $respuesta["datos"] = $fila;
}else if($fila = mysqli_fetch_assoc($resultado2)){
    $respuesta["profesor"] = 1;
    $respuesta["datos"] = $fila;
}
else{
    $respuesta["mensaje"] = "Usuario no reconocido";
}

echo json_encode($respuesta);

mysqli_close($conexion);

?>
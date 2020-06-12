<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

// Recojo los datos de entrada
$dni = $_POST["dni"];
$nombre = $_POST["nombre"];
$apellidos = $_POST["apellidos"];
$cuerpo = $_POST["cuerpo"];
$email = $_POST["email"];
$colegio = $_POST["colegio"];
$contrasena = $_POST["contrasena"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");


$sql = "INSERT INTO `profesor` (`dni`, `contrasena`, `idCuerpo`, `nombre`, `apellidos`, `mail`, `colegio`) VALUES ('".$dni."', '".$contrasena."', '".$cuerpo."', '".$nombre."', '".$apellidos."', '".$email."', '".$colegio."');";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada";
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>
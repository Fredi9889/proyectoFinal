<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "eventos";
$usuario   = "root";
$password  = "";

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


$sql = "UPDATE `profesor` SET `nombre` = '".$nombre."', `colegio` = '".$colegio."', `apellidos` = '".$apellidos."', `idCuerpo` = '".$cuerpo."', `mail` = '".$email."', `contrasena` = '".$contrasena."'  WHERE `profesor`.`dni` = '".$dni."'; ";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Datos guardados correctamente";
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error al gurdar los datos: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>
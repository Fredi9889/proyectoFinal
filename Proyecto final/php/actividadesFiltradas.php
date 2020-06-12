<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

$tipoAct = $_GET["tipoAct"];
$desde = $_GET["desde"];
$hasta = $_GET["hasta"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

if($desde != 0 && $hasta != 0 && $tipoAct != -1){
    $sql = "SELECT * FROM actividad a WHERE a.idTipo = '".$tipoAct."' AND a.fecha >= '".$desde."' AND a.fecha <= '".$hasta."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else if($desde != 0 && $hasta != 0){
    $sql = "SELECT * FROM actividad a WHERE a.fecha >= '".$desde."' AND a.fecha <= '".$hasta."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else if($tipoAct != -1 && $desde != 0){
    $sql = "SELECT * FROM actividad a WHERE a.idTipo = '".$tipoAct."' AND a.fecha >= '".$desde."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else if($tipoAct != -1 && $hasta != 0){
    $sql = "SELECT * FROM actividad a WHERE a.idTipo = '".$tipoAct."' AND a.fecha <= '".$hasta."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else if($desde != 0){
    $sql = "SELECT * FROM actividad a WHERE a.fecha >= '".$desde."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else if($hasta != 0){
    $sql = "SELECT * FROM actividad a WHERE a.fecha <= '".$hasta."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else if($tipoAct != -1){
    $sql = "SELECT * FROM actividad a WHERE a.idTipo = '".$tipoAct."' ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}else{
    $sql = "SELECT * FROM actividad ORDER BY fecha, hora";
    $resultado = mysqli_query($conexion,$sql);
}


$arrayDatos = Array();
while($fila = mysqli_fetch_assoc($resultado)){
    $datos[] = $fila;
}
$arrayDatos["datos"] = $datos;
echo json_encode($arrayDatos);

mysqli_close($conexion);

?>
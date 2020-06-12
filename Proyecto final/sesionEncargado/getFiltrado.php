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
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE t.idTipo = '".$tipoAct."' AND a.fecha >= '".$desde."' AND a.fecha <= '".$hasta."'";
    $resultado = mysqli_query($conexion,$sql);
}else if($desde != 0 && $hasta != 0){
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE a.fecha >= '".$desde."' AND a.fecha <= '".$hasta."'";
    $resultado = mysqli_query($conexion,$sql);
}else if($tipoAct != -1 && $desde != 0){
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE t.idTipo = '".$tipoAct."' AND a.fecha >= '".$desde."'";
    $resultado = mysqli_query($conexion,$sql);
}else if($tipoAct != -1 && $hasta != 0){
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE t.idTipo = '".$tipoAct."' AND a.fecha <= '".$hasta."'";
    $resultado = mysqli_query($conexion,$sql);
}else if($desde != 0){
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE a.fecha >= '".$desde."'";
    $resultado = mysqli_query($conexion,$sql);
}else if($hasta != 0){
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE a.fecha <= '".$hasta."'";
    $resultado = mysqli_query($conexion,$sql);
}else if($tipoAct != -1){
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo WHERE t.idTipo = '".$tipoAct."'";
    $resultado = mysqli_query($conexion,$sql);
}else{
    $sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo";
    $resultado = mysqli_query($conexion,$sql);
}


$datos = array();
while($fila = mysqli_fetch_assoc($resultado)){
    $datos[] = $fila;
}
echo json_encode($datos);

mysqli_close($conexion);

?>
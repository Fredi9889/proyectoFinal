<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

$sql = "SELECT a.idAct, a.nombre as nombreAct, t.nombre, a.lugar, a.fecha, a.hora FROM actividad a INNER join tipoactividad t on t.idTipo = a.idTipo";
$resultado = mysqli_query($conexion,$sql);

while($fila = mysqli_fetch_assoc($resultado)){
    $datos[] = $fila;
}
echo json_encode($datos);

mysqli_close($conexion);

?>
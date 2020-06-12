<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "sql103.epizy.com";
$basedatos = "epiz_25994339_eventos";
$usuario   = "epiz_25994339";
$password  = "05JSwZTZooLLw";

$tipoAct = $_GET["tipoAct"];
$fecha = $_GET["fecha"];
// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");
if($fecha == -1){
    $sql = "SELECT * FROM actividad  WHERE idTipo =".$tipoAct;
    $resultado = mysqli_query($conexion,$sql);
}
if($tipoAct == -1){
    if($fecha == 1){
        $sql = "SELECT * FROM actividad ORDER BY fecha, hora";
        $resultado = mysqli_query($conexion,$sql);
    }
    if($fecha == 2){
        $sql = "SELECT * FROM actividad ORDER BY fecha DESC, hora";
        $resultado = mysqli_query($conexion,$sql);
    }
}

if($tipoAct != -1 && $fecha != -1){
    if($fecha == 1){
        $sql = "SELECT * FROM actividad WHERE idTipo =".$tipoAct." ORDER BY fecha, hora";
        $resultado = mysqli_query($conexion,$sql);
    }else if($fecha == 2){
        $sql = "SELECT * FROM actividad WHERE idTipo =".$tipoAct." ORDER BY fecha DESC, hora";
        $resultado = mysqli_query($conexion,$sql);
    }
    
}

if($tipoAct == -1 && $fecha == -1){
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
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonProdServ = json_decode($json);

if (!$jsonProdServ) {
    exit("No hay datos para registrar");
}

$codigo_proser = $jsonProdServ->codigo_proser;
$categoria_proser = $jsonProdServ->categoria_proser;
$nombre_proser = $jsonProdServ->nombre_proser;
$descripcion_proser = $jsonProdServ->descripcion_proser;
$precio_proser = $jsonProdServ->precio_proser;
$cantidadfinal_proser = $jsonProdServ->cantidadfinal_proser;
$cantidad_proser = $jsonProdServ->cantidad_proser;

$query = "INSERT INTO productos_servicios (codigo_proser, categoria_proser, nombre_proser, descripcion_proser, precio_proser, cantidad_proser, cantidadfinal_proser)
VALUES('$codigo_proser','$categoria_proser', '$nombre_proser', '$descripcion_proser', '$precio_proser', '$cantidad_proser', '$cantidadfinal_proser')";

$insert = mysqli_query($con, $query);

echo json_encode($insert);
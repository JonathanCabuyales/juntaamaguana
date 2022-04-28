<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonProdServ = json_decode($json);

if (!$jsonProdServ) {
    exit("No hay datos para registrar");
}

$id_proser = $jsonProdServ->id_proser;
$codigo_proser = $jsonProdServ->codigo_proser;
$categoria_proser = $jsonProdServ->categoria_proser;
$nombre_proser = $jsonProdServ->nombre_proser;
$descripcion_proser = $jsonProdServ->descripcion_proser;
$precio_proser = $jsonProdServ->precio_proser;
$cantidad_proser = $jsonProdServ->cantidad_proser;
$cantidadfinal_proser = $jsonProdServ->cantidadfinal_proser;

$query = "UPDATE productos_servicios SET 
codigo_proser = '$codigo_proser', 
categoria_proser = '$categoria_proser', 
nombre_proser = '$nombre_proser', 
descripcion_proser = '$descripcion_proser', 
precio_proser = '$precio_proser', 
cantidad_proser = '$cantidad_proser',
cantidadfinal_proser = '$cantidadfinal_proser'
WHERE id_proser = $id_proser ";

$update = mysqli_query($con, $query);

header('Content-Type: application/json');
echo json_encode($update);
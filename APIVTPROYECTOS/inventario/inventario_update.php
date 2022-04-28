<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonInventario = json_decode($json);

if (!$jsonInventario) {
    exit("No hay datos para registrar");
}

$id_inv = $jsonInventario->id_inv;
$id_usuario = $jsonInventario->id_usuario;
$id_proser = $jsonInventario->id_proser;
$stockasignado_inv = $jsonInventario->stockasignado_inv;
$stockentregado_inv = $jsonInventario->stockentregado_inv;
$proyectos_inv = $jsonInventario->proyectos_inv;

$query = "UPDATE inventario_asignado SET 
id_usuario = '$id_usuario', 
id_proser = '$id_proser', 
stockasignado_inv = '$stockasignado_inv',
stockentregado_inv = '$stockentregado_inv',
proyectos_inv = '$proyectos_inv'
WHERE id_inv = $id_inv ";

$update = mysqli_query($con, $query);

header('Content-Type: application/json');
echo json_encode($update);
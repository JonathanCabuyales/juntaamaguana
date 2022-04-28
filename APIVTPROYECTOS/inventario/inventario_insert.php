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

$id_usuario = $jsonInventario->id_usuario;
$id_proser = $jsonInventario->id_proser;
$stockasignado_inv = $jsonInventario->stockasignado_inv;
$stockentregado_inv = $jsonInventario->stockentregado_inv;
$proyectos_inv = $jsonInventario->proyectos_inv;

$query = "INSERT INTO inventario_asignado (id_usuario, id_proser, stockasignado_inv, stockentregado_inv, proyectos_inv) 
VALUES ('$id_usuario', '$id_proser', '$stockasignado_inv', '$stockentregado_inv','$proyectos_inv')";

$insert = mysqli_query($con, $query);

class Result {}

$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response);
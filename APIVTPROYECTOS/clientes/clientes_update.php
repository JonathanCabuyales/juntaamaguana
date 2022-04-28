<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonCliente = json_decode($json);

if (!$jsonCliente) {
    exit("No hay datos para registrar");
}

$id = $jsonCliente->id_cli;
$nombres = $jsonCliente->nombres_cli;
$apellidos = $jsonCliente->apellidos_cli;
$ciruc = $jsonCliente->ciruc_cli;
$direccion = $jsonCliente->direccion_cli;
$email = $jsonCliente->email_cli;
$telefono = $jsonCliente->telefono_cli;


$query = "UPDATE clientes set nombres_cli = '$nombres', apellidos_cli = '$apellidos', ciruc_cli = '$ciruc', direccion_cli = '$direccion', email_cli = '$email', telefono_cli = '$telefono' 
WHERE id_cli = $id";
$update = mysqli_query($con, $query);

class Result {}

$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response);
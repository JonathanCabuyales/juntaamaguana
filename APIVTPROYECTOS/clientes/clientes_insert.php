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

$nombres = $jsonCliente->nombres_cli;
$apellidos = $jsonCliente->apellidos_cli;
$ciruc = $jsonCliente->ciruc_cli;
$direccion = $jsonCliente->direccion_cli;
$email = $jsonCliente->email_cli;
$telefono = $jsonCliente->telefono_cli;

$query = "INSERT INTO clientes (nombres_cli, apellidos_cli, ciruc_cli, direccion_cli, email_cli, telefono_cli) 
VALUES ('$nombres', '$apellidos', '$ciruc', '$direccion', '$email','$telefono')";

$insert = mysqli_query($con, $query);

class Result {}

$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response);
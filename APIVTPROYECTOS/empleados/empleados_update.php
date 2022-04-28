<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonEmpleado = json_decode($json);

if (!$jsonEmpleado) {
    exit("No hay datos para registrar");
}

$id_usuario = $jsonEmpleado->id_usuario;
$fotoperfil = $jsonEmpleado->fotoperfil;
$usuario = $jsonEmpleado->usuario;
$password = $jsonEmpleado->contrasenia;
$rol = $jsonEmpleado->rol;
$nombres = $jsonEmpleado->nombres;
$apellidos = $jsonEmpleado->apellidos;
$cedula = $jsonEmpleado->ciruc;
$direccion = $jsonEmpleado->direccion;
$telefono = $jsonEmpleado->telefono;
$email = $jsonEmpleado->email;
$tipocontrato = $jsonEmpleado->tipocontrato;
$sueldo = $jsonEmpleado->sueldo;

$query = "UPDATE usuarios set usuario = '$usuario', fotoperfil = '$fotoperfil',contrasenia = '$password', rol = '$rol', nombres = '$nombres', apellidos = '$apellidos' , ciruc = '$cedula', direccion = '$direccion', email = '$email', telefono = '$telefono', sueldo = '$sueldo', tipocontrato = '$tipocontrato'
WHERE id_usuario = $id_usuario";
$update = mysqli_query($con, $query);

class Result {}

$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response);
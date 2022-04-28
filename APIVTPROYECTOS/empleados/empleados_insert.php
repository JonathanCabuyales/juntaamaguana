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

$query = "INSERT INTO usuarios (fotoperfil,usuario, contrasenia, rol, nombres, apellidos, ciruc, direccion, email, telefono, sueldo, tipocontrato) 
VALUES ('$fotoperfil','$usuario', '$password', '$rol', '$nombres', '$apellidos', '$cedula', '$direccion', '$email', '$telefono', '$sueldo', '$tipocontrato')";

$insert = mysqli_query($con, $query);

header('Content-Type: application/json');
echo json_encode($insert);
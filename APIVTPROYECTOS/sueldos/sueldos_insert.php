<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');


include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonSueldo = json_decode($json);

if (!$jsonSueldo) {
    exit("No hay datos para registrar");
}

$id_usuario = $jsonSueldo->id_usuario;
$sueldo = $jsonSueldo->sueldo;
$diastrabajados = $jsonSueldo->diastrabajados;
$horasextras = $jsonSueldo->horasextras;
$calculo_horas = $jsonSueldo->calculo_horas;
$tipohoras = $jsonSueldo->tipohoras;
$bonostransporte = $jsonSueldo->bonostransporte;
$bonosalimentacion = $jsonSueldo->bonosalimentacion;
$otrosingresos = $jsonSueldo->otrosingresos;
$decimotercer = $jsonSueldo->decimotercer;
$decimocuarto = $jsonSueldo->decimocuarto;
$totalingresos = $jsonSueldo->totalingresos;
$iessindividual = $jsonSueldo->iessindividual;
$iesspatronal = $jsonSueldo->iesspatronal;
$iesstotal = $jsonSueldo->iesstotal;
$anticipos = $jsonSueldo->anticipos;
$prestamos_oficina = $jsonSueldo->prestamos_oficina;
$prestamo_hipotecario = $jsonSueldo->prestamo_hipotecario;
$prestamo_quirografario = $jsonSueldo->prestamo_quirografario;
$otrosegresos = $jsonSueldo->otrosegresos;
$total_egresos = $jsonSueldo->total_egresos;
$neto_recibir = $jsonSueldo->neto_recibir;
$aprobado = $jsonSueldo->aprobado;
$contrato = $jsonSueldo->contrato;
$actafiniquito = $jsonSueldo->actafiniquito;


$query = "INSERT INTO sueldos (
id_usuario, 
sueldo, 
diastrabajados,
horasextras,
calculo_horas,
tipohoras,
bonostransporte, 
bonosalimentacion,
otrosingresos,
decimotercer, 
decimocuarto, 
totalingresos, 
iessindividual, 
iesspatronal, 
iesstotal, 
anticipos, 
prestamos_oficina, 
prestamo_hipotecario, 
prestamo_quirografario,
otrosegresos, total_egresos, neto_recibir, contrato, aprobado, actafiniquito) 
VALUES ('$id_usuario', '$sueldo', '$diastrabajados', '$horasextras', '$calculo_horas', '$tipohoras','$bonostransporte', '$bonosalimentacion', '$otrosingresos','$decimotercer', '$decimocuarto', '$totalingresos', 
'$iessindividual', '$iesspatronal', '$iesstotal', '$anticipos', '$prestamos_oficina', '$prestamo_hipotecario', '$prestamo_quirografario',
'$otrosegresos','$total_egresos','$neto_recibir','$contrato', '$aprobado', '$actafiniquito')";

$sql = mysqli_query($con, $query);

echo json_encode($sql);
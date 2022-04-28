<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');


include ("../conexion/bd.php");

$json = file_get_contents('php://input');
 
$jsonDocumentos = json_decode($json);

if (!$jsonDocumentos) {
    exit("No hay datos para registrar");
}

$id_usuario = $jsonDocumentos->id_usuario;
$contrato_doc = $jsonDocumentos->contrato_doc;
$IESS_doc = $jsonDocumentos->IESS_doc;
$hojavida_doc = $jsonDocumentos->hojavida_doc;
$cedula_doc = $jsonDocumentos->cedula_doc;
$actafiniquito_doc = $jsonDocumentos->actafiniquito_doc;

$query = "INSERT INTO documentos (
id_usuario, 
contrato_doc, 
IESS_doc,
hojavida_doc,
cedula_doc,
actafiniquito_doc) 
VALUES ('$id_usuario', '$contrato_doc', '$IESS_doc', '$hojavida_doc', '$cedula_doc', '$actafiniquito_doc')";

$sql = mysqli_query($con, $query);

echo json_encode($sql);
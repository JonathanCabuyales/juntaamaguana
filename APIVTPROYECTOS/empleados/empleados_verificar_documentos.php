<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

include ("../conexion/bd.php");

$id_usuario = $_GET["id_usuario"];

$query = "SELECT * FROM documentos 
WHERE id_usuario = '$id_usuario'";

$data=array(); 

$get = mysqli_query($con, $query);
// // WHERE create_at BETWEEN '$fechaActual 00:00:00' AND '$fechaActual 23:59:59'
if ($get) {
    $array = array();
    while ($fila = mysqli_fetch_assoc($get) ) {	
        // echo json_encode($fila);
        $data[] = array_map('utf8_encode', $fila);
    }
}else{
    $data = null;
}

$res = $data;

echo json_encode($res); 
echo mysqli_error($con);
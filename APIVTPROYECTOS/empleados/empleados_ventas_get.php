<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

include ("../conexion/bd.php");


// $get = mysqli_query($con, "SELECT * FROM usuarios u, documentos d
// WHERE rol = 'empleado'
// AND u.id_usuario = d.id_usuario");

$get = mysqli_query($con, "SELECT * FROM usuarios
WHERE rol = 'VENTAS'");

$data = array();

if ($get) {
    $array = array();
    while ($fila = mysqli_fetch_assoc($get) ) {	
        // echo json_encode($fila);
        $data[] = array_map('utf8_encode', $fila);
    }
}else{
    echo "fallo no hay nada";
    $res = null;
    echo mysqli_error($con);
}

$res = $data;

echo json_encode($res); 
echo mysqli_error($con);
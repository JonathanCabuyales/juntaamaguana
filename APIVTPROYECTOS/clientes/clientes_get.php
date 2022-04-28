<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Esto le dice a PHP que usaremos cadenas UTF-8 hasta el final
mb_internal_encoding('UTF-8');
 
// Esto le dice a PHP que generaremos cadenas UTF-8
mb_http_output('UTF-8');

include ("../conexion/bd.php");

$query = "SELECT * FROM clientes";
$get = mysqli_query($con, $query);

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
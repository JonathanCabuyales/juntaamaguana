<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');


include ("../conexion/bd.php");

$query = "SELECT inv.id_inv, inv.id_proser, inv.id_usuario, nombres, apellidos, descripcion_proser, 
stockasignado_inv, stockentregado_inv, cantidad_proser, cantidadfinal_proser, categoria_proser, 
codigo_proser, nombre_proser, precio_proser, proyectos_inv
FROM inventario_asignado inv, usuarios usu, productos_servicios proser
WHERE usu.id_usuario = inv.id_usuario
AND proser.id_proser = inv.id_proser
ORDER BY inv.id_inv DESC";

$get = mysqli_query($con,$query);

if ($get) {
    $array = array();
    while ($fila = mysqli_fetch_assoc($get)) {	
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
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

include ("../conexion/bd.php");

$json = file_get_contents('php://input');

$jsonCompra = json_decode($json);

if (!$jsonCompra) {
    exit("No hay datos para registrar");
}

$tipocomprobante_com = $jsonCompra->tipocomprobante_com;
$proveedor_com = $jsonCompra->proveedor_com;
$proveedorciruc_com = $jsonCompra->proveedorciruc_com;
$direccionproveedor_com = $jsonCompra->direccionproveedor_com;
$emsion_com = $jsonCompra->emsion_com;
$registro_com = $jsonCompra->registro_com;
$serie_com = $jsonCompra->serie_com;
$autorizacionSRI_com = $jsonCompra->autorizacionSRI_com;
$vencimiento_com = $jsonCompra->vencimiento_com;
$comceptos_com = $jsonCompra->comceptos_com;
$formapago_com = $jsonCompra->formapago_com;
$iva_com = $jsonCompra->iva_com;
$ICE_com = $jsonCompra->ICE_com;
$devolucionIVA = $jsonCompra->devolucionIVA;
$costogasto_com = $jsonCompra->costogasto_com;

$query = "INSERT INTO compras (tipocomprobante_com, proveedor_com, proveedorciruc_com, direccionproveedor_com, emsion_com, registro_com, serie_com, autorizacionSRI_com, vencimiento_com, comceptos_com, formapago_com, iva_com, ICE_com, devolucionIVA, costogasto_com) 
VALUES ('$tipocomprobante_com', '$proveedor_com', '$proveedorciruc_com', '$direccionproveedor_com', '$emsion_com', '$registro_com', '$serie_com', '$autorizacionSRI_com', '$vencimiento_com', '$comceptos_com' ,'$formapago_com', '$iva_com', '$ICE_com', '$devolucionIVA', '$costogasto_com')";

$insert = mysqli_query($con, $query);

class Result {}

$response = new Result();
$response->resultado = 'OK';

header('Content-Type: application/json');
echo json_encode($response);
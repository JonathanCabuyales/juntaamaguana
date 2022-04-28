<?php
// $bd = "localhost";
// $contrasena = "";
// $usuario = "root";
// $nombre_base_de_datos = "vtproyectos";

$bd = "localhost";
$contrasena = "4956andres";
$usuario = "vtproy20_admincontable";
$nombre_base_de_datos = "vtproy20_contable";

// $con = new PDO('mysql:host=localhost;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
$con = mysqli_connect($bd, $usuario, $contrasena, $nombre_base_de_datos);

if(!$con){
    die("Connection Failed :". mysqli_connect_error());
}
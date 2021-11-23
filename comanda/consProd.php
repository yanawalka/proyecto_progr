<?php
date_default_timezone_set("America/Argentina/Salta");
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$cliente = (isset($_POST['cliente'])) ? $_POST['cliente'] : '';
$ventaproid = (isset($_POST['id'])) ? $_POST['id'] : '';
$ventaprecio = (isset($_POST['precio'])) ? $_POST['precio'] : '';
$ventacantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$ventaorden = (isset($_POST['orden'])) ? $_POST['orden'] : '';
$factura = (isset($_POST['factura'])) ? $_POST['factura'] : '';
$descuento = (isset($_POST['valordescuento'])) ? $_POST['valordescuento'] : '';
$subtotal = (isset($_POST['subtotal'])) ? $_POST['subtotal'] : '';
$total = (isset($_POST['total'])) ? $_POST['total'] : '';

switch($opcion){
    case 1: //alta
        $consulta = "SELECT fvid, pronombre FROM detallesventas, productos WHERE detallesventas.proid = productos.proid AND fvid IN ( SELECT MAX(fvid) FROM (SELECT fvid FROM facturasventas ORDER BY fvid DESC LIMIT 3) AS t )";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;

    case 2: //alta
        $consulta = "SELECT fvid, pronombre FROM detallesventas, productos WHERE detallesventas.proid = productos.proid AND fvid IN ( SELECT MAX(fvid)-1 FROM (SELECT fvid FROM facturasventas ORDER BY fvid DESC LIMIT 3) AS t )";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;  

    case 3: //alta
        $consulta = "SELECT fvid, pronombre FROM detallesventas, productos WHERE detallesventas.proid = productos.proid AND fvid IN ( SELECT MAX(fvid)-2 FROM (SELECT fvid FROM facturasventas ORDER BY fvid DESC LIMIT 3) AS t )";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;

    case 4: //alta
        
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
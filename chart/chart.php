<?php
date_default_timezone_set("America/Argentina/Salta");
include_once '../conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$desde = (isset($_POST['desde'])) ? $_POST['desde'] : '';
$hasta = (isset($_POST['hasta'])) ? $_POST['hasta'] : '';
$option = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

// Saldo de caja = Monto inicial + totting_cj – totegr_cj + movimientos
// switch($opcion){//Consulta por estado de caja
//     case 1:   
//     break;
// }


switch($option){
    case 'cliente': //alta
        $consulta = "SELECT cast(created_at as date), created_at, COUNT(*) as total from clientes WHERE created_at BETWEEN '$desde' AND '$hasta'  GROUP by created_at;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 'producto': //stock de los productos actuales
        $consulta = "SELECT pronombre as nombre, prostockactual as total from productos ORDER BY prostockactual ASC LIMIT 2;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;    
    case 'caja': //
        $consulta = "SELECT cast(cjfecha as date), cjfecha, cjtoting as total from cajas WHERE cjfecha BETWEEN '$desde' AND '$hasta'  GROUP by cjfecha;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;

        
        
   
}

// $consulta = "SELECT cast(created_at as date), created_at, COUNT(*) as total from clientes WHERE created_at BETWEEN '$desde' AND '$hasta'  GROUP by created_at;";
// $resultado = $conexion->prepare($consulta);
// $resultado->execute();        
// $data=$resultado->fetchAll(PDO::FETCH_ASSOC);


print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;

?>
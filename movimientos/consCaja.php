<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();
$date = 0;
// $consulta = "SELECT * FROM cajas";
// $resultado = $conexion->prepare($consulta);
// $resultado->execute();        
// $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$cjid = (isset($_POST['cjid'])) ? $_POST['cjid'] : '';
$cjmontoincial = (isset($_POST['cjmontoincial'])) ? $_POST['cjmontoincial'] : '';
$cjsaldo = (isset($_POST['cjsaldo'])) ? $_POST['cjsaldo'] : '';
$cjcierre = (isset($_POST['cjcierre'])) ? $_POST['cjcierre'] : '';

switch($opcion){//Consulta por estado de caja
    case 1:   
        $date = date("Y-m-d");
        // $date = '2021-11-01';
        $consulta = "SELECT * FROM cajas WHERE cjfecha = '$date'  ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        $numerito = count($data);
        if ($numerito == 0) {
            $consulta = "INSERT INTO cajas (cjfecha, cjmontoincial, cjcierre, cjsaldo, cjtoting, cjtotegr, cjfechahoracierre, empid) VALUES (current_date(),0 , 0 , 0 , 0 , 0 , 0 , 1);";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
        
            $date = date("Y-m-d");
            $consulta = "SELECT * FROM cajas WHERE cjfecha = '$date'  ";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();        
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        }
    
        break;
    
    case 2:    

        $consulta = "UPDATE cajas SET cjmontoincial = '$cjmontoincial', cjcierre = '$cjcierre', cjsaldo = '$cjsaldo'  WHERE cjid = '$cjid' ";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    
    case 3:  

        $consulta = "SELECT * FROM cajas";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}


print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
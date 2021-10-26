<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   
// $arrayObjeto = (isset($_POST['arrayObjeto'])) ? $_POST['arrayObjeto'] : '';
// echo $arrayObjeto[0]['nombre'];
// $id = (isset($_POST['id'])) ? $_POST['id'] : '';
// $idProd = (isset($_POST['idProd'])) ? $_POST['idProd'] : '';
// $codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
// $nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
// $idMarca = (isset($_POST['idMarca'])) ? $_POST['idMarca'] : '';
// $precio = (isset($_POST['precio'])) ? $_POST['precio'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$ventaproid = (isset($_POST['id'])) ? $_POST['id'] : '';
$ventaprecio = (isset($_POST['precio'])) ? $_POST['precio'] : '';
$ventacantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$ventaorden = (isset($_POST['orden'])) ? $_POST['orden'] : '';
$factura = (isset($_POST['factura'])) ? $_POST['factura'] : '';

switch($opcion){
    case 1: //alta
        // $consulta = "INSERT INTO productos (codigo, nombre, idMarca, precio) VALUES('$codigo', '$nombre', '$idMarca', '$precio') ";			
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute(); 

        // $consulta = "SELECT id, codigo, nombre, idMarca, precio FROM productos ORDER BY id DESC LIMIT 1";
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();
        // $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        // break;
    case 2: //modificación
        // $consulta = "UPDATE productos SET codigo='$codigo', nombre='$nombre', idMarca='$idMarca', precio='$precio' WHERE id='$id' ";		
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();        
        
        // $consulta = "SELECT id, codigo, nombre, idMarca, precio FROM productos WHERE id='$id' ";       
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();
        // $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        // break;        
    case 3://baja
        // $consulta = "DELETE FROM productos WHERE id='$id' ";		
        // $resultado = $conexion->prepare($consulta);
        // $resultado->execute();                           
        // break;        
    case 4: //select
        $consulta = "SELECT * FROM productos";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;

    case 5: //agregarventacabeza
        $fecha = '2021-10-26 12:12:00';
        $cliente = 1;
        $caja = 1;
        $consulta = "INSERT INTO facturasventas (clid, cjid, fvfechahora, fvtotal) VALUES ('$cliente','$caja','$fecha',0)";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta2 = "SELECT MAX(fvid) as factura FROM facturasventas";
        $resultado2 = $conexion->prepare($consulta2);
        $resultado2->execute();        
        $data=$resultado2->fetchAll(PDO::FETCH_ASSOC);
        break;


    case 6: //agregarventadetalle
        $preciototal = $ventacantidad*$ventaprecio;
        $consulta = "INSERT INTO detallesventas ( dvorden, fvid, proid, dvcantidad, dvpreciounitario, dcpreciototal) VALUES ('$ventaorden','$factura','$ventaproid','$ventacantidad','$ventaprecio','$preciototal')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        break;

    case 7: //actualizarventacabezatotal
        $total=0;
        $consulta = "SELECT dcpreciototal FROM detallesventas WHERE fvid='$factura'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
            $total= $total + $fila['dcpreciototal'];
        }
        $consulta2 = "UPDATE facturasventas SET fvtotal='$total' WHERE fvid='$factura'";
        $resultado2 = $conexion->prepare($consulta2);
        $resultado2->execute();
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
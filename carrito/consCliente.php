<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();


$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$clave = (isset($_POST['clave'])) ? $_POST['clave'] : '';
$idRol = (isset($_POST['idRol'])) ? $_POST['idRol'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';



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

    case 4:    
        $consulta = "SELECT * FROM clientes";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
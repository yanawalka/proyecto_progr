<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

//LO QUE SE RECIBE DESDE JAVASCRIPT
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';

//LO QUE SE CONSULTA A LA BD
    $consulta = "INSERT INTO productos (codigo, nombre, idMarca, precio) VALUES('$codigo', '$nombre', '$idMarca', '$precio') ";			
    $resultado = $conexion->prepare($consulta);
    $resultado->execute(); 


    

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
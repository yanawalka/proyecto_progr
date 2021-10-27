<?php

class Conexion{
    public static function Conectar(){
        define('servidor', 'localhost');
        define('nombre_bd', 'avenida');
        define('usuario', 'root');
        define('password', 'Del1al6!');

        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET Names utf8");

        try {
            $conexion = new PDO("mysql:host=".servidor."; dbname=".nombre_bd, usuario, password, $opciones);
            return $conexion;
        } catch (Exeption $e) {
            die("El error de conexion es: ".$e->getMessage());
        }
    }
}

?>
<?php
try {
    $mbd = new PDO('mysql:host=localhost;dbname=corpoa8b_db_employees', 'corpoa8b_user', '6RFiO6D9uZJ=');
    print "Conectado";
} catch (PDOException $e) { 
    header("HTTP/1.0 404 Not Found");
    print json_encode(["message" => $e->getMessage()]);
    die();
}
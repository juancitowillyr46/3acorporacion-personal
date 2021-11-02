<?php
include_once('../../includes/header.php');
include_once('../../includes/db.class.php');
include_once('../../entities/employee.class.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $mypdo = new MyPDO();
    $mbd = $mypdo->getMdb();
    $employee = new Employee($mbd);
    echo $employee->readAll();
} else {
    echo json_encode(["data" => [], "message" => "No permitido", "success" => false, "errors" => [] ]);
}



<?php
include_once('../../includes/header.php');
include_once('../../includes/db.class.php');
include_once('../../entities/employee.class.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, TRUE);
    $mypdo = new MyPDO();
    $mbd = $mypdo->getMdb();
    $employee = new Employee($mbd);
    print $employee->create($data);
} else {
    print json_encode(["data" => [], "message" => "No permitido", "success" => false, "errors" => []]);
}



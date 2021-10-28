<?php
include_once('../../includes/db.class.php');
include_once('../../entities/employee.class.php');

$inputJSON = file_get_contents('php://input');
if(!empty($inputJSON) && !is_null($inputJSON) && $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode($inputJSON, TRUE);
    header('Content-Type: application/json; charset=utf-8');

    $mypdo = new MyPDO();
    $mbd = $mypdo->getMdb();

    $employee = new Employee($mbd);
    print $employee->update($data, $data['id']);

} else {
    header("HTTP/1.0 404 Not Found");
    echo "Error";
    die();
}



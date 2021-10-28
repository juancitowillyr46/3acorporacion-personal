<?php
include_once('../../includes/db.class.php');
include_once('../../entities/employee.class.php');

//$inputJSON = file_get_contents('php://input');
// !empty($inputJSON) && !is_null($inputJSON) && 
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    //$data = json_decode($inputJSON, TRUE);
    header('Content-Type: application/json; charset=utf-8');

    $mypdo = new MyPDO();
    $mbd = $mypdo->getMdb();

    $employee = new Employee($mbd);
    $lastFileDelete = $_POST['lastFileDelete'];
    print $employee->uploadImage($lastFileDelete);

} else {
    header("HTTP/1.0 404 Not Found");
    echo "Error";
    die();
}



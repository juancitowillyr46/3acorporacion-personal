<?php
include_once('../../includes/header.php');
include_once('../../includes/db.class.php');
include_once('../../entities/employee.class.php');

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    $mypdo = new MyPDO();
    $mbd = $mypdo->getMdb();

    $employee = new Employee($mbd);
    $lastFileDelete = !empty($_POST['last_file_delete'])? $_POST['last_file_delete'] : "";
    print $employee->uploadImage($lastFileDelete, $_FILES);

} else {
    header("HTTP/1.0 404 Not Found");
    print json_encode(["data" => [], "message" => "Ocurrió un problema", "success" => false, "errors" => $errors]);
}



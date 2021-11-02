<?php
include_once('../../includes/header.php');
include_once('../../includes/db.class.php');
include_once('../../entities/employee.class.php');
include_once('../../entities/utility.class.php');

if(isset($_GET['id']) && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = ["id" => $_GET['id']];

    $mypdo = new MyPDO();
    $mbd = $mypdo->getMdb();

    $utilityObj = new Utility();

    $employee = new Employee($mbd, $utilityObj);
    print $employee->readById($data['id']);

} else {
    print json_encode(["data" => [], "message" => "No permitido", "success" => false, "errors" => [] ]);
}



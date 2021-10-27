<?php
include_once('../../includes/db.class.php');

$mypdo = new MyPDO();
$mbd = $mypdo->getMdb();

foreach($mbd->query('SELECT * from employee') as $fila) {
    print_r($fila);
}
<?php
class MyPDO extends PDO {
    private $username = "root";
    private $password = "";
    private $mbd = "";
    public function __construct() {
        try {
            $this->mbd = new PDO('mysql:host=localhost;dbname=db_3acorporacion', $this->username, $this->password);
        } catch (PDOException $e) { 
            header("HTTP/1.0 404 Not Found");
            print json_encode(["message" => $e->getMessage()]);
            die();
        }
    }
    public function getMdb() {
        return $this->mbd;
    }
}
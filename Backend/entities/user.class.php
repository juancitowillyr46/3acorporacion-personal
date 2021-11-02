<?php 
class User {
    public function __construct($mbd) {
        try {
            $this->mbd = $mbd;
        } catch (PDOException $e) { 
            header("HTTP/1.0 404 Not Found");
            print json_encode(["message" => $e->getMessage()]);
            die();
        }
    }
    public function readByUserAndPassword($username, $password){
        $sql = "SELECT count(*) as finduser FROM user WHERE username = '".$username."'";
        if ($result = $this->mbd->query($sql)) {
            if ($result->fetchColumn() > 0) { 
                $sth = $this->mbd->prepare("SELECT username, password FROM user WHERE username = '".$username."'");
                $sth->execute();
                $result = $sth->fetch(\PDO::FETCH_ASSOC);

                $hash = $result['password'];

                if (password_verify($password, $hash)) {
                    return ["data" => ["accessToken" => $hash], "message" => "Contraseña válida", "success" => true, "errors" => []];
                } else {
                    return["data" => [], "message" => "Contraseña inválida", "success" => false, "errors" => []];
                }

            } else {
                return ["data" => $result, "message" => "No encontrado", "success" => false, "errors" => []];
            }
        } else {
            return ["data" => [], "message" => "El usuario es incorrecto", "success" => false, "errors" => []];
        }
    }
}
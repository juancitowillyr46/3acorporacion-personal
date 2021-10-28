<?php 
class Employee {
    private $mbd = "";
    public function __construct($mbd) {
        try {
            $this->mbd = $mbd;
        } catch (PDOException $e) { 
            header("HTTP/1.0 404 Not Found");
            print json_encode(["message" => $e->getMessage()]);
            die();
        }
    }

    public function create($data) {
        $sql = "INSERT INTO employee (
            first_name, 
            last_name, 
            doc_num, 
            photo_url, 
            activity_from, 
            job_id, 
            state, 
            state_date_from, 
            state_date_to, 
            comment
        ) VALUES (
            :first_name, 
            :last_name, 
            :doc_num, 
            :photo_url, 
            :activity_from, 
            :job_id, 
            :state, 
            :state_date_from, 
            :state_date_to, 
            :comment
        )";
        $stmt= $this->mbd->prepare($sql);
        $stmt->execute($data);
        return json_encode(["data" => ["id" => $this->mbd->lastInsertId()], "message" => "Registrado correctamente"]);
    }

    public function update($data, $id) {
        $sql = "SELECT count(*) as findtotal FROM employee WHERE id = ".$id." ";
        if ($result = $this->mbd->query($sql)) {
            if ($result->fetchColumn() > 0) { 
                $sql = "UPDATE employee SET
                    first_name = :first_name, 
                    last_name = :last_name, 
                    doc_num = :doc_num, 
                    photo_url = :photo_url, 
                    activity_from = :activity_from, 
                    job_id = :job_id, 
                    state = :state, 
                    state_date_from = :state_date_from, 
                    state_date_to = :state_date_to, 
                    comment = :comment
                WHERE id = :id";
                $stmt= $this->mbd->prepare($sql);
                $stmt->execute($data);
                return json_encode(["data" => ["id" => $id], "message" => "Actualizado correctamente"]);
            } else {
                return json_encode(["data" => [], "message" => "No encontrado"]);
            }
        }
    }

    public function delete($id) {

        $sql = "SELECT count(*) as findtotal FROM employee WHERE id = ".$id." ";
        if ($result = $this->mbd->query($sql)) {
            if ($result->fetchColumn() > 0) {
                $sql = "DELETE FROM employee WHERE id = :id";
                $stmt= $this->mbd->prepare($sql);
                $stmt->execute(['id' => $id]);
                return json_encode(["data" => ["id" => $id], "message" => "Eliminado correctamente"]);
            } else {
                return json_encode(["data" => [], "message" => "No encontrado"]);
            }
        }

    }

    public function readAll() {
        $sth = $this->mbd->prepare("SELECT * FROM employee");
        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        return json_encode(["data" => $result, "message" => "No encontrado"]);
    }

    public function readById($id) {
        $sql = "SELECT count(*) as findtotal FROM employee WHERE id = ".$id;
        if ($result = $this->mbd->query($sql)) {
            if ($result->fetchColumn() > 0) { 
                $sth = $this->mbd->prepare("SELECT * FROM employee WHERE id=" . $id);
                $sth->execute();
                $result = $sth->fetch(\PDO::FETCH_ASSOC);
                return json_encode(["data" => $result, "message" => "ok"]);
            } else {
                return json_encode(["data" => $result, "message" => "No encontrado"]);
            }
        }
        
    }

}
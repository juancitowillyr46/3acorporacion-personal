<?php 
class Employee {
    private $mbd = "";
    private $utility = "";
    public function __construct($mbd, $utility = null) {
        try {
            $this->utility = $utility;
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
        return json_encode(["data" => ["id" => $this->mbd->lastInsertId()], "message" => "Registrado correctamente", "success" => true, "errors" => []]);
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
                return json_encode(["data" => ["id" => $id], "message" => "Actualizado correctamente", "success" => true, "errors" => []]);
            } else {
                return json_encode(["data" => [], "message" => "No encontrado", "success" => false, "errors" => []]);
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
                return json_encode(["data" => ["id" => $id], "message" => "Eliminado correctamente", "success" => true, "errors" => []]);
            } else {
                return json_encode(["data" => [], "message" => "No encontrado", "success" => false, "errors" => []]);
            }
        }

    }

    public function readAll() {
        $sth = $this->mbd->prepare("SELECT * FROM employee ORDER BY id DESC");
        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        $count = $sth->fetchColumn();
        return json_encode(["data" => $result, "message" => "N° resultados: " . count($result)]);
    }

    public function readById($id) {
        $sql = "SELECT count(*) as findtotal FROM employee WHERE id = ".$id;
        if ($result = $this->mbd->query($sql)) {
            if ($result->fetchColumn() > 0) { 
                $sth = $this->mbd->prepare("SELECT * FROM employee WHERE id=" . $id);
                $sth->execute();
                $result = $sth->fetch(\PDO::FETCH_ASSOC);

                $result['state_date_to_format'] = $this->utility->customFormat($result['state_date_to']);
                $result['state_date_from_format'] = $this->utility->customFormat($result['state_date_from']);
                $result['activity_from_format'] = $this->utility->customFormat($result['activity_from']);

                return json_encode(["data" => $result, "message" => "ok", "success" => true, "errors" => []]);
            } else {
                return json_encode(["data" => $result, "message" => "No encontrado", "success" => false, "errors" => []]);
            }
        }
    }

    public function uploadImage($lastFileDelete, $filesUpload) {

        $pathRoot = $_SERVER['DOCUMENT_ROOT'].'/uploads/';
 
        $uploadDirectoryRoot = "uploads/";

        if(!empty($lastFileDelete)){

            $lastFileDelete = $pathRoot.$lastFileDelete;
            if (file_exists($lastFileDelete)) {
                unlink($lastFileDelete);
            }
            
        }

        $currentDirectory = $pathRoot;

        $errors = []; // Store errors here

        $fileExtensionsAllowed = ['jpeg','jpg','png']; // These will be the only file extensions allowed 

        $fileName = $filesUpload['file']['name'];
        $fileSize = $filesUpload['file']['size'];
        $fileTmpName  = $filesUpload['file']['tmp_name'];
        $fileType = $filesUpload['file']['type'];
        $tmp = explode('.', $fileName);
        $fileExtension = end($tmp);

        $fecha = new DateTime();

        $fileName = str_replace($fileName, $fecha->getTimestamp().".".$fileExtension, basename($fileName));

        $uploadPath = $currentDirectory . basename($fileName); 

        $message = "";
        $result = [];
        $success = false;

        if (isset($_POST['submit'])) {

            if (! in_array($fileExtension,$fileExtensionsAllowed)) {
                $errors[] = "This file extension is not allowed. Please upload a JPEG or PNG file";
            }

            if ($fileSize > 4000000) {
                $errors[] = "File exceeds maximum size (4MB)";
            }

            if (empty($errors)) {
                $didUpload = move_uploaded_file($fileTmpName, $uploadPath);

                if ($didUpload) {
                    $message = "The file " . basename($fileName) . " has been uploaded";
                    $result = ["photo_url" => $fileName];
                    $success = true;
                } else {
                    $errors[] = "An error occurred. Please contact the administrator.";
                }
            } else {
                foreach ($errors as $error) {
                    $errors[] = $error . "These are the errors" . "\n";
                }
            }

        }

        return json_encode(["data" => $result, "message" => $message, "success" => $success, "errors" => $errors]);
    }

}
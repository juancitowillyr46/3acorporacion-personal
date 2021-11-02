<?php
class Utility {
    public function customFormat($date) {
        try {
            $dateFormat = new DateTime($date);
            $d = $dateFormat->format('d');
            $m = $this->getMonthTxt($dateFormat->format('m'));
            $y = $dateFormat->format('Y');
            return $d ." DE ". $m. " DEL " . $y;
        } catch (Exception $e) {
            return "-";
        }
    }
    public function getMonthTxt($position) {
        $moths = [
            "ENERO", 
            "FEBRERO", 
            "MARZO", 
            "ABRIL", 
            "MAYO",
            "JUNIO", 
            "JULIO", 
            "AGOSTO", 
            "SEPTIEMNBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE"
        ];
        return $moths[$position-1];
    }
}
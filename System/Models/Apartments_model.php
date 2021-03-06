<?php

class Apartments_model extends Connect{
    function __construct(){
        parent::__construct();
    }
    public function insertApartment($array,$pics)
    {   
        //var_dump($array);
        $value = "(Unit, Street, City, Rooms, Description, IdUser) Values (:Unit, :Street, :City, :Rooms, :Description, :IdUser)";

        $picsValue ="(FileName , IdApartment) VALUES (:FileName, :IdApartment)";
        //Ulozit novy apartment bez fotek a ziskat nove id
        $data = $this->db->insert2("apartment",$array, $value);
        // var_dump($data);
        //nove Id
        $id = $data['Id'];
        if(is_array($data))
        {   
            //pokud byli prilozene fotky, uloz vsechny a vloz foreign key apartament Id = $id
            if(null!= $pics)
            {
                $comfirmInsert = 0 ;
                foreach($pics as $img)
                {
                    $newData = $this->db->insert("photos",array("FileName"=>$img,"IdApartment"=> $id), $picsValue);
                    if(!is_bool($newData)){
                        $comfirmInsert++;
                    }


                };
                if($comfirmInsert == 0){
                    return 0;
                }else{
                    return 1;
                }

               
            }else
            {
                return 0;
            }
        }else{
            return 1;
        }   

    }

    public function getApartments($columns)
    {
        $response = $this->db->select1($columns,"apartment", null,null);
        if(is_array($response))
        {
            return $response = $response['results'];
            
        }else
        {
            return $response;
        }
    }
    public function getAppImgs($attr, $table, $where, $param){
       // var_dump($attr, $table, $where, $param);
        $images = $this->db->select1($attr,$table,$where, $param);
        //var_dump($images);
        if(is_array($images))
        {
            return $images=$images['results'];

        }
        else{
            return $images;
        }
    }
    public function getUsers($attr, $table)
    {
        $response = $this->db->select1($attr,$table, null, null);
        if(is_array($response))
        {
            return $response = $response['results'];
            
        }
        else
        {
            return $response;
        }

    }
    public function deleteImg($fileName)
    {
        $where = " WHERE FileName = :FileName";
        $response = $this->db->delete("photos", $where, array("FileName"=>$fileName));
        if(is_bool($response))
        {   

            return 0;
        }else{
            return $response;
        }
        
        
    }
    public function addImages($id, $file)
    {   
        //var_dump($id, $file);
        $value = "(FileName , IdApartment) VALUES (:FileName, :IdApartment)";
        $data = $this->db->insert("photos",array("IdApartment" => (int)$id, "FileName"=>$file), $value);
        if(is_bool($data)){
            //var_dump($data);
            return 0;
        }else{
            return 1;
        }

    }
    public function deleteApartment($id)
    {
        $where = " WHERE IdApartment = :IdApartment";
        $response = $this->db->delete("apartment", $where, array("IdApartment" => (int)$id));
        if(is_bool($response))
        {
            echo 0;
        }
        else{
            echo $response;
        }
    }
    public function updateApartment($array,$aptId)
    {
        $value = "Unit = :Unit, Street = :Street, City = :City, Rooms = :Rooms, Description = :Description, IdUser = :IdUser";
        $where = " WHERE IdApartment = $aptId";
        $data = $this->db->update("apartment",$array,$value,$where);
        if(is_bool($data))
        {
            echo 0;
        }else{
            echo $data;

        }
    }
 
}

?>
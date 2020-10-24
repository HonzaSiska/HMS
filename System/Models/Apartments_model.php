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
            echo $response;
        }
    }
    

    
}

?>
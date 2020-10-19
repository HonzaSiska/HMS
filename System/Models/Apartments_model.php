<?php

class Apartments_model extends Connect{
    function __construct(){
        parent::__construct();
    }
    public function insertApartment($array,$pics)
    {
        $value = "(Unit, Street, City, Rooms,Description) Values (:Unit, :Street, :City, :Rooms, :Description)";

        $picsValue ="(FileName , IdApartment) VALUES (:FileName, :IdApartment)";
        //Ulozit novy apartment bez fotek a ziskat nove id
        $data = $this->db->insert2("apartment",$array, $value);
        //nove Id
        $id = $data['Id'];
        if(is_array($data))
        {   
            //pokud byli prilozene fotky, uloz vsechny a vloz foreign key apartament Id = $id
            if(null!= $pics)
            {
                foreach($pics as $img)
                {
                    $newData = $this->db->insert("photos",array("FileName"=>$img,"IdApartment"=> $id), $picsValue);

                };
                echo $newData;
            }else{
                $data;
            }
            
        }else
        {
            return 1;
        }
        

    }
    

    
}

?>
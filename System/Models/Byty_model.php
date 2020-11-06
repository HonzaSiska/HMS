<?php

class Byty_model extends Connect
{
    function __construct()
    {
        parent::__construct();
        
    }
    public function vsechnyByty($columns)
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
}

?>
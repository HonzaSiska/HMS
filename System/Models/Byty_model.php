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
}

?>
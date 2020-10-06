<?php

class CashRegister_model extends Connect
{
    function __construct()
    {
        parent::__construct();
        
    }

    function insertTrans($array)
        {
            $value = " (Date,IdUser,Credit,Debit) VALUES(:Date,:IdUser,:Credit,:Debit)";  
            if($array->Type == "deposit"){
                $newArray = array($array->Date, $array->UserValue, $array->Amount, 0);
                
            }else{
                $newArray = array($array->Date, $array->UserValue, 0, $array->Amount);
            }

            $response = $this->db->insert("Transactions", $newArray, $value);
            if(is_bool($response))
            {
                return 0;
            }else{
                return 1;
            }
        
        
    }





}
?>
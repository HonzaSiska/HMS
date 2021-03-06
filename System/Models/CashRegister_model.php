<?php

class CashRegister_model extends Connect
{
    function __construct()
    {
        parent::__construct();
        
    }
    function getSum($columns, $date, $id){
        $where = " WHERE MONTH(Date) = :Month AND YEAR(Date)= :Year AND IdUser = :IdUser";
        $month = date('m', $date);
        $year = date('Y', $date);
        $array = array(
            'Month' => $month,
            'Year' => $year,
            'IdUser' => $id
        );
        $param = $array;
        $response = $this->db->select1($columns,"transactions",$where,$param);
        if(is_Array($response))
        {
            return $response;
            //return $response = $response['results'];
        }else
        {
            echo $response;
        }
    }


    function getTrans($columns, $date, $model)
    {   
        
        $where = " WHERE MONTH(Date) = :Month AND YEAR(Date)= :Year ORDER BY date Desc";
        $month = date('m', $date);
        $year = date('Y', $date);
        $array = array(
            'Month' => $month,
            'Year' => $year
        );
        $param = $array;
        
        $response = $model->paginationByMonth($columns,"transactions",$date,$where,$param);
        if(is_Array($response))
        {
            return $response;
            //return $response = $response['results'];
        }else
        {
            echo $response;
        }
        
    }
    public function getAllTrans($columns)
    {
        
        $response = $this->db->select1($columns,'transactions',null,null);
        return $response = $response['results'];
    }

    function insertTrans($array)
        {
            $value = " (Date,IdUser,Credit,Debit,Description) VALUES(:Date,:IdUser,:Credit,:Debit,:Description)";  
            if($array->Type == "deposit"){
                $newArray = array($array->Date, $array->UserValue, $array->Amount, 0,$array->Description);
                
            }else{
                $newArray = array($array->Date, $array->UserValue, 0, $array->Amount,$array->Description);
            }

            $response = $this->db->insert("transactions", $newArray, $value);
            if(is_bool($response))
            {
                if($response == true){
                    return 0;
                    
                }
                else{
                    
                    return 1;
                }
            }else{
                return 1;
               

            }
        
        
    }
    function getUsers($columns, $id)
    {   
        $where =" WHERE IdUser = :IdUser";
        $param = array(
            "IdUser"=> $id
        );
        $response = $this->db->select1($columns, "users", $where, $param);
        if(is_array($response))
        {
            return $response = $response['results'];
        }else{
            return $response;
        }
    }

    public function deleteTrans($id)
    {
        $where = " WHERE TransId =:TransId";
        $param = array(
            "TransId" => $id
        );
        $data = $this->db->delete("transactions",$where, $param);
        if(is_bool($data))
        {
            return 0;
        }else{
            return $data;
        }

    }





}
?>
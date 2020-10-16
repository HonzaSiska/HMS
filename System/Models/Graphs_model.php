<?php
    class Graphs_model  extends Connect
    {
        function __construct()
        {
            parent::__construct();
        }

        public function getChart1($columns, $year)
        {
            $where = " WHERE YEAR(DATE) = :Year GROUP BY MONTH(Date)";
            $param = array(
                "Year" => $year
            );
            $response = $this->db->select1($columns, "transactions",$where, $param);
            if(is_array($response)){
            
                return $response = $response['results']; 
                // return var_dump($response);
            }else{
                return $response;
            }

        }
    }
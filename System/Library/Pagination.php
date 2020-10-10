<?php

class Pagination extends Connect
{
    public function __construct()
    {
        parent::__construct();
    }

    public function paginationByMonth($columns, $table, $date, $where, $param)
    {   
        $response = $this->db->select1($columns, $table,$where, $param);
        return ($response);
    }
}

?>
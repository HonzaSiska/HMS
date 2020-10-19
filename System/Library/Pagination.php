<?php

class Pagination extends Connect
{
    public function __construct()
    {
        parent::__construct();
    }

    public function paginationByMonth($columns, $table, $date, $where, $param)
    {   
       
       

        $month = date("m", $date);
        //$monthName = date("F",$date);
        $year = date("Y", $date);
        $todayMonth = date("m");
        $todayYear = date("Y");
        //$prev = date("Y-m", strtotime("-1 months"),$date);
        
        if($month == 1)
        {
            $prevMonth = 12;
            $prevYear = $year -1;
            $nextMonth = $month + 1;
            $nextYear = $year;
        }else if($month > 1 && $month <12)
        {
            $prevMonth = $month -1;
            $prevYear = $year;
            $nextMonth = $month + 1;
            $nextYear = $year;
        }else if($month == 12)
        {
            $prevMonth = $month -1;
            $prevYear = $year;
            $nextYear = $year +1;
            $nextMonth =  1;
        }else
        {
            $prevMonth = $month -1;
            $prevYear = $year;
            $nextYear = $year +1;
            $nextMonth = $month + 1;

        }
        $newParam = array(
            "Month" => $prevMonth,
            "Year" => $prevYear
        );
        // $lastTrans = $this->db->select1($columns, $table," WHERE MONTH(Date) = :Month AND YEAR(DATE) =:Year ORDER BY DATE DESC LIMIT 1", $newParam);
        // $lastTrans = $lastTrans['results'];
        
        
        
        if($month == $todayMonth && $year == $todayYear)
        {
            $navigation = "<div class='paginator'><div><button onclick='getTrans(\"".$prevYear.",".$prevMonth.",1\");' class='prev btn_enabled'>&laquo; ".$prevMonth."-".$prevYear."</button></div>";

            $navigation .="<div><h3>".Functions::months()[$month-1]. "-" . $year."</h3></div>" ;
            // $navigation .="<div></div><button class='next btn_disabled' >         </button>&nbsp;&nbsp;&nbsp;</div>";
            $navigation .= "<div><button  class='next btn_disabled'>".$nextMonth."-".$nextYear." &raquo;</button></div></div>";
        }else
        {
            $navigation = "<div class='paginator'><div><button onclick='getTrans(\"".$prevYear.",".$prevMonth.",1\");' class='prev btn_enabled'>&laquo; ".$prevMonth."-".$prevYear."</button></div>";
            
            $navigation .="<div><h3>".Functions::months()[$month-1]. "-" . $year."</h3></div>" ;

            $navigation .= "<div><button onclick='getTrans(\"".$nextYear.",".$nextMonth.",1\");' class='next btn_enabled'>".$nextMonth."-".$nextYear." &raquo;</button></div></div>";
            //$navigation = "false";
            //$navigation = $month;
        
        }
        //$navigation .= "<hr>";
 
        $response = $this->db->select1($columns, $table,$where, $param);
        $response = $response["results"];
        $array = array (
            "results"=>$response,
            "navigation"=>$navigation
        );
        return $array;
        //return ($response);

       
    }
    
}

?>
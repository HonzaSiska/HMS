<?php

class Graphs extends Controllers
{
    function __construct()
    {
        parent::__construct();
    }

    public function graphs(){
        if(Session::getSession("User")["Role"] == "admin")
        {
            $this->view->render($this, "graphs", null);
        }else{
            header("Location:" . URL . "Principal/principal");
        }
    }

    public function getChart1()
    {
        if(Session::getSession("User")["Role"] == "admin")
        {
            $user = Session::getSession("User");
            if(null != $user){
                $count = 0;
                $result = array();
                $year = $_POST['year'];
                $columns = "MONTHNAME(date) as Month, SUM(Credit)-SUM(Debit) as Spending";
                $data = $this->model->getChart1($columns, $year);
                //var_dump($data[0]["Month"]);
                if(is_array($data))
                
                {
                    foreach($data as $item)
                    {
                    
                        //var_dump($item['Month']);
                        $newArray = [
                            
                            "Month"=> $item['Month'],
                            "Sum"=> $item['Spending']
                     
                        ];
                        array_push($result,$newArray);
                        
                        
                        $count++;
                        
                    }
                    //var_dump($result);
                    
                    $output = json_encode($result);
                    echo $output;
                }else
                {
                    return $result;
                }
               
            }
            //SELECT MONTHNAME(date) as Month, SUM(Credit)-SUM(Debit) as Spending FROM `transactions` WHERE YEAR(DATE) = 2020 GROUP BY MONTH(Date)
        }
    }
}


?>
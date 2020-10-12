<?php

class CashRegister extends Controllers {
    function __construct(){
        parent::__construct();
        
    }
    public function cashRegister(){
        // var_dump (Session::getSession('User')['Role']);
        if(Session::getSession('User')['Role'] == "admin"){
            
            $this->view->render($this,"cashRegister",null);
            //  $this->getUsers();
            
             
        }else{
             header("Location:".URL."Principal/principal");
       }
    }
    
    public function getTrans()
    {
        if(Session::getSession('User')['Role'] == "admin")
        {
            $user = Session::getSession("User");
            $result = "";
            $count = 0;
            $credit = 0;
            $debit = 0;
            $columns ="*";
            if(null != $user)
            
            {
               
                $receivedDate =  strtotime($_POST['datum']);
                
               
                $data = $this->model->getTrans($columns, $receivedDate, $this->page);
               
                $allTrans = $this->model->getAllTrans("SUM(Credit) - SUM(Debit)");
                $sum = ($allTrans[0]["SUM(Credit) - SUM(Debit)"]);
                // $sum = $allTrans['Credit'] - $allTrans['Credit'];
                // echo $sum;
                $nav = $data['navigation'];
                $data = $data['results'];
               
                if(is_array($data))
                {
                    foreach($data as $item)
                    {
                        //ODSTRAN NULY Z CREDITU A DEBITU
                        $cred = ($item["Credit"]==0) ? "" : $item["Credit"];
                        $deb = ($item["Debit"]==0) ? "" : $item["Debit"];
                        //VYTVOR TABLE TRANSAKCI
                        $result .= '<tr>';
                        $result .= '<td>'.$item["TransId"].'<input type="hidden" value="'.$item["TransId"].'"</td>';
                        $result .= '<td>'.$item["Date"].'</td>';
                        $result .= '<td>'.$item["IdUser"].'</td>';
                        $result .= '<td class="credit">'.$cred.'</td>';
                        $result .= '<td class="debit">'.$deb.'</td>';
                        $result .= "<td><button class='table_btn delete' id='#delete_user_open_slide' onclick='slideDown(".$item['TransId'].", 2);'>Delete</button></td>";
                        $result .= '</tr>';
                        $credit += $item["Credit"];
                        $debit += $item["Debit"];
                       
                    }
                    $diff = $credit - $debit;
                    $result .= "<tr><td></td><td></td><td>Zbytek<span class='diff'> $diff</span></td><td class='credit'>$credit</td><td class='debit'>$debit</td><td></td></tr>";
                    //echo $result;
                }

                $output = array(
                    "table" => $result,
                    "sum" => $sum,
                    "nav" => $nav

                );
                
                echo json_encode($output);
                
                
            }
        }
    }
    public function insertTrans(){
        $user = Session::getSession("User");
        if(null != $user){
            if(Session::getSession('User')['Role'] == "admin")
            {
                if(($_POST['date'] || $_POST['amount'] || $_POST['userValue']  || $_POST['type']) != null )
                {   
                   $array = array($_POST['date'] , $_POST['amount'],$_POST['userValue'], $_POST['type']);

                    
                    $data = $this->model->insertTrans($this->insertTransClass($array));
                        if($data == 0)
                        {
                            return 0;
                        }else
                        {
                            echo $data;
                        }
                }else{
                    echo "Vyplň všechny pole !!";
                }
            }else
            {
                header("Location:".URL."CashRegister/cashRegister"); 
            }
            
             
        }else{
             header("Location:".URL."CashRegister/cashRegister");
       }
    }


}

?>
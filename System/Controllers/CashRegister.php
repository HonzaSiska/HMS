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
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
        if(Session::getSession('User')['Role'] == "admin"){
            
            echo $_POST['type'];
             
        }else{
             header("Location:".URL."CashRegister/cashRegister");
       }
    }


}

?>
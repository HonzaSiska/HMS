<?php

class Byty extends Controllers {
    function __construct(){
        parent::__construct();
    }

    public function byty()
    {
         $this->view->render($this,"byty",null,"public");
    }
    public function vsechnyByty()
    {
        
        //--------VYTAHNOU VSECHNY APARTMANY Z DB--------
        $data = $this->model->vsechnyByty("*");
        //--------VYTAHNOU UZIVATELE APARTMANY Z DB--------
        $users = $this->model->getUsers("IdUser, Name, Last_name","users");
        //-----------------------------------------------
        //var_dump($users);
        var_dump($data);
        if(is_array($data))
        {
            
        }
    }

}
?>
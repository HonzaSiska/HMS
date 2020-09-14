<?php
class Anonymous
{
    public function userClass($array){
        return new class($array){
            public $Name;
            public $LastName;
            public $Email;
            public $Password;
            public $Role;
            function __construct($array){
                
                $this->Name = $array[0];
                $this->LastName = $array[1];
                $this->Email = $array[2];
                $this->Password = $array[3];
                $this->Role = $array[4];
            }
        };
    }
}
//$_POST['name'],$_POST['lastName'],$_POST['email'],$_POST['password'],$_POST['role']
?>
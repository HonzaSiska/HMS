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
    public function insertTransClass(array $array){
        return new class($array){
            var $Date;
            var $Amount;
            var $UserValue;
            var $Type;
            var $Description;
            function __construct($array)
            {
                $this->Date = $array[0];
                $this->Amount = $array[1];
                $this->UserValue = $array[2];
                $this->Type = $array[3];
                $this->Description = $array[4];
            }
        };
    }
    public function insertApt(array $array)
    {
        return new class($array)
        {
            var $Unit;
            var $Street;
            var $City;
            var $Rooms;
            var $Description;
            function __construct($array)
            {
                $this->Unit = $array[0];
                $this->Street = $array[1];
                $this->City = $array[2];
                $this->Rooms = $array[3];
                $this->Description = $array[4];
            }

        };
    }
}

?>
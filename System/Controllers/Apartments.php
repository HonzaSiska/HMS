<?php 

class Apartments extends Controllers {
    function __construct(){
        parent::__construct();
    }

    public function apartments()
    {
        if(Session::getSession("User")["Role"] == 'admin'){
            $this->view->render($this,"apartments",null);
        }else{
            header("Location:". URL . "Principal/principal");
        }
    }

    public function insertApartment()
    {
        $user = Session::getSession("User");
        if(Session::getSession("User")["Role"]=="admin")
        {
            if(null != $user)
            {
                
                if(isset($_POST['data'])){
                   // zmenit na associative array
                    $receivedData = json_decode( $_POST['data'], true );
                    if(count($receivedData) != 0)
                    {
                        $array = [
                            $receivedData[1]['Jednotka'],
                            $receivedData[2]['Ulice'],
                            $receivedData[3]['Mesto'],
                            $receivedData[4]['Pokoje'],
                            $receivedData[5]['Popis']
                        ];
                        if(null!= ($receivedData[0]['File']))
                            {
                                $pics = $receivedData[0]['File'];
                            }else
                            {
                                $pics = null;
                            }
                            var_dump($pics[0]);

                        $data = $this->model->insertApartment($this->insertApt($array),$pics);
                        if(is_bool($data))
                        {
                            var_dump($data);
                            echo 0;
                            

                        }else{
                            echo 1;
                        }

                    }else
                    {
                        echo 1;
                    }

                    
                };
            }
        }
    }
}


?>
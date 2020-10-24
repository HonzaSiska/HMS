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

               
               
                if(isset($_POST['Jednotka']))
                {
                    
                    $array = array(
                        $_POST['Jednotka'],
                        $_POST['Ulice'],
                        $_POST['Mesto'],
                        $_POST['Pokoje'],
                        $_POST['Popis'],
                        (int)$_POST['Uzivatel'],
                    );
                    //var_dump($this->insertApt($array));
                    //var_dump($array);
                    //var_dump($_POST['Uzivatel']);
                    $pics = array();

                    if(isset($_FILES['files']))
                    {   
                        //']);
                        $countFiles = count($_FILES['files']['name']);
                        
                        for ($i = 0; $i < $countFiles; $i++)
                        {
                            // echo $_FILES['files']['tmp_name'][$i];
                            $type = $_FILES['files']["type"][$i];
                            $tmp_file = $_FILES['files']["tmp_name"][$i];
                            $newFile=$_FILES['files']["name"][$i];
                            $folder = "images/";
                            
                            $succes = $this->image->fileToUpload($type,$folder,$newFile,$tmp_file);
                            if($succes != true){
                                echo "Fotka $newFile nemaohla být uložena !!";
                            }else{
                                array_push($pics, $newFile);
                            }
                            
                        }
                    }else{
                        $pics=[];
                    }
                        $data = $this->model->insertApartment($this->insertApt($array),$pics);
                        echo $data;
                     
                     
                }else
                {
                    echo 1;
                }

                    // $filename = $_FILES['files']['name'][$index];
                    // $ext = pathinfo($filename,PATHINFO_EXTENSION);
                    // $valid_ext = array("png","jpeg","jpg");
                    //zkontroluj jestli extension je povolena
                    // if(in_array($ext,$valid_ext)){
                    //     $path = $upload_location.$filename;
                    // }
             
                
            }
        }
    }

    public function getApartments()
    {
        $diff = $_POST['data'];
        $user = Session::getSession('User');
        if(Session::getSession('User')['Role'] == "admin")
        {
            if(null != $user)
            {
                $data = $this->model->getApartments("*");
                if(is_array($data))
                {
                    // var_dump($diff);
                    // var_dump($data);
                    if($diff =="admin")
                    {
                        //html template pro seznam apartmanu na administracni cast
                        echo "ADMIN";
                    }
                    else
                    {
                        //html template pro seznam apartmanu na public cast
                        echo "PUBLIC";
                    }
                }else{
                    //redirect 404
                }
            }
        }
    }
}

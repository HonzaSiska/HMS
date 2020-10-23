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

                //ZDE PRIJDE QUERY NA VYTVORENI NOVEHO BYTTU A POTOM SE ULOZI FOTKY
               
                if(isset($_POST['Jednotka']))
                {
                    $array = array(
                        $_POST['Jednotka'],
                        $_POST['Ulice'],
                        $_POST['Mesto'],
                        $_POST['Pokoje'],
                        $_POST['Popis'],
                    );
                    $pics = array();

                    if(isset($_FILES['files']))
                    {
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
                        //pokud nejsou zadne fotky v poli posli null
                        $pics = $pics != null ? $pics : null;
                        //var_dump($pics);
                        $data = $this->model->insertApartment($this->insertApt($array),$pics);
                        echo $data;
                    }  
                }else
                {
                    echo 1;
                }
                
             
                    
                    
                    // $filename = $_FILES['files']['name'][$index];
                    // $ext = pathinfo($filename,PATHINFO_EXTENSION);
                    // $valid_ext = array("png","jpeg","jpg");
                    //zkontroluj jestli extension je povolena
                    // if(in_array($ext,$valid_ext)){
                    //     //file path
                    //     $path = $upload_location.$filename;
                    // }
             
                
            }
        }
    }
}

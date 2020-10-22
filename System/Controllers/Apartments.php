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
                //this works
                //echo  $_FILES['files']['name'][0];
                //echo $_POST['Jednotka']; 
                
                
                if(isset($_FILES['files']))
                    {
                         $countFiles = count($_FILES['files']['name']);
                         $imageArray = array();
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
                                array_push($imageArray, $newFile);
                            }
                            
                           
                            
                            
                            
                         }
                        
                       
                        //var_dump($_FILES['files']);
                        // print_r ($_FILES['files']['error'] );
                    }
                    
                    
                    // $filename = $_FILES['files']['name'][$index];
                    // $ext = pathinfo($filename,PATHINFO_EXTENSION);
                    // $valid_ext = array("png","jpeg","jpg");
                    //zkontroluj jestli extension je povolena
                    // if(in_array($ext,$valid_ext)){
                    //     //file path
                    //     $path = $upload_location.$filename;
                    // }
             
                
           
               
                //     if(count($receivedData) != 0)
                //     {
                //         $array = [
                //             $receivedData[1]['Jednotka'],
                //             $receivedData[2]['Ulice'],
                //             $receivedData[3]['Mesto'],
                //             $receivedData[4]['Pokoje'],
                //             $receivedData[5]['Popis']
                //         ];
                //         if(null!= ($receivedData[0]['File']))
                //             {
                //                 $pics = $receivedData[0]['File'];
                //             }else
                //             {
                //                 $pics = null;
                //             }
                //             var_dump($pics[0]);

                //         $data = $this->model->insertApartment($this->insertApt($array),$pics);
                //         if(is_bool($data))
                //         {
                //             var_dump($data);
                //             echo 0;
                            

                //         }else{
                //             echo 1;
                //         }

                //     }else
                //     {
                //         echo 1;
                //     }

                    
                // };
            }
        }
    }
}


?>
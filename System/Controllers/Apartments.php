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
        $output = "";
        if(Session::getSession('User')['Role'] == "admin")
        {
            if(null != $user)
            {

                
                //--------VYTAHNOU VSECHNY APARTMANY Z DB--------
                $data = $this->model->getApartments("*");
                //-----------------------------------------

                //--------VYTAHNOU UZIVATELE APARTMANY Z DB--------
                $users = $this->model->getUsers("IdUser,Name, Last_name","users");
                //-----------------------------------------------
                //var_dump($users);

                if(is_array($data))
                {
                    if($diff =="admin")
                    {

                        //TEMPLATE APARTMANY PRO ADMIN
                        foreach($data as $item)
                        {

                            //GRID
                            $output .="<h2>".$item['Unit']."</h2>";
                            $output .= '<div class="form-wrapper-edit">';
                                
;
                                //GRID ITEM 1
                                $output .= '<div class="form-wrapper-edit-grid-item">';
                                    $output .= '<form id="apartment_form-edit"  method="POST" class="add_apartment" enctype="multipart/form-data onsubmit="return false;">';

                                        $output .= '<label for="apartment_name_edit" class="login_label">* Jednotka</label>';
                                        $output .=  '<input id="apartment_name_edit" type="text" name="apartment_name" value="'.$item['Unit'].'">';

                                        $output .= '<label for="apartment_ulice_edit" class="login_label">* Ulice</label>';
                                        $output .=  '<input id="apartment_ulice_edit" type="text" name="apartment_ulice" value="'.$item['Street'].'">';

                                        $output .= '<label for="apartment_city_edit" class="login_label">* Město</label>';
                                        $output .=  '<input id="apartment_city_edit" type="text" name="apartment_city" value="'.$item['City'].'">';

                                        $output .= '<label for="apartment_rooms_edit" class="login_label">* Počet pokojů</label>';
                                        $output .=  '<input id="apartment_rooms_edit" type="text" name="apartment_rooms" value="'.$item['Rooms'].'">';

                                        $output .= '<label for="apartment_desc_edit" class="login_label">Popis</label>';
                                        $output .= '<textarea id="apartment_desc_edit" name="apartment_desc">'.$item['Description'].'</textarea>';

                                        $output .= '<label for="apartment_user_edit" class="login_label">Uživatel</label>';
                                        $output .= '<select id="apartment_user_edit" class="apartment_user">';
                                            foreach($users as $person)
                                            {   
                                                $fullName = $person['Name']." ".$person['Last_name'];
                                                if($person['IdUser'] != $item['IdUser'])
                                                {
                                                    
                                                    $output .= '<option value="'.$person['IdUser'].'">'.$fullName.'</option>';
                                                }else{
                                                    $output .= '<option value="'.$person['IdUser'].'" selected>'.$fullName.'</option>';
                                                }

                                            }
                                        
                                            //CYCLUS PRO UZIVATELE;
                                        $output .= '</select>';
                                        $output .='<button onclick="apartment.updateApartment("'.$item['IdApartment'].'");" id="add_apartment_img" class="btn add_img">Aktualizovat</button>';

                                    $output .='</form>';
                                    
                                $output .= "</div>";

                                //QUERY-----------------------------
                                //VYTAHNOUT FOTKY K TOMUTU APARTMANU
                                $where = " WHERE IdApartment = :IdApartment";
                                $param = array("IdApartment"=> $item['IdApartment']);
                                $images = $this->model->getAppImgs("*", "photos", $where, $param);
                                //-----------------------------------

                                //GRID ITEM 2
                                $output .= '<div>';
                                    $output .= '<div class="form-wrapper-edit-grid-item2">';

                                    foreach($images as $img)
                                    {
                                        $output .='<div class="img-wrapper-edit">';
                                            //jsem prijde ikonka na vymazani fotky
                                            $output .='<img src="'.URL. RQ .'images/photos/images/'.$img['FileName'].'" alt="fotka -'.$img['FileName'].'" data-id="'.$img['IdPhoto'].'">';
                                           
                                        $output.="</div>";
                                    }
                                    
                                    $output .= "</div>";

                                    //FORMULAR PRO PRIDANI NOVYCH FOTEK
                                    $output .= '<div id ="edit_apt_imgs-form-wrapper">';

                                        $output .='<form id ="apartment_image-edit" class="" enctype="multipart/form-data onsubmit="return false;">';
                                            $output .='<div id="input_field_wrapper_img" class="input_field_wrapper">';
                                                $output .= '<label for="apartment_fotky_edit" class="login_label">Fotky</label>';
                                                $output .="<br>";
                                                $output .='<input class="" accept="image/*" type="file" id="files" name="files[]" multiple="">';
                                            $output.="</div>";
                                            $output .= '<center>';
                                                $output .='<button onclick="apartment.addImages("'.$item['IdApartment'].'");" id="add_apartment_btn" class="btn add_img">Přidat fotky</button>';
                                            $output.="</center>";
                                        $output .= "</form>";

                                    $output .='</div>';
                                $output .= '</div>';
                            $output .= "</div>";
                            // $output .= '<div class ="spacer">';
                            // $output .='</div>';
                        
                        }
                        //------------------
                        // VYSLEDEK PRO AJAX
                        //------------------
                        echo $output;
                        
                    }
                    else
                    {
                        //TEMPLATE APARTMANY PRO PUBLIC
                        echo "PUBLIC";
                    }
                }else{
                    //redirect 404
                }
            }
        }
    }
}

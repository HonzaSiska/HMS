<?php

class Users extends Controllers {
    function __construct(){
        parent::__construct();
        
    }
    public function users(){
        // var_dump (Session::getSession('User')['Role']);
        if(Session::getSession('User')['Role'] == "admin"){
            
            $this->view->render($this,"users");
            //  $this->getUsers();
             
        }else{
             header("Location:".URL."Principal/principal");
       }
       

    }

    public function getUsers(){
    
        // echo  "getUsers()";
        if(Session::getSession('User')['Role'] == "admin"){
            $user = Session::getSession("User");
            $result="";
            $count = 0;
            $columns = "IdUser, Name, Last_name, Email, Email, Image, Role, Phone";
            if(null != $user){
                $data = $this->model->getUsers($columns);
                //var_dump($data);
                if(is_array($data)){
                    $array = $data;
                    foreach($data as $item){
                        $dataUser = json_encode($array[$count]);
                        $result .= "<tr>". 
                        "<td>".$item['IdUser']."</td>". 
                        "<td>".$item['Name']."</td>". 
                        "<td>".$item['Last_name']."</td>". 
                        "<td>".$item['Role']."</td>". 
                        // "<td>".$item['Phone']."</td>". 
                        // "<td>".$item['Email']."</td>". 
                        "<td>
                        <button class='table_btn edit' id = 'addUser' onclick='dataUser(".$dataUser.");'>Edit</button>
                        <button class='table_btn delete' id='#delete_user_open_slide' onclick='slideDown(".$dataUser.");'>Delete</button>
                        </td>". 
                        
                        "</tr>"
                        ;
                        $count++;
                        
                    }
                    echo $result;
                    
                    
                    // return json_encode($data);
                }
            
            }
        }
    }
    public function getRoles(){
    
        $data = $this->model->getRoles();
        if(is_array($data)){
            echo json_encode($data);
        }else{
            echo $data;
        }
        
        
    }
    public function registerUser(){
        $user = Session::getSession("User");
        if(null != $user){
            if("admin" == $user['Role']){

                if(empty($_POST['name'])){
                    echo "Zadej jméno !!";
                }else{
                    if(empty($_POST['lastName'])){
                        echo "Zadej přijmení !!";
                    }else{
                        if(empty($_POST['email'])){
                            echo "Zadej email !!";
                        }else{
                            if(strcmp("Vyber přístup uživatele", $_POST['role']) === 0){
                                echo "Vyber roli uzivatele !!";
                            }else{
                                if(empty($_POST['password'])){
                                    echo "Zadej heslo !!";
                                }else{
                                    if(6<= strlen($_POST['password'])){
                                        $array = array (
                                            $_POST['name'],$_POST['lastName'],$_POST['email'],password_hash($_POST["password"], PASSWORD_DEFAULT),$_POST['role']
                                        );
                                        $data = $this->model->registerUser($this->userClass($array));
                                        if($data == 1){
                                            echo "Tento email je už zaregistrován !!";
                                        }else{
                                            echo $data;
                                        }


                                    }else{
                                        echo "Heslo musi obsahovat minimálně 6 znaků !!";
                                    }
                                }
                            }
                        }
                    }
                }

            }else{
                echo "Nemáš přístup !!";
            }


        }else{
            echo "Nemáš přístup !!";
        }
        
    }
    public function editUser(){
        $user = Session::getSession("User");
        if(null != $user){
            if("admin" == $user['Role']){

                if(empty($_POST['name'])){
                    echo "Zadej jméno !!";
                }else{
                    if(empty($_POST['lastName'])){
                        echo "Zadej přijmení !!";
                    }else{
                        if(empty($_POST['email'])){
                            echo "Zadej email !!";
                        }else{
                            
                            if(strcmp("Vyber přístup uživatele", $_POST['role']) === 0){
                                echo "Vyber roli uzivatele !!";
                            }else{
                                $response = $this->model->getUser($_POST['idUser']);
                                if(6>strlen($_POST['password']) && !empty($_POST['password'])){
                                    echo "Heslo musí mit minimalně 6 znaků !!";
                                }else{
                                    if(empty($_POST['password'])){
                                        $array = array ($_POST['name'],$_POST['lastName'],$_POST['email'],$response[0]['Password'],$_POST['role']);
                                    }else{
                                        $array = array ($_POST['name'],$_POST['lastName'],$_POST['email'],password_hash($_POST['password'],PASSWORD_DEFAULT),$_POST['role']);
                                    }
                                    $data = $this->model->editUser($this->userClass($array),$_POST['idUser']);
                                
                                }
                                
                                
                            }
                        }
                                
                    }
                }
            }else{
                echo "Nemáš přístup !!";
            }
        }else{
            echo "Nemáš přístup !!";
        }


        
        
    }
    public function deleteUser(){
        $user = Session::getSession('User');
        // echo Session::getSession('User')['Role'];
        // echo $_POST['idUser'];
        // echo $_POST['email'];
        if(null != $user){
            if("admin" == $user['Role']){
                echo $this->model->deleteUser($_POST['idUser'], $_POST['email']);
            }else{
                echo "Nemáš přístup !!";
            }
        }
    }
    

    public function destroySession(){
        Session::destroy();
        header("Location:".URL);
    }
        
}                
 
?>
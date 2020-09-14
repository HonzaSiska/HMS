<?php

class Index_model extends Connect{
    function __construct(){
        parent::__construct();
        // $this->indexModel();
    }

    //function indexModel(){
        // echo "Metodo index model";
    //}

    function userLogin($email,$password){
        $where = " WHERE Email = :Email";
        $param = array("Email" => $email);
        $response = $this->db->select1("*","users",$where,$param);
        if(is_array($response)){
            
            $response = $response['results'];
            //var_dump($response);
            if(0 != count($response)){
                if(password_verify($password,$response[0]['Password'])){
                    $data = array(
                        "IdUser"=> $response[0]["IdUser"],
                        "Name"=> $response[0]["Name"],
                        "Lastname"=> $response[0]["Last_name"],
                        "Email"=> $response[0]["Email"],
                        "Role"=> $response[0]["Role"],
                        "Image"=> $response[0]["Image"],

                    );
                    Session::setSession("User",$data);
                    return $data;
                }else{
                    $data = array(
                        "IdUser"=> 0,
                    );
                    return $data;
                }
            }else{
                return "Tento email neni registrovany";
            }

        }
        else{
            return $response;
        }
    }
    
    
    
}


?>
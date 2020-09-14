<?php

class Users_model extends Connect{
    function __construct(){
        parent::__construct();
        
    }
    function getRoles(){
     return $response = $this->db->select1("*","roles",null,null);
        var_dump($response = $this->db->select1("*","roles",null,null));
    }
    function getUsers($columns){
    
        $response = $this->db->select1($columns, "users", null, null);
        if(is_array($response)){
            
            return $response = $response['results'];
            
        }else{
            return $response;
        }
    }
    function getUser($idUser){
        $where = " WHERE IdUser = :idUser";
        $response = $this->db->select1("*", "users", $where, array("idUser"=>$idUser));
        if(is_array($response)){
            
            return $response = $response['results'];
            
        }else{
            return $response;
        }
    }
    function registerUser($user){
        $where = " WHERE Email = :Email";
        $response = $this->db->select1("*", "users", $where, array('Email'=> $user->Email));
        if(is_array($response)){
            $response = $response['results'];
            if(0 == count($response)){
                $value = "(Name, Last_name, Email, Password, Role) VALUES(:Name, :LastName, :Email, :Password, :Role)";
                $data = $this->db->insert("users",$user,$value);
                if(is_bool($data)){
                    return 0;
                }else{
                    return $data;
                }
            }else{
                return 1;
            }
        }else{
            return $response;
        }
    }

    function editUser($user,$idUser){
        
        $where = " WHERE Email = :Email";
        $response = $this->db->select1("*",'users',$where,array('Email' => $user->Email));
        
        if (is_array($response)){
            $response = $response['results'];
            $value =  "Name = :Name, Last_name = :LastName, Email = :Email,Password = :Password, Role = :Role";
            $where = " WHERE IdUser = ".$idUser;
            if(0 == count($response)){
                $data = $this->db->update("users",$user,$value, $where);
                if(is_bool($data)){
                    return 0;
                }else{
                    return $data;
                }
                
            }
            else{
                if ($response[0]['IdUser'] == $idUser) {
                    $data = $this->db->update("users",$user,$value, $where);
                    
                    if(is_bool($data)){
                        return 0;
                    }else{
                        return $data;
                    }
                }else{
                    return "Email je už registrován";
                }
            }
        }else{
            return  $response;
        }
    }
    function deleteUser($idUser, $email){
        $where =" WHERE IdUser = :IdUser";
        $data = $this->db->delete("users",$where, array("IdUser" => $idUser));
        if(is_bool($data)){
            return 0;
        }else{
            return $data;
        }

    }
}

?>
<?php  
class Index extends Controllers{

    function __construct(){
        parent::__construct();
    }
    public function index(){
        // echo "Method Index";
        //  echo password_hash("Alena", PASSWORD_DEFAULT);
        // if(null == Session::getSession("User")){
            
            $this->view->render($this,"index");
            
        // }else{
        //      header("Location:".URL."Principal/principal");
        // }
        
      
        
        
    }
    public function userLogin(){
        if(isset($_POST['email'])){
            
            if(!empty($_POST['email'])){
               
                $data = $this->model->userLogin($_POST['email'],$_POST['password']);
                if(is_array($data)){
                    
                    echo json_encode($data);
                    
                }else{
                    echo $data;
                    
                }
            }else{
                echo 1;
            }
        }
        
        
    }
}

<?php
    class Controllers extends Anonymous{
        public function __construct(){
            Session::start();
            
            $this->view = new Views();
            $this->page = new Pagination();
            $this->loadClassmodels();
            
            
        }
        function loadClassmodels(){
            $model = get_class($this).'_model'; //$MODEL = A CLASS IN FOLDER MODELS
            $path = 'Models/'.$model.'.php';// FULL PATH TO THE CLASS IN MODELS FOLDER
            if(file_exists($path)){ //IF THE FILE WITH THIS CLASS EXIST IN MODELS FOLDER
                require $path; //REQUIRE THE FILE
                
                $this->model = new $model(); //INSTANTIATE THE CLASS INSIDE THIS FILE
            }

        }
    }
?>
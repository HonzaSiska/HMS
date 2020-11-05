<?php
    class Views{
        function render($controller, $view,$models, $diff){
            $controllers = get_class($controller);
            require VIEWS.DFT."head.html";
            if($diff == "admin")
            {
                require VIEWS.DFT."header.html";
            }else{
                require VIEWS.DFT."header_public.html";
            }
            
            if($models == null){
                require VIEWS.$controllers.'/'.$view.'.html';
            }else{
                require VIEWS.$controllers.'/'.$view.'.php';
            }
            
            
            if($diff == "admin")
            {
                require VIEWS.DFT."footer.html";
            }else{
                require VIEWS.DFT."footer_public.html";
            }
        }
        
    }
   
    
?>
<?php
class Uploadimage 
{
    
       function fileToUpload($type,$folder,$newFile,$tmp_file)
       {
        if (strstr($type,"image")) {
            $target_dir = "./Resource/images/photos/".$folder. $newFile;
            move_uploaded_file($tmp_file, $target_dir);
            return true;
       }else{
           return false;
       }
    }
}



?>
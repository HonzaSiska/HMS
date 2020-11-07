<?php

class Byty extends Controllers {
    function __construct(){
        parent::__construct();
    }

    public function byty()
    {
         $this->view->render($this,"byty",null,"public");
         //$this->vsechnyByty();

    }
    public function vsechnyByty()
    {
        
        //--------VYTAHNOU VSECHNY APARTMANY Z DB--------
        $data = $this->model->vsechnyByty("*");
        //--------VYTAHNOU UZIVATELE APARTMANY Z DB--------
        // $users = $this->model->getUsers("IdUser, Name, Last_name","users");
        //-----------------------------------------------
        //var_dump($users);
        //var_dump($data);
        $output ="";
        if(is_array($data))
        {
            foreach($data as $item)
            {
                $output.='<div class="byt_wrapper">';
                    $output.='<div class="top_section_byty">';
                        $output.='<div class="byt_info_wrapper">';
                            $output.='<span class="bold">'.$item['Unit'].'</span>' ;
                            $output.='<span>'.$item['Street'].'</span>';
                            $output.='<span>'.$item['City'].'</span>' ;
                            $output.='<span>'.$item['Rooms'].' pokojů</span>' ;
                            $output.='<span>'.$item['Street'].'</span>' ;
                            $output.='<span>'.$item['Description'].'</span>' ;

                        $output.='</div>';

                        //-------------------------------------------------
                        // VYTAHNI VSECHNY FOTKY TOHOTO BYTU Z DB
                        $where = " WHERE IdApartment = :IdApartment";
                        $param = array("IdApartment"=> $item['IdApartment']);
                        $images = $this->model->getAppImgs("*","photos",$where,$param);
                        //----------------------------------------------------
                        
                        $output.='<div class="large_image">';
                            $output.='<img class="large_image_byty" src="../Resource/images/photos/images/'.$images[0]['FileName'].'" alt="">';
                        $output.='</div>';
                    $output.='</div>';
                    //IMAGE CAROUSEL
                    $output.='<div class="pictureSlide ">';
                        foreach($images as $img)
                        {
                            $output.='<div><img class="byt_image" src="../Resource/images/photos/images/'.$img['FileName'].'" alt=""></div>';
                        }
                    
                    $output .='</div>';

                $output .='</div>';
            }
            echo $output;
            
            
        }else
        {
            echo "ERROR";
        }
    }

}
?>
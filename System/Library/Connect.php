<?php
class Connect {
    function __construct(){
        $this->db = new QueryManager("root","","home_management_system");
    }
}
?>
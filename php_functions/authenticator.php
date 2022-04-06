<?php
include_once ("php_functions/functions.php");
include_once ("configs/conn.inc");

$token = $_SESSION['o-token'];
$valid = validatetoken($token);
if($valid == 0){
    echo "<meta http-equiv=\"refresh\" content= \"0, URL=login\" />";
    die("Your session is invalid");
}
else{
    ////=======Good to go
}
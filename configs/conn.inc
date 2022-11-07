<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED & ~E_WARNING);
date_default_timezone_set("Africa/Nairobi");

//db configs
$hostname = '159.203.186.99:3306';
$dbname   = 'bg_db'; 
$username = 'jonah';
$password = 'Q324_h982778';

// connect to host
$con=mysqli_connect($hostname,$username,$password,$dbname);
if(mysqli_connect_errno())
{
    printf('Error Establishing a database connection');
    exit();
}

$date=date('Y-m-d');
$date2=date('Y-M-D');
$fulldate=date('Y-m-d H:i:s');
$thisyear=date('Y');
$thismonth=date('m');
$thismonthname=date('M');
$thisday=date('d');
$thisdayname=date('D');
  $assets = "assets/";
  $home_url = "http://localhost/zidi-app";

?>


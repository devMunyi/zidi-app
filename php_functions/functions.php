<?php
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~common
function zerotone($val){
    if($val == 1){
        return 0;
    }
    else{
        return 1;
    }
}
function toggleico($val){
    if($val == 1){
        return "<i class=\"fa fa-times text-red\"></i>";
    }
    else{
        return "<i class=\"fa fa-check text-green\"></i>";
    }
}
function session_details(){
    $userd = array();
    if(isset($_SESSION['o-token']))
    {
        $token = $_SESSION['o-token'];
        $valid = validatetoken($token);
        if($valid == 0){
            header("location:login");
            return null;
        }
        else{
            $token_user = fetchrow('o_tokens',"token='$token'","userid");
            $userd = fetchonerow('o_users',"uid='$token_user'","*");

        }

    }
    else{
        return null;
    }
    return $userd;
}

function company_settings(){
    $company = fetchonerow('platform_settings',"uid=1","name, logo, icon, link");
    return $company;
}

function validatetoken($token){
    global $fulldate;
    $token_valid = checkrowexists("o_tokens","token='$token' AND status=1 AND expiry_date >= '$fulldate'");
    if($token_valid == 1){
        return 1;
    }
    else{
        return 0;
    }

}

function passencrypt($pass)
{
    $oursalt=crazystring(32);  //generate a random number
    $longpass=$oursalt.$pass;                          //Prepend to the password
    $hash=hash('SHA256',$longpass);

    return $hash.$oursalt;
    //save hash and salt in diffrent tables
}


function profile($sid){
    $rid = decurl($sid);
    $d = fetchonerow('s_staff',"uid='$rid'");
    $fname = $d['first_name'];
    $lname = $d['last_name'];

    return $fname.' '.$lname ;

}


function username($sid){
    $rid = decurl($sid);
    $d = fetchonerow('s_staff',"uid='$rid'","user_name");
    $username = $d['user_name'];

    return $username;
}


function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


function crazystring($length)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%^*()_+-~{}[];:|.<>';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function store_event($tbl, $fld, $event_details){
    global $fulldate;
    $ses = session_details();
    $event_by = $ses['uid'];
    $fds = array('tbl','fld','event_details','event_date','event_by','status');
    $vals = array("$tbl","$fld","$event_details","$fulldate","$event_by","1");
    $create = addtodb('o_events',$fds,$vals);
    if($create == 1)
    {
      return 1;

    }
    else
    {
        return 0;
    }
}


function fancydate($udate){
    global  $date;
    $datediff = datediff($date, $udate);
    if($datediff == 1){
        return "<span  class='badge bg-blue'>Tomorrow</span>";
    }
    elseif($datediff == 0){
        return "<span  class='badge bg-orange'>Today</span>";
    }
    elseif($datediff == -1){
        return "<span class='badge bg-red-active'>Yesterday</span>";
    }
    elseif($datediff < -1){
        return "<span class='badge bg-red-active'>$udate</span>";
    }
    else{
        return "<span class='badge'>$udate</span>";
    }


}
function datefromdatetime2($s){
    $dt = new DateTime($s);

    $date = $dt->format('Y-m-d');
    $time = $dt->format('H:i:s');

    return $date;
}

function flag($flag){
    if($flag > 0) {
        $flagd = fetchonerow('o_flags', "uid='$flag'", "name, color_code");
        return "<span class='font-13 font-bold' style='color: " . $flagd['color_code'] . ";'><i class='fa fa-flag'></i> " . $flagd['name'] . "</span>";
    }
    else{
        return "";
    }
}
function next_step($step){
    if($step > 0) {
        $step_d = fetchonerow('o_next_steps', "uid='$step'", "name, details");
        return "<span class='label font-13 font-bold' style='background-color: " 
        . $step_d['details'] . ";'>" . $step_d['name'] . "</span>";
    }
    else{
        return "";
    }
}

/////////////////////////////////*****************************************End of random number generator
function fetchtable($table, $category,$orderby,$dir,$limit,$fds='*')      ////####################################Fetch whole table
{
    global $con;
    $query="SELECT $fds FROM ".$table." WHERE ".$category." ORDER BY ".$orderby.' '.$dir." LIMIT ".$limit; //echo "<tr><td>".$query."</td></tr>";
    $result=mysqli_query($con, $query);   //var_dump($query);

    return $result;

}


function fetchtable2($table, $category,$orderby,$dir,$fds='*')  
////####################################Fetch whole table without a LIMIT
{
    global $con;
    $query="SELECT $fds FROM ".$table." WHERE ".$category." ORDER BY ".$orderby.' '.$dir; 
    //echo "<tr><td>".$query."</td></tr>";
    $result=mysqli_query($con, $query);   //var_dump($query);

    return $result;

}

function fetchtableGroup($table, $category,$orderby,$dir,$groupby,$limit)      ////####################################Fetch whole table
{
    global $con;
    $query="SELECT * FROM ".$table." WHERE ".$category." GROUP BY ".$groupby." ORDER BY ".$orderby.' '.$dir." LIMIT ".$limit; //var_dump($query);
    $result=mysqli_query($con, $query);

    return $result;

}
function extractnumber($str)
{


    preg_match_all('!\d+!', $str, $matches);

    $final = implode('', $matches[0]);

    return $final;

}


function fetchrow($table, $where, $name)            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT $name FROM $table WHERE ($where)";
    $result=mysqli_query($con,$query);
    $row=mysqli_fetch_array($result, MYSQLI_ASSOC); //var_dump($query);
    $attrequired=$row[$name];

    return $attrequired;

}
function fetchonerow($table, $where,$fds='*')            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT $fds FROM $table WHERE ($where)";  //var_dump($query);
    $result=mysqli_query($con, $query);
    $roww=mysqli_fetch_array($result);

    return $roww;

}
function fetchonerowrich($table, $where,$orderby, $dir, $limit,$fds='*')            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT $fds FROM $table WHERE ($where) ORDER BY $orderby $dir LIMIT $limit,1";  //var_dump($query);
    $result=mysqli_query($con, $query);
    $roww=mysqli_fetch_array($result);

    return $roww;

}

function fetchrandomrow($table, $where)            ////##########################################Fetch only one row
{
    $query="SELECT * FROM $table WHERE $where order by RAND()"; //var_dump($query);
    $result=mysql_query($query);
    $roww=mysql_fetch_array($result);

    return $roww;

}
function fetchmaxid($table,$where,$fds='*')
{
    global $con;
    $query="SELECT $fds FROM $table WHERE $where order by uid desc LIMIT 0,1"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $roww=mysqli_fetch_array($result, MYSQLI_ASSOC);

    return $roww;
}
function fetchmax($table,$where,$orderby,$fds='*')
{
    global $con;
    $query="SELECT $fds FROM $table WHERE $where order by $orderby desc LIMIT 0,1"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $roww=mysqli_fetch_array($result, MYSQLI_ASSOC);

    return $roww;
}
function fetchminid($table,$where, $orderby='uid')
{
    global $con;
    $query="SELECT * FROM $table WHERE $where order by $orderby asc LIMIT 0,1"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $roww=mysqli_fetch_array($result, MYSQLI_ASSOC);

    return $roww;
}
function checkrowexists($table, $where)            ////##########################################Fetch only one row
{
    global $con;
    $query="SELECT * FROM $table WHERE $where"; //var_dump($query);
    $result=mysqli_query($con,$query);
    $totalrows=mysqli_num_rows($result);
    if($totalrows>0)
    {
        return 1;
    }
    else
    {
        return 0;
    }

}
function searchtable($table, $category,$fields, $tags,$dir,$limit)
{
    $query="SELECT * FROM ".$table." WHERE ".$category." AND ".$fields." LIKE %".$tags."% LIMIT ".$limit; // var_dump($query);
    $result=mysql_query($query) ;

    return $result;

}


function countotal($table, $where, $fds='*')
{
    global $con;
    $query="SELECT $fds FROM $table WHERE $where"; //var_dump($query);
    $result=mysqli_query($con, $query); $totalrows=mysqli_num_rows($result);
    return $totalrows;

}
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function input_available($x)
{
    $x=rtrim($x);
    if(empty($x))
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
function input_exists($table,$where,$field,$value)
{
    $where = "$field='$value' && $where";
    $ch = checkrowexists($table,$where);
    return $ch;
}



function input_length($x,$l)
{
    $x=rtrim($x);
    if((strlen($x)<$l))
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
function input_between($low, $high, $string)
{
    $strlen = strlen($string);
    if($strlen>=$low && $strlen<=$high)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
function validate_phone($phone)
{
    if((strlen($phone)) == 12 && (substr($phone, 0, 3) === "254"))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

function make_phone_valid($phone)
{
    if((strlen($phone)) == 12 && (substr($phone, 0, 3) === "254"))
    {
        return $phone;
    }
    else
    {
        if(substr($phone, 0, 1) === "0")
        {
            $hone = ltrim($phone, "0");
            $vphone = "254".$hone;
            return $vphone;
        }
        else
        {
            return $phone;
        }
    }
}
function vnozero($x)
{
    if($x>0)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
function file_avail($filesize)
{
    if($filesize<0.0000000000000000001)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}

function file_type($filename, $search_array)
{
    $ext=pathinfo($filename, PATHINFO_EXTENSION);
    $ext=strtolower($ext);
    if((!in_array("$ext", $search_array)))
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
function file_size($x, $max)
{
    if(($x>0) && ($x>$max))
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
function emailOk($emaill)
{
    if(filter_var($emaill,FILTER_VALIDATE_EMAIL))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
//////////----------------Date functions
function timeago($startdate, $enddate)
{
    $sfdate = strtotime($startdate);
    $sldate = strtotime($enddate);
    $diff = strtotime($enddate) - strtotime($startdate);

    if ($diff < 0)
    {
        $diff = strtotime($startdate) - strtotime($enddate);
        $m = '-';
    } else
    {
        $m = '';
        //  echo "[+]";
        // $late=0; $ico='bomb.png'; $color='orange';
    }

    // immediately convert to days
    $temp = $diff / 86400; // 60 sec/min*60 min/hr*24 hr/day=86400 sec/day
    // days
    $days = floor($temp);
    $temp = 24 * ($temp - $days);
    // hours
    $hours = floor($temp);
    $temp = 60 * ($temp - $hours);
    // minutes
    $minutes = floor($temp);
    $temp = 60 * ($temp - $minutes);
    // seconds
    $seconds = floor($temp);


    $date_ = date("d M -y", strtotime($startdate));
    $time_ = date("g:i A", strtotime($startdate));

    if($days == 0 AND $hours == 0)
    {
        return "$minutes mins ago";
    }
    elseif($days == 0 AND $hours > 0)
    {
        return "$hours hrs ago";
    }
    elseif($days == 1)
    {
        return "Yesterday $time_";
    }
    elseif($days > 1)
    {
        return $date_;
    }
    else
    {
        return $date_;
    }

}

function datecompare($date1, $date2)
{
    $date1 = strtotime($date1);
    $date2 = strtotime($date2);

    $diff = $date1 - $date2;
    if ($diff > 0) /////first date is newer than second
    {
        return 1;
    } elseif ($diff < 0) ////fisrt date is older than second
    {
        return - 1;
    } elseif ($diff == 0) ///date are the same
    {
        return 0;
    }
}

function dateadd($date, $ys, $mts, $dys)
{
    $newtime = strtotime($date." + $ys years + $mts months   + $dys days");
    return date("Y-m-d", $newtime);
}

function datesub($date, $ys, $mts, $dys)
{
    $newtime = strtotime($date." - $ys years - $mts months   - $dys days");
    return date("Y-m-d", $newtime);
}


//////////----------------End of date functions
/// //////---------------File functions
function upload_file($fname,$tmpName,$upload_dir)
{
    $ext=pathinfo($fname, PATHINFO_EXTENSION);
    $nfileName=generateRandomString(25).'.'."$ext";

    $filePath = $upload_dir.$nfileName;

    $result = move_uploaded_file($tmpName, $filePath); //var_dump($result);
    if (!$result)
    {
        return 0;
    }
    elseif($result)
    {
        return $nfileName;
    }
}
function makeThumbnails($updir, $img,$w,$h,$fname){
    $thumbnail_width = $w;
    $thumbnail_height = $h;
    $thumb_beforeword = "thumb";
    $ext=fileext_fetch($img);
    $arr_image_details = getimagesize("$updir"."$img"); // pass id to thumb name
    $original_width = $arr_image_details[0];
    $original_height = $arr_image_details[1];
    if ($original_width > $original_height) {
        $new_width = $thumbnail_width;
        $new_height = intval($original_height * $new_width / $original_width);
    } else {
        $new_height = $thumbnail_height;
        $new_width = intval($original_width * $new_height / $original_height);
    }
    $dest_x = intval(($thumbnail_width - $new_width) / 2);
    $dest_y = intval(($thumbnail_height - $new_height) / 2);
    if ($arr_image_details[2] == 1) {
        $imgt = "ImageGIF";
        $imgcreatefrom = "ImageCreateFromGIF";
    }
    
    if ($arr_image_details[2] == 2) {
        $imgt = "ImageJPEG";
        $imgcreatefrom = "ImageCreateFromJPEG";
    }
    if ($arr_image_details[2] == 3) {
        $imgt = "ImagePNG";
        $imgcreatefrom = "ImageCreateFromPNG";
    }

    if ($imgt == "ImageJPEG") {
        $old_image = imagecreatefromjpeg("$updir"."$img");
    }

    if($imgt == "ImagePNG"){
        $old_image = imagecreatefrompng("$updir"."$img");
    }

    if($imgt == "ImageGIF"){
        $old_image = imagecreatefromgif("$updir"."$img");
    }

        $new_image = imagecreatetruecolor($thumbnail_width, $thumbnail_height);

        imagealphablending($new_image,false);
        imagesavealpha($new_image,true);

        $transparency=imagecolorallocatealpha($new_image,255,255,255,127);
        imagefilledrectangle($new_image,0,0,$w,$h,$transparency);

        imagecopyresized($new_image, $old_image, $dest_x, $dest_y, 0, 0, $new_width, $new_height, $original_width,
         $original_height);
        $imgt($new_image, "$updir"."$fname" . ".$ext");
}


function fileext_fetch($filename)
{
    $ext=pathinfo($filename, PATHINFO_EXTENSION);
    return $ext;
}




/////TOtal loans for a given month
function month_loans($m)
{
    $totall = totaltable('s_loans',"month(given_date) = $m AND status in (2,4,5,6)","loan_amount");
    return $totall;
}

function loan_state($status){
    if($status > 0){
        $state = fetchonerow('o_loan_statuses',"uid='$status'","name, color_code");
        $status_name = "<label class='label font-14 text-uppercase label-default' style='background-color: ".$state['color_code']." ;'>".$state['name']."</label>";
    }
    else{
        $status_name = "<label class='label font-14 text-uppercase label-default'>Deleted</label>";
    }
    return $status_name;
}
function loan_next_stage($loan_id){
    $result = array();
    $next_stage = null;
    $l = fetchonerow("o_loans","uid='".$loan_id."'","uid, product_id, loan_stage");
    $product_id = $l['product_id'];
    $loan_stage = $l['loan_stage'];
    $current_stage_order = fetchrow('o_product_stages',"uid='$loan_stage' AND status=1","stage_order");

    if($product_id > 0){
        $next_stage = fetchminid('o_product_stages',"product_id='$product_id' AND status=1 AND uid != $loan_stage AND stage_order > $current_stage_order","stage_order");
        $next_stage_id = $next_stage['stage_id'];
        $stage_info = fetchonerow('o_loan_stages',"uid='$next_stage_id' AND status=1","uid, name, description");
        if($next_stage_id > 0){
          $state = 1;
        }
        else{
            $state = "NO_STAGE";
        }
    }
    else{
        $state = 0;
    }
    $result['state'] = $state;
    $result['stage_details'] = $stage_info;


    return $result;
}
function loan_prev_stage($loan_id){

}

function loan_addons($loan_id){
    $total_addons = totaltable('o_loan_addons',"loan_id='$loan_id' AND status=1","addon_amount");
    return $total_addons;
}

function deduction_amount($amount, $deduction_id){
    $deduction_d = fetchonerow('o_deductions',"uid='$deduction_id'","amount, amount_type");
    if(($deduction_d['amount_type']) == 'FIXED_VALUE'){
        return $deduction_d['amount'];
    }
    else if(($deduction_d['amount_type']) == 'PERCENTAGE')
        {
            $perc = round(($amount * ($deduction_d['amount']/100)), 2);
            return $perc;
       }
    else{

    }
}

function addon_amount($amount, $addon_id){
    $add_d = fetchonerow('o_addons',"uid='$addon_id'","amount, amount_type");
    if(($add_d['amount_type']) == 'FIXED_VALUE'){
        return $add_d['amount'];
    }
    else if(($add_d['amount_type']) == 'PERCENTAGE')
    {
        $perc = round(($amount * ($add_d['amount']/100)), 2);
        return $perc;
    }
}

function loan_deductions($loan_id){
    $total_deductions = totaltable('o_loan_deductions',"loan_id='$loan_id' AND status=1","deduction_amount");
    return $total_deductions;
}
function loan_obj($loan_id){
    $l = fetchonerow("o_loans","uid='".$loan_id."'","loan_amount ,disbursed_amount ,total_repayable_amount ,total_repaid ,total_addons ,total_deductions ,given_date ,next_due_date ,final_due_date");
    $l['loan_balance'] = $l['total_repayable_amount'] - $l['total_repaid'];
    return $l;
}

function repay_schedule($loan_id){
    $l = fetchonerow("o_loans","uid='".$loan_id."'","*");
    if($l['uid'] > 0) {

        $given_date = $l['given_date'];
        $freq_days = $l['payment_frequency'];
        $period_days = $l['period']*$l['period_units'];
        $total_repayable = $l['total_repayable_amount'];
        $total_repaid = $l['total_repaid'];


        if($freq_days > 0) {
            $instalments = floor(($period_days / $freq_days));
            $instalment_amount = ceil(($total_repayable / $instalments));

            $rec = "";
            for ($i = 1; $i <= $instalments; ++$i) {
                $date = dateadd($given_date, 0, 0, ($freq_days * $i));
                $amount_sofar = $instalment_amount * $i;
                if ($total_repaid >= $amount_sofar) {
                    $state = "<span class='font-13 text-green'><i class='fa fa-check'></i>Repaid </span>";
                } else {
                    $state = "<span class='font-13 font-13 text-red'><i class='fa fa-times'></i>Unpaid </span>";
                }
                $rec .= " <tr><td>$date</td><td>" . money($instalment_amount) . "</td><td> $state </td> </tr>";
            }
        }
        else{
            if ($total_repaid >= $total_repayable) {
                $state = "<span class='font-13 text-green'><i class='fa fa-check'></i>Repaid </span>";
            } else {
                $state = "<span class='font-13 text-red'><i class='fa fa-times'></i>Unpaid </span>";
            }
            $rec = " <tr><td>".$l['final_due_date']."</td><td>" . money($total_repayable) . "</td><td> $state </td> </tr>";
        }
     return $rec;
    }
    else{
        return "Loan not found";
    }

}


function recalculate_loan($loan_id){
    $l = fetchonerow("o_loans","uid='".$loan_id."'","*");
    /////////------------deductions
    $deduction_total = loan_deductions($loan_id);
    /////////------------AddOn total
    $addon_total = loan_addons($loan_id);

    /////////------------Total Repaid
    $repaid_total = total_repaid($loan_id);

    $disbursed_amount = $l['loan_amount'] - $deduction_total;
    $total_repayable_amount = $l['loan_amount'] + $addon_total;
    $fds = "total_addons='$addon_total', total_deductions='$deduction_total', total_repaid='$repaid_total', disbursed_amount='$disbursed_amount', total_repayable_amount='$total_repayable_amount'";
    $update = updatedb('o_loans',$fds, "uid='$loan_id'");

}


///Total collection for a given month
function month_collections($m)
{
    $totall = totaltable('s_incoming_payments',"month(date_received) = $m AND status in (1,2)","amount");
    return $totall;
}
///TOtal customers for a given month
function new_customers($m)
{
    $totall = countotal('s_users_primary',"month(added_date) = $m AND status in (2)","uid");
    return $totall;
}
///TOtal leads for a given month
function new_leads($m)
{
    $totall = countotal('s_users_primary',"month(added_date) = $m AND status in (1)","uid");
    return $totall;
}

function thumbnail($filename, $newsize)
{
    // File and new size
    //  $filename = 'test.jpg';
    $percent = 0.5;

    // Content type
    //  header('Content-Type: image/jpeg');

    // Get new sizes
    list($width, $height) = getimagesize($filename);
    $newwidth = $width * $percent;
    $newheight = $height * $percent;

    // Load
    $thumb = imagecreatetruecolor($newwidth, $newheight);
    $source = imagecreatefromjpeg($filename);

    // Resize
    imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

// Output
    imagejpeg($thumb);
}

function errormes($x)
{
    return "<div class='alert alert-danger'>$x</div>";
}
function sucmes($x)
{
    return "<div class='alert alert-success'>$x</div>";
}
function success($x)
{
    return "<div class='alert successbox'>$x</div>";
}
function notice($x)
{
    return "<div class='alert alert-info'>$x</div>";
}


function isyear($x)
{
    if((strlen($x))==4)
    {
        if(is_numeric($x))
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else
    {
        return 0;
    }
}
//////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>End of validate input
/////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<< Accept parameters of table name, fields and values and add to database

function addtodb($tb, $fds, $vals)
{
    global $con;
    ////example              // $ffields=array('user_id','module_id','vie','ad','edi','del');
    // $vvals=array("$selectedval","$uuid","0","0","0","0");
    // $iinsertnew=addtodbsilent('user_permissions',$ffields,$vvals);

    /////////________Secure input
    // $vals = array_map('stripslashes', $vals);
    $fields=implode(',',$fds); //implode () returns string from the elements of an array 
    $values=implode("','",$vals);
    $values="'$values'";

    $insertq="INSERT into $tb ($fields) VALUES ($values)";  //echo $insertq;

    if(!mysqli_query($con,$insertq))
    {
        return mysqli_error($con);  var_dump($e);
    }
    else
    {
        return 1;
    }

}

function updatedb($tb, $fds, $where)
{
    global $con;
    $insertq="UPDATE $tb SET $fds WHERE $where"; //var_dump($insertq);

    if(!mysqli_query($con, $insertq))
    {
        return mysqli_error($con);
    }
    else
    {
        return 1;
        logupdate($tb, $insertq);
    }

}

/////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<< Accept parameters of table name, fields and values and update database
function deletedata($tb,$did)
{
    global $con;
    $insertd="DELETE FROM $tb WHERE uid=$did";
    if(!mysqli_query($con, $insertd))
    {
        return 0;
    }
    else
    {
        return 1;
    }

}
function delete2($tb,$where)
{
    global $con;
    $insertd="DELETE FROM $tb $where";
    if(!mysqli_query($con, $insertd))
    {
        return 0;
    }
    else
    {
        return 1;
    }

}


function notify($from,$to,$title,$content,$linkto)
{
    global  $fulldate;

    $fds = array('staff_id','sent_date','source_details','title','details','link','status');
    $vals = array("$to","$fulldate","$from","$title","$content","$linkto","1");
    $create = addtodb('o_notifications',$fds,$vals);

    return $create;
}
function notifyUpdate($uid,$date,$heading,$content,$linkto)
{
    $updaten=updatedb('wb_notifications',"notifdate='$date',heading='$heading',content='$content',linkto='$linkto', status=0","uid='$uid'");
    return $updaten;
}
function bmail($from,$to,$replyto,$subject,$body,$cc)
{


    $message = '<html><body>';
    $message .= "<h1>$subject</h1>";
    $message.=$body;
    $message .= '</body></html>';

    $headers = "From: $from" . "\r\n" .
        "Reply-To: $replyto";
    $headers .= "CC: $cc\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";



    $sm=mail($to, $subject, $message, $headers);
    return $sm;
}
function totaltable($table,$where,$fld)   /////////////////////add up all fields of a given table
{
    global $con;
    $q="SELECT sum($fld) FROM $table WHERE $where";  //echo $q;
    $result=mysqli_query($con, $q);
    $row=mysqli_fetch_array($result);
    return $row[0];
}
function get_string_between($string, $start, $end)
{
    $string = " ".$string;
    $ini = strpos($string,$start);
    if ($ini == 0) return "";
    $ini += strlen($start);
    $len = strpos($string,$end,$ini) - $ini;
    return substr($string,$ini,$len);
}

function deletefile($link)
{
    if(!unlink($link))
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
function plaintext($html)
{
    // remove comments and any content found in the the comment area (strip_tags only removes the actual tags).
    $plaintext = preg_replace('#<!--.*?-->#s', '', $html);

    // put a space between list items (strip_tags just removes the tags).
    $plaintext = preg_replace('#</li>#', ' </li>', $plaintext);

    // remove all script and style tags
    $plaintext = preg_replace('#<(script|style)\b[^>]*>(.*?)</(script|style)>#is', "", $plaintext);

    // remove br tags (missed by strip_tags)
    $plaintext = preg_replace("#<br[^>]*?>#", " ", $plaintext);

    // remove all remaining html
    $plaintext = strip_tags($plaintext);

    return $plaintext;
}

function makenumeric($string)
{
    $num=preg_replace("/[^0-9]/","",$string);
    return $num;
}
function makedouble($string)
{
    $num=preg_replace("/[^0-9.]/","",$string);
    return $num;
}
function allowedfiles()
{
    $files=array('pdf','ppt','pptx','doc','docx','rtf','xlt','xltx','zip','rar','ai','psd');
    return $files;
}
function allowedocs()
{
    $docs= array('pdf','ppt','pptx','doc','docx','rtf','xlt','xltx');
    return $docs;
}
function allowedimages()
{
    $images = array('jpg','jpeg','png');
    return $images;
}

function encurl($id)
{
    $secureId=$id*1321;
    return $secureId;
}
function decurl($id)
{
    $originalId=$id/1321;
    return $originalId;
}
function current_url()
{
    return $_SERVER['HTTP_HOST'];
}

function mycountry()
{
    return 'KE';
}
function currency()
{
    return 'Ksh';
}
function truecurrency($value)
{
    $num=number_format($value,2);
    $currency=currency();
    return $currency.' '.$num;
}

function intodolars($amount)
{
    return "$amount";
}
function intomycur($dolars)
{
    $converted=$dolars*100;
    return 'Ksh.'.$converted;
}
//////!!!!!!!!!!!!!!!!!!!!!!Common classes


function accepted_files($x)
{
    if($x==1)  /// contest post attachments
    {
        return ".jpg,.JPG,.jpeg,.JPEG.png,.PNG,.gif,.GIF.pdf,.PDF,.doc,.DOC,.docx,.DOCX, .ppt,.PPT,.pptx,.PPTX,.txt,.TXT,.psd,.PSD,.ai,.AI";
    }
}

function sanitize_url($unsafeurl)
{
    $new_url = sanitize_title("$unsafeurl");
    return $new_url;
}

function sanitize_title($str){
    $s = $str;
    $r = preg_replace('/\W+/', '-', strtolower(trim($s)));
    return $r;
}



function safehtml($html)
{
    $safeHtml = addslashes($html);
    $safeHtml=  htmlspecialchars($html);

    // $safeHtml = stripslashes($html);

    $safeHtml = htmlentities($safeHtml);

    return $safeHtml;
}

function htmldec($html)
{
    $unsafeHtml = html_entity_decode($html);
    return $unsafeHtml;
}




function error($x)
{
    return "<span class=\"errorbox\">$x</span>";
}


function upload_file_name($fname,$tmpName,$upload_dir)
{


    $ext=pathinfo($fname, PATHINFO_EXTENSION);
    $path_parts  = pathinfo($fname);
    $name = $path_parts['filename'];

    $nfileName=safename($name).'.'."$ext";

    $filePath = $upload_dir.$nfileName;

    $result = move_uploaded_file($tmpName, $filePath); //var_dump($result);
    if (!$result)
    {
        return 0;
    }
    elseif($result)
    {
        return $nfileName;
    }
}
function safename($string)
{
    $nstring = str_replace(' ','_',$string);
    $datestring = date("Y-m-d_h-i-s");

    return  $nstring.'-'.$datestring;
}

function save_log($content)
{
    global $con;
    global $fulldate;
    $fds = array('activity','date_created');
    $vals = array("$content","$fulldate");
    $createlog = addtodb('s_activity_logs',$fds,$vals);
}



function payment_status($state)
{
    if($state == 1)
    {
        $status = 'Added';
    }
    elseif($state == 2)
    {
        $status = 'Verified';
    }
    elseif($state == 3)
    {
        $status = 'Disputed';
    }
    elseif($state == 4)
    {
        $status = 'Reversed';
    }
    elseif($state == 5)
    {
        $status = 'Deleted';
    }

    return $status;

}
function admin_status($state)
{


    if($state == 0)
    {
        $status = "<span class=\"label label-default\">Inactive</span>";;
    }
    elseif($state == 1)
    {
        $status = "<span class=\"label label-success\">Active</span>";
    }
    elseif($state == 2)
    {
        $status = "<span class=\"label label-success\">Blocked</span>";
    }
    elseif($state == 3)
    {
        $status = "<span class=\"label label-success\">Former</span>";
    }

    return $status;

}
function gender($gender)
{
    if($gender == 1){return 'Male';} elseif($gender ==2){return 'Female';} else{return 'Unspecified';}
}


/////////////___________Details
class credit_details
{
    var $cid;

    function __construct($cid)
    {
        $this -> cid = $cid;
    }
    function total_loans()
    {
        $cid = $this -> cid;
        $totall = countotal('s_loans',"customer_id='$cid' AND status in (2,4,5,6)");

        return $totall;
    }
    function total_loan_value()
    {
        $cid = $this -> cid;
        $totall = totaltable('s_loans',"customer_id='$cid' AND status in (2,4,5,6)","loan_amount");
        if($totall>0){}else{$totall = 0;}
        return $totall;
    }
    function total_repayments_value()
    {
        $cid = $this -> cid;
        $loan_codes = array();
        $all_loans = fetchtable('s_loans',"customer_id='$cid'","uid","desc","1000","uid");
        while($l = mysqli_fetch_array($all_loans))
        {
            array_push($loan_codes,$l['uid']);
        }

        $loans_string = implode(",", $loan_codes);
        $totall = totaltable('s_incoming_payments',"loan_id in ($loans_string) AND status =1","amount");
        if($totall>0){}else{$totall = 0;}
        return $totall;
    }




}
////____________Pass loan code and get all details about a loan

class loan_details
{
    var $loanid = 0;
    var $total_repaid = 0;
    var $l = array();

    function __construct($loanid)
    {
        $this -> loanid = $loanid;
        $l = fetchonerow('s_loans',"uid = '$loanid'");
        $total_repaid = totaltable('s_incoming_payments',"loan_id='$loanid'","amount");
        $this ->l = $l;
        $this -> total_repaid = $total_repaid;

    }
    function loan_amount()
    {
        $l = $this -> l;
        $loan_amount = $l['amount'];

        if($loan_amount>0){} else{$loan_amount = 0;}

        return $loan_amount;

    }
    function loan_interest()
    {
        $l = $this -> l;
        $loan_interest = $l['loan_interest'];
        if($loan_interest>0){} else{$loan_interest = 0;}
        return $loan_interest;
    }
    function loan_late_interest()
    {
        $l = $this -> l;
        $late_interest = $l['late_interest'];

        if($late_interest>0){} else{$late_interest = 0;}
        return $late_interest;
    }
    function total_repaid()
    {
        $total_repaid = $this -> total_repaid;
        if($total_repaid>0){} else{$total_repaid = 0;}
        return $total_repaid;

    }
    function loan_balance()
    {
        $l = $this -> l;
        $payable = $l['loan_total'];
        $given_date = $l['given_date'];
        $loan_amount = $l['loan_amount'];
        $loan_product = $l['loan_product'];
        $loan_interest = $l['loan_interest'];

        global $date;
        $days_passed = datediff($given_date, $date);

        ////___________Payable for Dumisha
        if($loan_product == 4)
        {
            if($days_passed<=14) ////-----Use the 14% already there
            {

            }
            elseif($days_passed>14 && $days_passed<=30) /////Day 15 - 30 Use 1% per day
            {
                $daily = $days_passed - 14;
                $new_added_interest = $loan_amount * ($days_passed/100);

            }
            elseif($days_passed > 30) ///Day 31 and above, use 16%
            {
                $new_added_interest = ceil($loan_amount * (16/100));
            }
            $payable = $loan_amount + $loan_interest + $new_added_interest;
        }


        $total_repaid = $this -> total_repaid;

        $balance = $payable - $total_repaid;
        if($balance<0){$balance == 0;}

        return $balance;
    }

    function last_repayment_date()
    {
        $loanid = $this -> loanid;
        $last_d = fetchmax('o_incoming_payments',"loan_id='$loanid'","date_received","date_received");
        $last_payment_date = $last_d['date_received'];
        return $last_payment_date;
    }
}


function createloan($user,$amount,$product)
{
    $userdetails = fetchonerow('s_users_primary',"uid='$user'");
    $productdetails = fetchonerow('s_loan_products',"uid='$product'");

    $first_name = $userdetails['first_name'];
    $primary_phone = $userdetails['primary_phone'];
}

function paging($url,$orderby,$dir,$offset,$rpp,$fds,$search,$box,$remaining,$where='uid>0')
{
    $nrpp = $offset+$rpp;

    if($offset>1)
    {
        $off = $offset - $rpp;
        echo "<button onclick=\"paging('$url','$orderby','$dir','$off','$rpp','$fds','$search','$box','$where');\" class=\"btn btn-primary\">Prev</button> &emsp;";

    }
    else
    {
        echo "<button class=\"btn btn-default disabled\">Prev</button> &emsp;";
    }
    echo $offset.'-'.$nrpp;
    if($remaining > $rpp)
    {
        $off = $offset + $rpp;
        echo "&emsp;<button onclick=\"paging('$url','$orderby','$dir','$off','$rpp','$fds','$search','$box','$where');\" class=\"btn btn-primary\">Next</button>";
    }
    else
    {
        echo "&emsp;<button class=\"btn btn-default disabled\">Next</button>";
    }
}


function paging_values_hidden($where, $offset, $rpp, $orderby, $dir, $search, $func, $page_no = 1, $alltotals){
    $vals.= "<input type='text' title='where' id='_where_' value='$where'>";
    $vals.= "<input type='text' title='offset' id='_offset_' value='$offset'>";
    $vals.= "<input type='text' title='rpp' id='_rpp_' value='$rpp'>";
    $vals.= "<input type='text' title='page_no' id='_page_no_' value='$page_no'>";
    $vals.= "<input type='text' title='orderby' id='_orderby_' value='$orderby'>";
    $vals.= "<input type='text' title='dir' id='_dir_' value='$dir'>";
    $vals.= "<input type='text' title='search' id='_search_' value='$search'>";
    $vals.= "<input type='text' title='func' id='_func_' value='$func()'>";
    $vals.= "<input type='text' title='all records' id='_alltotal_' value='$alltotals'>";

    return $vals;

}

function paging_values_hidden2($where, $offset, $rpp, $orderby, $dir, $search, $func, $sort, $page_no = 1){
    $vals.= "<input type='text' title='where' id='_where_' value='$where'>";
    $vals.= "<input type='text' title='offset' id='_offset_' value='$offset'>";
    $vals.= "<input type='text' title='rpp' id='_rpp_' value='$rpp'>";
    $vals.= "<input type='text' title='page_no' id='_page_no_' value='$page_no'>";
    $vals.= "<input type='text' title='orderby' id='_orderby_' value='$orderby'>";
    $vals.= "<input type='text' title='dir' id='_dir_' value='$dir'>";
    $vals.= "<input type='text' title='search' id='_search_' value='$search'>";
    $vals.= "<input type='text' title='func' id='_func_' value='$func()'>";
    $vals.= "<input type='text' title='sort' id='_sort_' value='$sort'>";

    return $vals;

}

function payment_schedule($loanid)
{


    $loand = fetchonerow('s_loans',"uid='$loanid'");
    $customer_id = $loand['customer_id'];
    $given_date = $loand['given_date'];
    $due_date = $loand['due_date'];
    $loan_amount = $loand['loan_amount'];
    $loan_total = $loand['loan_total'];
    $loan_product = $loand['loan_product'];

    $prod = fetchonerow('s_loan_products',"uid='$loan_product'");
    $product_name = $prod['product_name'];
    $loan_term = $prod['loan_term'];
    $payment_frequency = $prod['payment_frequency'];
    $loan_term = $prod['loan_term'];
    if($payment_frequency == 1){$pf = 7;} elseif($payment_frequency == 2){$pf = 30;}
    ///___Fetch the payment frequncy 1.e. 7 for weekly and 30 for Monthly
    echo "<h3 class=\"p-3 mb-2 bg-dark text-white\">Shapcare Credit</h3>";
    echo "<i>Repayment Schedule</i><br/>";
    echo "<strong><h4>Loan Ref: $loanid </h4></strong>";
    if($payment_frequency == 0)
    {
        /////The product does not require frequent payment
        $datef = date("d-M-Y", strtotime($due_date));
        echo "Pay <strong>Ksh. $loan_total</strong> not later than  <strong>$datef</strong> ";
    }
    else
    {
        $days = floor($loan_term / $pf);
        $periodic_pay = ceil($loan_total / $days);
        for($i =1; $i<=$days; ++$i)
        {
            $day = $i*$pf;
            $date = dateadd($given_date,0,0,$day);
            $datef = date("d-M-Y", strtotime($date));
            echo "Pay <strong>Ksh.$periodic_pay</strong> &emsp; By <strong>$datef</strong><br/>";
        }
    }



}



///__________Function to check customer balance
function customer_balance($cid){
    $last_loan = fetchmaxid('s_loans',"customer_id='$cid' AND status in (2,5,6)","uid");
    $lid = $last_loan['uid'];
    if($lid > 0)
    {
        $loan = new loan_details($lid);
        // $amount_paid = $loan -> total_repaid;
        // $last_payment_date = $loan -> last_repayment_date();
        $balance = $loan -> loan_balance();
        return $balance;

    }
    else
    {
        return 0;
    }
}



function sms_service($cat, $vals, $phone, $product,$shortcode, $nu=0){
    global $fulldate;
    $cust = fetchonerow('s_users_primary',"primary_phone='$phone'");
    $first_name = $cust['first_name'];
    $second_name = $cust['second_name'];
    $customer_id = $cust['uid'];


    $catd = fetchonerowrich('s_message_settings',"product='$product' AND message_category ='$cat' AND status = 1","uid","asc","$nu","*");
    $custom_message = $catd['message_content'];
    $uid = $catd['uid'];
    ////////_________Extract known values from passed array
    $first_name = $vals['fname'];
    $last_name = $vals['lname'];
    $creditlimit = $vals['creditlimit'];
    $amount = $vals['amount'];
    $date = $vals['date'];
    $duedate = $vals['duedate'];
    $phonenumber = $vals['phonenumber'];
    $loancode = $vals['loancode'];
    $balance = $vals['balance'];
    $receipt = $vals['receipt'];


    $custom_message = str_replace('{fname}',$first_name,$custom_message);
    $custom_message = str_replace('{lname}',$last_name,$custom_message);
    $custom_message = str_replace('{creditlimit}',$creditlimit,$custom_message);
    $custom_message = str_replace('{amount}',$amount,$custom_message);
    $custom_message = str_replace('{date}',$date,$custom_message);
    $custom_message = str_replace('{duedate}',$duedate,$custom_message);
    $custom_message = str_replace('{phonenumber}',$phonenumber,$custom_message);
    $custom_message = str_replace('{loancode}',$loancode,$custom_message);
    $custom_message = str_replace('{balance}',$balance,$custom_message);
    $custom_message = str_replace('{receipt}',$receipt,$custom_message);




    $newmes = $custom_message;
    if($uid > 0)
    {

        $mfds = array('short_code','customer_id','mobile_number','message','date_queued','sent_','status');
        $mvals = array("Shapcare","$customer_id","$phone","$newmes","$fulldate","0","1");
        echo addtodb('s_outgoing_sms',$mfds,$mvals);

    }
    else
    {
        echo "No message set in messages";
    }

}
function datediff3($startdate, $enddate) ///////////////////plain date
{
    $sfdate = strtotime($startdate);
    $sldate = strtotime($enddate);
    $diff = strtotime($enddate) - strtotime($startdate);

    if ($diff < 0)
    {
        $diff = strtotime($startdate) - strtotime($enddate);
        $m = '-';
    } else
    {
        $m = '';
        //  echo "[+]";
        // $late=0; $ico='bomb.png'; $color='orange';
    }

    // immediately convert to days
    $temp = $diff / 86400; // 60 sec/min*60 min/hr*24 hr/day=86400 sec/day
    // days
    $days = floor($temp);
    $temp = 24 * ($temp - $days);
    // hours
    $hours = floor($temp);
    $temp = 60 * ($temp - $hours);
    // minutes
    $minutes = floor($temp);
    $temp = 60 * ($temp - $minutes);
    // seconds
    $seconds = floor($temp);


    //return "$days*$hours*$minutes";

    return $days;
}

function datediff($startdate, $enddate) ///////////////////plain date
{
    $sfdate = strtotime($startdate);
    $sldate = strtotime($enddate);
    $diff = strtotime($enddate) - strtotime($startdate);

    if ($diff < 0)
    {
        $diff = strtotime($startdate) - strtotime($enddate);
        $m = '-';
    } else
    {
        $m = '';
        //  echo "[+]";
        // $late=0; $ico='bomb.png'; $color='orange';
    }

    // immediately convert to days
    $temp = $diff / 86400; // 60 sec/min*60 min/hr*24 hr/day=86400 sec/day
    // days
    $days = floor($temp);

    /*$temp = 24 * ($temp - $days);

    // hours
    $hours = floor($temp);

    $temp = 60 * ($temp - $hours);

    // minutes
    $minutes = floor($temp);

    $temp = 60 * ($temp - $minutes);
    // seconds
    
    $seconds = floor($temp);


    //return "$days*$hours*$minutes";
    */

    return $m.$days;
}

function date_greater($first, $last){
    $curdate=strtotime($first);
    $mydate=strtotime($last);

    if($curdate > $mydate)
    {
        return $mydate;
    }
    else{
        return 0;
    }
}


function money($num){
    return number_format($num,2,".",",");
}


function generateToken($userid, $device_id, $browser_name, $IPAddress, $OS)
{
    global $fulldate;
    $token_expiry = dateadd($fulldate,0,0,30); ///one month
    /////Remove other tokens for the user
    $cleartokens = updatedb('o_tokens',"status=2, expiry_date='$fulldate'","userid='$userid' AND status=1 AND device_id='$device_id'");
    /// Create new token
    $token = generateRandomString(64);
    $fds = array("userid","token","creation_date","expiry_date","device_id","browsername","IPAddress","OS","status");
    $vals = array("$userid","$token","$fulldate","$token_expiry","$device_id","$browser_name","$IPAddress","$OS","1");
    $create = addtodb("o_tokens", $fds, $vals);
    if($create == 1)
    {
        /// return token
        return $token;
    }
    else
    {
        return 0;
    }


}

function arrow_back($backto, $title){
    return "<a style='margin-right: 15px;' href='$backto' title='Back to $backto' class='text-blue font-16'>
    <i class='fa fa-reply'></i> Back to $title :</a>";
}
function status($state){
    if($state == 0){
        return "<label class='label label-danger'> Inactive</label>";
    }
    else if($state == 1){
        return "<label class='label label-success'> Active</label>";
    }
}


function deduction_exists($did, $pid){
      $deduction_exists = checkrowexists("o_product_deductions","deduction_id='$did' AND product_id='$pid' AND status = 1");
      if($deduction_exists  == 1){
        return "<a onclick=\"product_deduction_save($pid, $did, 'REMOVE')\" title='Click to Remove' class=\"text-success pointer\"><i class=\"fa fa-check\"></i> Added </a>";
      }
      else{
       return "<a onclick=\"product_deduction_save($pid, $did, 'ADD')\" title='Click to Add' class=\"text-primary pointer\"><i class=\"fa fa-times-circle\"></i> Not Added </a>";
      }

}

function addon_exists($aid, $pid){
    $deduction_exists = checkrowexists("o_product_addons","addon_id='$aid' AND product_id='$pid' AND status = 1");
    if($deduction_exists  == 1){
        return "<a onclick=\"product_addon_save($pid, $aid, 'REMOVE')\" title='Click to Remove' class=\"text-success pointer\"><i class=\"fa fa-check\"></i> Added </a>";
    }
    else{
        return "<a onclick=\"product_addon_save($pid, $aid, 'ADD')\" title='Click to Add' class=\"text-primary pointer\"><i class=\"fa fa-times-circle\"></i> Not Added </a>";
    }

}

function stage_exists($did, $pid){
    $stage_exists = checkrowexists("o_product_stages","stage_id='$did' AND product_id='$pid' AND status = 1");
    if($stage_exists  == 1){
        return "<a onclick=\"product_stage_save($pid, $did, 'REMOVE')\" title='Click to Remove' class=\"text-success pointer\"><i class=\"fa fa-check\"></i> Added </a>";
    }
    else{
        return "<a onclick=\"product_stage_save($pid, $did, 'ADD')\" title='Click to Add' class=\"text-primary pointer\"><i class=\"fa fa-times-circle\"></i> Not Added </a>";
    }

}




///////////----------------Loan Calculations

function total_instalments($period, $period_units, $payment_frequency){
    if($payment_frequency > 0){
        $total_instalments = round((($period * $period_units)/$payment_frequency),0);
    }
    else{
       $total_instalments = 1;
    }
  return $total_instalments;
}

function final_due_date($given_date, $period, $period_units){
    $total_days = $period * $period_units;
    $final_day = dateadd($given_date,0,0, $total_days);
    return $final_day;
}

function next_due_date($given_date, $period, $period_units, $payment_frequency){
    $total_days = $period * $period_units;

    if($payment_frequency > 0){
        $next_due = dateadd($given_date,0,0, $payment_frequency);
    }
    else{
        $next_due = dateadd($given_date,0,0, $total_days);
    }
    return $next_due;
}

function total_repaid($loan_id){
    $total_pay = totaltable('o_incoming_payments',"loan_id='$loan_id' AND status=1","amount");
    return $total_pay;
}

function loan_balance($loan_id){
   $repaid = total_repaid($loan_id);
   $loan =  fetchonerow("o_loans","uid='".$loan_id."'","total_repayable_amount");
   $repayable_amount = $loan['total_repayable_amount'];

   $balance = $repayable_amount - $repaid;
   updatedb("o_loans", "loan_balance=$balance", "uid=$loan_id AND status > 0");
   return $balance;
}

/// //////////////=============End of loan calculations
function logupdate($table, $query){
    
    //////Save the log in the o_logs_update table 
    $fds = array('','','','');
}
function table_to_obj($tbl, $where, $limit, $key, $value){
    $obj = array();
    $o_t = fetchtable($tbl,$where, $key, "asc", "0,$limit", "$key ,$value");
    while($l = mysqli_fetch_array($o_t))
    {
        $k = $l[$key];
        $v = $l[$value];
        $obj[$k] = $v;
    }
    return $obj;
}

?>

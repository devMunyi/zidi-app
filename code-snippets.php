<?php
include_once("configs/conn.inc");
include_once("php_functions/functions.php");

?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="List of code snippets to do backend tasks in over 30 languages. Zidi Platform">
    

    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="assets/plugins/highlightjs/styles/monokai-sublime.min.css">
    <title> Zidi : Page</title>
    <style type="text/css">
        /* body.dark{
        background-color: #292C35
    }

    body.dark p{
        color: #fff;
    }

    .checkbox:checked + .label .ball{
        transform: translate(24px);
    }
    */
    </style>

    <!-- Bootstrap Core and vendor -->
    <?php
        include_once 'styles.php';
    ?>
</head>

<body class="font-opensans">

    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
        </div>
    </div>

    <!-- Start main html -->
    <div id="main_content" class="everything">
       <?php
        include_once 'index-header.php';
        ?>
        <!-- Small icon top menu -->


        <!-- Notification and  Activity-->


        <!-- start User detail -->


        <!-- start Main menu -->



        <!-- start main body part-->
        <div class="container">

            <!-- start body header -->

            <div class="section-body">
                <div class="container-fluid">

                    <div class="row clearfix row-deck" style="min-height: 600px;">
                        <div class="col-lg-2 col-md-2">
                            <ol>
                            <?php

                            $rpp = 20;
                            if(isset($_GET['language'])){
                                $language_name = $_GET['language'];
                                $lang = "?language=$language_name";

                                if(isset($_GET['page'])){
                                    $p = $_GET['page'];

                                }
                                else{
                                    $p = 0;
                                }
                            }
                            else{
                                $lang = "?language=ALL";
                                if(isset($_GET['page'])){
                                    $p = $_GET['page'];
                                }
                                else{
                                    $p = 0;
                                }

                            }
                            $offset = $p;
                            $offset_ = $offset - $rpp;
                            $offset2 = $offset + $rpp;
                            if($offset_ < 0){
                                $offset_ = 0;
                            }
                            if($offset < 1){
                                $hide_prev = "none";
                            }
                            else{
                                $hide_prev = "block";
                            }
                            $prev = "$lang&page=$offset_";
                            $next = "$lang&page=$offset2";


                            $languages_array = array();
                            $languages_rev = array();
                            $languages = fetchtable('pr_languages',"status=1","name","asc","1000","uid, name, icon");
                            while ($l = mysqli_fetch_array($languages)){
                                $uid = $l['uid'];
                                $name = $l['name'];
                                $icon = $l['icon'];
                                $languages_array[$uid] = $name;
                                $languages_rev[$name] = $uid;
                                echo "<li><a href='?language=$name'>$name</a></li>";

                            }
                            ?>


                          </ol>
                        </div>
                        <div class="col-lg-10">
                            <div class="container card container-fluid">
                               <div class="card-body">
                                <h4>Backend Code for Everything</h4>
                                   <ul>
                                   <?php
                                   if(isset($_GET['language'])){
                                       $language_name = $_GET['language'];
                                       if($language_name == 'ALL'){
                                           $andlang = "";
                                       }else {
                                           $language_idd = $languages_rev[$language_name];
                                           $andlang = " AND language_id = '$language_idd'";
                                       }
                                   }
                                   else{
                                       $andlang = "";
                                   }
                                   $frameworks_array = table_to_obj('pr_frameworks',"status=1 $andlang","1000000","uid","name");
                                   $solutions = fetchtable('pr_code_snippets',"status=1 $andlang","uid","asc","$offset, $rpp","uid, title, language_id, framework_id");
                                   $total_sol = mysqli_num_rows($solutions);
                                   while($sol = mysqli_fetch_array($solutions)){
                                       $sid = $sol['uid'];
                                       $title = $sol['title'];
                                       $language_id = $sol['language_id'];
                                       $language_n = $languages_array[$language_id];
                                       $framework_id = $sol['framework_id'];
                                       if($framework_id > 0){
                                            $framework_name = $frameworks_array[$framework_id];
                                            $andframework = " and $framework_name";
                                       }
                                       else{
                                           $andframework = "";
                                       }
                                       $san = sanitize_url("$title"." in "."$language_n $andframework");


                                       echo " <li><a href=\"solutions/$sid/$san\">$title in $language_n $andframework</a></li>";
                                   }

                                   if($total_sol  < $rpp){
                                       $hide_next = "none";
                                   }
                                   else{
                                       $hide_next = "block";
                                   }

                                   ?>

                                </ul>

                                   <nav aria-label="Page navigation example">
                                       <ul class="pagination">
                                           <li style="display:<?php echo $hide_prev; ?> ;" class="page-item"><a class="page-link" href="<?php echo $prev; ?>">Previous</a></li>
                                           <li class="page-item"><a class="page-link"> Page <?php echo $p; ?> </a></li>
                                           <li style="display:<?php echo $hide_next; ?> ;" class="page-item"><a class="page-link" href="<?php echo $next; ?>">Next</a></li>

                                       </ul>
                                   </nav>
                               </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <!-- Start page footer -->
            <div class="section-body">
                <?php
                include_once 'footer.php';
                ?>
            </div>
        </div>
    </div>


    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $(document).ready(function() {
            updateHeader("unsecured"); //check for logged in user so as to update the header accordingly
            //authCheck('register-page', 'register') //check for avilable session, if so redirect to home page
            footer_date(); //load footer
            //call submitBtn() and parse register() as a parameter and on hover hint title
            submitBtn('#regBtn', 'validateRegForm()', "Click to register");

            const url_string = window.location.href;
            const url = new URL(url_string);
            const success = url.searchParams.get("success");
            const provider = url.searchParams.get("provider");
            if ((success === 'true' || success === 'false') && provider === "Google") {
                googleSignup()
            }

            if ((success === 'true' || success === 'false') && provider === "Github") {
                githubSignup()
            }


            // Initialize select2
            $("#country_input").select2({
                    placeholder: 'Search...',
                    width: 'resolve'
                }

            );
        });
    </script>


</body>

</html>
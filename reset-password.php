<?php
session_start();
include_once("php_functions/functions.php");
include_once("configs/conn.inc");
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="Crush it Able The most popular Admin Dashboard template and ui kit">
    <meta name="author" content="PuffinTheme the theme designer">

    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="assets/plugins/highlightjs/styles/monokai-sublime.min.css">
    <title> Zidi : Reset Password</title>
    <style type="text/css">

    </style>

    <!-- Bootstrap Core and vendor -->
    <?php
    include_once 'styles.php';
    ?>
</head>

<body class="font-opensans" style="background-color: white;">

    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
        </div>
    </div>


    <!-- Start main html -->
    <div id="">
        <?php
        /*  include_once 'header.php';
        $btn = "";
        $form = "";
        $home_details = ""; */
        ?>

        <!-- start Main menu -->
        <!-- <div id="left-sidebar" class="sidebar">
            <div class="logo_">
                <h3 class="masthead-heading text-uppercase mb-0">
                    <img src="assets/images/logo.png" height="40px" />

                </h3>
            </div>
        </div>
 -->
        <!-- start main body part-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 offset-md-3 card pt-4 pb-3 mt-5 mb-3 border border-info">
                    <div class="d-flex justify-content-center">
                        <h3 class="masthead-heading text-uppercase mb-0">
                            <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                        </h3>
                    </div>
                    <h4 class="text-center pt-2 pb-2">Reset Password</h4>
                    <form class="pl-5 pr-5" method="POST" onsubmit="return false;">
                        <div class="form-group">
                            <label for="email_input">Please provide email you registered with: </label>
                            <input type="email" class="form-control" id="email_input" placeholder="Email">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <button type="submit" title="Click to Sign in" onclick="alert('Oops')" class="btn btn-primary">Submit</button>
                            </div>
                            <div class="form-group col-md-6" style="text-align: start;">
                                <p>Remember password?&nbsp;<a href="login">Login</a></p>
                            </div>
                        </div>

                        <div class="form-row pt-5">
                            <div class="form-group col-sm-3">
                            </div>
                            <div class="form-group col-sm-6">
                                <hr>
                            </div>
                            <div class="form-group col-sm-3">
                            </div>
                        </div>

                        <div class="form-group pt-0">
                            <div class="text-center"><a href="index">Go Home Page</a></div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
        <!-- Start page footer -->
        <!--  <div class="section-body">
            <?php
            //include_once 'footer.php';
            ?>
        </div> -->
    </div>


    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $('document').ready(function() {});
    </script>
</body>

</html>
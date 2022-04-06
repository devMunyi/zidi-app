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
    <title> Zidi : Register</title>
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
                    <h4 class="text-center pt-2 pb-2">Register</h4>
                    <form class="pl-5 pr-5" onsubmit="return false;" method="POST">
                        <div class="form-group row d-flex justify-content-center">
                            <label for="username_input" class="col-sm-2 col-form-label">Username:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="username_input" placeholder="Username">
                            </div>
                        </div>

                        <div class="form-group row d-flex justify-content-center">
                            <label for="fullname_input" class="col-sm-2 col-form-label">Fullname:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="fullname_input" placeholder="Firstname Lastname">
                            </div>
                        </div>

                        <div class="form-group row d-flex justify-content-center">
                            <label for="email_input" class="col-sm-2 col-form-label">Email:</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email_input" placeholder="Email">
                            </div>
                        </div>
                        <div class="form-group row d-flex justify-content-center">
                            <label for="country_input" class="col-sm-2 col-form-label">Country:</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="country_input" id="country_input">
                                <option value="0">--Select One</option>
                                            <?php

                                            $recs = fetchtable('pr_countries', "status > 0", "name", "asc", "255", "uid ,name");
                                            while ($r = mysqli_fetch_array($recs)) {
                                                $uid = $r['uid'];
                                                $name = $r['name'];
                                                echo "<option value=\"$uid\">$name</option>";
                                            }
                                            ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row d-flex justify-content-center">
                            <label for="password_input" class="col-sm-2 col-form-label">Password:</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="password_input" placeholder="Password">
                            </div>
                        </div>

                        <div class="form-group row d-flex justify-content-center">
                            <label for="cpassword_input" class="col-sm-2 col-form-label">Confirm Password:</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="cpassword_input" placeholder="Password">
                            </div>
                        </div>

                        <div class="form-group row d-flex">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-10">
                                <div class="row">
                                    <div class="col-md-4">
                                        <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button>
                                    </div>
                                    <div class="col-md-8" style="text-align: start;">
                                        <p>Already have account?&nbsp;<a href="login">Log in</a></p>
                                        <p>Forgot password?&nbsp;<a href="reset-password">Reset</a></p>
                                    </div>
                                </div>

                            </div>
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
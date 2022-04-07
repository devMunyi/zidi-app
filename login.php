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
    <title> Zidi : Login</title>
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

    <!-- start main body part-->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3 card pt-4 pb-3 mt-5 mb-3 border border-info">
                <div class="d-flex justify-content-center">
                    <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                    </h3>
                </div>
                <h4 class="text-center pt-2 pb-2 ">Sign in</h4>
                <form class="pl-5 pr-5" method="POST" onsubmit="return false;" style="height:400px; overflow-y:auto;">
                    <div class="form-group">
                        <label for="emailOrUsername_input">Email or username: </label>
                        <input type="text" class="form-control" id="emailOrUsername_input" placeholder="Email or username">
                    </div>

                    <div class="form-group">
                        <label for="password_input">Password: </label>
                        <input type="password" class="form-control" id="password_input" placeholder="Password">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-sm-6" id="loginBtn">
                            <!-- <button type="submit" title="Click to Sign in" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                        </div>

                        <div class="form-group col-sm-6 text-start">
                            <p>Forgot password?&nbsp;<a href="reset-password">Reset</a></p>
                            <p>Don't have account yet?&nbsp;<a href="register">Register</a></p>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-sm-5">
                            <hr>
                        </div>
                        <div class="form-group col-sm-2 text-center">
                            OR
                        </div>
                        <div class="form-group col-sm-5">
                            <hr>
                        </div>
                    </div>

                    <div class="form-group d-flex justify-content-between">
                        <div class="row">
                            <div class="col-md-6 pt-1 pb-1"> <a href="#" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/google.png" alt="Google" /> Sign in with Google</a> </div>
                            <div class="col-md-6 pt-1 pb-1"><a href="#" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/github.png" alt="Github" /> Sign in with Github </a></div>
                            <div class="col-md-6 pt-1 pb-1"><a href="#" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/twitter.png" alt="Twitter" /> Sign in with Twitter</a></div>
                            <div class="col-md-6 pt-1 pb-1"><a href="#" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/facebook.png" alt="Facebook" /> Sign in with Facebook</a></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <hr>
                    </div>

                    <div class="form-group">
                        <p class="text-center"><a href="index">Go Home Page</a></p>
                    </div>
            </div>
            </form>
        </div>
    </div>

    </div>

    <?php
    include_once 'footer.php';
    ?>

    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $('document').ready(function() {
            //call submitBtn() and parse login() as a parameter and on hover hint title
            submitBtn('#loginBtn','login()', "Click to login");
        });
    </script>
</body>

</html>
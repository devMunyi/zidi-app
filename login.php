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
    <title> Zidi : Login</title>
    <style>
        /* width */
        /* .form_::-webkit-scrollbar {
            width: 10px;
        } */

        /* Track */
        /* .form_::-webkit-scrollbar-track {
            background: #555;
        } */

        /* Handle */
        /* .form_::-webkit-scrollbar-thumb {
            background: #555;
        } */

        /* Handle on hover */
        /* .form_::-webkit-scrollbar-thumb:hover {
            background: #555;
        } */
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

    <!-- start main body part-->
    <div class="container-fluid">
        <div class="row pt-2">
            <div class="col-md-12">
                <p class="text-start"><a class="a-override" href="index">Home&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a></p>
            </div>
            <div class="col-md-6 offset-md-3 card pb-3 pt-3 mb-3 border border-info">
                <div class="d-flex justify-content-center">
                    <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                    </h3>
                </div>
                <h4 class="text-center pt-2 pb-2 ">Sign in</h4>
                <form class="pl-5 pr-3 form_" method="POST" onsubmit="return false;" style="height:400px; overflow-y: scroll;">
                    <div class="form-group">
                        <label for="emailOrUsername_input">Email or username: </label>
                        <input type="text" class="form-control" id="emailOrUsername_input" placeholder="Email or username">
                    </div>

                    <div class="form-group">
                        <label for="password_input">Password: </label>
                        <input type="password" class="form-control" id="password_input" placeholder="Password">
                    </div>

                    <div class="form-group pt-2 pb-2" id="loginBtn">
                        <!-- <button type="submit" title="Click to Sign in" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                    </div>

                    <div class="form-group">
                        <div>Forgot password?&nbsp;<a class="a-override" href="reset-password">Reset</a></div>
                        <div class="pt-1">Don't have account yet?&nbsp;<a class="a-override" href="register">Register</a></div>
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
                    <!-- <div class="form-group">
                        <hr>
                    </div> -->

                    <!-- <div class="form-group">
                        <p class="text-center"><a class="a-override" href="index">Go Home Page&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a></p>
                    </div> -->
            </div>
            </form>
        </div>

        <div class="pt-2">
            <?php
            include_once 'footer.php';
            ?>
        </div>
    </div>

    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $(document).ready(function() {
            footer_date(); //load footer

            //call submitBtn() and parse login() as a parameter and on hover hint title
            submitBtn('#loginBtn', 'login()', "Click to login");
        });
    </script>

    <script>
        //custom scroll to enable form scrolling for content overflow
        (function($) {
            $(window).on("load", function() {
                $(".form_").mCustomScrollbar({
                    theme: "inset-2-dark",
                    autoHideScrollbar: true
                });
            });
        })(jQuery);
    </script>
</body>

</html>
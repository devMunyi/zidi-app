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
    <link rel="stylesheet" href="assets/plugins/highlightjs/styles/monokai-sublime.min.css">
    <title> Zidi : Reset Password</title>
    <style type="text/css">

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

    <!--Header section -->
    <?php
        include_once 'header.php';
    ?>

    <!-- start main body part-->
    <div class="container-fluid page-top-margin" id="reset-pass-page">
        <div class="row">
            <div class="col-md-4 offset-md-4 card pt-4 pb-3 mt-3 mb-3 border border-info">
                <div class="d-flex justify-content-center">
                    <!-- <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                    </h3> -->
                </div>
                <h4 class="text-center pt-2 pb-2">Reset Password <span id="user-email"></span></h4>
                <form class="pl-5 pr-5" method="POST" onsubmit="return false;">
                    <div class="form-group">
                        <label for="password_input">*Password: </label>
                        <input type="password" class="form-control" id="password_input" placeholder="Password">
                    </div>

                    <div class="form-group">
                        <label for="cpassword_input">*Confirm Password: </label>
                        <input type="password" class="form-control" id="cpassword_input" placeholder="Confirm Password">
                    </div>

                    <div class="form-group" id="resetPwdBtn">
                        <!-- <button type="submit" title="Click to Sign in" onclick="resetPassword()" class="btn btn-primary">Submit</button> -->
                    </div>
                    <div class="form-group" style="text-align: start;">
                        <p>Remember password?&nbsp;<a class="a-override" href="login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>

        <div class="fixed-bottom">
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
            updateHeader("unsecured"); //check for logged in user so as to update the header accordingly
            validatePwdResetLink() //ensure token and user id is available before rendering this page
            footer_date(); //load footer

            //Initialize dynamic submit button
            submitBtn(
                "#resetPwdBtn",
                "resetPassword()",
                "Click to reset forgotten password"
            );
            populateEmail() //populate email address on the reset password form
        });
    </script>
</body>
</html>
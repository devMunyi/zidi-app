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
    <title> Zidi : Login</title>
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
    <div class="container-fluid pt-4" id="login-page">
        <div class="row">
            <div class="col-sm-4 offset-sm-4 card pt-3 pb-3 mb-3 border border-info">
                <h4 class="text-center pt-2 pb-2 ">Sign in</h4>
                <form class="pl-5 pr-3 form_" method="POST" onsubmit="return false;">
                    <div class="form-group">
                        <label for="emailOrUsername_input">*Email|Username: </label>
                        <input type="text" class="form-control" minlength="3" id="emailOrUsername_input" placeholder="Email or username">
                        <div class="error" id="usernameErr"></div>
                    </div>

                    <div class="form-group">
                        <label for="password_input">*Password: </label>
                        <input type="password" minlength="6" class="form-control" id="password_input" placeholder="Password">
                        <div class="error" id="passwordErr"></div>
                    </div>

                    <div class="form-group pt-2 pb-2" id="loginBtn">
                        <!-- <button type="submit" title="Click to Sign in" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                    </div>

                    <div class="form-group">
                        <div>Forgot password?&nbsp;<a class="a-override" href="forgot-password">Reset</a></div>
                        <div class="pt-1">Don't have an account yet?&nbsp;<a class="a-override" href="register">Sign up</a></div>
                    </div>

                    <div class="row pt-1 pb-1">
                        <div class="col-sm-5">
                            <hr>
                        </div>
                        <div class="col-sm-2 text-center">
                            OR
                        </div>
                        <div class="col-sm-5">
                            <hr>
                        </div>
                    </div>

                    <div class="form-group text-center">
                        <div class="google p-2" onclick="googleOAuth('signin')"> <img src="assets/images/google.png" class="pr-1" alt="Google" /> Sign in with Google </div>
                    </div>
                    <div class="form-group text-center">
                        <div class="p-2 github" onclick="githubOAuth('signin')"><img src="assets/images/github.png" alt="Github" /> Sign in with Github </div>
                    </div>
                    <!-- 
                        <div class="form-group text-center">
                            <div class="p-2 facebook" onclick="facebookOAuth()"><img src="assets/images/facebook.png" alt="Facebook" /> Sign up with Facebook</div>
                        </div>

                        <div class="form-group text-center">
                            <div class="p-2 twitter" onclick="twitterOAuth()"><img src="assets/images/twitter.png" alt="Twitter" /> Sign up with Twitter</div>
                        </div> -->
                </form>
            </div>
        </div>

        <?php
        include_once 'footer.php';
        ?>

    </div>
    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $(document).ready(function() {
            updateHeader('login-page'); //check for logged in user so as to update the header accordingly
            //authCheck('login-page', 'login') //check for avilable session, if so redirect to home page
            footer_date(); //load footer

            //call submitBtn() and parse login() as a parameter and on hover hint title
            submitBtn('#loginBtn', 'validateLoginForm()', "Click to Sign in", "Submit");

            const url_string = window.location.href;
            const url = new URL(url_string);
            const success = url.searchParams.get("success");
            const provider = url.searchParams.get("provider");
            if ((success === 'true' || success === 'false') && provider === "Google") {
                googleSignin()
            }

            if ((success === 'true' || success === 'false') && provider === "Github") {
                githubSignin()
            }
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
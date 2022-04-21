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
    <!-- <meta name="google-signin-client_id" content="545549745917-bt32oena9mo7ankcbcqpg2thpc6kigdm.apps.googleusercontent.com" /> -->
    <!-- <script src="https://apis.google.com/js/platform.js" async defer></script> -->
    <title> Zidi : Login</title>
    <style>
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

                    <div class="form-group d-flex justify-content-between">
                        <div class="row">
                            <!-- <div id="g_id_onload" data-client_id="545549745917-bt32oena9mo7ankcbcqpg2thpc6kigdm.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-callback="handleResponse" data-auto_prompt="false">
                            </div>

                            <div class="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline" data-text="signin_with" data-size="large" data-logo_alignment="left">
                            </div> -->
                            <!-- <div class="g-signin2 col-md-6 pt-1 pb-1" data-onsuccess="onSignIn"></div> -->
                            <div class="col-md-6 pt-1 pb-1" data-onsuccess="onSignIn"> <a href="javascript:void(0)" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/google.png" alt="Google" /> Sign in with Google</a> </div>
                            <div class="col-md-6 pt-1 pb-1"><a href="javascript:void(0)" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/github.png" alt="Github" /> Sign in with Github </a></div>
                            <div class="col-md-6 pt-1 pb-1"><a href="javascript:void(0)" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/twitter.png" alt="Twitter" /> Sign in with Twitter</a></div>
                            <div class="col-md-6 pt-1 pb-1"><a href="javascript:void(0)" style="width: 100%" class="p-1 btn btn-light badge-pill border"> <img src="assets/images/facebook.png" alt="Facebook" /> Sign in with Facebook</a></div>
                        </div>
                    </div>
                    <!-- <div class="form-group">
                        <hr>
                    </div> -->

                    <!-- <div class="form-group">
                        <p class="text-center"><a class="a-override" href="index">Go Home Page&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a></p>
                    </div> -->
                </form>
            </div>
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
    <script src="https://accounts.google.com/gsi/client" async defer></script>
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

    <script>
        function onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            //console.log("GOOGLE TOKEN =>", id_token);
            alert(id_token);

            var xhr = new XMLHttpRequest();
            let server_ = $("#server_").val();

            crudaction({
                token: id_token
            }, '/google/signin', 'POST', function(feed) {

                console.log("FEEDBACK =>", feed);

                if (feed["success"] === false) {
                    signOut(); //sign out user from his google account

                    let message = feed["message"];
                    var Toast = Swal.mixin({
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 2500,
                        padding: "0.85rem",
                    });

                    Toast.fire({
                        icon: "error",
                        title: message,
                        color: "white",
                    });
                } else if (feed["success"] === true) {
                    let message = feed["message"];
                    var Toast = Swal.mixin({
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 2500,
                        padding: "0.85rem",
                    });

                    Toast.fire({
                        icon: "success",
                        title: message,
                    });

                    //add user & token to localstorage
                    persistence("token", feed.token);
                    persistence("user", feed.user);

                    setTimeout(() => {
                        gotourl("index"); //redirect the user to index page to perform an action meant for authenticated users
                    }, 2500);
                }
            })
        }
    </script>

    <script>
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log("User signed out.");
            });
        }
    </script>
</body>

</html>
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
            <div class="col-md-6 offset-md-3 card pt-3 pb-3 mb-3 border border-info">
                <div class="d-flex justify-content-center">
                    <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                    </h3>
                </div>
                <h4 class="text-center pt-2 pb-2">Sign up</h4>
                <form class="form_ pl-5 pr-3" onsubmit="return false;" method="POST" style="height:400px; overflow-y: scroll;">
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
                    <div class="form-group">
                        <div class="col-sm-10 offset-sm-2 pt-1 pb-2" id="regBtn">
                            <!-- <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-10 offset-sm-2">
                            <div>Already have account?&nbsp;<a class="a-override" href="login">Sign in</a></div>
                            <div class="pt-1">Forgot password?&nbsp;<a class="a-override" href="reset-password">Reset</a></div>
                        </div>
                    </div>
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
            footer_date(); //load footer

            //call submitBtn() and parse register() as a parameter and on hover hint title
            submitBtn('#regBtn', 'register()', "Click to register");
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
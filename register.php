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
    <?php
    include_once 'styles.php';
    ?>
</head>

<body class="font-opensans">
    <!-- Page Loader -->
    <?php
    include_once 'header.php';
    ?>
    <div class="page-loader-wrapper">
        <div class="loader">
        </div>
    </div>

    <!--Header section -->
    <?php
    include_once 'header.php';
    ?>

    <!-- start main body part-->
    <div class="container-fluid pt-4" id="register-page">
        <div class="row">
            <div class="col-sm-4 offset-sm-4 card pt-3 pb-3 mb-3">
                <div class="d-flex justify-content-center">

                </div>

                <h4 class="text-center pb-2">Sign up</h4>
                <form name="registerForm" class="form_ pl-5 pr-3" onsubmit="return false;" method="POST">
                    <div class="form-group">
                        <label for="username_input" class="col-form-label">*Username:</label>
                        <input type="text" class="form-control biginput" name="username_input" id="username_input" placeholder="Username" required />
                        <div class="error" id="usernameErr"></div>
                    </div>

                    <div class="form-group">
                        <label for="fullname_input" class="col-form-label">*Fullname:</label>
                        <input type="text" class="form-control biginput" name="fullname_input" id="fullname_input" placeholder="Firstname Lastname" minlength="5" required>
                        <div class="error" id="fullnameErr"></div>
                    </div>

                    <div class="form-group">
                        <label for="email_input" class="col-form-label">*Email:</label>
                        <input type="email" class="form-control biginput" name="email_input" id="email_input" placeholder="Email" required>
                        <div class="error" id="emailErr"></div>
                    </div>
                    <div class="form-group">
                        <label for="country_input" class="col-form-label">*Country:</label>
                        <select class="form-control biginput" name="country_input" name="country_input" id="country_input" style="width: 100%;" required>
                            <option value="">--Select--</option>
                            <?php
                            $recs = fetchtable('pr_countries', "status > 0", "name", "asc", "255", "uid ,name");
                            while ($r = mysqli_fetch_array($recs)) {
                                $uid = $r['uid'];
                                $name = $r['name'];
                                echo "<option value=\"$uid\">$name</option>";
                            }
                            ?>
                        </select>
                        <div class="error" id="countryErr"></div>
                    </div>
                    <div class="form-group">
                        <label for="password_input" class="col-form-label">*Password:</label>
                        <input type="password" class="form-control biginput" name="password_input" id="password_input" placeholder="Password" minlength="6" required>
                        <div class="error" id="passwordErr"></div>
                    </div>
                    <div class="form-group">
                        <label for="cpassword_input" class="col-form-label">*Confirm Password:</label>
                        <input type="password" class="form-control biginput" name="cpassword_input" id="cpassword_input" placeholder="Confirm Password" minlength="6" required>
                        <div class="error" id="cpasswordErr"></div>
                    </div>
                    <div class="form-group">
                        <div class="pt-1 pb-2" id="regBtn">
                            <!-- <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                        </div>
                    </div>
                    <hr />
                    <div class="form-group">
                        <div class="col-sm-10">
                            <div>Already have an account?&nbsp;<a class="a-override" href="login">Sign in</a></div>
                            <div class="pt-1">Forgot password?&nbsp;<a class="a-override" href="forgot-password">Reset</a></div>
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
                            <div class="google p-2" onclick="googleOAuth('signup')"> <img src="assets/images/google.png" class="pr-1" alt="Google" /> Sign up with Google </div>
                        </div>
                        <div class="form-group text-center">
                            <div class="p-2 github" onclick="githubOAuth('signup')"><img src="assets/images/github.png" alt="Github" /> Sign up with Github </div>
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
    </div>

    <?php
    include_once 'footer.php';
    ?>

    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $(document).ready(function() {
            updateHeader("register-page"); //check for logged in user so as to update the header accordingly
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
<!-- //https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&prompt=select_account&include_granted_scopes=true&response_type=code&redirect_uri=https%3A%2F%2Fwww.loom.com%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&client_id=443240113960-6mj529r3r24gpp4c9u57n9ndrg01i911.apps.googleusercontent.com&flowName=GeneralOAuthFlow -->
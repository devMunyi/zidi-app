<?php
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
    <div id="main_content">
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

                        </div>
                        <div class="col-lg-10">
                            <div class="container card container-fluid">
                               <div class="card-body">
                                <h4>Help</h4>
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
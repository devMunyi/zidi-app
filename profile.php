<?php
session_start();
include_once("php_functions/functions.php");
include_once("configs/conn.inc");

$user_id = $_GET['uid'];
if ($user_id > 0) {
    $user_id = $_GET['uid'];
    $user_info = fetchonerow('pr_users', "uid='" . $user_id . "'", "uid, username, fullname, email, country");
    $act = "<span class='text-orange'><i class='fa fa-edit'></i>Edit</span>";
    // echo "Service <small class='xsm'>Edit</small> <span class='text-green text-bold sm'>address</span> <a title='View details' class='font-16' href=\"services?service=$user_id\"><i class='fa fa-arrow-circle-up'></i></a>";
} else {
    $user_info = array();
    $user_id = "";
    $act = "<span class='text-green'><i class='fa fa-edit'></i>Add</span>";
    // echo "Service <small class='xsm text-muted'>Add</small>";
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title> Zidi : Profile</title>
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
    <div class="container-fluid page-top-margin" id="profile-page">
        <div class="row pr-5 pl-5 pt-3">
            <div class="col-md-2" style="color: white; border-right: 1px solid silver">
                <div class="nav flex-column nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link pt-2 pb-2 active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">View Profile</a>
                    <a class="nav-link pt-2 pb-2" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Edit Profile</a>
                    <a class="nav-link pt-2 pb-2" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Change Password</a>
                </div>
            </div>
            <div class="col-md-8">
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade show active pl-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <div class="d-flex justify-content-center pb-3 profile-photo-view" id="profile-photo-view">
                            <img src="https://lh3.googleusercontent.com/a-/AOh14GjrvioMF4pSQdA-VzP27LhqfHbIKo8s5Btu2lTq=s96-c" style="border-radius: 50%; object-fit: cover;" alt="">
                        </div>
                        <div class="card" id="profile-info">
                            <table class="table table-bordered">
                                <tr>
                                    <td><b>Username</b></td>
                                    <td>Sam</td>
                                </tr>
                                <tr>
                                    <td><b>Email</b></td>
                                    <td>samunyi90@gmail.com</td>
                                </tr>
                                <tr>
                                    <td><b>Fullname</b></td>
                                    <td>Samuel Munyi</td>
                                </tr>

                                <tr>
                                    <td><b>Country</b></td>
                                    <td>Kenya</td>
                                </tr>

                                <tr>
                                    <td><b>Contribution Rate</b></td>
                                    <td>50%</td>
                                </tr>

                            </table>
                        </div>

                    </div>
                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div class="pr-5 pl-5">
                            <div class="row">
                                <div class="col-md-3 d-flex justify-content-start pt-3 profile-photo-view">
                                    <img src="https://lh3.googleusercontent.com/a-/AOh14GjrvioMF4pSQdA-VzP27LhqfHbIKo8s5Btu2lTq=s96-c" style="border-radius: 50%; object-fit: cover;" alt="">
                                </div>
                                <div class="col-md-9">

                                    <form class="form_" onsubmit="return false;" method="POST">
                                        <div class="form-group">
                                            <label for="username_input" class="col-form-label">*Username:</label>
                                            <input type="text" class="form-control" id="username_input" value="<?php echo $user_info["username"] ?>" placeholder="Username" minlength="3">
                                        </div>

                                        <div class="form-group">
                                            <label for="fullname_input" class="col-form-label">*Fullname:</label>
                                            <input type="text" class="form-control" id="fullname_input" value="<?php echo $user_info["fullname"] ?>" placeholder="Firstname Lastname" minlength="5">
                                        </div>

                                        <div class="form-group">
                                            <label for="email_input" class="col-form-label">*Email:</label>
                                            <input type="email" class="form-control" id="email_input" value="<?php echo $user_info["email"] ?>" placeholder="Email">
                                        </div>
                                        <div class="form-group">
                                            <label for="country_input" class="col-form-label">*Country:</label>
                                            <select class="form-control" name="country_input" id="country_input" min="1">
                                                <option value="">--Select--</option>
                                                <?php
                                                $recs = fetchtable('pr_countries', "status > 0", "name", "asc", "255", "uid ,name");
                                                while ($r = mysqli_fetch_array($recs)) {
                                                    $uid = $r['uid'];
                                                    $name = $r['name'];

                                                    if ($uid == $user_info["country"]) {
                                                        $selected = 'SELECTED';
                                                    } else {
                                                        $selected = '';
                                                    }

                                                    echo "<option $selected value=\"$uid\">$name</option>";
                                                }
                                                ?>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <div class="pt-1 pb-2" id="change-prof-btn">
                                                <!-- <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <div class="pr-5 pl-5">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-9">
                                    <form class="form_" method="POST" onsubmit="return false;">
                                        <div class="form-group">
                                            <label for="old_password_input">*Old Password: </label>
                                            <input type="password" class="form-control" id="old_password_input" placeholder="Enter your old password">
                                        </div>
                                        <div class="form-group">
                                            <label for="password_input">*New Password: </label>
                                            <input type="password" class="form-control" id="password_input" placeholder="New Password">
                                        </div>
                                        <div class="form-group">
                                            <label for="cpassword_input">*Confirm New Password: </label>
                                            <input type="password" class="form-control" id="cpassword_input" placeholder="Confirm New Password">
                                        </div>

                                        <div class="form-group" id="change-pwd-btn">
                                            <!-- <button type="submit" title="Click to Sign in" onclick="resetPassword()" class="btn btn-primary">Submit</button> -->
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
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
            updateHeader('profile-page'); //check for logged in user so as to update the header accordingly
            signedUserMenu("profile-page") //populate dropdown menu as per current page
            //authCheck('profile-page', 'profile') //check for avilable session, if so redirect to home page
            footer_date(); //load footer

            //call submitBtn() and parse register() as a parameter and on hover hint title
            submitBtn('#change-prof-btn', 'changeProfile()', "Click to submit", "Change Profile");
            submitBtn('#change-pwd-btn', 'changePassword()', "Click to submit", "Change Password");

            populateProfile() //populate profile page with dynamic user info
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
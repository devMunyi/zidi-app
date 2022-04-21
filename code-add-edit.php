<?php
session_start();
include_once("php_functions/functions.php");
include_once("configs/conn.inc");

$code_id = $_GET['cid'];
if ($code_id > 0) {
    $code_id = $_GET['cid'];
    $code_arr = fetchonerow('pr_code_snippets', "uid='" . $code_id . "'", "uid, title, row_code, file_extension, instructions, func_id, subfunc_id, language_id, framework_id, implementation_id");

    $act = "<span class='text-orange'><i class='fa fa-edit'></i>Edit</span>";
    // echo "Service <small class='xsm'>Edit</small> <span class='text-green text-bold sm'>address</span> <a title='View details' class='font-16' href=\"services?service=$code_id\"><i class='fa fa-arrow-circle-up'></i></a>";
} else {
    $code_arr = array();
    $code_id = "";
    $act = "<span class='text-green'><i class='fa fa-edit'></i>Add</span>";
    // echo "Service <small class='xsm text-muted'>Add</small>";
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="Crush it Able The most popular Admin Dashboard template and ui kit">
    <meta name="author" content="PuffinTheme the theme designer">
    <title> Zidi : add-edit-code</title>
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
    <div class="container-fluid" id="add-edit-code-page">
        <div class="row pt-2">
            <div class="col-md-12">
                <p class="text-start"><a class="a-override" href="index">Home&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i></a></p>
            </div>
            <div class="col-md-8 offset-md-2 card pt-3 pb-2 mb-3 border border-info">
                <div class="d-flex justify-content-center">
                    <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                    </h3>
                </div>
                <h4 class="text-center pt-2 pb-2"><?php echo $act; ?> Codesnippet</h4>
                <form class="form_ pl-5 pr-3" onsubmit="return false;" method="POST" style="height:400px; overflow-y:auto;">
                    <div class="form-row">
                        <div class="form-group col-sm-3">
                            <label for="func_sel">Function:</label>
                            <select class="form-control" name="func_sel" id="func_sel">
                                <option value="">--Select One</option>
                                <?php
                                $recs = fetchtable('pr_functionalities', "status > 0", "name", "asc", "100", "uid ,name");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $name = $r['name'];

                                    if ($uid == $code_arr["func_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }

                                    echo "<option $selected value=\"$uid\">$name</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="subfunc_sel">Subfunction:</label>
                            <select class="form-control" name="subfunc_sel" id="subfunc_sel">
                                <option value="">--Select One</option>
                                <?php
                                $recs = fetchtable('pr_subfunctions', "status > 0", "name", "asc", "300", "uid ,name");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $name = $r['name'];

                                    if ($uid == $code_arr["subfunc_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }
                                    echo "<option $selected value=\"$uid\">$name</option>";
                                }
                                ?>
                            </select>
                        </div>

                        <div class="form-group col-sm-3">
                            <label for="language_sel">Language:</label>
                            <select class="form-control" name="language_sel" id="language_sel">
                                <option value="">--Select One</option>
                                <?php
                                $recs = fetchtable('pr_languages', "status > 0", "name", "asc", "40", "uid ,name");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $name = $r['name'];

                                    if ($uid == $code_arr["language_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }

                                    echo "<option $selected value=\"$uid\">$name</option>";
                                }
                                ?>
                            </select>
                        </div>

                        <div class="form-group col-sm-3">
                            <label for="framework_sel">Language Framework:</label>
                            <select class="form-control" name="framework_sel" id="framework_sel">
                                <option value="">--Select One</option>
                                <option value="0"> No framework</option>
                                <?php
                                $recs = fetchtable('pr_frameworks', "status > 0", "name", "asc", "100", "uid ,name");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $name = $r['name'];

                                    if ($uid == $code_arr["framework_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }

                                    echo "<option $selected value=\"$uid\">$name</option>";
                                }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="impl_sel">Implementation Type:</label>
                            <select class="form-control" name="impl_sel" id="impl_sel">
                                <option value="">--Select One</option>
                                <?php
                                $recs = fetchtable('pr_implementations', "status > 0", "title", "asc", "25", "uid ,title");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $title = $r['title'];

                                    if ($uid == $code_arr["implementation_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }

                                    echo "<option $selected value=\"$uid\">$title</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="form-group col-md-8">
                            <label for="codeimpl_title">Write User Friendly Code Title:</label>
                            <input type="text" class="form-control" id="codeimpl_title" value="<?php echo $code_arr['title']; ?>" placeholder="e.g how to iterate over an object using for loop" maxlength="70"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="code_input">Codesnippet (Write/Paste your code below):</label>
                        <textarea class="form-control" minlength="10" rows="5" id="code_input" name="code_input"><?php echo $code_arr['row_code']; ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="file_extension">Code File Extension:</label>
                        <input type="text" class="form-control" id="file_extension" value="<?php echo $code_arr['file_extension']; ?>" placeholder="e.g .js for Nodejs, .java for Java, .py for Python, .php for Php, .rb for Ruby and so on" minlength="2">
                    </div>
                    <div class="form-group">
                        <label for="instructions_input">Instructions/description of Code Use (if any):</label>
                        <textarea class="form-control" rows="3" id="instructions_input" name="instructions_input"><?php echo $code_arr['row_code']; ?></textarea>
                    </div>

                    <div class="form-row pt-2 pb-2">
                        <div class="for-group col-md-4 d-flex justify-content-start" id="addEditCodeBtn">
                            <!-- <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
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
            $("#add-edit-code-page").hide();
            
            function requireSigninTwo() {
                let current_loc = JSON.parse(localStorage.getItem("persist"));
                if (current_loc && current_loc.token) {
                    let token = current_loc.token;
                    if (token) {
                        //send request to the server to verify token
                        crudaction({}, "/current-user", "GET", function(feed) {
                            if (feed.success) {
                                //if okay, display the code add edit form page
                                $("#add-edit-code-page").show();
                            } else {
                                //redirect to login page
                                gotourl("login");
                            }
                        })
                    } else {
                        //redirect to login page
                        gotourl("login");
                    }
                } else {
                    //redirect to login page
                    gotourl("login");
                }
            }
            requireSigninTwo();


            //call submitBtn() and parse saveCodeSnippet() as a parameter and on hover hint title
            submitBtn('#addEditCodeBtn', 'saveCodeSnippet()', "Click to submit");
        })

        footer_date(); //load footer
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
<input type="hidden" name="code_edit_id" id="code_edit_id" value="<?php echo $code_id; ?>">

</html>
<?php
session_start();
include_once("php_functions/functions.php");
include_once("configs/conn.inc");

$code_id = $_GET['cid'];
if ($code_id > 0) {
    $code_id = $_GET['cid'];
    $code_arr = fetchonerow('pr_code_snippets', "uid='" . $code_id . "'", "uid, title, row_code, file_extension, instructions, func_id, subfunc_id, language_id, framework_id, lang_impl_type_id, user_impl_type_id");


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

    <!--Header section -->
    <?php
    include_once 'header.php';
    ?>

    <!-- Start main html -->
    <div class="container-fluid mb-5 pt-4" id="addeditcode-page">
        <div class="row">
            <div class="col-md-8 offset-md-2 card pt-3 pb-2 mb-3 border border-info">
                <!-- <div class="d-flex justify-content-center">
                    <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="35px" alt="ZIDI" /></a>
                    </h3>
                </div> -->
                <h4 class="text-center pb-2 pb-2"><?php echo $act; ?> Codesnippet</h4>
                <form class="form_ pl-5 pr-3" onsubmit="return false;" method="POST">
                    <div class="form-row">
                        <div class="form-group col-sm-3">
                            <label for="func_sel">*Function:</label>
                            <select class="form-control" name="func_sel" id="func_sel" onchange="filterSubFuncByFunc()" required>
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
                            <div class="error" id="funErr"></div>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="subfunc_sel">*Subfunction:</label>
                            <select class="form-control" name="subfunc_sel" id="subfunc_sel" required>
                                <option value="">--Select One</option>
                                <option value="0">No subfunction</option>
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
                            <div class="error" id="subfunErr"></div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label for="language_sel">*Language:</label>
                            <select class="form-control" name="language_sel" id="language_sel" onchange="filterFramsByLang(); langAddEdit(); codeAddEdit()" required>
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
                            <div class="error" id="langErr"></div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label for="framework_sel">*Language Framework:</label>
                            <select class="form-control" name="framework_sel" id="framework_sel" required>
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
                            <div class="error" id="framErr"></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="impl_sel">*Language Implementation Type:</label>
                            <select class="form-control" name="sel_lang_impl" id="sel_lang_impl" required>
                                <option value="">--Select One</option>
                                <?php
                                $recs = fetchtable('pr_language_implementation_type', "status > 0", "title", "asc", "25", "uid ,title");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $title = $r['title'];

                                    if ($uid == $code_arr["lang_impl_type_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }

                                    echo "<option $selected value=\"$uid\">$title</option>";
                                }
                                ?>
                            </select>
                            <div class="error" id="langImplErr"></div>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="impl_sel">*Your Implementation Type:</label>
                            <select class="form-control" name="sel_user_impl" id="sel_user_impl" required>
                                <option value="">--Select One</option>
                                <?php
                                $recs = fetchtable('pr_user_implementation_type', "status > 0", "uid", "asc", "25", "uid ,title");
                                while ($r = mysqli_fetch_array($recs)) {
                                    $uid = $r['uid'];
                                    $title = $r['title'];

                                    if ($uid == $code_arr["user_impl_type_id"]) {
                                        $selected = 'SELECTED';
                                    } else {
                                        $selected = '';
                                    }

                                    echo "<option $selected value=\"$uid\">$title</option>";
                                }
                                ?>
                            </select>
                            <div class="error" id="userImplErr"></div>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="codeimpl_title">*Write User Friendly Code Title:</label>
                        <input type="text" class="form-control" id="codeimpl_title" value="<?php echo $code_arr['title']; ?>" placeholder="e.g how to iterate over an object using for loop" maxlength="70" required />
                        <div class="error" id="titleErr"></div>
                    </div>

                    <div class="form-group">
                        <label for="code_input">*Codesnippet (Write/Paste your code below):</label>
                        <textarea class="form-control" minlength="10" rows="5" id="code_input" name="code_input" required><?php echo $code_arr['row_code']; ?></textarea>
                        <div class="error" id="codeErr"></div>
                    </div>
                    <div class="form-group">
                        <label for="file_extension">*Code File Extension:</label>
                        <input type="text" class="form-control" id="file_extension" value="<?php echo $code_arr['file_extension']; ?>" placeholder="e.g .js for Nodejs, .java for Java, .py for Python, .php for Php, .rb for Ruby and so on" minlength="2" required>
                        <div class="error" id="fileExtErr"></div>
                    </div>
                    <div class="form-group">
                        <label for="instructions_input">Instructions/description of Code Use (if any):</label>
                        <textarea class="form-control" rows="3" id="instructions_input" name="instructions_input"><?php echo $code_arr['instructions']; ?></textarea>
                    </div>

                    <div class="form-row pt-2 pb-2">
                        <div class="for-group col-md-4 d-flex justify-content-start" id="addEditCodeBtn">
                            <!-- <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                        </div>
                    </div>
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
            updateHeader("addeditcode-page"); //check for logged in user so as to update the header accordingly
            //signedUserMenu("addeditcode-page") //populate dropdown menu as per current page
            //authCheck("addeditcode-page", "addeditcode") //check for logged-in user before rendering page
            $("#add-edit-code-page").hide(); //hide this page by default

            //call submitBtn() and parse saveCodeSnippet() as a parameter and on hover hint title
            submitBtn('#addEditCodeBtn', 'codesnippetValidate()', "Click to submit");
            // var sign_out = document.getElementById("sign-out");
            // sign_out.addEventListener("click", function() {
            //     //remove user and token from localstorage
            //     persistence_remove("user");
            //     logout() //call logout function                
            // }, false);
            footer_date(); //load footer
        })
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

<!--Pass a code to edit id to be used in making codesnippet update -->
<input type="hidden" name="code_edit_id" id="code_edit_id" value="<?php echo $code_id; ?>">

</html>
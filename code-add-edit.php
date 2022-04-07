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

    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="assets/plugins/highlightjs/styles/monokai-sublime.min.css">
    <title> Zidi : Register</title>
    <style type="text/css">
        ::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 7px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, .5);
            -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
        }
    </style>

    <!-- Bootstrap Core and vendor -->
    <?php
    include_once 'styles.php';
    ?>
</head>

<body class="font-opensans" style="background-color: white;">

    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
        </div>
    </div>

    <!-- Start main html -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 offset-md-2 card pt-3 pb-2 mt-5 mb-3 border border-info">
                <div class="d-flex justify-content-center">
                    <h3 class="masthead-heading text-uppercase mb-0">
                        <a href="index"><img src="assets/images/logo.png" height="40px" alt="ZIDI" /></a>
                    </h3>
                </div>
                <h4 class="text-center pt-2 pb-2">Add Code</h4>
                <form class="pl-5 pr-5" onsubmit="return false;" method="POST" style="height:400px; overflow-y:auto;">
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
                                    echo "<option value=\"$uid\">$name</option>";
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
                                    echo "<option value=\"$uid\">$name</option>";
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
                                    echo "<option value=\"$uid\">$name</option>";
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
                                    echo "<option value=\"$uid\">$name</option>";
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
                                    echo "<option value=\"$uid\">$title</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <div class="form-group col-md-8">
                            <label for="codeimpl_title">Write User Friendly Code Title:</label>
                            <input type="text" class="form-control" id="codeimpl_title" placeholder="e.g how to iterate over an object using for loop">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="code_input">Codesnippet (Write/Paste your code below):</label>
                        <textarea class="form-control" rows="5" id="code_input" name="code_input"></textarea>
                    </div>
                    <div class="form-group">
                            <label for="file_extension">Code File Extension:</label>
                            <input type="text" class="form-control" id="file_extension" placeholder="e.g .js for Nodejs, .java for Java, .py for Python, .php for Php, .rb for Ruby and so on">
                    </div>
                    <div class="form-group">
                        <label for="instructions_input">Instructions/description of Code Use (if any):</label>
                        <textarea class="form-control" rows="3" id="instructions_input" name="instructions_input"></textarea>
                    </div>
                    
                    <div class="form-row pt-2 pb-2">
                        <div class="for-group col-md-6" id="addEditCodeBtn">
                            <!-- <button type="submit" title="Click to register" onclick="alert('Oops! submit not yet implemented')" class="btn btn-primary">Submit</button> -->
                        </div>
                        <div class="for-group col-md-6" style="text-align: end;">
                            <p><a href="index">Return Home Page</a></p>
                        </div>
                    </div>
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
        //call submitBtn() and parse saveCodeSnippet() as a parameter and on hover hint title
        submitBtn('#addEditCodeBtn', 'saveCodeSnippet()', "Click to code snippet");
    </script>
</body>

</html>
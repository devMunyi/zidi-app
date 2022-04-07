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
    <title> Zidi : Home</title>
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


    <!-- Start main html -->
    <div id="main_content">
        <?php
        include_once 'header.php';
        ?>
        <!-- Small icon top menu -->
        <!-- <div id="header_top" style="display: none;" class="header_top">
            <div class="container">
                <div class="hleft">
                    <div style="margin-top: 15px;" class="text-orange font-10"><b>PLATFORM</b></div>
                    <div class="dropdown text-black" id="environments_">
                        <li style="list-style: none; margin-top: 15px;"><i>Loading ...</i></li>
                    </div>
                </div>


            </div>
        </div> -->

        <!-- start Main menu -->
        <div id="left-sidebar" class="sidebar">
            <div class="logo_">
                <h3 class="masthead-heading text-uppercase mb-0">
                    <img src="assets/images/logo.png" height="40px" />
                </h3>
            </div>
            <div class="input-icon">

                <span class="input-icon-addon">
                    <i class="fe fe-search"></i>
                </span>
                <input type="text" id="search_functionality" class="form-control" placeholder="Filter Functionalities...">
            </div>
            <div class="">
                <div class="tab-content">
                    <div class="tab-pane fade active show" id="all-tab">
                        <nav class="sidebar-nav">
                            <div class="card-body scrolli" style="padding: 10px 10px;">
                                <ul class="metismenu" id="functions_">
                                    Loading ...
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <!-- <div class="tab-pane fade" id="app-tab">
                        <nav class="sidebar-nav">
                            <ul class="metismenu">
                                <li class="g_heading">Components</li>
                                <li><a href="components/typography.html"><i class="fe fe-type"></i><span>Typography</span></a></li>
                                <li><a href="components/colors.html"><i class="fe fe-feather"></i><span>Colors</span></a></li>
                                <li><a href="components/alerts.html"><i class="fe fe-alert-triangle"></i><span>Alerts</span></a></li>
                                <li><a href="components/avatars.html"><i class="fe fe-user"></i><span>Avatars</span></a></li>
                                <li><a href="components/buttons.html"><i class="fe fe-toggle-right"></i><span>Buttons</span></a></li>
                                <li><a href="components/breadcrumb.html"><i class="fe fe-link-2"></i><span>Breadcrumb</span></a></li>
                                <li><a href="components/forms.html"><i class="fe fe-layers"></i><span>Input group</span></a></li>
                                <li><a href="components/list-group.html"><i class="fe fe-list"></i><span>List group</span></a></li>
                                <li><a href="components/modal.html"><i class="fe fe-square"></i><span>Modal</span></a></li>
                                <li><a href="components/pagination.html"><i class="fe fe-file-text"></i><span>Pagination</span></a></li>
                                <li><a href="components/cards.html"><i class="fe fe-image"></i><span>Cards</span></a></li>
                                <li><a href="components/charts.html"><i class="fe fe-pie-chart"></i><span>Charts</span></a></li>
                                <li><a href="components/form-components.html"><i class="fe fe-check-square"></i><span>Form</span></a></li>
                                <li><a href="components/tags.html"><i class="fe fe-tag"></i><span>Tags</span></a></li>
                                <li><a href="javascript:void(0)"><i class="fe fe-help-circle"></i><span>Documentation</span></a></li>
                                <li><a href="javascript:void(0)"><i class="fe fe-life-buoy"></i><span>Changelog</span></a></li>
                            </ul>
                        </nav>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- start main body part-->
        <div class="page">

            <!-- start body header -->

            <div class="section-body">
                <div class="container-fluid">
                    <div class="row clearfix" style="border-bottom: 2px solid #d0d0d0;">
                        <tr class="col-lg-12 col-md-12 d-flex justify-content-end">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 bd-highlight">
                                    <!-- <h4 class="">Copy file from one directory to another in Web server</h4> -->
                                    <!-- <p><span id="codeimp-title">&nbsp;</span></p> -->
                                    <div class="row">
                                        <div class="col-md-10" id="codeimp-title">

                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-9 col-md-9">
                                    <table style="margin-bottom: 15px;">
                                        <tr>
                                            <td style="width: 200px;">
                                                <!-- <span class="font-italic"> An OOP Implementation by Jonah Ngarama </span> -->
                                                <span class="font-italic"> <span id="imptype-and-contributor">&nbsp;</span> </span>
                                            </td>

                                            <td class="text-center">
                                                <label class="text-center" for="framework"><small>Select Framework:</small></label>
                                                <select class="fancy-select" id="sel_framework" onchange="load_codeSnippet()">
                                                    <option value="0"> --Select Framework</option>
                                                </select>
                                            </td>
                                            <td class="text-center">
                                                <label class="text-center" for="framework"><small>Select Implementation:</small></label>
                                                <select class="fancy-select" id="sel_implementation" onchange="load_codeSnippet()">
                                                    <option value="0"> --Select Implementation</option>
                                                </select>
                                            </td>

                                            <td class="text-center">
                                                <label class="text-center" for="framework"><small>Select Code Version:</small></label>
                                                <select class="fancy-select" id="code-version" onchange="load_codeSnippet()">
                                                    <option value="0">Code Versions</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>

                                </div>

                                <div class="col-lg-3 col-md-3 d-flex justify-content-end pt-2 pl-0">
                                    <a href="code-add-edit" class="text-blue font-weight-bold"> <i class="fe fe-edit"></i> Contribute New Code </a>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="row clearfix row-deck" style="min-height: 600px; width: 99%;">
                    <div class="col-lg-2 col-md-6">
                        <div class="scrollk">
                            <div class="transcard">
                                <div class="card-header">
                                    <h4 class="card-title text-orange"><i class="fe fe-droplet"></i> Language</h4>
                                </div>
                                <div class="card-body" style="padding: 0px 20px;">
                                    <ul class="metismenu ci-effect-1 prominent" id="language_">
                                        <li class="font-weight-normal font-14 font-italic">Loading...</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-6">
                        <div class="card transcard">
                            <div class="card-header">
                                <table style="width: 100%">
                                    <tr>
                                        <td>
                                            <h3 class="card-title"><i class="fe fe-code"></i> Code Snippet </h3>
                                        </td>
                                        <td>
                                            <button class="btn text-white" style="background: forestgreen;"> <i class="fe fe-download"></i> Download </button>
                                            <button class="btn text-white bg-indigo"> <i class="fe fe-copy"></i> Copy </button>
                                            <button class="btn btn-dark"> <i class="fe fe-share-2"></i> Share </button>
                                        </td>
                                    </tr>

                                </table>


                                <div class="card-options">
                                    <!--
                                    <input type="checkbox" id="checkbox" class="checkbox">
                                    <label for="checkbox" class="label">
                                        <i class="fas fa-moon"></i>
                                        <i class="fas fa-sun"></i>
                                        <div class="ball">
                                            
                                        </div>
                                    </label>
                                    `-->
                                    <label class="custom-switch m-0">
                                        <input type="checkbox" value="1" class="custom-switch-input" id="custom-switch-input" checked="">
                                        <span class="custom-switch-indicator"></span>
                                    </label>
                                </div>
                            </div>
                            <div id="editor" class="card-body dark-screen">

                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                    <table style="width: 70%;">
                                        <tr>
                                            <td><button class="btn bg-transparent text-black font-weight-bold"> <i class="fe fe-alert-triangle"></i> <label></label>Issues <span class="badge bg-dark">4</span></button></td>
                                            <td><button class="btn bg-transparent text-black font-weight-bold"> <i class="fe fe-message-square"></i> Comments <span class="badge bg-dark">15</span></button></td>
                                            <td><button class="btn bg-transparent text-black font-weight-bold"> <i class="fe fe-heart"></i> Likes <span class="badge bg-dark">120</span></button></td>

                                        </tr>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2">
                        <div class="card transcard">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fe fe-eye"></i> Front End</h3>

                            </div>
                            <div class="card-body">

                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">


                                </div>
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


    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('scripts.php');
    ?>
    <script>
        $('document').ready(function() {
            footer_date(); //load footer

            functions_load() //load all functions
            load_languages(); /////Load all the languages
            load_frameworks(); //load all frameworks
            load_implementations(); //load all implementations

            //load_codeSnippet(); ////Load codeSnippet

            /*
            const checkbox = document.getElementById("custom-switch-input");
            checkbox.addEventListener('change', ()=>{
            //change the theme of the website
            document.body.classList.toggle('dark');
            }) */

            //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        });
    </script>
    <script>
        //////--------Custom scroll
        (function($) {
            $(window).on("load", function() {
                $(".scrolli").mCustomScrollbar({
                    theme: "inset-2-dark",
                    autoHideScrollbar: true
                });
                $(".scrollk").mCustomScrollbar({
                    theme: "inset-2-dark",
                    autoHideScrollbar: true
                });
            });
        })(jQuery);

        //////-------Search functions/subfunctions
        $(function() {

            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
                return function(elem) {
                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                };
            });

            $('#search_functionality').keyup(function() {
                $('ul#functions_ li').hide();
                $('ul#functions_ .inner_list').fadeIn('fast');

                $('ul#functions_ li:Contains(' + $(this).val() + ')').show();
            })

            /* $('#search_functionality').keyup(function() {
                //grabbing user search keys/terms

                let k_ = $('#search_functionality').val().trim();
                let fk;
                if (k_) {
                    //capitalizing first letter for search keys/terms
                    const ks_ = k_.split(" ");

                    for (let i = 0; i < ks_.length; i++) {
                        ks_[i] = ks_[i][0].toUpperCase() + ks_[i].substr(1).toLowerCase();
                    }

                    fk = ks_.join(" ");


                    console.log("Search key terms =>", fk);
                }


                if (fk) {
                    // var matches = $('ul#functions_').find('li:contains(' + $(this).val() + ') ');
                    var matches = $('ul#functions_').find('li:contains(' + fk + ') ');
                    console.log("Found matches =>", matches);
                    $('li', 'ul#functions_').not(matches).slideUp();
                    matches.slideDown();
                    $('.inner_list').fadeIn('fast');
                } else {
                    ///-----Restore
                    $('.inner_list').fadeOut('fast');
                    $('.outer_list').slideDown();

                    //functions_load()

                }
            }); */
        });
    </script>
</body>

</html>
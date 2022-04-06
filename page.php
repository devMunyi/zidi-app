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
        include_once 'header.php';
        ?>
        <!-- Small icon top menu -->


        <!-- Notification and  Activity-->


        <!-- start User detail -->


        <!-- start Main menu -->
        <div id="left-sidebar" class="sidebar">

            <div class="">
                <div class="tab-content">
                <div class="tab-pane fade active show" id="all-tab">
                    <nav class="sidebar-nav">
                        <div class="card-body scrolli"  style="padding: 10px 20px;">
                            <ul class="metismenu" id="functions_">
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

                        </div>
                    </nav>
                </div>

            </div>
            </div>
        </div>

        <!-- start main body part-->
        <div class="page">

            <!-- start body header -->

            <div class="section-body">
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-lg-12 col-md-12">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 mb-4">
                                    <h4>This is a title</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix row-deck" style="min-height: 600px;">

                        <div class="col-lg-10">
                            <div class="card">



                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2">

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


</body>

</html>
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
    <link rel="stylesheet" href="assets/plugins/highlightjs/styles/monokai-sublime.min.css">
    <title> Zidi : Home</title>
    <style>
        li.active {
            color: red;
        }
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


        <!-- start main body part-->
        <div class="row">
            <!-- start body header -->
            <div class="col-lg-1"></div>
               <div class="col-lg-2" style="border-right: 3px solid #dfdfdf;">
                   <button class="btn btn-default btn-block hidden visible-xs mobile_button" type="button" data-toggle="collapse" data-target="#funct_box" aria-expanded="false" aria-controls="collapseExample">
                     <i class="fe fe-chevrons-down"></i>  Show Functionality List
                   </button>
                   <div class="collapse dont-collapse-sm" id="funct_box">
                   <div class="input-icon pl-2">
                <span class="input-icon-addon">
                    <i class="fe fe-search"></i>
                </span>
                       <input type="text" id="search_functionality" class="form-control" placeholder="Filter Functionalities...">
                   </div>

                       <div class="tab-content">
                           <div class="tab-pane fade active show" id="all-tab">
                               <nav class="sidebar-nav">
                                   <div class="card-body scrolli" style="padding: 10px 10px;">
                                       <ul class="metismenu func_" id="functions_">
                                           Loading ...
                                       </ul>
                                   </div>
                               </nav>
                           </div>

                       </div>
                   </div>
               </div>

                <div class="col-lg-9">
                    <div id="title-bar" style="border-bottom: 2px solid #d0d0d0;">
                        <div class="row">
                            <div class="col-sm-12" id="codeimp-title"><h4> Select a functionality to get started...</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4" id="imptype-and-contributor"><i class="fe fe-users"></i> Contributor Details</div>
                            <div class="col-sm-2" id="framework-dropdown"><i class="fa fa-cubes"></i> Framework List</div>
                            <div class="col-sm-2" id="filter-dropdown">   <select class="fancy-select" id="sel_userimpltype" onchange="loadCodesnippetsLink()">
                                    <option value="0"> All Code Styles</option>
                                    <option value="1">Plain Code</option>
                                    <option value="2">Function Based</option>
                                    <option value="3">Class Based</option>
                                    <option value="4">API Based</option>
                                </select>
                            </div>
                            <div class="col-sm-1"><span id=edit-code></span></div>
                            <div class="col-sm-3"><a class="a-override" href="code-add-edit" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Contribute New Code</a></div>

                        </div>
                    </div>
                    <div class="row" style="min-height: 400px;">
                        <div class="col-lg-2 col-md-2 pr-0">
                            <button class="btn btn-default btn-block hidden visible-xs mobile_button" type="button" data-toggle="collapse" data-target="#lang_box" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fe fe-chevrons-down"></i>  Show Languages List
                            </button>
                            <div class="collapse dont-collapse-sm" id="lang_box">
                            <div class="scrollk">
                                <div class="transcard">
                                    <div class="card-header pl-0 pt-3 pb-1 pr-0">
                                        <h4 class="card-title text-orange"><i class="fe fe-droplet"></i> Language</h4>
                                    </div>
                                    <div class="card-body p-0">
                                        <ul class="metismenu ci-effect-1 prominent lang_" id="language_">
                                            <li class="font-weight-normal font-14 font-italic">Loading...</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7 pl-0 pr-0">
                            <div class="card transcard ">
                                <div class="card-header pb-2 pt-2">
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <h3 title="code" class="card-title"><i class="fe fe-code"></i>
                                                    <!--Code Snippet-->
                                                </h3>
                                            </td>
                                            <td>
                                                <button title="copy" class="btn text-white btn-sm text-sm bg-indigo mr-3"> <i class="fe fe-copy"></i>
                                                    <!--Copy-->
                                                </button>
                                                <button title="download" class="btn text-white btn-sm text-sm mr-3" style="background: forestgreen;"> <i class="fe fe-download"></i>
                                                    <!--Download-->
                                                </button>
                                                <button title="share" class="btn btn-dark btn-sm text-sm"> <i class="fe fe-share-2"></i>
                                                    <!--Share-->
                                                </button>
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

                                        <div class="row">


                                                <div class="col-sm-3"><button class="btn bg-transparent text-black font-weight-bold"> <i class="fe fe-message-square"></i> Comments <span class="badge bg-dark">15</span></button></div>
                                                <div class="col-sm-3"><button class="btn bg-transparent text-black font-weight-bold"> <i class="fe fe-heart"></i> Likes <span class="badge bg-dark">120</span></button></div>

                                        </div>

                                </div>
                            </div>
                            <div class="foot_">
                                <h5>Comments</h5>
                                <div class="comments_wrapper">
                                    <div class="comment_box">
                                        <div class="row">
                                            <div class="col-sm-1"><div class="hicon">J</div></div>
                                            <div class="col-sm-11">
                                                <div class="row chead">
                                                    <div class="col-sm-9 cwho">
                                                        Jonah Ngarama  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> 1 hour</span>
                                                    </div>
                                                    <div class="col-sm-3">
                                                        <label  class="font-12  font-weight-bold"><i class="fe fe-star"></i> Top Comment</label>
                                                    </div>
                                                </div>
                                                <div class="row cbody">

                                                    <div class="col-sm-12">
                                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                    </div>
                                                </div>
                                                <div class="row cfoot">

                                                    <div class="col-sm-4">
                                                        <a class="a-override"><i class="fe fe-corner-up-left"></i> 5 Replies </a>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> 5 </a>
                                                    </div>
                                                    <div class="col-sm-4 pull-right">
                                                        <a class="font-weight-bold btn-sm btn-outline-primary" href="k"><i class="fa fa-mail-reply"></i> Reply</a>
                                                        <a class="font-weight-bold btn-sm btn-outline-success" href="k"><i class="fa fa-thumbs-up"></i></a>
                                                        <a class="font-weight-bold btn-sm btn-outline-danger" href="k"><i class="fa fa-thumbs-down"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="comment_box inner-box">
                                            <div class="row">
                                                <div class="col-sm-1"><div class="hicon">C</div></div>
                                                <div class="col-sm-11">
                                                    <div class="row chead">
                                                        <div class="col-sm-9 cwho">
                                                            Chelsea  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> 1 hour</span>
                                                        </div>
                                                        <div class="col-sm-3">

                                                        </div>
                                                    </div>
                                                    <div class="row cbody">

                                                        <div class="col-sm-12">
                                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                        </div>
                                                    </div>
                                                    <div class="row cfoot">

                                                        <div class="col-sm-4">
                                                            <a class="a-override"><i class="fe fe-corner-up-left"></i> 5 Replies </a>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> 5 </a>
                                                        </div>
                                                        <div class="col-sm-4 pull-right">
                                                            <a class="font-weight-bold btn-sm btn-outline-primary" href="k"><i class="fa fa-mail-reply"></i> Reply</a>
                                                            <a class="font-weight-bold btn-sm btn-outline-success" href="k"><i class="fa fa-thumbs-up"></i></a>
                                                            <a class="font-weight-bold btn-sm btn-outline-danger" href="k"><i class="fa fa-thumbs-down"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="comment_box inner-box">
                                                <div class="row">
                                                    <div class="col-sm-1"><div class="hicon">C</div></div>
                                                    <div class="col-sm-11">
                                                        <div class="row chead">
                                                            <div class="col-sm-9 cwho">
                                                                Chelsea  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> 1 hour</span>
                                                            </div>
                                                            <div class="col-sm-3">

                                                            </div>
                                                        </div>
                                                        <div class="row cbody">

                                                            <div class="col-sm-12">
                                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                            </div>
                                                        </div>
                                                        <div class="row cfoot">

                                                            <div class="col-sm-4">
                                                                <a class="a-override"><i class="fe fe-corner-up-left"></i> 5 Replies </a>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> 5 </a>
                                                            </div>
                                                            <div class="col-sm-4 pull-right">
                                                                <a class="font-weight-bold btn-sm btn-outline-primary" href="k"><i class="fa fa-mail-reply"></i> Reply</a>
                                                                <a class="font-weight-bold btn-sm btn-outline-success" href="k"><i class="fa fa-thumbs-up"></i></a>
                                                                <a class="font-weight-bold btn-sm btn-outline-danger" href="k"><i class="fa fa-thumbs-down"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment_box">
                                        <div class="row">
                                            <div class="col-sm-1"><div class="hicon">S</div></div>
                                            <div class="col-sm-11">
                                                <div class="row chead">
                                                    <div class="col-sm-9 cwho">
                                                        Samuel Munyi  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> 1 hour</span>
                                                    </div>
                                                    <div class="col-sm-3">

                                                    </div>
                                                </div>
                                                <div class="row cbody">

                                                    <div class="col-sm-12">
                                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                    </div>
                                                </div>
                                                <div class="row cfoot">

                                                    <div class="col-sm-4">
                                                        <a class="a-override"><i class="fe fe-corner-up-left"></i> 5 Replies </a>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> 5 </a>
                                                    </div>
                                                    <div class="col-sm-4 pull-right">
                                                        <a class="font-weight-bold btn-sm btn-outline-primary" href="k"><i class="fa fa-mail-reply"></i> Reply</a>
                                                        <a class="font-weight-bold btn-sm btn-outline-success" href="k"><i class="fa fa-thumbs-up"></i></a>
                                                        <a class="font-weight-bold btn-sm btn-outline-danger" href="k"><i class="fa fa-thumbs-down"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="comment_box">
                                        <div class="row">
                                            <div class="col-sm-1"><div class="hicon">C</div></div>
                                            <div class="col-sm-11">
                                                <div class="row chead">
                                                    <div class="col-sm-9 cwho">
                                                        Chelsea  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> 1 hour</span>
                                                    </div>
                                                    <div class="col-sm-3">

                                                    </div>
                                                </div>
                                                <div class="row cbody">

                                                    <div class="col-sm-12">
                                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                    </div>
                                                </div>
                                                <div class="row cfoot">

                                                    <div class="col-sm-4">
                                                        <a class="a-override"><i class="fe fe-corner-up-left"></i> 5 Replies </a>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> 5 </a>
                                                    </div>
                                                    <div class="col-sm-4 pull-right">
                                                        <a class="font-weight-bold btn-sm btn-outline-primary" href="k"><i class="fa fa-mail-reply"></i> Reply</a>
                                                        <a class="font-weight-bold btn-sm btn-outline-success" href="k"><i class="fa fa-thumbs-up"></i></a>
                                                        <a class="font-weight-bold btn-sm btn-outline-danger" href="k"><i class="fa fa-thumbs-down"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-lg-3 col-md-3" style="margin-left: 0; padding-left: 0; overflow-y: scroll; max-height: 500px;">
                            <div class="card transcard">
                                <div class="card-header pt-3">
                                    <h3 class="card-title"><i class="fe fe-eye"></i> Available Solutions</h3>
                                </div>
                                <div class="card-body pt-0" style="padding: 20px 0px;">
                                    <div class="list-group" id="available-solns">
                                    </div>
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
        $(document).ready(function() {
            updateHeader("index"); //check for logged in user so as to update the header accordingly 
        })
    </script>
    <script>
        $(document).ready(function() {
            footer_date(); //load footer
            persistence_remove("func");
            persistence_remove("subfunc");
            persistence_remove("language");
            persistence_remove("framework");
            persistence_remove("offset");
            //persistence_remove("codeId");

            functions_load() //load all functions
            load_languages(); //Load all the languages
            loadCodesnippetsLink(); //load code links
            getAllFrams(); //persist all frameworks in local storage
        });
    </script>
    <script>
        //////--------Custom scroll
        (function($) {
            $(window).on("load", function() {
                $('#logo_home').css('display','none');
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

            //toggle active function
            $('.func_').on('click', '.func-item', function() {
                $('.func_ .func-item').removeClass('active-two');
                $(this).addClass('active-two');
            });

            //toggle active subfunction
            $('.subfunc-item').on('click', '.subfunc-item', function() {
                $('.subfunc-item').removeClass('active-two');
                $(this).addClass('active-two');
            });

            //toggle active language
            $('.lang_').on('click', '.lang-item', function() {
                $('.lang_ .lang-item').removeClass('active-two');
                $(this).addClass('active-two');
            });

            //toggle active code link
            $('#available-solns').on('click', 'a', function() {
                $('#available-solns a').removeClass('active-two');
                $(this).addClass('active-two');
            });
        });
    </script>
</body>

</html>
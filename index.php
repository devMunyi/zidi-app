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
    <!-- <script type="text/javascript" src="assets/ckeditor/ckeditor.js"></script> -->

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
        <!-- start main body part-->
        <div id="body-wrapper" class="row">
            <!-- start body header -->
            <div class="col-lg-1"></div>
            <div class="col-lg-2" style="border-right: 3px solid #dfdfdf;">
                <button class="btn btn-default btn-block hidden visible-xs mobile_button" type="button" data-toggle="collapse" data-target="#funct_box" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fe fe-chevrons-down"></i> Show Functionality List
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
                                        <!-- <i class="fe fe-list"></i> Language List -->
                                        <div class="spinner-border text-muted" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
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
                        <div class="col-sm-12" id="codeimp-title">
                            <h4> Select a functionality to get started...</h4>
                        </div>
                    </div>
                    <div class="row" id="about_list">
                        <div class="col-sm-4" id="imptype-and-contributor"><i class="fe fe-users"></i> Contributor Details</div>
                        <div class="col-sm-2" id="framework-dropdown"><i class="fa fa-cubes"></i> Framework List</div>
                        <div class="col-sm-2" id="codestyle-dropdown"> <i class="fe fe-code"></i>
                            Codestyle List
                        </div>
                        <div class="col-sm-1"><span id=edit-code></span></div>
                        <div class="col-sm-3" id="contribute-code"></div>
                    </div>
                </div>
                <div class="row" style="min-height: 400px;">
                    <div class="col-lg-2 col-md-2 pr-0">
                        <button class="btn btn-default btn-block hidden visible-xs mobile_button" type="button" data-toggle="collapse" data-target="#lang_box" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fe fe-chevrons-down"></i> Show Languages List
                        </button>
                        <div class="collapse dont-collapse-sm" id="lang_box">
                            <div class="scrollk mt-10sides">
                                <div class="transcard">
                                    <div class="card-header pl-0 pt-3 pb-1 pr-0">
                                        <h4 class="card-title text-orange"><i class="fe fe-droplet"></i> Language</h4>
                                    </div>
                                    <div class="card-body p-0">
                                        <ul class="metismenu ci-effect-1 prominent lang_" id="language_">
                                            <li class="font-weight-normal font-14 font-italic">
                                                <div class="spinner-border text-muted" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-7 pl-0 pr-0">
                        <div class="card transcard ">
                            <div class="card-header pb-2 pt-2">
                                <table style="width: 60%">
                                    <tr>
                                        <td>
                                            <button onclick="copyCodesnippet()" class="btn text-white btn-sm text-sm bg-indigo mr-3" title="copy code"> <i class="fe fe-copy"></i>
                                                <!--Copy-->
                                            </button>
                                            <button class="btn text-white btn-sm text-sm mr-3" title="download code" style="background: forestgreen;"> <i class="fe fe-download"></i>
                                                <!--Download-->
                                            </button>
                                            <button onclick="shareCodesnippet()" class="tooltip-test btn btn-dark btn-sm text-sm" title="share code"> <i class="fe fe-share-2"></i>
                                                <!--Share-->
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                                <div id="code-composition">

                                </div>
                                <div class="card-options">
                                    <label class="custom-switch m-0">
                                        <input type="checkbox" value="1" class="custom-switch-input" id="custom-switch-input" checked>
                                        <span onclick="toggleEditorTheme()" class="custom-switch-indicator"></span>
                                    </label>
                                </div>
                            </div>

                            <div id="editor" class="card-body dark-screen">
                                <div id="nocode" class="text-muted-dark text-center">
                                    <div class="font-24 text-bold  align-middle"><i class="fa fa-info-circle"></i> Get Started</div>

                                    <div class="font-14 mt-3"> <i class="fa fa-hand-o-left"></i> Use the left panel to filter through functionalities.<br /> <i class="fa fa-hand-o-up"></i> The top bar to search for snippets. <br /> The right section to find implementations <i class="fa fa-hand-o-right"></i> <br />
                                        <i class="fa fa-heart"></i> Contribute new code and help other developers worldwide
                                    </div>

                                </div>

                            </div>


                            <div class="card-footer">

                                <div class="row" id="code-instructions">

                                    <!-- No Instructions -->

                                </div>

                            </div>

                            <!-- Button trigger modal -->
                            <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                Launch demo modal
                            </button> -->

                            <!-- Modal -->
                            <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Comment</h5>
                                            <button type="button" onclick="dismissModal2()" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <input type="hidden" id="comment-edit-id0" value="add comment">
                                                <input type="hidden" id="cke-init-0" value="#fcbody0">
                                                <div class="col-sm-12"> <span class='hide'>Replying to...</span> <textarea name="content" placeholder="Leave a comment..." id="fcbody0"></textarea></div>
                                                <div class="offset-sm-1 col-sm-11 error" id="comment0Err"></div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button onclick="dismissModal2()" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>

                        <div class="foot_ mt-10sides">
                            <div class="row">
                                <div class="col-md-7">
                                    <h5 id="total-comments"></h5>
                                </div>
                                <div class="col-md-5" id="add-comment"></div>
                            </div>

                            <div id="loginOrRegisterModal" class="modal" tabindex="-1" role="dialog">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 id="modal-title" class="modal-title">Please <a class="cpointer" style="color:blue; text-decoration: underline;" href="login">register</a> or <a class="cpointer" style="color:blue; text-decoration: underline;" href="register">sign up</a> to add a comment</h5>
                                            <button type="button" onclick="dismissModal('#loginOrRegisterModal')" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="comments_wrapper">
                                <!-- <textarea name="content" id="editor1">This is some sample content.</textarea> -->
                                <div class="comment_area hide" id="cform0">
                                    <div class="row">
                                        <input type="hidden" id="comment-edit-id0" value="add comment">
                                        <input type="hidden" id="cke-init-0" value="#fcbody0">
                                        <div class="col-sm-1">
                                            <div class="hicon" id="replyHicon0">S</div>
                                        </div>

                                        <div class="col-sm-11"> <span class='hide'>Replying to...</span> <textarea class="form-control" name="content" placeholder="Leave a comment..." id="fcbody0"></textarea></div>
                                        <div class="offset-sm-1 col-sm-10 error" id="comment0Err"></div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-sm-1"></div>
                                        <div class="col-sm-9"><button onclick="closeForm('#cform0');" class="btn btn-success btn-sm"><i class=""></i> Cancel</button></div>
                                        <div class="col-sm-2"><button onclick="saveComment('fcbody0', 0)" class="btn btn-success btn-sm"><i class=""></i> Post</button></div>
                                    </div>
                                </div>

                                <!-- <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="commentModalLabel">Add Comment</h5>
                                                <button type="button" onclick="dismissModal2('#commentModal')" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <input type="hidden" id="comment-edit-id0" value="add comment">
                                                    <input type="hidden" id="cke-init-0" value="#fcbody0">
                                                    <div class="col-sm-12"> <span class='hide'>Replying to...</span> <textarea onkeyup="validateComment('#comment0Err');" name="content" placeholder="Leave a comment..." id="fcbody0"></textarea></div>
                                                    <div class="col-sm-12 error" id="comment0Err"></div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button onclick="dismissModal2('#commentModal');" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button onclick="getckeditorData('#fcbody_input_', 'fcbody0'); saveComment();" type="button" class="btn btn-primary"><span id="btn-action">Add</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->

                                <div id="outer-c">
                                </div>
                                <div id="pagingDiv"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3" style="margin-left: 0; padding-left: 0; min-height: 500px;">
                        <div id="solns-box" class="card scrollh transcard mb-0 pb-0 all-solns hidden">
                            <div class="card-header pt-3">
                                <h3 class="card-title text-center"><i class="fe fe-eye"></i> <span id="links-title">All Solutions</span></h3>
                            </div>
                            <div class="card-body pt-0" style="padding: 10px 0px;">
                                <div class="list-group" id="available-solns">
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                </div>
                            </div>
                        </div>
                        <div id="solns-box2" class="card transcard scrollh related-soln-container hidden">
                            <div class="card-header">
                                <h4 class="card-title"><i class="fe fe-eye"></i> <span id="related-soln-title"> Related Solutions</span></h4>
                                <div class="pl-4 pr-0 mr-0 pull-right" id="all-solns-nav">

                                </div>
                            </div>
                            <div class="card-body" style="padding: 10px 0px;">
                                <div class="list-group" id="related-solns">
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
            $('#search_box').css('display', 'block');
        })
    </script>
    <script>
        $(document).ready(function() {
            persistUrl() //print url string

            let current_loc = currentLoc();
            contributeCodeNav() //dynamic contribute new code nav
            footer_date(); //load footer
            persistence_remove("gotourl");

            if (current_loc && current_loc.cur_page) {

            } else {
                persistence("cur_page", 1); //set default comment first page to 1
            }

            if (current_loc && current_loc.last_page) {

            } else {
                persistence("last_page", 1); //set default comment last page to 1
            }


            //if theme editor is not set, set it else return empty string
            let editorTheme = "";
            if (current_loc && current_loc.editorTheme) {
                editorTheme = current_loc.editorTheme;
            } else {
                editorTheme = "monokai";
                persistence("editorTheme", "monokai");

            }

            //toggle the theme switch indicator based on the theme set
            if (editorTheme == "monokai") {
                //$('#custom-switch-input').prop('checked', true);
                $("#editor").removeClass("light-screen");
                $("#editor").addClass("dark-screen");
            } else {
                $('#custom-switch-input').prop('checked', false);
                $("#editor").removeClass("dark-screen");
                $("#editor").addClass("light-screen");
            }


            let codeId = 0;
            const url = getCurrentUrl(); //grab the current to determine whether the site is live or local
            const host = url.host;
            if (host == "localhost") {
                if ("<?php echo $_GET['cid']; ?>") {
                    codeId = parseInt("<?php echo $_GET['cid']; ?>");
                }
            } else {
                if ("<?php echo $_GET['dir']; ?>") {
                    let codeUrl = "<?php echo $_GET['dir']; ?>";
                    let codeUrlArr = codeUrl.split("/");
                    codeId = parseInt(codeUrlArr.pop());
                }

            }

            if (codeId > 0) {
                load_codesnippetById(codeId); //load code links with previously loaded code params
            } else {
                persistence_remove("func");
                persistence_remove("subfunc");
                persistence_remove("language");
                persistence_remove("framework");
                persistence_remove("codestyle");
                persistence_remove("allFrams");

                loadCodesnippetsLink(); //load code links with any available params needed to to load the solutions
                getAllFrams();
                functions_load() //load all functions and subfunctions
                load_languages(); //Load all the languages
                codeStyles();
            }


            //pagination click even listener
            $("#pagingDiv").on("click", "a", function() {
                setTargetPage($(this).attr("data-pn"))
            });
        });
    </script>
    <script>
        //////--------Custom scroll
        (function($) {
            $(window).on("load", function() {
                $('#logo_home').css('display', 'none');
                $(".scrolli").mCustomScrollbar({
                    theme: "inset-2-dark",
                    // autoHideScrollbar: true
                });
                $(".scrollk").mCustomScrollbar({
                    theme: "inset-2-dark",
                    // autoHideScrollbar: true
                });

                $(".scrollh").mCustomScrollbar({
                    theme: "inset-2-dark",
                    // autoHideScrollbar: true
                });
            });
        })(jQuery);

        //////-------Search functions/subfunctions
        $(function() {
            //following code makes jquery contains case insensitive
            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
                return function(elem) {
                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                };
            });

            $('#search_functionality').keyup(function() {
                let k_ = $('#search_functionality').val().trim();
                if (k_) {
                    $('ul#functions_ li.outer_list').hide();
                    $('ul#functions_ .inner_list').fadeIn('fast');
                    $('ul#functions_ li:Contains(' + $(this).val() + ')').show();
                    // $('ul#functions_ li.outer_list ul.inner_list').show();
                    // $('ul#functions_ .inner_list.subfunc-)').hide();
                } else {
                    //-----Restore
                    $('.inner_list').fadeOut('fast');
                    $('.outer_list').slideDown();
                    //$('ul#functions_ li').show();
                }
            })

            //toggle active code link
            $('#available-solns').on('click', 'a', function() {
                $('#available-solns a').removeClass('active-two');
                $(this).addClass('active-two');
            });
        });
    </script>

    <script>
        //initialize ckeditor on the comment form
        createEditor2('fcbody0');
        //initCkeditor('index');
    </script>
</body>

</html>
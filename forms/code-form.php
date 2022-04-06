<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="Crush it Able The most popular Admin Dashboard template and ui kit">
    <meta name="author" content="PuffinTheme the theme designer">

    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="../assets/plugins/highlightjs/styles/monokai-sublime.min.css">
    <title> code : add-edit</title>
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
    include_once '../styles.php';
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
        include_once '../header.php';
        ?>
       
        <!-- Start page footer -->
        <div class="section-body">
            <?php
            include_once '../footer.php';
            ?>
        </div>
    </div>
    </div>


    <!-- jQuery and bootstrtap js -->
    <?php
    include_once('../scripts.php');
    ?>
    <script>
        $('document').ready(function() {
        });
    </script>
</body>

</html>
<header class="masthead bg-primary text-white">
    <div class="container d-flex  flex-column">
        <!-- Masthead Avatar Image-->

        <!-- Masthead Heading-->
        <div class="row">
            <div class="col-lg-2">
                <a href="index" id="logo_home">
                <h3 class="masthead-heading text-uppercase mb-0">
                    <img src="assets/images/logo.png" height="30px" />

                </h3>
                </a>
            </div>
            <div class="col-lg-5">
                <input type="search" id="search_box" autocomplete="off" onkeyup="search_codeSnippet()" class="form-control pl-2" placeholder="Search code snippets">
                <input type="hidden" id="code_id_">
                <div id="code_results" class="">

                </div>
            </div>

            <div class="col-lg-5">
                <ul class="nav nav-pills d-flex justify-content-center pr-0 pt-2" id="myNav">
                    <li class="">
                        <a class="nav-link text-dark" href="javascript:void(0)">About</a>
                    </li>
                    <li class="">
                        <a class="nav-link text-dark" href="javascript:void(0)">Contribute</a>
                    </li>
                    <li class="">
                        <a class="nav-link text-dark" href="javascript:void(0)">Community</a>
                    </li>
                    <li class="dropdown" id="account-0">
                        <div class="nav-link dropdown-toggle bg-white text-black" style="text-shadow: none; color: black;" data-toggle="dropdown" aria-expanded="false"><i class="fe fe-user"></i>&nbsp; Account</div>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign in</a>
                            <a class="dropdown-item" href="register"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign up</a>
                            <!-- <a class="dropdown-item" href="profile">Profile</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="javascript:void(0)" id="sign-out">Sign out</a> -->
                        </div>
                    </li>
                    <!-- <li class="" id="sign-in">
                        <a class="nav-link text-dark" href="login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign in</a>
                    </li>
                    <li class="" id="sign-up">
                        <a class="nav-link text-dark" href="register"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign up</a>
                    </li> -->
                    <li class="dropdown" id="account-1">
                        <div class="nav-link dropdown-toggle bg-white text-black" style="text-shadow: none; color: black;" data-toggle="dropdown" aria-expanded="false"><i class="fe fe-user"></i>&nbsp; <span id='user-name'></span></div>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="profile">Profile</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="javascript:void(0)" id="sign-out">Sign out</a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <!-- <link rel="stylesheet" href="assets/css/jquery.mCustomScrollbar.css" /> -->
    </div>
</header>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<header class="masthead bg-primary text-white">
    <!-- <div class="d-flex flex-column justify-content-center align-items-center"> -->
    <!-- Masthead Avatar Image-->

    <!-- Masthead Heading-->
    <div class="row d-flex justify-content-center align-items-center">
        <div class="col-sm-1"></div>



        <!-- <div class="col-lg-5 pt-2"> -->
       <div  class="col-sm-11">
           <nav class="navbar navbar-expand-lg navbar-light bg-light py-0">
               <a class="navbar-brand" href="index">
                   <h3 class="masthead-heading text-uppercase pl-3">
                       <img src="assets/images/logo.png" height="35px" />
                   </h3>
               </a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
               </button>

               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                   <div class="col-lg-6">
                       <input type="search" id="search_box" autocomplete="off" onkeyup="search_codeSnippet()" class="form-control" placeholder="Search code snippets">
                       <input type="hidden" id="code_id_">
                       <div id="code_results" class="">
                       </div>
                   </div>
                   <ul class="navbar-nav mr-auto">
                       <li class="nav-item active">

                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="#">Home</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="javascript:void(0)">About</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="javascript:void(0)">Community</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="javascript:void(0)">Contribute</a>
                       </li>
                       <li class="nav-item dropdown" id="account-0">
                           <div class="nav-link dropdown-toggle bg-white btn text-black" style="text-shadow: none; color: black;" data-toggle="dropdown" aria-expanded="false"><i class="fe fe-user"></i>&nbsp; Account</div>
                           <div class="dropdown-menu mr-3">
                               <a class="dropdown-item text-dark" href="login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign in</a>
                               <a class="dropdown-item text-dark" href="register"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign up</a>
                           </div>
                       </li>
                       <li class="nav-item dropdown" id="account-1" style="outline: none;">
                           <div class="nav-link dropdown-toggle bg-white text-black" style="text-shadow: none; color: black;" data-toggle="dropdown" aria-expanded="false"><span id="user-photo"><i class="fe fe-user"></i></span>&nbsp; <span id='user-name'></span></div>
                           <div class="dropdown-menu mr-3" id="dropdown-menu">
                               <!-- <a class="dropdown-item" href="profile">Profile</a>
                                       <div class="dropdown-divider"></div>
                                       <a onclick="logout('index')" class="dropdown-item" href="javascript:void(0)" id="sign-out">Sign out</a> -->
                           </div>
                       </li>
                       <li class="nav-item">

                       </li>
                   </ul>

               </div>
           </nav>

       </div>

        <!-- </div> -->
    </div>
    <!-- </div> -->
</header>


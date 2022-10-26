///////-------------------Begin authentication

// Defining a function to validate registration form
function validateRegForm() {
  // Retrieving the values of form elements
  const username = $('#username_input').val().trim();
  const fullname = $('#fullname_input').val().trim();
  const email = $('#email_input').val().trim();
  const country = $('#country_input').val().trim();
  const password = $('#password_input').val().trim();
  const cpassword = $('#cpassword_input').val().trim();

  // Defining error variables with a default value
  let usernameErr =
    (fullnameErr =
    emailErr =
    countryErr =
    passwordErr =
    cpasswordErr =
      true);

  // Validate username
  if (username == '') {
    printError('usernameErr', 'Please enter your username');
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(username) === false) {
      printError('usernameErr', 'Please enter a valid username');
    } else {
      printError('usernameErr', '');
      usernameErr = false;
    }
  }

  // Validate fullname
  if (fullname == '') {
    printError('fullnameErr', 'Please enter your fullname');
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(username) === false) {
      printError('fullnameErr', 'Please enter a valid fullname');
    } else {
      printError('fullnameErr', '');
      fullnameErr = false;
    }
  }

  // Validate email address
  if (email == '') {
    printError('emailErr', 'Please enter your email address');
  } else {
    // Regular expression for basic email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      printError('emailErr', 'Please enter a valid email address');
    } else {
      printError('emailErr', '');
      emailErr = false;
    }
  }

  // Validate country
  if (country == '') {
    printError('countryErr', 'Please select your country');
  } else {
    printError('countryErr', '');
    countryErr = false;
  }

  // Validate password
  if (password == '') {
    printError('passwordErr', 'Please enter your password');
  } else if (password.length < 6) {
    printError('passwordErr', 'Your password should be min 6 characters');
  } else {
    printError('passwordErr', '');
    passwordErr = false;
  }

  // Validate confirm password
  if (cpassword == '') {
    printError('cpasswordErr', 'Please confirm your password');
  } else if (cpassword !== password) {
    printError('cpasswordErr', 'Confirm password should match');
  } else {
    printError('cpasswordErr', '');
    cpasswordErr = false;
  }

  if (
    (usernameErr ||
      fullnameErr ||
      emailErr ||
      countryErr ||
      passwordErr ||
      cpasswordErr) == true
  ) {
    return false;
  } else {
    // Creating a string from input data for preview
    data = {
      username,
      fullname,
      email,
      country,
      password,
      cpassword,
    };
    //console.log("FORM DATA => ", data);
    register(data);
  }
}

//register/add user
function register(data) {
  //show disabled/processing button
  disabledBtn('#regBtn');

  let user_id = 0;
  // let username = $("#username_input").val();
  // let fullname = $("#fullname_input").val();
  // let email = $("#email_input").val();
  // let country = $("#country_input").val();
  // let password = $("#password_input").val();
  // let cpassword = $("#cpassword_input").val();
  let method = 'POST';
  let url = '/add-user';

  let jso = data;

  if (user_id > 0) {
    method = 'PUT';
    url = '/edit-user';
    data.user_id = user_id;
    jso = {
      data,
    };
  }

  //make api request
  crudaction(jso, url, method, function (feed) {
    if (feed) {
      //return the normal button
      submitBtn('#regBtn', 'validateRegForm()', 'Click to register');
    }

    if (feed['success'] === false) {
      let message = feed['message'];
      errorToast(message);
    } else if (feed['success'] === true) {
      let message = feed['message'];
      successToast(message);
      setTimeout(() => {
        gotourl('login');
      }, 2550);
    }
  });
}

//logout/sign out
function logout(currentPage = 'other') {
  //remove user and token from localstorage
  persistence_remove('user');
  persistence_remove('token');
  // persistence_remove("allFrams");
  // persistence_remove("allFuns");
  // persistence_remove("allLangs");
  // persistence_remove("allSubfuns");

  if (currentPage == 'index') {
    updateHeader();
  } else {
    gotourl('login');
  }
}
// function logout(currentPage = "other") {
//   //remove user and token from localstorage
//   persistence_remove("user");
//   persistence_remove("token");
//   crudaction({}, "/log-out", "GET", function (feed) {
//     if (feed && feed.success) {
//       if (currentPage == "index") {
//         updateHeader();
//       } else {
//         gotourl("login");
//       }
//     }
//   });

//   //const sign_out = document.getElementById("sign-out");
//   // sign_out.addEventListener(
//   //   "click",
//   //   function () {
//   //   },
//   //   false
//   // );
// }

//vailidate login form
function validateLoginForm() {
  // Retrieving the values of form elements
  const username = $('#emailOrUsername_input').val().trim();
  const password = $('#password_input').val().trim();

  // Defining error variables with a default value
  let usernameErr = (passwordErr = true);

  // var regex = /^\S+@\S+\.\S+$/;
  // Validate username
  if (username == '') {
    printError('usernameErr', 'Please enter your username');
  } else {
    var regex = /^[a-zA-Z0-9.@\s]+$/;
    if (regex.test(username) === false) {
      printError('usernameErr', 'Please enter a valid username');
    } else {
      printError('usernameErr', '');
      usernameErr = false;
    }
  }

  // Validate password
  if (password == '') {
    printError('passwordErr', 'Please enter your password');
  } else if (password.length < 6) {
    printError('passwordErr', 'Your password should be min 6 characters');
  } else {
    printError('passwordErr', '');
    passwordErr = false;
  }

  if ((usernameErr || passwordErr) == true) {
    return false;
  } else {
    // Creating a string from input data for preview
    data = {
      username,
      password,
    };
    //console.log("FORM DATA => ", data);
    login(data);
  }
}

function login(data) {
  //show disabled/processing button
  disabledBtn('#loginBtn');

  // let username = $("#emailOrUsername_input").val().trim();
  // let password = $("#password_input").val().trim();
  // let data = {
  //   username,
  //   password,
  // };

  //make api request
  crudaction(data, '/user/login', 'POST', function (feed) {
    //console.log("LOGIN FEEDBACK => ", feed);
    if (feed) {
      //return the initial button
      submitBtn(
        '#loginBtn',
        'validateLoginForm()',
        'Click to Sign in',
        'Submit'
      );

      if (feed.success === false) {
        //show error notification
        errorToast(feed.message);
      } else if ((feed.success = true)) {
        //store user info in local storage for reference
        persistence('user', feed.user);
        persistence('token', feed.token);

        //show success notification
        successToast(feed.message);

        //access the next nav url
        let current_loc = currentLoc();
        let nextNav =
          current_loc && current_loc.gotourl ? current_loc.gotourl : 'index';
        setTimeout(() => {
          gotourl(nextNav);
        }, 2550);
      }
    }
  });
}

function googleSignin() {
  const url_string = window.location.href;
  const url = new URL(url_string);

  const success = url.searchParams.get('success');

  if (success === 'true') {
    let uid = url.searchParams.get('uid');
    const username = url.searchParams.get('username');
    const email = url.searchParams.get('email');
    const fullname = url.searchParams.get('fullname');
    const provider = url.searchParams.get('provider');
    const photo = url.searchParams.get('photo');
    const token = url.searchParams.get('tkn');

    if (uid) {
      uid = parseInt(uid);
    }

    let user = { uid, username, email, fullname, provider, photo };

    successToast('Login success');

    setTimeout(() => {
      let current_loc = currentLoc();
      if (current_loc && current_loc.user && current_loc.user.uid == user.uid) {
      } else {
        persistence('user', user);
      }
      if (current_loc && current_loc.token && current_loc.token == user.token) {
      } else {
        persistence('token', 'Bearer ' + token);
      }

      //access the next nav url
      let nextNav =
        current_loc && current_loc.gotourl ? current_loc.gotourl : 'index';
      gotourl(nextNav);
    }, 2550);
  } else if (success === 'false') {
    const message = url.searchParams.get('message');
    errorToast(message);
  } else {
    //do nothing
  }
}

function googleSignup() {
  const url_string = window.location.href;
  const url = new URL(url_string);

  const success = url.searchParams.get('success');
  if (success === 'true') {
    const message = url.searchParams.get('message');
    successToast(message); //toast sign up success message
    setTimeout(() => {
      gotourl('login');
    }, 2550);
  } else if (success === 'false') {
    const message = url.searchParams.get('message');
    errorToast(message);
  } else {
    //do nothing
  }
}

function githubSignin() {
  const url_string = window.location.href;
  const url = new URL(url_string);

  const success = url.searchParams.get('success');

  if (success === 'true') {
    let uid = url.searchParams.get('uid');
    const username = url.searchParams.get('username');
    const email = url.searchParams.get('email');
    const fullname = url.searchParams.get('fullname');
    const provider = url.searchParams.get('provider');
    const photo = url.searchParams.get('photo');
    const token = url.searchParams.get('tkn');

    if (uid) {
      uid = parseInt(uid);
    }

    let user = { uid, username, email, fullname, provider, photo };

    successToast('Login success');
    setTimeout(() => {
      let current_loc = currentLoc();
      if (current_loc && current_loc.user && current_loc.user.uid == user.uid) {
      } else {
        persistence('user', user);
      }
      if (current_loc && current_loc.token && current_loc.token == user.token) {
      } else {
        persistence('token', 'Bearer ' + token);
      }

      //access the next nav url
      let nextNav =
        current_loc && current_loc.gotourl ? current_loc.gotourl : 'index';
      gotourl(nextNav);
    }, 2550);
  } else if (success === 'false') {
    const message = url.searchParams.get('message');
    errorToast(message);
  } else {
    //do nothing
  }
}

function githubSignup() {
  const url_string = window.location.href;
  const url = new URL(url_string);

  const success = url.searchParams.get('success');
  if (success === 'true') {
    const message = url.searchParams.get('message');
    successToast(message); //toast sign up success message
    setTimeout(() => {
      gotourl('login');
    }, 2550);
  } else if (success === 'false') {
    const message = url.searchParams.get('message');
    errorToast(message);
  } else {
    //do nothing
  }
}

//verify logged-in user by sending cookie token/session id to server side
function updateHeader(pageId) {
  //-----Begin home, login, register navs update based on env
  let host = getCurrentHost();
  if (host == 'localhost') {
    $('.home-nav').html(
      `
      <a class="navbar-brand" href="http://localhost/zidi-app">
          <h3 class="masthead-heading text-uppercase">
            <img src="assets/images/logo.png" height="35px" />
          </h3>
      </a>
      `
    );
    $('.sign-in-up-navs').html(
      `
     <a class="dropdown-item text-dark" href="http://localhost/zidi-app/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign in</a>
      <a class="dropdown-item text-dark" href="http://localhost/zidi-app/register"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign up</a>
     `
    );
  } else {
    $('.home-nav').html(
      `
      <a class="navbar-brand" href="https://zidiapp.com">
          <h3 class="masthead-heading text-uppercase">
            <img src="/assets/images/logo.png" height="35px" />
          </h3>
      </a>
      `
    );

    $('.sign-in-up-navs').html(
      `
     <a class="dropdown-item text-dark" href="https://zidiapp.com/login"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign in</a>
      <a class="dropdown-item text-dark" href="https://zidiapp.com/register"><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign up</a>
     `
    );
  }
  //---------------End login, register navs update based on env

  //keep account/user profile navigation hidden by default
  $('#account-1').hide();
  $(`#${pageId}`).hide();

  let authorized = false;
  crudaction({}, '/current-user', 'GET', function (feed) {
    if (feed) {
      if (feed.success) {
        //add user & token to localstorage
        let current_loc = currentLoc();
        let user = current_loc.user;

        //console.log("SIGNED USER FOUND");
        $('#account-0').hide();
        $('#account-1').show();

        let displayPhoto = '';
        if (user.provider === 'Local' && user.photo) {
          displayPhoto = `<img src='${server_}/user/${user.photo}' style='width: 18px; border-radius: 50%;' />`;
        } else if (user.provider === 'Local' && !user.photo) {
          displayPhoto = `<span class='d-flex justify-content-center small-img'>${user.fullname[0]}</span>`;
        } else {
          displayPhoto = `<img src='${user.photo}' referrerpolicy="no-referrer" style='width: 18px; border-radius: 50%;' />`;
        }

        let displayName = '';
        if (user.provider === 'Local' || user.provider === 'Google') {
          displayName = user.fullname.trimStart().split(' ')[0];
        } else if (user.provider == 'Github') {
          displayName = user.username;
        } else if (user.provider == 'Facebook') {
          displayName += displayName;
        } else if (user.provider == 'Twitter') {
          displayName = user.fullname.trimStart().split(' ')[0];
        }
        $('#user-name').html(displayName);
        $('#user-photo').html(displayPhoto);

        authorized = true; //gives a signal to render a protected page
      } else {
        let current_loc = currentLoc();
        let user = current_loc.user;
        //console.log("NO SIGNED USER FOUND");
        $('#account-1').hide();
        $('#account-0').show();

        // this will avoid headerUpdater from destroying session details when a user sign in

        //delete user details if there exist and the session is expired
        if (current_loc.user) {
          persistence_remove('user');
        }

        //delete the session token if they exist but expired
        if (current_loc.token) {
          persistence_remove('token');
        }
      }
    } else {
      console.log(feed);
    }

    //call isAuthorized immediately after header has been updated
    //console.log("HEADER UPDATER CALLED");
    isAuthorized(pageId, authorized);
    signedUserMenu(pageId);
  });
}
// function updateHeader(pageId) {
//   //keep account/user profile navigation hidden by default
//   $("#account-1").hide();
//   $(`#${pageId}`).hide();

//   let authorized = false;
//   crudaction({}, "/current-user", "GET", function (feed) {
//     if (feed) {
//       if (feed.success) {
//         //add user & token to localstorage
//         let user = feed.user;
//         persistence("user", user);

//         console.log("SIGNED USER FOUND");
//         $("#account-0").hide();
//         $("#account-1").show();

//         let displayPhoto = "";
//         if (user.provider === "Local" && user.photo) {
//           displayPhoto = `<img src='${server_}/user/${user.photo}' style='width: 18px; border-radius: 50%;' />`;
//         } else if (user.provider === "Local" && !user.photo) {
//           displayPhoto = `<span class='d-flex justify-content-center small-img'>${user.fullname[0]}</span>`;
//         } else {
//           displayPhoto = `<img src='${user.photo}' referrerpolicy="no-referrer" style='width: 18px; border-radius: 50%;' />`;
//         }

//         let displayName = "";
//         if (user.provider === "Local" || user.provider === "Google") {
//           displayName = user.fullname.trimStart().split(" ")[0];
//         } else if (user.provider == "Github") {
//           displayName = user.username;
//         } else if (user.provider == "Facebook") {
//           displayName += displayName;
//         } else if (user.provider == "Twitter") {
//           displayName = user.fullname.trimStart().split(" ")[0];
//         }
//         $("#user-name").html(displayName);
//         $("#user-photo").html(displayPhoto);

//         authorized = true; //gives a signal to render a proteceted page
//       } else {
//         console.log("NO SIGNED USER FOUND");
//         $("#account-1").hide();
//         $("#account-0").show();
//       }
//     } else {
//       console.log(feed);
//     }

//     //call isAuthorized immediately after header has been updated
//     //console.log("HEADER UPDATER CALLED");
//     isAuthorized(pageId, authorized);
//     signedUserMenu(pageId);
//   });
// }

//used with login, register and profile pages to check if user is logged in
//for both login and register page, if user is logged in redirect to index page
//for profile page redirect user to login page
function isAuthorized(pageType, authorized) {
  $(`#${pageType}`).hide();
  if (authorized) {
    let current_loc = currentLoc();
    if (current_loc && current_loc.user) {
      if (pageType == 'secured') {
      } else {
        $(`#${pageType}`).show();
      }
    } else {
      if (pageType == 'secured') {
        $(`#${pageType}`).hide();
        gotourl('login');
      } else {
        $(`#${pageType}`).show();
      }
    }
  } else {
    if (pageType == 'secured') {
      $(`#${pageType}`).hide();
      gotourl('login');
    } else {
      $(`#${pageType}`).show();
    }
  }
}

function signedUserMenu(currentPage) {
  const current_loc = JSON.parse(localStorage.getItem('persist'));
  const menuItem = currentPage === 'index' ? 'Profile' : 'Home';

  if (current_loc && current_loc.user) {
    const user = current_loc.user;
    const { uid } = user;

    let navLink = '';
    let host = getCurrentHost();
    let origin = getCurrentUrl().origin;
    host == 'localhost'
      ? (navLink = `${origin}/zidi-app/profile?uid=${uid}`)
      : (navLink = `${origin}/profile?uid=${uid}`);

    //console.log("NAVLINK WITH USER ID => ", navLink);
    if (menuItem === 'Home') {
      navLink = 'index';
    }

    $('#dropdown-menu').html(
      `
    <a class="dropdown-item text-dark" href="${navLink}">${menuItem}</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item text-dark" href="javascript:void(0)" onclick="logout('${currentPage}')" id="sign-out">Sign out</a>
    `
    );
  }

  //console.log("SIGNED USER MENU UPDATER CALLED");
}

//passport-local login
// function login(data) {
//   //show disabled/processing button
//   disabledBtn("#loginBtn");

//   // let username = $("#emailOrUsername_input").val().trim();
//   // let password = $("#password_input").val().trim();
//   // let data = {
//   //   username,
//   //   password,
//   // };

//   //make api request
//   crudaction(data, "/login", "POST", function (feed) {
//     console.log("LOGIN FEEDBACK => ", feed);
//     if (feed) {
//       //return the initial button
//       submitBtn(
//         "#loginBtn",
//         "validateLoginForm()",
//         "Click to Sign in",
//         "Submit"
//       );
//     }

//     if (feed.status === 401) {
//       let message = "Invalid username or password";
//       errorToast(message);
//     } else if (feed["success"] === false) {
//       let message = feed["message"];
//       errorToast(message);
//     } else if (feed["success"] === true) {
//       let message = feed["message"];
//       successToast(message);

//       persistence("user", feed.user);

//       setTimeout(() => {
//         gotourl("index"); //redirect the user to index page to perform an action meant for authenticated users
//       }, 2500);
//     } else {
//       let message = "Something went wrong. Try again";
//       errorToast(message);
//     }
//   });
// }

///////-------------------End authentication

//////----------------------------Social logins strategies
//google auth trigger
// function googleAuth() {
//   let server_ = $("#server_").val();
//   window.open(`${server_}/google`, "_self");
// }

function googleOAuth(endpoint) {
  let server_ = $('#server_').val();
  window.open(`${server_}/google/${endpoint}`, '_self');
}

//github auth popup trigger
function githubOAuth(endpoint) {
  let server_ = $('#server_').val();
  window.open(`${server_}/github/${endpoint}`, '_self');
}

//facebook auth popup trigger
function facebookOAuth() {
  let server_ = $('#server_').val();
  window.open(`${server_}/facebook`, '_self');
}

//twitter auth popup trigger
function twitterOAuth() {
  let server_ = $('#server_').val();
  window.open(`${server_}/twitter`, '_self');
}

//////----------------------------End Social logins strategies

///////--------------------------------------------End Google Auth functions

/////----------------------------------------------Forgot password & reset
function forgotPwdValidateForm() {
  let email = $('#email_input').val().trim();

  // Defining error variables with a default value
  let emailErr = true;

  // Validate email address
  if (email == '') {
    printError('emailErr', 'Please enter your email address');
  } else {
    // Regular expression for basic email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      printError('emailErr', 'Please enter a valid email address');
    } else {
      printError('emailErr', '');
      emailErr = false;
    }
  }

  if (emailErr == true) {
    return false;
  } else {
    //call forgotPassword() and pass email as data to be validated on server side
    forgotPassword(email);
  }
}

function forgotPassword(email) {
  //show disabled/processing button
  disabledBtn('#forgotPwdBtn');

  // let email = $("#email_input").val().trim();
  // let jso = {
  //   email,
  // };

  crudaction({ email }, '/forgot-password', 'POST', function (feed) {
    if (feed) {
      //return the initial button
      submitBtn(
        '#forgotPwdBtn',
        'forgotPwdValidateForm()',
        'Click to request password reset link'
      );

      if (feed.success) {
        let message = feed['message'];
        successToast(message);
      } else {
        let message = feed.message;
        errorToast(message);
      }
    }
  });
}

function resetPassword() {
  //show disabled/processing button
  disabledBtn('#resetPwdBtn');

  let password = $('#password_input').val().trim();
  let cpassword = $('#cpassword_input').val().trim();

  const url_string = window.location.href;
  const url = new URL(url_string);
  const uid = url.searchParams.get('uid');
  const token = url.searchParams.get('token');

  let jso = {
    uid,
    token,
    password,
    cpassword,
  };

  crudaction(jso, '/reset-password', 'POST', function (feed) {
    //console.log("RESET PASSWORD RESPONSE => ", feed);
    if (feed) {
      //return the initial button
      submitBtn(
        '#resetPwdBtn',
        'resetPassword()',
        'Click to reset forgotten password'
      );

      if (feed.success) {
        let message = feed['message'];
        successToast(message);

        setTimeout(() => {
          gotourl('login');
        }, 2550);
      } else {
        let message = feed.message;
        if (message === 'invalid signature') {
          alert('Reset link expired. Please request new link');
          gotourl('forgot-password');
        } else {
          errorToast(message);
        }
      }
    }
  });
}

//enure password reset link is valid before rendering the page
function validatePwdResetLink() {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const uid = url.searchParams.get('uid');
  const token = url.searchParams.get('token');

  if (!uid || !token) {
    $('#reset-pass-page').html('<div></div>');
    setTimeout(() => {
      alert('Invalid Link. Please request valid password reset link');
      gotourl('forgot-password');
    }, 500);
  }
}

//to populate reset password form with dynamic user email
function populateEmail() {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const uid = url.searchParams.get('uid');

  crudaction({}, `/user?user_id=${uid}`, 'GET', function (feed) {
    if (feed) {
      const { data } = feed;
      if (data && data.email) {
        $('#user-email').html(
          `for <small style='color: #0096FF !important;'><i>${data.email}</i></small>`
        );
      }
    }
  });
}
////-----------------------------------------------End forgot password and reset

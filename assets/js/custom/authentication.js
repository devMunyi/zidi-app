///////-------------------Begin authentication
// Defining a function to display error message
function printError(elemId, hintMsg) {
  $(`#${elemId}`).html(hintMsg);
  //document.getElementById(elemId).innerHTML = hintMsg;
}

// Defining a function to validate registration form
function validateRegForm() {
  // Retrieving the values of form elements
  const username = $("#username_input").val().trim();
  const fullname = $("#fullname_input").val().trim();
  const email = $("#email_input").val().trim();
  const country = $("#country_input").val().trim();
  const password = $("#password_input").val().trim();
  const cpassword = $("#cpassword_input").val().trim();

  // Defining error variables with a default value
  let usernameErr =
    (fullnameErr =
    emailErr =
    countryErr =
    passwordErr =
    cpasswordErr =
      true);

  // Validate username
  if (username == "") {
    printError("usernameErr", "Please enter your username");
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(username) === false) {
      printError("usernameErr", "Please enter a valid username");
    } else {
      printError("usernameErr", "");
      usernameErr = false;
    }
  }

  // Validate fullname
  if (fullname == "") {
    printError("fullnameErr", "Please enter your fullname");
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(username) === false) {
      printError("fullnameErr", "Please enter a valid fullname");
    } else {
      printError("fullnameErr", "");
      fullnameErr = false;
    }
  }

  // Validate email address
  if (email == "") {
    printError("emailErr", "Please enter your email address");
  } else {
    // Regular expression for basic email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      printError("emailErr", "Please enter a valid email address");
    } else {
      printError("emailErr", "");
      emailErr = false;
    }
  }

  // Validate country
  if (country == "") {
    printError("countryErr", "Please select your country");
  } else {
    printError("countryErr", "");
    countryErr = false;
  }

  // Validate password
  if (password == "") {
    printError("passwordErr", "Please enter your password");
  } else if (password.length < 6) {
    printError("passwordErr", "Your password should be min 6 characters");
  } else {
    printError("passwordErr", "");
    passwordErr = false;
  }

  // Validate confirm password
  if (cpassword == "") {
    printError("cpasswordErr", "Please confirm your password");
  } else if (cpassword !== password) {
    printError("cpasswordErr", "Confirm password should match");
  } else {
    printError("cpasswordErr", "");
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
  disabledBtn("#regBtn");

  let user_id = 0;
  // let username = $("#username_input").val();
  // let fullname = $("#fullname_input").val();
  // let email = $("#email_input").val();
  // let country = $("#country_input").val();
  // let password = $("#password_input").val();
  // let cpassword = $("#cpassword_input").val();
  let method = "POST";
  let url = "/add-user";

  let jso = data;

  if (user_id > 0) {
    method = "PUT";
    url = "/edit-user";
    data.user_id = user_id;
    jso = {
      data,
    };
  }

  //make api request
  crudaction(jso, url, method, function (feed) {
    if (feed) {
      //return the normal button
      submitBtn("#regBtn", "validateRegForm()", "Click to register");
    }

    if (feed["success"] === false) {
      let message = feed["message"];
      errorToast(message);
    } else if (feed["success"] === true) {
      let message = feed["message"];
      successToast(message);
    }
  });
}

//logout/sign out
function logout(currentPage = "other") {
  //remove user and token from localstorage
  persistence_remove("user");
  crudaction({}, "/log-out", "GET", function (feed) {
    if (feed && feed.success) {
      if (currentPage == "index") {
        updateHeader();
      } else {
        gotourl("login");
      }
    }
  });

  //const sign_out = document.getElementById("sign-out");
  // sign_out.addEventListener(
  //   "click",
  //   function () {
  //   },
  //   false
  // );
}

//vailidate login form
function validateLoginForm() {
  // Retrieving the values of form elements
  const username = $("#emailOrUsername_input").val().trim();
  const password = $("#password_input").val().trim();

  // Defining error variables with a default value
  let usernameErr = (passwordErr = true);

  // var regex = /^\S+@\S+\.\S+$/;
  // Validate username
  if (username == "") {
    printError("usernameErr", "Please enter your username");
  } else {
    var regex = /^[a-zA-Z0-9.@\s]+$/;
    if (regex.test(username) === false) {
      printError("usernameErr", "Please enter a valid username");
    } else {
      printError("usernameErr", "");
      usernameErr = false;
    }
  }

  // Validate password
  if (password == "") {
    printError("passwordErr", "Please enter your password");
  } else if (password.length < 6) {
    printError("passwordErr", "Your password should be min 6 characters");
  } else {
    printError("passwordErr", "");
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

//passport-local login
function login(data) {
  //show disabled/processing button
  disabledBtn("#loginBtn");

  // let username = $("#emailOrUsername_input").val().trim();
  // let password = $("#password_input").val().trim();
  // let data = {
  //   username,
  //   password,
  // };

  //make api request
  crudaction(data, "/login", "POST", function (feed) {
    console.log("LOGIN FEEDBACK => ", feed);
    if (feed) {
      //return the initial button
      submitBtn(
        "#loginBtn",
        "validateLoginForm()",
        "Click to Sign in",
        "Submit"
      );
    }

    if (feed.status === 401) {
      let message = "Invalid username or password";
      errorToast(message);
    } else if (feed["success"] === false) {
      let message = feed["message"];
      errorToast(message);
    } else if (feed["success"] === true) {
      let message = feed["message"];
      successToast(message);

      persistence("user", feed.user);

      setTimeout(() => {
        gotourl("index"); //redirect the user to index page to perform an action meant for authenticated users
      }, 2500);
    } else {
      let message = "Something went wrong. Try again";
      errorToast(message);
    }
  });
}

///////-------------------End authentication

//////----------------------------Social logins strategies
//google auth trigger
function googleAuth() {
  let server_ = $("#server_").val();
  window.open(`${server_}/google`, "_self");
}

//github auth trigger
function githubAuth() {
  let server_ = $("#server_").val();
  window.open(`${server_}/github`, "_self");
}

//facebook auth trigger
function facebookAuth() {
  let server_ = $("#server_").val();
  window.open(`${server_}/facebook`, "_self");
}

//facebook auth trigger
function twitterAuth() {
  let server_ = $("#server_").val();
  window.open(`${server_}/twitter`, "_self");
}

//////----------------------------End Social logins strategies

//verify logged-in user by sending cookie token/session id to server side
function updateHeader(pageId) {
  //keep account/user profile navigation hidden by default
  $("#account-1").hide();
  $(`#${pageId}`).hide();

  let server_ = $("#server_").val();
  let authorized = false;
  crudaction({}, "/logged-in", "GET", function (feed) {
    if (feed) {
      if (feed.success) {
        //add user & token to localstorage
        let user = feed.user;
        persistence("user", user);
        console.log("SIGNED USER FOUND");
        $("#account-0").hide();
        $("#account-1").show();

        let displayPhoto = "";
        if (user.provider === "Local" && user.photo) {
          displayPhoto = `<img src='${server_}/user/${user.photo}' style='width: 18px; border-radius: 50%;' />`;
        } else if (user.provider === "Local" && !user.photo) {
          displayPhoto = `<span class='d-flex justify-content-center small-img'>${user.fullname[0]}</span>`;
        } else {
          displayPhoto = `<img src='${user.photo}' referrerpolicy="no-referrer" style='width: 18px; border-radius: 50%;' />`;
        }

        let displayName = "";
        if (user.provider === "Local" || user.provider === "Google") {
          displayName = user.fullname.trimStart().split(" ")[0];
        } else if (user.provider == "Github") {
          displayName = user.username;
        } else if (user.provider == "Facebook") {
          displayName += displayName;
        } else if (user.provider == "Twitter") {
          displayName = user.fullname.trimStart().split(" ")[0];
        }
        $("#user-name").html(displayName);
        $("#user-photo").html(displayPhoto);

        authorized = true; //gives a signal to render a proteceted page
      } else {
        console.log("NO SIGNED USER FOUND");
        $("#account-1").hide();
        $("#account-0").show();
      }
    } else {
      console.log(feed);
    }

    //call isAuthorized immediately after header has been updated
    console.log("HEADER UPDATER CALLED");
    isAuthorized(pageId, authorized);
    signedUserMenu(pageId);
  });
}

//used with login, register and profile pages to check if user is logged in
//for both login and register page, if user is logged in redirect to index page
//for profile page redirect user to login page
function isAuthorized(pageId, authorized) {
  $(`#${pageId}`).hide();
  if (authorized) {
    let current_loc = JSON.parse(localStorage.getItem("persist"));
    if (current_loc && current_loc.user) {
      if (
        pageId !== "profile-page" &&
        pageId !== "addeditcode-page" &&
        pageId !== "index"
      ) {
        gotourl("index");
      } else {
        $(`#${pageId}`).show();
      }
    } else {
      if (pageId === "profile-page" || pageId === "addeditcode-page") {
        $(`#${pageId}`).hide();
        gotourl("login");
      } else {
        $(`#${pageId}`).show();
      }
    }
  } else {
    if (pageId === "profile-page" || pageId === "addeditcode-page") {
      $(`#${pageId}`).hide();
      gotourl("login");
    } else {
      $(`#${pageId}`).show();
    }
  }

  console.log("AUTH CHECKER CALLED");
  // crudaction({}, "/logged-in", "GET", function (feed) {
  //   if (feed && feed.success) {
  //     if (currentPage !== "profile" && currentPage !== "addeditcode") {
  //       gotourl("index");
  //     } else {
  //       $(`#${htmlId}`).show();
  //     }
  //   } else {
  //     if (currentPage === "profile" || currentPage === "addeditcode") {
  //       $(`#${htmlId}`).hide();
  //       gotourl("login");
  //     } else {
  //       $(`#${htmlId}`).show();
  //     }
  //   }
  // });
}

///////--------------------------------------------End Google Auth functions

/////----------------------------------------------Forgot password & reset
function forgotPwdValidateForm() {
  let email = $("#email_input").val().trim();

  // Defining error variables with a default value
  let emailErr = true;

  // Validate email address
  if (email == "") {
    printError("emailErr", "Please enter your email address");
  } else {
    // Regular expression for basic email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      printError("emailErr", "Please enter a valid email address");
    } else {
      printError("emailErr", "");
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
  disabledBtn("#forgotPwdBtn");

  // let email = $("#email_input").val().trim();
  // let jso = {
  //   email,
  // };

  crudaction({ email }, "/forgot-password", "POST", function (feed) {
    if (feed) {
      //return the initial button
      submitBtn(
        "#forgotPwdBtn",
        "forgotPwdValidateForm()",
        "Click to request password reset link"
      );

      if (feed.success) {
        let message = feed["message"];
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
  disabledBtn("#resetPwdBtn");

  let password = $("#password_input").val().trim();
  let cpassword = $("#cpassword_input").val().trim();

  const url_string = window.location.href;
  const url = new URL(url_string);
  const uid = url.searchParams.get("uid");
  const token = url.searchParams.get("token");

  // console.log("URL =>", url);
  // console.log("User id =>", uid);
  // console.log("Token =>", token);

  let jso = {
    uid,
    token,
    password,
    cpassword,
  };

  crudaction(jso, "/reset-password", "POST", function (feed) {
    //console.log("RESET PASSWORD RESPONSE => ", feed);
    if (feed) {
      //return the initial button
      submitBtn(
        "#resetPwdBtn",
        "resetPassword()",
        "Click to reset forgotten password"
      );

      if (feed.success) {
        let message = feed["message"];
        successToast(message);

        setTimeout(() => {
          gotourl("login");
        }, 2550);
      } else {
        let message = feed.message;
        if (message === "invalid signature") {
          alert("Reset link expired. Please request new link");
          gotourl("forgot-password");
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
  const uid = url.searchParams.get("uid");
  const token = url.searchParams.get("token");

  if (!uid || !token) {
    $("#reset-pass-page").html("<div></div>");
    setTimeout(() => {
      alert("Invalid Link. Please request valid password reset link");
      gotourl("forgot-password");
    }, 500);
  }
}

//to populate reset password form with dynamic user email
function populateEmail() {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const uid = url.searchParams.get("uid");

  crudaction({}, `/user?user_id=${uid}`, "GET", function (feed) {
    if (feed) {
      const { data } = feed;
      if (data && data.email) {
        $("#user-email").html(
          `for <small style='color: #0096FF !important;'><i>${data.email}</i></small>`
        );
      }
    }
  });
}
////-----------------------------------------------End forgot password and reset

///////-------------------Begin authentication
function register() {
  //show disabled/processing button
  disabledBtn("#regBtn");

  let user_id = 0;
  let username = $("#username_input").val();
  let fullname = $("#fullname_input").val();
  let email = $("#email_input").val();
  let country = $("#country_input").val();
  let password = $("#password_input").val();
  let cpassword = $("#cpassword_input").val();
  let method = "POST";
  let url = "/add-user";

  let jso = {
    username,
    fullname,
    email,
    country,
    password,
    cpassword,
  };

  if (user_id > 0) {
    method = "PUT";
    url = "/edit-user";
    jso = {
      username,
      fullname,
      email,
      country,
      password,
      cpassword,
      user_id,
    };
  }

  //make api request
  crudaction(jso, url, method, function (feed) {
    if (feed) {
      //return the normal button
      submitBtn("#regBtn", "register()", "Click to register");
    }

    if (feed["success"] === false) {
      let message = feed["message"];
      var Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2500,
        padding: "0.85rem",
      });

      Toast.fire({
        icon: "error",
        title: message,
        color: "white",
      });
    } else if (feed["success"] === true) {
      let message = feed["message"];
      var Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2500,
        padding: "0.85rem",
      });

      Toast.fire({
        icon: "success",
        title: message,
      });
    }
  });
}

function login() {
  //show disabled/processing button
  disabledBtn("#loginBtn");

  let emailOrUsername = $("#emailOrUsername_input").val().trim();
  let password = $("#password_input").val().trim();
  let method = "POST";
  let url = "/user/login";

  let jso = {
    emailOrUsername,
    password,
  };

  //make api request
  crudaction(jso, url, method, function (feed) {
    if (feed) {
      //return the normal button
      submitBtn("#loginBtn", "login()", "Click to login");
    }

    if (feed["success"] === false) {
      let message = feed["message"];
      var Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2500,
        padding: "0.85rem",
      });

      Toast.fire({
        icon: "error",
        title: message,
        color: "white",
      });
    } else if (feed["success"] === true) {
      let message = feed["message"];
      var Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2500,
        padding: "0.85rem",
      });

      Toast.fire({
        icon: "success",
        title: message,
      });

      //add user & token to localstorage
      persistence("token", feed.token);
      persistence("user", feed.user);

      setTimeout(() => {
        gotourl("index"); //redirect the user to index page to perform an action meant for authenticated users
      }, 2500);
    }
  });
}

///////-------------------End authentication

//////----------------------------Google auth functions

function onSuccess(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  crudaction(
    {
      token: id_token,
    },
    "/google/signin",
    "POST",
    function (feed) {
      // console.log("FEEDBACK =>", feed);
      if (feed["success"] === false) {
        let message = feed["message"];
        var Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2500,
          padding: "0.85rem",
        });

        Toast.fire({
          icon: "error",
          title: message,
          color: "white",
        });
      } else if (feed["success"] === true) {
        let message = feed["message"];
        var Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2500,
          padding: "0.85rem",
        });

        Toast.fire({
          icon: "success",
          title: message,
        });

        //add user & token to localstorage
        persistence("token", feed.token);
        persistence("user", feed.user);

        setTimeout(() => {
          signOut(); //sign out user from his google account
          gotourl("index"); //redirect the user to index page to perform an action meant for authenticated users
        }, 2000);
      }
    }
  );
}

function onFailure(error) {
  console.log(error);
  let message = "Sign in with Google Failed. Try again";
  var Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    padding: "0.85rem",
  });

  Toast.fire({
    icon: "error",
    title: message,
    color: "white",
  });
}

function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
    width: "inherit",
    height: 40,
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

///////----------------------------End Google Auth functions

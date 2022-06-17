//reusable function to make api calls to the server side
function crudaction(jsonbody, url, method = "POST", callback) {
  let server_ = $("#server_").val();
  let cleanJson = JSON.stringify(jsonbody);
  let token;
  let current_loc = currentLoc();
  if (current_loc && current_loc.token) {
    token = current_loc.token;
  }

  $.ajax({
    url: server_ + url,
    type: method,
    timeout: 0,
    xhrFields: { withCredentials: true },
    headers: {
      Authorization: token,
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    data: cleanJson,
    beforeSend: function () {
      // console.log("AJAX BEFORESEND ZONE");
      $("#processing").show();
    },

    complete: function () {
      // console.log("AJAX COMPLETE ZONE");
      $("#processing").hide();
    },
    success: function (feedback) {
      // console.log("AJAX SUCCESS ZONE");
      callback(feedback);
    },
    error: function (err) {
      // console.log("AJAX ERROR ZONE");
      // console.log("ERROR => ", err);
      callback(err);
    },
  });
}

//home/index page navigator
function index() {
  gotourl("index");
}

//loading spinner
function showLoader(htmlId) {
  $(htmlId).html(
    '<div class="row pt-5 pb-5">' +
      '<div class="col-md-6 d-flex justify-content-center align-items-center">' +
      '<div class="spinner-border" role="status">' +
      '<span class="sr-only">Loading...</span>' +
      "</div>" +
      "</div>" +
      "</div>"
  );
}

//spinner
function codeLoading(id) {
  $(id).html(
    '<div class="spinner-border" role="status">\n' +
      '<span class="sr-only">Loading...</span>\n' +
      "</div>"
  );
}

//dynamic button to be initialized in forms
function submitBtn(
  targetBtnId,
  func_,
  title = "Click to submit",
  label = "Submit"
) {
  $(targetBtnId).html(
    `<button type='submit' title='${title}'
      onclick='${func_}' class='btn btn-success'>${label}
    </button>`
  );
}

// function submitBtn2() {
//   $(".submitbtn").html(
//     '<button type="submit" class="btn btn-success">Submit </button>'
//   );
// }

//dynamic button that replace intial button in a form to showing processing ongoing
function disabledBtn(htmlId) {
  $(htmlId).html(
    '<button class="btn btn-success" type="button" disabled>' +
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' +
      "processing..." +
      "</button>"
  );
}

//Footer date initializer
function footer_date() {
  const d = new Date();
  let year = d.getFullYear();
  $("#footer-date").html(year);
}

//resusable success toast notification
function successToast(message) {
  // var Toast = Swal.mixin({
  //   toast: true,
  //   position: "top",
  //   showConfirmButton: false,
  //   timer: 2500,
  //   padding: "0.85rem",
  // });

  // Toast.fire({
  //   icon: "success",
  //   title: message,
  //   color: white,
  // });

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center", //toast-top-center, toast-top-left, toast-top-right
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2500",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr.success(message);
}

//reusable failure toast notification
function errorToast(message) {
  // var Toast = Swal.mixin({
  //   toast: true,
  //   position: "top",
  //   showConfirmButton: false,
  //   timer: 2500,
  //   padding: "0.85rem",
  // });

  // Toast.fire({
  //   icon: "error",
  //   title: message,
  //   color: "white",
  // });

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center", //toast-top-center, toast-top-left, toast-top-right
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2500",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr.error(message);
}

//function and subfunction menu toggler
function submenu(id) {
  $(id).toggle();
}

//reusable redirect function
function gotourl(url) {
  window.location.href = url;
}

//persist fetched data in browser local storage for later user
function persistence(k, val) {
  if (localStorage.getItem("persist")) {
    let current_loc = currentLoc();
    current_loc[k] = val;
    //console.log(JSON.stringify(current_loc));
    localStorage.setItem("persist", JSON.stringify(current_loc));
  } else {
    let current_loc = {};
    current_loc[k] = val;
    //console.log(val);
    localStorage.setItem("persist", JSON.stringify(current_loc));
  }
}

//deletes particular data stored in localstorage by referencing key
function persistence_remove(k) {
  if (localStorage.getItem("persist")) {
    let current_loc = currentLoc();
    delete current_loc[k];
    localStorage.setItem("persist", JSON.stringify(current_loc));
  }
}

//Search term white space trimming function
function trimString(str) {
  var i = 0;
  strlen = str.length - 1;
  while (i < str.length && str[i] == " ") i++;
  while (strlen > i && str[strlen] == " ") strlen -= 1;
  var strResult = str.substring(i, strlen + 1);
  return strResult.toLowerCase();
}

function compareObjects(obj1, obj2) {
  var k;
  for (k in obj1) if (obj1[k] != obj2[k]) return false;
  for (k in obj2) if (obj1[k] != obj2[k]) return false;
  return true;
}

function itemExists(haystack, needle) {
  for (var i = 0; i < haystack.length; i++)
    if (compareObjects(haystack[i], needle)) return true;
  return false;
}

function searchFor(objects, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  var results = [];
  for (var i = 0; i < objects.length; i++) {
    for (var key in objects[i]) {
      if (objects[i][key].toString().indexOf(searchTerm) != -1) {
        if (!itemExists(results, objects[i])) results.push(objects[i]);
      }
    }
  }
  return results;
}

function search() {
  let search_ = $("#search_functionality").val().trim();
  if (search_) {
    $("#search_functionality").val(search_);
    //insert a default value for the offset
    persistence("offset", 0);

    //call load snippet function
    eval("load_codeSnippet()");
  } else {
    pager_home();
  }
}

function pager_home() {
  let current_loc = currentLoc();
  if (current_loc.func) {
    persistence_remove("func");
  }
  if (current_loc.subfunc) {
    persistence_remove("subfunc");
  }

  if (current_loc.language) {
    persistence_remove("language");
  }

  if (current_loc.framework) {
    persistence_remove("framework");
  }

  //insert a default value for the offset
  persistence("offset", 0);

  //call the function to return default page
  eval("load_codeSnippet()");
}

//check for persisted data
function currentLoc() {
  let current_loc = JSON.parse(localStorage.getItem("persist"));
  if (current_loc) {
    return current_loc;
  } else {
    return false;
  }
}

function hyphenateSentence(str) {
  return str.replace(/ /gi, "-");
}

///////--------------End common reusable functions

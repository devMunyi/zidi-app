////////---------------Begin common reusable functions
/* function crudaction(jsonbody, url, method = "POST", callback) {
  ////////------Reusable
  let server = $("#server_").val();
  console.log("SERVER =>", server);
  let auth = $("#auth").val();

  //////Clean the JSON string

  let cleanJson = JSON.stringify(jsonbody);

  $.ajax({
    url: server + url,
    method: method,
    dataType: "json",
    timeout: 0,
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    data: cleanJson,

    success: function (result) {
      callback(result);
    },
    beforeSend: function () {
      // Handle the beforeSend event
      $("#loader").fadeIn();
    },
    error: function (err) {
      console.log("An Error" + err);
      // feedback("ERROR", "TOAST", ".feedback_", err, 10);
      callback(JSON.stringify(err));
    },
    complete: function () {
      // Handle the complete event
      $("#loader").fadeOut();
    },
  });
} */

function crudaction(jsonbody, url, method = "POST", callback) {
  let server_ = $("#server_").val();
  console.log("SERVER => ", server_);
  let cleanJson = JSON.stringify(jsonbody);
  $.ajax({
    url: server_ + url,
    type: method,
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
    data: cleanJson,
    beforeSend: function () {
      $("#processing").show();
    },

    complete: function () {
      $("#processing").hide();
    },
    success: function (feedback) {
      callback(feedback);
    },
    cache: false,
    contentType: false,
    processData: false,
    error: function (err) {
      callback(err);
    },
  });
}

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

function codeLoading(id) {
  $(id).html(
    '<div class="spinner-border" role="status">\n' +
      '<span class="sr-only">Loading...</span>\n' +
      "</div>"
  );
}

function submitBtn(targetBtnId, func_, title = "Click to submit") {
  $(targetBtnId).html(
    '<button type="submit" title="' +
      title +
      '"  onclick="' +
      func_ +
      '" class="btn btn-success">Submit </button>'
  );
}

function submitBtn2() {
  $(".submitbtn").html(
    '<button type="submit" class="btn btn-success">Submit </button>'
  );
}

function disabledBtn(htmlId) {
  $(htmlId).html(
    '<button class="btn btn-success" type="button" disabled>' +
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' +
      "submitting..." +
      "</button>"
  );
}

function footer_date() {
  const d = new Date();
  let year = d.getFullYear();
  $("#footer-date").html(year);
}

function submenu(id) {
  $(id).toggle();
}

function gotourl(url) {
  window.location.href = url;
}

function persistence(k, val) {
  if (localStorage.getItem("persist")) {
    let current_loc = JSON.parse(localStorage.getItem("persist"));
    current_loc[k] = val;
    console.log(JSON.stringify(current_loc));
    localStorage.setItem("persist", JSON.stringify(current_loc));
  } else {
    let current_loc = {};
    current_loc[k] = val;
    console.log(val);
    localStorage.setItem("persist", JSON.stringify(current_loc));
  }
}

function persistence_remove(k) {
  if (localStorage.getItem("persist")) {
    let current_loc = JSON.parse(localStorage.getItem("persist"));
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

///////--------------End common reusable functions

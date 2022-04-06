////////--------------- footer date
function footer_date() {
  const d = new Date();
  let year = d.getFullYear();
  $("#footer-date").html(year);
}

///////--------------End footer date

////////-------------Begin Helper/Reusable functions

function crudaction(jsonbody, url, method = "POST", callback) {
  ////////------Reusable
  let server = $("#server_").val();
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

//////----------------End of Helper/Reusable functions

///////////-------Begin Environments/platforms
function load_environments(offset, rpp) {
  let status = 1;
  let orderby = "name";
  let dir = "ASC";

  let jso = {};

  let query =
    "?status=" +
    status +
    "&orderby=" +
    orderby +
    "&dir=" +
    dir +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp;

  crudaction(jso, "/platforms" + query, "GET", function (result) {
    ////////--------Result should look something like this
    //////   {\"result_\":$result_,\"details_\":$details_,\"total_\":$totalcount}
    //////---------$details is a a JSON representation of multiple MYSQL Rows
    let server = $("#server_").val();
    console.log("Environments" + result);
    //let json_ = JSON.parse(result).details_;
    //let total_ = JSON.parse(result).length;
    let data = result["data"];
    let total = data.length;
    let fun = "";

    if (total > 0) {
      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].name;
        let icon = data[i].icon;
        fun +=
          '<li class="env hover-env"><a onclick="envIdParser(' +
          uid +
          ')"><img src="' +
          server +
          "/" +
          icon +
          '" width="24px" height="24px"><br>' +
          "</a></li>";
      }
      $("#environments_").html(fun);
    } else {
      //////-------No Languages found
      $("#environments_").html("<li>No Environments Loaded.</li>");
    }
  });
}

function envIdParser(env_id_) {
  let env_id = parseInt(env_id_);
  if (env_id > 0) {
  } else {
    env_id = 0;
  }
  $("#sel_env").val(env_id);
  load_codeSnippet();
}
/////------End Environments

///////////-------Begin Functionalities
function apiFunLoad(offset = 0, rpp = 100) {
  let status = 1;
  let orderby = "name";
  let dir = "ASC";

  let jso = {};
  //let fun = "";
  let search_ = "";

  let query =
    "?status=" +
    status +
    "&orderby=" +
    orderby +
    "&dir=" +
    dir +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp +
    "&search=" +
    search_;

  crudaction(jso, "/functionalities" + query, "GET", function (result) {
    let data = result["data"];
    let data_length = data.length;
    let fun = "";

    if (data_length > 0) {
      for (let i = 0; i < data_length; i++) {
        let function_id = data[i].uid;
        let function_name = data[i].name;
        let function_icon = data[i].icon;

        fun +=
          "<li>\n" +
          '       <a href="javascript:void(0)" class="has-arrow arrow-b"><i><img src="assets/images/functionalities/' +
          function_icon +
          '" width="15" height="18"></i><span data-hover="' +
          function_name +
          '">' +
          function_name +
          "</span><a>\n" +
          '       <ul id="subfun' +
          function_id +
          '">\n' +
          "       </ul>\n" +
          "</li>";
      }
      $("#functionalities_").html(fun);
      apiSubfunLoad();
    } else {
      //////-------No functionalities found
      $("#functionalities_").html("<li>No functionalities Loaded.</li>");
    }

    //Storing in hidden fields
    let data_ = JSON.stringify(data);
    $("#funcs_").val(data_);

    //creating a local storage
    if (typeof Storage !== "undefined") {
      localStorage.setItem("funcs", JSON.stringify(data));
      console.log(localStorage);
    } else {
      console.log("Browser not supported");
    }
  });
}

function localFunLoad() {
  let funobjs = JSON.parse(localStorage.getItem("funcs")); //getting functionality objects from browser localStorage
  //let funobjs = JSON.parse($("#funcs_").val()); //getting functionality objects from hidden field
  //console.log("Hidden Field Testing : " + funobjs);
  let search_term = $("#search_functionality").val();
  let trimmed_search = trimString(search_term); // trim it
  let searched_data = searchFor(funobjs, trimmed_search);
  let fun = "";

  if (trimmed_search.length > 0) {
    let funcs_len = searched_data.length;
    if (funcs_len > 0) {
      for (let i = 0; i < searched_data.length; i++) {
        let function_id = searched_data[i].uid;
        let function_name = searched_data[i].name;
        let function_icon = searched_data[i].icon;

        fun +=
          "<li>\n" +
          '       <a href="javascript:void(0)" class="has-arrow arrow-b"><i><img src="assets/images/functionalities/' +
          function_icon +
          '" width="15" height="18"></i><span data-hover="' +
          function_name +
          '">' +
          function_name +
          "</span><a>\n" +
          '       <ul id="subfun' +
          function_id +
          '">\n' +
          "       </ul>\n" +
          "</li>";
      }
      $("#functionalities_").html(fun);
      localSubfunLoad();
    } else {
      //////-------No functionalities found
      $("#functionalities_").html("<li>No functionalities Loaded.</li>");
    }
  } else {
    let objsCount = funobjs.length;
    let fun = "";

    if (objsCount > 0) {
      for (let i = 0; i < objsCount; i++) {
        let function_id = funobjs[i].uid;
        let function_name = funobjs[i].name;
        let function_icon = funobjs[i].icon;

        fun +=
          "<li>\n" +
          '       <a href="javascript:void(0)" class="has-arrow arrow-b"><i><img src="assets/images/functionalities/' +
          function_icon +
          '" width="15" height="18"></i><span data-hover="' +
          function_name +
          '">' +
          function_name +
          "</span><a>\n" +
          '       <ul id="subfun' +
          function_id +
          '">\n' +
          "       </ul>\n" +
          "</li>";
      }
      $("#functionalities_").html(fun);
      localSubfunLoad();
    } else {
      //////-------No functionalities found
      $("#functionalities_").html("<li>No functionalities Loaded.</li>");
    }
  }
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
/*
function checkLocalField(){
  if(($("#funcs_").val() != "0") && ($("#subfuncs_").val() != "0")){
    localFunLoad();
  }else{
    apiFunLoad();
  }
}
*/

function checkLocalStorage() {
  if (
    JSON.parse(localStorage.getItem("funcs")) &&
    JSON.parse(localStorage.getItem("subfuncs"))
  ) {
    localFunLoad();
  } else {
    apiFunLoad();
  }
}

/////------End Functionalities

/////------Begin subFunctionalities
function apiSubfunLoad(callback) {
  let jso = {};
  let status = 1;
  let orderby = "name";
  let dir = "ASC";
  let query = "?status=" + status + "&orderby=" + orderby + "&dir=" + dir;

  crudaction(jso, "/subFunctionalities" + query, "GET", function (result) {
    callback(result);
    //console.log(result);
  });
}

function localSubfunLoad() {
  let subfunobjs = JSON.parse(localStorage.getItem("subfuncs")); //getting subfunction objects from browser localStorage
  //let subfunobjs = JSON.parse($("#subfuncs_").val()); //getting subfunction objects from hidden field
  let subfun = "";

  let data_length = subfunobjs.length;
  if (data_length > 0) {
    for (let i = 0; i < data_length; i++) {
      let subfunction_id = subfunobjs[i].uid;
      let subfunction_name = subfunobjs[i].name;
      let function_id = subfunobjs[i].func_id;
      (subfun +=
        "<li>\n" +
        '       <a href="#" onclick="load_implementations(' +
        function_id),
        subfunction_id +
          ')"><span data-hover="' +
          subfunction_id +
          '">' +
          subfunction_name +
          "</span></a>\n" +
          "</li>";

      $("#subfun" + function_id + "").append(subfun);
    }
  } else {
    //$("#subfun").html("<li>No subfunctions Loaded.</li>");
  }
}

/////------End subFunctionalities

//////------Begin Languages
function load_languages() {
  let where_ = "status = 1";
  let dir = "ASC";
  let orderby = "name";
  let offset = 0;
  let rpp = 40;

  let jso = {};

  let query =
    "?where_=" +
    where_ +
    "&orderby=" +
    orderby +
    "&dir=" +
    dir +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp;

  crudaction(jso, "/languages" + query, "GET", function (result) {
    let server = $("#server_").val();
    ////////--------Result should look something like this
    //////   {\"result_\":$result_,\"details_\":$details_,\"total_\":$totalcount}
    //////---------$details is a a JSON representation of multiple MYSQL Rows

    //let json_ = JSON.parse(result).details_;
    let data = result["data"];
    let total_ = data.length;
    //console.log(total_);
    let lang = "";

    if (total_ > 0) {
      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].name;
        var icon = data[i].icon;

        lang +=
          '<li class="hover-lang"><a href="#" onclick="load_frameworks(' +
          uid +
          "); persistence_remove('framework') ; persistence('language','" +
          uid +
          '\')"><img src="' +
          server +
          "/" +
          icon +
          '" height="20px">   ' +
          title +
          "</a></li>";
      }
      $("#language_").html(lang);
    } else {
      //////-------No Languages found
      $("#language_").html("<li>No Languages</li>");
    }
  });
}

function submenu(id) {
  $(id).toggle();
}

function functions_load() {
  ////-----
  let status = 1;
  let orderby = "name";
  let dir = "ASC";
  let jso = {};
  let search_ = "";
  let server = $("#server_").val();

  let query =
    "?status=" +
    status +
    "&orderby=" +
    orderby +
    "&dir=" +
    dir +
    "&offset=" +
    0 +
    "&rpp=" +
    500 +
    "&search=" +
    search_;

  crudaction(jso, "/functionalities" + query, "GET", function (result) {
    let data = result["data"];
    let data_length = data.length;
    let fun = "";

    if (data_length > 0) {
      //////////--------Lets Pull All sub functions at the same time
      apiSubfunLoad(function (sub_result) {
        //////////-----Loop functions while injecting subfunctions
        let fun = "";
        for (let i = 0; i < data_length; i++) {
          let function_id = data[i].uid;
          let function_name = data[i].name;
          let function_icon = data[i].icon;
          fun +=
            "<li class='outer_list'> <a href=\"#\" onclick=\"submenu('#fun" +
            function_id +
            "'); persistence_remove('subfunc'); persistence('func','" +
            function_id +
            '\')" class="has-arrow arrow-b"><img class="icon" src="' +
            server +
            "/" +
            function_icon +
            '"></img><span data-hover="' +
            function_name +
            '">' +
            function_name +
            "</span></a>";
          /////------Loop through sub functions
          let sub_data = sub_result["data"];
          let sub_data_length = sub_data.length;

          if (sub_data_length > 0) {
            fun +=
              "<ul style='display: none;' class='inner_list' id=\"fun" +
              function_id +
              '">';

            for (let s = 0; s < sub_data_length; s++) {
              let funct_id = sub_data[s].function_id;

              if (function_id === funct_id) {
                let subfunction_id = sub_data[s].uid;
                let subfunction_name = sub_data[s].name;
                //console.log("ddjddj"+subfunction_id);

                fun +=
                  '<li><a href="#" onclick="subfun(\'#fun' +
                  function_id +
                  "'); persistence('subfunc','" +
                  subfunction_id +
                  '\')"><span data-hover="' +
                  subfunction_name +
                  '">' +
                  subfunction_name +
                  "</span></a></li>";
              }
            }
            fun += "</ul>";
          }
          fun += "</li>";
        }
        $("#functions_").html(fun);
      });
    }
  });
}

function subfun() {}

//////---------------------End Languages

//////------Begin framework
function load_frameworks(language_id_ = 0) {
  offset = 0;
  rpp = 100;
  let where_ = "f.status = 1";
  let orderby = "f.name";
  let dir = "ASC";

  let query =
    "?where_=" +
    where_ +
    "&orderby=" +
    orderby +
    "&dir=" +
    dir +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp;

  let language_id = parseInt(language_id_);
  //parse a hidden language to use the value in the load code snippet function
  $("#sel_language").val(language_id);

  if (language_id && language_id > 0) {
    query =
      "?language_id=" +
      language_id +
      "&where_=" +
      where_ +
      "&orderby=" +
      orderby +
      "&dir=" +
      dir +
      "&offset=" +
      offset +
      "&rpp=" +
      rpp;
  }

  let jso = {};

  console.log(query);

  crudaction(jso, "/frameworks" + query, "GET", function (result) {
    //let json_ = JSON.parse(result).details_;
    let server = $("#server_").val();
    let data = result["data"];
    let total_ = data.length;
    console.log("frameworks =>", total_);
    let frm = "";
    //$("#sel_framework").html("");

    if (total_ > 0) {
      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].name;
        var icon = data[i].icon;
        frm +=
          '<option value="' +
          uid +
          '"><img src="' +
          server +
          icon +
          '" height="20px" width="20px">  ' +
          title +
          "</option>";
      }
      //$("#sel_framework").html("");
      $("#sel_framework").html(frm);
      //load to code snippet based on id parsed to the load framework function which is called on clicking language list
      load_codeSnippet();
    } else {
      //////-------No Frameworks found
      $("#sel_framework").html("<option >No frameworks.</option>");
      load_codeSnippet();
    }
  });
}

//////---------------------End frameworks

//////------Begin implementation
function load_implementations() {
  let offset = 0;
  let rpp = 25;
  let where_ = "status = 1";
  let orderby_ = "uid";
  let dir_ = "ASC";

  /*  let sel_func = fun_id;
  let sel_subfunc = subfun_id;

  if (!sel_func) {
    sel_func = 1;
  }

  if (!sel_subfunc) {
    sel_subfunc = 1;
  } */

  let jso = {};

  var query =
    "?where_=" +
    where_ +
    "&orderby=" +
    orderby_ +
    "&dir=" +
    dir_ +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp;

  //console.log(query);

  crudaction(jso, "/implementations" + query, "GET", function (result) {
    ////////--------Result should look something like this
    //////   {\"result_\":$result_,\"details_\":$details_,\"total_\":$totalcount}
    //////---------$details is a a JSON representation of multiple MYSQL Rows

    //let json_ = JSON.parse(result).details_;
    let data = result["data"];
    let total_ = data.length;
    //console.log(total_);
    let impl = "";

    if (total_ > 0) {
      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].title;
        impl += '<option value="' + uid + '">' + title + "</option>";
      }
      $("#sel_implementation").html(impl);
      load_codeSnippet();
    } else {
      //////-------No implementation found
      $("#sel_implementation").html("<option>No implementation</option>");
      load_codeSnippet();
    }
  });
}

//////---------------------End implementation

//////------Begin codeSnippet
function load_codeSnippet() {
  let current_loc = JSON.parse(localStorage.getItem("persist"));
  /* console.log("persist values from load codesnippet function =>", current_loc);
  console.log("func =>", current_loc.func);
  console.log("subfunc =>", current_loc.subfunc);
  console.log("language =>", current_loc.language);
  console.log("framework =>", current_loc.framework);
  console.log("implementation =>", current_loc.implementation);
 */
  let sel_func = current_loc.func;
  let sel_subfunc = current_loc.subfunc;
  let sel_language = current_loc.language;
  let sel_framework = parseInt($("#sel_framework").val());
  let sel_implementation = parseInt($("#sel_implementation").val());
  let offset = parseInt($("#code-version").val());
  //console.log("OFFSET =>", offset);
  let rpp = 1;

  if (!sel_func) {
    sel_func = 1;
  } else {
    persistence("func", sel_func);
  }

  if (!sel_subfunc) {
    sel_subfunc = 1;
  } else {
    persistence("subfunc", sel_subfunc);
  }

  if (!sel_language) {
    sel_language = 1;
  } else {
    persistence("language", sel_language);
  }

  if (!sel_framework) {
    sel_framework = 0;
  } else {
    persistence("framework", sel_framework);
  }

  if (!sel_implementation) {
    sel_implementation = 0;
  } else {
    persistence("implementation", sel_implementation);
  }

  let codeEditor = ace.edit("editor");
  let editorLib = {
    init() {
      //Configure Ace
      codeEditor.setTheme("ace/theme/monokai");

      //Set Languages
      codeEditor.session.setMode("ace/mode/javascript");
      codeEditor.session.setMode("ace/mode/java");
      //codeEditor.session.setMode("ace/mode.html");
      //codeEditor.session.setMode("ace/mode/php");
      //Set Options
      codeEditor.setOptions({
        //fontFamily: 'Inconsolata'
        fontSize: "12pt",
        //enableBasicAutocompletion: true,
        //enableLiveAutocompletion: true
      });

      //Set default code

      let where_ = "c.status = 1";
      let orderby = "c.uid";
      let dir = "DESC";

      let jso = {};

      let query =
        "?where_=" +
        where_ +
        "&orderby=" +
        orderby +
        "&dir=" +
        dir +
        "&func_id=" +
        sel_func +
        "&subfunc_id=" +
        sel_subfunc +
        "&language_id=" +
        sel_language +
        "&framework_id=" +
        sel_framework +
        "&implementation_id=" +
        sel_implementation +
        "&offset=" +
        offset +
        "&rpp=" +
        rpp;

      crudaction(jso, "/codesnippets" + query, "GET", function (feed) {
        let total_ = feed.all_totals;
        //console.log("ALL TOTALS =>", total_);
        let codeImpTitle = "&nbsp;"; //intial default value
        let imptypeAndContributor = ""; //initial default value
        let codeVersions = ""; //initial default value

        if (total_ > 0) {
          let data = feed["data"];
          //update code implementation title
          codeImpTitle = data.title;
          $("#codeimp-title").html(codeImpTitle);

          //update implementation type and contributor name
          imptypeAndContributor =
            "A " +
            data.implementation_title +
            " implementation by " +
            data.fullname;

          $("#imptype-and-contributor").html(imptypeAndContributor);

          //add code version drop down
          for (let i = 0; i <= total_ - 1; i++) {
            codeVersions +=
              '<option value="' + i + '">Code Version ' + (i + 1) + "</option>";
            $("#code-version").html(codeVersions);
          }

          //Display the code snippet
          codeEditor.setValue(data.row_code);
        } else {
          //set code implementation title to initialized default value
          $("#codeimp-title").html(codeImpTitle);

          //set implementation type and contributor name to intialized default value
          $("#imptype-and-contributor").html(imptypeAndContributor);

          //add code version drop down
          $("#code-version").html("<option value='0'>Code Version</option>");

          /////-------Display that no codesnippet found
          codeEditor.setValue("No Code Loaded.");
        }
      });
    },
  };

  editorLib.init();
}

//////---------------------End codeSnippet

//////------Begin dbms
/* function load_dbms(offset, rpp) {
  let status = 1;
  let orderby = "name";
  let dir = "ASC";

  let jso = {};

  let query =
    "?status=" +
    status +
    "&orderby=" +
    orderby +
    "&dir=" +
    dir +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp;

  crudaction(jso, "/dbms" + query, "GET", function (result) {
    ////////--------Result should look something like this
    //////   {\"result_\":$result_,\"details_\":$details_,\"total_\":$totalcount}
    //////---------$details is a a JSON representation of multiple MYSQL Rows

    //let json_ = JSON.parse(result).details_;
    let data = result["data"];
    let total_ = data.length;
    //console.log(total_);
    let dbms = "";

    if (total_ > 0) {
      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].name;
        var icon = data[i].icon;
        dbms +=
          '<option value="' +
          uid +
          '">' +
          '<img src="assets/images/dbms/resized/' +
          icon +
          '" height="20px" width="20px"></img> ' +
          title +
          "</option>";
      }
      $("#sel_dbms").html(dbms);
    } else {
      //////-------No Languages found
      $("#sel_dbms").html("<li>No dbms Loaded.</li>");
    }
  });
}
 */

//////---------------------End dbms

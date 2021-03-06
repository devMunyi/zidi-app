///////////-------Begin Functionalities
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
    let total_ = result["all_totals"];
    //console.log(total_);
    let impl = "";

    if (total_ > 0) {
      let data = result["data"];
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
  codeLoading("#codeimp-title");
  codeLoading("#imptype-and-contributor");
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
    sel_func = 4;
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
    sel_framework = 51;
  } else {
    persistence("framework", sel_framework);
  }

  if (!sel_implementation) {
    sel_implementation = 1;
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
        //reset code editor to empty
        codeEditor.setValue("");

        let total_ = feed.all_totals;
        //console.log("ALL TOTALS =>", total_);
        let codeImpTitle = "<h4>&nbsp;</h4>"; //intial default value
        let imptypeAndContributor = ""; //initial default value
        let codeVersions = ""; //initial default value

        if (total_ > 0) {
          let data = feed["data"];
          //update code implementation title
          codeImpTitle = data.title;
          $("#codeimp-title").html("<h4>" + codeImpTitle + "</h4>");

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

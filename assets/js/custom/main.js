///////////-------Begin Functionalities
function functions_load() {
  //display a loader
  codeLoading("#functions_");

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
    if (result.all_totals > 0) {
      let data = result["data"];
      let data_length = data.length;

      //////////--------Lets Pull All sub functions at the same time
      apiSubfunLoad(function (sub_result) {
        //////////-----Loop functions while injecting subfunctions
        let fun = "";
        let current_loc = JSON.parse(localStorage.getItem("persist"));
        let func_sel;
        let active_func;

        for (let i = 0; i < data_length; i++) {
          let function_id = data[i].uid;
          let function_name = data[i].name;
          let function_icon = data[i].icon;

          if (current_loc && current_loc.func) {
            func_sel = current_loc.func;
            if (function_id == func_sel) {
              active_func = "active";
            } else {
              active_func = "";
            }
          }

          fun += `<li class="outer_list ${active_func}"> 
            <a href="javascript:void(0)" 
            onclick="submenu('#fun${function_id}'); persistence('func',${function_id}); load_codeSnippet()" 
            class="has-arrow arrow-b"><img class="icon" src="${server}/${function_icon}">
            </img><span data-hover="${function_name}">&nbsp;${function_name}</span></a>`;

          /////------Loop through sub functions
          let sub_data = sub_result["data"];
          let sub_data_length = sub_data.length;

          if (sub_data_length > 0) {
            let subfunc_sel;
            let active_subfunc;
            fun += `<ul class="subfunc_ inner_list" style="display: none;" id="fun${function_id}">`;

            for (let s = 0; s < sub_data_length; s++) {
              let funct_id = sub_data[s].function_id;

              if (function_id === funct_id) {
                let subfunction_id = sub_data[s].uid;
                let subfunction_name = sub_data[s].name;

                if (current_loc && current_loc.subfunc) {
                  subfunc_sel = current_loc.subfunc;
                  if (subfunction_id == subfunc_sel) {
                    active_subfunc = "active";
                  } else {
                    active_subfunc = "";
                  }
                }

                fun += `<li class="${active_subfunc}"><a href="javascript:void(0)" onclick="subfun('#fun${function_id}'); persistence('subfunc', ${subfunction_id}); load_codeSnippet()"><span data-hover="${subfunction_name}">&nbsp;${subfunction_name}</span></a></li>`;
              }
            }
            fun += "</ul>";
          }
          fun += "</li>";
        }
        $("#functions_").html(fun);
      });
    } else {
      $("#functions_").html("No record found");
    }
  });
}

function subfun() {}

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
  //display a loader
  codeLoading("#language_");

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
    if (result.all_totals > 0) {
      let server = $("#server_").val();
      let data = result["data"];
      let lang = "";

      //check for previously selected language
      let current_loc = JSON.parse(localStorage.getItem("persist"));
      let active_language = "";
      let language_sel;

      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].name;
        var icon = data[i].icon;

        if (current_loc && current_loc.language) {
          language_sel = current_loc.language;
          if (uid == language_sel) {
            active_language = "active";
          } else {
            active_language = "";
          }
        }

        lang += `<li class="hover-lang ${active_language}" style="margin: 0px; padding: 0px;"><a href="javascript:void(0)" onclick="load_frameworks(${uid}); persistence_remove('framework'); persistence('language', ${uid});"><img src="${server}/${icon}" height="20px">&nbsp;${title}</a></li>`;
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
  let offset = 0;
  let rpp = 100;
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

  //console.log(query);

  crudaction(jso, "/frameworks" + query, "GET", function (result) {
    if (result.all_totals > 0) {
      let data = result["data"];
      let frm =
        '<select  class="fancy-select" id="sel_framework" onchange="load_codeSnippet()"><option value="0"> No Framework</option>';

      //check for previously selected framework
      let current_loc = JSON.parse(localStorage.getItem("persist"));
      let framework_prev_sel;

      for (var i = 0; i < data.length; i++) {
        var uid = data[i].uid;
        var title = data[i].name;
        //var icon = data[i].icon;

        if (current_loc && current_loc.framework) {
          let framework_sel = current_loc.framework;
          if (framework_sel == uid) {
            framework_prev_sel = "SELECTED";
          } else {
            framework_prev_sel = "";
          }
        }

        frm += `<option ${framework_prev_sel} value="${uid}">${title}</option>`;
      }

      $("#framework-dropdown").html(frm + "</select>");
      //load to code snippet based on id parsed to the load framework function which is called on clicking language list
      load_codeSnippet();
    } else {
      //////-------No Frameworks found
      $("#framework-dropdown").html(frm + "</select>");
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
    if (result.all_totals > 0) {
      let impl = "";
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
function saveCodeSnippet() {
  //show disabled/processing button
  disabledBtn("#addEditCodeBtn");

  let codesnippet_id = $("#code_edit_id").val();
  let func_id = $("#func_sel").val();
  let subfunc_id = $("#subfunc_sel").val();
  let language_id = $("#language_sel").val();
  let framework_id = $("#framework_sel").val();
  let implementation_id = $("#impl_sel").val();
  let title = $("#codeimpl_title").val().trim();
  let row_code = $("#code_input").val().trim();
  let file_extension = $("#file_extension").val().trim();
  let instructions = $("#instructions_input").val().trim();
  let added_by;

  //grab the current logged in user
  let current_loc = JSON.parse(localStorage.getItem("persist"));
  if (current_loc) {
    let { user } = current_loc;
    added_by = user.uid;
  } else {
    gotourl("login");
    return;
  }

  let method = "POST";
  let url = "/add-codesnippet";

  let jso = {
    func_id,
    subfunc_id,
    language_id,
    framework_id,
    implementation_id,
    title,
    row_code,
    file_extension,
    instructions,
    added_by,
  };

  if (codesnippet_id > 0) {
    method = "PUT";
    url = "/edit-codesnippet";
    jso = {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      implementation_id,
      title,
      row_code,
      file_extension,
      instructions,
      added_by,
      codesnippet_id,
    };
  }

  //make api request
  crudaction(jso, url, method, function (feed) {
    if (feed) {
      //return the normal button
      submitBtn("#addEditCodeBtn", "saveCodeSnippet()", "Click to submit");
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

      //redirect user to index page on successful update
      setTimeout(() => {
        if (method == "PUT") {
          gotourl("index");
        }
      }, 2500);
    }
  });
}

function load_codeSnippet() {
  //codeLoading("#codeimp-title");
  codeLoading("#imptype-and-contributor");

  persistence("offset", $("#code-version").val());
  let current_loc = JSON.parse(localStorage.getItem("persist"));
  let sel_func = current_loc.func;
  let sel_subfunc = current_loc.subfunc;
  let sel_language = current_loc.language;
  let sel_framework = $("#sel_framework").val();
  let search_ = $("#search_box").val().trim();
  let offset = current_loc.offset;

  let rpp = 1;
  if (!offset) {
    offset = 0;
  } else {
    persistence("offset", offset);
  }

  if (!sel_func) {
    sel_func = null;
  } else {
    persistence("func", sel_func);
  }

  if (!sel_subfunc) {
    sel_subfunc = null;
  } else {
    persistence("subfunc", sel_subfunc);
  }

  if (!sel_language) {
    sel_language = null;
  } else {
    persistence("language", sel_language);
  }

  if (!sel_framework) {
    sel_framework = null;
  } else {
    persistence("framework", sel_framework);
  }

  if (!search_) {
    search_ = "";
  } else {
    persistence("searchKey", search_);
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
        "&offset=" +
        offset +
        "&rpp=" +
        rpp +
        "&search_=" +
        search_;

      crudaction(jso, "/codesnippets" + query, "GET", function (feed) {
        //reset code editor to empty
        codeEditor.setValue("");

        let total_ = feed.all_totals;

        let codeImpTitle = ""; //intial default value
        let imptypeAndContributor = ""; //initial default value

        let codeVersions = "";
        if (total_ > 0) {
          let impl_names = feed["impl_names"];
          let data = feed["data"];

          //update code implementation title
          codeImpTitle = data.title;
          $("#codeimp-title").html(
            "<h4 class='text-left'>" + codeImpTitle + "</h4>"
          );

          imptypeAndContributor =
            "Contributed by " +
            '<a class="a-override" title="View contributor\'s profile" href="javascript:void(0)">' +
            data.fullname +
            "</a>";

          $("#imptype-and-contributor").html(imptypeAndContributor);

          //append code edit button after add button
          // let codeId = data.uid.toString().trim();
          // console.log("CODE ID IS =>", codeId);
          $("#edit-code").html(
            ` | <a class="a-override" href="code-add-edit?cid=${data.uid}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Edit</a>`
          );

          //add code version drop down
          codeVersions =
            '<select class="fancy-select"id="code-version" onchange="load_codeSnippet()">'; //initial default value

          let impl_title;
          let firstChar;

          //check for previously selected code implementation
          let current_loc = JSON.parse(localStorage.getItem("persist"));
          let offset_prev_sel;
          for (let i = 0; i < impl_names.length; i++) {
            impl_title = impl_names[i].implementation;

            firstChar = impl_title[0];

            if (firstChar == "D") {
              impl_title = "";
            } else {
              impl_title = ` (${impl_title})`;
            }

            if (current_loc && current_loc.offset) {
              let impl_sel_ = current_loc.offset;
              if (impl_sel_ == i) {
                offset_prev_sel = "SELECTED";
              } else {
                offset_prev_sel = "";
              }
            }

            codeVersions += `<option ${offset_prev_sel} value="${i}">Implementation ${
              i + 1
            } ${impl_title} </option>`;
          }

          $("#version-dropdown").html(codeVersions + "</select>");

          //Display the code snippet
          codeEditor.setValue(data.row_code);

          //update the reminder of selected combinations for the loaded code snippet
          persistence("func", data.func_id);
          persistence("subfunc", data.subfunc_id);
          persistence("language", data.language_id);
          persistence("framework", data.framework_id);
          persistence("offset", data.impl_version);

          //console.log("CURRENT SEL =>", current_loc);
        } else {
          //set code implementation title to initialized default value
          $("#codeimp-title").html(codeImpTitle);

          //set implementation type and contributor name to intialized default value
          $("#imptype-and-contributor").html(imptypeAndContributor);

          //add code version drop down
          $("#version-dropdown").html(codeVersions);

          //empty the code edit link
          $("#edit-code").html("");

          /////-------Display that no codesnippet found
          codeEditor.setValue("No Code Loaded.");
        }
      });
    },
  };

  editorLib.init();
}

//////---------------------End codeSnippet

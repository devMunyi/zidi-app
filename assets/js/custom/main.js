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
      //persistence("allFuns", result);
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

          if (current_loc && current_loc.func > 0) {
            func_sel = current_loc.func;
            if (function_id == func_sel) {
              active_func = "active-two";
            } else {
              active_func = "";
            }
          }

          fun += `<li class="outer_list"> 
            <a class="func-item ${active_func} has-arrow arrow-b" href="javascript:void(0)" 
            onclick="submenu('#fun${function_id}'); title_update('${function_name}'); persistence('func',${function_id}); persistence_remove('subfunc'); loadCodesnippetsLink()">
            <img class="icon" src="${server}/${function_icon}"/>
            <span data-hover="${function_name}">&nbsp;${function_name}</span></a>`;

          /////------Loop through sub functions
          let sub_data = sub_result["data"];
          let sub_data_length = sub_data.length;

          if (sub_data_length > 0) {
            let subfunc_sel;
            let active_subfunc;
            fun += `<ul class="inner_list" style="display: none;" id="fun${function_id}">`;

            for (let s = 0; s < sub_data_length; s++) {
              let funct_id = sub_data[s].function_id;

              if (function_id === funct_id) {
                let subfunction_id = sub_data[s].uid;
                let subfunction_name = sub_data[s].name;

                if (current_loc && current_loc.subfunc >= 0) {
                  subfunc_sel = current_loc.subfunc;
                  if (subfunction_id == subfunc_sel) {
                    //console.log("FOUND AN ACTIVE SUBFUNCTION");
                    active_subfunc = "active-two";
                  } else {
                    active_subfunc = "";
                  }
                }
                fun += `<li class="subfunc_">
                <a class="subfunc-item ${active_subfunc}" href="javascript:void(0)" 
                onclick="subfun('#fun${function_id}'); title_update('${function_name} / ${subfunction_name}'); persistence('subfunc', ${subfunction_id}); loadCodesnippetsLink()">
                 <span class="subfun_" data-hover="${subfunction_name}"><i class="fe fe-chevrons-right" data-toggle="tooltip" title="" data-original-title="fe fe-arrow-up-right"></i> ${subfunction_name}</span>
                </a>
                </li>`;
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
  let offset = 0;
  let rpp = 500;
  let dir = "ASC";
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

  crudaction(jso, "/subfunctionalities" + query, "GET", function (result) {
    callback(result);
    //console.log("Subf functions => ", result);
    persistence("allSubfuns", result);
  });
}

function filterSubFuncByFunc() {
  let current_loc = JSON.parse(localStorage.getItem("persist"));

  if (current_loc && current_loc.allSubfuns) {
    let subfuns = current_loc.allSubfuns.data;

    let sel_fun = parseInt($("#func_sel").val().trim());
    let subfun = `<option value="">--Select One</option><option value="0">No subfunction</option>`;

    if (sel_fun >= 0) {
      let subfunsByFunc = [];
      for (let i = 0; i < subfuns.length; i++) {
        // console.log("subfuns available");
        if (sel_fun == subfuns[i].function_id) {
          subfunsByFunc.push(subfuns[i]);
        }
      }

      if (subfunsByFunc.length > 0) {
        // console.log("subfuns available2");
        for (let sf = 0; sf < subfunsByFunc.length; sf++) {
          subfun += ` <option value="${subfunsByFunc[sf].uid}">${subfunsByFunc[sf].name}</option>`;
        }
        $("#subfunc_sel").html(subfun);
      } else {
        $("#subfunc_sel").html(subfun);
      }
    } else {
      for (let ii = 0; ii < subfuns.length; ii++) {
        subfun += `<option value="${subfuns[ii].uid}">${subfuns[ii].name}</option>`;
      }
      $("#subfunc_sel").html(subfun);
    }
  }
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
  let rpp = 100;

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
      for (let i = 0; i < data.length; i++) {
        let uid = data[i].uid;
        let title = data[i].name;
        let icon = data[i].icon;
        if (current_loc && current_loc.language) {
          language_sel = current_loc.language;
          if (uid == language_sel) {
            active_language = "active-two";
          } else {
            active_language = "";
          }
        }
        lang += `<li class="hover-lang" style="margin: 0px; padding: 0px;">
        <a class="lang-item ${active_language}" href="javascript:void(0)"
        onclick="getFramsByLang(${uid}); persistence_remove('framework'); persistence('language', ${uid});">
        <img src="${server}/${icon}" height="20px">&nbsp;${title}</a></li>`;
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
function filterFramsByLang() {
  let current_loc = JSON.parse(localStorage.getItem("persist"));

  if (current_loc && current_loc.allFrams) {
    let frams = current_loc.allFrams.data;

    let sel_lang = parseInt($("#language_sel").val().trim());
    let fram = `<option value="">--Select One</option><option value="0">No Framework</option>`;

    if (sel_lang >= 0) {
      let framsByLang = []; //initialize available frameworks for a particular language as empty array
      for (let i = 0; i < frams.length; i++) {
        // console.log("frams available");
        if (sel_lang == frams[i].language_id) {
          framsByLang.push(frams[i]);
        }
      }

      if (framsByLang.length > 0) {
        // console.log("subfuns available2");
        for (let frm = 0; frm < framsByLang.length; frm++) {
          fram += `<option value="${framsByLang[frm].uid}">${framsByLang[frm].name}</option>`;
        }
        $("#framework_sel").html(fram);
      } else {
        $("#framework_sel").html(fram);
      }
    } else {
      for (let ii = 0; ii < frams.length; ii++) {
        fram += `<option value="${frams[ii].uid}">${frams[ii].name}</option>`;
      }
      $("#framework_sel").html(fram);
    }
  }
}

function getAllFrams() {
  let offset = 0;
  let rpp = 500;
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

  crudaction({}, "/frameworks" + query, "GET", function (result) {
    if (result.all_totals > 0) {
      persistence("allFrams", result);
    }
  });
}

function getFramsByLang(language_id_) {
  if (language_id_) {
    let offset = 0;
    let rpp = 100;
    let where_ = "f.status = 1";
    let orderby = "f.name";
    let dir = "ASC";

    let query =
      "?language_id=" +
      language_id_ +
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

    let jso = {};

    //console.log(query);

    crudaction(jso, "/frameworks" + query, "GET", function (result) {
      if (result.all_totals > 0) {
        let data = result["data"];
        let frm = `<select  class="fancy-select" id="sel_framework" onchange="loadCodesnippetsLink()">
        <option value="0"> No Framework</option>`;

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
        loadCodesnippetsLink();
      } else {
        //////-------No Frameworks found
        $("#framework-dropdown").html(frm + "</select>");
        loadCodesnippetsLink();
      }
    });
  } else {
    //console.log("No Language id value found");
    $("#framework-dropdown").html("");
  }
}

//////---------------------End frameworks

//////------Begin codeSnippet
function codesnippetValidate() {
  // Retrieving the values of form elements
  //let codesnippet_id = $("#code_edit_id").val();
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

  // Defining error variables with a default value
  let funErr =
    (subfunErr =
    langErr =
    framErr =
    implErr =
    titleErr =
    codeErr =
    fileExtErr =
    instrErr =
      true);

  // Validate function
  if (func_id == "") {
    printError("funErr", "Please select function");
  } else {
    printError("funErr", "");
    funErr = false;
  }

  // Validate subfunction
  if (subfunc_id == "") {
    printError("subfunErr", "Please select subfunction");
  } else {
    printError("subfunErr", "");
    subfunErr = false;
  }

  // Validate language
  if (language_id == "") {
    printError("langErr", "Please select language");
  } else {
    printError("langErr", "");
    langErr = false;
  }

  // Validate framework
  if (framework_id == "") {
    printError("framErr", "Please select framework");
  } else {
    printError("framErr", "");
    framErr = false;
  }

  // Validate implementation
  if (implementation_id == "") {
    printError("implErr", "Please select implementation");
  } else {
    printError("implErr", "");
    implErr = false;
  }

  // Validate title
  if (title == "") {
    printError("titleErr", "Please add a user friendly code title");
  } else {
    printError("titleErr", "");
    titleErr = false;
  }

  // Validate code
  if (row_code == "") {
    printError("codeErr", "Please enter your code");
  } else {
    printError("codeErr", "");
    codeErr = false;
  }

  // Validate file extension
  if (file_extension == "") {
    printError("fileExtErr", "File extension used with code added is required");
  } else {
    printError("fileExtErr", "");
    fileExtErr = false;
  }

  // var regex = /^\S+@\S+\.\S+$/;
  // Validate username
  // if (username == "") {
  //   printError("usernameErr", "Please enter your username");
  // } else {
  //   var regex = /^[a-zA-Z0-9.@\s]+$/;
  //   if (regex.test(username) === false) {
  //     printError("usernameErr", "Please enter a valid username");
  //   } else {
  //     printError("usernameErr", "");
  //     usernameErr = false;
  //   }
  // }

  if (
    (funErr ||
      subfunErr ||
      langErr ||
      framErr ||
      implErr ||
      titleErr ||
      codeErr ||
      fileExtErr) == true
  ) {
    return false;
  } else {
    // Creating a string from input data for preview
    data = {
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
    //pass the data for saving;
    saveCodeSnippet(data);
  }
}

function saveCodeSnippet(data) {
  //show disabled/processing button
  disabledBtn("#addEditCodeBtn");

  // let func_id = $("#func_sel").val();
  // let subfunc_id = $("#subfunc_sel").val();
  // let language_id = $("#language_sel").val();
  // let framework_id = $("#framework_sel").val();
  // let implementation_id = $("#impl_sel").val();
  // let title = $("#codeimpl_title").val().trim();
  // let row_code = $("#code_input").val().trim();
  // let file_extension = $("#file_extension").val().trim();
  // let instructions = $("#instructions_input").val().trim();

  let codesnippet_id = $("#code_edit_id").val();
  let method = "POST";
  let url = "/add-codesnippet";
  let jso = data;
  // let jso = {
  //   func_id,
  //   subfunc_id,
  //   language_id,
  //   framework_id,
  //   implementation_id,
  //   title,
  //   row_code,
  //   file_extension,
  //   instructions,
  //   added_by,
  // };

  if (codesnippet_id > 0) {
    method = "PUT";
    url = "/edit-codesnippet";
    data.codesnippet_id = codesnippet_id;
    jso = data;
    // jso = {
    //   func_id,
    //   subfunc_id,
    //   language_id,
    //   framework_id,
    //   implementation_id,
    //   title,
    //   row_code,
    //   file_extension,
    //   instructions,
    //   added_by,
    //   codesnippet_id,
    // };
  }

  //make api request
  crudaction(jso, url, method, function (feed) {
    if (feed) {
      //return the normal button
      submitBtn("#addEditCodeBtn", "codesnippetValidate()", "Click to submit");
    }

    if (feed["success"] === false) {
      let message = feed["message"];
      errorToast(message);
    } else if (feed["success"] === true) {
      let message = feed["message"];
      successToast(message);

      //redirect user to index page on successful update
      setTimeout(() => {
        if (method == "PUT") {
          gotourl("index");
        }
      }, 2500);
    }
  });
}

function search_codeSnippet() {
  let code_search = $("#search_box").val().trim();
  if (code_search) {
    let query = "?search_=" + code_search;
    crudaction({}, "/search-codesnippet" + query, "GET", function (result) {
      if (result.success) {
        let totalSearches = result.search_totals;
        //console.log("SEARCH RESULTS =>", totalSearches);
        let data = result["data"];
        if (totalSearches > 0) {
          let tableSearch = `<table class='table table-dark childClass stack-top table-striped table-condensed'>`;
          for (let i = 0; i < data.length; i++) {
            tableSearch += `<tr><td><a href="javascript:void(0)" style='color:white;' class='pointer' 
            onclick=\"select_code('${data[i].uid}', '${data[i].func_id}', '${data[i].subfunc_id}', '${data[i].language_id}', '${data[i].framework_id}', '${data[i].title}')">
            <span class='font-bold font-16 text-blue'>${data[i].title}</span> <br/>
            Contributed By: ${data[i].fullname} on ${data[i].added_date}</a></td></tr>`;
          }
          tableSearch += `</table>`;
          $("#code_results").slideDown("fast");
          $("#code_results").html(tableSearch);
        } else {
          $("#code_results").slideDown("fast");
          $("#code_results").html(
            `<div class="childClass stack-top card">
            <span class="text-center search-dropdown-noresults">No results</span>
          </div>`
          );
        }
      } else {
        $("#code_results").slideDown("fast");
        $("#code_results").html(
          `<div class="childClass stack-top card">
          <span class="text-center search-dropdown-noresults">No results</span>
          </div>`
        );
      }
    });
  } else {
    $("#code_results").fadeOut("fast");
  }
}

function select_code(cid, func, subfunc, language, framework, title) {
  persistence("codeId", cid);
  persistence("func", func);
  persistence("subfunc", subfunc);
  persistence("language", language);
  persistence("framework", framework);
  persistence("offset", 0);
  $("#search_box").val(title);
  loadSearchSelCode();
  // $("#code_id_").val(uid);
  $("#code_results").fadeOut("fast");
}

function loadSearchSelCode() {
  //codeLoading("#codeimp-title");
  codeLoading("#imptype-and-contributor");

  let current_loc = JSON.parse(localStorage.getItem("persist"));
  let codeId;
  if (current_loc && current_loc.codeId) {
    codeId = current_loc.codeId;
  } else {
    console.log("Error retriving code ID");
    return;
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
      let jso = {};
      query = "?codesnippet_id=" + codeId;

      crudaction(jso, "/codesnippet" + query, "GET", function (feed) {
        //reset code editor to empty
        codeEditor.setValue("");

        let total_ = feed.all_totals;

        let codeImpTitle = ""; //intial default value
        let imptypeAndContributor = ""; //initial default value

        // let codeVersions = "";
        if (total_ > 0) {
          //clear load framework dropdown
          $("#framework-dropdown").html("");
          $("#version-dropdown").html("");

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
          $("#edit-code").html(
            ` | <a class="a-override" href="code-add-edit?cid=${data.uid}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Edit</a>`
          );

          let firstChar;
          //check for previously selected code implementation
          let impl_title = data.impl_name;

          firstChar = impl_title[0];

          if (firstChar == "D") {
            impl_title = "";
          } else {
            impl_title = ` (${impl_title})`;
          }

          // codeVersions += `<option value="0">Implementation 1 ${impl_title} </option>`;

          // $("#version-dropdown").html(codeVersions + "</select>");

          //Display the code snippet
          codeEditor.setValue(data.row_code);

          //update the reminder of selected combinations for the loaded code snippet
          persistence("func", data.func_id);
          persistence("subfunc", data.subfunc_id);
          persistence("language", data.language_id);
          persistence("framework", data.framework_id);

          //console.log("CURRENT SEL =>", current_loc);
        } else {
          //set code implementation title to initialized default value
          $("#codeimp-title").html(codeImpTitle);

          //set implementation type and contributor name to intialized default value
          $("#imptype-and-contributor").html(imptypeAndContributor);

          //add code version drop down
          // $("#version-dropdown").html(codeVersions);

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

//load codesnippet by id
function load_codesnippetById(codeId) {
  //codeLoading("#codeimp-title");
  codeLoading("#imptype-and-contributor");

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

      //reset code editor to empty
      codeEditor.setValue("");

      let current_loc = JSON.parse(localStorage.getItem("persist"));

      let codeImpTitle = ""; //intial default value
      let imptypeAndContributor = ""; //initial default value

      if (current_loc.code.all_totals && current_loc.code.all_totals > 0) {
        let all_ = current_loc.code.data;
        let data;

        for (let i = 0; i < all_.length; i++) {
          if (all_[i].uid == codeId) {
            data = all_[i];
            break;
          }
        }

        //update code implementation title
        codeImpTitle = data.title;
        $("#codeimp-title").html(
          "<h4 class='text-left'>" + codeImpTitle + "</h4>"
        );

        //console.log("Contributor name => ", safe_tags_replace(data.fullname));

        let displayName = "";
        if (data.provider === "Local" || data.provider === "Google") {
          displayName = data.fullname;
        } else if (data.provider == "Github") {
          displayName = data.username;
        } else if (data.provider == "Facebook") {
          displayName += displayName;
        } else if (data.provider == "Twitter") {
          displayName = data.fullname;
        }

        imptypeAndContributor =
          "<i class='fe fe-globe'></i> Contributed by: " +
          '<a class="a-override" title="View contributor\'s profile" href="javascript:void(0)">' +
          safe_tags_replace(displayName) +
          "</a>";

        $("#imptype-and-contributor").html(imptypeAndContributor);

        $("#edit-code").html(
          `|<a class="a-override" href="code-add-edit?cid=${data.uid}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Edit</a>`
        );

        //Display the code snippet
        codeEditor.setValue(data.row_code);
      } else {
        //set code implementation title to initialized default value
        $("#codeimp-title").html(codeImpTitle);

        //set implementation type and contributor name to intialized default value
        $("#imptype-and-contributor").html(imptypeAndContributor);

        //add code version drop down
        // $("#version-dropdown").html(codeVersions);

        //empty the code edit link
        $("#edit-code").html("");

        /////-------Display that no codesnippet found
        codeEditor.setValue("No Code Loaded.");
      }
    },
  };

  editorLib.init();
}

const tagsToReplace = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

function replaceTag(tag) {
  return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
  return str.replace(/[&<>]/g, replaceTag);
}

function loadCodesnippetsLink() {
  //display a loader
  codeLoading("#available-solns");

  //persistence("offset", $("#code-version").val());
  persistence("framework", $("#sel_framework").val());
  //persistence("language", $("#sel_language").val());
  let current_loc = JSON.parse(localStorage.getItem("persist"));
  let sel_func;
  let sel_subfunc;
  let sel_language;
  let sel_framework;
  let offset;

  if (current_loc && current_loc.func > 0) {
    sel_func = current_loc.func;
  }
  if (current_loc && current_loc.subfunc > 0) {
    sel_subfunc = current_loc.subfunc;
  }

  if (current_loc && current_loc.language > 0) {
    sel_language = current_loc.language;
  }

  if (current_loc && current_loc.framework >= 0) {
    sel_framework = current_loc.framework;
  }

  if (current_loc && current_loc.offset >= 0) {
    sel_offset = current_loc.offset;
  }

  let rpp = 25;
  if (!offset) {
    offset = 0;
  }

  if (!sel_func) {
    sel_func = "";
  }

  if (!sel_subfunc) {
    sel_subfunc = "";
  }

  if (!sel_language) {
    sel_language = "";
  } else {
    persistence("language", sel_language);
  }

  if (!sel_framework) {
    sel_framework = "";
  } else {
    persistence("framework", sel_framework);
  }

  let where_ = "c.status = 1 ";
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
    rpp;

  crudaction(jso, "/codesnippets" + query, "GET", function (feed) {
    console.log(feed);
    let total_ = feed.all_totals;
    if (total_ > 0) {
      let impl_names = feed["impl_names"];
      let data = feed["data"];

      let impl_title;
      let firstChar;
      let language;
      let framework;

      //check for previously selected code implementation
      let current_loc = JSON.parse(localStorage.getItem("persist"));
      let active_code_link;
      let solns = "";
      for (let i = 0; i < data.length; i++) {
        impl_title = data[i].implementation;
        language = data[i].language;
        framework = data[i].framework;

        if (data[i].framework_id == 0) {
          framework = "";
        } else {
          framework = ` with ${framework} framework`;
        }

        firstChar = impl_title[0];

        if (firstChar == "D") {
          impl_title = "";
        } else {
          impl_title = ` ${impl_title}`;
        }

        if (current_loc && current_loc.codeId > 0) {
          let impl_sel_ = current_loc.codeId;
          if (impl_sel_ == i) {
            active_code_link = "active";
          } else {
            active_code_link = "";
          }
        }

        solns += `<a href="javascript:void(0)"  onclick="load_codesnippetById('${data[i].uid}')" class="list-group-item list-group-item-action">
<span class="badge badge-secondary"><i class="fe fe-arrow-up-left"></i></span>
        ${data[i].title} - (<i>${language} ${impl_title} ${framework}</i>) </a>`;
      }

      $("#available-solns").html(solns);

      persistence("code", feed);
    } else {
      //add code version drop down
      $("#available-solns").html(
        `<p class="list-group-item list-group-item-action">No record found</p>`
      );

      persistence_remove("code");
    }
  });
}

//////---------------------End codeSnippet

//////------------------------------------Begin profile Profile
function populateProfile() {
  let current_loc = JSON.parse(localStorage.getItem("persist"));
  if (current_loc && current_loc.user) {
    let user = current_loc.user;
    // console.log("USER INFO => ", user);
    //handle photo display
    let displayPhoto = "";
    if (user.provider === "Local" && user.photo) {
      displayPhoto = `<img src='${server_}/user/${user.photo}' style='width: 100px; height: 100px; border-radius: 50%;' />`;
    } else if (user.provider === "Local" && !user.photo) {
      displayPhoto = `<span class="d-flex justify-content-center align-items-center font-24" style='width: 100px; height: 100px; font-weight: bold; border-radius: 50%; background-color: purple; color: white;'>${user.fullname[0]}</span>`;
    } else {
      displayPhoto = `<img src='${user.photo}' referrerpolicy="no-referrer" style='width: 100px; height: 100px; border-radius: 50%;' />`;
    }

    $(".profile-photo-view").html(displayPhoto);

    $("#profile-info").html(
      `<table class="table table-bordered">
        <tr>
          <td><b>Username</b></td>
          <td>${!user.username ? "----------" : user.username}</td>
        </tr>
        <tr>
          <td><b>Email</b></td>
          <td>${!user.email ? "------------" : user.email}</td>
        </tr>
        <tr>
          <td><b>Fullname</b></td>
          <td>${
            !user.fullname ? "---------" : safe_tags_replace(user.fullname)
          }</td>
        </tr>
        <tr>
          <td><b>Country</b></td>
          <td>${!user.country ? "----------" : user.country}</td>
        </tr>
        <tr>
          <td><b>Contribution Rate</b></td>
          <td>50%</td>
        </tr>
      </table>`
    );
  }
}


/////-----------------------------------End of profile
///----Update title and URL
function title_update(title){
  $("#codeimp-title").html('<h4>'+title+'</h4>');
}
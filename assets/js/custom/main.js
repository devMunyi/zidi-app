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
        let current_loc = currentLoc();
        let func_sel;
        let active_func = "";

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
            <a id="func-item-${function_id}" class="${active_func} func-item has-arrow arrow-b" href="javascript:void(0)" 
            onclick="submenu('#fun${function_id}'); title_update('${function_name}'); persistence('func',${function_id}); persistence_remove('subfunc'); loadCodesnippetsLink()">
            <img class="icon" src="${server}/${function_icon}"/>
            <span data-hover="${function_name}">&nbsp;${function_name}</span></a>`;

          /////------Loop through sub functions
          let sub_data = sub_result["data"];
          let sub_data_length = sub_data.length;

          if (sub_data_length > 0) {
            let subfunc_sel;
            let active_subfunc = "";

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
      console.log(
        "functionality and subfunctionality were loaded----------------"
      );
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
  let current_loc = currentLoc();

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
      let current_loc = currentLoc();
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
        onclick="getFramsByLang(${uid}); persistence_remove('framework'); persistence('language', ${uid}); loadCodesnippetsLink();">
        <img src="${server}/${icon}" height="20px">&nbsp;${title}</a></li>`;
      }
      $("#language_").html(lang);
      console.log("Languages were loaded----------------");
    } else {
      //////-------No Languages found
      $("#language_").html("<li>No Languages</li>");
    }
  });
}

//////---------------------End Languages

//////------Begin framework
function filterFramsByLang() {
  let current_loc = currentLoc();

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

  crudaction({}, "/frameworks" + query, "GET", function (feed) {
    let row = `<select class='fancy-select' id = 'sel_framework' onchange='loadCodesnippetsLink()'>
    `;
    let current_loc = currentLoc();
    let active_fram;

    if (
      current_loc &&
      current_loc.code_sel &&
      current_loc.code_sel.framework_id
    ) {
      active_fram = current_loc.code_sel.framework_id;
    }

    if (feed && feed.data && feed.data.length > 0) {
      let { data } = feed;
      let arr_size = data.length;
      //console.log("data size => ", arr_size);
      row += `<option value="0">No framework</option>`;
      for (let i = 0; i < arr_size; i++) {
        let fram_id = data[i].uid;
        let fram_name = data[i].name;

        if (fram_id == 0) {
          continue;
        }

        if (fram_id == active_fram) {
          row += `<option SELECTED value="${fram_id}">${fram_name}</option>`;
        } else {
          row += `<option value="${fram_id}">${fram_name}</option>`;
        }
      }
      //display framework select box
      $("#framework-dropdown").html(row + "</select>");

      //persist the data for later use
      persistence("allFrams", feed);
    } else {
      row = `
      <select>
        <option>No Loaded framework</option>
      </select>
      `;

      $("#framework-dropdown").html(row); ////display framework select box indicating no framework loaded
    }
  });
}

function codeStyles() {
  let data = [
    {
      uid: 0,
      name: "All Code Styles",
    },
    { uid: 1, name: "Plain Code" },
    { uid: 2, name: "Function Based" },
    { uid: 3, name: "Class Based" },
    { uid: 4, name: "API Based" },
  ]; //static code style data
  let current_loc = currentLoc(); //access persisted localstorage key values
  //check for the previously loaded code and if avilable grab the codestyle_id
  if (
    current_loc &&
    current_loc.code_sel &&
    current_loc.code_sel.codestyle_id
  ) {
    active_codestyle = current_loc.code_sel.codestyle_id;
  }

  let row = `<select class='fancy-select' id = 'sel_codestyle' onchange='loadCodesnippetsLink()'>`;
  for (let i = 0; i < data.length > 0; i++) {
    let codestyle_id = data[i].uid;
    let codestyle_title = data[i].name;
    if (codestyle_id == active_codestyle) {
      row += `<option SELECTED value="${codestyle_id}">${codestyle_title}</option>`;
    } else {
      row += `<option value="${codestyle_id}">${codestyle_title}</option>`;
    }
  }

  //display framework select box with frameworks for the selected language
  $("#codestyle-dropdown").html(row + "<select");
}

function getFramsByLang(lang_id) {
  let current_loc = currentLoc();
  let row = `<select class='fancy-select' id = 'sel_framework' onchange='loadCodesnippetsLink()'>
  `;
  if (
    current_loc &&
    current_loc.allFrams &&
    current_loc.allFrams.data &&
    current_loc.allFrams.data.length > 0
  ) {
    let { data } = current_loc.allFrams;
    let fram_arr_size = data.length;

    let active_fram;
    if (
      current_loc &&
      current_loc.code_sel &&
      current_loc.code_sel.framework_id
    ) {
      active_fram = current_loc.code_sel.framework_id;
    }

    row += `<option value="0">No framework</option>`;

    for (let i = 0; i < fram_arr_size; i++) {
      if (data[i].language_id == lang_id) {
        let fram_id = data[i].uid;
        let fram_name = data[i].name;
        if (fram_id == 0) {
          continue;
        }

        if (fram_id == active_fram) {
          row += `<option SELECTED value="${fram_id}">${fram_name}</option>`;
        } else {
          row += `<option value="${fram_id}">${fram_name}</option>`;
        }
      }
    }
    //display framework select box with frameworks for the selected language
    $("#framework-dropdown").html(row + "</select>");
  } else {
    row = `
      <select>
        <option>No Loaded framework</option>
      </select>
      `;

    $("#framework-dropdown").html(row); ////display framework select box indicating no framework loaded
  }
  // if (language_id_) {
  //   let query =
  //     "?language_id=" +
  //     language_id_ +
  //     "&where_=" +
  //     where_ +
  //     "&orderby=" +
  //     orderby +
  //     "&dir=" +
  //     dir +
  //     "&offset=" +
  //     offset +
  //     "&rpp=" +
  //     rpp;

  //   let jso = {};

  //   //console.log(query);

  //   crudaction(jso, "/frameworks" + query, "GET", function (result) {
  //     if (result.all_totals > 0) {
  //       let data = result["data"];
  //       let frm = `<select  class="fancy-select" id="sel_framework" onchange="loadCodesnippetsLink()">
  //       <option value="0"> No Framework</option>`;

  //       //check for previously selected framework
  //       let current_loc = currentLoc();
  //       let framework_prev_sel;

  //       for (var i = 0; i < data.length; i++) {
  //         var uid = data[i].uid;
  //         var title = data[i].name;
  //         //var icon = data[i].icon;

  //         if (current_loc && current_loc.framework) {
  //           let framework_sel = current_loc.framework;
  //           if (framework_sel == uid) {
  //             framework_prev_sel = "SELECTED";
  //           } else {
  //             framework_prev_sel = "";
  //           }
  //         }

  //         frm += `<option ${framework_prev_sel} value="${uid}">${title}</option>`;
  //       }

  //       $("#framework-dropdown").html(frm + "</select>");
  //       //load to code snippet based on id parsed to the load framework function which is called on clicking language list
  //       loadCodesnippetsLink();
  //     } else {
  //       //////-------No Frameworks found
  //       $("#framework-dropdown").html(frm + "</select>");
  //       loadCodesnippetsLink();
  //     }
  //   });
  // } else {
  //   //console.log("No Language id value found");
  //   $("#framework-dropdown").html("");
  // }
}

// function getFramsByLang(language_id_) {
//   if (language_id_) {
//     let offset = 0;
//     let rpp = 100;
//     let where_ = "f.status = 1";
//     let orderby = "f.name";
//     let dir = "ASC";

//     let query =
//       "?language_id=" +
//       language_id_ +
//       "&where_=" +
//       where_ +
//       "&orderby=" +
//       orderby +
//       "&dir=" +
//       dir +
//       "&offset=" +
//       offset +
//       "&rpp=" +
//       rpp;

//     let jso = {};

//     //console.log(query);

//     crudaction(jso, "/frameworks" + query, "GET", function (result) {
//       if (result.all_totals > 0) {
//         let data = result["data"];
//         let frm = `<select  class="fancy-select" id="sel_framework" onchange="loadCodesnippetsLink()">
//         <option value="0"> No Framework</option>`;

//         //check for previously selected framework
//         let current_loc = currentLoc();
//         let framework_prev_sel;

//         for (var i = 0; i < data.length; i++) {
//           var uid = data[i].uid;
//           var title = data[i].name;
//           //var icon = data[i].icon;

//           if (current_loc && current_loc.framework) {
//             let framework_sel = current_loc.framework;
//             if (framework_sel == uid) {
//               framework_prev_sel = "SELECTED";
//             } else {
//               framework_prev_sel = "";
//             }
//           }

//           frm += `<option ${framework_prev_sel} value="${uid}">${title}</option>`;
//         }

//         $("#framework-dropdown").html(frm + "</select>");
//         //load to code snippet based on id parsed to the load framework function which is called on clicking language list
//         loadCodesnippetsLink();
//       } else {
//         //////-------No Frameworks found
//         $("#framework-dropdown").html(frm + "</select>");
//         loadCodesnippetsLink();
//       }
//     });
//   } else {
//     //console.log("No Language id value found");
//     $("#framework-dropdown").html("");
//   }
// }

//////---------------------End frameworks

//////------Begin codeSnippet
function codesnippetValidate() {
  // Retrieving the values of form elements
  //let codesnippet_id = $("#code_edit_id").val();
  let func_id = $("#func_sel").val();
  let subfunc_id = $("#subfunc_sel").val();
  let language_id = $("#language_sel").val();
  let framework_id = $("#framework_sel").val();
  let lang_impl_type_id = $("#sel_lang_impl").val();
  let user_impl_type_id = $("#sel_user_impl").val();
  let title = $("#codeimpl_title").val().trim();
  let row_code = $("#code_input").val().trim();
  let file_extension = $("#file_extension").val().trim();
  let instructions = $("#instructions_input").val().trim();
  let added_by;
  //grab the current logged in user
  let current_loc = currentLoc();
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
    langImplErr =
    userImplErr =
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

  // Validate language implementation
  if (lang_impl_type_id == "") {
    printError("langImplErr", "Please select language implementation type");
  } else {
    printError("langImplErr", "");
    langImplErr = false;
  }

  // Validate language implementation
  if (user_impl_type_id == "") {
    printError("userImplErr", "Please select your implementation type");
  } else {
    printError("userImplErr", "");
    userImplErr = false;
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
      langImplErr ||
      userImplErr ||
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
      lang_impl_type_id,
      user_impl_type_id,
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
            onclick=\"select_code(${data[i].uid}, '${data[i].func_id}', '${data[i].subfunc_id}', '${data[i].language_name}',  '${data[i].framework_id}', '${data[i].title}')">
            <span class='a-override a-alt'>${data[i].title}</span> <br/>
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

function select_code(
  code_id,
  func,
  subfunc,
  language = "java",
  framework,
  title
) {
  console.log("selected code id language => ", language);
  // persistence("func", func);
  // persistence("subfunc", subfunc);
  // persistence("language", language);
  // persistence("framework", framework);
  // persistence("offset", 0);
  $("#search_box").val(title);

  //load the selected code using the code uid
  load_codesnippetById(code_id, language);
  // $("#code_id_").val(uid);
  $("#code_results").fadeOut("fast");
}

// function loadSearchSelCode() {
//   //codeLoading("#codeimp-title");
//   codeLoading("#imptype-and-contributor");

//   let current_loc = currentLoc();
//   let codeId;
//   if (current_loc && current_loc.code_sel) {
//     codeId = current_loc.code_sel.uid;
//   } else {
//     console.log("Error retriving code ID");
//     return;
//   }

//   let codeEditor = ace.edit("editor");
//   let editorLib = {
//     init() {
//       //Configure Ace
//       codeEditor.setTheme("ace/theme/monokai");

//       //Set Languages
//       codeEditor.session.setMode("ace/mode/javascript");
//       codeEditor.session.setMode("ace/mode/java");
//       //codeEditor.session.setMode("ace/mode.html");
//       //codeEditor.session.setMode("ace/mode/php");
//       //Set Options
//       codeEditor.setOptions({
//         //fontFamily: 'Inconsolata'
//         fontSize: "12pt",
//         //enableBasicAutocompletion: true,
//         //enableLiveAutocompletion: true
//       });

//       //Set default code
//       let jso = {};
//       query = "?codesnippet_id=" + codeId;

//       crudaction(jso, "/codesnippet" + query, "GET", function (feed) {
//         //reset code editor to empty
//         codeEditor.setValue("");

//         let total_ = feed.all_totals;

//         let codeImpTitle = ""; //intial default value
//         let imptypeAndContributor = ""; //initial default value

//         // let codeVersions = "";
//         if (total_ > 0) {
//           //clear load framework dropdown
//           $("#framework-dropdown").html("");
//           $("#version-dropdown").html("");

//           let data = feed["data"];

//           //update code implementation title
//           codeImpTitle = data.title;
//           $("#codeimp-title").html(
//             "<h4 class='text-left'>" + codeImpTitle + "</h4>"
//           );

//           imptypeAndContributor =
//             "Contributed by " +
//             '<a class="a-override a-alt bold" title="View contributor\'s profile" href="javascript:void(0)">' +
//             data.fullname +
//             "</a>";

//           $("#imptype-and-contributor").html(imptypeAndContributor);

//           //append code edit button after add button
//           $("#edit-code").html(
//             ` | <a class="a-override" href="code-add-edit?cid=${data.uid}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Edit</a>`
//           );

//           let firstChar;
//           //check for previously selected code implementation
//           let impl_title = data.language_implementation_type;

//           firstChar = impl_title[0];

//           if (firstChar == "D") {
//             impl_title = "";
//           } else {
//             impl_title = ` (${impl_title})`;
//           }

//           // codeVersions += `<option value="0">Implementation 1 ${impl_title} </option>`;

//           // $("#version-dropdown").html(codeVersions + "</select>");

//           //Display the code snippet
//           codeEditor.setValue(data.row_code);

//           //update the reminder of selected combinations for the loaded code snippet
//         } else {
//           //set code implementation title to initialized default value
//           $("#codeimp-title").html(codeImpTitle);

//           //set implementation type and contributor name to intialized default value
//           $("#imptype-and-contributor").html(imptypeAndContributor);

//           //add code version drop down
//           // $("#version-dropdown").html(codeVersions);

//           //empty the code edit link
//           $("#edit-code").html("");

//           /////-------Display that no codesnippet found
//           codeEditor.setValue("No Code Loaded.");
//         }
//       });
//     },
//   };

//   editorLib.init();
// }

//load codesnippet by id

//appending current laoded code to url
function goTo(page, title, url) {
  if ("undefined" !== typeof history.pushState) {
    history.pushState({ page: page }, title, url);
  } else {
    window.location.assign(url);
  }
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
  let current_loc = currentLoc();
  let sel_func;
  let sel_subfunc;
  let sel_language;
  let sel_framework;
  let sel_impl = parseInt($("#sel_codestyle").val().trim());
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

  if (!sel_impl) {
    sel_impl = "";
  } else {
    persistence("impl", sel_impl);
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
    "&user_impl_type_id=" +
    sel_impl +
    "&offset=" +
    offset +
    "&rpp=" +
    rpp;

  crudaction(jso, "/codesnippets" + query, "GET", function (feed) {
    //console.log(feed);
    let total_ = feed.all_totals;
    if (total_ > 0) {
      let data = feed["data"];

      let language_implementation_type;
      let firstChar;
      let language_name;
      let framework;
      let codesnippet_id;

      //check for previously selected code implementation
      let current_loc = currentLoc();
      let active_code_link;
      let solns = "";
      for (let i = 0; i < data.length; i++) {
        language_implementation_type = data[i].language_implementation_type;
        language_name = data[i].language_name;
        framework = data[i].framework;
        language_id = data[i].language_id;
        codesnippet_id = data[i].uid;

        if (data[i].framework_id == 0) {
          framework = "";
        } else {
          framework = ` with ${framework} framework`;
        }

        firstChar = language_implementation_type[0];

        if (firstChar == "D") {
          language_implementation_type = "";
        } else {
          language_implementation_type = ` ${language_implementation_type}`;
        }

        if (
          current_loc &&
          current_loc.code_sel &&
          current_loc.code_sel.uid > 0
        ) {
          let impl_sel_ = current_loc.code_sel.uid;
          if (impl_sel_ == i) {
            active_code_link = "active";
          } else {
            active_code_link = "";
          }
        }

        solns += `<a href="javascript:void(0)"  onclick="load_codesnippetById('${codesnippet_id}', '${language_name}')" class="list-group-item list-group-item-action">
<span class="badge badge-secondary"><i class="fe fe-arrow-up-left"></i></span>
        ${data[i].title} - (<i>${language_name} ${language_implementation_type} ${framework}</i>) </a>`;
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

function load_codesnippetById(codeId, language_name = "java") {
  //codeLoading("#codeimp-title");
  codeLoading("#imptype-and-contributor");

  let codeEditor = ace.edit("editor");
  let editorLib = {
    init() {
      //Configure Ace
      codeEditor.setTheme("ace/theme/monokai");

      //Set Languages
      language = language_name.toLowerCase();
      if (language == "nodejs") {
        language = "javascript";
      }
      if (language == "c#") {
        language = "csharp";
      }

      if (language == "c" || language == "c++") {
        language = "c_cpp";
      }

      codeEditor.session.setMode("ace/mode/" + language);
      //Set Options
      codeEditor.setOptions({
        //fontFamily: "Inconsolata",
        fontSize: "12pt",
        enableBasicAutocompletion: true,
        //enableLiveAutocompletion: true,
      });

      //Set default code
      let jso = {};
      query = "?codesnippet_id=" + codeId;

      crudaction(jso, "/codesnippet" + query, "GET", function (feed) {
        //reset code editor to empty
        codeEditor.setValue("");

        //console.log("loaded codesnippet info => ", feed);
        let codeImpTitle = ""; //intial default value
        let imptypeAndContributor = ""; //initial default value
        let current_loc = currentLoc();

        //let codeVersions = "";
        if (feed.data && feed.data.uid > 0 && feed.data.uid == codeId) {
          //clear load framework dropdown
          let data = feed["data"];
          let { func_id, subfunc_id, language_id, framework_id, codestyle_id } =
            data;

          //update code implementation title
          codeImpTitle = data.title;
          $("#codeimp-title").html(
            "<h4 class='text-left'>" + codeImpTitle + "</h4>"
          );

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
            '<a class="a-override a-alt bold" title="View contributor\'s profile" href="javascript:void(0)">' +
            safe_tags_replace(displayName) +
            "</a>";

          $("#imptype-and-contributor").html(imptypeAndContributor);

          //toggle edit code button based on whether the logged in user is the same as the author of the displayed code
          if (current_loc.user && current_loc.user.uid) {
            let user_id = current_loc.user.uid;
            if (user_id === data.added_by) {
              $("#edit-code").html(
                `|<a class="a-override" href="code-add-edit?cid=${data.uid}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Edit</a>`
              );
            } else {
              $("#edit-code").html("");
            }
          } else {
            $("#edit-code").html("");
          }

          //display the codesnippet
          codeEditor.setValue(data.row_code);

          //diplay instructions if any
          if (data.instructions) {
            $("#code-instructions").html(data.instructions);
          } else {
            $("#code-instructions").html("No Instructions");
          }

          //display total comments for this particular codesnippet
          let commentCountView;
          if (data.total_comments) {
            let commentsCount = data.total_comments;
            if (commentsCount == 1) {
              commentCountView = `${commentsCount} comment`;
            } else {
              commentCountView = `${commentsCount} comments`;
            }
            $("#total-comments").html(commentCountView);
          } else {
            $("#total-comments").html("0 comments");
          }

          //add comment button
          $("#add-comment").html(
            `<a class="a-alt" onclick="toggleCommentForm()" href="javascript:void(0)" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>Add Comment</a>`
          );

          //persist code Id to be referenced later
          persistence("code_sel", data);
          persistence("func", data.func_id);
          persistence("subfunc", data.subfunc_id);
          persistence("language", data.language_id);
          persistence("framework", data.framework_id);
          persistence("codestyle", data.codestyle_id);

          //retrieve comments for the loaded codesnippet
          getCommentsByCodesnippetId();

          //highlight the
          //function=id(func), subfunction, language, framework, code_style, selected solution
          highlightSelCodeParams(
            func_id,
            subfunc_id,
            language_id,
            framework_id,
            codestyle_id
          );

          console.log("codesnippet was loaded----------------");
        } else {
          //set code implementation title to initialized default value
          $("#codeimp-title").html(codeImpTitle);

          //set implementation type and contributor name to intialized default value
          $("#imptype-and-contributor").html(imptypeAndContributor);

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

function highlightSelCodeParams(
  func_id,
  subfunc_id,
  lang_id,
  fram_id,
  codestyle_id
) {
  console.log(
    "func id => ",
    func_id,
    ", subfunc id => ",
    subfunc_id,
    ", language id => ",
    lang_id,
    ", framework id => ",
    fram_id,
    "code style id => ",
    codestyle_id
  );
  //highlight the function for the code loaded
  let targetFuncId = "#func-item" + func_id;
  let targetFuncElem = $(`${targetFuncId}`);
  console.log("selected func item => ", targetFuncElem);
  //alert($(`#func-item${func_id}`).hasClass("has-arrow"));
  if (targetFuncElem) {
    console.log(`func item ${func_id} was found`);
    //("#func-item-" + func_id).addClass("active-two");
    targetFuncElem.toggleClass("active");
  } else {
    console.log("func item was not found");
  }

  //highlight the subfunction for the code loaded
  // if ($("#subfunc-item" + subfunc_id)) {
  //   $("#subfunc-item" + subfunc_id).addClass("active-two");
  //   let subfunc_item = $("#subfunc-item" + subfunc_id);
  //   console.log(`subfunc item ${subfunc_item} was found`);
  // } else {
  //   console.log("subfunc item was not found");
  // }

  //highlight the language for the code loaded
  // $("#lang-item" + lang_id).addClass("active-two");
  // if ($("#lang-item" + lang_id)) {
  //   let lang_item = $("#lang-item" + lang_id);
  //   console.log(`subfunc item ${lang_item} was found`);
  // } else {
  //   console.log("subfunc item was not found");
  // }
}

//////---------------------End codeSnippet

///////--------------Begin Implementations
// function getImplementations(language_id_) {
//   if (language_id_) {
//     let offset = 0;
//     let rpp = 100;
//     let where_ = "f.status = 1";
//     let orderby = "f.name";
//     let dir = "ASC";

//     let query =
//       "?language_id=" +
//       language_id_ +
//       "&where_=" +
//       where_ +
//       "&orderby=" +
//       orderby +
//       "&dir=" +
//       dir +
//       "&offset=" +
//       offset +
//       "&rpp=" +
//       rpp;

//     let jso = {};

//     //console.log(query);
//     crudaction(jso, "/frameworks" + query, "GET", function (result) {
//       if (result.all_totals > 0) {
//         let data = result["data"];
//         let frm = `<select  class="fancy-select" id="sel_framework" onchange="loadCodesnippetsLink()">
//         <option value="0"> No Framework</option>`;

//         //check for previously selected framework
//         let current_loc = currentLoc();
//         let framework_prev_sel;

//         for (var i = 0; i < data.length; i++) {
//           var uid = data[i].uid;
//           var title = data[i].name;
//           //var icon = data[i].icon;

//           if (current_loc && current_loc.framework) {
//             let framework_sel = current_loc.framework;
//             if (framework_sel == uid) {
//               framework_prev_sel = "SELECTED";
//             } else {
//               framework_prev_sel = "";
//             }
//           }

//           frm += `<option ${framework_prev_sel} value="${uid}">${title}</option>`;
//         }

//         $("#framework-dropdown").html(frm + "</select>");
//         //load to code snippet based on id parsed to the load framework function which is called on clicking language list
//         loadCodesnippetsLink();
//       } else {
//         //////-------No Frameworks found
//         $("#framework-dropdown").html(frm + "</select>");
//         loadCodesnippetsLink();
//       }
//     });
//   } else {
//     //console.log("No Language id value found");
//     $("#framework-dropdown").html("");
//   }
// }

////////-------------End Implementations

//////------------------------------------Begin Profile
function populateProfile() {
  let current_loc = currentLoc();
  if (current_loc && current_loc.user) {
    let user = current_loc.user;
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
function title_update(title) {
  $("#codeimp-title").html("<h4>" + title + "</h4>");
}

//////----------------------------------Begin comments
function getCommentsByCodesnippetId(clistId = 0) {
  let current_loc = currentLoc();

  let code_id;
  if (current_loc.code_sel) {
    code_id = current_loc.code_sel.uid;
  } else {
    return;
  }

  //check for logged in user to hide actions that needs authorization
  let comment_author;
  if (current_loc && current_loc.user && current_loc.user.uid) {
    comment_author = current_loc.user.uid;
  }

  //let li = $(`#${clistId}`);
  let cur_page;
  if (document.getElementById(`${clistId}`)) {
    let li = document.getElementById(`${clistId}`);
    //console.log("Unfiltered list value => ", li);
    li = (li.textContent || li.innerText).trim();
    if (li.length > 1) {
      cur_page = li[0];
    }
    if (li.length == 1) {
      cur_page = li;
    }
    persistence("cur_page", li);
  } else {
    let current_loc = currentLoc();
    if (current_loc && current_loc.cur_page) {
      cur_page = current_loc.cur_page;
    } else {
      cur_page = 1;
    }
  }
  cur_page--; //decrement by one to align with db offsets multiples
  let rpp = 5;
  let where_ = `cmt.code_snippet_id = ${code_id} AND cmt.replying_to = 0 AND cmt.status = 1`;
  let orderby = "cmt.uid"; //cmt denote an alias for pr_comments table
  let dir = "DESC";
  let offset = cur_page;
  if (cur_page > 0) {
    offset = cur_page * rpp;
  }

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

  crudaction({}, "/comments-by-codeid" + query, "GET", function (result) {
    //comment loading indicator
    $("#outer-c").html("<i>Loading...</i>");

    let row = "";
    let total_records = 0;
    if (result && result.data && result.data.length > 0) {
      //console.log("Comments available", result);
      let { data } = result;
      let count = data.length;
      total_records = result.total_records;

      //persistence("code_comments_total", total_records);

      for (let i = 0; i < count; i++) {
        //console.log(data[i].comment_body);
        let author_name = data[i].author_name;
        let hicon = data[i].author_name[0];
        let posted_date_ = reformatDate(data[i].added_date);
        let posted_date = momentDatetime(posted_date_);
        let tag_name = data[i].tag_name;
        let tag_icon = data[i].tag_icon;
        let tag_color = data[i].tag_color;
        let comment_body = data[i].comment_body;
        let replies = data[i].total_replies;
        let votes = data[i].votes;
        let comment_id = (commentReplyId = data[i].uid);
        let replying_to = data[i].replying_to;
        let author_id = data[i].author_id;
        let repliesView = `<a class="a-alt"><i class="fe fe-corner-up-left"></i> 0 Replies </a>`;

        if (replies == 0) {
          repliesView = `<a class="a-alt"><i class="fe fe-corner-up-left"></i> ${replies} Replies </a>`;
        }

        if (replies == 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${comment_id}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Reply </a>`;
        }

        if (replies > 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${commentReplyId}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Replies </a>`;
        }

        let toggleActionsView = "";
        if (author_id === comment_author) {
          toggleActionsView = `
            <div class="col-sm-3" id="load-cmt${comment_id}">
            ${repliesView}
            </div>

            <div class="col-sm-5">
                <a title="reply" class="font-weight-bold btn-sm btn-outline-primary" href="javascript:void(0)" onclick="toggleCommentForm('${comment_id}', 'reply')"><i class="fa fa-mail-reply"></i> Reply</a>
                <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" title="Upvote" class="font-weight-bold btn-sm btn-outline-success" href="javascript:void(0)"><i class="fa fa-thumbs-up"></i></a>
                <span id="comment${comment_id}-votes"> ${votes} </span>
                <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" title="Downvote" class="font-weight-bold btn-sm btn-outline-danger" href="javascript:void(0)"><i class="fa fa-thumbs-down"></i></a>
            </div>
            <div class="col-sm-4">
                <a onclick="toggleCommentForm(${comment_id}, 'edit comment', ${replying_to})" title="edit comment" class="font-weight-bold btn-sm btn-outline-warning" href="javascript:void(0)"><span><i class="fe fe-edit"></i> Edit</span></a>
                <a onclick="deleteComment(${comment_id} ,${replying_to})" title="delete comment" class="font-weight-bold btn-sm btn-outline-danger" href="javascript:void(0)"><span><i class="fe fe-trash-2"></i> Delete</span></a>
            </div>
          `;
        } else {
          toggleActionsView = `
          <div class="col-sm-4" id="load-cmt${comment_id}">
            ${repliesView}
          </div>
          <div class="col-sm-4">
            <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> <span id="comment${comment_id}-votes">${votes} </span></a>
          </div>
          <div class="col-sm-4 pull-right">
            <a title="reply" onclick="toggleCommentForm('${comment_id}', 'reply')" class="font-weight-bold btn-sm btn-outline-primary" href="javascript:void(0)"><i class="fa fa-mail-reply"></i> Reply</a>
            <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-success" href="javascript:void(0)"><i class="fa fa-thumbs-up"></i></a>
            <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-danger" href="javascript:void(0)"><i class="fa fa-thumbs-down"></i></a>
          </div>
          `;
        }

        row += `<div class="comment_box">
          <div class="row">
            <div class="col-sm-1"><div class="hicon">${hicon}</div></div>
            <div class="col-sm-11">
                <div class="row chead">
                    <div class="col-sm-9 cwho">
                        ${author_name}  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> ${posted_date}</span>
                    </div>
                    <div class="col-sm-3">
                        <label class="font-12 font-weight-bold ${tag_color}"><i class="${tag_icon}"></i> ${tag_name}</label>
                    </div>
                </div>
                <div class="row cbody">
                    <div class="col-sm-12" id="cdisply${comment_id}">
                       ${comment_body}
                    </div>
                </div>
                <div class="row cfoot">
                   ${toggleActionsView}
                    <div class="mt-2 col-sm-12">
                        <div class="comment_area hide" id="cform${comment_id}">
                          <div class="row">
                              <div class="col-sm-1" id="replyHicon${comment_id}">

                              </div>
                              <input type="hidden" id="comment-edit-id${comment_id}" value="add comment">
                              <div class="col-sm-11"><textarea id="fcbody${comment_id}" class="form-control" placeholder="Leave a comment..."></textarea></div>
                              <div class="offset-sm-1 col-sm-11 error" id="comment${comment_id}Err"></div>
                          </div>
                          <div class="row mt-2">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-8"><button onclick="toggleCommentForm('${comment_id}')" class="btn btn-success btn-sm"><i class=""></i> Cancel</button></div>
                            <div class="col-sm-2"><button onclick="saveComment('${comment_id}')" class="btn btn-success btn-sm"><i class=""></i> Post</button></div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="inner-box${commentReplyId}">
        </div>
      </div>
    `;
      }

      $("#outer-c").html(row);

      //perisist comments with replying_to = 0 to local storage for reference
      persistence("comments", data);
    } else {
      $("#outer-c").html(row);
    }

    paginateComments(total_records);
    paginationRefactor(); //refactor pagination
  });
}

function getCommentReplies(commentReplyId) {
  //content loading indicator
  $(`#load-cmt${commentReplyId}`).html("<i>Loading...</i>");
  let current_loc = currentLoc();

  //check for logged in user to hide actions that needs authorization
  let comment_author;
  if (current_loc && current_loc.user && current_loc.user.uid) {
    comment_author = current_loc.user.uid;
  }
  let offset = 0;
  let rpp = 10;
  let query;
  if (current_loc && current_loc.code_sel) {
    let code_snippet_id = current_loc.code_sel.uid;
    let where_ = `cmt.code_snippet_id=${code_snippet_id} AND cmt.replying_to=${commentReplyId} AND cmt.status=1`;
    query = `?where_=${where_}&offset=${offset}&rpp=${rpp}`;
    //console.log(query);
  } else {
    alert("Oops! No code selected");
    return;
  }

  crudaction({}, `/comments-by-codeid${query}`, "GET", (feed) => {
    let row = "";
    let repliesView = `<a class="a-alt"><i class="fe fe-corner-up-left"></i> 0 Replies </a>`;
    if (feed && feed.data && feed.data.length > 0) {
      //clear loading text
      $(`#load-cmt${commentReplyId}`).html("");
      //console.log("Comments available", feed);
      let { data } = feed;
      let count = data.length;
      let replying_to;

      for (let i = 0; i < count; i++) {
        //console.log(data[i].comment_body);
        let author_name = data[i].author_name;
        let hicon = data[i].author_name[0];
        let posted_date_ = reformatDate(data[i].added_date);
        let posted_date = momentDatetime(posted_date_);
        let tag_name = data[i].tag_name;
        let tag_icon = data[i].tag_icon;
        let tag_color = data[i].tag_color;
        let comment_body = data[i].comment_body;
        let replies = data[i].total_replies;
        let votes = data[i].votes;
        let comment_id = data[i].uid;
        replying_to = data[i].replying_to;
        let author_id = data[i].author_id;
        //console.log("comment id => ", comment_id);

        if (replies == 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${comment_id}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Reply </a>`;
        }
        if (replies > 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${comment_id}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Replies </a>`;
        }

        let toggleActionsView = "";
        if (author_id === comment_author) {
          toggleActionsView = `
            <div class="col-sm-3" id="load-cmt${comment_id}">
            ${repliesView}
            </div>

            <div class="col-sm-5">
                <a title="reply" class="font-weight-bold btn-sm btn-outline-primary" href="javascript:void(0)" onclick="toggleCommentForm('${comment_id}', 'reply')"><i class="fa fa-mail-reply"></i> Reply</a>
                <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" title="Upvote" class="font-weight-bold btn-sm btn-outline-success" href="javascript:void(0)"><i class="fa fa-thumbs-up"></i></a>
                <span id="comment${comment_id}-votes"> ${votes} </span>
                <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" title="Downvote" class="font-weight-bold btn-sm btn-outline-danger" href="javascript:void(0)"><i class="fa fa-thumbs-down"></i></a>
            </div>
            <div class="col-sm-4">
                <a onclick="toggleCommentForm(${comment_id}, 'edit comment', ${replying_to})" title="edit comment" class="font-weight-bold btn-sm btn-outline-warning" href="javascript:void(0)"><span><i class="fe fe-edit"></i> Edit</span></a>
                <a onclick="deleteComment(${comment_id}, ${replying_to})" title="delete comment" class="font-weight-bold btn-sm btn-outline-danger" href="javascript:void(0)"><span><i class="fe fe-trash-2"></i> Delete</span></a>
            </div>
          `;
        } else {
          toggleActionsView = `
          <div class="col-sm-4" id="load-cmt${comment_id}">
            ${repliesView}
          </div>
          <div class="col-sm-4">
          <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> <span id="comment${comment_id}-votes">${votes} </span></a>
          </div>
          <div class="col-sm-4 pull-right">
            <a title="reply" onclick="toggleCommentForm('${comment_id}', 'reply')" class="font-weight-bold btn-sm btn-outline-primary" href="javascript:void(0)"><i class="fa fa-mail-reply"></i> Reply</a>
            <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-success" href="javascript:void(0)"><i class="fa fa-thumbs-up"></i></a>
            <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-danger" href="javascript:void(0)"><i class="fa fa-thumbs-down"></i></a>
          </div>
          `;
        }

        row += `<div class="comment_box inner-box">
          <div class="row">
            <div class="col-sm-1"><div class="hicon">${hicon}</div></div>
            <div class="col-sm-11">
                <div class="row chead">
                    <div class="col-sm-9 cwho">
                        ${author_name}  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> ${posted_date}</span>
                    </div>
                    <div class="col-sm-3">
                        <label class="font-12 font-weight-bold ${tag_color}"><i class="${tag_icon}"></i> ${tag_name}</label>
                    </div>
                </div>
                <div class="row cbody">
                    <div class="col-sm-12" id="cdisply${comment_id}">
                       ${comment_body}
                    </div>
                </div>
                <div class="row cfoot">
                    ${toggleActionsView}
                    <div class="mt-2 col-sm-12">
                        <div class="comment_area hide" id="cform${comment_id}">
                          <div class="row">
                              <div class="col-sm-1" id="replyHicon${comment_id}">

                              </div>
                              <input type="hidden" id="comment-edit-id${comment_id}" value="add comment">
                              <div class="col-sm-11"><textarea id="fcbody${comment_id}" class="form-control" placeholder="Leave a comment..."></textarea></div>
                              <div class="offset-sm-1 col-sm-11 error" id ="comment${comment_id}Err"></div>
                          </div>
                          <div class="row mt-2">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-8"><button onclick="toggleCommentForm('${comment_id}')" class="btn btn-success btn-sm"><i class=""></i> Cancel</button></div>
                            <div class="col-sm-2"><button onclick="saveComment('${comment_id}')" class="btn btn-success btn-sm"><i class=""></i> Post</button></div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="inner-box${comment_id}">
        </div>
      </div>
    `;
      }

      $(`#inner-box${commentReplyId}`).html(row);

      //persist comments with replying_to > 0 to local storage for reference
      if (current_loc && current_loc.comments) {
        let comments = current_loc.comments;
        for (let j = 0; j < data.length; j++) {
          comments.push(data[j]);
        }
        //perisist comment replies with updated content
        persistence("comments", comments);
      } else {
        persistence("comments", data);
      }
    } else {
      //means no replies for this comment, hence clear replies list
      $(`#inner-box${commentReplyId}`).html(row);
      //then revoke current comment replies hyperlink
      $(`#load-cmt${commentReplyId}`).html(repliesView);
    }
  });
}

function toggleCommentForm(
  comment_id = 0,
  action = "add comment",
  replying_to = 0
) {
  //check if a user is logged in before allowing commenting
  let current_loc = currentLoc();
  if (current_loc.user && current_loc.user.uid && current_loc.user.fullname) {
    let replyHicon;
    if (current_loc.user && current_loc.user.fullname) {
      replyHicon = `<div class="hicon">${current_loc.user.fullname[0]}</div>`;
    }
    $(`#replyHicon${comment_id}`).html(replyHicon);
  } else {
    alert(`Please sign in to ${action}`);
    return;
    //gotourl("login");
  }

  //toggle form visibility on function call
  $(`#cform${comment_id}`).toggle();

  //update the comment edit id value with the targeted comment action, the input is hidden type above the textarea
  $(`#comment-edit-id${comment_id}`).val(action);

  //handle case if the form is requested for comment edit purpose and the comment not a reply to another comment
  if (action === "edit comment") {
    //retrieve the comments from local storage from the key comments
    let comments = [];
    let comment_to_edit = {};
    if (current_loc && current_loc.comments) {
      comments = current_loc.comments;
      for (let cc = 0; cc < comments.length; cc++) {
        if (comments[cc].uid == comment_id) {
          comment_to_edit = comments[cc];
          break; //exit the loop
        }
      }
      //load the previous content to the form for editing
      $(`#fcbody${comment_id}`).val(comment_to_edit.comment_body);
    }
  } else {
    //clear the form incase it was loaded with content by edit action
    if ($(`#fcbody${comment_id}`).val().trim().length > 1) {
      $(`#fcbody${comment_id}`).val("");
    }
  }
}

function nextPageBtn() {
  let current_loc = currentLoc();
  let current_page;
  if (current_loc && current_loc.cur_page) {
    current_page = current_loc.cur_page;
    current_page++; //increment current page by 1;

    persistence("cur_page", current_page);

    getCommentsByCodesnippetId(); //load comments for the requested page
  }
}

function prevPageBtn() {
  let current_loc = currentLoc();
  let current_page;
  if (current_loc && current_loc.cur_page) {
    current_page = current_loc.cur_page;
    current_page--; //decrement current page by 1;

    persistence("cur_page", current_page);

    getCommentsByCodesnippetId(); //load comments for the requested page
  }
}

function paginationRefactor() {
  let current_page;
  let last_page;
  let current_loc = currentLoc();
  if (current_loc && current_loc.cur_page && current_loc.last_page) {
    current_page = current_loc.cur_page;
    last_page = current_loc.last_page;
    current_page = current_loc.cur_page;

    if (last_page == 1) {
      $("#next-btn").addClass("disable-list-elem");
      //or document.getElementById("next-btn").style.pointerEvents = "none";
    }

    if (current_page == 1) {
      $("#prev-btn").addClass("disable-list-elem");
      //or document.getElementById("prev-btn").style.pointerEvents = "none";
    }

    if (current_page == last_page && current_page > 1 && last_page > 1) {
      $("#next-btn").addClass("disable-list-elem");
      //or document.getElementById("next-btn").style.pointerEvents = "none";
    }
  }
}

function paginateComments(records) {
  let current_loc = currentLoc();
  //let records = current_loc.code_comments_total;
  //update the value for the total comments displayed

  let commentCountView;
  if (records == 1) {
    commentCountView = `${records} comment`;
  } else {
    commentCountView = `${records} comments`;
  }
  $(`#total-comments`).html(commentCountView);

  let row = "";

  if (records > 0) {
    let rpp = 5;
    let current_page;
    if (current_loc.cur_page) {
      //console.log("current page => ", current_loc.cur_page);
      current_page = current_loc.cur_page;
    }

    let num_of_pages = Math.ceil(records / rpp);
    persistence("last_page", num_of_pages);
    row += `
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item" id="prev-btn" onclick="prevPageBtn()">
                <a class="page-link" href="javascript:void(0)" tabindex="-1">Previous</a>
            </li>
  `;
    for (let i = 1; i <= num_of_pages; i++) {
      if (i == current_page) {
        row += `<li class="page-item active" aria-current="page" id="clist-item${i}">
                  <span class="page-link">
                      ${i}
                      <span class="sr-only">(current)</span>
                  </span>
                </li>`;
      } else {
        row += `<li class="page-item" onclick="getCommentsByCodesnippetId('clist-item${i}')" id="clist-item${i}"><a class="page-link" href="javascript:void(0)">${i}</a></li>`;
      }
    }
    row += `<li class="page-item" id="next-btn" onclick="nextPageBtn()">
                <a class="page-link" href="javascript:void(0)">Next</a>
            </li>
        </ul>
      </nav>`;
    $("#pag-comments").html(row);
  } else {
    $("#pag-comments").html(row);
  }
}

function saveComment(comment_id = 0) {
  //first check if user is logged in before saving the comment
  let added_by;
  let current_loc = currentLoc();
  if (current_loc.user && current_loc.user.uid) {
    added_by = current_loc.user.uid;
  } else {
    gotourl("login");
  }

  let code_snippet_id = parseInt(current_loc.code_sel.uid);
  let replying_to = parseInt(comment_id);
  let tag = 1; //Author
  let comment_body = $(`#fcbody${comment_id}`).val().trim();

  //----checking if there is content in the comment body;
  //Defining error variables with a default value
  let commentErr = true;
  // Validate username
  if (comment_body == "") {
    printError(`comment${comment_id}Err`, "Comment content required");
  } else {
    printError(`comment${comment_id}Err`, "");
    commentErr = false;
  }

  if (commentErr == true) {
    return false;
  }
  ////------End of checking if there is content in the comment body;

  let url = "/add-comment";
  let method = "POST";
  let jso = {
    code_snippet_id,
    comment_body,
    replying_to,
    tag,
    added_by,
  };
  //grab edit-comment-id from the hidden input
  let action = $(`#comment-edit-id${comment_id}`).val();
  if (action == "edit comment" && comment_id > 0) {
    url = "/edit-comment";
    method = "PUT";
    jso = {
      comment_body,
      comment_id,
    };
  }

  //console.log("Comment Details => ", jso);
  crudaction(jso, url, method, (feed) => {
    //console.log("comment save feedback => ", feed);
    if (feed.success) {
      toggleCommentForm(comment_id);
      if (action == "add comment" && replying_to == 0) {
        load_codesnippetById(code_snippet_id);
      } else if (action == "reply" && replying_to > 0) {
        getCommentReplies(replying_to); //re-render comment replies list;
      } else {
        reRenderEditedCommentBody(comment_id); //re-render the comment body
      }
      successToast(feed.message);
    } else {
      errorToast(feed.message);
    }
  });
}

function deleteComment(comment_id = 0, replying_to) {
  //console.log("comment id => ", comment_id, ", replying to => ", replying_to);
  let current_loc = currentLoc();
  let code_snippet_id;
  if (current_loc && current_loc.code_sel) {
    code_snippet_id = current_loc.code_sel.uid;
  }
  let query =
    "?replying_to=" + replying_to + "&code_snippet_id=" + code_snippet_id;

  crudaction({ comment_id }, "/del-comment" + query, "DELETE", (feed) => {
    //console.log("comment delete feedback =>", feed);
    if (feed.success) {
      if (replying_to == 0) {
        load_codesnippetById(code_snippet_id);
      }
      if (replying_to > 0) {
        getCommentReplies(replying_to);
      }
      successToast(feed.message);
    } else {
      errorToast(feed.message);
    }
  });
}

function reRenderEditedCommentBody(comment_id) {
  //cdisply${comment_id}
  query = "?comment_id=" + comment_id;

  crudaction({}, "/comment" + query, "GET", (feed) => {
    //console.log(feed.success, feed.data);
    if (feed && feed.success && feed.data && feed.data.comment_body) {
      $(`#cdisply${comment_id}`).html(feed.data.comment_body);
    }
  });
}

function upvoteComment(comment_id, action = "upvote comment") {
  //check if a user is logged in before allowing voting
  let current_loc = currentLoc();
  let user_id = 0;
  if (current_loc && current_loc.user && current_loc.user.uid) {
    user_id = current_loc.user.uid;
  } else {
    return alert(`Please sign in to ${action}`);
  }

  let jso = {
    post_id: comment_id,
    user_id,
    table: "pr_comments",
    upvote: 1,
    downvote: 0,
  };

  crudaction(jso, "/upvote-comment", "PUT", (feed) => {
    if (!feed) {
      return errorToast("Server error");
    }
    if (feed && feed.success == true) {
      $(`#comment${comment_id}-votes`).html(feed.votes);
      return successToast(feed.message);
    }

    if (feed && feed.success == false) {
      return errorToast(feed.message);
    }
  });
}

function downvoteComment(comment_id, action = "downvote comment") {
  //check if a user is logged in before allowing voting
  let current_loc = currentLoc();
  let user_id = 0;
  if (current_loc.user && current_loc.user.uid) {
    user_id = current_loc.user.uid;
  } else {
    return alert(`Please sign in to ${action}`);
  }

  let jso = {
    post_id: comment_id,
    user_id,
    table: "pr_comments",
    upvote: 0,
    downvote: -1,
  };

  crudaction(jso, "/downvote-comment", "PUT", (feed) => {
    if (!feed) {
      return errorToast("Server error");
    }
    if (feed && feed.success == true) {
      $(`#comment${comment_id}-votes`).html(feed.votes);
      return successToast(feed.message);
    }

    if (feed && feed.success == false) {
      return errorToast(feed.message);
    }
  });
}

function reformatDate(date_) {
  let d = new Date(date_);
  let date =
    d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0];
  return date;
}

//friendly datetime formatter
function momentDatetime(targetdt) {
  return moment(targetdt).fromNow();
}

///////----------------------------------End Comments

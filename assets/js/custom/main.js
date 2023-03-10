/// ////////-------Begin Functionalities
function functions_load() {
  // display a spinner
  spinner('#functions_');

  const current_loc = currentLoc(); // get access the data available in the localstorage
  const server = $('#server_').val(); // get the server url for the image retrieval

  // ---check if functions already exist in the localstorage and use as the resource
  if (current_loc && current_loc.allFuns && current_loc.allFuns.data) {
    const { data } = current_loc.allFuns;
    const funs_arr_size = data.length;
    if (funs_arr_size > 0) {
      /// ///////--------Lets Pull All sub functions at the same time
      apiSubfunLoad((sub_result) => {
        /// ///////-----Loop functions while injecting subfunctions
        let fun = '';
        let func_sel = 0;
        let active_func = '';
        let subfunc_sel = 0;

        for (let i = 0; i < funs_arr_size; i++) {
          const function_id = data[i].uid;
          const function_name = data[i].name;
          const function_icon = data[i].icon;

          if (current_loc && current_loc.func > 0) {
            func_sel = current_loc.func;
            if (function_id == func_sel) {
              active_func = 'active-two';
            } else {
              active_func = '';
            }
          }

          fun += `<li class="outer_list" id="func-item-${function_id}"> 
          <a id="funcitem${function_id}" class="${active_func} func-item has-arrow arrow-b" href="javascript:void(0)" 
          onclick="highlightFun(); parseInnerListId('${function_id}'); submenu('#fun${function_id}'); title_update('${function_name}'); persistence('func',${function_id}); persistence_remove('subfunc'); getAllSolns('${function_id}','','','','');">
          <img class="icon" src="${server}/${function_icon}"/>
          <span data-hover="${function_name}">&nbsp;${function_name}</span></a>`;

          /// //------Loop through sub functions
          const sub_data = sub_result.data;
          const sub_data_length = sub_data.length;

          if (sub_data_length > 0) {
            let active_subfunc = '';

            fun += `<ul class="inner_list" style="display: none;" id="fun${function_id}">`;

            for (let s = 0; s < sub_data_length; s++) {
              const funct_id = sub_data[s].function_id;

              if (function_id === funct_id) {
                const subfunction_id = sub_data[s].uid;
                const subfunction_name = sub_data[s].name;

                if (current_loc && current_loc.subfunc >= 0) {
                  subfunc_sel = current_loc.subfunc;
                  if (subfunction_id == subfunc_sel) {
                    // console.log("FOUND AN ACTIVE SUBFUNCTION");
                    active_subfunc = 'active-two';
                  } else {
                    active_subfunc = '';
                  }
                }
                fun += `<li class="subfunc_" id="subfunc-item-${subfunction_id}">
              <a class="subfunc${function_id} subfunc-item ${active_subfunc}" href="javascript:void(0)" 
              onclick="subfun('#fun${function_id}'); title_update('${function_name} / ${subfunction_name}'); persistence('func', ${function_id}); persistence('subfunc', ${subfunction_id}); highlightSubfun('${function_id}'); getAllSolns('','${subfunction_id}','','','');">
               <span class="subfun_" data-hover="${subfunction_name}"><i class="fe fe-chevrons-right" data-toggle="tooltip" title="" data-original-title="fe fe-arrow-up-right"></i>${subfunction_name}</span>
              </a>
              </li>`;
              }
            }
            fun += '</ul>';
          }
          fun += '</li>';
        }
        $('#functions_').html(fun);

        // call the auto scroller
        scrollElementIntoView2(func_sel);
      });
    } else {
      $('#functions_').html('No record found');
    }
  } else {
    /// //----------------load data from the server
    const status = 1;
    const orderby = 'name';
    const dir = 'ASC';
    const jso = {};
    const search_ = '';

    const query = `?status=${
      status
    }&orderby=${
      orderby
    }&dir=${
      dir
    }&offset=${
      0
    }&rpp=${
      500
    }&search=${
      search_}`;

    crudaction(jso, `/functionalities${query}`, 'GET', (result) => {
      if (result && result.data && result.data.length > 0) {
        // persist the data for later use
        persistence('allFuns', result);

        const { data } = result;
        const data_length = data.length;

        /// ///////--------Lets Pull All sub functions at the same time
        apiSubfunLoad((sub_result) => {
          /// ///////-----Loop functions while injecting subfunctions
          let fun = '';
          let func_sel = 0;
          let subfunc_sel = 0;
          let active_func = '';

          for (let i = 0; i < data_length; i++) {
            const function_id = data[i].uid;
            const function_name = data[i].name;
            const function_icon = data[i].icon;

            if (current_loc && current_loc.func > 0) {
              func_sel = current_loc.func;
              if (function_id == func_sel) {
                active_func = 'active-two';
              } else {
                active_func = '';
              }
            }

            fun += `<li class="outer_list" id="func-item-${function_id}"> 
            <a id="funcitem${function_id}" class="${active_func} func-item has-arrow arrow-b" href="javascript:void(0)" 
            onclick="highlightFun(); parseInnerListId('${function_id}'); submenu('#fun${function_id}'); title_update('${function_name}'); persistence('func',${function_id}); persistence_remove('subfunc'); getAllSolns('${function_id}','','','','');">
            <img class="icon" src="${server}/${function_icon}"/>
            <span data-hover="${function_name}">&nbsp;${function_name}</span></a>`;

            /// //------Loop through sub functions
            const sub_data = sub_result.data;
            const sub_data_length = sub_data.length;

            if (sub_data_length > 0) {
              let active_subfunc = '';

              fun += `<ul class="inner_list" style="display: none;" id="fun${function_id}">`;

              for (let s = 0; s < sub_data_length; s++) {
                const funct_id = sub_data[s].function_id;

                if (function_id === funct_id) {
                  const subfunction_id = sub_data[s].uid;
                  const subfunction_name = sub_data[s].name;

                  if (current_loc && current_loc.subfunc >= 0) {
                    subfunc_sel = current_loc.subfunc;
                    if (subfunction_id == subfunc_sel) {
                      // console.log("FOUND AN ACTIVE SUBFUNCTION");
                      active_subfunc = 'active-two';
                    } else {
                      active_subfunc = '';
                    }
                  }
                  fun += `<li class="subfunc_" id="subfunc-item-${subfunction_id}">
                <a class="subfunc${function_id} subfunc-item ${active_subfunc}" href="javascript:void(0)" 
                onclick="subfun('#fun${function_id}'); title_update('${function_name} / ${subfunction_name}'); persistence('func', ${function_id}); persistence('subfunc', ${subfunction_id}); highlightSubfun('${function_id}'); getAllSolns('','${subfunction_id}','','','');">
                 <span class="subfun_" data-hover="${subfunction_name}"><i class="fe fe-chevrons-right" data-toggle="tooltip" title="" data-original-title="fe fe-arrow-up-right"></i>${subfunction_name}</span>
                </a>
                </li>`;
                }
              }
              fun += '</ul>';
            }
            fun += '</li>';
          }
          $('#functions_').html(fun);

          // call the auto scroller
          scrollElementIntoView2(func_sel);
        });
      } else {
        $('#functions_').html('No record found');
      }
    });
  }
}

function parseInnerListId(id) {
  $('#inner-list-dom-id').val(`#fun${id}`);
  $('#inner-list-dom-class').val(`.subfunc${id}`);
}

function subfun() {}

function scrollElementIntoView2(dbId) {
  submenu(`#fun${dbId}`);
  setTimeout(() => {
    const funcItem = document.getElementById(`func-item-${dbId}`);
    if (funcItem) {
      funcItem.scrollIntoView({ block: 'nearest' });
    }
  }, 50);
}

// subfunction menu toggler
function submenu(id) {
  $(id).toggle();
  const idNum = id.match(/\d/g).join('');
  $(`.subfunc-${idNum}`).show();
}

function highlightSubfun(funId) {
  $('.func-item').removeClass('active-two'); // ensures all functions in the list are not highlighted

  $('.subfunc-item').removeClass('active-two'); /// /ensures all subfunctions in the list are not highlighted

  $(`#funcitem${funId}`).addClass('active-two'); // allow function highlighting onclicking subfunction after searching

  $('#inner-list-dom-id').val(`#fun${funId}`);
  $('#inner-list-dom-class').val(`.subfunc${funId}`);

  const inner_list_id = $('#inner-list-dom-id').val();
  const inner_list_class = $('#inner-list-dom-class').val();

  // highlights the clicked subfunction
  $(`.func_ ${inner_list_id}`).on('click', inner_list_class, function () {
    // $(`${inner_list_class}`).removeClass("active-two");
    $(this).addClass('active-two');
  });
}

function highlightFun() {
  $('.func_').on('click', '.func-item', function () {
    $('.func_ .func-item').removeClass('active-two'); // ensures no other function in the list is highlighted
    $(this).addClass('active-two');

    const cur_inner_list = $('#inner-list-dom-id').val();
    if (cur_inner_list) {
      lastChar = cur_inner_list.charAt(cur_inner_list.length - 1);
      $(`.inner_list:not(${cur_inner_list})`).fadeOut('fast');
    } else {
      $('.inner_list').fadeOut('fast');
    }
  });
}

/// //------End Functionalities

/// //------Begin subFunctionalities
function apiSubfunLoad(callback) {
  /// ----check if subfuns are available in the localstorage, if so, use the data as the resource instead of loading from server
  const current_loc = currentLoc();
  if (current_loc && current_loc.allSubfuns) {
    const result = current_loc.allSubfuns;
    callback(result);
  } else {
    /// /------------load resource from the server
    const jso = {};
    const status = 1;
    const orderby = 'name';
    const offset = 0;
    const rpp = 500;
    const dir = 'ASC';
    const query = `?status=${
      status
    }&orderby=${
      orderby
    }&dir=${
      dir
    }&offset=${
      offset
    }&rpp=${
      rpp}`;

    crudaction(jso, `/subfunctionalities${query}`, 'GET', (result) => {
      callback(result);
      persistence('allSubfuns', result);
    });
  }
}

function filterSubFuncByFunc() {
  const current_loc = currentLoc();
  if (current_loc && current_loc.allSubfuns) {
    const subfuns = current_loc.allSubfuns.data;

    const sel_fun = parseInt($('#func_sel').val().trim());
    let subfun = '<option value="">--Select One</option><option value="0">No subfunction</option>';

    if (sel_fun >= 0) {
      const subfunsByFunc = [];
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
        $('#subfunc_sel').html(subfun);
      } else {
        $('#subfunc_sel').html(subfun);
      }
    } else {
      for (let ii = 0; ii < subfuns.length; ii++) {
        subfun += `<option value="${subfuns[ii].uid}">${subfuns[ii].name}</option>`;
      }
      $('#subfunc_sel').html(subfun);
    }
  }
}

/// //------End subFunctionalities

/// ///------Begin Languages
function load_languages() {
  // display a loader
  spinner('#language_');
  const language = persistence_read('language');

  const current_loc = currentLoc(); // get access the data available in the localstorage
  const server = $('#server_').val(); // get the server url for the image retrieval

  // check if languages already exist in the localstorage and use as the resource
  if (current_loc && current_loc.allLangs) {
    const { data } = current_loc.allLangs;
    const langs_arr_size = data.length;

    if (langs_arr_size > 0) {
      let lang = '';
      let lang_sel = '';
      let active_language = '';
      let language_sel;
      const langs_arr_size = data.length;
      for (let i = 0; i < langs_arr_size; i++) {
        const { uid } = data[i];
        const title = data[i].name;
        const { icon } = data[i];
        // check for previously selected languag;
        if (current_loc && current_loc.language > 0) {
          language_sel = current_loc.language;
          if (uid == language_sel) {
            active_language = 'active-two';
          } else {
            active_language = '';
          }
        }
        lang += `<li class="hover-lang" id="lang-item-${uid}" style="margin: 0px; padding: 0px;">
          <a class="lang-item ${active_language}" href="javascript:void(0)"
          onclick="highlightLang(); persistence_remove('allFrams'); persistence_remove('codestyle'); persistence_remove('framework'); persistence('language', ${uid}); getFramsByLang(${uid});  clear_code_screen(); getAllSolns('','','${uid}','','');">
          <img src="${server}/${icon}" height="20px">&nbsp;${title}</a></li>`;

        if (!language) {
          lang_sel += `<a onclick="default_lang(${uid},'${title}');" class="btn btn-outline-secondary">${
            title
          }</a>`;
        }
      }
      $('#language_').html(lang);
      if (!language) {
        $('#language_select_modal').html(`<div class="btn-list">${lang_sel}</div>`);
      }

      if (language_sel) {
        scrollElementIntoView(`lang-item-${language_sel}`);
      }
    } else {
      /// ///-------No Languages found
      $('#language_').html('<li>No Languages</li>');
      $('#language_select_modal').html('Unable to load languages');
    }
  } else {
    /// ----Load resource from the server
    const where_ = 'status = 1';
    const dir = 'ASC';
    const orderby = 'name';
    const offset = 0;
    const rpp = 100;
    const language = persistence_read('language');

    const jso = {};

    const query = `?where_=${
      where_
    }&orderby=${
      orderby
    }&dir=${
      dir
    }&offset=${
      offset
    }&rpp=${
      rpp}`;

    crudaction(jso, `/languages${query}`, 'GET', (result) => {
      if (result && result.data && result.data.length > 0) {
        // pesist the data in localstorage for later reference
        persistence('allLangs', result);

        const { data } = result;
        let lang = '';
        let lang_sel = '';
        let active_language = '';
        let language_sel;
        const langs_arr_size = data.length;
        for (let i = 0; i < langs_arr_size; i++) {
          const { uid } = data[i];
          const title = data[i].name;
          const { icon } = data[i];
          // check for previously selected languag;
          if (current_loc && current_loc.language > 0) {
            language_sel = current_loc.language;
            if (uid == language_sel) {
              active_language = 'active-two';
            } else {
              active_language = '';
            }
          }
          lang += `<li class="hover-lang" id="lang-item-${uid}" style="margin: 0px; padding: 0px;">
          <a class="lang-item ${active_language}" href="javascript:void(0)"
          onclick="highlightLang(); persistence_remove('allFrams'); persistence_remove('codestyle'); persistence_remove('framework'); persistence('language', ${uid}); getFramsByLang(${uid}); getAllSolns('','','${uid}','',''); clear_code_screen();">
          <img src="${server}/${icon}" height="20px">&nbsp;${title}</a></li>`;
          if (!language) {
            lang_sel += `<a onclick="default_lang(${uid},'${title}');" class="btn btn-outline-secondary"> ${
              title
            }</a>`;
          }
        }
        $('#language_').html(lang);
        if (!language) {
          $('#language_select_modal').html(`<div class="btn-list">${lang_sel}</div>`);
        }

        if (language_sel) {
          scrollElementIntoView(`lang-item-${language_sel}`);
        }
      } else {
        /// ///-------No Languages found
        $('#language_').html('<li>No Languages</li>');
        $('#language_select_modal').html('Unable to load languages');
      }
    });
  }
}
function default_lang(uid, name) {
  persistence('language', uid);
  highlightLang();
  successToast(`We will show you more of ${name}`);
  hidewelcome();
  getAllSolns('', '', '', '', '');
}

function highlightLang() {
  // $('#sel_framework').val("-1");
  // $('#sel_codestyle').val("0");
  $('.lang_').on('click', '.lang-item', function () {
    $('.lang_ .lang-item').removeClass('active-two');
    $(this).addClass('active-two');
  });
}

function scrollElementIntoView(listId) {
  // console.log("active language item => ", listId);
  setTimeout(() => {
    const lastChar = listId.charAt(listId.length - 1);
    const element = document.getElementById(listId);
    if (lastChar != '0') {
      element.scrollIntoView({
        block: 'nearest',
      });
    }
  }, 100);
}

/// ///---------------------End Languages

/// ///------Begin framework
function filterFramsByLang() {
  // meant for the code-add-edit form page
  const current_loc = currentLoc();
  if (current_loc && current_loc.allFrams) {
    const frams = current_loc.allFrams;

    const sel_lang = parseInt($('#language_sel').val().trim());
    let fram = '<option value="">--Select One</option><option value="0">No Framework</option>';

    if (sel_lang >= 0) {
      const framsByLang = []; // initialize available frameworks for a particular language as empty array
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
        $('#framework_sel').html(fram);
      } else {
        $('#framework_sel').html(fram);
      }
    } else {
      for (let ii = 0; ii < frams.length; ii++) {
        fram += `<option value="${frams[ii].uid}">${frams[ii].name}</option>`;
      }
      $('#framework_sel').html(fram);
    }
  }
}

function persistFram() {
  persistence('framework', parseInt($('#sel_framework').val()));
}

function persistCodestyle() {
  persistence('codestyle', parseInt($('#sel_codestyle').val()));
}

function getAllFrams() {
  const current_loc = currentLoc(); // get access to the data available in the localstorage

  // ---check if frameworks already exist in the localstorage and use as the resource
  if (current_loc && current_loc.allFrams) {
    const data = current_loc.allFrams;
    const frams_arr_size = data.length;
    let row = `<select class='fancy-select form-control' id = 'sel_framework' onchange='persistFram();  clear_code_screen();'>
    `;
    if (frams_arr_size > 0) {
      let active_fram;

      if (current_loc && parseInt(current_loc.framework) != NaN) {
        active_fram = current_loc.framework;
      }
      const frams_arr_size = data.length;
      for (let i = 0; i < frams_arr_size; i++) {
        const fram_id = data[i].uid;
        const fram_name = data[i].name;

        if (fram_id == active_fram) {
          row += `<option SELECTED value="${fram_id}">${fram_name}</option>`;
        } else {
          row += `<option value="${fram_id}">${fram_name}</option>`;
        }
      }
      // display framework select box
      $('#framework-dropdown').html(`${row}</select>`);
    } else {
      row = `
      <select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','','');">
        <option value = "">All Frameworks</option>
        <option value = "0">No Framework</option>
      </select>
      `;
      $('#framework-dropdown').html(row); /// /no framework
    }
  } else {
    /// ---Load resource from the server
    const offset = 0;
    const rpp = 500;
    const where_ = 'f.status = 1';
    const orderby = 'f.name';
    const dir = 'ASC';

    const query = `?where_=${
      where_
    }&orderby=${
      orderby
    }&dir=${
      dir
    }&offset=${
      offset
    }&rpp=${
      rpp}`;

    crudaction({}, `/frameworks${query}`, 'GET', (feed) => {
      let row = `<select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','',''); clear_code_screen();">
    `;

      if (feed && feed.data && feed.data.length > 0) {
        const { data } = feed;
        const index = data.findIndex((o) => o.uid == 0);

        if (index !== -1) data.splice(index, 1);

        // append the framework data with uid as the first object within the array
        data.unshift({
          description: '',
          icon: '',
          language: '',
          language_id: 0,
          name: 'No Framework',
          status: 1,
          uid: 0,
        });

        data.unshift({
          description: '',
          icon: '',
          language: '',
          language_id: 0,
          name: 'All Frameworks',
          status: 1,
          uid: '',
        });
        let active_fram;

        if (current_loc && parseInt(current_loc.framework) != NaN) {
          active_fram = current_loc.framework;
        }
        const frams_arr_size = data.length;
        for (let i = 0; i < frams_arr_size; i++) {
          const fram_id = data[i].uid;
          const fram_name = data[i].name;

          if (fram_id == active_fram) {
            row += `<option SELECTED value="${fram_id}">${fram_name}</option>`;
          } else {
            row += `<option value="${fram_id}">${fram_name}</option>`;
          }
        }
        // display framework select box
        $('#framework-dropdown').html(`${row}</select>`);

        // persist the data for later use
        persistence('allFrams', data);
      } else {
        row = `
        <select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','',''); clear_code_screen();">
          <option value = "">All Frameworks</option>
          <option value = "0">No Framework</option>
        </select>
      `;
        $('#framework-dropdown').html(row); /// /no framework
      }
    });
  }
}

function getFramsByLang(lang_id) {
  const current_loc = currentLoc(); // get access to the data available in the localstorage

  // ---check if frameworks already exist in the localstorage and use as the resource
  if (current_loc && current_loc.allFrams) {
    const data = current_loc.allFrams;
    const frams_arr_size = data.length;
    let row = `<select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','',''); clear_code_screen();">
    `;

    if (frams_arr_size > 0) {
      let active_fram;
      if (current_loc && parseInt(current_loc.framework) != NaN) {
        active_fram = current_loc.framework;
      }
      const frams_arr_size = data.length;
      for (let i = 0; i < frams_arr_size; i++) {
        const fram_id = data[i].uid;
        const fram_name = data[i].name;

        if (fram_id == active_fram) {
          row += `<option SELECTED value="${fram_id}">${fram_name}</option>`;
        } else {
          row += `<option value="${fram_id}">${fram_name}</option>`;
        }
      }
      // display framework select box
      $('#framework-dropdown').html(`${row}</select>`);
    } else {
      row = `
      <select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','',''); clear_code_screen();">
        <option value = "">All Frameworks</option>
        <option value = "0">No Framework</option>
      </select>
      `;

      $('#framework-dropdown').html(row); /// /no framework
    }
  } else {
    /// ----Load resource from the server
    const offset = 0;
    const rpp = 100;
    const where_ = 'f.status = 1';
    const orderby = 'f.name';
    const dir = 'ASC';

    const query = `?language_id=${
      lang_id
    }&where_=${
      where_
    }&orderby=${
      orderby
    }&dir=${
      dir
    }&offset=${
      offset
    }&rpp=${
      rpp}`;

    crudaction({}, `/frameworks${query}`, 'GET', (feed) => {
      let row = `<select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','',''); clear_code_screen();">
    `;

      if (feed && feed.data && feed.data.length > 0) {
        const { data } = feed;
        const index = data.findIndex((o) => o.uid == 0);

        if (index !== -1) data.splice(index, 1);

        // append the framework data with uid as the first object within the array
        data.unshift({
          description: '',
          icon: '',
          language: '',
          language_id: 0,
          name: 'No Framework',
          status: 1,
          uid: 0,
        });

        data.unshift({
          description: '',
          icon: '',
          language: '',
          language_id: 0,
          name: 'All Frameworks',
          status: 1,
          uid: '',
        });

        let active_fram;
        if (current_loc && parseInt(current_loc.framework) != NaN) {
          active_fram = current_loc.framework;
        }
        const frams_arr_size = data.length;
        for (let i = 0; i < frams_arr_size; i++) {
          const fram_id = data[i].uid;
          const fram_name = data[i].name;

          if (fram_id == active_fram) {
            row += `<option SELECTED value="${fram_id}">${fram_name}</option>`;
          } else {
            row += `<option value="${fram_id}">${fram_name}</option>`;
          }
        }
        // display framework select box
        $('#framework-dropdown').html(`${row}</select>`);
      } else {
        row = `
      <select class='fancy-select form-control' id = 'sel_framework' onchange="persistFram(); getAllSolns('','','','',''); clear_code_screen();">
        <option value = "">All Frameworks</option>
        <option value = "0">No Framework</option>
      </select>
      `;

        $('#framework-dropdown').html(row); /// /no framework
      }
    });
  }
}

/// ///---------------------End frameworks

/// ///------Begin codeSnippet
function codesnippetValidate() {
  // Retrieving the values of form elements
  // let codesnippet_id = $("#code_edit_id").val();
  const func_id = $('#func_sel').val();
  const subfunc_id = $('#subfunc_sel').val();
  const language_id = $('#language_sel').val();
  const selectedLang = $('#language_sel option:selected').text();
  const framework_id = $('#framework_sel').val();
  const lang_impl_type_id = $('#sel_lang_impl').val();
  const user_impl_type_id = $('#sel_user_impl').val();
  let title = $('#codeimpl_title').val().trim();
  const row_code = $('#code_input').val().trim();
  const file_extension = $('#file_extension').val().trim();
  const editorKey = 'instructions_input';
  const instructions = myeditors2 && myeditors2[editorKey]
    ? myeditors2[editorKey].getData().trim()
    : $(`#${editorKey}`).val().trim();

  let added_by;
  // grab the current logged in user
  const current_loc = currentLoc();
  if (current_loc) {
    const { user } = current_loc;
    added_by = user.uid;
  } else {
    gotourl('login');
    return;
  }

  // Defining error variables with a default value
  let funErr = (subfunErr = langErr = framErr = langImplErr = userImplErr = titleErr = codeErr = fileExtErr = instrErr = true);

  // Validate function
  if (func_id == '') {
    printError('funErr', 'Please select function');
  } else {
    printError('funErr', '');
    funErr = false;
  }

  // Validate subfunction
  if (subfunc_id == '') {
    printError('subfunErr', 'Please select subfunction');
  } else {
    printError('subfunErr', '');
    subfunErr = false;
  }

  // Validate language
  if (language_id == '') {
    printError('langErr', 'Please select language');
  } else {
    printError('langErr', '');
    langErr = false;
  }

  // Validate framework
  if (framework_id == '') {
    printError('framErr', 'Please select framework');
  } else {
    printError('framErr', '');
    framErr = false;
  }

  // Validate language implementation
  if (lang_impl_type_id == '') {
    printError('langImplErr', 'Please select language implementation type');
  } else {
    printError('langImplErr', '');
    langImplErr = false;
  }

  // Validate language implementation
  if (user_impl_type_id == '') {
    printError('userImplErr', 'Please select your implementation type');
  } else {
    printError('userImplErr', '');
    userImplErr = false;
  }

  // Validate title
  if (title == '') {
    printError('titleErr', 'Please add a user friendly code title');
  } else {
    // printError("titleErr", "");
    // titleErr = false;
    // let unsafeChar = "";

    const regex = /^[a-zA-Z0-9.',?@&#-\s]+$/;
    if (regex.test(title) === false) {
      printError(
        'titleErr',
        'Title should not contain some special characters like /, <, and >. We recommend using aplhabets for the title.',
      );
    } else {
      title += ` in ${selectedLang}`;
      printError('titleErr', '');
      titleErr = false;
    }
  }

  // Validate code
  if (row_code == '') {
    printError('codeErr', 'Please enter your code');
  } else {
    printError('codeErr', '');
    codeErr = false;
  }

  // Validate file extension
  if (file_extension == '') {
    printError('fileExtErr', 'File extension used with code added is required');
  } else {
    printError('fileExtErr', '');
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
    (funErr
      || subfunErr
      || langErr
      || framErr
      || langImplErr
      || userImplErr
      || titleErr
      || codeErr
      || fileExtErr) == true
  ) {
    return false;
  }
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
  // pass the data for saving;
  saveCodeSnippet(data);
}

function saveCodeSnippet(data) {
  // show disabled/processing button
  disabledBtn('#addEditCodeBtn');
  const codesnippet_id = $('#code_edit_id').val();
  let method = 'POST';
  let url = '/add-codesnippet';
  let jso = data;

  if (codesnippet_id > 0) {
    method = 'PUT';
    url = '/edit-codesnippet';
    data.codesnippet_id = codesnippet_id;
    jso = data;
  }

  // make api request
  crudaction(jso, url, method, (feed) => {
    if (feed) {
      // return the normal button
      submitBtn('#addEditCodeBtn', 'codesnippetValidate();', 'Click to submit');
    }

    if (feed.success === false) {
      const { message } = feed;
      errorToast(message);
    } else if (feed.success === true) {
      const { message } = feed;
      successToast(message);

      // reset form fields on code submission
      document.getElementById('func_sel').selectedIndex = 0;
      document.getElementById('subfunc_sel').selectedIndex = 0;
      document.getElementById('language_sel').selectedIndex = 0;
      document.getElementById('framework_sel').selectedIndex = 0;
      document.getElementById('sel_lang_impl').selectedIndex = 0;
      document.getElementById('sel_user_impl').selectedIndex = 0;
      $('#codeimpl_title').val('');
      $('#code_input').val('');
      $('#file_extension').val('');
      myeditors2 && myeditors2.instructions_input
        ? myeditors2.instructions_input?.setData('')?.trim()
        : $('#instructions_input')?.val('');

      // redirect user to edited codesnippet on successful update
      if (method == 'PUT') {
        // access the next nav url
        const current_loc = currentLoc();
        const nextNav = current_loc && current_loc.gotourl ? current_loc.gotourl : 'index';
        setTimeout(() => {
          gotourl(nextNav);
        }, 2500);
      }
    }
  });
}

function getNavLink(page, query = 'qs=') {
  const host = getCurrentHost();
  let navLink = '';
  const { origin } = getCurrentUrl();
  host == 'localhost'
    ? (navLink = `${origin}/zidi-app/${page}?${query}`)
    : (navLink = `${origin}/${page}?${query}`);

  $('#nav_link').val(navLink);
  return navLink;
}

function contributeCodeNav() {
  const navLink = getNavLink('code-add-edit', 'cid=');
  $('#contribute-code').html(`
  <a class="a-override" onclick='persistence("gotourl", "${navLink}");' href="${navLink}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Contribute New Code</a>
  `);
}

function search_codeSnippet() {
  setTimeout(() => {
    localStorage.searching = 0;
  }, 1000);
  const code_search = $('#search_box').val().trim();
  const status = 1;
  const offset = 0;
  const rpp = 7;
  const orderby = 'uid';
  const dir = 'DESC';
  let searching = 0;
  if ((localStorage.searching)) {
    searching = localStorage.searching;
  } else {
    localStorage.searching = 1;
  }

  if (code_search) {
    const query = `?search_=${code_search}&status=${status}&offset=${offset}&rpp=${rpp}&orderby=${orderby}&dir=${dir}`;
    if (searching === '0') {
      localStorage.searching = 1;
      crudaction({}, `/search-codesnippet${query}`, 'GET', (result) => {
        console.log(result);
        persistence('searched_solns', result.data);
        if (result.success) {
          const totalSearches = result.search_totals;
          const { data } = result;
          if (totalSearches > 0) {
            let tableSearch = '<table class=\'table table-light childClass stack-top shadow-lg p-3 mb-5 bg-white table-condensed\'>';
            for (let i = 0; i < data.length; i++) {
              tableSearch += `<tr><td><a href="javascript:void(0)"  class='pointer a-override a-alt' 
            onclick=\"select_code(${data[i].uid}, '${data[i].title}')">
            <span class="font-16 text-bold">${data[i].title} </span> <br/>
            Contributed By: <i> ${data[i].fullname} </i> on <i> ${data[i].added_date} </i></a></td></tr>`;
            }

            tableSearch += '</table>';
            $('#code_results').slideDown('fast');
            $('#code_results').html(tableSearch);
          } else {
            $('#code_results').slideDown('fast');
            $('#code_results').html(
              `<div class="childClass stack-top card">
            <span class="text-center search-dropdown-noresults">No results</span>
          </div>`,
            );
          }
        } else {
          $('#code_results').slideDown('fast');
          $('#code_results').html(
            `<div class="childClass stack-top card">
          <span class="text-center search-dropdown-noresults">No results</span>
          </div>`,
          );
        }
        localStorage.searching = 0;
      });
    } else {

    }
  } else {
    $('#code_results').fadeOut('fast');
  }
}

function select_code(code_id, title) {
  $('#search_box').val(title);

  // load the selected code using the code uid
  appendCodeUrl(code_id, 'search');
  load_codesnippetById(code_id);
  // $("#code_id_").val(uid);
  $('#code_results').fadeOut('fast');
}

function codeStyles() {
  const data = [

    { uid: 1, name: 'Plain Code' },
    { uid: 2, name: 'Function Based' },
    { uid: 3, name: 'Class Based' },
    { uid: 4, name: 'API Based' },
  ]; // static code style data

  const current_loc = currentLoc(); // access persisted localstorage key values
  // check for the previously loaded code and if avilable grab the codestyle_id
  let active_codestyle;
  if (current_loc && current_loc.codestyle > 0) {
    active_codestyle = current_loc.codestyle;
  }

  let row = "<select class='fancy-select form-control' id = 'sel_codestyle' onchange=\"persistCodestyle(); getAllSolns('','','','','');\"><option value = \"0\" > All Code Styles</option>";
  for (let i = 0; i < data.length > 0; i++) {
    const codestyle_id = data[i].uid;
    const codestyle_title = data[i].name;
    if (codestyle_id === active_codestyle) {
      row += `<option SELECTED value="${codestyle_id}">${codestyle_title}</option>`;
    } else {
      row += `<option value="${codestyle_id}">${codestyle_title}</option>`;
    }
  }

  // display framework select box with frameworks for the selected language
  $('#codestyle-dropdown').html(`${row}<select`);
}

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

function replaceTag(tag) {
  return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
  return str.replace(/[&<>]/g, replaceTag);
}

// default load for all solutions
function loadCodesnippetsLink(action = '') {
  $('.all-solns').show();
  // show a loader
  spinner(
    '#available-solns',
    'spinner-border-sm',
    'd-flex justify-content-center',
  );
  $('.related-soln-container').hide(); // hide related solutions container
  $('#links-title').html('All Solutions');

  const current_loc = currentLoc();
  if (action == 'all_back') {
    if (current_loc && current_loc.all_solns && current_loc.all_solns.length) {
      const total_ = current_loc.all_solns.length;
      if (total_ > 0) {
        const data = current_loc.all_solns;
        // let language_implementation_type;
        let user_implementation_type;
        // let firstChar;
        let language_name;
        let framework;
        let codesnippet_id;

        let solns = '';
        for (let i = 0; i < data.length; i++) {
          user_implementation_type = data[i].user_implementation_type;
          language_name = data[i].language_name;
          framework = data[i].framework;
          language_id = data[i].language_id;
          codesnippet_id = data[i].uid;
          const { title } = data[i];

          if (data[i].framework_id == 0) {
            framework = '';
          } else {
            framework = ` with ${framework} framework`;
          }

          let activeClass = '';
          const curSoln = current_loc && current_loc.code_sel && current_loc.code_sel.uid
            ? current_loc.code_sel.uid
            : '';
          curSoln == codesnippet_id
            ? (activeClass = 'active-two')
            : (activeClass = '');

          solns += `<a href="javascript:void(0)"
                onclick="appendCodeUrl('${codesnippet_id}', ''); load_codesnippetById('${codesnippet_id}');" class="list-group-item ${activeClass} list-group-item-action">
            <span class="badge badge-secondary"><i class="fe fe-arrow-up-left"></i></span>
            ${title} - (<i>${language_name} ${user_implementation_type} ${framework}</i>) </a>`;
        }

        $('#available-solns').html(solns);
      } else {
        // add code version drop down
        $('#available-solns').html(
          '<p class="list-group-item list-group-item-action">No record found</p>',
        );
        persistence_remove('all_solns');
      }
    } else {
      // get resource from the server
      const rpp = 25;
      const offset = 0;
      const sel_func = '';
      const sel_subfunc = '';
      const sel_language = '';
      const sel_framework = '';
      const sel_codestyle = '';

      // persist user selections before sending the request to server, so that they will remain intact even on page refresh
      const status = 1;
      const orderby = 'uid';
      const dir = 'DESC';

      const jso = {};

      const query = `?status=${
        status
      }&orderby=${
        orderby
      }&dir=${
        dir
      }&func_id=${
        sel_func
      }&subfunc_id=${
        sel_subfunc
      }&language_id=${
        sel_language
      }&framework_id=${
        sel_framework
      }&user_impl_type_id=${
        sel_codestyle
      }&offset=${
        offset
      }&rpp=${
        rpp}`;

      crudaction(jso, `/codesnippets${query}`, 'GET', (feed) => {
        // console.log(feed);
        const total_ = feed.all_totals;
        if (total_ > 0) {
          const { data } = feed;

          let user_implementation_type;
          // let firstChar;
          let language_name;
          let framework;
          let codesnippet_id;

          let solns = '';
          for (let i = 0; i < data.length; i++) {
            user_implementation_type = data[i].user_implementation_type;
            language_name = data[i].language_name;
            framework = data[i].framework;
            language_id = data[i].language_id;
            codesnippet_id = data[i].uid;
            const { title } = data[i];

            if (data[i].framework_id == 0) {
              framework = '';
            } else {
              framework = ` with ${framework} framework`;
            }

            solns += `<a href="javascript:void(0)"
                onclick="appendCodeUrl('${codesnippet_id}', ''); load_codesnippetById('${codesnippet_id}');" class="list-group-item list-group-item-action">
            <span class="badge badge-secondary"><i class="fe fe-arrow-up-left"></i></span>
            ${title} - (<i>${language_name} ${user_implementation_type} ${framework}</i>) </a>`;
          }

          $('#available-solns').html(solns);

          persistence('all_solns', feed.data);
        } else {
          // add code version drop down
          $('#available-solns').html(
            '<p class="list-group-item list-group-item-action">No record found</p>',
          );
          persistence_remove('all_solns');
        }
      });
    }
  } else {
    // ------get reource from server
    const rpp = 25;
    const offset = 0;
    const sel_func = current_loc && current_loc.func ? current_loc.func : '';
    const sel_subfunc = current_loc && current_loc.subfunc ? current_loc.subfunc : '';
    const sel_language = current_loc && current_loc.language ? current_loc.language : '';
    const sel_codestyle = current_loc && current_loc.codestyle ? current_loc.codestyle : '';

    let sel_framework = current_loc.framework;
    sel_framework = Number.isFinite(sel_framework) ? sel_framework : '';

    const status = 1;
    const orderby = 'uid';
    const dir = 'DESC';

    const jso = {};

    const query = `?status=${
      status
    }&orderby=${
      orderby
    }&dir=${
      dir
    }&func_id=${
      sel_func
    }&subfunc_id=${
      sel_subfunc
    }&language_id=${
      sel_language
    }&framework_id=${
      sel_framework
    }&user_impl_type_id=${
      sel_codestyle
    }&offset=${
      offset
    }&rpp=${
      rpp}`;

    crudaction(jso, `/codesnippets${query}`, 'GET', (feed) => {
      // console.log(feed);
      const total_ = feed.all_totals;
      if (total_ > 0) {
        const { data } = feed;

        let user_implementation_type;
        // let firstChar;
        let language_name;
        let framework;
        let codesnippet_id;

        let solns = '';
        for (let i = 0; i < data.length; i++) {
          user_implementation_type = data[i].user_implementation_type;
          language_name = data[i].language_name;
          framework = data[i].framework;
          language_id = data[i].language_id;
          codesnippet_id = data[i].uid;
          const { title } = data[i];

          if (data[i].framework_id == 0) {
            framework = '';
          } else {
            framework = ` with ${framework} framework`;
          }

          solns += `<a href="javascript:void(0)"
      onclick="appendCodeUrl('${codesnippet_id}', ''); load_codesnippetById('${codesnippet_id}');" class="list-group-item list-group-item-action">
<span class="badge badge-secondary"><i class="fe fe-arrow-up-left"></i></span>
      ${title} - (<i>${language_name} ${user_implementation_type} ${framework}</i>) </a>`;
        }

        $('#available-solns').html(solns);

        persistence('all_solns', feed.data);
      } else {
        // add code version drop down
        $('#available-solns').html(
          '<p class="list-group-item list-group-item-action">No record found</p>',
        );

        persistence_remove('all_solns');
      }
    });
  }
}
// get related solutions
function getRelatedSolns(codesnippet_id, func_id, subfunc_id, language_id) {
  $('.all-solns').hide();
  $('.related-soln-container').show(); // show the related solutions container
  spinner(
    '#related-solns',
    'spinner-border-sm',
    'd-flex justify-content-center',
  );

  const query = `?func_id=${func_id}&subfunc_id=${subfunc_id}&codesnippet_id=${codesnippet_id}&status=1&language_id=${language_id}`;
  crudaction({}, `/related-solns${query}`, 'GET', (feed) => {
    if (feed && feed.data) {
      // display related solutions
      const { data } = feed;
      const solns_arr_size = data.length;
      let solns = '';
      solns_arr_size == 1
        ? $('#related-soln-title').html('Related Solution')
        : $('#related-soln-title').html('Related Solutions');

      $('#all-solns-nav').html(
        `
        <a href="javascript:void(0)" onclick="back_to_all();" title="Back to All" class="text-blue font-weight-bold text-center"><span class="badge badge-secondary">All <i class="fe fe-corner-up-left"></i></span></a>
        `,
      );

      if (solns_arr_size > 0) {
        for (let i = 0; i < solns_arr_size; i++) {
          user_implementation_type = data[i].user_implementation_type;
          language_name = data[i].language_name;
          framework = data[i].framework;
          language_id = data[i].language_id;
          codesnippet_id = data[i].uid;
          const { title } = data[i];

          if (data[i].framework_id == 0) {
            framework = '';
          } else {
            framework = ` with ${framework} framework`;
          }

          solns += `<a href="javascript:void(0)"  
          onclick="appendCodeUrl('${codesnippet_id}', 'related-solns'); load_codesnippetById('${codesnippet_id}');" class="list-group-item list-group-item-action">
  <span class="badge badge-secondary"><i class="fe fe-arrow-up-left"></i></span>
          ${title} - (<i>${language_name} ${user_implementation_type} ${framework}</i>) </a>`;
        }

        $('#related-solns').html(solns);
        persistence('related_solns', data);
      } else {
        // add code version drop down
        $('#related-solns').html(
          '<p class="list-group-item list-group-item-action">No related solution(s)</p>',
        );
      }
    } else {
      console.log(feed);
      // persistence_remove("all_solns");
    }
  });
}

function getAllSolns(sel_func, sel_subfunc, sel_language, sel_framework, sel_codestyle, search_ = '') {
  if (search_) {
    persistence_remove('language');
    persistence_remove('func');
    persistence_remove('subfunc');
    persistence_remove('framework');
    persistence_remove('codestyle');
  } else {
    if (!sel_language) {
      sel_language = persistence_read('language');
    }
    if (!sel_func) {
      sel_func = persistence_read('func');
    }
    if (!sel_subfunc) {
      sel_subfunc = persistence_read('subfunc');
    }
    if (!sel_framework) {
      sel_framework = persistence_read('framework');
    }
    if (!sel_codestyle) {
      sel_codestyle = persistence_read('codestyle');
    }
  }

  $('#codeareaid').css('display', 'none');
  $('#search_results_all').css('display', 'block');

  // get resource from the server
  const rpp = 25;
  const offset = 0;

  const status = 1;
  const orderby = 'uid';
  const dir = 'DESC';

  const jso = {};

  const query = `?status=${
    status
  }&orderby=${
    orderby
  }&dir=${
    dir
  }&func_id=${
    sel_func
  }&subfunc_id=${
    sel_subfunc
  }&language_id=${
    sel_language
  }&framework_id=${
    sel_framework
  }&user_impl_type_id=${
    sel_codestyle
  }&offset=${
    offset
  }&rpp=${
    rpp
  }&search_=${
    search_}`;

  crudaction(jso, `/codesnippets${query}`, 'GET', (feed) => {
    const total_ = feed.all_totals;
    if (total_ > 0) {
      const { data } = feed;

      let user_implementation_type;
      // let firstChar;
      let language_name;
      let framework;
      let codesnippet_id;

      let solns = '';
      for (let i = 0; i < data.length; i++) {
        user_implementation_type = data[i].user_implementation_type;
        language_name = data[i].language_name;
        framework = data[i].framework;
        language_id = data[i].language_id;
        codesnippet_id = data[i].uid;
        const { title } = data[i];
        const function_name = data[i].fun_name;
        const sub_name = data[i].subfun_name;

        if (data[i].framework_id == 0) {
          framework = '';
        } else {
          framework = ` with ${framework} framework`;
        }
        solns += `${`<a href="javascript:void(0);" onclick="appendCodeUrl('${codesnippet_id}', ''); load_codesnippetById('${codesnippet_id}');" class="list-group-item list-group-item-action">` + '<table class="w-100 font-12"><tr><td colspan="2"><span class="a-override font-16 font-weight-bold"><i class="fa fa-angle-double-right a-override"></i> '}${title} ${framework}</span></td></tr><tr><td>${function_name} › ${sub_name} </td><td>${user_implementation_type}<i> implementation</i></td></tr></table> </a>`
            + '                            ';
      }

      $('#search_results_all').html(solns);

      // persist load solutions
      persistence('all_solns', data);
    } else {
      // add code version drop down
      $('#search_results_all').html(
        '<p class="list-group-item font-22  text-black-50 font-italic list-group-item-action"><i class="fe fe-slash"></i> <span>No solutions found in the selected language</span></p>',
      );
    }
  });
}

function back_to_all() {
  $('#codeareaid').css('display', 'none');
  $('#search_results_all').fadeIn('fast');
  reset_code_view('Select a solution below or click a functionality');
  scrollCommentSection('codeimp-title');
}

function reset_code_view(title = '', subtitle = '') {
  // set code implementation title to initialized default value
  $('#codeimp-title').html(`<h4 class="text-left">${title}</h4>`);
  // $('#framework-dropdown').html("");
  // $('#sel_codestyle').fadeOut("fast");
  // set implementation type and contributor name to intialized default value
  $('#imptype-and-contributor').html(subtitle);

  // empty the code edit link
  $('#edit-code').html('');

  /// //-------Display that no codesnippet found
  configureAceEditor();
}

function codeDetails() {
  const current_loc = currentLoc();
  $('#code-composition').html(`
  <input type="hidden" id="copy-status" value="yes"/>
  <li class="dropdown" id="account-0">
    <div
      class="nav-link dropdown-toggle bg-white btn text-black"
      style="border: none; background-color: #edeff3 !important;"
      data-toggle="dropdown"
      aria-expanded="false"
    >
    <i class="fe fe-code"></i>&nbsp;Code Details
    </div>
    <div class="dropdown-menu" id="code-composition">
    <div class="dropdown-item code-comp text-center card">
    Function<i class="fe fe-arrow-down"></i><span class="text-bold">${
  current_loc && current_loc.code_sel && current_loc.code_sel.fun_name
    ? current_loc.code_sel.fun_name
    : ''
}</span><br>
    Subfunction<i class="fe fe-arrow-down"></i><span class="text-bold">${
  current_loc && current_loc.code_sel && current_loc.code_sel.subfun_name
    ? current_loc.code_sel.subfun_name
    : ''
}</span><br>
    Language<i class="fe fe-arrow-down"></i><span class="text-bold">${
  current_loc && current_loc.code_sel && current_loc.code_sel.language_name
    ? current_loc.code_sel.language_name
    : ''
}</span><br>
    Framework<i class="fe fe-arrow-down"></i><span class="text-bold">${
  current_loc && current_loc.code_sel && current_loc.code_sel.framework_name
    ? current_loc.code_sel.framework_name
    : ''
}</span><br>
    Codestyle<i class="fe fe-arrow-down"></i><span class="text-bold">${
  current_loc && current_loc.code_sel && current_loc.code_sel.codestyle_name
    ? current_loc.code_sel.codestyle_name
    : ''
}</span>
    </div>
    </div>
  </li>`);
}

function appendCodeUrl(code_id, action = '') {
  const current_loc = currentLoc();
  const url = getCurrentUrl();
  const { host } = url;
  const domsection = current_loc && current_loc.dom_sect ? `#${current_loc.dom_sect}` : '';
  let origin = 'https://zidiapp.com';
  if (host == 'localhost') {
    origin = 'http://localhost/zidi-app';
  }
  let c_snippet_title = '';
  if (action == 'search') {
    if (
      current_loc
      && current_loc.searched_solns
      && current_loc.searched_solns.length > 0
    ) {
      const { searched_solns } = current_loc;
      const searched_solns_arr_size = searched_solns.length;

      for (let i = 0; i < searched_solns_arr_size; i++) {
        if (searched_solns[i].uid == code_id) {
          c_snippet_title = searched_solns[i].title;
        }
      }
    }
  } else if (action == 'related-solns') {
    if (
      current_loc
      && current_loc.related_solns
      && current_loc.related_solns.length > 0
    ) {
      const { related_solns } = current_loc;
      const related_solns_arr_size = related_solns.length;

      for (let i = 0; i < related_solns_arr_size; i++) {
        if (related_solns[i].uid == code_id) {
          c_snippet_title = related_solns[i].title;
        }
      }
    }
  } else if (
    current_loc
      && current_loc.all_solns
      && current_loc.all_solns.length > 0
  ) {
    const { all_solns } = current_loc;
    const all_solns_arr_size = all_solns.length;

    for (let i = 0; i < all_solns_arr_size; i++) {
      if (all_solns[i].uid == code_id) {
        c_snippet_title = all_solns[i].title;
      }
    }
  }

  const hyphenatedTitle = hyphenateTitle(c_snippet_title);
  const myUrl = `${origin}/solutions/${code_id}/${hyphenatedTitle}-${domsection}`;
  goTo(myUrl);

  persistence('gotourl', myUrl);
}

function persistUrl() {
  const url = getCurrentUrl() && getCurrentUrl().href ? getCurrentUrl().href : '';
  persistence('gotourl', url);
}

function copyCodesnippet() {
  const copy_status = $('#copy-status').val();
  if (copy_status == 'yes') {
    const codeEditor = ace.edit('editor');
    const codesnippet = codeEditor.getValue();
    const codeLen = codesnippet.match(/[a-zA-Z0-9}{]/g)
      ? codesnippet.match(/[a-zA-Z0-9}{]/g).length
      : 0;

    if (codeLen > 0) {
      navigator.clipboard.writeText(codesnippet); // copy code to clipboard
      successToast('Code copied to clipboard'); // toast a success message
    } else {
    }
  } else {
    errorToast('No valid code to copy');
  }
}

function shareCodesnippet() {
  const copy_status = $('#copy-status').val();
  if (copy_status == 'yes') {
    const codeEditor = ace.edit('editor');
    const codesnippet = codeEditor.getValue();
    const url = getCurrentUrl();
    const solnLink = url.href;

    const codeLen = codesnippet.match(/[a-zA-Z0-9}{]/g)
      ? codesnippet.match(/[a-zA-Z0-9}{]/g).length
      : 0;

    if (codeLen > 0) {
      navigator.clipboard.writeText(solnLink); // copy code to clipboard
      successToast('Share link copied to clipboard'); // toast a success message
    } else {
    }
  } else {
    errorToast('No valid code to share');
  }
}

function clear_code_screen() {
  $('#codeimp-title').html("<h4 class='text-left'>Select an Implementation from the right column</h4>");
  $('#imptype-and-contributor').html('');
  $('#edit-code').html('');

  // $('#editor').html('');
  $('#code-instructions').html('');
  $('#add-comment').html('');
  const codeEditor = ace.edit('editor');
  // --reset code editor to empty string
  codeEditor.setValue('');
}

function load_codesnippetById(codeId) {
  // spinner("#codeimp-title");
  $('#search_results_all').css('display', 'none');
  $('#codeareaid').fadeIn('fast');

  spinner('#imptype-and-contributor', 'spinner-border-sm');

  // show a loader
  spinner('#availables-solns', 'spinner-border-sm');

  const jso = {};
  query = `?codesnippet_id=${codeId}&status=1`;

  crudaction(jso, `/codesnippet${query}`, 'GET', (feed) => {
    let codeImpTitle = ''; // intial default value
    let imptypeAndContributor = ''; // initial default value
    const current_loc = currentLoc();

    // let codeVersions = "";
    if (feed && feed.data && feed.data.uid && feed.data.uid == codeId) {
      // clear load framework dropdown
      const { data } = feed;
      // distructuring variables
      const {
        uid,
        func_id,
        subfunc_id,
        language_id,
        framework_id,
        codestyle_id,
        language_name,
        row_code,
        title,
        instructions,
        added_by,
        provider,
        fullname,
        username,
        total_comments,
      } = data;

      // update code implementation title
      codeImpTitle = title;
      $('#codeimp-title').html(
        `<h4 class='text-left'>${codeImpTitle}</h4>`,
      );

      let displayName = '';
      if (provider === 'Local' || provider === 'Google') {
        displayName = fullname;
      } else if (provider == 'Github') {
        displayName = username;
      } else if (provider == 'Facebook') {
        displayName += displayName;
      } else if (provider == 'Twitter') {
        displayName = fullname;
      }

      imptypeAndContributor = `${"<i class='fe fe-globe'></i> Contributed by: "
        + '<a class="a-override a-alt bold" title="View contributor\'s profile" href="javascript:void(0)">'}${
        safe_tags_replace(displayName)
      }</a>`;

      $('#imptype-and-contributor').html(imptypeAndContributor);

      // toggle edit code button based on whether the logged in user is the same as the author of the displayed code
      if (current_loc && current_loc.user && current_loc.user.uid) {
        const user_id = current_loc.user.uid;
        const { isAdmin } = current_loc.user;

        if (user_id === added_by || isAdmin === 'true') {
          const navLink = getNavLink('code-add-edit', `cid=${uid}`);

          $('#edit-code').html(
            `|<a class="a-override" onclick="persistUrl()" href="${navLink}" class="text-blue font-weight-bold text-center"><i class="fe fe-edit"></i>&nbsp;Edit</a>`,
          );
        } else {
          $('#edit-code').html('');
        }
      } else {
        $('#edit-code').html('');
      }

      /// ---------call ace configuration function
      $('#codesnippet_').val(row_code); // parse codesnippet via hidden instead as a parameter to avoid js problems incase the contains special characters
      configureAceEditor(language_name); // populate codesnippet to the ace editor

      // store inner list id to hidden field
      $('#inner-list-dom-id').val(`#fun${func_id}`);
      $('#inner-list-dom-class').val(`.subfunc${func_id}`);

      // diplay instructions if any
      if (instructions) {
        $('#code-instructions').html(instructions);
      } else {
        $('#code-instructions').html('No Instructions');
      }

      // add comment button
      if (current_loc && current_loc.user && current_loc.user.uid) {
        $('#add-comment').html(
          '<button class="btn pointer  font-weight-bold text-center" onclick="parseEditorId(\'#fcbody0\', 0, \'add comment\');" ><i class="fa fa-comment-o"></i> Leave a Comment</button>',
        );
      } else {
        $('#add-comment').html(
          '<button class="btn pointer cpointer font-weight-bold text-center" onclick="showModal(\'#loginOrRegisterModal\'); persistence(\'dom_sect\',\'add comment\');"  ><i class="fa fa-comment-o"></i> Leave a Comment</button>',
        );

        const loginLink = getNavLink('login');
        const signupLink = getNavLink('register');
        $('#modal-title').html(
          `Please <a class="cpointer modal-nav" href="${loginLink}">Login</a> or <a class="cpointer modal-nav" href="${signupLink}">Sign up</a> to add a comment`,
        );
      }

      // persist code Id to be referenced later
      persistence('code_sel', data);
      persistence('func', func_id);
      persistence('subfunc', subfunc_id);
      persistence('language', language_id);
      persistence('language_name', language_name);
      persistence('framework', framework_id);
      persistence('codestyle', codestyle_id);

      getFramsByLang(language_id); // render frameworks and highlight displayed codesnippet framework
      codeStyles(); /// /render codestyles and highlight displayed codesnippet codestyle
      functions_load(); // render functions and subsfunctions as well as highlight displayed codesnippet function and subfunction
      load_languages(); // render languages and highlight displayed codesnippet language

      codeDetails(); // populate the card with codesnippet/solution details

      // load the current codesnippet related solutions
      getRelatedSolns(uid, func_id, subfunc_id, language_id);

      // retrieve comments for the loaded codesnippet
      const commentCountView = total_comments == 1
        ? `${total_comments} comment`
        : `${total_comments} comments`;
      $('#total-comments').html(commentCountView);
      persistence('total_comments', total_comments);

      getCommentsByCodesnippetId();
      // let dom_sect =
      //   current_loc && current_loc.dom_sect ? current_loc.dom_sect : "";
      // dom_sect ? scrollCommentSection(dom_sect) : "";
      // persistence_remove("dom_sect");
    } else {
      getAllFrams(); // render all frameworks
      codeStyles(); // render codestyle
      functions_load(); // render functions and subfunctions
      load_languages(); // render languages

      // set code implementation title to initialized default value
      $('#codeimp-title').html(codeImpTitle);

      // set implementation type and contributor name to intialized default value
      $('#imptype-and-contributor').html(imptypeAndContributor);

      // empty the code edit link
      $('#edit-code').html('');

      /// //-------Display that no codesnippet found
      configureAceEditor();
    }
  });

  document.getElementById('main_content').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}

function scrollCommentSection(fId) {
  const element = document.getElementById(fId);
  element.scrollIntoView({
    block: 'center',
  });
}
function scrolltoview(vid) {
  const element = document.getElementById(vid);
  element.scrollIntoView({
    behavior: 'smooth', block: 'start', inline: 'nearest',
  });
}

function toggleEditorTheme() {
  const copy_status = $('#copy-status').val();
  const current_loc = currentLoc();
  const { editorTheme } = current_loc;
  if (editorTheme == 'monokai') {
    persistence('editorTheme', 'eclipse');
  } else {
    persistence('editorTheme', 'monokai');
  }

  const lang = current_loc && current_loc.code_sel && current_loc.code_sel.language_name
    ? current_loc.code_sel.language_name
    : '';
  // lang ? configureAceEditor(lang) : configureAceEditor();

  copy_status == 'yes' ? configureAceEditor(lang) : change_theme();
  // if (copy_status == "yes") {
  // }
}

function change_theme() {
  const current_loc = currentLoc();
  const { editorTheme } = current_loc;

  if (editorTheme == 'monokai') {
    $('#editor').removeClass('light-screen');
    $('#editor').addClass('dark-screen');
  } else {
    $('#editor').removeClass('dark-screen');
    $('#editor').addClass('light-screen');
  }
}

function configureAceEditor(lang = '') {
  const current_loc = currentLoc();
  const { editorTheme } = current_loc;
  let language = lang;

  if (editorTheme == 'monokai') {
    $('#editor').removeClass('light-screen');
    $('#editor').addClass('dark-screen');
  } else {
    $('#editor').removeClass('dark-screen');
    $('#editor').addClass('light-screen');
  }

  const codeEditor = ace.edit('editor');
  // --reset code editor to empty string
  codeEditor.setValue('Code Loading....');
  const codesnippet = $('#codesnippet_').val();
  const numOfLines = (codesnippet.match(/\n/g) || []).length; // get the number of lines contained in the codesnippet
  const editorLib = {
    init() {
      codeEditor.setTheme(`ace/theme/${editorTheme}`);

      // Set Languages
      if (lang) {
        language = lang.toLowerCase();
        if (language == 'nodejs') {
          language = 'javascript';
        }
        if (language == 'c#') {
          language = 'csharp';
        }

        if (language == 'c' || language == 'c++') {
          language = 'c_cpp';
        }
      }

      codeEditor.session.setMode(`ace/mode/${language}`);

      // Set Options
      codeEditor.setOptions({
        // fontFamily: "tahoma",
        fontSize: '11pt',
        enableBasicAutocompletion: true,
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        maxLines: numOfLines + 3, // allows the editor to grow based on content size
        // enableLiveAutocompletion: true,
      });

      // display the codesnippet
      codeEditor.setValue(codesnippet);
      codeEditor.clearSelection(); // will ensure editor does not keep the code selected making it greyish

      if (language === 'java') {
        setTimeout(() => {
          formatCode(language);
        }, 50);
      }
    },
  };
  editorLib.init();
}

function formatCode(language) {
  const current_loc = currentLoc();
  const { editorTheme } = current_loc;

  const codeEditor = ace.edit('editor');
  const editorLib = {
    init() {
      // let modelist = ace.require("ace/ext/modelist");
      // Configure Ace
      // ace.config.set("basePath", "assets/plugins/ace/ace-editor/src-min");
      codeEditor.setTheme(`ace/theme/${editorTheme}`);
      codeEditor.session.setMode(`ace/mode/${language}`);
      // Set Options
      const setOptions = {
        // fontFamily: "Inconsolata",
        fontSize: '12pt',
        enableBasicAutocompletion: true,
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
      };
      codeEditor.setValue(js_beautify(codeEditor.getValue(), setOptions));
      codeEditor.clearSelection(); // will ensure the editor does not keep the code selected making it greyish
    },
  };
  editorLib.init();
}

function langAddEdit() {
  const sel_lang = $('#language_sel').val();
  // console.log("selected language => ", sel_lang);
  persistence('langAddEdit', sel_lang);
}

function highlightSelCodeParams(
  func_id,
  subfunc_id,
  lang_id,
  fram_id,
  codestyle_id,
) {
  // highlight the function for the code loaded
  const targetFuncId = `#func-item${func_id}`;
  const targetFuncElem = $(`${targetFuncId}`);
  // alert($(`#func-item${func_id}`).hasClass("has-arrow"));
  if (targetFuncElem) {
    // ("#func-item-" + func_id).addClass("active-two");
    targetFuncElem.toggleClass('active');
  }
}

/// ///---------------------End codeSnippet

/// ///------------------------------------Begin Profile
function populateProfile() {
  const current_loc = currentLoc();
  if (current_loc && current_loc.user) {
    const { user } = current_loc;
    let displayPhoto = '';
    if (user.provider === 'Local' && user.photo) {
      displayPhoto = `<img src='${server_}/user/${user.photo}' style='width: 100px; height: 100px; border-radius: 50%;' />`;
    } else if (user.provider === 'Local' && !user.photo) {
      displayPhoto = `<span class="d-flex justify-content-center align-items-center font-24" style='width: 100px; height: 100px; font-weight: bold; border-radius: 50%; background-color: purple; color: white;'>${user.fullname[0]}</span>`;
    } else {
      displayPhoto = `<img src='${user.photo}' referrerpolicy="no-referrer" style='width: 100px; height: 100px; border-radius: 50%;' />`;
    }

    $('.profile-photo-view').html(displayPhoto);

    $('#profile-info').html(
      `<table class="table table-bordered">
        <tr>
          <td><b>Username</b></td>
          <td>${!user.username ? '----------' : user.username}</td>
        </tr>
        <tr>
          <td><b>Email</b></td>
          <td>${!user.email ? '------------' : user.email}</td>
        </tr>
        <tr>
          <td><b>Fullname</b></td>
          <td>${
  !user.fullname ? '---------' : safe_tags_replace(user.fullname)
}</td>
        </tr>
        <tr>
          <td><b>Country</b></td>
          <td>${!user.country ? '----------' : user.country}</td>
        </tr>
        <tr>
          <td><b>Contribution Rate</b></td>
          <td>50%</td>
        </tr>
      </table>`,
    );
  }
}

/// //-----------------------------------End of profile
/// ----Update title and URL
function title_update(title) {
  $('#codeimp-title').html(`<h4>${title}</h4>`);
}

/// ///----------------------------------Begin comments
function setTargetPage(current_page) {
  persistence('cur_page', parseInt(current_page));
  getCommentsByCodesnippetId();
}

function getCommentsByCodesnippetId() {
  const current_loc = currentLoc();
  let code_id;
  if (current_loc && current_loc.code_sel) {
    code_id = current_loc.code_sel.uid;
  } else {
    return;
  }

  // check for logged in user to hide actions that needs authorization
  let comment_author;
  if (current_loc && current_loc.user && current_loc.user.uid) {
    comment_author = current_loc.user.uid;
  }

  // determining comments load offset;
  let cur_page;
  if (current_loc && current_loc.cur_page) {
    cur_page = current_loc.cur_page;
  } else {
    cur_page = 1;
  }
  const cur_page_ = cur_page - 1; // decrement by one to align with db offsets multiples
  const rpp = 5;
  const where_ = `cmt.code_snippet_id = ${code_id} AND cmt.replying_to = 0 AND cmt.status = 1`;
  const orderby = 'cmt.uid'; // cmt denote an alias for pr_comments table
  const dir = 'DESC';
  let offset = cur_page_;
  if (cur_page_ > 0) {
    offset = cur_page_ * rpp;
  }

  const query = `?where_=${
    where_
  }&orderby=${
    orderby
  }&dir=${
    dir
  }&offset=${
    offset
  }&rpp=${
    rpp}`;

  crudaction({}, `/comments-by-codeid${query}`, 'GET', (result) => {
    // comment loading indicator
    $('#outer-c').html('<i>Loading...</i>');

    let row = '';
    let total_records = result && result.total_records ? result.total_records : 0;
    if (result && result.data && result.data.length > 0) {
      // console.log("Comments available", result);
      const { data } = result;
      const count = data.length;
      total_records = result.total_records;

      // persistence("code_comments_total", total_records);
      for (let i = 0; i < count; i++) {
        // console.log(data[i].comment_body);
        const { author_name } = data[i];
        const hicon = data[i].author_name[0];
        const posted_date_ = reformatDate(data[i].added_date);
        const posted_date = momentDatetime(posted_date_);
        const { tag_name } = data[i];
        const { tag_icon } = data[i];
        const { tag_color } = data[i];
        const { comment_body } = data[i];
        const replies = data[i].total_replies;
        const { votes } = data[i];
        const comment_id = (commentReplyId = data[i].uid);
        const { replying_to } = data[i];
        const { author_id } = data[i];
        let repliesView = '<a class="a-alt"><i class="fe fe-corner-up-left"></i> 0 Replies </a>';

        if (replies == 0) {
          repliesView = `<a class="a-alt"><i class="fe fe-corner-up-left"></i> ${replies} Replies </a>`;
        }

        if (replies == 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${commentReplyId}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Reply </a>`;
        }

        if (replies > 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${commentReplyId}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Replies </a>`;
        }

        // dynamic reply action
        let replyAction = '';
        const user_id = current_loc && current_loc.user && current_loc.user.uid
          ? current_loc.user.uid
          : '';
        if (user_id) {
          replyAction = `<a
              title="reply"
              class="font-weight-bold btn-sm btn-outline-dark"
              href="javascript:void(0)"
              onclick="parseEditorId('#fcbody${comment_id}', '${comment_id}', 'reply');"
            >
              <i class="fe fe-message-square"></i>
            </a>`;
        } else {
          replyAction = `<a
            title="reply"
            class="font-weight-bold btn-sm btn-outline-dark"
            href="javascript:void(0)"
            onclick="showModal('#loginOrRegisterModal')"
          >
            <i class="fe fe-message-square"></i> 
          </a>`;

          const loginLink = getNavLink('login');
          const signupLink = getNavLink('register');
          $('#modal-title').html(
            `Please <a class="cpointer modal-nav" href="${loginLink}">Login</a> or <a class="cpointer modal-nav" href="${signupLink}">Sign up</a> to reply a comment`,
          );
        }

        let toggleActionsView = '';
        if (author_id === comment_author) {
          toggleActionsView = `
            <div class="col-sm-3" id="load-cmt${comment_id}">
            ${repliesView}
            </div>
            <div class="col-sm-5">
                ${replyAction}
                <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" title="Upvote" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-like"></i></a>
                <span id="comment${comment_id}-votes"> ${votes} </span>
                <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" title="Downvote" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-dislike"></i></a>
            </div>
            <div class="col-sm-4">
                <a onclick="parseEditorId('#fcbody${comment_id}', '${comment_id}', 'edit comment', ${replying_to});" title="edit comment" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><span><i class="fe fe-edit"></i></span></a>
                <a onclick="deleteComment(${comment_id} ,${replying_to})" title="delete comment" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><span><i class="fe fe-trash-2"></i></span></a>
            </div>
          `;
        } else {
          toggleActionsView = `
          <div class="equalbox" id="load-cmt${comment_id}">
            ${repliesView}
          </div>
          <div class="equalbox">
            <a class="a-override a-alt"><i class="icon-like"></i> <span id="comment${comment_id}-votes">${votes} </span></a>
          </div>
          <div class="equalbox pull-right">
            ${replyAction}
            <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-like"></i></a>
            <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-dislike"></i></a>
          </div>
          `;
        }

        row += `<div class="comment_box">
          <div class="row">
            <div class="col-sm-1 icon_"><div class="hicon ${hicon.toLowerCase()}">${hicon}</div></div>
            <div class="col-sm-11 bod_">
                <div class="row chead">
                    <div class="col-sm-9 cwho">
                        ${author_name}  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> ${posted_date}</span>
                    </div>
                    <div class="col-sm-3 lab_">
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
                        <div class="comment_area hide cform" id="cform${comment_id}">
                          <div class="row">
                           <!--
                              <div class="col-sm-1" id="replyHicon${comment_id}">

                              </div>
                            -->
                              <input type="hidden" id="comment-edit-id${comment_id}" value="add comment">
                              <input type="hidden" id="cke-init-${comment_id}" value="">
                              <div class="col-sm-12"><textarea id="fcbody${comment_id}" class="fcbody form-control" placeholder="Leave a comment..."></textarea></div>
                              <div class="col-sm-12 error" id="comment${comment_id}Err"></div>
                          </div>
                          <div class="row mt-2">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-9"><button onclick="closeForm('#cform${comment_id}')" class="btn btn-success btn-sm"><i class=""></i> Cancel</button></div>
                            <div class="col-sm-2"><button onclick="saveComment('fcbody${comment_id}', ${comment_id})" class="btn btn-success btn-sm"><i class=""></i> Post</button></div>
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

      $('#outer-c').html(row);

      // perisist comments with replying_to = 0 to local storage for reference
      persistence('comments', data);
    } else {
      $('#outer-c').html(row);
    }

    // update comment counter view
    let commentCountView;
    if (total_records == 1) {
      commentCountView = `${total_records} comment`;
    } else {
      commentCountView = `${total_records} comments`;
    }
    $('#total-comments').html(commentCountView);

    // pagination

    const paginationResult = Paging(
      cur_page,
      rpp,
      total_records,
      'myClass',
      'myDisableClass',
    );
    $('#pagingDiv').html(paginationResult);
  });
}

function getCommentReplies(commentReplyId) {
  // content loading indicator
  $(`#load-cmt${commentReplyId}`).html('<i>Loading...</i>');
  const current_loc = currentLoc();

  // check for logged in user to hide actions that needs authorization
  let comment_author;
  if (current_loc && current_loc.user && current_loc.user.uid) {
    comment_author = current_loc.user.uid;
  }
  const offset = 0;
  const rpp = 10;
  let query;
  if (current_loc && current_loc.code_sel) {
    const code_snippet_id = current_loc.code_sel.uid;
    const where_ = `cmt.code_snippet_id=${code_snippet_id} AND cmt.replying_to=${commentReplyId} AND cmt.status=1`;
    query = `?where_=${where_}&offset=${offset}&rpp=${rpp}`;
    // console.log(query);
  } else {
    alert('Oops! No code selected');
    return;
  }

  crudaction({}, `/comments-by-codeid${query}`, 'GET', (feed) => {
    let row = '';
    let repliesView = '<a class="a-alt"><i class="fe fe-corner-up-left"></i> 0 Replies </a>';
    if (feed && feed.data && feed.data.length > 0) {
      // clear loading text
      $(`#load-cmt${commentReplyId}`).html('');
      // console.log("Comments available", feed);
      const { data } = feed;
      const count = data.length;
      let replying_to;

      for (let i = 0; i < count; i++) {
        // console.log(data[i].comment_body);
        const { author_name } = data[i];
        const hicon = data[i].author_name[0];
        const posted_date_ = reformatDate(data[i].added_date);
        const posted_date = momentDatetime(posted_date_);
        const { tag_name } = data[i];
        const { tag_icon } = data[i];
        const { tag_color } = data[i];
        const { comment_body } = data[i];
        const replies = data[i].total_replies;
        const { votes } = data[i];
        const comment_id = data[i].uid;
        replying_to = data[i].replying_to;
        const { author_id } = data[i];
        // console.log("comment id => ", comment_id);

        if (replies == 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${comment_id}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Reply </a>`;
        }
        if (replies > 1) {
          repliesView = `<a class="a-override" href="javascript:void(0)" onclick="getCommentReplies(${comment_id}, ${replies})"><i class="fe fe-corner-up-left"></i> ${replies} Replies </a>`;
        }

        // dynamic reply action
        let replyAction = '';
        const user_id = current_loc && current_loc.user && current_loc.user.uid
          ? current_loc.user.uid
          : '';
        if (user_id) {
          replyAction = `<a
              title="reply"
              class="font-weight-bold btn-sm btn-outline-dark"
              href="javascript:void(0)"
              onclick="parseEditorId('#fcbody${comment_id}', '${comment_id}', 'reply', ${replying_to});"
            >
              <i class="fe fe-message-square"></i> 
            </a>`;
        } else {
          replyAction = `<a
            title="reply"
            class="font-weight-bold btn-sm btn-outline-dark"
            href="javascript:void(0)"
            onclick="showModal('#loginOrRegisterModal')"
          >
            <i class="fe fe-message-square"></i> 
          </a>`;

          const loginLink = getNavLink('login');
          const signupLink = getNavLink('register');
          $('#modal-title').html(
            `Please <a class="cpointer modal-nav" href="${loginLink}">Login</a> or <a class="cpointer modal-nav" href="${signupLink}">Sign up</a> to reply a comment`,
          );
        }

        let toggleActionsView = '';
        if (author_id === comment_author) {
          toggleActionsView = `
            <div class="equalbox" id="load-cmt${comment_id}">
            ${repliesView}
            </div>

            <div class="equalbox">
                ${replyAction}
                <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" title="Upvote" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-like"></i></a>
                <span id="comment${comment_id}-votes"> ${votes} </span>
                <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" title="Downvote" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-dislike"></i></a>
            </div>
            <div class="equalbox">
                <a onclick="parseEditorId('#fcbody${comment_id}', '${comment_id}', 'edit comment', ${replying_to});" title="edit comment" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><span><i class="fe fe-edit"></i> </span></a>
                <a onclick="deleteComment(${comment_id}, ${replying_to})" title="delete comment" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><span><i class="fe fe-trash-2"></i> </span></a>
            </div>
          `;
        } else {
          toggleActionsView = `
          <div class="equalbox" id="load-cmt${comment_id}">
            ${repliesView}
          </div>
          <div class="equalbox">
          <a class="a-override a-alt"><i class="fe fe-thumbs-up"></i> <span id="comment${comment_id}-votes">${votes} </span></a>
          </div>
          <div class="equalbox">
            ${replyAction}
            <a onclick="upvoteComment(${comment_id})" id = "upvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-like"></i></a>
            <a onclick="downvoteComment(${comment_id})" id = "downvote-comment-${comment_id}" class="font-weight-bold btn-sm btn-outline-dark" href="javascript:void(0)"><i class="icon-dislike"></i></a>
          </div>
          `;
        }

        row += `<div class="comment_box inner-box">
          <div class="row">
            <div class="col-sm-1 icon_"><div class="hicon ${hicon.toLowerCase()}">${hicon}</div></div>
            <div class="col-sm-11 bod_">
                <div class="row chead">
                    <div class="col-sm-9 cwho">
                        ${author_name}  <span class="ctime text-muted font-12"><span class="status-icon bg-gray"></span> ${posted_date}</span>
                    </div>
                    <div class="col-sm-3 lab_">
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
                        <div class="comment_area hide cform" id="cform${comment_id}">
                          <div class="row">
                              <!--<div class="col-sm-1" id="replyHicon${comment_id}">

                              </div>-->
                              <input type="hidden" id="comment-edit-id${comment_id}" value="add comment">
                              <input type="hidden" id="cke-init-${comment_id}" value="">
                              <div class="col-sm-12"><textarea name="content" class="fcbody form-control" placeholder="Leave a comment..." id="fcbody${comment_id}"></textarea></div>
                              <div class="col-sm-12 error" id ="comment${comment_id}Err"></div>
                          </div>
                          <div class="row mt-2">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-9"><button onclick="closeForm('#cform${comment_id}')" class="btn btn-success btn-sm"><i class=""></i> Cancel</button></div>
                            <div class="col-sm-2"><button onclick="saveComment('fcbody${comment_id}', ${comment_id})" class="btn btn-success btn-sm"><i class=""></i> Post</button></div>
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

      // persist comments with replying_to > 0 to local storage for reference
      if (current_loc && current_loc.comments) {
        const { comments } = current_loc;
        for (let j = 0; j < data.length; j++) {
          comments.push(data[j]);
        }
        // perisist comment replies with updated content
        persistence('comments', comments);
      } else {
        persistence('comments', data);
      }
    } else {
      // means no replies for this comment, hence clear replies list
      $(`#inner-box${commentReplyId}`).html(row);
      // then revoke current comment replies hyperlink
      $(`#load-cmt${commentReplyId}`).html(repliesView);
    }
  });
}

function init_ckeditor(cId) {
  const ckeditor_id = $('#ckeditor_id').val().trim(); // will be used to intilize first and only ckeditor to the current comment
  const cke_init_id = $(`#cke-init-${cId}`).val().trim(); // will prevent intializing multiple ckeditors for the same comment

  if (cke_init_id) {
    const { ckeditorInstance } = document.querySelector(ckeditor_id);
    ckeditorInstance ? ckeditorInstance.destroy() : ''; // destroy the previous instance before creating a new one
  }
  window.myClassicEditor = '';
  // console.log("cke init id => ", cke_init_id);
  // if (!cke_init_id) {
  ClassicEditor.create(document.querySelector(ckeditor_id))
    .then((newEditor) => {
      myClassicEditor = newEditor;
      // console.log(newEditor);
    })
    .catch((error) => {
      console.error(error);
    });

  $(`#cke-init-${cId}`).val(ckeditor_id); // use it as indicator that ckeditor already initialized, to avoid mulitple ini`tiaization
  // }

  // return ckeditor;
}

function validateComment(domId) {
  $(domId).html('');
}

function closeForm(domId) {
  $(domId).toggle();
}

function parseEditorId(domId, commentId, action, replying_to = 0) {
  $('#ckeditor_id').val(domId);
  $('#comment_id_').val(commentId);
  $('#reply_to_id').val(replying_to);
  $(`#comment-edit-id${commentId}`).val(action);
  toggleCommentForm(commentId, action, replying_to);
}

function toggleCommentForm(
  comment_id,
  action = 'add comment',
  replying_to = 0,
) {
  const editorKey = `fcbody${comment_id}`;
  const formId = `#cform${comment_id}`;
  $('.comment_area').hide();
  $(formId).show();

  // if (editorKey != "fcbody0" && editorKey != "instructions_input") {
  //   //myeditors = {};

  //   if (myeditors[editorKey]) {
  //     //myeditors[editorKey] = "";
  //     $(".fcbody").html("");
  //   }
  // }

  // $(".cform").hide(); //all opend forms with class cform
  // if ($(formId).hasClass("hide")) {

  // }

  const current_loc = currentLoc();
  // check if a user is logged in before allowing commenting
  if (current_loc.user && current_loc.user.uid && current_loc.user.fullname) {
    let replyHicon;
    if (current_loc.user && current_loc.user.fullname) {
      replyHicon = `<div class="hicon">${current_loc.user.fullname[0]}</div>`;
    }
    $(`#replyHicon${comment_id}`).html(replyHicon);
  } else {
    // let message = `Please sign in to ${action}`;
    // errorToast(message);
    // <!-- Modal -->
    // return;
  }

  // handle case if the form is requested for comment edit purpose and the comment not a reply to another comment
  printError(`comment${comment_id}Err`, '');
  if (action == 'edit comment') {
    console.log('toggle form action is edit comment');
    // retrieve the comments from local storage from the key comments
    let comments = [];
    let comment_to_edit = {};
    if (current_loc && current_loc.comments) {
      comments = current_loc.comments;
      for (let cc = 0; cc < comments.length; cc++) {
        if (comments[cc].uid == comment_id) {
          comment_to_edit = comments[cc];
          break; // exit the loop
        }
      }
      // load the previous content to the form for editing
      myeditors && myeditors[editorKey]
        ? myeditors[editorKey].setData(comment_to_edit.comment_body)
        : $(`#${editorKey}`).val(comment_to_edit.comment_body);
    }
  } else {
    // clear the form incase it was loaded with content by edit action
    if (editorKey != 'fcbody0' && editorKey != 'instructions_input') {
      myeditors && myeditors[editorKey]
        ? myeditors[editorKey].setData('')
        : $(`#${editorKey}`).val('');
    } else {
      myeditors2 && myeditors2[editorKey]
        ? myeditors2[editorKey].setData('')
        : $(`#${editorKey}`).val('');
    }
  }
  // exclude instructions input and add new comment form since their editors are created on page load.
  if (editorKey != 'fcbody0' && editorKey != 'instructions_input') {
    createEditor(editorKey);
  }
}

function saveComment(fcbodyId, comment_id) {
  // first check if user is logged in before saving the comment
  let added_by;
  const current_loc = currentLoc();
  // let comment_id = parseInt($("#comment_id_").val());
  let replying_to = parseInt($('#reply_to_id').val());
  const action = $(`#comment-edit-id${comment_id}`).val();

  if (action == 'reply') {
    replying_to = comment_id;
  }
  if (current_loc && current_loc.user && current_loc.user.uid) {
    added_by = current_loc.user.uid;
  } else {
    const navLink = getNavLink('login');
    gotourl(navLink);
  }

  const code_snippet_id = parseInt(current_loc.code_sel.uid);
  const tag = 1; // Author
  const editorKey = fcbodyId;
  let comment_body;
  if (editorKey != 'fcbody0' && editorKey != 'instructions_input') {
    comment_body = myeditors && myeditors[editorKey]
      ? myeditors[editorKey].getData().trim()
      : $(`#${editorKey}`).val().trim();
  } else {
    comment_body = myeditors2 && myeditors2[editorKey]
      ? myeditors2[editorKey].getData().trim()
      : $(`#${editorKey}`).val().trim();
  }

  // ----checking if there is content in the comment body;
  // Defining error variables with a default value
  let commentErr = true;
  // Validate username
  if (comment_body == '') {
    printError(`comment${comment_id}Err`, 'Comment content required');
    // printError(`comment${comment_id}Err`, "Comment content required");
  } else {
    printError(`comment${comment_id}Err`, '');
    // printError(`comment${comment_id}Err`, "");
    commentErr = false;
  }

  if (commentErr == true) {
    return false;
  }
  /// /------End of checking if there is content in the comment body;

  let url = '/add-comment';
  let method = 'POST';
  let jso = {
    code_snippet_id,
    comment_body,
    replying_to,
    tag,
    added_by,
  };
  // grab edit-comment-id from the hidden input
  if (action == 'edit comment' && comment_id > 0) {
    url = '/edit-comment';
    method = 'PUT';
    jso = {
      comment_body,
      comment_id,
    };
  }

  // $("#cform0").removeClass("show"); //hide the form after submission
  // $("#cform0").hide();
  crudaction(jso, url, method, (feed) => {
    if (feed && feed.success) {
      // let editorKey = `fcbody${comment_id}`;
      clearCkeditorData(editorKey); // clear ckeditor content after successful submission
      closeForm(`#cform${comment_id}`);

      if (action == 'add comment' && replying_to == 0) {
        persistence('cur_page', 1); // will ensure the user sees newly posted comment as it appears on the first page
        getCommentsByCodesnippetId();
      } else if (action == 'reply' && replying_to > 0) {
        getCommentReplies(replying_to); // re-render comment replies list;
      } else {
        reRenderEditedCommentBody(comment_id); // re-render the comment body
      }
      successToast(feed.message, 'toast-top-right');
    } else {
      errorToast(feed.message, 'toast-top-right');
    }
  });
}

function deleteComment(comment_id = 0, replying_to) {
  const answer = window.confirm(
    'Are you sure you want to delete your comment?',
  );
  if (!answer) return;

  // console.log("comment id => ", comment_id, ", replying to => ", replying_to);
  const current_loc = currentLoc();
  let code_snippet_id;
  if (current_loc && current_loc.code_sel) {
    code_snippet_id = current_loc.code_sel.uid;
  }
  const query = `?replying_to=${replying_to}&code_snippet_id=${code_snippet_id}`;

  crudaction({ comment_id }, `/del-comment${query}`, 'DELETE', (feed) => {
    // console.log("comment delete feedback =>", feed);
    if (feed.success) {
      if (replying_to == 0) {
        load_codesnippetById(code_snippet_id);
      }
      if (replying_to > 0) {
        getCommentReplies(replying_to);
      }
      successToast(feed.message, 'toast-top-right');
    } else {
      errorToast(feed.message, 'toast-top-right');
    }
  });
}

function focussedInput(input, error_domId) {
  const hasFocus = $(input).is(':focus');
  if (hasFocus) {
    $(error_domId).html('');
  }
}

function reRenderEditedCommentBody(comment_id) {
  const current_loc = currentLoc();
  const query = `?comment_id=${comment_id}`;

  crudaction({}, `/comment${query}`, 'GET', (feed) => {
    // console.log(feed.success, feed.data);
    if (feed && feed.success && feed.data && feed.data.comment_body) {
      const { comment_body } = feed.data;
      $(`#cdisply${comment_id}`).html(comment_body);

      let comments = [];
      // update the comment within the localstorage
      if (current_loc && current_loc.comments) {
        comments = current_loc.comments;
        for (let cc = 0; cc < comments.length; cc++) {
          if (comments[cc].uid == comment_id) {
            comments[cc].comment_body = comment_body;
            break; // exit the loop
          }
        }
        persistence('comments', comments);
      }
    }
  });
}

function upvoteComment(comment_id, action = 'upvote comment') {
  // check if a user is logged in before allowing voting
  const current_loc = currentLoc();
  let user_id = 0;
  if (current_loc && current_loc.user && current_loc.user.uid) {
    user_id = current_loc.user.uid;
  } else {
    showModal('#loginOrRegisterModal');
    const loginLink = getNavLink('login');
    const signupLink = getNavLink('register');
    $('#modal-title').html(
      `Please <a class="cpointer modal-nav" href="${loginLink}">Login</a> or <a class="cpointer modal-nav" href="${signupLink}">Sign up</a> to ${action}`,
    );
    return; // alert(`Please sign in to ${action}`);
  }

  const jso = {
    post_id: comment_id,
    user_id,
    table: 'pr_comments',
    upvote: 1,
    downvote: 0,
  };

  crudaction(jso, '/upvote-comment', 'PUT', (feed) => {
    if (!feed) {
      return errorToast('Server error');
    }
    if (feed && feed.success == true) {
      $(`#comment${comment_id}-votes`).html(feed.votes);
      return successToast(feed.message, 'toast-top-right');
    }

    if (feed && feed.success == false) {
      return errorToast(feed.message, 'toast-top-right');
    }
  });
}

function downvoteComment(comment_id, action = 'downvote comment') {
  // check if a user is logged in before allowing voting
  const current_loc = currentLoc();
  let user_id = 0;
  if (current_loc.user && current_loc.user.uid) {
    user_id = current_loc.user.uid;
  } else {
    showModal('#loginOrRegisterModal');
    const loginLink = getNavLink('login');
    const signupLink = getNavLink('register');
    $('#modal-title').html(
      `Please <a class="cpointer modal-nav" href="${loginLink}">Login</a> or <a class="cpointer modal-nav" href="${signupLink}">Sign up</a> to ${action}`,
    );
    return;
    // return alert(`Please sign in to ${action}`);
  }

  const jso = {
    post_id: comment_id,
    user_id,
    table: 'pr_comments',
    upvote: 0,
    downvote: -1,
  };

  crudaction(jso, '/downvote-comment', 'PUT', (feed) => {
    if (!feed) {
      return errorToast('Server error');
    }
    if (feed && feed.success == true) {
      $(`#comment${comment_id}-votes`).html(feed.votes);
      return successToast(feed.message, 'toast-top-right');
    }

    if (feed && feed.success == false) {
      return errorToast(feed.message, 'toast-top-right');
    }
  });
}

function reformatDate(date_) {
  const d = new Date(date_);
  const date = `${d.toISOString().split('T')[0]} ${d.toTimeString().split(' ')[0]}`;
  return date;
}

// friendly datetime formatter
function momentDatetime(targetdt) {
  return moment(targetdt).fromNow();
}

/// ////----------------------------------End Comments

/// ////////////------------------------begin modal js
// Get the modal
const modal = document.getElementById('myModal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
  if (e.target == modal) {
    // $("#myModal").hide();
    $('.modal').removeClass('fade');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }
};

function showModal(domId) {
  $(domId).show();
  $('body').addClass('fade_');
  // $("#myModal").show();
  // modal.style.display = "block";
}

function dismissModal(domId) {
  $('body').removeClass('fade_');
  $(domId).hide();
  // modal.style.display = "none";
}

function dismissModal2(domId) {
  $(domId).removeClass('fade');
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
}

function modalView(action, title) {
  const actionCapitalized = action ? action.toUpperCase() : action;
  $('#mainModal').html(
    `
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
            <button type="button" onclick="dismissModal2()" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            Are you sure you want to ${action} your comment?
        </div>
        <div class="modal-footer">
            <button onclick="dismissModal2()" type="button" class="btn btn-secondary" data-dismiss="modal">Keep</button>
            <button type="button" onclick="deleteComment(${comment_id} ,${replying_to});" class="btn btn-primary">${actionCapitalized}</button>
        </div>
    </div>
</div>
    `,
  );
}

/// /////------------------------------End modal

/// ////--------------------------Begin ckeditor
class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }),
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    const server_ = $('#server_').val();
    const url = `${server_}/upload-img`;
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const { xhr } = this;
    const { loader } = this;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const { response } = xhr;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText,
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url,
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();

    data.append('upload', file);

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data);
  }
}

// ...

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
    // Configure the URL to the upload script in your back-end here!
    new MyUploadAdapter(loader);
}

// get the content from the editor
function getckeditorData(domId, editorKey = 'fcbody0') {
  const data = myeditors && myeditors[editorKey]
    ? myeditors[editorKey].getData().trim()
    : $(`#${editorKey}`).val().trim();

  $(domId).val(data);
}

// clear editor content after form submission
function clearCkeditorData(editorKey) {
  myeditors && myeditors[editorKey]
    ? myeditors[editorKey].setData('')
    : $(`#${editorKey}`).val('');
}

// function initCkeditor(page) {
//   let ckeditor_id = "";
//   page == "index"
//     ? (ckeditor_id = $("#ckeditor_id").val())
//     : (ckeditor_id = "#instructions_input");

//   window.myClassicEditor;
//   ClassicEditor.create(document.querySelector(ckeditor_id), {
//     extraPlugins: [MyCustomUploadAdapterPlugin],
//     codeBlock: {
//       languages: [
//         { language: "css", label: "CSS" },
//         { language: "html", label: "HTML" },
//       ],
//     },
//   })
//     .then((newEditor) => {
//       console.log(newEditor);
//       myClassicEditor = newEditor;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// You can also use new Map() if you use ES6. For dynamic editor initializer
function createEditor(elementId) {
  // check if the editor exist before creating it
  if (!myeditors[elementId]) {
    // console.log("Editor instance does NOT exist");
    return ClassicEditor.create(document.getElementById(elementId), {
      extraPlugins: [MyCustomUploadAdapterPlugin],
    })
      .then((editor) => {
        myeditors[elementId] = editor;
        console.log(myeditors);
      })
      .catch((err) => console.error(err.stack));
  }
  // console.log("Editor instance already exist");
}

// for static ckeditor initializer
function createEditor2(elementId) {
  myeditors2 = {};
  // check if the editor exist before creating it
  if (!myeditors2[elementId]) {
    // console.log("Editor instance does NOT exist");
    return ClassicEditor.create(document.getElementById(elementId), {
      extraPlugins: [MyCustomUploadAdapterPlugin],
    })
      .then((editor) => {
        myeditors2[elementId] = editor;
      })
      .catch((err) => console.error(err.stack));
  }
  // console.log("Editor instance already exist");
}

/// ////--------------------------End ckeditor
function hidewelcome() {
  $('#overin').fadeOut('fast');
  $('#layleft').fadeOut('fast');
}
function showelcome() {
  $('#layleft').fadeIn('slow');
}

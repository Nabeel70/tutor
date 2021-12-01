import { element, elements, json_download } from "./lib";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    export_settings_all();
  }
  if (event.target.readyState === "complete") {
    delete_history_data();
    import_history_data();
    export_single_settings();
    reset_default_options();
    apply_single_settings();

    // setInterval(function () {
    // load_saved_data();
    // console.log("working");
    // }, 10000);
  }
});

/**
 * Highlight items form search suggestion
 */
function highlightSearchedItem(dataKey) {
  const target = document.querySelector(`#${dataKey}`);
  const targetEl =
    target && target.querySelector(`.tutor-option-field-label label`);
  const scrollTargetEl =
    target && target.parentNode.querySelector(".tutor-option-field-row");

  console.log(`target -> ${target} scrollTarget -> ${scrollTargetEl}`);

  if (scrollTargetEl) {
    targetEl.classList.add("isHighlighted");
    setTimeout(() => {
      targetEl.classList.remove("isHighlighted");
    }, 6000);

    scrollTargetEl.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  } else {
    console.warn(`scrollTargetEl Not found!`);
  }
}

const load_saved_data = () => {
  var formData = new FormData();
  formData.append("action", "load_saved_data");
  formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", _tutorobject.ajaxurl, true);
  xhttp.send(formData);
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      tutor_option_history_load(xhttp.response);
    }
  };
};

function tutor_option_history_load(history_data) {
  var dataset = JSON.parse(history_data).data;
  var output = "";
  if (0 !== dataset.length) {
    Object.entries(dataset).forEach(([key, value]) => {
      let badgeStatus =
        value.datatype == "saved" ? " label-primary-wp" : " label-refund";
      output = `<div class="tutor-option-field-row">
					<div class="tutor-option-field-label">
						<p class="text-medium-small">${value.history_date}
						<span class="tutor-badge-label tutor-ml-15${badgeStatus}"> ${value.datatype}</span> </p>
					</div>
					<div class="tutor-option-field-input">
						<button class="tutor-btn tutor-is-outline tutor-is-default tutor-is-xs apply_settings" data-id="${key}">Apply</button>

          <div class="tutor-popup-opener">
            <button
            type="button"
            class="popup-btn"
            data-tutor-popup-target="popup-${key}"
            >
            <span class="toggle-icon"></span>
            </button>
            <ul id="popup-${key}" class="popup-menu">
            <li>
              <a class="export_single_settings" data-id="${key}">
                <span class="icon tutor-v2-icon-test icon-msg-archive-filled color-design-white"></span>
                <span class="text-regular-body color-text-white">Download</span>
              </a>
            </li>
            <li>
              <a class="delete_single_settings" data-id="${key}">
                <span class="icon tutor-v2-icon-test icon-delete-fill-filled color-design-white"></span>
                <span class="text-regular-body color-text-white">Delete</span>
              </a>
            </li>
            </ul>
          </div>
          </div>
        </div>`+ output;
    });
  } else {
    output += `<div class="tutor-option-field-row"><div class="tutor-option-field-label"><p class="text-medium-small">No settings data found.</p></div></div>`;
  }
  const heading = `<div class="tutor-option-field-row"><div class="tutor-option-field-label"><p>Date</p></div></div>`;

  element(".history_data").innerHTML = heading + output;
  export_single_settings();
  // popupToggle();
  apply_single_settings();
}
/* import and list dom */

const export_settings_all = () => {
  const export_settings = element("#export_settings"); //document.querySelector("#export_settings");
  if (export_settings) {
    export_settings.onclick = (e) => {
      if (!e.detail || e.detail == 1) {
        e.preventDefault();
        fetch(_tutorobject.ajaxurl, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
          },
          body: new URLSearchParams({
            action: "tutor_export_settings",
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            let fileName = "tutor_options_" + time_now();
            json_download(JSON.stringify(response), fileName);
          })
          .catch((err) => console.log(err));
      };
    }
  }
};
/**
 *
 * @returns time by second
 */
const time_now = () => {
  return Math.ceil(Date.now() / 1000) + 6 * 60 * 60;
};

const reset_default_options = () => {
  const reset_options = element("#reset_options");
  if (reset_options) {
    reset_options.onclick = function () {
      var formData = new FormData();
      formData.append("action", "tutor_option_default_save");
      formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", _tutorobject.ajaxurl, true);
      xhttp.send(formData);
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
          setTimeout(function () {
            tutor_toast("Success", "Reset all settings to default successfully!", "success");
          }, 200);
        }
      };
    };
  }
};

const import_history_data = () => {
  const import_options = element("#import_options");
  if (import_options) {
    import_options.onclick = (e) => {
      if (!e.detail || e.detail == 1) {
        var fileElem = element("#drag-drop-input");
        var files = fileElem.files;
        if (files.length <= 0) {
          tutor_toast('Failed', 'Please add a correctly formated json file', 'error');
          return false;
        }
        var fr = new FileReader();
        fr.readAsText(files.item(0));
        fr.onload = function (e) {
          var tutor_options = e.target.result;
          var formData = new FormData();
          formData.append("action", "tutor_import_settings");
          formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
          formData.append("time", time_now());
          formData.append("tutor_options", tutor_options);
          const xhttp = new XMLHttpRequest();
          xhttp.open("POST", _tutorobject.ajaxurl);
          xhttp.send(formData);
          xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
              tutor_option_history_load(xhttp.responseText);
              delete_history_data();
              // import_history_data();
              setTimeout(function () {
                tutor_toast("Success", "Data imported successfully!", "success");
                fileElem.parentNode.parentNode.querySelector('.file-info').innerText = '';
                fileElem.value = '';
              }, 200);
            }
          };
        };
      };
    };
  }
};

const export_single_settings = () => {
  const single_settings = elements(".export_single_settings");
  for (let i = 0; i < single_settings.length; i++) {
    single_settings[i].onclick = function () {
      let export_id = single_settings[i].dataset.id;
      var formData = new FormData();
      formData.append("action", "tutor_export_single_settings");
      formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
      formData.append("time", Date.now());
      formData.append("export_id", export_id);

      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", _tutorobject.ajaxurl, true);
      xhttp.send(formData);

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
          console.log(xhttp.response);
          // let fileName = "tutor_options_" + _tutorobject.tutor_time_now;
          let fileName = export_id;
          json_download(xhttp.response, fileName);
        }
      };
    };
  }
};

const apply_single_settings = () => {
  const apply_settings = elements(".apply_settings");
  for (let i = 0; i < apply_settings.length; i++) {
    apply_settings[i].onclick = function () {
      let apply_id = apply_settings[i].dataset.id;
      var formData = new FormData();
      formData.append("action", "tutor_apply_settings");
      formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
      formData.append("apply_id", apply_id);

      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", _tutorobject.ajaxurl, true);
      xhttp.send(formData);

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
          tutor_toast("Success", "Applied settings successfully!", "success");
          console.log(xhttp.response);
        }
      };
    };
  }
};

const delete_history_data = () => {
  const delete_settings = elements(".delete_single_settings");
  for (let i = 0; i < delete_settings.length; i++) {
    delete_settings[i].onclick = function () {
      let delete_id = delete_settings[i].dataset.id;
      var formData = new FormData();
      formData.append("action", "tutor_delete_single_settings");
      formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
      formData.append("time", Date.now());
      formData.append("delete_id", delete_id);

      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", _tutorobject.ajaxurl, true);
      xhttp.send(formData);
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
          // console.log(JSON.parse(xhttp.response));
          tutor_option_history_load(xhttp.responseText);
          delete_history_data();

          setTimeout(function () {
            tutor_toast('Success', "Data deleted successfully!", 'success');
          }, 200);
        }
      };
    };
  }
};

document.addEventListener('readystatechange', (event) => {
	if (event.target.readyState === 'interactive') {
		export_settings_all();
	}
	if (event.target.readyState === 'complete') {
		delete_history_data();
		import_history_data();
		export_single_settings();
		reset_default_options();
		modal_opener_single_settings();
		const historyData = document.querySelector('.history_data');
		if (typeof historyData !== 'undefined' && null !== historyData) {
			setInterval(() => {
				load_saved_data();
			}, 100000);
		}
	}
});

/**
 * Highlight items form search suggestion
 */
function highlightSearchedItem(dataKey) {
	const target = document.querySelector(`#${dataKey}`);
	const targetEl = target && target.querySelector(`.tutor-option-field-label label`);
	const scrollTargetEl = target && target.parentNode.querySelector('.tutor-option-field-row');

	console.log(`target -> ${target} scrollTarget -> ${scrollTargetEl}`);

	if (scrollTargetEl) {
		targetEl.classList.add('isHighlighted');
		setTimeout(() => {
			targetEl.classList.remove('isHighlighted');
		}, 6000);

		scrollTargetEl.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'nearest',
		});
	} else {
		console.warn(`scrollTargetEl Not found!`);
	}
}

const load_saved_data = () => {
	var formData = new FormData();
	formData.append('action', 'load_saved_data');
	formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', _tutorobject.ajaxurl, true);
	xhttp.send(formData);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4) {
			let historyData = JSON.parse(xhttp.response);
			historyData = historyData.data;
			// console.log(historyData);

			// console.log(Object.entries(historyData));

			tutor_option_history_load(Object.entries(historyData));
			delete_history_data();
		}
	};
};

function tutor_option_history_load(dataset) {
	var output = '';
	if (null !== dataset && 0 !== dataset.length) {
		dataset.forEach((value) => {
			let dataKey = value[0];
			let dataValue = value[1];

			let badgeStatus = dataValue.datatype == 'saved' ? ' label-primary-wp' : ' label-refund';
			output += `<div class="tutor-option-field-row">
					<div class="tutor-option-field-label">
						<p class="tutor-fs-7 tutor-fw-medium">${dataValue.history_date}
						<span class="tutor-badge-label tutor-ml-16${badgeStatus}"> ${dataValue.datatype}</span> </p>
					</div>
					<div class="tutor-option-field-input">
						<button class="tutor-btn tutor-btn-outline-primary tutor-btn-sm apply_settings" data-tutor-modal-target="tutor-modal-bulk-action" data-btntext="Yes, Restore Settings" data-heading="Restore Previous Settings?" data-message="WARNING! This will overwrite all existing settings, please proceed with caution." data-id="${dataKey}">Apply</button>

          <div class="tutor-popup-opener tutor-ml-16">
            <button
            type="button"
            class="popup-btn"
            data-tutor-popup-target="popup-${dataKey}"
            >
            <span class="toggle-icon"></span>
            </button>
            <ul id="popup-${dataKey}" class="popup-menu">
            <li>
              <a class="export_single_settings" data-id="${dataKey}">
                <span class="tutor-icon-archive tutor-color-white"></span>
                <span class="tutor-fs-6 tutor-color-white">Download</span>
              </a>
            </li>
            <li>
              <a class="delete_single_settings"  data-tutor-modal-target="tutor-modal-bulk-action" data-btntext="Yes, Delete Settings" data-heading="Delete This Settings?" data-message="WARNING! This will remove the settings history data from your system, please proceed with caution." data-id="${dataKey}">
                <span class="icon tutor-icon-trashcan-bold tutor-color-white"></span>
                <span class="tutor-fs-6 tutor-color-white">Delete</span>
              </a>
            </li>
            </ul>
          </div>
          </div>
        </div>`;
		});
	} else {
		output += `<div class="tutor-option-field-row"><div class="tutor-option-field-label"><p class="tutor-fs-7 tutor-fw-medium">No settings data found.</p></div></div>`;
	}
	const heading = `<div class="tutor-option-field-row"><div class="tutor-option-field-label"><p>Date</p></div></div>`;

	const historyData = selectorElement('.history_data');
	null !== historyData ? (historyData.innerHTML = heading + output) : '';
	export_single_settings();
	// popupToggle();
	modal_opener_single_settings();
}
/* import and list dom */

const export_settings_all = () => {
	const export_settings = selectorElement('#export_settings'); //document.querySelector("#export_settings");
	if (export_settings) {
		export_settings.onclick = (e) => {
			var formData = new FormData();
			formData.append('action', 'tutor_export_settings');
			formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
			const xhttp = new XMLHttpRequest();
			xhttp.open('POST', _tutorobject.ajaxurl, true);
			xhttp.send(formData);

			xhttp.onreadystatechange = function() {
				if (xhttp.readyState === 4) {
					console.log(JSON.parse(xhttp.response));
					let fileName = 'tutor_options_' + time_now();
					json_download(xhttp.response, fileName);
				}
			};
		};
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
	const reset_options = selectorElement('#reset_options');
	if (reset_options) {
		reset_options.onclick = function() {
			modalConfirmation(reset_options);
		};
	}
};

const reset_all_settings_xhttp = (modalOpener, modalElement) => {
	var formData = new FormData();
	formData.append('action', 'tutor_option_default_save');
	formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', _tutorobject.ajaxurl, true);
	xhttp.send(formData);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4) {
			setTimeout(function() {
				modalElement.classList.remove('tutor-is-active');
				tutor_toast('Success', 'Reset all settings to default successfully!', 'success');
			}, 200);
		}
	};
};

const import_history_data = () => {
	const import_options = selectorElement('#import_options');
	if (import_options) {
		import_options.onclick = (e) => {
			modalConfirmation(import_options);
		};
	}
};

const import_history_data_xhttp = (modalOpener, modalElement) => {
	var fileElem = selectorElement('#drag-drop-input');
	var files = fileElem.files;
	if (files.length <= 0) {
		tutor_toast('Failed', 'Please add a correctly formated json file', 'error');
		return false;
	}
	var fr = new FileReader();
	fr.readAsText(files.item(0));
	fr.onload = function(e) {
		var tutor_options = e.target.result;
		var formData = new FormData();
		formData.append('action', 'tutor_import_settings');
		formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
		formData.append('time', time_now());
		formData.append('tutor_options', tutor_options);
		const xhttp = new XMLHttpRequest();
		xhttp.open('POST', _tutorobject.ajaxurl);
		xhttp.send(formData);
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4) {
				modalElement.classList.remove('tutor-is-active');
				let historyData = JSON.parse(xhttp.response);
				historyData = historyData.data;
				tutor_option_history_load(Object.entries(historyData));
				delete_history_data();
				// import_history_data();
				setTimeout(function() {
					tutor_toast('Success', 'Data imported successfully!', 'success');
					fileElem.parentNode.parentNode.querySelector('.file-info').innerText = '';
					fileElem.value = '';
				}, 200);
			}
		};
	};
};

const export_single_settings = () => {
	const single_settings = selectorElements('.export_single_settings');
	if (single_settings) {
		for (let i = 0; i < single_settings.length; i++) {
			single_settings[i].onclick = function(e) {
				if (!e.detail || e.detail == 1) {
					let export_id = single_settings[i].dataset.id;
					var formData = new FormData();
					formData.append('action', 'tutor_export_single_settings');
					formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
					formData.append('time', Date.now());
					formData.append('export_id', export_id);

					const xhttp = new XMLHttpRequest();
					xhttp.open('POST', _tutorobject.ajaxurl, true);
					xhttp.send(formData);

					xhttp.onreadystatechange = function() {
						if (xhttp.readyState === 4) {
							// let fileName = "tutor_options_" + _tutorobject.tutor_time_now;
							let fileName = export_id;
							json_download(xhttp.response, fileName);
						}
					};
				}
			};
		}
	}
};

const modalConfirmation = (modalOpener) => {
	let modalElement = document.getElementById(modalOpener.dataset.tutorModalTarget);
	let confirmButton = modalElement && modalElement.querySelector('[data-reset]');
	let modalHeading = modalElement && modalElement.querySelector('.tutor-modal-title');
	let modalMessage = modalElement && modalElement.querySelector('.tutor-modal-message');

	confirmButton.removeAttribute('data-reset-for');
	confirmButton.classList.remove('reset_to_default');

	confirmButton.innerText = modalOpener.dataset.btntext;
	confirmButton.dataset.reset = '';
	modalHeading.innerText = modalOpener.dataset.heading;
	modalMessage.innerText = modalOpener.dataset.message;

	confirmButton.onclick = (e) => {
		if (!e.detail || e.detail == 1) {
			if (modalOpener.classList.contains('tutor_import_options')) {
				import_history_data_xhttp(modalOpener, modalElement);
			}
			if (modalOpener.classList.contains('tutor-reset-all')) {
				reset_all_settings_xhttp(modalOpener, modalElement);
			}
			if (modalOpener.classList.contains('apply_settings')) {
				apply_settings_xhttp_request(modalOpener, modalElement);
			}
			if (modalOpener.classList.contains('delete_single_settings')) {
				delete_settings_xhttp_request(modalOpener, modalElement);
			}
		}
	};
};

const modal_opener_single_settings = () => {
	const apply_settings = selectorElements('.apply_settings');
	if (apply_settings) {
		apply_settings.forEach((applyButton) => {
			applyButton.onclick = () => {
				modalConfirmation(applyButton);
			};
		});
	}
};

const apply_settings_xhttp_request = (modelOpener, modalElement) => {
	let apply_id = modelOpener.dataset.id;
	var formData = new FormData();
	formData.append('action', 'tutor_apply_settings');
	formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
	formData.append('apply_id', apply_id);

	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', _tutorobject.ajaxurl, true);

	xhttp.send(formData);

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4) {
			modalElement.classList.remove('tutor-is-active');
			tutor_toast('Success', 'Applied settings successfully!', 'success');
		}
	};
};

const delete_history_data = () => {
	const delete_settings = selectorElements('.delete_single_settings');
	if (delete_settings) {
		delete_settings.forEach((deleteButton) => {
			deleteButton.onclick = () => {
				modalConfirmation(deleteButton);
			};
		});
	}
};

const delete_settings_xhttp_request = (modelOpener, modalElement) => {
	let delete_id = modelOpener.dataset.id;
	var formData = new FormData();
	formData.append('action', 'tutor_delete_single_settings');
	formData.append(_tutorobject.nonce_key, _tutorobject._tutor_nonce);
	formData.append('time', Date.now());
	formData.append('delete_id', delete_id);

	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', _tutorobject.ajaxurl, true);
	xhttp.send(formData);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4) {
			// console.log(JSON.parse(xhttp.response));
			modalElement.classList.remove('tutor-is-active');
			let historyData = JSON.parse(xhttp.response);
			historyData = historyData.data;
			tutor_option_history_load(Object.entries(historyData));
			delete_history_data();

			setTimeout(function() {
				tutor_toast('Success', 'Data deleted successfully!', 'success');
			}, 200);
		}
	};
};

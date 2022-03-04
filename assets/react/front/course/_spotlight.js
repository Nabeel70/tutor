import ajaxHandler from '../../admin-dashboard/segments/filter';
jQuery(document).ready(function ($) {
	$('.tutor-sortable-list').sortable();
});

document.addEventListener('DOMContentLoaded', (event) => {
	const { __, _x, _n, _nx } = wp.i18n;
	const sidebar = document.querySelector('.tutor-lesson-sidebar.tutor-desktop-sidebar');
	const sidebarToggle = document.querySelector('.tutor-sidebar-toggle-anchor');
	if (sidebar && sidebarToggle) {
		sidebarToggle.addEventListener('click', () => {
			if (getComputedStyle(sidebar).flex === '0 0 400px') {
				sidebar.style.flex = '0 0 0px';
				sidebar.style.display = 'none';
			} else {
				sidebar.style.display = 'block';
				sidebar.style.flex = '0 0 400px';
			}
		});
	}

	const sidebarTabeHandler = function (sideBarTabs) {
		const tabWrapper = document.querySelector('.tutor-desktop-sidebar-area');

		if (null !== tabWrapper && tabWrapper.children.length < 2) {
			return;
		}

		sideBarTabs.forEach((tab) => {
			tab.addEventListener('click', (event) => {
				const tabConent = event.currentTarget.parentNode.nextElementSibling;
				clearActiveClass(tabConent);
				event.currentTarget.classList.add('active');
				let id = event.currentTarget.getAttribute('data-sidebar-tab');
				tabConent.querySelector('#' + id).classList.add('active');
			});
		});
		const clearActiveClass = function (tabConent) {
			for (let i = 0; i < sideBarTabs.length; i++) {
				sideBarTabs[i].classList.remove('active');
			}
			let sidebarTabItems = tabConent.querySelectorAll('.tutor-lesson-sidebar-tab-item');
			for (let i = 0; i < sidebarTabItems.length; i++) {
				sidebarTabItems[i].classList.remove('active');
			}
		};
	};
	const desktopSidebar = document.querySelectorAll('.tutor-desktop-sidebar-area .tutor-sidebar-tab-item');
	const mobileSidebar = document.querySelectorAll('.tutor-mobile-sidebar-area .tutor-sidebar-tab-item');
	if (desktopSidebar) {
		sidebarTabeHandler(desktopSidebar);
	}
	if (mobileSidebar) {
		sidebarTabeHandler(mobileSidebar);
	}
	/* end of sidetab tab */

	/* comment text-area focus arrow style */
	const commentTextarea = document.querySelectorAll('.tutor-comment-textarea textarea');
	if (commentTextarea) {
		commentTextarea.forEach((item) => {
			item.addEventListener('focus', () => {
				item.parentElement.classList.add('is-focused');
			});
			item.addEventListener('blur', () => {
				item.parentElement.classList.remove('is-focused');
			});
		});
	}

	/* comment text-area focus arrow style */
	function commentSideLine() {
		const parentComments = document.querySelectorAll('.tutor-comments-list.tutor-parent-comment');
		const replyComment = document.querySelector('.tutor-comment-box.tutor-reply-box');
		if (parentComments) {
			[...parentComments].forEach((parentComment) => {
				const childComments = parentComment.querySelectorAll('.tutor-comments-list.tutor-child-comment');
				const commentLine = parentComment.querySelector('.tutor-comment-line');
				const childCommentCount = childComments.length;
				if (childComments[childCommentCount - 1]) {
					const lastCommentHeight = childComments[childCommentCount - 1].clientHeight;

					let heightOfLine = lastCommentHeight + replyComment.clientHeight + 20 - 25 + 50;
					commentLine.style.setProperty('height', `calc(100% - ${heightOfLine}px)`);
				}
			});
		}
	}
	commentSideLine();
	window.addEventListener(_tutorobject.content_change_event, commentSideLine);

	const spotlightTabs = document.querySelectorAll('.tutor-spotlight-tab.tutor-default-tab .tab-header-item');
	const spotlightTabContent = document.querySelectorAll('.tutor-spotlight-tab .tab-body-item');
	if (spotlightTabs && spotlightTabContent) {
		document.addEventListener('click', (event) => {
			const currentItem = event.target;
			const isValidCurrentItem = currentItem.classList.contains('tab-header-item');
			if (isValidCurrentItem) {
				clearSpotlightTabActiveClass(spotlightTabs, spotlightTabContent);
				currentItem.classList.add('is-active');
				let id = currentItem.getAttribute('data-tutor-spotlight-tab-target');
				let query_string = currentItem.getAttribute('data-tutor-query-string');

				const tabConent = currentItem.parentNode.nextElementSibling;
				tabConent.querySelector('#' + id).classList.add('is-active');
				if (id === 'tutor-course-spotlight-tab-3') {
					commentSideLine();
				}
				let url = new URL(window.location);
				url.searchParams.set('page_tab', query_string);
				window.history.pushState({}, '', url);
			}
		});
		const clearSpotlightTabActiveClass = () => {
			const spotlightTabs = document.querySelectorAll('.tutor-spotlight-tab.tutor-default-tab .tab-header-item');
			const spotlightTabContent = document.querySelectorAll('.tutor-spotlight-tab .tab-body-item');

			spotlightTabs.forEach((item) => {
				item.classList.remove('is-active');
			});
			spotlightTabContent.forEach((item) => {
				item.classList.remove('is-active');
			});
		};

	}
	/* commenting */

	// quize drag n drop functionality
	const tutorDraggables = document.querySelectorAll('.tutor-draggable > div');
	const tutorDropzone = document.querySelectorAll('.tutor-dropzone');
	tutorDraggables.forEach((quizBox) => {
		quizBox.addEventListener('dragstart', dragStart);
		quizBox.addEventListener('dragend', dragEnd);
	});
	tutorDropzone.forEach((quizImageBox) => {
		quizImageBox.addEventListener('dragover', dragOver);
		quizImageBox.addEventListener('dragenter', dragEnter);
		quizImageBox.addEventListener('dragleave', dragLeave);
		quizImageBox.addEventListener('drop', dragDrop);
	});
	function dragStart() {
		this.classList.add('tutor-dragging');
	}
	function dragEnd() {
		this.classList.remove('tutor-dragging');
	}
	function dragOver(event) {
		this.classList.add('tutor-drop-over');
		event.preventDefault();
	}
	function dragEnter() { }
	function dragLeave() {
		this.classList.remove('tutor-drop-over');
	}
	function dragDrop() {
		const copyElement = document.querySelector('.tutor-quiz-border-box.tutor-dragging');
		if (this.querySelector('input')) {
			this.querySelector('input').remove();
		}
		const input = copyElement.querySelector('input');
		const inputValue = input.value;
		const inputName = input.dataset.name;
		const newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.setAttribute('value', input.value);
		newInput.setAttribute('name', inputName);
		this.appendChild(newInput);
		const copyContent = copyElement.querySelector('.tutor-dragging-text-conent').textContent;
		this.querySelector('.tutor-dragging-text-conent').textContent = copyContent;
		this.classList.remove('tutor-drop-over');
	}

	// tutor assignment file upload
	const fileUploadField = document.getElementById('tutor-assignment-file-upload');

	if (fileUploadField) {
		fileUploadField.addEventListener('change', tutorAssignmentFileHandler);
	}
	function tutorAssignmentFileHandler() {
		const uploadedFileSize = [...fileUploadField.files].reduce((sum, file) => sum + file.size, 0); // byte
		const uploadSizeLimit = parseInt(document.querySelector('input[name="tutor_assignment_upload_limit"]')?.value) || 0;
		let message = '';
		const maxAllowedFiles = window._tutorobject.assignment_max_file_allowed;
		let alreadyUploaded = document.querySelectorAll(
			'#tutor-student-assignment-edit-file-preview .tutor-instructor-card',
		).length;
		const allowedToUpload = maxAllowedFiles - alreadyUploaded;
		if (fileUploadField.files.length > allowedToUpload) {
			tutor_toast(__('Warning', 'tutor'), __(`Max ${maxAllowedFiles} file allowed to upload`, 'tutor'), 'error');
			return;
		}
		if (uploadedFileSize > uploadSizeLimit) {
			tutor_toast(
				__('Warning', 'tutor'),
				__(`File size exceeds maximum limit ${Math.floor(uploadSizeLimit / 1000000)} MB.`, 'tutor'),
				'error',
			);
			return;
		}

		if ('files' in fileUploadField) {
			if (fileUploadField && fileUploadField.files.length == 0) {
				message = 'Select one or more files.';
			} else {
				if (fileUploadField.files.length > allowedToUpload) {
					tutor_toast(__('Warning', 'tutor'), __(`Max ${maxAllowedFiles} file allowed to upload`, 'tutor'), 'error');
				}
				let fileCard = '';
				const assignmentFilePreview = document.querySelector('.tutor-asisgnment-upload-file-preview');
				const assignmentEditFilePreview = document.getElementById('tutor-student-assignment-edit-file-preview');

				for (let i = 0; i < allowedToUpload; i++) {
					let file = fileUploadField.files[i];
					if (!file) {
						continue;
					}
					let editWrapClass = assignmentEditFilePreview ? 'tutor-bs-col-sm-5 tutor-py-15 tutor-mr-15' : '';
					fileCard += `<div class="tutor-instructor-card ${editWrapClass}">
                                    <div class="tutor-icard-content">
                                        <div class="text-regular-body color-text-title">
                                            ${file.name}
                                        </div>
                                        <div class="text-regular-small">Size: ${file.size}</div>
                                    </div>
                                    <div onclick="(() => {
										this.closest('.tutor-instructor-card').remove();
									})()" class="tutor-attachment-file-close tutor-avatar tutor-is-xs flex-center">
                                        <span class="tutor-icon-cross-filled color-design-brand"></span>
                                    </div>
                                </div>`;
				}
				if (assignmentFilePreview) {
					assignmentFilePreview.innerHTML = fileCard;
				}
				if (assignmentEditFilePreview) {
					assignmentEditFilePreview.insertAdjacentHTML('beforeend', fileCard);
				}
			}
		}
	}

	/* Show More Text */
	const showMoreBtn = document.querySelector('.tutor-show-more-btn button');
	if (showMoreBtn) {
		showMoreBtn.addEventListener('click', showMore);
	}

	function showMore() {
		let lessText = document.getElementById('short-text');
		let dots = document.getElementById('dots');
		let moreText = document.getElementById('full-text');
		let btnText = document.getElementById('showBtn');
		let contSect = document.getElementById('content-section');
		if (dots.style.display === 'none') {
			lessText.style.display = 'block';
			dots.style.display = 'inline';
			btnText.innerHTML =
				"<span class='btn-icon tutor-icon-plus-filled color-design-brand'></span><span class='color-text-primary'>Show More</span>";
			moreText.style.display = 'none';
		} else {
			lessText.style.display = 'none';
			dots.style.display = 'none';
			btnText.innerHTML =
				"<span class='btn-icon tutor-icon-minus-filled color-design-brand'></span><span class='color-text-primary'>Show Less</span>";
			moreText.style.display = 'block';
			contSect.classList.add('no-before');
		}
	}
	//remove file
	const removeButton = document.querySelectorAll('.tutor-attachment-file-close a');
	removeButton.forEach((item) => {
		item.onclick = async (event) => {
			event.preventDefault();
			const currentTarget = event.currentTarget;
			let fileName = currentTarget.dataset.name;
			let id = currentTarget.dataset.id;
			const formData = new FormData();
			formData.set('action', 'tutor_remove_assignment_attachment');
			formData.set('assignment_comment_id', id);
			formData.set('file_name', fileName);
			formData.set(window.tutor_get_nonce_data(true).key, window.tutor_get_nonce_data(true).value);
			const span = currentTarget.querySelector('span');
			span.classList.add('tutor-updating-message');
			const post = await ajaxHandler(formData);
			if (post.ok) {
				const response = await post.json();
				if (!response) {
					tutor_toast(__('Warning', 'tutor'), __(`Attachment remove failed`, 'tutor'), 'error');
				} else {
					currentTarget.closest('.tutor-instructor-card').remove();
				}
			} else {
				alert(post.statusText);
				span.classList.remove('tutor-updating-message');
			}
		};
	});
});

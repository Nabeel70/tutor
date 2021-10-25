import '../../../v2-library/_src/js/main';

window.tutor_get_nonce_data=function(send_key_value) {

    var nonce_data = window._tutorobject || {};
    var nonce_key = nonce_data.nonce_key || '';
    var nonce_value = nonce_data[nonce_key] || '';

    if(send_key_value) {
        return {key:nonce_key, value:nonce_value};
    }

    return {[nonce_key]:nonce_value};
}

window.tutor_popup = function($, icon, padding) {

    var $this = this;
    var element; 

    this.popup_wrapper = function(wrapper_tag) {
        var img_tag = icon === '' ? '' : '<img class="tutor-pop-icon" src="'+window._tutorobject.tutor_url+'assets/images/'+icon+'.svg"/>';
        
        return '<'+wrapper_tag+' class="tutor-component-popup-container">\
            <div class="tutor-component-popup-'+padding+'">\
                <div class="tutor-component-content-container">'+img_tag+'</div>\
                <div class="tutor-component-button-container"></div>\
            </div>\
        </'+wrapper_tag+'>';
    }

    this.popup = function(data) {
        
        var title = data.title ? '<h3>'+data.title+'</h3>' : '';
        var description = data.description ? '<p>'+data.description+'</p>' : '';

        var buttons = Object.keys(data.buttons || {}).map(function(key) {
            var button = data.buttons[key];
            var button_id = button.id ? 'tutor-popup-'+button.id : ''; 
            return $('<button id="'+button_id+'" class="'+button.class+'">'+button.title+'</button>').click(button.callback);
        });

        element = $($this.popup_wrapper(data.wrapper_tag || 'div'));
        var content_wrapper = element.find('.tutor-component-content-container');

        content_wrapper.append(title);
        data.after_title ? content_wrapper.append(data.after_title) : 0;

        content_wrapper.append(description);
        data.after_description ? content_wrapper.append(data.after_description) : 0;

        // Assign close event on click black overlay
        element.click(function() {
            $(this).remove();
        }).children().click(function(e) {
            e.stopPropagation();
        });

        // Append action button
        for(var i=0; i<buttons.length; i++) {
            element.find('.tutor-component-button-container').append(buttons[i]);
        }
        
        $('body').append(element);

        return element;
    }

    return {popup: this.popup};
}

window.tutorDotLoader = (loaderType) => {
    return `    
    <div class="tutor-dot-loader ${loaderType ? loaderType: ''}">
        <span class="dot dot-1"></span>
        <span class="dot dot-2"></span>
        <span class="dot dot-3"></span>
        <span class="dot dot-4"></span>
    </div>`;
}

window.tutor_date_picker = () => {
    if (jQuery.datepicker){
        var format = _tutorobject.wp_date_format;
        if ( !format ) {
            format = "yy-mm-dd";
        }
        $( ".tutor_date_picker" ).datepicker({"dateFormat" : format});
    }
}

jQuery(document).ready(function($){
    'use strict';
    const { __, _x, _n, _nx } = wp.i18n;
    /**
     * Global date_picker selector 
     * 
     * @since 1.9.7
     */
    function load_date_picker() {
        if (jQuery.datepicker){
            var format = _tutorobject.wp_date_format;
            if ( !format ) {
                format = "yy-mm-dd";
            }
            $( ".tutor_date_picker" ).datepicker({"dateFormat" : format});
        }
        
        /** Disable typing on datePicker field */
        $(document).on('keydown', '.hasDatepicker, .tutor_date_picker', function( e ) {
            if ( e.keyCode !== 8 ) {
                e.preventDefault();
            }
        });
    };
    load_date_picker();
     

    /**
     * Video source tabs
     */

    if (jQuery().select2){
        $('.videosource_select2').select2({
            width: "100%",
            templateSelection: iformat,
            templateResult: iformat,
            allowHtml: true
        });
    }
    //videosource_select2

    function iformat(icon) {
        var originalOption = icon.element;
        return $('<span><i class="tutor-icon-' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
    }

    /**
     * Course Builder
     *
     * @since v.1.3.4
     */

    $(document).on( 'click', '.tutor-course-thumbnail-upload-btn',  function( event ){
        event.preventDefault();
        var $that = $(this);
        var frame;
        if ( frame ) {
            frame.open();
            return;
        }
        frame = wp.media({
            title: __( 'Select or Upload Media Of Your Chosen Persuasion', 'tutor' ),
            button: {
                text: __( 'Use this media', 'tutor' )
            },
            multiple: false
        });
        frame.on( 'select', function() {
            var attachment = frame.state().get('selection').first().toJSON();
            $that.closest('.tutor-thumbnail-wrap').find('.thumbnail-img').attr('src', attachment.url);
            $that.closest('.tutor-thumbnail-wrap').find('input').val(attachment.id);
            $('.tutor-course-thumbnail-delete-btn').show();
        });
        frame.open();
    });

    //Delete Thumbnail
    $(document).on( 'click', '.tutor-course-thumbnail-delete-btn',  function( event ){
        event.preventDefault();
        var $that = $(this);

        var placeholder_src = $that.closest('.tutor-thumbnail-wrap').find('.thumbnail-img').attr('data-placeholder-src');
        $that.closest('.tutor-thumbnail-wrap').find('.thumbnail-img').attr('src', placeholder_src);
        $that.closest('.tutor-thumbnail-wrap').find('input').val('');
        $('.tutor-course-thumbnail-delete-btn').hide();
    });

    $(document).on('change keyup', '.course-edit-topic-title-input', function (e) {
        e.preventDefault();
        $(this).closest('.tutor-topics-top').find('.topic-inner-title').html($(this).val());
    });

    $(document).on('click', '.tutor-topics-edit-button', function(e){
        e.preventDefault();
        var $button = $(this);
        var topics_id = $button.closest('.tutor-topics-wrap').find('[name="topic_id"]').val();;
        var topic_title = $button.closest('.tutor-topics-wrap').find('[name="topic_title"]').val();
        var topic_summery = $button.closest('.tutor-topics-wrap').find('[name="topic_summery"]').val();

        var data = {topic_title: topic_title, topic_summery : topic_summery, topic_id : topics_id, action: 'tutor_update_topic'};
        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : data,
            beforeSend: function () {
                $button.addClass('tutor-updating-message');
            },
            success: function (data) {
                if (data.success){
                    $button.closest('.tutor-topics-wrap').find('span.topic-inner-title').text(topic_title);
                    $button.closest('.tutor-modal').removeClass('tutor-is-active');
                }
            },
            complete: function () {
                $button.removeClass('tutor-updating-message');
            }
        });
    });

    /**
     * Delete Lesson from course builder
     */
    $(document).on('click', '.tutor-delete-lesson-btn', function(e){
        e.preventDefault();

        if( ! confirm( __( 'Are you sure to delete?', 'tutor' ) )){
            return;
        }

        var $that = $(this);
        var lesson_id = $that.attr('data-lesson-id');

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {lesson_id : lesson_id, action: 'tutor_delete_lesson_by_id'},
            beforeSend: function () {
                $that.addClass('tutor-updating-message');
            },
            success: function (data) {
                if (data.success){
                    $that.closest('.course-content-item').remove();
                }
            },
            complete: function () {
                $that.removeClass('tutor-updating-message');
            }
        });
    });

    /**
     * Quiz Modal
     */

    $(document).on('click', '.modal-close-btn', function(e){
        e.preventDefault();
        $('.tutor-modal-wrap').removeClass('show');
    });
    $(document).on('keyup', function(e){
        if (e.keyCode === 27){
            $('.tutor-modal-wrap').removeClass('show');
        }
    });

    /**
     * Quiz Builder Modal Tabs
     */
    $(document).on('click', '.tutor-quiz-modal-tab-item', function(e){
        e.preventDefault();

        var $that = $(this);

        var $quizTitle = $('[name="quiz_title"]');
        var quiz_title = $quizTitle.val();
        if ( ! quiz_title){
            $quizTitle.closest('.tutor-quiz-builder-form-row').find('.quiz_form_msg').html('<p class="quiz-form-warning">Please save the quiz' +
                ' first</p>');
            return;
        }else{
            $quizTitle.closest('.tutor-quiz-builder-form-row').find('.quiz_form_msg').html('');
        }

        var tabSelector = $that.attr('href');
        $('.quiz-builder-tab-container').hide();
        $(tabSelector).show();

        $('a.tutor-quiz-modal-tab-item').removeClass('active');
        $that.addClass('active');
    });

    $(document).on('click', '.quiz-modal-tab-navigation-btn.quiz-modal-btn-cancel', function(e){
        e.preventDefault();
        $('.tutor-modal-wrap').removeClass('show');
    });

    /**
     * Get question answers option edit form
     *
     * @since v.1.0.0
     */
    $(document).on('click', '.tutor-quiz-answer-edit a', function(e){
        e.preventDefault();

        var $that = $(this);
        var answer_id = $that.closest('.tutor-quiz-answer-wrap').attr('data-answer-id');

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {answer_id : answer_id, action : 'tutor_quiz_edit_question_answer'},
            beforeSend: function () {
                $that.addClass('tutor-updating-message');
            },
            success: function (data) {
                $('#tutor_quiz_question_answer_form').html(data.data.output);
            },
            complete: function () {
                $that.removeClass('tutor-updating-message');
            }
        });
    });

    /**
     * Saving question answers options
     * Student should select the right answer at quiz attempts
     *
     * @since v.1.0.0
     */

    $(document).on('click', '#quiz-answer-save-btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var $formInput = $('#tutor-quiz-question-wrapper :input').serializeObject();
        $formInput.action = 'tutor_save_quiz_answer_options';

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : $formInput,
            beforeSend: function () {
                $('#quiz_validation_msg_wrap').html("");
                $that.addClass('tutor-updating-message');
            },
            success: function (data) {
                $('#tutor_quiz_question_answers').trigger('refresh');
            },
            complete: function () {
                $that.removeClass('tutor-updating-message');
            }
        });
    });

    /**
     * Updating Answer
     *
     * @since v.1.0.0
     */
    $(document).on('click', '#quiz-answer-edit-btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var $formInput = $('#tutor-quiz-question-wrapper :input').serializeObject();
        $formInput.action = 'tutor_update_quiz_answer_options';

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : $formInput,
            beforeSend: function () {
                $that.addClass('tutor-updating-message');
            },
            success: function (data) {
                $('#tutor_quiz_question_answers').trigger('refresh');
            },
            complete: function () {
                $that.removeClass('tutor-updating-message');
            }
        });
    });

    $(document).on('change', '.tutor-quiz-answers-mark-correct-wrap input', function(e){
        e.preventDefault();

        var $that = $(this);

        var answer_id = $that.val();
        var inputValue = 1;
        if ( ! $that.prop('checked')) {
            inputValue = 0;
        }

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {answer_id:answer_id, inputValue : inputValue, action : 'tutor_mark_answer_as_correct'},
        });
    });



    /**
     * Delete answer for a question in quiz builder
     *
     * @since v.1.0.0
     */

    $(document).on('click', '.tutor-quiz-answer-trash-wrap a.answer-trash-btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var answer_id = $that.attr('data-answer-id');

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {answer_id : answer_id, action: 'tutor_quiz_builder_delete_answer'},
            beforeSend: function () {
                $that.closest('.tutor-quiz-answer-wrap').remove();
            },
        });
    });


    /**
     * Delete Quiz
     * @since v.1.0.0
     */

    $(document).on('click', '.tutor-delete-quiz-btn', function(e){
        e.preventDefault();

        if( ! confirm( __( 'Are you sure to delete?', 'tutor' ) )){
            return;
        }

        var $that = $(this);
        var quiz_id = $that.attr('data-quiz-id');

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {
                quiz_id : quiz_id, 
                action: 'tutor_delete_quiz_by_id'
            },
            beforeSend: function () {
                $that.addClass('tutor-updating-message');
            },
            success: function(resp) {
                const {data={}, success} = resp || {};
                const {message=__('Something Went Wrong!')} = data;

                if(success) {
                    $that.closest('.course-content-item').remove();
                    return;
                }

                tutor_toast('Error!', message, 'error');
            },
            complete:function() {
                $that.removeClass('tutor-updating-message')
            }
        });
    });

    $(document).on('click', '.tutor-media-upload-btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var frame;
        if ( frame ) {
            frame.open();
            return;
        }
        frame = wp.media({
            title: __( 'Select or Upload Media Of Your Chosen Persuasion', 'tutor' ),
            button: {
                text: __( 'Use this media', 'tutor' )
            },
            multiple: false
        });
        frame.on( 'select', function() {
            var attachment = frame.state().get('selection').first().toJSON();
            $that.html('<img src="'+attachment.url+'" alt="" />');
            $that.closest('.tutor-media-upload-wrap').find('input').val(attachment.id);
        });
        frame.open();
    });
    $(document).on('click', '.tutor-media-upload-trash', function(e){
        e.preventDefault();

        var $that = $(this);
        $that.closest('.tutor-media-upload-wrap').find('.tutor-media-upload-btn').html('<i class="tutor-icon-image1"></i>');
        $that.closest('.tutor-media-upload-wrap').find('input').val('');
    });

    /**
     * Delay Function
     */

    var tutor_delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    /**
     * Add instructor modal
     */
    $(document).on('click', '.tutor-add-instructor-btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var course_id = $('#post_ID').val();

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {course_id : course_id, action: 'tutor_load_instructors_modal'},
            beforeSend: function () {
                $that.addClass('tutor-updating-message');
            },
            success: function (data) {
                if (data.success){
                    $('.tutor-instructors-modal-wrap .modal-container').html(data.data.output);
                    $('.tutor-instructors-modal-wrap').addClass('show');
                }
            },
            complete: function () {
                $that.removeClass('tutor-updating-message');
            }
        });
    });

    $(document).on('change keyup', '.tutor-instructors-modal-wrap .tutor-modal-search-input', function(e){
        e.preventDefault();

        var $that = $(this);
        var $modal = $('.tutor-modal-wrap');

        tutor_delay(function(){
            var search_terms = $that.val();
            var course_id = $('#post_ID').val();

            $.ajax({
                url : window._tutorobject.ajaxurl,
                type : 'POST',
                data : {course_id : course_id, search_terms : search_terms, action: 'tutor_load_instructors_modal'},
                beforeSend: function () {
                    $modal.addClass('loading');
                },
                success: function (data) {
                    if (data.success){
                        $('.tutor-instructors-modal-wrap .modal-container').html(data.data.output);
                        $('.tutor-instructors-modal-wrap').addClass('show');
                    }
                },
                complete: function () {
                    $modal.removeClass('loading');
                }
            });

        }, 1000)
    });
    $(document).on('click', '.add_instructor_to_course_btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var $modal = $('.tutor-modal-wrap');
        var course_id = $('#post_ID').val();
        
        var data = $modal.find('input').serializeObject();
        data.course_id = course_id;
        data.action = 'tutor_add_instructors_to_course';

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : data,
            beforeSend: function () {
                $that.addClass('tutor-updating-message');
            },
            success: function (data) {
                if (data.success){
                    $('.tutor-course-available-instructors').html(data.data.output);
                    $('.tutor-modal-wrap').removeClass('show');
                }
            },
            complete: function () {
                $that.removeClass('tutor-updating-message');
            }
        });
    });

    $(document).on('click', '.tutor-instructor-delete-btn', function(e){
        e.preventDefault();

        var $that = $(this);
        var course_id = $('#post_ID').val();
        var instructor_id = $that.closest('.added-instructor-item').attr('data-instructor-id');

        $.ajax({
            url : window._tutorobject.ajaxurl,
            type : 'POST',
            data : {course_id:course_id, instructor_id:instructor_id, action : 'detach_instructor_from_course'},
            success: function (data) {
                if (data.success){
                    $that.closest('.added-instructor-item').remove();
                }
            }
        });
    });

    $(document).on('click', '.settings-tabs-navs li', function(e){
        e.preventDefault();

        var $that = $(this);
        var data_target = $that.find('a').attr('data-target');
        var url = $that.find('a').attr('href');

        $that.addClass('active').siblings('li.active').removeClass('active');
        $('.settings-tab-wrap').removeClass('active').hide();
        $(data_target).addClass('active').show();

        window.history.pushState({}, '', url);
    });

    /**
     * Re init required
     * Modal Loaded...
     */

    $(document).on('lesson_modal_loaded quiz_modal_loaded assignment_modal_loaded', function(e, obj){
        if (jQuery().select2){
            $('.select2_multiselect').select2({
                dropdownCssClass:'increasezindex'
            });
        }
        load_date_picker();
    });
    
    /**
     * Tutor number validation
     *
     * @since v.1.6.3
     */
    $(document).on('keyup change', '.tutor-number-validation', function(e) {
        var input = $(this);
        var val = parseInt(input.val());
        var min = parseInt(input.attr('data-min'));
        var max = parseInt(input.attr('data-max'));
        if ( val < min )  { 
            input.val(min);
        } else if ( val > max ) {
            input.val(max);
        }
    });

    /*
    * @since v.1.6.4
    * Quiz Attempts Instructor Feedback 
    */
   $(document).on('click', '.tutor-instructor-feedback', function(e) {

    e.preventDefault();
    var $that = $(this);
    
    $.ajax({
        url : (window.ajaxurl || _tutorobject.ajaxurl),
        type : 'POST',
        data : {attempts_id: $that.data('attemptid'), feedback: $('.tutor-instructor-feedback-content').val() , action: 'tutor_instructor_feedback'},
        beforeSend: function () {
            $that.addClass('tutor-updating-message'); 
        },
        success: function (data) {
            if (data.success){
                $that.closest('.course-content-item').remove();
                tutor_toast(__('Success', 'tutor'), $that.data('toast_success_message'), 'success');
            }
        },
        complete: function () {
            $that.removeClass('tutor-updating-message');
        }
        });
    });

    //dropdown toggle
    $(document).click(function(){
        $(".tutor-dropdown").removeClass('show');
      });

      $(".tutor-dropdown").click(function(e){
        e.stopPropagation();
        if ( $('.tutor-dropdown').hasClass('show') ) {
            $('.tutor-dropdown').removeClass('show')
        }
        $(this).addClass('show');
      });

   /**
    * @since v.1.8.6
    * SUbmit form through ajax
    */
    $('.tutor-form-submit-through-ajax').submit(function(e) {
        e.preventDefault();

        var $that = $(this);
        var url = $(this).attr('action') || window.location.href;
        var type = $(this).attr('method') || 'GET';
        var data = $(this).serializeObject();

        $that.find('button').addClass('tutor-updating-message');

        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function() {
                tutor_toast(__('Success', 'tutor'), $that.data('toast_success_message'), 'success');
            },
            complete: function () {
                $that.find('button').removeClass('tutor-updating-message');
            }
        });
    });

    /*
    * @since v.1.7.9
    * Send wp nonce to every ajax request
    */
    $.ajaxSetup({data : tutor_get_nonce_data()});
});

jQuery.fn.serializeObject = function()
{
   var values = {};
   var array = this.serializeArray();

   jQuery.each(array, function() {
       if (values[this.name]) {
           if (!values[this.name].push) {
               values[this.name] = [values[this.name]];
           }
           values[this.name].push(this.value || '');
       } else {
           values[this.name] = this.value || '';
       }
   });

   return values;
};

window.tutor_toast=function(title, description, type) {
    var tutor_ob = window._tutorobject || {};
    var asset = (tutor_ob.tutor_url || '') + 'assets/images/';

    if(!jQuery('.tutor-toast-parent').length) {
        jQuery('body').append('<div class="tutor-toast-parent"></div>');
    }

    var icons = {
        success : asset+'icon-check.svg',
        error: asset+'icon-cross.svg'
    }
    
    var content = jQuery('\
        <div>\
            <div>\
                <img src="'+icons[type]+'"/>\
            </div>\
            <div>\
                <div>\
                    <b>'+title+'</b>\
                    <span>'+description+'</span>\
                </div>\
            </div>\
            <div>\
                <i class="tutor-toast-close tutor-icon-line-cross"></i>\
            </div>\
        </div>');

    content.find('.tutor-toast-close').click(function() {
        content.remove();
    });

    jQuery('.tutor-toast-parent').append(content);

    setTimeout(function() {
        if(content) {
            content.fadeOut('fast', function() {
                jQuery(this).remove();
            });
        }
    }, 5000);
}
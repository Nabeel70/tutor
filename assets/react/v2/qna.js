import { get_response_message } from "../helper/response";

window.jQuery(document).ready($=>{
    const {__} = wp.i18n;

    // Change view as mode at frontend dashboard
    $('.tutor-dashboard-qna-vew-as input[type="checkbox"]').prop('disabled', false);
    $(document).on('change', '.tutor-dashboard-qna-vew-as input[type="checkbox"]', function() {
        var is_instructor = $(this).prop('checked');

        $(this).prop('disabled', true);
        window.location.replace($(this).data(is_instructor ? 'as_instructor_url' : 'as_student_url'));
    });

    // Change badge
    $(document).on('click', '.tutor-qna-badges-wrapper [data-action]', function(e){
        e.preventDefault();

        let row = $(this).closest('tr');
        let qna_action = $(this).data('action');
        let question_id = $(this).closest('[data-question_id]').data('question_id');
        let button = $(this);

        $.ajax({
            url: _tutorobject.ajaxurl,
            type: 'POST',
            data: {
                question_id, 
                qna_action, 
                action: 'tutor_qna_single_action'
            },
            beforeSend:()=>{
                button.addClass('tutor-updating-message');
            },
            success: resp=>{
                if(!resp.success) {
                    tutor_toast('Error!', get_response_message(resp), 'error');
                    return;
                }

                const {new_value} = resp.data;

                // Toggle class if togglable defined
                if(button.data('state-class-0')) {

                    // Get toggle class
                    var remove_class = button.data( new_value==1 ? 'state-class-0' : 'state-class-1' );
                    var add_class = button.data( new_value==1 ? 'state-class-1' : 'state-class-0' );

                    console.log(remove_class, add_class);

                    var class_element = button.data('state-class-selector') ? button.find(button.data('state-class-selector')) : button;
                    class_element.removeClass(remove_class).addClass(add_class);
                    
                    // Toggle active class
                    class_element[new_value==1 ? 'addClass' : 'removeClass']('active');
                }
                
                // Toggle text if togglable text defined
                if(button.data('state-text-0')) {
                        
                    // Get toggle text
                    var new_text = button.data( new_value==1 ? 'state-text-1' : 'state-text-0' );
                
                    console.log(button.data('state-text-selector'));
                    var text_element = button.data('state-text-selector') ? button.find(button.data('state-text-selector')) : button;
                    text_element.text(new_text);
                }

                // Update read unread
                if(qna_action=='read') {
                    let method = new_value==0 ? 'removeClass' : 'addClass';
                    row.find('.tutor-qna-question-col')[method]('is-read');
                }
            },
            complete:()=>{
                button.removeClass('tutor-updating-message');
            }
        });
    });

    // Save/update question/reply
    $(document).on('click', '.tutor-qa-reply button, .tutor-qa-new button', function(){
        let button      = $(this);
        let form        = button.closest('[data-question_id]');

        let question_id = button.closest('[data-question_id]').data('question_id');
        let course_id   = button.closest('[data-course_id]').data('course_id');
        let context     = button.closest('[data-context]').data('context');
        let answer      = form.find('textarea').val();
        let back_url    = $(this).data('back_url');

        $.ajax({
            url: _tutorobject.ajaxurl,
            type: 'POST',
            data: {
                course_id,
                question_id,
                context,
                answer,
                back_url,
                action: 'tutor_qna_create_update'
            },
            beforeSend: () =>{
                button.addClass('tutor-updating-message');
            },
            success: resp => {
                if(!resp.success) {
                    tutor_toast('Error!', get_response_message(resp), 'error');
                    return;
                }

                // Append content
                if(question_id) {
                    $('.tutor-qna-single-question').filter('[data-question_id="'+question_id+'"]').replaceWith(resp.data.html);
                } else {
                    $('.tutor-qna-single-question').eq(0).before(resp.data.html);
                }
                //on successful reply make the textarea empty
                if ($("#sideabr-qna-tab-content .tutor-quesanswer-askquestion textarea")) {
                    $("#sideabr-qna-tab-content .tutor-quesanswer-askquestion textarea").val('');
                }
                if ($(".tutor-quesanswer-askquestion textarea")) {
                    $(".tutor-quesanswer-askquestion textarea").val('');
                }
            },
            complete: () =>{
                button.removeClass('tutor-updating-message');
            }
        })
    });

    $(document).on('click', '.tutor-toggle-reply span', function(){
        $(this).closest('.tutor-qna-chat').nextAll().toggle();
        $(this).closest('.tutor-qna-single-wrapper').find('.tutor-qa-reply').toggle();
    });
});
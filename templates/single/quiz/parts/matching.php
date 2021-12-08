<div id="quiz-matching-ans-area" class="quiz-question-ans-choice-area tutor-mt-40 question-type-<?php echo $question_type; ?> <?php echo $answer_required? 'quiz-answer-required':''; ?> ">
    <div class="matching-quiz-question-desc tutor-draggable d-flex align-items-start">
        <?php
            $rand_answers = tutor_utils()->get_answers_by_quiz_question($question->question_id, true);
            foreach ($rand_answers as $rand_answer){
        ?>
        <div class="tutor-quiz-border-box" draggable="true">
            <?php
                if ($question_type === 'matching'){
                    echo '<span class="tutor-dragging-text-conent text-regular-body color-text-primary">'.stripslashes($rand_answer->answer_two_gap_match).'</span>';
                }else{
                    echo '<span class="tutor-dragging-text-conent text-regular-body color-text-primary">'.stripslashes($rand_answer->answer_title).'</span>';
                }
            ?>
            <span class="ttr-humnurger-filled color-black-fill"></span>
            <input type="hidden" data-name="attempt[<?php echo $is_started_quiz->attempt_id; ?>][quiz_question][<?php echo $question->question_id; ?>][answers][]" value="<?php echo $rand_answer->answer_id; ?>" >
        </div>
        <?php } ?>
    </div>
    
    <?php
        if ( is_array($answers) && count($answers) ) {
        $answer_i = 0;
            foreach ($answers as $answer){
                $answer_i++;
    ?>
    <div class="quiz-matching-ans">
        <div class="tutor-quiz-ans-no text-medium-body color-text-primary">
            <?php 
                if($answer_i < 9){
                    echo 0;
                }
                echo $answer_i.'. '; 

                echo stripslashes($answer->answer_title);
            ?> 
        </div>
        <div class="quiz-matching-ans-item">
            <span class="text-medium-body color-text-primary">-</span>
            <div class="tutor-quiz-dotted-box tutor-dropzone">
                <span class="tutor-dragging-text-conent text-regular-body color-text-primary">
                    <?php _e('Drag your ans', 'tutor'); ?>
                </span>
            </div>
        </div>
    </div>
    <?php } } ?>
</div>
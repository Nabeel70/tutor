<?php
    $passing_grade = tutor_utils()->get_quiz_option(get_the_ID(), 'passing_grade', 0);
?>
<?php if(!empty($back_url)): ?>
    <div class="color-text-primary back">
        <a href="<?php echo $back_url; ?>">
            <span class="ttr-previous-line"></span> <span class="text"><?php _e('Back', 'tutor'); ?></span>
        </a>
    </div>
<?php endif; ?>

<div class="text-regular-small color-text-subsued tutor-mt-30">
    <?php _e('Quiz', 'tutor'); ?>
</div>

<div class="header-title text-medium-h5 color-text-primary tutor-mt-10 tutor-mb-30">
    <?php echo $quiz_title; ?>
</div>
<div class="d-flex justify-content-between tutor-py-20 tutor-my-20 tutor-border-top tutor-border-bottom">
    <div class="flex">
        <?php _e('Questions', 'tutor'); ?>: 
        <span class="color-text-primary">
            <?php echo $question_count; ?>
        </span>
    </div>
    <div class="flex">
        <?php _e('Quiz Time', 'tutor'); ?>: 
        <span class="color-text-primary">
            <?php echo $quiz_time; ?>
        </span>
    </div>
    <div class="flex">
        <?php _e('Total Marks', 'tutor'); ?>: 
        <span class="color-text-primary">
            <?php echo $total_marks; ?>
        </span>
    </div>
    <div class="flex">
        <?php _e('Passing Marks', 'tutor'); ?>: 
        <span class="color-text-primary">
            <?php
                $pass_marks = ($total_marks * $passing_grade) / 100;
                echo number_format_i18n($pass_marks, 2);
			?>
        </span>
    </div>
</div>
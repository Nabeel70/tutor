<div class="course-contents tutor-course-builder-content-container">

    <div class="wp_editor_config_example" style="display: none;">
        <?php wp_editor('', 'tutor_editor_config'); ?>
    </div>

	<?php
	if (empty($current_topic_id)){
		$current_topic_id = (int) tutor_utils()->avalue_dot('current_topic_id', $_POST);
	}

	$query_lesson = tutor_utils()->get_lesson($course_id, -1);
	// $query_topics = tutor_utils()->get_topics($course_id);
	$attached_lesson_ids = array();

    // tutor_utils()->get_topics function doesn't work correctly for multi instructor case. Rather use get_posts.    
    $topic_args = array(
        'post_type'  => 'topics',
        'post_parent'  => $course_id,
        'orderby' => 'menu_order',
        'order'   => 'ASC',
        'posts_per_page'    => -1,
    );
    $query_topics = (object) array('posts' => get_posts($topic_args));

	if ( ! count($query_topics->posts)){
		echo '<p class="course-empty-content">'.__('Add a topic to build your course', 'tutor').'</p>';
	}

	foreach ($query_topics->posts as $topic){
		?>
        <div id="tutor-topics-<?php echo $topic->ID; ?>" class="tutor-topics-wrap">
            <div class="tutor-topics-top">
                <h4 class="tutor-topic-title">
                    <i class="tutor-icon-move course-move-handle"></i>
                    <span class="topic-inner-title"><?php echo stripslashes($topic->post_title); ?></span>

                    <span class="tutor-topic-inline-edit-btn ">
                        <i class="tutor-icon-pencil topic-edit-icon" data-tutor-modal-target="tutor-topics-edit-id-<?php echo $topic->ID; ?>"></i>
                    </span>
                    <span class="topic-delete-btn">
                        <a href="<?php echo wp_nonce_url(admin_url('admin.php?action=tutor_delete_topic&topic_id='.$topic->ID), tutor()->nonce_action, tutor()->nonce); ?>" title="<?php _e('Delete Topic', 'tutor'); ?>" data-topic-id="<?php echo $topic->ID; ?>">
                            <i class="tutor-icon-garbage"></i>
                        </a>
                    </span>

                    <span class="expand-collapse-wrap">
                        <a href="javascript:;"><i class="tutor-icon-light-down"></i> </a>
                    </span>
                </h4>

                <?php 
                    tutor_load_template_from_custom_path(tutor()->path.'/views/metabox/segments/topic-form-modal.php', array(
                        'wrapper_id' => 'tutor-topics-edit-id-' . $topic->ID,
                        'topic_id' => $topic->ID,
                        'course_id' => $course_id,
                        'title' => $topic->post_title,
                        'summary' => $topic->post_content,
                        'wrapper_class' => 'tutor-topics-edit-form',
                        'button_text' => __('Update Topic', 'tutor'),
                        'button_class' => 'tutor-topics-edit-button'
                    ), false); 
                ?>
            </div>
            <div class="tutor-topics-body" style="display: <?php echo $current_topic_id == $topic->ID ? 'block' : 'none'; ?>;">

                <div class="tutor-lessons"><?php
                    // Below function doesn't work somehow because of using WP_Query in ajax call. Will be removed in future.
					// $lessons = tutor_utils()->get_course_contents_by_topic($topic->ID, -1); 
                    
		            $post_type = apply_filters( 'tutor_course_contents_post_types', array( tutor()->lesson_post_type, 'tutor_quiz' ) );
                    $lessons = (object) array('posts' => get_posts(array(
                        'post_type'      => $post_type,
                        'post_parent'    => $topic->ID,
                        'posts_per_page' => -1,
                        'orderby'        => 'menu_order',
                        'order'          => 'ASC',
                    )));

					foreach ($lessons->posts as $lesson){
						$attached_lesson_ids[] = $lesson->ID;

						if ($lesson->post_type === 'tutor_quiz'){
							$quiz = $lesson;
							?>
                            <div id="tutor-quiz-<?php echo $quiz->ID; ?>" class="course-content-item tutor-quiz tutor-quiz-<?php echo $topic->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="open-tutor-quiz-modal" data-quiz-id="<?php echo $quiz->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>">
                                        <i class=" tutor-icon-doubt"></i>[<?php _e('QUIZ', 'tutor'); ?>] <?php echo stripslashes($quiz->post_title); ?>
                                    </a>
                                    <?php do_action('tutor_course_builder_before_quiz_btn_action', $quiz->ID); ?>
                                    <a href="javascript:;" class="tutor-delete-quiz-btn" data-quiz-id="<?php echo $quiz->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>

							<?php
						}elseif($lesson->post_type === 'tutor_assignments'){
							?>
                            <div id="tutor-assignment-<?php echo $lesson->ID; ?>" class="course-content-item tutor-assignment tutor-assignment-<?php echo
							$lesson->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="open-tutor-assignment-modal" data-assignment-id="<?php echo $lesson->ID; ?>"
                                       data-topic-id="<?php echo $topic->ID; ?>"><i class="tutor-icon-clipboard"></i> <?php echo
                                        $lesson->post_title; ?> </a>
                                    <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $lesson->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>
							<?php
                        } elseif ($lesson->post_type === 'tutor_zoom_meeting'){
							?>
                            <div id="tutor-zoom-meeting-<?php echo $lesson->ID; ?>" class="course-content-item tutor-zoom-meeting-item tutor-zoom-meeting-<?php echo $lesson->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="tutor-zoom-meeting-modal-open-btn" data-meeting-id="<?php echo $lesson->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>" data-click-form="course-builder">
                                        <?php echo stripslashes($lesson->post_title); ?>
                                    </a>
                                    <a href="javascript:;" class="tutor-zoom-meeting-delete-btn" data-meeting-id="<?php echo $lesson->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>
							<?php
                        } else {
							?>
                            <div id="tutor-lesson-<?php echo $lesson->ID; ?>" class="course-content-item tutor-lesson tutor-lesson-<?php echo
							$lesson->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="open-tutor-lesson-modal" data-lesson-id="<?php echo $lesson->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>"><?php echo stripslashes($lesson->post_title); ?> </a>
                                    <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $lesson->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>
							<?php
						}
					}
                ?></div>

                <div class="tutor_add_quiz_wrap" data-add-quiz-under="<?php echo $topic->ID; ?>">
                    <div class="tutor-add-cotnents-btn-group tutor-add-quiz-button-wrap">

	                    <?php do_action('tutor_course_builder_before_btn_group', $topic->ID); ?>

                        <a href="javascript:;" class="open-tutor-lesson-modal create-lesson-in-topic-btn" data-topic-id="<?php echo $topic->ID; ?>" data-lesson-id="0" >
                            <i class="tutor-icon-plus-square-button"></i>
                            <?php _e('Lesson', 'tutor'); ?>
                        </a>
                        <a href="javascript:;" class="tutor-add-quiz-btn" data-topic-id="<?php echo $topic->ID; ?>">
                            <i class="tutor-icon-plus-square-button"></i>
                            <?php _e('Quiz', 'tutor'); ?>
                        </a>
                        <?php do_action('tutor_course_builder_after_btn_group', $topic->ID); ?>
                    </div>
                </div>
            </div>
        </div>
		<?php
	}
	?>
    <input type="hidden" id="tutor_topics_lessons_sorting" name="tutor_topics_lessons_sorting" value="" />
</div>


<?php 
	if ( count( $query_lesson ) > count( $attached_lesson_ids ) ) {
		?>
        <div class="tutor-untopics-lessons tutor-course-builder-content-container">
            <h3><?php _e( 'Un-assigned lessons' ); ?></h3>

            <div class="tutor-lessons "><?php
				foreach ( $query_lesson as $lesson ) {
					if ( ! in_array( $lesson->ID, $attached_lesson_ids ) ) {

						if ($lesson->post_type === 'tutor_quiz'){
							$quiz = $lesson;
							?>
                            <div id="tutor-quiz-<?php echo $quiz->ID; ?>" class="course-content-item tutor-quiz tutor-quiz-<?php echo $topic->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="open-tutor-quiz-modal" data-quiz-id="<?php echo $quiz->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>">
                                        <i class=" tutor-icon-doubt"></i>[<?php _e('QUIZ', 'tutor'); ?>] <?php echo stripslashes($quiz->post_title); ?>
                                    </a>
                                    <?php do_action('tutor_course_builder_before_quiz_btn_action', $quiz->ID); ?>
                                    <a href="javascript:;" class="tutor-delete-quiz-btn" data-quiz-id="<?php echo $quiz->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>

							<?php
						}elseif($lesson->post_type === 'tutor_assignments'){
							?>
                            <div id="tutor-assignment-<?php echo $lesson->ID; ?>" class="course-content-item tutor-assignment tutor-assignment-<?php echo
							$lesson->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="open-tutor-assignment-modal" data-assignment-id="<?php echo $lesson->ID; ?>"
                                       data-topic-id="<?php echo $topic->ID; ?>"><i class="tutor-icon-clipboard"></i> <?php echo
										stripslashes($lesson->post_title); ?> </a>
                                    <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $lesson->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>
							<?php
						} else{
							?>
                            <div id="tutor-lesson-<?php echo $lesson->ID; ?>" class="course-content-item tutor-lesson tutor-lesson-<?php echo
							$lesson->ID; ?>">
                                <div class="tutor-lesson-top">
                                    <i class="tutor-icon-move"></i>
                                    <a href="javascript:;" class="open-tutor-lesson-modal" data-lesson-id="<?php echo $lesson->ID; ?>" data-topic-id="<?php echo is_object($topic) ? $topic->ID : ''; ?>"><?php echo stripslashes($lesson->post_title); ?> </a>
                                    <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $lesson->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>
							<?php
						}

					}
				}
            ?></div>
        </div>
	<?php }
?>
<div class="wp_editor_config_example" style="display: none;">
    <?php wp_editor('', 'tutor_lesson_editor_config'); ?>
</div>

<div class="wp_editor_config_example" style="display: none;">
    <?php wp_editor('', 'tutor_assignment_editor_config'); ?>
</div>

<div class="course-contents tutor-course-builder-content-container">

	<?php
	$query_lesson = tutor_utils()->get_lesson($course_id, -1);
	$attached_lesson_ids = array();

    // tutor_utils()->get_topics function doesn't work correctly for multi instructor case. Rather use get_posts.    
    $query_topics = get_posts(array(
        'post_type'      => 'topics',
        'post_parent'    => $course_id,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
        'posts_per_page' => -1,
    ));
    
	foreach ($query_topics as $topic){
		?>
        <div id="tutor-topics-<?php echo $topic->ID; ?>" class="tutor-topics-wrap" data-topic-id="<?php echo $topic->ID; ?>">
            <div class="tutor-topics-top">
                <div class="tutor-topic-title">
                    <span class="ttr-humnurger-filled tutor-icon-24 course-move-handle"></span>
                    <span class="topic-inner-title tutor-text-bold-body tutor-color-text-primary"><?php echo stripslashes($topic->post_title); ?></span>
                    <span class="tutor-topic-inline-edit-btn tutor-topic-btn-hover tutor-font-size-24">
                        <i class="color-text-hints ttr-edit-filled tutor-icon-24" data-tutor-modal-target="tutor-topics-edit-id-<?php echo $topic->ID; ?>"></i>
                    </span>
                    <span class="topic-delete-btn tutor-topic-btn-hover tutor-font-size-24">
                        <i class="color-text-hints ttr-delete-stroke-filled tutor-icon-24"></i>
                    </span>
                    <span class="expand-collapse-wrap tutor-topic-btn-hover tutor-font-size-24">
                        <i class="color-text-brand pops ttr-angle-down-filled tutor-icon-26"></i>
                    </span>
                </div>
                <?php 
                    tutor_load_template_from_custom_path(tutor()->path.'/views/modal/topic-form.php', array(
                        'modal_title'   => __('Update Topic', 'tutor'),
                        'wrapper_id'    => 'tutor-topics-edit-id-' . $topic->ID,
                        'topic_id'      => $topic->ID,
                        'course_id'     => $course_id,
                        'title'         => $topic->post_title,
                        'summary'       => $topic->post_content,
                        'wrapper_class' => 'tutor-topics-edit-form',
                        'button_text'   => __('Update Topic', 'tutor'),
                        'button_class'  => 'tutor-save-topic-btn'
                    ), false); 
                ?>
            </div>
            <div class="tutor-topics-body" style="display: <?php echo (isset($current_topic_id) && $current_topic_id == $topic->ID) ? 'block' : 'none'; ?>;">
                <div class="tutor-lessons"><?php
                    // Below function doesn't work somehow because of using WP_Query in ajax call. Will be removed in future.
		            $post_type = apply_filters( 'tutor_course_contents_post_types', array( tutor()->lesson_post_type, 'tutor_quiz' ) );
                    $contents = (object) array('posts' => get_posts(array(
                        'post_type'      => $post_type,
                        'post_parent'    => $topic->ID,
                        'posts_per_page' => -1,
                        'orderby'        => 'menu_order',
                        'order'          => 'ASC',
                    )));

                    $counter = array(
                        'lesson' => 0,
                        'quiz' => 0,
                        'assignment' => 0
                    );

					foreach ($contents->posts as $content){
						$attached_lesson_ids[] = $content->ID;

						if ($content->post_type === 'tutor_quiz'){
							$quiz = $content;
                            $counter['quiz']++;
                            tutor_load_template_from_custom_path(tutor()->path.'/views/fragments/quiz-list-single.php', array(
                                'quiz_id' => $quiz->ID,
                                'topic_id' => $topic->ID,
                                'quiz_title' => __('Quiz', 'tutor').' '.$counter['quiz'].': '. $quiz->post_title,
                            ), false);

						} elseif ($content->post_type === 'tutor_assignments'){
                            $counter['assignment']++;
							?>
                            <div id="tutor-assignment-<?php echo $content->ID; ?>" class="course-content-item tutor-assignment tutor-assignment-<?php echo $content->ID; ?>">
                                <div class="tutor-course-content-top">
                                    <span class="color-text-hints ttr-humnurger-filled tutor-font-size-24 tutor-pr-10"></span>
                                    <a href="javascript:;" class="open-tutor-assignment-modal" data-assignment-id="<?php echo $content->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>">
                                        <?php echo __('Assignment', 'tutor').' '.$counter['assignment'].': '. $content->post_title; ?> 
                                    </a>
                                    <div class="tutor-course-content-top-right-action">
                                        <a href="javascript:;" class="open-tutor-assignment-modal" data-assignment-id="<?php echo $content->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>">
                                            <span class="color-text-hints ttr-edit-filled tutor-font-size-24"></span>
                                        </a>
                                        <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $content->ID; ?>">
                                            <span class="color-text-hints ttr-delete-stroke-filled tutor-font-size-24"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
							<?php
                        } else if($content->post_type=='lesson') {
                            $counter['lesson']++;
							?>
                            <div id="tutor-lesson-<?php echo $content->ID; ?>" class="course-content-item tutor-lesson tutor-lesson-<?php echo $content->ID; ?>">
                                <div class="tutor-course-content-top">
                                    <span class="color-text-hints ttr-humnurger-filled tutor-font-size-24 tutor-pr-6"></span>
                                    <a href="javascript:;" class="open-tutor-lesson-modal" data-lesson-id="<?php echo $content->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>">
                                        <?php echo __('Lesson', 'tutor').' '.$counter['lesson'].': '.stripslashes($content->post_title); ?> 
                                    </a>
                                    <div class="tutor-course-content-top-right-action">
                                        <a href="javascript:;" class="open-tutor-lesson-modal" data-lesson-id="<?php echo $content->ID; ?>" data-topic-id="<?php echo $topic->ID; ?>">
                                            <span class="color-text-hints ttr-edit-filled tutor-font-size-24"></span>
                                        </a>
                                        <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $content->ID; ?>">
                                            <span class="color-text-hints ttr-delete-stroke-filled tutor-font-size-24"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
							<?php
						} else {
                            !isset($counter[$content->post_type]) ? $counter[$content->post_type]=0 : 0;
                            $counter[$content->post_type]++;
                            do_action( 'tutor/course/builder/content/'.$content->post_type, $content, $topic, $course_id, $counter[$content->post_type] );
                        }
					}
                ?></div>

                <div class="tutor_add_content_wrap" data-topic_id="<?php echo $topic->ID; ?>">
                    <?php do_action('tutor_course_builder_before_btn_group', $topic->ID); ?>

                    <button class="tutor-btn tutor-is-outline tutor-is-sm open-tutor-lesson-modal create-lesson-in-topic-btn" data-topic-id="<?php echo $topic->ID; ?>" data-lesson-id="0" >
                        <i class="tutor-icon-plus-square-button tutor-mr-8"></i>
                        <?php _e('Lesson', 'tutor'); ?>
                    </button>
                    
                    <button class="tutor-btn tutor-is-outline tutor-is-sm tutor-add-quiz-btn" data-topic-id="<?php echo $topic->ID; ?>">
                        <i class="tutor-icon-plus-square-button tutor-mr-8"></i>
                        <?php _e('Quiz', 'tutor'); ?>
                    </button>

                    <?php do_action('tutor_course_builder_after_btn_group', $topic->ID, $course_id); ?>
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
                            tutor_load_template_from_custom_path(tutor()->path.'/views/fragments/quiz-list-single.php', array(
                                'quiz_id' => $quiz->ID,
                                'topic_id' => $topic->ID,
                                'quiz_title' => $quiz->post_title,
                            ), false);
						}elseif($lesson->post_type === 'tutor_assignments'){
							?>
                            <div id="tutor-assignment-<?php echo $lesson->ID; ?>" class="course-content-item tutor-assignment tutor-assignment-<?php echo
							$lesson->ID; ?>">
                                <div class="tutor-course-content-top">
                                    <i class="fas fa-bars"></i>
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
                                <div class="tutor-course-content-top">
                                    <i class="fas fa-bars"></i>
                                    <a href="javascript:;" class="open-tutor-lesson-modal" data-lesson-id="<?php echo $lesson->ID; ?>" data-topic-id="<?php echo is_object($topic) ? $topic->ID : ''; ?>"><?php echo stripslashes($lesson->post_title); ?> </a>
                                    <a href="javascript:;" class="tutor-delete-lesson-btn" data-lesson-id="<?php echo $lesson->ID; ?>"><i class="tutor-icon-garbage"></i></a>
                                </div>
                            </div>
							<?php
					}
				}
			}
			?>
			</div>
		</div>
	<?php }
?>

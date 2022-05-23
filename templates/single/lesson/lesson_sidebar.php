<?php
/**
 * Display Topics and Lesson lists for learn
 *
 * @since v.1.0.0
 * @author themeum
 * @url https://themeum.com
 *
 * @package TutorLMS/Templates
 * @version 1.4.3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $post;
$post_id = get_the_ID();
if ( ! empty( $_POST['lesson_id'] ) ) {
	$post_id = sanitize_text_field( $_POST['lesson_id'] );
}
$currentPost = $post;
$_is_preview = get_post_meta( $post_id, '_is_preview', true );
$course_id   = 0;
if ( $post->post_type === 'tutor_quiz' ) {
	$course    = tutor_utils()->get_course_by_quiz( get_the_ID() );
	$course_id = $course->ID;
} elseif ( $post->post_type === 'tutor_assignments' ) {
	$course_id = tutor_utils()->get_course_id_by( 'assignment', $post->ID );
} elseif ( $post->post_type === 'tutor_zoom_meeting' ) {
	$course_id = get_post_meta( $post->ID, '_tutor_zm_for_course', true );
} else {
	$course_id = tutor_utils()->get_course_id_by( 'lesson', $post->ID );
}
$user_id                      = get_current_user_id();
$enable_qa_for_this_course    = get_post_meta( $course_id, '_tutor_enable_qa', true ) == 'yes';
$enable_q_and_a_on_course     = tutor_utils()->get_option( 'enable_q_and_a_on_course' ) && $enable_qa_for_this_course;
$is_enrolled                  = tutor_utils()->is_enrolled( $course_id );
$is_instructor_of_this_course = tutor_utils()->is_instructor_of_this_course( $user_id, $course_id );
$is_user_admin                = current_user_can( 'administrator' );
?>

<?php do_action( 'tutor_lesson/single/before/lesson_sidebar' ); ?>
<div class="tutor-course-single-sidebar-title tutor-d-flex tutor-justify-between">
	<span class="tutor-fs-6 tutor-fw-medium tutor-color-secondary"><?php _e("Course Content", "tutor"); ?></span>
	<span class="tutor-d-block tutor-d-xl-none"><a href="#" class="tutor-iconic-btn" tutor-hide-course-single-sidebar><span class="tutor-icon-times" area-hidden="true"></span></a></span>
</div>

<?php
$topics = tutor_utils()->get_topics( $course_id );
if ( $topics->have_posts() ) {
	while ( $topics->have_posts() ) {
		$topics->the_post();
		$topic_id       = get_the_ID();
		$topic_summery  = get_the_content();
		$total_contents = tutor_utils()->count_completed_contents_by_topic( $topic_id );
		?>
			<div class="tutor-course-topic tutor-course-topic-<?php echo $topic_id; ?>">
				<div class="tutor-course-topic-title" tutor-course-single-topic-toggler>
					<div class="tutor-row">
						<div class="tutor-col">
							<div class="tutor-fs-6 tutor-fw-medium tutor-cursor-pointer tutor-user-select-none">
								<!-- <i class="tutor-course-topic-title-arrow tutor-icon-angle-right tutor-mr-8" area-hidden="true"></i> -->
								<?php the_title(); ?>
								<?php if ( true ) : ?>
									<?php if(trim($topic_summery)) : ?>
										<div class="tutor-course-topic-title-info">
											<div class="tooltip-wrap">
												<i class="tutor-course-topic-title-info-icon tutor-icon-circle-info-o"></i>
												<span class="tooltip-txt tooltip-bottom">
													<?php echo $topic_summery; ?>
												</span>
											</div>
										</div>
									<?php endif; ?>
								<?php endif; ?>
							</div>
						</div>
	
						<div class="tutor-col-auto tutor-align-self-center">
							<?php if ( isset( $total_contents['contents'] ) && $total_contents['contents'] > 0 ) : ?>
								<div class="tutor-course-topic-summary tutor-fs-7 tutor-color-secondary tutor-pl-8">
									<?php echo esc_html( isset( $total_contents['completed'] ) ? $total_contents['completed'] : 0 ); ?>/<?php echo esc_html( isset( $total_contents['contents'] ) ? $total_contents['contents'] : 0 ); ?>
								</div>
							<?php endif; ?>
						</div>
					</div>
				</div>

				<?php
					do_action( 'tutor/lesson_list/before/topic', $topic_id );
					$lessons = tutor_utils()->get_course_contents_by_topic( get_the_ID(), -1 );
					$is_enrolled = tutor_utils()->is_enrolled( $course_id, get_current_user_id() );
					while ( $lessons->have_posts() ) {
						$lessons->the_post();
						$is_public_course 	= \TUTOR\Course_List::is_public( $course_id );
						$show_permalink 	= !$_is_preview || $is_enrolled || get_post_meta( $post->ID, '_is_preview', true ) || $is_public_course;
						if ( $post->post_type === 'tutor_quiz' ) {
							$quiz = $post;
							?>
								<div class="tutor-course-topic-item tutor-course-topic-item-quiz<?php echo ( $currentPost->ID == get_the_ID() ) ? ' is-active' : ''; ?>" data-quiz-id="<?php echo $quiz->ID; ?>">
									<a href="<?php echo $show_permalink ? get_permalink( $quiz->ID ) : '#'; ?>" data-quiz-id="<?php echo $quiz->ID; ?>">
										<div class="tutor-d-flex tutor-mr-32">
											<span class="tutor-course-topic-item-icon tutor-icon-quiz-o tutor-mr-8" area-hidden="true"></span>
											<span class="tutor-course-topic-item-title tutor-fs-7 tutor-fw-medium">
												<?php echo $quiz->post_title; ?>
											</span>
										</div>
										<div class="tutor-d-flex tutor-ml-auto tutor-flex-shrink-0">
											<?php
												$time_limit = (int) tutor_utils()->get_quiz_option( $quiz->ID, 'time_limit.time_value' );
												$has_attempt = tutor_utils()->has_attempted_quiz( get_current_user_id(), $quiz->ID );
												if ( $time_limit ) {
													$time_type = tutor_utils()->get_quiz_option( $quiz->ID, 'time_limit.time_type' );
													$time_type == 'minutes' ? $time_limit = $time_limit * 60 : 0;
													$time_type == 'hours' ? $time_limit = $time_limit * 3660 : 0;
													$time_type == 'days' ? $time_limit = $time_limit * 86400 : 0;
													$time_type == 'weeks' ? $time_limit = $time_limit * 86400*7 : 0;

													// To Fix: If time larger than 24 hours, the hour portion starts from 0 again. Fix later.
													echo '<span class="tutor-course-topic-item-duration tutor-fs-7 tutor-fw-medium tutor-color-muted tutor-mr-8">' .  tutor_utils()->course_content_time_format( gmdate('H:i:s', $time_limit) ) . '</span>';
												}
											?>

											<?php if($show_permalink): ?>
												<input type="checkbox" class="tutor-form-check-input tutor-form-check-circle" disabled="disabled" readonly="readonly" <?php echo esc_attr( $has_attempt ? 'checked="checked"' : '' ); ?>/>
											<?php else: ?>
												<i class="tutor-icon-lock-line tutor-fs-7 tutor-color-muted tutor-mr-4" area-hidden="true"></i>
											<?php endif; ?>
										</div>
									</a>
								</div>
							<?php } elseif ( $post->post_type === 'tutor_assignments' ) { ?>
								<div class="tutor-course-topic-item tutor-course-topic-item-assignment<?php echo ( $currentPost->ID == get_the_ID() ) ? ' is-active' : ''; ?>">
									<a href="<?php echo $show_permalink ? get_permalink( $post->ID ) : '#'; ?>" data-assignment-id="<?php echo $post->ID; ?>">
										<div class="tutor-d-flex tutor-mr-32">
											<span class="tutor-course-topic-item-icon tutor-icon-assignment tutor-mr-8" area-hidden="true"></span>
											<span class="tutor-course-topic-item-title tutor-fs-7 tutor-fw-medium">
												<?php echo $post->post_title; ?>
											</span>
										</div>
										<div class="tutor-d-flex tutor-ml-auto tutor-flex-shrink-0">
											<?php if($show_permalink): ?>
												<?php do_action( 'tutor/assignment/right_icon_area', $post ); ?>
											<?php else: ?>
												<i class="tutor-icon-lock-line tutor-fs-7 tutor-color-muted tutor-mr-4" area-hidden="true"></i>
											<?php endif; ?>
										</div>
									</a>
								</div>
							<?php } elseif ( $post->post_type === 'tutor_zoom_meeting' ) { ?>
								<div class="tutor-course-topic-item tutor-course-topic-item-zoom<?php echo ( $currentPost->ID == get_the_ID() ) ? ' is-active' : ''; ?>">
									<a href="<?php echo $show_permalink ? esc_url( get_permalink( $post->ID ) ) : '#'; ?>">
										<div class="tutor-d-flex tutor-mr-32">
											<span class="tutor-course-topic-item-icon tutor-icon-brand-zoom-o tutor-mr-8" area-hidden="true"></span>
											<span class="tutor-course-topic-item-title tutor-fs-7 tutor-fw-medium">
												<?php echo esc_html( $post->post_title ); ?>
											</span>
										</div>
										<div class="tutor-d-flex tutor-ml-auto tutor-flex-shrink-0">
											<?php if($show_permalink): ?>
												<?php do_action( 'tutor/zoom/right_icon_area', $post->ID ); ?>
											<?php else: ?>
												<i class="tutor-icon-lock-line tutor-fs-7 tutor-color-muted tutor-mr-4" area-hidden="true"></i>
											<?php endif; ?>
										</div>
									</a>
								</div>
							<?php } else { ?>
							<?php
								$video = tutor_utils()->get_video_info();
								$play_time = false;
								if ( $video ) {
									$play_time = $video->playtime;
								}
								$is_completed_lesson = tutor_utils()->is_completed_lesson();
							?>
								<div class="tutor-course-topic-item tutor-course-topic-item-lesson<?php echo ( $currentPost->ID == get_the_ID() ) ? ' is-active' : ''; ?>">
									<a href="<?php echo $show_permalink ? get_the_permalink() : '#'; ?>" data-lesson-id="<?php the_ID(); ?>">
										<div class="tutor-d-flex tutor-mr-32">
											<?php
												$tutor_lesson_type_icon = $play_time ? 'brand-youtube-bold' : 'document-text';
												echo '<span class="tutor-course-topic-item-icon tutor-icon-' . $tutor_lesson_type_icon . ' tutor-mr-8" area-hidden="true"></span>';
											?>
											<span class="tutor-course-topic-item-title tutor-fs-7 tutor-fw-medium">
												<?php the_title(); ?>
											</span>
										</div>

										<div class="tutor-d-flex tutor-ml-auto tutor-flex-shrink-0">
											<?php
												do_action( 'tutor/lesson_list/right_icon_area', $post );

												if ( $play_time ) {
													echo "<span class='tutor-course-topic-item-duration tutor-fs-7 tutor-fw-medium tutor-color-muted tutor-mr-8'>" . tutor_utils()->get_optimized_duration( $play_time ) . '</span>';
												}

												$lesson_complete_icon = $is_completed_lesson ? 'checked' : '';

												if($show_permalink) {
													echo "<input $lesson_complete_icon type='checkbox' class='tutor-form-check-input tutor-form-check-circle' disabled readonly />";
												} else {
													echo '<i class="tutor-icon-lock-line tutor-fs-7 tutor-color-muted tutor-mr-4" area-hidden="true"></i>';
												}
											?>
										</div>
									</a>
								</div>
							<?php
						}
					}
					$lessons->reset_postdata();
					do_action( 'tutor/lesson_list/after/topic', $topic_id );
				?>
			</div>
		<?php
	}
	$topics->reset_postdata();
	wp_reset_postdata();
}
?>
<?php do_action( 'tutor_lesson/single/after/lesson_sidebar' ); ?>

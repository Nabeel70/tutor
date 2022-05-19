<?php
$course_id          = isset( $course_id ) ? (int) $course_id : 0;
$is_enrolled        = tutor_utils()->is_enrolled( $course_id );
$course_stats       = tutor_utils()->get_course_completed_percent( $course_id, 0, true );

// options
$show_mark_complete = isset( $mark_as_complete ) ? $mark_as_complete : false;
?>
<div class="tutor-course-topic-single-header tutor-d-flex tutor-single-page-top-bar">
	<a href="#" class="tutor-iconic-btn tutor-iconic-btn-secondary tutor-d-none tutor-d-xl-inline-flex" tutor-course-topics-sidebar-toggler>
		<span class="tutor-icon-left" area-hidden="true"></span>
	</a>

	<a href="<?php echo get_the_permalink( $course_id ); ?>" class="tutor-iconic-btn tutor-d-flex tutor-d-xl-none">
		<span class="tutor-icon-previous" area-hidden="true"></span>
	</a>

	<div class="tutor-course-topic-single-header-title tutor-fs-6 tutor-ml-12 tutor-ml-xl-24">
		<?php echo get_the_title( $course_id ); ?>
	</div>

	<div class="tutor-ml-auto tutor-align-center tutor-d-none tutor-d-xl-flex">
		<?php if ( $is_enrolled ) : ?>
			<?php do_action( 'tutor_course/single/enrolled/before/lead_info/progress_bar' ); ?>
			<div class="tutor-fs-7 tutor-mr-20">
				<?php if ( true == get_tutor_option( 'enable_course_progress_bar' ) ) : ?>
					<span class="tutor-progress-content tutor-color-primary-60">
						<?php _e( 'Your Progress:', 'tutor' ); ?>
					</span>
					<span class="tutor-fs-7 tutor-fw-bold">
						<?php echo $course_stats['completed_count']; ?>
					</span>
					<?php _e( 'of ', 'tutor' ); ?>
					<span class="tutor-fs-7 tutor-fw-bold">
						<?php echo $course_stats['total_count']; ?>
					</span>
					(<?php echo $course_stats['completed_percent'] . '%'; ?>)
				<?php endif; ?>
			</div>
			<?php do_action( 'tutor_course/single/enrolled/after/lead_info/progress_bar' ); ?>
            <?php
                if ( $show_mark_complete ) {
                    tutor_lesson_mark_complete_html();
                }
            ?>
            <?php endif; ?>

		<a class="tutor-iconic-btn" href="<?php echo get_the_permalink( $course_id ); ?>">
			<span class="tutor-icon-times" area-hidden="true"></span>
		</a>
	</div>

	<div class="tutor-ml-auto tutor-align-center tutor-d-block tutor-d-xl-none">
		<a class="tutor-iconic-btn" href="#" tutor-course-topics-sidebar-offcanvas-toggler>
			<span class="tutor-icon-hamburger-menu" area-hidden="true"></span>
		</a>
	</div>
</div>
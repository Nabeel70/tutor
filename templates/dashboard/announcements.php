<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Template for displaying Announcements
 *
 * @since v.1.7.9
 *
 * @author Themeum
 * @url https://themeum.com
 *
 * @package TutorLMS/Templates
 * @version 1.7.9
 */
$per_page = tutor_utils()->get_option( 'pagination_per_page', 10 );
$paged    = max( 1, tutor_utils()->avalue_dot( 'current_page', tutor_sanitize_data($_GET) ) );

$order_filter  = isset( $_GET['order'] ) ? sanitize_text_field( $_GET['order'] ) : 'DESC';
$search_filter = isset( $_GET['search'] ) ? sanitize_text_field( $_GET['search'] ) : '';
// announcement's parent
$course_id   = isset( $_GET['course-id'] ) ? sanitize_text_field( $_GET['course-id'] ) : '';
$date_filter = isset( $_GET['date'] ) ? sanitize_text_field( $_GET['date'] ) : '';

$year  = date( 'Y', strtotime( $date_filter ) );
$month = date( 'm', strtotime( $date_filter ) );
$day   = date( 'd', strtotime( $date_filter ) );

$args = array(
	'post_type'      => 'tutor_announcements',
	'post_status'    => 'publish',
	's'              => sanitize_text_field( $search_filter ),
	'post_parent'    => sanitize_text_field( $course_id ),
	'posts_per_page' => sanitize_text_field( $per_page ),
	'paged'          => sanitize_text_field( $paged ),
	'orderBy'        => 'ID',
	'order'          => sanitize_text_field( $order_filter ),

);
if ( ! empty( $date_filter ) ) {
	$args['date_query'] = array(
		array(
			'year'  => $year,
			'month' => $month,
			'day'   => $day,
		),
	);
}
if ( ! current_user_can( 'administrator' ) ) {
	$args['author'] = get_current_user_id();
}
$the_query = new WP_Query( $args );

// get courses
$courses    = ( current_user_can( 'administrator' ) ) ? tutor_utils()->get_courses() : tutor_utils()->get_courses_by_instructor();
$image_base = tutor()->url . '/assets/images/';


?>

<div class="tutor-dashboard-content-inner">
	<div class="tutor-text-medium-h5 tutor-color-text-primary tutor-mb-24"><?php echo __( 'Announcement', 'tutor' ); ?></div>
	<!--notice-->
	<div class="tutor-component-three-col-action new-announcement-wrap">
		<div class="tutor-announcement-big-icon">
			<i class="tutor-icon-speaker-filled"></i>
		</div>
		<div>
			<span class=" tutor-color-text-subsued"><?php esc_html_e( 'Create Announcement', 'tutor' ); ?></span>
			<div class="tutor-text-medium-h6 tutor-color-text-primary">
					<?php esc_html_e( 'Notify all students of your course', 'tutor' ); ?>
			</div>
		</div>
		<div class="new-announcement-button">
			<button type="button" class="tutor-btn" data-tutor-modal-target="tutor_announcement_new">
				<?php esc_html_e( 'Add New Announcement', 'tutor' ); ?>
			</button>
		</div>
	</div>
	<!--notice end-->
</div>


<!--Filter-->
<div class="tutor-row tutor-mb-32 tutor-mt-44" style="width: calc(100% + 30px);">
	<div class="tutor-col-12 tutor-col-lg-6 tutor-mt-12 tutor-mt-lg-0">
		<label class="tutor-d-block tutor-mb-12 tutor-form-label">
			<?php esc_html_e( 'Courses', 'tutor' ); ?>
		</label>
		<select class="tutor-form-select tutor-form-control-sm tutor-announcement-course-sorting">

			<option value=""><?php esc_html_e( 'All', 'tutor' ); ?></option>

			<?php if ( $courses ) : ?>
				<?php foreach ( $courses as $course ) : ?>
					<option value="<?php echo esc_attr( $course->ID ); ?>" <?php selected( $course_id, $course->ID, 'selected' ); ?>>
						<?php esc_html_e( $course->post_title ); ?>
					</option>
				<?php endforeach; ?>
			<?php else : ?>
				<option value=""><?php esc_html_e( 'No course found', 'tutor' ); ?></option>
			<?php endif; ?>
		</select>
	</div>

	<div class="tutor-col-6 tutor-col-lg-3 tutor-mt-12 tutor-mt-lg-0">
		<label class="tutor-d-block tutor-mb-12 tutor-form-label"><?php esc_html_e( 'Sort By', 'tutor' ); ?></label>
		<select class="tutor-form-select tutor-announcement-order-sorting tutor-form-control-sm" data-search="no">
			<option <?php selected( $order_filter, 'ASC' ); ?>><?php esc_html_e( 'ASC', 'tutor' ); ?></option>
			<option <?php selected( $order_filter, 'DESC' ); ?>><?php esc_html_e( 'DESC', 'tutor' ); ?></option>
		</select>
	</div>

	<div class="tutor-col-6 tutor-col-lg-3 tutor-mt-12 tutor-mt-lg-0">
		<label class="tutor-form-label tutor-d-block tutor-mb-12"><?php esc_html_e( 'Date', 'tutor' ); ?></label>
		<div class="tutor-v2-date-picker"></div>
	</div>
</div>
<!--Filter end-->

<?php
	$announcements = $the_query->have_posts() ? $the_query->posts : array();

	tutor_load_template_from_custom_path(
		tutor()->path . '/views/fragments/announcement-list.php',
		array(
			'announcements' => is_array( $announcements ) ? $announcements : array(),
			'the_query'     => $the_query,
			'paged'         => $paged,
		)
	);
?>

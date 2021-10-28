<?php
/**
 * Course Loop Start
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

$shortcode_arg = isset($GLOBALS['tutor_shortcode_arg']) ? $GLOBALS['tutor_shortcode_arg']['column_per_row'] : null;
$courseCols = $shortcode_arg===null ? tutor_utils()->get_option( 'courses_col_per_row', 4 ) : $shortcode_arg;

?>
<div class="tutor-course-listing tutor-course-listing-grid-<?php echo $courseCols; ?> tutor-course-listing-filter-grid-2 tutor-course-listing-filter-grid-3">
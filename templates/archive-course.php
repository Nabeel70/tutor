<?php

/**
 * Template for displaying courses
 *
 * @since v.1.0.0
 *
 * @author Themeum
 * @url https://themeum.com
 *
 * @package TutorLMS/Templates
 * @version 1.5.8
 */
tutor_utils()->tutor_custom_header();

// Load the 
tutor_load_template('archive-course-init', array(
	'course_filter' => (bool) tutor_utils()->get_option('course_archive_filter', false),
	'supported_filters' => tutor_utils()->get_option('supported_course_filters', array()),
	'loop_content_only' => false
));

tutor_utils()->tutor_custom_footer(); 

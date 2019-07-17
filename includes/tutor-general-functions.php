<?php

if ( ! defined( 'ABSPATH' ) )
	exit;

/**
 * Tutor general Functions
 */


if ( ! function_exists('tutor_withdrawal_methods')){
	function tutor_withdrawal_methods(){
		$withdraw = new \TUTOR\Withdraw();

		return $withdraw->available_withdraw_methods;
	}
}


if ( ! function_exists('tutor_placeholder_img_src')) {
	function tutor_placeholder_img_src() {
		$src = tutor()->url . 'assets/images/placeholder.jpg';
		return apply_filters( 'tutor_placeholder_img_src', $src );
	}
}

/**
 * @return string
 *
 * Get course categories selecting UI
 *
 * @since v.1.3.4
 */

if ( ! function_exists('tutor_course_categories_dropdown')){
	function tutor_course_categories_dropdown($args = array()){

		$default = array(
			'name'  => 'tutor_course_category',
			'multiple' => true,
		);

		$args = apply_filters('tutor_course_categories_dropdown_args', array_merge($default, $args));

		$multiple_select = '';

		if (tutor_utils()->array_get('multiple', $args)){
			if (isset($args['name'])){
				$args['name'] = $args['name'].'[]';
			}
			$multiple_select = "multiple='multiple'";
		}

		extract($args);

		$categories = tutor_utils()->get_course_categories();

		$output = '';
		$output .= "<select name='{$name}' {$multiple_select}>";
		$output .= "<option value=''>Select a category</option>";
		$output .= _generate_categories_dropdown_option($categories);
		$output .= "</select>";

		return $output;
	}
}

/**
 * @param $categories
 * @param string $parent_name
 *
 * @return string
 *
 * Get selecting options, recursive supports
 *
 * @since v.1.3.4
 */

if ( ! function_exists('_generate_categories_dropdown_option')){
	function _generate_categories_dropdown_option($categories, $parent_name = ''){
		$output = '';

		if (tutor_utils()->count($categories)) {
			foreach ( $categories as $category_id => $category ) {
				$childrens = tutor_utils()->array_get( 'children', $category );
				$output .= "<option value='{$category->term_id}'>{$parent_name}{$category->name} </option>";

				if ( tutor_utils()->count( $childrens ) ) {
					$parent_name.= "&nbsp;&nbsp;&nbsp;&nbsp;";
					$output .= _generate_categories_dropdown_option( $childrens, $parent_name );
				}
			}
		}
		return $output;
	}
}

/**
 * @param array $args
 *
 * @return string
 *
 * Generate course categories checkbox
 * @since v.1.3.4
 */

if ( ! function_exists('tutor_course_categories_checkbox')){
	function tutor_course_categories_checkbox($post_ID = 0, $args = array()){
		$default = array(
			'name'  => 'tax_input[course-category]',
		);

		$args = apply_filters('tutor_course_categories_checkbox_args', array_merge($default, $args));

		if (isset($args['name'])){
			$args['name'] = $args['name'].'[]';
		}

		extract($args);

		$categories = tutor_utils()->get_course_categories();

		$output = '';
		$output .= __tutor_generate_categories_checkbox($post_ID, $categories, $args);

		return $output;
	}
}

/**
 * @param $categories
 * @param string $parent_name
 * @param array $args
 *
 * @return string
 *
 * Internal function to generate course categories checkbox
 *
 * @since v.1.3.4
 */
if ( ! function_exists('__tutor_generate_categories_checkbox')){
	function __tutor_generate_categories_checkbox($post_ID = 0, $categories, $args = array()){
		$output = '';
		$input_name = tutor_utils()->array_get('name', $args);

		if (tutor_utils()->count($categories)) {
			$output .= "<ul class='tax-input-course-category'>";
			foreach ( $categories as $category_id => $category ) {
				$childrens = tutor_utils()->array_get( 'children', $category );
				$has_in_term = has_term( $category->term_id, 'course-category', $post_ID );

				$output .= "<li class='tax-input-course-category-item tax-input-course-category-item-{$category->term_id} '><label class='course-category-checkbox'> <input type='checkbox' name='{$input_name}' 
value='{$category->term_id}' 
".checked($has_in_term, true, false)." /> {$category->name} </label>";

				if ( tutor_utils()->count( $childrens ) ) {
					$output .= __tutor_generate_categories_checkbox($post_ID,$childrens, $args);
				}
				$output .= " </li>";
			}
			$output .= "</ul>";
		}
		return $output;
	}
}

/**
 * @param string $content
 * @param string $title
 *
 * @return string
 *
 * Wrap course builder sections within div for frontend
 *
 * @since v.1.3.4
 */

if ( ! function_exists('course_builder_section_wrap')) {
	function course_builder_section_wrap( $content = '', $title = '', $echo = true ) {
		ob_start();
		?>
        <div class="tutor-course-builder-section">
            <div class="tutor-course-builder-section-title">
                <h3><i class="tutor-icon-move"></i> <span><?php echo $title; ?></span></h3>
            </div>
			<?php echo $content; ?>
        </div>
		<?php
		$html = ob_get_clean();

		if ($echo){
			echo $html;
		}else{
			return $html;
		}
	}
}


if ( ! function_exists('get_tutor_header')){
	function get_tutor_header(){
		$enable_fullscreen_mode = tutor_utils()->get_option('enable_fullscreen_mode');

		if ($enable_fullscreen_mode){

			?>
            <!doctype html>
            <html <?php language_attributes(); ?>>
            <head>
                <meta charset="<?php bloginfo( 'charset' ); ?>" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="profile" href="https://gmpg.org/xfn/11" />
				<?php wp_head(); ?>
            </head>

            <body <?php body_class(); ?>>

            <div id="tutor-page-wrap" class="tutor-site-wrap site">

			<?php

		}else{
			get_header();
		}

	}
}

if (! function_exists('get_tutor_footer')){
	function get_tutor_footer(){
		$enable_fullscreen_mode = tutor_utils()->get_option('enable_fullscreen_mode');
		if ($enable_fullscreen_mode){
			?>
            </div>
			<?php wp_footer(); ?>

            </body>
            </html>
			<?php
		}else{
			get_footer();
		}
	}
}